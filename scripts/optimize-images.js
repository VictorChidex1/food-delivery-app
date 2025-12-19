import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IMAGES_DIR = path.resolve(__dirname, "../src/assets/images");

async function optimizeImages() {
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`Directory not found: ${IMAGES_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter((file) => /\.(png|jpe?g)$/i.test(file));

  console.log(`Found ${imageFiles.length} images to optimize...`);

  let totalOriginalSize = 0;
  let totalNewSize = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(IMAGES_DIR, file);
    const fileNameWithoutExt = path.parse(file).name;
    const outputPath = path.join(IMAGES_DIR, `${fileNameWithoutExt}.webp`);

    try {
      const originalStats = fs.statSync(inputPath);
      totalOriginalSize += originalStats.size;

      await sharp(inputPath)
        .webp({ quality: 80 }) // 80 is a good balance
        .toFile(outputPath);

      const newStats = fs.statSync(outputPath);
      totalNewSize += newStats.size;

      const reduction = (
        ((originalStats.size - newStats.size) / originalStats.size) *
        100
      ).toFixed(2);
      console.log(
        `✓ ${file} -> ${fileNameWithoutExt}.webp (${(
          newStats.size / 1024
        ).toFixed(2)} KB) - Saved ${reduction}%`
      );
    } catch (error) {
      console.error(`✗ Failed to optimize ${file}:`, error);
    }
  }

  const totalReduction = (
    ((totalOriginalSize - totalNewSize) / totalOriginalSize) *
    100
  ).toFixed(2);
  console.log("\n--- Summary ---");
  console.log(
    `Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(`New Size:      ${(totalNewSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Saved:   ${totalReduction}%`);
}

optimizeImages();
