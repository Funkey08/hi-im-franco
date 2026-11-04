"""Generate the coloured ASCII portraits used on the site.

Usage (from the repo root):
    python scripts/make_ascii.py            # every art in ARTS
    python scripts/make_ascii.py franco     # just one

Each entry in ARTS reads a transparent PNG from docs/source-art/ and writes
src/assets/ascii/<name>.json:

    {"cols": int, "rows": int, "runs": [[[text, "#rrggbb" | null], ...], ...]}

Each row is a list of runs; consecutive characters with the same colour are merged
to keep the file small. A null colour means transparent (spaces).

Colour treatment: the art sits on the site's warm dark-brown background
(--bg in src/styles/theme.css), so dark tones are lifted (gamma, min_lum),
colours are desaturated a little and pulled toward the warm tube-light tint.
That makes the portraits sit *in* the scene instead of pasted on top of it.
"""
import argparse
import bisect
import colorsys
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "src/assets/ascii"

RAMP = " .:-=+*#%@"      # dark -> bright
CHAR_ASPECT = 0.6        # monospace glyph width / line height
ALPHA_CUTOFF = 90        # below this the cell is treated as transparent
QUANT = 16               # colour quantisation step: fewer distinct colours = longer runs
TUBE_LIGHT = (236, 200, 158)

ARTS = {
    "franco": dict(src="franco_pose.png", cols=70, min_char=3, stretch=True, gamma=0.55, tint_mix=0.14, sat=1.0, min_lum=0.30),
}


def treat(rgb, gamma, tint_mix, sat, min_lum, lum=None) -> str:
    h, l, s = colorsys.rgb_to_hls(*(v / 255 for v in rgb))
    if lum is not None:            # stretched mode: lightness follows the normalised luminance
        l = lum
    l = max(min_lum, l ** gamma)
    rgb = colorsys.hls_to_rgb(h, l, s * sat)
    out = [(1 - tint_mix) * c + tint_mix * t / 255 for c, t in zip(rgb, TUBE_LIGHT)]
    out = [min(255, (int(c * 255) // QUANT) * QUANT + QUANT // 2) for c in out]
    return "#%02x%02x%02x" % tuple(out)


def luminance(rgb) -> float:
    r, g, b = rgb
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255


def cell_char(lum: float, min_char: int) -> str:
    """Brighter = denser glyph. `min_char` keeps dark regions solid enough to read."""
    return RAMP[min(9, max(min_char, int((0.2 + 0.8 * lum) * 9 + 0.5)))]


def build(src: str, cols: int, min_char: int = 2, stretch: bool = False, **tone) -> dict:
    """`stretch`: histogram-equalise luminance over the figure (each cell's brightness becomes its
    percentile rank). Use it for dark-on-dark art (e.g. a black sweater), where raw luminance would
    put nearly every cell on the same glyph and erase the folds and edges."""
    im = Image.open(ROOT / "docs/source-art" / src).convert("RGBA")
    w, h = im.size
    rows = round(cols * CHAR_ASPECT * h / w)
    px = im.resize((cols, rows), Image.BOX).load()
    lums: list[float] = []
    if stretch:
        lums = sorted(luminance(px[x, y][:3]) for y in range(rows) for x in range(cols) if px[x, y][3] >= ALPHA_CUTOFF)
    out = []
    for y in range(rows):
        runs: list[list] = []
        for x in range(cols):
            r, g, b, a = px[x, y]
            if a < ALPHA_CUTOFF:
                ch, col = " ", None
            else:
                lum = luminance((r, g, b))
                if stretch:
                    lum = bisect.bisect_left(lums, lum) / len(lums)
                ch = cell_char(lum, min_char)
                col = treat((r, g, b), **tone, lum=(0.1 + 0.55 * lum) if stretch else None)
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
    ap.add_argument("names", nargs="*", default=list(ARTS), help=f"arts to build (default: all of {list(ARTS)})")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for name in ap.parse_args().names:
        cfg = dict(ARTS[name])
        data = build(cfg.pop("src"), cfg.pop("cols"), **cfg)
        path = OUT_DIR / f"{name}.json"
        path.write_text(json.dumps(data, separators=(",", ":")), encoding="utf-8")
        print(f"wrote {path.relative_to(ROOT)}: {data['cols']}x{data['rows']}, {path.stat().st_size // 1024} KB")
