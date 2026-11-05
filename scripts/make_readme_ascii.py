"""Render src/assets/ascii/franco.json (coloured ASCII runs) to a PNG card for the README."""
import json
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
art = json.load(open(ROOT / "src/assets/ascii/franco.json", encoding="utf-8"))
FONT = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 13)
cw = FONT.getlength("M")
ch = 13
pad = 34
W, H = int(art["cols"] * cw + pad * 2), int(art["rows"] * ch + pad * 2)
im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
d = ImageDraw.Draw(im)
d.rounded_rectangle((0, 0, W - 1, H - 1), radius=22, fill="#1c1611", outline="#3e3025", width=2)
for r, runs in enumerate(art["runs"]):
    x = pad
    for text, col in runs:
        if col:
            d.text((x, pad + r * ch), text, font=FONT, fill=col)
        x += len(text) * cw
out = ROOT / "docs/readme/franco-ascii.png"
out.parent.mkdir(parents=True, exist_ok=True)
im.save(out, optimize=True)
print(out, im.size, out.stat().st_size // 1024, "KB")
