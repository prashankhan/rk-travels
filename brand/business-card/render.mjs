// Exports print PDFs (with 3 mm bleed) and 600 dpi PNG previews of each side.
// Usage: node brand/business-card/render.mjs   (requires the `playwright` package and Chromium)
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(dir, "exports");
const url = (q) => `file://${path.join(dir, "card.html")}?${q}`;
const MM = 96 / 25.4; // CSS px per mm
const DPI = 600;

const browser = await chromium.launch();
for (const side of ["front", "back"]) {
  const page = await browser.newPage({ viewport: { width: Math.round(96 * MM), height: Math.round(56 * MM) }, deviceScaleFactor: DPI / 96 });
  await page.goto(url(`side=${side}`));
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(out, `rk-travels-card-${side}-bleed.pdf`), width: "96mm", height: "56mm", printBackground: true, pageRanges: "1" });
  await page.screenshot({ path: path.join(out, `rk-travels-card-${side}-bleed-600dpi.png`) });
  // Trimmed preview (what the finished card looks like)
  await page.screenshot({ path: path.join(out, `rk-travels-card-${side}-preview.png`), clip: { x: 3 * MM, y: 3 * MM, width: 90 * MM, height: 50 * MM } });
  // Guides overlay for proofing
  await page.goto(url(`side=${side}&guides=1`));
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(out, `rk-travels-card-${side}-guides.png`) });
  await page.close();
}
// Two-page PDF (front, back) for printers that want one file
const page = await browser.newPage();
await page.goto(url(""));
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: path.join(out, "rk-travels-card-front-back-bleed.pdf"), width: "96mm", height: "56mm", printBackground: true });
await browser.close();
console.log("Exported to", out);
