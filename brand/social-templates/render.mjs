// Exports every template in every size as PNG. Usage: node brand/social-templates/render.mjs [photo-url]
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const sizes = { square: [1080, 1080], portrait: [1080, 1350], story: [1080, 1920] };
const templates = ["general", "airport", "rental", "tours", "announcement"];
const photo = process.argv[2];

const browser = await chromium.launch();
for (const [s, [w, h]] of Object.entries(sizes)) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  for (const t of templates) {
    const qs = new URLSearchParams({ t, s, ...(photo ? { photo } : {}) });
    await page.goto(`file://${path.join(dir, "template.html")}?${qs}`);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(dir, "exports", `rk-travels-${t}-${s}-${w}x${h}.png`) });
  }
  await page.close();
}
await browser.close();
console.log("Exported to", path.join(dir, "exports"));
