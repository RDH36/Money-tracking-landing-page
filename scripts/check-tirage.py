#!/usr/bin/env python3
"""Checks that the French draw rules in the i18n messages match the source file word for word.

Usage:
  python3 scripts/check-tirage.py <tirage-reglement.md>           # compare
  python3 scripts/check-tirage.py <tirage-reglement.md> --write   # regenerate the "tirage" block of fr.json
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
FR = ROOT / "src/messages/release-2-2-0/fr.json"
KEYS = ["organizer", "free", "who", "how", "dates", "prizes", "winners", "data", "changes"]
PRIVACY_URL = "https://www.mitsitsy.app/privacy"
FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61588589952468"
LOCALES = ["fr", "en", "mg"]


def parse(path):
    lines = [l.rstrip("\n") for l in open(path, encoding="utf-8")]
    title = lines[0].removeprefix("# ")
    sections, current = [], None
    for line in lines[1:]:
        if line.startswith("## "):
            current = {"title": line[3:], "body": []}
            sections.append(current)
        elif current is not None and line.strip():
            current["body"].append(line)
    return title, sections


def build(title, sections):
    assert len(sections) == len(KEYS), len(sections)
    out = {}
    for key, sec in zip(KEYS, sections):
        body = sec["body"]
        if key == "how":
            steps = [l.split(". ", 1)[1] for l in body if l[0].isdigit()]
            rest = [l for l in body if not l[0].isdigit()]
            out[key] = {"title": sec["title"], "steps": steps, "content": " ".join(rest)}
        elif key == "prizes":
            lead, prize, rest = body[0].split("**")
            out[key] = {"title": sec["title"], "lead": lead, "prize": prize, "rest": rest.strip()}
        elif key == "data":
            content, see = body[0].split(" Voir aussi ")
            assert see == PRIVACY_URL + ".", see
            out[key] = {"title": sec["title"], "content": content, "seeAlso": "Voir aussi"}
        elif key == "dates":
            content, url = " ".join(body).rsplit(" ", 1)
            assert url == FACEBOOK_URL + ".", url
            out[key] = {"title": sec["title"], "content": content}
        else:
            out[key] = {"title": sec["title"], "content": " ".join(body)}
    return {"title": title, "sections": out}


def brackets():
    """Locales whose draw rules still hold a [placeholder] left to fill in."""
    bad = []
    for locale in LOCALES:
        data = json.loads((FR.parent / f"{locale}.json").read_text(encoding="utf-8"))
        if any("[" in v or "]" in v for v in flatten(data["tirage"])):
            bad.append(locale)
    return bad


def flatten(node):
    if isinstance(node, str):
        yield node
    elif isinstance(node, dict):
        for v in node.values():
            yield from flatten(v)
    elif isinstance(node, list):
        for v in node:
            yield from flatten(v)


def main():
    src = sys.argv[1]
    expected = build(*parse(src))
    data = json.loads(FR.read_text(encoding="utf-8"))
    if "--write" in sys.argv:
        tirage = data.setdefault("tirage", {})
        tirage["title"] = expected["title"]
        tirage["sections"] = expected["sections"]
        FR.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print("fr.json updated")
        return 0
    actual = data["tirage"]
    ok = actual["title"] == expected["title"] and actual["sections"] == expected["sections"]
    print("OK: French rules identical to the source" if ok else "FAIL: French rules differ from the source")
    left = brackets()
    if left:
        print("FAIL: [placeholders] left in the draw rules: " + ", ".join(left))
    return 0 if ok and not left else 1


if __name__ == "__main__":
    sys.exit(main())
