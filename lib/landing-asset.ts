import { createHash } from "crypto";
import { readFileSync } from "fs";
import path from "path";

const LANDING_VIDEO_FILE = "landing.mp4";

function getVersionedPublicAssetSrc(filename: string): string {
  const filePath = path.join(process.cwd(), "public", filename);
  const file = readFileSync(filePath);
  const version = createHash("md5").update(file).digest("hex").slice(0, 8);

  return `/${filename}?v=${version}`;
}

export function getLandingVideoSrc(): string {
  return getVersionedPublicAssetSrc(LANDING_VIDEO_FILE);
}
