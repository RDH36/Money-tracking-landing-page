import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { root, walk, read } from "./helpers.mjs";

const rel = (f) => path.relative(root, f);
const files = walk(path.join(root, "src"), (x) => /\.(tsx?|json)$/.test(x));

test("contactEmail vaut contact@dzeryhago.com", () => {
  assert.match(read("src/constants/content.ts"), /contactEmail:\s*"contact@dzeryhago\.com"/);
});

test("aucune ancienne adresse gmail dans src", () => {
  for (const f of files) assert.doesNotMatch(read(rel(f)), /gmail\.com/i, rel(f));
});

test("aucun crochet d'e-mail de contact dans src (fr, en, mg)", () => {
  for (const f of files)
    assert.doesNotMatch(read(rel(f)), /\[(e-mail de contact|contact e-mail)\]/i, rel(f));
});

test("privacy et terms lisent siteConfig.contactEmail", () => {
  for (const p of ["privacy", "terms"]) {
    const s = read(`src/app/[locale]/${p}/page.tsx`);
    assert.match(s, /import \{ siteConfig \} from "@\/constants\/content"/);
    assert.match(s, /mailto:\$\{siteConfig\.contactEmail\}/);
  }
});

test("le règlement du tirage cite la nouvelle adresse (fr, en, mg)", () => {
  for (const l of ["fr", "en", "mg"]) {
    const s = read(`src/messages/release-2-2-0/${l}.json`);
    assert.equal(s.split("contact@dzeryhago.com").length - 1, 2, l);
  }
});
