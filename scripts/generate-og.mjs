#!/usr/bin/env node
// Screenshots the hidden /og route of the production build into public/og-image.png.
//
// Usage:   npm run og:image        (builds first, then runs this script)
// Then commit the updated public/og-image.png and bump OG_IMAGE_VERSION in
// src/components/Seo.astro so social scrapers refetch the image.
//
// Requires Google Chrome; override the binary with CHROME_PATH if needed.
import { spawn, execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 4399;
const PAGE_URL = `http://localhost:${PORT}/og/`;
const OUT = join(root, "public", "og-image.png");
const CHROME =
  process.env.CHROME_PATH ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

if (!existsSync(join(root, "dist"))) {
  console.error("dist/ not found — run `npm run build` first (or use `npm run og:image`).");
  process.exit(1);
}
if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME} — set CHROME_PATH to your Chrome binary.`);
  process.exit(1);
}

const preview = spawn(join(root, "node_modules", ".bin", "astro"), ["preview", "--port", String(PORT)], {
  cwd: root,
  stdio: "ignore",
});

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`preview server did not respond at ${url}`);
}

const profileDir = mkdtempSync(join(tmpdir(), "og-chrome-"));
try {
  await waitForServer(PAGE_URL);
  execFileSync(CHROME, [
    "--headless=new",
    `--screenshot=${OUT}`,
    "--window-size=1200,630",
    "--force-device-scale-factor=1",
    "--force-prefers-reduced-motion",
    "--hide-scrollbars",
    "--virtual-time-budget=8000",
    `--user-data-dir=${profileDir}`,
    PAGE_URL,
  ], { stdio: "ignore" });
  const kb = Math.round(statSync(OUT).size / 1024);
  console.log(`✓ wrote public/og-image.png (1200×630, ${kb} KB)`);
} finally {
  preview.kill();
  rmSync(profileDir, { recursive: true, force: true });
}
