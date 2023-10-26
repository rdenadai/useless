from pathlib import Path
from random import choice

try:
    from orjson import loads
except ImportError:
    from json import loads


def main() -> int:
    with open(f"{Path().absolute()}/words.json", encoding="utf-8") as fh:
        bands = loads(fh.read()) or {}
    adjectives = bands.get("adjectives", [])
    nouns = bands.get("nouns", [])

    while (_ := input("New Band name? (y/n) ").lower()) == "y":
        print("- ", choice(adjectives), choice(nouns))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        ...
