import { readFileSync, statSync } from "node:fs";
import path from "node:path";

const configDir = path.resolve("apps/site/config");
const exportDir = path.resolve("apps/site/out");
const counts = JSON.parse(
  readFileSync(path.join(configDir, "game-photo-counts.json"), "utf8"),
);

for (const [slug, originalCount] of [
  ["kazino-mefisa", 293],
  ["parad-tehnologiy", 217],
]) {
  const order = JSON.parse(
    readFileSync(path.join(configDir, `${slug}-photo-order.json`), "utf8"),
  );
  if (!Array.isArray(order) || order.length !== counts[slug]) {
    throw new Error(`${slug}: photo count does not match curated order`);
  }
  if (new Set(order).size !== order.length) {
    throw new Error(`${slug}: duplicate photo numbers in curated order`);
  }
  for (const number of order) {
    if (!Number.isInteger(number) || number < 1 || number > originalCount) {
      throw new Error(`${slug}: invalid original photo number ${number}`);
    }
    const prefix = path.join(
      exportDir,
      "images/games",
      slug,
      String(number).padStart(4, "0"),
    );
    for (const file of [`${prefix}.webp`, `${prefix}-thumb.webp`]) {
      if (!statSync(file).isFile()) {
        throw new Error(`${slug}: missing published photo ${file}`);
      }
    }
  }
  console.log(`${slug}: verified ${order.length} images and thumbnails`);
}
