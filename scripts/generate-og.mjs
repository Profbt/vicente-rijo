import { access, readFile, writeFile } from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const WIDTH = 1200;
const HEIGHT = 630;
const BACKGROUND = "#0a1326";

// Originais ficam fora do repositório; o og.png já gerado é versionado.
const SRC = process.env.ORIGINALS_DIR ?? join(root, "..", "originais-vicente-rijo");
const logo = join(SRC, "brand", "logo_escola.png");
const target = join(root, "public/og.png");

async function exists(path) {
  try {
    await access(path, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

if (await exists(logo)) {
  const input = await readFile(logo);

  const png = await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: BACKGROUND,
    },
  })
    .composite([{ input, gravity: "center" }])
    .png()
    .toBuffer();

  await writeFile(target, png);
  console.log("og.png gerado (apenas a logo)");
} else if (await exists(target)) {
  console.log(`originais ausentes em ${SRC} — mantendo o og.png já versionado`);
} else {
  throw new Error(
    `Sem logo em ${logo} e sem public/og.png versionado. ` +
      `Rode com ORIGINALS_DIR apontando para a pasta de originais.`,
  );
}
