import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { root, locales, merged, flatten, read, readJson, walk } from "./helpers.mjs";

const all = Object.fromEntries(locales.map((l) => [l, flatten(merged(l))]));
const tirage = (l) => Object.entries(all[l]).filter(([k]) => k.startsWith("tirage."));
const FB = "https://www.facebook.com/profile.php?id=61588589952468";

test("tirage : aucun crochet dans les 3 langues", () => {
  for (const l of locales) {
    assert.ok(tirage(l).length > 10);
    for (const [k, v] of tirage(l)) assert.ok(!/[[\]]/.test(v), `${l}:${k} -> ${v}`);
  }
});

test("tirage fr : organisateur, age, dates, conservation", () => {
  const f = all.fr;
  assert.match(f["tirage.sections.organizer.content"], /organisé par Mitsitsy Team,/);
  assert.match(
    f["tirage.sections.who.content"],
    /âgée d'au moins 16 ans\. Les mineurs participent avec l'accord d'un parent ou d'un représentant légal\.$/,
  );
  assert.equal(
    f["tirage.sections.dates.content"],
    "Les participations sont ouvertes dès la mise en ligne de la version 2.2.0 de Mitsitsy. Elles se terminent au tirage au sort des 10 gagnants. La fin des participations et le tirage sont annoncés sur la page Facebook de Mitsitsy :",
  );
  assert.match(f["tirage.sections.data.content"], /supprimée 6 mois après le tirage/);
  for (const l of ["en", "mg"]) assert.match(all[l]["tirage.sections.data.content"], /6 (mois|months)/);
  assert.match(all.en["tirage.sections.who.content"], /aged 16 or over/);
  assert.match(all.en["tirage.sections.organizer.content"], /Mitsitsy Team/);
});

test("tirage : aucune date chiffree", () => {
  const date = /\b\d{1,2}[/.-]\d{1,2}[/.-]\d{2,4}\b|\b20\d\d\b|\b\d{1,2} (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|january|february|march|april|june|july|august|september|october|november|december)/i;
  for (const l of locales) for (const [k, v] of tirage(l)) assert.ok(!date.test(v), `${l}:${k} -> ${v}`);
});

test("tirage : le lien Facebook est cliquable (target _blank, rel noopener) et suivi du point", () => {
  const src = read("src/app/[locale]/tirage/page.tsx");
  assert.ok(!src.includes(FB), "URL en dur dans la page");
  assert.match(src, /const FACEBOOK_URL = siteConfig\.facebookUrl;/);
  const a = src.match(/<a\s[^>]*href=\{FACEBOOK_URL\}[^>]*>[\s\S]*?<\/a>\s*\.?/);
  assert.ok(a, "lien Facebook absent");
  assert.match(a[0], /target="_blank"/);
  assert.match(a[0], /rel="noopener"/);
  assert.match(src, /<\/a>\s*\n\s*\.\s*\n/);
  for (const l of locales) assert.ok(!all[l]["tirage.sections.dates.content"].includes("http"));
});

test("facebook : constante siteConfig, une seule source d'URL dans src", () => {
  assert.match(read("src/constants/content.ts"), new RegExp(`facebookUrl: "${FB.replace(/[?.]/g, "\\$&")}"`));
  const users = walk(path.join(root, "src"), (f) => /\.(tsx?|json)$/.test(f)).filter((f) => fs.readFileSync(f, "utf8").includes("facebook.com/profile.php"));
  assert.deepEqual(users.map((f) => path.relative(root, f)), ["src/constants/content.ts"]);
});

test("facebook : lien du pied de page entre Contact et tirage, sans classe ni icone", () => {
  const src = read("src/components/layout/Footer.tsx");
  const a = src.match(/<a href=\{siteConfig\.facebookUrl\}([^>]*)>\s*\{t\("columns\.support\.facebook"\)\}\s*<\/a>/);
  assert.ok(a, "lien Facebook absent");
  assert.equal(a[1].trim(), 'target="_blank" rel="noopener"');
  const i = (s) => src.indexOf(s);
  assert.ok(i("columns.support.contact") < i("columns.support.facebook"));
  assert.ok(i("columns.support.facebook") < i("columns.support.draw"));
  for (const l of locales) assert.equal(all[l]["footer.columns.support.facebook"], "Facebook");
});

test("selecteur de langue : le malgache reste masque (filtre mg conserve)", () => {
  assert.match(read("src/components/layout/LanguageSwitcher.tsx"), /\.filter\(\(loc\) => loc !== "mg"\)/);
});

test("meta-descriptions : sans '100%', gratuit sans publicite dans les 3 langues", () => {
  const src = read("src/app/[locale]/layout.tsx");
  const m = src.match(/descriptions: Record<string, string> = \{[\s\S]*?\};/);
  assert.ok(m);
  assert.ok(!/100 ?%/.test(m[0]));
  assert.match(m[0], /Free, no ads\./);
  assert.match(m[0], /Gratuit, sans publicité\./);
  assert.match(m[0], /Maimaim-poana, tsy misy pub\./);
});

test("check-tirage.py : echoue si un crochet est injecte (copie temporaire)", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "tirage-"));
  fs.mkdirSync(path.join(tmp, "scripts"));
  const dir = path.join(tmp, "src/messages/release-2-2-0");
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(path.join(root, "scripts/check-tirage.py"), path.join(tmp, "scripts/check-tirage.py"));
  for (const l of locales) fs.copyFileSync(path.join(root, `src/messages/release-2-2-0/${l}.json`), path.join(dir, `${l}.json`));
  const md = path.join(tmp, "src.md");
  // source reconstruite depuis le fr du depot
  const t = readJson("src/messages/release-2-2-0/fr.json").tirage;
  const s = t.sections;
  const lines = [`# ${t.title}`, ""];
  const sec = (x, body) => lines.push(`## ${x.title}`, body, "");
  sec(s.organizer, s.organizer.content);
  sec(s.free, s.free.content);
  sec(s.who, s.who.content);
  lines.push(`## ${s.how.title}`, ...s.how.steps.map((x, i) => `${i + 1}. ${x}`), "", s.how.content, "");
  sec(s.dates, `${s.dates.content} ${FB}.`);
  sec(s.prizes, `${s.prizes.lead}**${s.prizes.prize}**${s.prizes.rest ? " " + s.prizes.rest.trimStart() : ""}`);
  sec(s.winners, s.winners.content);
  sec(s.data, `${s.data.content} ${s.data.seeAlso} https://www.mitsitsy.app/privacy.`);
  sec(s.changes, s.changes.content);
  fs.writeFileSync(md, lines.join("\n"));
  const run = () => spawnSync("python3", ["-I", path.join(tmp, "scripts/check-tirage.py"), md], { encoding: "utf8" });
  const base = run();
  assert.equal(base.status, 0, base.stdout + base.stderr);
  for (const l of locales) {
    const f = path.join(dir, `${l}.json`);
    const orig = fs.readFileSync(f, "utf8");
    const data = JSON.parse(orig);
    data.tirage.sections.changes.content += " [a remplir]";
    fs.writeFileSync(f, JSON.stringify(data, null, 2));
    const r = run();
    assert.notEqual(r.status, 0, `${l}: crochet non detecte`);
    fs.writeFileSync(f, orig);
  }
});

test("themes : plus de '4 themes', 5 themes de base cites", () => {
  const old = /\b4 (thèmes|color themes)\b|Loko 4\b/i;
  for (const l of locales) for (const [k, v] of Object.entries(all[l])) assert.ok(!old.test(v), `${l}:${k}`);
  assert.match(all.fr["features.items.themes.description"], /5 thèmes.*Rose.*Turquoise.*Bleu.*Violet.*Orange.*à débloquer/);
  assert.match(all.en["features.items.themes.description"], /5 color themes.*Pink.*Turquoise.*Blue.*Purple.*Orange.*unlock/);
  assert.match(all.mg["features.items.themes.description"], /Loko 5.*Rose.*Turquoise.*Manga.*Volomparasy.*Orange/);
});

test("comptes : plus de 'jusqu'a 3 comptes'", () => {
  const old = /jusqu'à 3 comptes|up to 3 accounts|kaonty 3\b/i;
  for (const l of locales) for (const [k, v] of Object.entries(all[l])) assert.ok(!old.test(v), `${l}:${k}`);
  assert.match(all.fr["features.items.accounts.description"], /Deux comptes de base.*2 comptes personnalisés.*à débloquer/);
  assert.match(all.en["features.items.accounts.description"], /Two basic accounts.*2 custom accounts.*unlock/);
  assert.match(all.mg["features.items.accounts.description"], /Kaonty fototra 2.*kaonty manokana 2/);
});

test("gratuit : plus de '100% gratuit/free/maimaim-poana' dans les messages", () => {
  const old = /100 ?% ?(gratuit|free|maimaim-poana)|toutes les fonctionnalités sont accessibles sans payer|All features are accessible without paying/i;
  for (const l of locales) for (const [k, v] of Object.entries(all[l])) assert.ok(!old.test(v), `${l}:${k} -> ${v}`);
  assert.equal(all.fr["cta.guarantees.earlyAccess"], "Gratuit, sans publicité");
  assert.equal(all.fr["comparison.criteria.price.mitsitsy"], "Gratuit, sans publicité");
  assert.equal(all.en["cta.guarantees.earlyAccess"], "Free, no ads");
  assert.match(all.mg["cta.guarantees.earlyAccess"], /Maimaim-poana/);
});

test("FAQ fr : au present, sans futur sauf la phrase Premium", () => {
  const futur = /\bsera(it)?\b|\bseront\b|\bpourrai\b|dès que l'application/i;
  for (const [k, v] of Object.entries(all.fr).filter(([k]) => k.startsWith("faq."))) {
    const texte = k === "faq.items.free.answer" ? v.replace(/Une version Premium[^.]*à venir, mais l'app de base restera toujours gratuite\./, "") : v;
    assert.ok(!futur.test(texte), `${k} -> ${v}`);
  }
  assert.match(all.fr["faq.items.free.answer"], /Premium.*à venir/);
  assert.match(all.en["faq.items.free.answer"], /Premium.*coming later/);
  assert.match(all.mg["faq.items.free.answer"], /Premium/);
  for (const l of locales) assert.ok(!/\d{4}|€|\$|Ar\b/.test(all[l]["faq.items.free.answer"]), `${l} date/prix Premium`);
});

test("mg : plus de 'en developpement' ni 'bientot' pour l'app, FAQ et pied de page alignes", () => {
  const old = /Mbola eo am-pamolavolana|Ho avy tsy ho ela/;
  for (const [k, v] of Object.entries(all.mg)) assert.ok(!old.test(v), `mg:${k} -> ${v}`);
  assert.match(all.mg["faq.items.availability.answer"], /Google Play/);
  for (const l of locales) assert.match(all[l]["footer.description"], /Google Play/);
});

test("import : reste 'Bientot', aucune date", () => {
  assert.match(all.fr["importBeta.soon"], /bient[oô]t/i);
  assert.match(all.en["importBeta.soon"], /soon/i);
});
