import sharp from "sharp";
import { readdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir  = path.join(__dirname, "../public");
const wmPath     = path.join(publicDir, "GFwatermark.png");

const SKIP = new Set(["ghostflow.gif", "GFwatermark.png"]);

async function watermarkPhoto(filePath) {
  // Read source into buffer so sharp doesn't lock the file
  const srcBuffer = await readFile(filePath);
  const meta      = await sharp(srcBuffer).metadata();
  const { width: w, height: h } = meta;

  // Scale watermark to 28% of shortest side (min 100px)
  const wmSize = Math.max(100, Math.round(Math.min(w, h) * 0.28));

  // Resize watermark and drop opacity to ~40%
  const wmBuffer = await sharp(wmPath)
    .resize(wmSize, wmSize, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .ensureAlpha()
    .linear(1, 0)           // keep RGB
    // modulate alpha: multiply every pixel alpha by 0.4
    .composite([{
      input: Buffer.from(
        Array(wmSize * wmSize).fill([0, 0, 0, Math.round(255 * 0.6)]).flat()
      ),
      raw: { width: wmSize, height: wmSize, channels: 4 },
      blend: "dest-out",
    }])
    .png()
    .toBuffer();

  // Bottom-right corner, 20px padding
  const padding = 20;
  const left    = Math.max(0, w - wmSize - padding);
  const top     = Math.max(0, h - wmSize - padding);

  const outBuffer = await sharp(srcBuffer)
    .composite([{ input: wmBuffer, left, top, blend: "over" }])
    .jpeg({ quality: 88 })
    .toBuffer();

  // Normalise extension to .jpg and overwrite
  const outPath = filePath.replace(/\.(jpeg|jpg|png)$/i, ".jpg");
  await writeFile(outPath, outBuffer);

  // Remove original if extension changed
  if (outPath !== filePath) {
    const { unlink } = await import("fs/promises");
    await unlink(filePath);
  }
}

async function run() {
  const files  = await readdir(publicDir);
  const photos = files.filter((f) => {
    const lower = f.toLowerCase();
    return (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) && !SKIP.has(f);
  });

  console.log(`\nWatermarking ${photos.length} photos...\n`);

  for (const f of photos) {
    try {
      await watermarkPhoto(path.join(publicDir, f));
      console.log(`  ✓  ${f}`);
    } catch (e) {
      console.error(`  ✗  ${f} — ${e.message}`);
    }
  }

  console.log("\nAll done!");
}

run();
