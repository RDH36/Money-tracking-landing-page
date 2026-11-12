import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { root, walk, read } from "./helpers.mjs";

const rel = (f) => path.relative(root, f);
const ASSET = /["'`](\/[\w\-./]+\.(?:png|jpe?g|webp|gif|svg|ico))["'`]/g;

// Every layout/page (metadata lives there) + constants (shared share image)
const metaSources = () => [
  ...walk(path.join(root, "src/app"), (f) => /(layout|page)\.tsx$/.test(f)),
  path.join(root, "src/constants/content.ts"),
];

test("metadonnees : chaque fichier public reference existe dans public/", () => {
  let count = 0;
  for (const f of metaSources()) {
    for (const m of read(rel(f)).matchAll(ASSET)) {
      count++;
      assert.ok(fs.existsSync(path.join(root, "public", m[1])), `${rel(f)} -> ${m[1]} absent de public/`);
    }
  }
  assert.ok(count > 0, "aucune image trouvee : le motif ne voit plus les metadonnees");
});

test("image de partage : PNG 1200x630 de moins de 300 Ko", () => {
  const buf = fs.readFileSync(path.join(root, "public/og-image.png"));
  assert.equal(buf.subarray(1, 4).toString(), "PNG");
  assert.equal(buf.readUInt32BE(16), 1200);
  assert.equal(buf.readUInt32BE(20), 630);
  assert.ok(buf.length < 300 * 1024, `${buf.length} octets`);
});

test("image de partage : aussi dans l'openGraph des pages par langue (sinon ecrase)", () => {
  assert.match(read("src/constants/content.ts"), /url: "\/og-image\.png"/);
  const local = read("src/app/[locale]/layout.tsx");
  assert.match(local, /openGraph: \{[^}]*images: \[\{ \.\.\.shareImage, alt: shareAlts\[locale\]/);
  assert.match(read("src/app/layout.tsx"), /images: \[shareImage\]/);
});
