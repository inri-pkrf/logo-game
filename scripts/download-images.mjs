// מוריד את כל התמונות של המשחק מ-media.base44.com אל public/images
// ומעדכן את כל הקבצים ב-src כך שיצביעו על הקבצים המקומיים.
//
// הרצה (פעם אחת, מהמחשב שלך, עדיף לפני שהמנוי נגמר):
//   node scripts/download-images.mjs
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const srcDir = path.resolve("src");
const outDir = path.resolve("public/images");
await mkdir(outDir, { recursive: true });

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jsx?|tsx?|css)$/.test(e.name)) out.push(p);
  }
  return out;
}

const files = await walk(srcDir);
const contents = new Map();
const urls = new Set();
for (const f of files) {
  const text = await readFile(f, "utf8");
  contents.set(f, text);
  for (const u of text.match(/https:\/\/media\.base44\.com\/[^"'`\s)]+/g) || []) urls.add(u);
}

if (!urls.size) {
  console.log("לא נמצאו כתובות של base44 - אין מה להוריד.");
  process.exit(0);
}

const mapping = new Map();
let failed = 0;
for (const url of urls) {
  const name = decodeURIComponent(url.split("/").pop()).replace(/[^\w.\-]/g, "_");
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(path.join(outDir, name), Buffer.from(await res.arrayBuffer()));
    mapping.set(url, `/images/${name}`);
    console.log("הורד:", name);
  } catch (e) {
    failed++;
    console.error("נכשל:", url, e.message);
  }
}

for (const [f, text] of contents) {
  let next = text;
  for (const [url, local] of mapping) next = next.split(url).join(local);
  if (next !== text) await writeFile(f, next);
}

console.log(
  failed
    ? `\n${failed} קבצים נכשלו - הכתובות שלהם נשארו כפי שהיו.`
    : "\nהכל הורד. עכשיו העלי ל-GitHub את התיקייה public ואת התיקייה src."
);
