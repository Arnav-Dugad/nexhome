import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
const browser = await chromium.launch({
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({
  viewport: { width: 1200, height: 800 },
  deviceScaleFactor: 1,
});
await fs.mkdir("assets/source", { recursive: true });
for (const id of ["core", "sense", "light", "control", "air"])
  for (const view of ["rear", "macro", "studio", "lifestyle", "exploded"]) {
    await page.goto(`http://127.0.0.1:5173/model.html?id=${id}&view=${view}`);
    await page.locator(".model-mount[data-ready=true] canvas").waitFor();
    await page
      .locator("canvas")
      .screenshot({ path: `assets/source/${id}-${view}.png` });
    console.log(`${id} / ${view}`);
  }
await browser.close();
