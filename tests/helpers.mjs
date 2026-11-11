import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const locales = ["fr", "en", "mg"];
const parts = ["", "support", "legal", "release-2-2-0"];

export function readJson(rel) {
  return JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
}

// Same shallow merge as src/i18n/request.ts
export function merged(locale) {
  const out = {};
  for (const p of parts) {
    const file = p ? `src/messages/${p}/${locale}.json` : `src/messages/${locale}.json`;
    Object.assign(out, readJson(file));
  }
  return out;
}

export function flatten(obj, prefix = "") {
  const keys = {};
  for (const [k, v] of Object.entries(obj)) {
    const id = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object") Object.assign(keys, flatten(v, id));
    else keys[id] = v;
  }
  return keys;
}

export function walk(dir, filter = () => true) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(full, filter));
    else if (filter(full)) out.push(full);
  }
  return out;
}

export function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}
