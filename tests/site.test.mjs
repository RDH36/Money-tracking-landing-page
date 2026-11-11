import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { root, walk, read, merged } from "./helpers.mjs";

const rel = (f) => path.relative(root, f);

test("sitemap contient /fr /en /mg /tirage (routing.locales)", () => {
  const sm = read("src/app/sitemap.ts");
  assert.match(sm, /routing\.locales\.map/);
  assert.match(sm, /\/\$\{locale\}\/tirage/);
  const routing = read("src/i18n/routing.ts");
  for (const l of ["fr", "en", "mg"]) assert.match(routing, new RegExp(`"${l}"`));
  assert.ok(fs.existsSync(path.join(root, "src/app/[locale]/tirage/page.tsx")));
});

test("pied de page : lien auteur vers dzeryhago.com en target=_blank rel=noopener", () => {
  const f = read("src/components/layout/Footer.tsx");
  assert.match(f, /href=\{siteConfig\.authorUrl\}\s+target="_blank"\s+rel="noopener"/);
  assert.match(read("src/constants/content.ts"), /authorUrl:\s*"https:\/\/dzeryhago\.com"/);
});

test("aucun lien target=_blank sans rel noopener", () => {
  for (const f of walk(path.join(root, "src"), (x) => /\.tsx$/.test(x))) {
    for (const m of read(rel(f)).matchAll(/<a\b[^>]*target="_blank"[^>]*>/g))
      assert.match(m[0], /rel="[^"]*noopener/, `${rel(f)}: ${m[0]}`);
  }
});

test("composants morts supprimes, dossier sections/ absent", () => {
  assert.ok(!fs.existsSync(path.join(root, "src/components/sections")));
  for (const f of walk(path.join(root, "src"), (x) => /\.tsx?$/.test(x)))
    assert.ok(!/Testimonials/.test(path.basename(f)), rel(f));
});

test("page d'accueil : wrapper .lp, viewport exporte, pas d'import mort", () => {
  const p = read("src/app/[locale]/page.tsx");
  assert.match(p, /className="lp"/);
  assert.match(p, /export const viewport/);
  for (const m of p.matchAll(/from "(@\/[^"]+)"/g))
    assert.ok(
      ["", ".ts", ".tsx"].some((e) => fs.existsSync(path.join(root, "src", m[1].slice(2) + e))),
      `import introuvable ${m[1]}`
    );
});

test("tous les imports @/ des sources se resolvent", () => {
  for (const f of walk(path.join(root, "src"), (x) => /\.tsx?$/.test(x))) {
    for (const m of read(rel(f)).matchAll(/from "@\/([^"]+)"/g)) {
      const base = path.join(root, "src", m[1]);
      assert.ok(
        ["", ".ts", ".tsx", "/index.ts", "/index.tsx"].some((e) => fs.existsSync(base + e)),
        `${rel(f)} -> @/${m[1]}`
      );
    }
  }
});

test("emplacement VerticalVideo : poster, pas de video provisoire", () => {
  const v = read("src/components/media/VerticalVideo.tsx");
  assert.match(v, /poster/);
  assert.ok(!fs.existsSync(path.join(root, "public/videos/teaser-import.mp4")) ||
    process.env.NEXT_PUBLIC_TEASER_IMPORT !== undefined);
  const dir = path.join(root, "public/videos");
  const vids = fs.existsSync(dir) ? fs.readdirSync(dir).filter((n) => /\.(mp4|webm|mov)$/.test(n)) : [];
  assert.deepEqual(vids, [], "video provisoire presente");
});

test("captures referencees existent", () => {
  for (const f of ["app/home-light.jpg", "app/home-dark.jpg", "app/add-light.jpg", "app/add-dark.jpg", "import/import-done.jpg"])
    assert.ok(fs.existsSync(path.join(root, "public", f)), f);
});

test("aucune ligne de CSS ne pose de largeur fixe > 360 hors media query (garde-fou debordement)", () => {
  for (const f of walk(path.join(root, "src/app/styles"), (x) => x.endsWith(".css"))) {
    const css = read(rel(f)).replace(/@media[^{]+\{[\s\S]*?\}\s*\}/g, "");
    for (const m of css.matchAll(/(?:^|[;{\s])(?:min-)?width:\s*(\d+)px/g))
      assert.ok(Number(m[1]) <= 360, `${rel(f)}: width ${m[1]}px`);
  }
});

test("mg : plus de libelle 'pas encore sorti' sur les CTA (navigation, hero, cta)", () => {
  const m = merged("mg");
  const txt = JSON.stringify([m.navigation, m.hero, m.cta]);
  assert.ok(!/rehefa mivoaka|Ho avy tsy ho ela|Ampandrenesina/.test(txt), txt);
  assert.equal(m.navigation.getNotified, "Alao");
  assert.equal(m.hero.comingSoon, "Efa azo alaina amin'ny Android");
  assert.equal(m.hero.notifyLaunch, "Alao maimaim-poana");
  assert.equal(m.cta.comingSoon, "Efa azo alaina");
  assert.equal(m.cta.guarantees.notification, "Azo alaina ao amin'ny Google Play");
});

test("titre du tirage : insecables dans les guillemets francais, sans effet sur en/mg", () => {
  const src = read("src/app/[locale]/tirage/page.tsx");
  assert.match(src, /replace\(\/« \/g, "«\\u00a0"\)\.replace\(\/ »\/g, "\\u00a0»"\)/);
  const fix = (s) => s.replace(/« /g, "«\u00a0").replace(/ »/g, "\u00a0»");
  const fr = fix(merged("fr").tirage.title);
  assert.ok(!/« | »/.test(fr));
  if (/«/.test(merged("fr").tirage.title)) assert.match(fr, /«\u00a0.+\u00a0»/);
  for (const l of ["en", "mg"]) {
    const t = merged(l).tirage.title;
    // le titre peut reprendre « » (mg) : seul l'espace change, jamais le texte
    assert.equal(fix(t).replace(/ /g, " "), t);
  }
});

test("fichiers <= 250 lignes", () => {
  const files = [...walk(path.join(root, "src")), ...walk(path.join(root, "tests")), ...walk(path.join(root, "scripts"))];
  for (const f of files.filter((x) => /\.(tsx?|css|mjs|json|py)$/.test(x))) {
    const n = fs.readFileSync(f, "utf8").split("\n").length - 1;
    assert.ok(n <= 250, `${rel(f)}: ${n} lignes`);
  }
});

test("<= 7 fichiers par dossier (src, tests)", () => {
  for (const top of ["src", "tests"]) {
    const dirs = [path.join(root, top), ...fs.readdirSync(path.join(root, top), { recursive: true })
      .map((d) => path.join(root, top, d)).filter((d) => fs.statSync(d).isDirectory())];
    for (const d of dirs) {
      const n = fs.readdirSync(d, { withFileTypes: true }).filter((e) => e.isFile()).length;
      assert.ok(n <= 7, `${rel(d)}: ${n} fichiers`);
    }
  }
});
