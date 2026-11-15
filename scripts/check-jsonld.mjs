import fs from "node:fs";

const files = ["out/index.html", "out/apmf/index.html", "out/contato/index.html"];
const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;

for (const file of files) {
  const html = fs.readFileSync(file, "utf8");
  console.log("=== " + file + " ===");
  let m;
  let count = 0;
  while ((m = re.exec(html))) {
    count++;
    const node = JSON.parse(m[1].replace(/\\u003c/g, "<"));
    const type = node["@type"];
    if (type === "FAQPage") {
      console.log("  FAQPage  @" + node["@id"] + " -> " + node.mainEntity.length + " perguntas");
    } else if (type === "BreadcrumbList") {
      console.log(
        "  Breadcrumb -> " +
          node.itemListElement.map((i) => i.position + ":" + i.name + " (" + i.item + ")").join(" | ")
      );
    } else {
      console.log("  " + type + " @" + node["@id"] + " name=" + node.name);
    }
  }
  console.log("  total de blocos: " + count);
}
