import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { root, locales, merged, flatten, walk, read, readJson } from "./helpers.mjs";

const all = Object.fromEntries(locales.map((l) => [l, flatten(merged(l))]));
const parts = ["", "support", "legal", "release-2-2-0"];

test("les 4 fichiers de messages ont la meme parite fr/en/mg", () => {
  for (const p of parts) {
    const f = (l) =>
      Object.keys(flatten(readJson(p ? `src/messages/${p}/${l}.json` : `src/messages/${l}.json`))).sort();
    const fr = f("fr");
    for (const l of ["en", "mg"]) {
      const other = f(l);
      assert.deepEqual(fr.filter((k) => !other.includes(k)), [], `${p || "base"}: manquantes en ${l}`);
      assert.deepEqual(other.filter((k) => !fr.includes(k)), [], `${p || "base"}: en trop en ${l}`);
    }
  }
});

test("aucun namespace n'est defini dans deux fichiers (le spread ecraserait)", () => {
  const seen = new Map();
  for (const p of parts) {
    const file = p ? `src/messages/${p}/fr.json` : "src/messages/fr.json";
    for (const k of Object.keys(readJson(file))) {
      assert.ok(!seen.has(k), `namespace ${k} dans ${seen.get(k)} et ${file}`);
      seen.set(k, file);
    }
  }
});

test("aucune valeur vide ni chaine 'TODO'", () => {
  for (const l of locales)
    for (const [k, v] of Object.entries(all[l])) {
      assert.ok(typeof v === "string" && v.trim() !== "", `${l}:${k} vide`);
      assert.ok(!/TODO|lorem/i.test(v), `${l}:${k} placeholder`);
    }
});

// --- cles lues par les composants -----------------------------------------
function usedKeys(file) {
  const src = read(file);
  const ns = {};
  for (const m of src.matchAll(/const (\w+) = useTranslations\("([\w-]+)"\)/g)) ns[m[1]] = m[2];
  const arr = src.match(/const \w+ = \[([^\]]*)\] as const/);
  const items = arr ? [...arr[1].matchAll(/"([\w-]+)"/g)].map((x) => x[1]) : [];
  const keys = [];
  for (const [v, n] of Object.entries(ns)) {
    const re = new RegExp(`\\b${v}(?:\\.rich|\\.raw)?\\(\\s*(["\`])([^"\`]+)\\1`, "g");
    for (const m of src.matchAll(re)) {
      if (m[2].includes("${")) {
        assert.ok(items.length, `${file}: cle dynamique sans tableau const`);
        for (const it of items) keys.push(`${n}.${m[2].replace(/\$\{\w+\}/g, it)}`);
      } else keys.push(`${n}.${m[2]}`);
    }
  }
  return keys;
}

const files = walk(path.join(root, "src"), (f) => /\.tsx?$/.test(f)).map((f) => path.relative(root, f));

test("toute cle lue par un composant existe en fr, en et mg", () => {
  let total = 0;
  for (const f of files) {
    if (!read(f).includes("useTranslations(")) continue;
    for (const k of usedKeys(f)) {
      total++;
      for (const l of locales) assert.ok(k in all[l], `${f} lit ${k}, absente en ${l}`);
    }
  }
  assert.ok(total > 60, `trop peu de cles detectees (${total})`);
});

test("les cles des pages legales/tirage et de la metadonnee existent", () => {
  for (const l of locales) {
    for (const ns of ["privacy", "terms", "tirage", "hero"])
      assert.ok(Object.keys(all[l]).some((k) => k.startsWith(`${ns}.`)), `${l}: namespace ${ns}`);
    assert.ok("hero.headline" in all[l] && "hero.subheadline" in all[l]);
    assert.ok("siteConfig.name" in all[l]);
  }
  for (const f of ["privacy", "terms", "tirage"]) {
    const src = read(`src/app/[locale]/${f}/page.tsx`);
    for (const m of src.matchAll(/\bt(?:\.rich|\.raw)?\(\s*"([\w.]+)"/g))
      for (const l of locales) assert.ok(`${f}.${m[1]}` in all[l], `${f}.${m[1]} absente en ${l}`);
  }
});

test("namespaces supprimes absents, cles deplacees/ajoutees presentes", () => {
  for (const l of locales) {
    const keys = Object.keys(all[l]);
    assert.ok(!keys.some((k) => k.startsWith("testimonials")), `${l}: testimonials`);
    assert.ok(!keys.some((k) => k.startsWith("hero.benefits.fast")), `${l}: hero.benefits.fast`);
    assert.ok(!keys.some((k) => k.startsWith("footer.social")), `${l}: footer.social`);
    assert.ok(!keys.some((k) => k.startsWith("footer.columns.legal.draw")), `${l}: legal.draw`);
    for (const k of [
      "footer.columns.support.draw", "navigation.import", "navigation.language",
      "screenshots.home", "screenshots.add", "screenshots.entry", "footer.copyright",
      "importBeta.tester.description", "importBeta.soon",
    ]) assert.ok(k in all[l], `${l}: ${k} manquante`);
  }
});

test("le code ne reference plus testimonials ni les anciens composants", () => {
  for (const f of files) {
    const s = read(f);
    assert.ok(!/testimonials|Testimonials/i.test(s), `${f} cite testimonials`);
    assert.ok(!/benefits\.fast|footer\.social|columns\.legal\.draw/.test(s), `${f} cle supprimee`);
  }
});

test("t.rich : balises <author> et <b> presentes et equilibrees dans les 3 langues", () => {
  for (const l of locales) {
    const c = all[l]["footer.copyright"];
    assert.match(c, /<author>[^<]*Raymond Dzery Hago[^<]*<\/author>/, `${l}: author`);
    const d = all[l]["importBeta.tester.description"];
    const open = (d.match(/<b>/g) || []).length;
    assert.ok(open >= 1 && open === (d.match(/<\/b>/g) || []).length, `${l}: <b> desequilibre`);
  }
});

test("premiere vue fr mot pour mot, puce 10 secondes supprimee", () => {
  const fr = all.fr;
  assert.equal(fr["hero.subheadline"], "Suivez chaque Ariary dépensé, même sans internet. Conçue pour Madagascar.");
  assert.equal(fr["hero.benefits.offline"], "Fonctionne 100% hors ligne");
  assert.equal(fr["hero.benefits.multicurrency"], "Multi-devises : MGA, EUR, USD");
  for (const l of locales) {
    assert.ok(!Object.keys(all[l]).some((k) => k.startsWith("hero.benefits.") && !/offline|multicurrency/.test(k)));
    assert.match(all[l]["hero.benefits.multicurrency"], /MGA/);
  }
});

test("import : 'Bientot', aucune date, jamais 'disponible maintenant'", () => {
  const bad = /disponible maintenant|available now|available today|vonona izao|\b20\d\d\b|\b\d{1,2}\/\d{1,2}\b|janvier|février|mars\b|avril|\bmai\b|juin|juillet|août|septembre|octobre|novembre|décembre|january|february|april|june|july|august|september|october|november|december/i;
  for (const l of locales) {
    for (const [k, v] of Object.entries(all[l]).filter(([k]) => k.startsWith("importBeta.")))
      assert.ok(!bad.test(v), `${l}:${k} -> ${v}`);
  }
  assert.match(all.fr["importBeta.soon"], /bient[oô]t/i);
  assert.match(all.en["importBeta.soon"], /soon/i);
});

test("tirage : 'tentez de gagner', jamais 'gagnez/gagnent'", () => {
  const bad = /\bgagnez\b|\bgagnent\b|\byou win\b|\bwin (a|an|the)\b|\bwill win\b/i;
  for (const l of locales) {
    for (const [k, v] of Object.entries(all[l]).filter(([k]) => /^(importBeta|tirage)\./.test(k)))
      assert.ok(!bad.test(v), `${l}:${k} -> ${v}`);
    assert.match(all[l]["importBeta.tester.description"], /tentez|try|<b>/i);
  }
  assert.match(all.fr["importBeta.tester.description"], /tentez de gagner/i);
});

test("vouvoiement dans les textes francais de la landing", () => {
  const tu = /(?<![\p{L}'])(tu|ton|ta|tes|toi)(?![\p{L}])/iu;
  for (const [k, v] of Object.entries(all.fr).filter(([k]) => /^(hero|problem|solution|features|comparison|faq|cta|newsletter|footer|importBeta|navigation)\./.test(k)))
    assert.ok(!tu.test(v), `fr:${k} tutoiement -> ${v}`);
});

test("pas d'emoji dans les messages", () => {
  const emoji = /(?![©®™])\p{Extended_Pictographic}/u;
  for (const l of locales)
    for (const [k, v] of Object.entries(all[l])) assert.ok(!emoji.test(v), `${l}:${k}`);
});
