import { useMemo, useState } from "react";
import world from "../../assets/map/world.json";
import { COUNTRIES, GALLERY, type Country } from "../../data/life";

interface World { w: number; h: number; k: number; tx: number; ty: number; land: string; countries: Record<string, string> }
const W = world as World;

/** Equal Earth projection, identical to scripts/make_world_map.py (same k / tx / ty). */
function project(lat: number, lon: number): [number, number] {
  const A1 = 1.340264, A2 = -0.081106, A3 = 0.000893, A4 = 0.003796, M = Math.sqrt(3) / 2;
  const th = Math.asin(M * Math.sin((lat * Math.PI) / 180));
  const t2 = th * th, t6 = t2 * t2 * t2;
  const x = ((lon * Math.PI) / 180) * Math.cos(th) / (M * (A1 + 3 * A2 * t2 + t6 * (7 * A3 + 9 * A4 * t2)));
  const y = th * (A1 + A2 * t2 + t6 * (A3 + A4 * t2));
  return [x * W.k + W.tx, W.ty - y * W.k];
}

/**
 * Every country visited, lit on a dim world map, with a pin each. Hovering (or focusing) a pin
 * shows the country and its photos; clicking a pin with photos highlights them on the board below.
 */
export default function WorldMap({ onPick }: { onPick: (iso: string) => void }) {
  const [hot, setHot] = useState<string | null>(null);
  const pins = useMemo(() => COUNTRIES.map((c) => {
    const [x, y] = project(c.at[0], c.at[1]);
    return { c, x, y, shots: GALLERY.filter((g) => g.iso === c.iso) };
  }), []);
  const continents = new Set(COUNTRIES.map((c) => c.continent)).size;
  const hp = pins.find((p) => p.c.iso === hot);

  const label = (c: Country, n: number) => `${c.name}${c.note ? `, ${c.note}` : ""}${n ? `: ${n} photo${n > 1 ? "s" : ""} below` : ""}`;

  return (
    <section className="lsec" aria-labelledby="map-title">
      <h2 className="llabel" id="map-title">// <b>where I've been</b> <span>{COUNTRIES.length} countries · {continents} continents</span></h2>
      <div className="map">
        <svg viewBox={`0 0 ${W.w} ${W.h}`} role="img" aria-label={`World map: ${COUNTRIES.map((c) => c.name).join(", ")}`}>
          <defs>
            <pattern id="map-grid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M25 0H0V25" fill="none" stroke="rgba(255,190,120,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={W.w} height={W.h} fill="url(#map-grid)" />
          <path d={W.land} className="map-land" />
          {Object.entries(W.countries).map(([iso, d]) => (
            <path key={iso} d={d} className={`map-visited${hot === iso ? " hot" : ""}`} />
          ))}
          {pins.map(({ c, x, y, shots }) => (
            <g key={c.iso} className={`map-pin${hot === c.iso ? " hot" : ""}${shots.length ? " has" : ""}`} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
              tabIndex={0} role="button" aria-label={label(c, shots.length)} data-probe={shots.length ? "PHOTOS" : c.name.toUpperCase()}
              onPointerEnter={() => setHot(c.iso)} onPointerLeave={() => setHot((h) => (h === c.iso ? null : h))}
              onFocus={() => setHot(c.iso)} onBlur={() => setHot((h) => (h === c.iso ? null : h))}
              onClick={() => shots.length && onPick(c.iso)}
              onKeyDown={(e) => { if ((e.key === "Enter" || e.key === " ") && shots.length) { e.preventDefault(); onPick(c.iso); } }}>
              <circle r="11" className="map-pin-hit" />
              <circle r="7" className="map-pin-ring" />
              <circle r="3.2" className="map-pin-dot" />
            </g>
          ))}
        </svg>
        {hp && (
          <div className={`map-card${hp.x > W.w * 0.62 ? " left" : ""}`} aria-hidden="true"
            style={{ left: `${(hp.x / W.w) * 100}%`, top: `${(hp.y / W.h) * 100}%` }}>
            <b>{hp.c.name}</b>
            {hp.c.note && <span>{hp.c.note}</span>}
            {hp.shots.length > 0 && (
              <>
                <div className="map-card-thumbs">{hp.shots.slice(0, 3).map((s) => <img key={s.slug} src={s.sm} alt="" />)}</div>
                <small>click to find {hp.shots.length > 1 ? "them" : "it"} below ↓</small>
              </>
            )}
          </div>
        )}
      </div>
      <ul className="map-list">
        {COUNTRIES.map((c) => (
          <li key={c.iso} className={hot === c.iso ? "hot" : ""} onPointerEnter={() => setHot(c.iso)} onPointerLeave={() => setHot((h) => (h === c.iso ? null : h))}>{c.name}</li>
        ))}
      </ul>
    </section>
  );
}
