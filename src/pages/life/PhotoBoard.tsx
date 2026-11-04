import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Lightbox from "../../components/fx/Lightbox";
import { COUNTRIES, GALLERY } from "../../data/life";
import { reducedMotion, rng } from "../../lib/util";

const countryOf = (iso: string) => COUNTRIES.find((c) => c.iso === iso)?.name ?? "";

interface Spot { x: number; y: number; w: number; r: number }

/**
 * Photos scattered across the bench like prints on a desk: a seeded masonry layout with jitter,
 * tilt and a little overlap (higher prints lie on top, so a caption is never covered). Hover straightens and lifts
 * a print; click opens the lightbox. `pick` (from the map) highlights one country's prints.
 */
export default function PhotoBoard({ pick }: { pick: { iso: string; n: number } | null }) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const [lit, setLit] = useState<string | null>(null);

  useLayoutEffect(() => {
    const el = box.current!;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const { spots, height } = useMemo(() => {
    if (!width) return { spots: [] as Spot[], height: 0 };
    const cols = width >= 1000 ? 5 : width >= 760 ? 4 : width >= 520 ? 3 : 2;
    const tight = cols <= 2;
    const colW = width / cols;
    const R = rng(20261104);
    const colH = new Array(cols).fill(tight ? 0 : 18);
    const spots = GALLERY.map((g) => {
      const c = colH.indexOf(Math.min(...colH));
      const w = colW * (tight ? 0.94 : 0.84 + R() * 0.08);
      const h = w * 0.88 * (g.h / g.w) + w * 0.06 + 34; // image + frame + caption strip
      const jx = tight ? 0 : (R() - 0.5) * colW * 0.16;
      const x = c * colW + (colW - w) / 2 + jx;
      const y = colH[c] + (tight ? 0 : (R() - 0.5) * 18);
      colH[c] += h * (tight ? 1 : 0.95) + (tight ? 12 : 0);
      return { x, y, w, r: (R() - 0.5) * (tight ? 4 : 11) };
    });
    return { spots, height: Math.max(...colH) + (tight ? 0 : 50) };
  }, [width]);

  // a pin was clicked on the map: scroll here and light that country's prints for a few seconds
  useEffect(() => {
    if (!pick) return;
    setLit(pick.iso);
    box.current?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
    const t = window.setTimeout(() => setLit(null), 3600);
    return () => window.clearTimeout(t);
  }, [pick]);

  const slides = GALLERY.map((g) => ({ src: g.lg, alt: g.place, caption: g.place, sub: [countryOf(g.iso), g.year].filter(Boolean).join(" · "), w: g.w, h: g.h }));

  return (
    <section className="lsec" aria-labelledby="photos-title">
      <h2 className="llabel" id="photos-title">// <b>photos I took</b> <span>{GALLERY.length} prints · click to enlarge</span></h2>
      <div className={`board${lit ? " picking" : ""}`} ref={box} style={{ height }}>
        {spots.map((s, i) => {
          const g = GALLERY[i];
          return (
            <button key={g.slug} type="button" className={`print${lit === g.iso ? " lit" : ""}`}
              style={{ "--x": `${s.x}px`, "--y": `${s.y}px`, "--w": `${s.w}px`, "--r": `${s.r}deg`, "--d": `${i * 45}ms`, zIndex: Math.round(1000 - s.y) } as CSSProperties}
              onClick={() => setOpen(i)} data-probe="ENLARGE" aria-label={`${g.place}, ${countryOf(g.iso)}`}>
              <img src={g.sm} alt="" width={g.w} height={g.h} loading="lazy" decoding="async" />
              <span>{g.place}</span>
            </button>
          );
        })}
      </div>
      {open !== null && <Lightbox slides={slides} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}
