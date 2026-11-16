// Pré-gera as variantes WebP das fotos originais.
//
// Os ORIGINAIS ficam fora do repositório (local-only, ~63 MB) e as VARIANTES
// geradas em public/img/opt são versionadas — assim qualquer clone (e o build
// no Coolify) funciona sem precisar das fotos originais.
//
// Fonte dos originais: $ORIGINALS_DIR, ou ../originais-vicente-rijo ao lado do repo.
// Se a pasta não existir, o script não gera nada e só valida o que já está versionado.
import { access, mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = process.env.ORIGINALS_DIR ?? join(root, "..", "originais-vicente-rijo");
const OUT = join(root, "public", "img", "opt");
const MANIFEST = join(root, "src", "lib", "image-variants.json");
const WIDTHS = [480, 960, 1600];
// Logos e selos aparecem a 40–56 px; sem uma variante pequena o loader entrega
// a de 480 px (~76 KB) no caminho crítico por causa de um ícone de 40 px.
const SMALL_WIDTHS = [96, 192];
const SMALL_LIMIT = 600;
const QUALITY = { 96: 82, 480: 80, 960: 76, 1600: 70 };
const IMAGE_FILE = /\.(png|jpe?g|webp)$/i;

async function exists(path) {
  try {
    await access(path, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    }),
  );
  return files.flat();
}

function variantWidths(intrinsicWidth) {
  const widths = WIDTHS.filter((w) => w <= intrinsicWidth);
  if (intrinsicWidth < SMALL_LIMIT) widths.unshift(...SMALL_WIDTHS);

  // Imagem menor que o maior breakpoint: guarda também a largura nativa, senão
  // o navegador pede 1600 e recebe só 480 (borrado em tela grande).
  if (intrinsicWidth < WIDTHS.at(-1)) {
    widths.push(intrinsicWidth);
  }

  return widths.length > 0 ? [...new Set(widths)] : [intrinsicWidth];
}

async function isFresh(source, output) {
  try {
    const [srcStat, outStat] = await Promise.all([stat(source), stat(output)]);
    return outStat.mtimeMs >= srcStat.mtimeMs;
  } catch {
    return false;
  }
}

const kb = (bytes) => Math.round(bytes / 1024);

let manifest = {};
try {
  manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
} catch {
  manifest = {};
}

if (await exists(SRC)) {
  // Dois originais com o mesmo nome e extensões diferentes (esportes.jpg e
  // esportes.webp) gerariam a mesma variante — o último a rodar venceria e os
  // bytes mudariam a cada build. Fica o de maior largura, em ordem fixa.
  const originals = (await walk(SRC))
    .filter((file) => IMAGE_FILE.test(file))
    .sort((a, b) => a.localeCompare(b));

  if (originals.length === 0) {
    throw new Error(`Nenhuma imagem em ${SRC}`);
  }

  const byStem = new Map();
  for (const file of originals) {
    const rel = relative(SRC, file).replaceAll("\\", "/");
    const stem = rel.replace(IMAGE_FILE, "");
    const { width } = await sharp(file).metadata();
    const previous = byStem.get(stem);
    if (!previous || width > previous.width) {
      byStem.set(stem, { file, rel, width });
    }
  }

  const nextManifest = {};
  const skipped = originals.length - byStem.size;
  let created = 0;
  let reused = 0;
  let bytesIn = 0;
  let bytesOut = 0;

  for (const { file, rel, width } of byStem.values()) {
    const key = `/img/${rel}`;
    const widths = variantWidths(width);

    bytesIn += (await stat(file)).size;

    for (const w of widths) {
      const output = join(OUT, rel.replace(IMAGE_FILE, `-${w}.webp`));
      if (await isFresh(file, output)) {
        reused += 1;
      } else {
        await mkdir(dirname(output), { recursive: true });
        await sharp(file).resize({ width: w }).webp({ quality: QUALITY[w] ?? 76 }).toFile(output);
        created += 1;
      }
      bytesOut += (await stat(output)).size;
    }

    nextManifest[key] = widths;
  }

  manifest = nextManifest;
  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );
  await writeFile(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
  manifest = sorted;

  console.log(
    `imagens: ${originals.length} originais (${kb(bytesIn)} KB) → ${created} novas + ${reused} reaproveitadas (${kb(bytesOut)} KB)` +
      (skipped > 0 ? `, ${skipped} ignorada(s) por nome repetido` : ""),
  );
} else {
  console.log(
    `originais ausentes em ${SRC} — usando as variantes já versionadas em public/img/opt`,
  );
}

// Guarda: toda imagem referenciada no código precisa ter variante gerada, senão
// o próximo erro seria um 404 silencioso em produção.
const sources = [join(root, "src", "app"), join(root, "src", "components")];
const referenced = new Set();
for (const dir of sources) {
  for (const file of await walk(dir)) {
    if (!/\.(tsx?|ts)$/.test(file)) continue;
    const text = await readFile(file, "utf8");
    for (const match of text.matchAll(/["'](\/img\/[^"']+\.(?:png|jpe?g|webp))["']/gi)) {
      referenced.add(match[1]);
    }
  }
}

const missing = [];
for (const src of referenced) {
  const key = src.replace(/^\/img\//, "");
  const widths = manifest[src];
  if (!widths) {
    missing.push(`${src} (sem entrada no manifesto)`);
    continue;
  }
  for (const w of widths) {
    const output = join(OUT, key.replace(IMAGE_FILE, `-${w}.webp`));
    if (!(await exists(output))) {
      missing.push(`${src} (falta a variante ${w}px)`);
      break;
    }
  }
}

if (missing.length > 0) {
  throw new Error(
    `Imagens referenciadas sem variante versionada:\n${missing.join("\n")}\n` +
      `Rode com ORIGINALS_DIR apontando para a pasta de originais para gerar.`,
  );
}
