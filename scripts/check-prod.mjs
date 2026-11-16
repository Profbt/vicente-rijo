// Checklist pós-deploy: roda contra a produção e falha se algo que o SEO depende
// não estiver no ar. Uso: node scripts/check-prod.mjs [url-base]
const BASE = (process.argv[2] ?? "https://vicenterijo.com.br").replace(/\/$/, "");
const ROUTES = ["/", "/apmf/", "/contato/"];

const problems = [];
const ok = (msg) => console.log(`  ok   ${msg}`);
const fail = (msg) => {
  problems.push(msg);
  console.log(`  FALHA ${msg}`);
};

async function text(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "follow" });
  return { status: res.status, body: await res.text(), type: res.headers.get("content-type") ?? "" };
}

for (const route of ROUTES) {
  console.log(`\n${route}`);
  const { status, body } = await text(route);
  if (status !== 200) fail(`status ${status}`);
  else ok("status 200");

  const canonical = body.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const expected = `${BASE}${route}`;
  if (canonical === expected) ok("canonical");
  else fail(`canonical ${canonical} (esperado ${expected})`);

  const preloads = body.match(/<link rel="preload"[^>]*as="image"[^>]*>/g) ?? [];
  if (preloads.length > 1) fail(`${preloads.length} preloads de imagem (esperado no máximo 1)`);
  else if (route === "/" && preloads.length === 0) fail("home sem preload da imagem de LCP");
  else ok(`${preloads.length} preload de imagem`);
  if (preloads.length && !/fetchpriority="high"/i.test(preloads[0])) {
    fail("preload de imagem sem fetchpriority=high");
  }

  const blocks = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) fail("sem JSON-LD");
  else {
    try {
      blocks.forEach(([, json]) => JSON.parse(json));
      ok(`${blocks.length} bloco(s) de JSON-LD válidos`);
    } catch {
      fail("JSON-LD inválido");
    }
  }
}

console.log("\narquivos de indexação");
for (const [path, needle] of [
  ["/robots.txt", "Sitemap:"],
  ["/sitemap.xml", "<urlset"],
  ["/llms.txt", "# Colégio Estadual Vicente Rijo"],
]) {
  const { status, body } = await text(path);
  if (status !== 200) fail(`${path} status ${status}`);
  else if (!body.includes(needle)) fail(`${path} sem "${needle}"`);
  else ok(path);
}

// Imagens estáticas geradas no prebuild: um 404 aqui só aparece depois do deploy.
console.log("\nimagens referenciadas");
const urls = new Set();
for (const route of ROUTES) {
  const { body } = await text(route);
  for (const match of body.matchAll(/\/img\/opt\/[^"\s,]+\.webp/g)) urls.add(match[0]);
}
const queue = [...urls];
let failed = 0;
while (queue.length) {
  const batch = queue.splice(0, 8);
  const results = await Promise.all(
    batch.map(async (url) => ({ url, status: (await fetch(`${BASE}${url}`, { method: "HEAD" })).status })),
  );
  for (const { url, status } of results) {
    if (status !== 200) {
      failed += 1;
      fail(`${url} status ${status}`);
    }
  }
}
if (failed === 0) ok(`${urls.size} imagens em 200`);

console.log(
  problems.length === 0
    ? `\nprodução ok (${BASE})`
    : `\n${problems.length} problema(s) em ${BASE}`,
);
process.exit(problems.length === 0 ? 0 : 1);
