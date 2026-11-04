"""
Render an ASCII art JSON (src/assets/ascii/<name>.json) to a coloured SVG for the README.

    python scripts/ascii_to_svg.py franco docs/readme/franco-ascii.svg
"""
import json
import sys
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FS, CW, LH = 9, 5.42, 9.6          # font size, monospace advance (≈0.6 em), line height
PAD = 18
BG = "#1c1611"                      # the site's background, so it reads the same on light and dark GitHub


def main(name: str, out: str) -> None:
    d = json.loads((ROOT / f"src/assets/ascii/{name}.json").read_text(encoding="utf-8"))
    cols, rows, runs = int(d["cols"]), int(d["rows"]), d["runs"]
    if isinstance(runs, str):
        runs = json.loads(runs)
    w, h = cols * CW + 2 * PAD, rows * LH + 2 * PAD
    lines = []
    for i, row in enumerate(runs):
        spans, x = [], 0
        for text, color in row:
            if color and text.strip():
                spans.append(f'<tspan x="{PAD + x * CW:.1f}" fill="{color}">{escape(text)}</tspan>')
            x += len(text)
        if spans:
            lines.append(f'<text y="{PAD + (i + 0.8) * LH:.1f}">{"".join(spans)}</text>')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:.0f}" height="{h:.0f}" viewBox="0 0 {w:.1f} {h:.1f}">'
           f'<rect width="100%" height="100%" rx="14" fill="{BG}"/>'
           f'<g font-family="JetBrains Mono, Consolas, Menlo, monospace" font-size="{FS}" xml:space="preserve">'
           + "".join(lines) + "</g></svg>")
    p = ROOT / out
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(svg, encoding="utf-8")
    print(p, f"{p.stat().st_size / 1024:.0f} KB", f"{w:.0f}x{h:.0f}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
