"""
Life-page photos: resize Franco's originals into small/large AVIFs with all metadata stripped
(the originals carry GPS). Re-run after changing PICKS.

    python scripts/make_life_photos.py ["<folder holding japan/, Photos-1-001/, miscellaenous stuff/>"]

The originals live outside the repo, in ../life-photo-originals/ (the default).

Writes src/assets/life/<group>/<slug>-sm.avif (≤ 640 px), <slug>-lg.avif (≤ 1800 px, gallery only)
and src/assets/life/sizes.json ({slug: [w, h]} of the small file, so layouts can reserve space).
"""
import json
import sys
from pathlib import Path

import pillow_heif
from PIL import Image, ImageOps

pillow_heif.register_heif_opener()
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src/assets/life"

# group, slug, source (relative to the source folder)
PICKS = [
    ("gallery", "miyajima-torii", "japan/IMG_1924_Original.HEIC"),
    ("gallery", "mount-fuji", "japan/F095190F-4E2A-4C92-B92D-01F4CE7A9C5C.png"),
    ("gallery", "kamakura-daibutsu", "japan/IMG_6832.JPG"),
    ("gallery", "maeklong-railway-market", "Photos-1-001/IMG_0352.HEIC"),
    ("gallery", "ayutthaya", "Photos-1-001/IMG_0778.HEIC"),
    ("gallery", "stellisee-zermatt", "Photos-1-001/IMG_2130.HEIC"),
    ("gallery", "rochers-de-naye", "Photos-1-001/IMG_7857.HEIC"),
    ("gallery", "tower-bridge", "Photos-1-001/IMG_3855.HEIC"),
    ("gallery", "leadenhall-market", "Photos-1-001/IMG_3909.HEIC"),
    ("gallery", "oxford", "Photos-1-001/IMG_4226.HEIC"),
    ("gallery", "brooklyn-bridge", "Photos-1-001/IMG_4083.HEIC"),
    ("gallery", "ninh-binh", "Photos-1-001/IMG_4563.HEIC"),
    ("gallery", "hanoi-train-street", "Photos-1-001/IMG_3798.HEIC"),
    ("gallery", "taipei-at-night", "Photos-1-001/IMG_8602.HEIC"),
    ("gallery", "jiufen", "Photos-1-001/IMG_9329.HEIC"),
    ("gallery", "st-marks-venice", "Photos-1-001/IMG_9053.HEIC"),
    ("gallery", "ninh-binh-by-bike", "Photos-1-001/IMG_4386.HEIC"),
    ("gallery", "big-ben", "Photos-1-001/IMG_3452.HEIC"),
    ("gallery", "feet-in-the-grass", "Photos-1-001/IMG_0397.HEIC"),
    ("gallery", "toblerone", "Photos-1-001/DSC00568_01.jpg"),
    ("gallery", "montreux-church", "Photos-1-001/IMG_7288.HEIC"),
    ("gallery", "st-pauls-alley", "Photos-1-001/IMG_4458.HEIC"),
    ("gallery", "hai-van-pass", "Photos-1-001/IMG_2252.HEIC"),
    ("gallery", "upside-down-capybara", "Photos-1-001/IMG_7482.HEIC"),
    ("gallery", "pointing-out-to-sea", "japan/IMG_6837_Original.JPG"),
    ("gallery", "suga-shrine-stairs", "japan/C1165805-E8A1-4CC9-8EED-229E0C245AA3.png"),
    ("gallery", "shinjuku-at-night", "japan/4E99E8A2-91ED-4A1C-A432-66FBD9AF9810.jpg"),
    ("gallery", "nara-deer", "japan/IMG_6957.PNG"),
    ("gallery", "local-train", "japan/CD2D08D0-D81E-44D8-9A0F-B188604BE440.png"),
    ("gallery", "leblanc", "japan/IMG_5869.HEIC"),
    ("facts", "singapore-night-shift", "miscellaenous stuff/IMG_1585.heic"),
    ("facts", "uoft-graduation", "miscellaenous stuff/DSCF4330.jpg"),
    ("facts", "lost-in-japan", "miscellaenous stuff/IMG_2882.HEIC"),
    ("facts", "seoul-summit", "miscellaenous stuff/IMG_5258.heic"),
    ("facts", "pope-leo", "miscellaenous stuff/IMG_6791.HEIC"),
]
SIZES = {"sm": (640, 52), "lg": (1800, 56)}


def main(src: Path) -> None:
    total = 0
    sizes: dict[str, list[int]] = {}
    for group, slug, rel in PICKS:
        im = ImageOps.exif_transpose(Image.open(src / rel)).convert("RGB")
        (OUT / group).mkdir(parents=True, exist_ok=True)
        for tag, (edge, q) in SIZES.items():
            if group == "facts" and tag == "lg":
                continue
            out = im.copy()
            out.thumbnail((edge, edge), Image.Resampling.LANCZOS)
            p = OUT / group / f"{slug}-{tag}.avif"
            out.save(p, quality=q)  # a fresh RGB image: no EXIF/GPS is written
            if tag == "sm":
                sizes[slug] = list(out.size)
            total += p.stat().st_size
        print(f"{group}/{slug}: {im.size}")
    (OUT / "sizes.json").write_text(json.dumps(sizes, indent=1), encoding="utf-8")
    print(f"total {total / 1e6:.2f} MB")


if __name__ == "__main__":
    main(Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / "life-photo-originals")
