"""
World map for the Life page: Natural Earth 1:110m countries (world-atlas topojson), Equal Earth
projection, Antarctica dropped. Writes src/assets/map/world.json:

    { "w", "h", "k", "tx", "ty", "land": "<path d of every other country>",
      "countries": { "<ISO numeric>": "<path d>" } }   # only the visited ones, so they can light up

Visited countries too small for 1:110m (Singapore) are taken from 1:50m. "centers" gives each
visited country a label anchor (largest ring's centroid) and "small" lists ones that need a
bigger invisible hover target.

    curl -L -o countries-110m.json https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
    curl -L -o countries-50m.json https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json
    python scripts/make_world_map.py countries-110m.json countries-50m.json
"""
import json
import math
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
# Must match COUNTRIES[].iso in src/data/life.ts.
VISITED = {"124", "840", "702", "392", "410", "608", "458", "360", "764", "704", "158",
           "380", "756", "250", "826", "300", "688"}
W = 1000.0

A1, A2, A3, A4 = 1.340264, -0.081106, 0.000893, 0.003796
M = math.sqrt(3) / 2


def equal_earth(lon: float, lat: float) -> tuple[float, float]:
    th = math.asin(M * math.sin(math.radians(lat)))
    t2 = th * th
    t6 = t2 * t2 * t2
    x = math.radians(lon) * math.cos(th) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2)))
    y = th * (A1 + A2 * t2 + t6 * (A3 + A4 * t2))
    return x, y


def load(topo_path: str) -> dict[str, list[list[tuple[float, float]]]]:
    topo = json.load(open(topo_path, encoding="utf-8"))
    sx, sy = topo["transform"]["scale"]
    ox, oy = topo["transform"]["translate"]
    arcs = []
    for arc in topo["arcs"]:
        x = y = 0
        pts = []
        for dx, dy in arc:
            x += dx; y += dy
            pts.append((x * sx + ox, y * sy + oy))
        arcs.append(pts)

    def ring(idx: list[int]) -> list[tuple[float, float]]:
        out: list[tuple[float, float]] = []
        for i in idx:
            pts = arcs[i] if i >= 0 else arcs[~i][::-1]
            out.extend(pts if not out else pts[1:])
        return out

    geoms = [g for g in topo["objects"]["countries"]["geometries"] if g.get("id") != "010"]  # no Antarctica
    polys: dict[str, list[list[tuple[float, float]]]] = {}
    for g in geoms:
        rings = []
        if g["type"] == "Polygon":
            rings = [ring(r) for r in g["arcs"]]
        elif g["type"] == "MultiPolygon":
            rings = [ring(r) for p in g["arcs"] for r in p]
        polys[g.get("id") or g["properties"]["name"]] = [[equal_earth(lo, la) for lo, la in r] for r in rings]
    return polys


def main(topo_path: str, fine_path: str) -> None:
    polys = load(topo_path)
    fine = load(fine_path)
    for iso in VISITED - set(polys):
        polys[iso] = fine[iso]

    xs = [x for rs in polys.values() for r in rs for x, _ in r]
    ys = [y for rs in polys.values() for r in rs for _, y in r]
    k = W / (max(xs) - min(xs))
    tx, ty = -min(xs) * k, max(ys) * k
    h = (max(ys) - min(ys)) * k

    def d_of(rings) -> str:
        parts = []
        for r in rings:
            runs, pts, last = [], [], None
            for x, y in r:
                p = (round(x * k + tx, 1), round(ty - y * k, 1))
                if last and abs(p[0] - last[0]) > W / 2:  # crosses the antimeridian: start a new run
                    runs.append(pts); pts = []
                elif last and abs(p[0] - last[0]) < 0.7 and abs(p[1] - last[1]) < 0.7:
                    continue
                pts.append(p); last = p
            runs.append(pts)
            for pts in runs:
                if len(pts) >= 3:
                    parts.append("M" + "L".join(f"{x:g},{y:g}" for x, y in pts) + "Z")
        return "".join(parts)

    def center(rings) -> list[float]:
        r = max(rings, key=len)
        return [round(sum(x for x, _ in r) / len(r) * k + tx, 1), round(ty - sum(y for _, y in r) / len(r) * k, 1)]

    def span(rings) -> float:
        xs2 = [x for r in rings for x, _ in r]; ys2 = [y for r in rings for _, y in r]
        return max(max(xs2) - min(xs2), max(ys2) - min(ys2)) * k

    out = {"w": W, "h": round(h, 1), "k": k, "tx": tx, "ty": ty,
           "land": "".join(d_of(r) for i, r in polys.items() if i not in VISITED),
           "countries": {i: d_of(r) for i, r in polys.items() if i in VISITED},
           "centers": {i: center(r) for i, r in polys.items() if i in VISITED},
           "small": sorted(i for i, r in polys.items() if i in VISITED and span(r) < 8)}
    missing = VISITED - set(out["countries"])
    dest = ROOT / "src/assets/map/world.json"
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(json.dumps(out, separators=(",", ":")), encoding="utf-8")
    print(f"{dest.stat().st_size / 1024:.0f} KB, h={h:.0f}, visited drawn={len(out['countries'])}, missing={sorted(missing)}, small={out['small']}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
