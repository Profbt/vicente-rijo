import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const WIDTH = 1200;
const HEIGHT = 630;
const BACKGROUND = "#0a1326";

const logo = await readFile(join(root, "public/img/brand/logo_escola.png"));

const png = await sharp({
  create: {
    width: WIDTH,
    height: HEIGHT,
    channels: 4,
    background: BACKGROUND,
  },
})
  .composite([{ input: logo, gravity: "center" }])
  .png()
  .toBuffer();

await writeFile(join(root, "public/og.png"), png);

console.log("og.png gerado (apenas a logo)");
