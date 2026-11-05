import { useState, type PointerEvent } from "react";
import world from "../../assets/map/world.json";
import { COUNTRIES } from "../../data/life";

interface World {
  w: number; h: number; land: string;
  countries: Record<string, string>; centers: Record<string, [number, number]>; small: string[];
}
const W = world as unknown as World;
const BY_ISO = new Map(COUNTRIES.map((c) => [c.iso, c]));

/**
 * Every country visited, lit on a dim world map. Hovering (or focusing) a country shows its name
 * next to the cursor; tiny ones (Singapore) get a larger invisible hover target.
 */
export default function WorldMap() {
  const [hot, setHot] = useState<{ iso: string; x: number; y: number } | null>(null);

  const at = (iso: string, e?: PointerEvent<SVGElement>) => {
    if (e) {
      const r = (e.currentTarget.ownerSVGElement ?? (e.currentTarget as unknown as SVGSVGElement)).getBoundingClientRect();
      setHot({ iso, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    } else {
      const [cx, cy] = W.centers[iso];
      setHot({ iso, x: (cx / W.w) * 100, y: (cy / W.h) * 100 });
    }
  };
  const leave = (iso: string) => () => setHot((h) => (h?.iso === iso ? null : h));
  const c = hot && BY_ISO.get(hot.iso);

  return (
    <section className="lsec" aria-labelledby="map-title">
      <h2 className="llabel" id="map-title">// <b>where I've been</b> <span className="llabel-aside">…and where I left part of myself behind</span></h2>
      <div className="map">
        <svg viewBox={`0 0 ${W.w} ${W.h}`} role="img" aria-label={`World map: ${COUNTRIES.map((x) => x.name).join(", ")}`}>
          <defs>
            <pattern id="map-grid" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M25 0H0V25" fill="none" stroke="rgba(255,190,120,0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width={W.w} height={W.h} fill="url(#map-grid)" />
          <path d={W.land} className="map-land" />
          {Object.entries(W.countries).map(([iso, d]) => {
            const name = BY_ISO.get(iso)?.name ?? "";
            return (
              <g key={iso} className={`map-country${hot?.iso === iso ? " hot" : ""}`} tabIndex={0} aria-label={name}
                onPointerMove={(e) => at(iso, e)} onPointerLeave={leave(iso)} onFocus={() => at(iso)} onBlur={leave(iso)}>
                <path d={d} className="map-visited" />
                {W.small.includes(iso) && <circle cx={W.centers[iso][0]} cy={W.centers[iso][1]} r="9" className="map-hit" />}
              </g>
            );
          })}
        </svg>
        {hot && c && (
          <div className={`map-tip${hot.x > 70 ? " left" : ""}`} aria-hidden="true" style={{ left: `${hot.x}%`, top: `${hot.y}%` }}>
            <b>{c.name}</b>{c.note && <span>{c.note}</span>}
          </div>
        )}
      </div>
      <ul className="map-list">
        {COUNTRIES.map((x) => (
          <li key={x.iso} className={hot?.iso === x.iso ? "hot" : ""} onPointerEnter={() => at(x.iso)} onPointerLeave={leave(x.iso)}>{x.name}</li>
        ))}
      </ul>
    </section>
  );
}
