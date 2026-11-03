"""Generate the coloured ASCII version of the Kurisu art used in the site footer.

Usage (from the repo root):
    python scripts/make_ascii.py [--cols 66]

Reads  docs/source-art/kurisu_pose.png  (transparent PNG)
Writes src/assets/easter-eggs/kurisu_ascii.json

Output format: {"cols": int, "rows": int, "runs": [[[text, "#rrggbb" | null], ...], ...]}
Each row is a list of runs; consecutive characters with the same colour are merged
to keep the file small. A null colour means transparent (spaces).
"""
import argparse
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "docs/source-art/kurisu_pose.png"
OUT = ROOT / "src/assets/easter-eggs/kurisu_ascii.json"

RAMP = " .:-=+*#%@"      # dark -> bright
CHAR_ASPECT = 0.6        # monospace glyph width / line height
ALPHA_CUTOFF = 90        # below this the cell is treated as transparent
GAMMA = 0.62             # lifts dark tones (hair, tights) so they stay readable on #0b0806
QUANT = 20               # colour quantisation step: fewer distinct colours = longer runs


def cell_colour(r: int, g: int, b: int) -> str:
    c = [min(255, int(255 * ((v / 255) ** GAMMA)) + 8) for v in (r, g, b)]
    c = [min(255, (v // QUANT) * QUANT + QUANT // 2) for v in c]
    return "#%02x%02x%02x" % tuple(c)


def cell_char(r: int, g: int, b: int) -> str:
    lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
    return RAMP[min(9, max(2, int((0.2 + 0.8 * lum) * 9 + 0.5)))]


def build(cols: int) -> dict:
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    rows = round(cols * CHAR_ASPECT * h / w)
    px = im.resize((cols, rows), Image.BOX).load()
    out = []
    for y in range(rows):
        runs: list[list] = []
        for x in range(cols):
            r, g, b, a = px[x, y]
            ch, col = (" ", None) if a < ALPHA_CUTOFF else (cell_char(r, g, b), cell_colour(r, g, b))
            if runs and runs[-1][1] == col:
                runs[-1][0] += ch
            else:
                runs.append([ch, col])
        while runs and runs[-1][1] is None:   # drop trailing transparency
            runs.pop()
        out.append(runs)
    return {"cols": cols, "rows": rows, "runs": out}


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    ap.add_argument("--cols", type=int, default=66)
    data = build(ap.parse_args().cols)
    OUT.write_text(json.dumps(data, separators=(",", ":")), encoding="utf-8")
    print(f"wrote {OUT.relative_to(ROOT)}: {data['cols']}x{data['rows']}")
