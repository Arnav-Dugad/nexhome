import sharp from "sharp";
import fs from "node:fs/promises";
for (const file of await fs.readdir("assets/source")) {
  if (!file.endsWith(".png")) continue;
  const base = file.replace("-original.png", "").replace(".png", "");
  for (const width of [640, 1280])
    await sharp("assets/source/" + file)
      .resize(width)
      .webp({ quality: 85 })
      .toFile(`public/images/${base}-${width}.webp`);
}
console.log("Responsive WebP assets generated.");
