import fs from "node:fs";

/**
 * Inspeção rápida do HTML exportado: title, canonical, og:url e blocos JSON-LD.
 * Roda depois do build (`npm run build`), sobre o `out/`.
 */
const pages = ["out/index.html", "out/apmf/index.html", "out/contato/index.html"];
const ldRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

const pick = (html, re) => {
  const m = html.match(re);
  return m ? m[1].trim() : "—";
};

for (const file of pages) {
  const html = fs.readFileSync(file, "utf8");
  console.log("=== " + file + " ===");
  console.log("  title     : " + pick(html, /<title>([\s\S]*?)<\/title>/));
  console.log("  canonical : " + pick(html, /<link rel="canonical" href="([^"]+)"/));
  console.log("  og:url    : " + pick(html, /<meta property="og:url" content="([^"]+)"/));
  const description = pick(html, /<meta name="description" content="([^"]*)"/);
  console.log("  descrição : " + description.length + " caracteres");
  console.log("  robots    : " + pick(html, /<meta name="robots" content="([^"]+)"/));

  const types = [];
  let m;
  while ((m = ldRe.exec(html))) {
    types.push(JSON.parse(m[1].replace(/\\u003c/g, "<"))["@type"]);
  }
  console.log("  JSON-LD   : " + (types.length ? types.join(", ") : "—"));
}
