import test from "node:test";
import assert from "node:assert/strict";
import { locales, merged, flatten, read } from "./helpers.mjs";

const all = Object.fromEntries(locales.map((l) => [l, flatten(merged(l))]));

test("newsletter : la case de consentement n'est jamais pre-cochee", () => {
  const form = read("src/components/closing/NewsletterForm.tsx");
  const box = form.match(/<input[^>]*name="newsletterApproval"[^>]*\/?>/s);
  assert.ok(box, "case introuvable");
  assert.ok(!/defaultChecked|checked/.test(box[0]), box[0]);
});

test("newsletter : aucun autre composant ne pre-coche la case", () => {
  const hits = ["src/components/closing/NewsletterForm.tsx", "src/actions/newsletter.ts"].map(read);
  for (const src of hits) assert.ok(!/defaultChecked/.test(src));
});

test("newsletter : l'action accepte l'envoi sans la case (approval false)", () => {
  const act = read("src/actions/newsletter.ts");
  assert.match(act, /formData\.get\("newsletterApproval"\) === "true"/);
  assert.match(act, /newsletter_approval: newsletterApproval/);
  assert.ok(!/if \(!newsletterApproval/.test(act), "l'action ne doit pas exiger la case");
});

test("tirage : phrase sur les mineurs en fr, en et mg", () => {
  assert.match(all.fr["tirage.sections.who.content"], /Les mineurs participent avec l'accord d'un parent ou d'un représentant légal\.$/);
  assert.match(all.en["tirage.sections.who.content"], /Minors may take part with the consent of a parent or legal guardian\.$/);
  assert.match(all.mg["tirage.sections.who.content"], /Ny zaza tsy ampy taona dia mandray anjara .*ara-dalàna\.$/);
});

test("metadonnees : og:image:alt localise pour fr, en, mg", () => {
  const src = read("src/app/[locale]/layout.tsx");
  for (const l of ["fr", "en", "mg"]) assert.match(src, new RegExp(`${l}: "Mitsitsy - `));
  assert.match(src, /alt: shareAlts\[locale\] \|\| shareAlts\.en/);
});
