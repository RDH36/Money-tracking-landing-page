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
        else:
            out[key] = {"title": sec["title"], "content": " ".join(body)}
    return {"title": title, "sections": out}


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
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
