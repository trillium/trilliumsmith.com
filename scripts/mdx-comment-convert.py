#!/usr/bin/env python3
"""Convert HTML comments (<!-- ... -->) to MDX comments ({/* ... */}) in .mdx files.

Run as a pre-commit hook: converts in-place, re-stages, exits 0.
Handles single-line and multi-line HTML comments.
"""
import re
import subprocess
import sys


def convert_file(path: str) -> bool:
    with open(path, "r") as f:
        content = f.read()

    # Match <!-- ... --> (non-greedy, DOTALL for multi-line)
    converted = re.sub(r"<!--\s(.*?)\s-->", r"{/* \1 */}", content, flags=re.DOTALL)

    if converted == content:
        return False

    with open(path, "w") as f:
        f.write(converted)
    return True


def main():
    # Get staged .mdx files
    result = subprocess.run(
        ["git", "diff", "--cached", "--name-only", "--diff-filter=ACM"],
        capture_output=True, text=True,
    )
    files = [f for f in result.stdout.strip().splitlines() if f.endswith(".mdx")]

    changed = []
    for path in files:
        if convert_file(path):
            changed.append(path)

    if changed:
        # Re-stage the converted files
        subprocess.run(["git", "add"] + changed, check=True)
        print(f"Converted HTML comments → MDX in: {', '.join(changed)}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
