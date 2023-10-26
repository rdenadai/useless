from pathlib import Path
from random import choice


def main() -> int:
    with open(f"{Path().absolute()}/compliments.txt") as fh:
        compliments = fh.readlines()

    while (_ := input("Want a compliment? (y/n) ").lower()) == "y":
        print(choice(compliments))

    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        ...
