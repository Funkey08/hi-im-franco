import { useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Lightbox from "../../components/fx/Lightbox";
import { COUNTRIES, GALLERY } from "../../data/life";
import { rng } from "../../lib/util";

const countryOf = (iso: string) => COUNTRIES.find((c) => c.iso === iso)?.name ?? "";
const CAPTION = 34; // px: the caption strip under each photo

interface Spot { x: number; y: number; w: number; h: number; r: number }
const overlap = (a: Spot, b: Spot) =>
  Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
const captionOf = (s: Spot): Spot => ({ ...s, y: s.y + s.h - CAPTION, h: CAPTION });

/**
 * Prints tossed onto the desk. Each print gets its own size (from its shape and a seeded random
 * scale) and is dropped as high as it fits: it may slide under the bottom edge of a print above it
 * (higher prints lie on top, so that print's caption stays visible) but may never hide another
 * print's caption or more than a fifth of its photo. Seeded, so the layout is the same on every
 * visit; recomputed on resize. Phones get a simple two-column stack.
 */
function scatter(width: number): { spots: Spot[]; height: number } {
  const R = rng(20261104);
  const frame = (w: number, a: number) => w * 0.88 * a + w * 0.06 + CAPTION;
  if (width < 560) {
    const colW = width / 2, colH = [0, 0];
    const spots = GALLERY.map((g) => {
      const c = colH[0] <= colH[1] ? 0 : 1, w = colW - 8, h = frame(w, g.h / g.w);
      const s = { x: c * colW + 4, y: colH[c], w, h, r: (R() - 0.5) * 4 };
      colH[c] += h + 12;
      return s;
    });
    return { spots, height: Math.max(...colH) };
  }
  const base = width / 4.1;
  const placed: Spot[] = [];
  const ok = (s: Spot) => placed.every((p) => {
    const o = overlap(s, p);
    if (!o) return true;
    const [top, under] = s.y < p.y ? [s, p] : [p, s];
    return overlap(top, captionOf(under)) === 0 && o <= under.w * under.h * 0.2;
  });
  for (const g of GALLERY) {
    const a = g.h / g.w;
    const w = Math.min(width * 0.36, Math.max(width * 0.15, (base * (0.66 + R() * 0.7)) / Math.sqrt(a)));
    const h = frame(w, a);
    const ys = [0, ...placed.flatMap((p) => [p.y + p.h + 10, p.y + p.h - 30, p.y + p.h - h * 0.18])].filter((y) => y >= 0);
    let best: Spot | null = null, bestScore = Infinity;
    for (let k = 0; k < 70; k++) {
      const x = k < 8 ? (k / 7) * (width - w) : R() * (width - w);
      for (const y of ys) {
        const sy = y + (R() - 0.5) * 14;
        if (sy < 0 || sy + R() * 40 > bestScore) continue;
        const cand = { x, y: sy, w, h, r: (R() - 0.5) * 11 };
        if (ok(cand)) { bestScore = sy + R() * 40; best = cand; }
      }
    }
    const floor = placed.reduce((m, q) => Math.max(m, q.y + q.h), 0);
    placed.push(best ?? { x: R() * (width - w), y: floor + 12, w, h, r: (R() - 0.5) * 11 });
  }
  return { spots: placed, height: placed.reduce((m, q) => Math.max(m, q.y + q.h), 0) + 30 };
}

export default function PhotoBoard() {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [open, setOpen] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = box.current!;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const { spots, height } = useMemo(() => (width ? scatter(width) : { spots: [] as Spot[], height: 0 }), [width]);
  const slides = GALLERY.map((g) => ({ src: g.lg, alt: g.place, caption: g.place, sub: [countryOf(g.iso), g.year].filter(Boolean).join(" · "), w: g.w, h: g.h }));

  return (
    <section className="lsec" aria-labelledby="photos-title">
      <h2 className="llabel" id="photos-title">// <b>photos I took</b> <span>{GALLERY.length} prints · click to enlarge</span></h2>
      <div className="board" ref={box} style={{ height }}>
        {spots.map((s, i) => {
          const g = GALLERY[i];
          return (
            <button key={g.slug} type="button" className="print"
              style={{ "--x": `${s.x}px`, "--y": `${s.y}px`, "--w": `${s.w}px`, "--r": `${s.r}deg`, "--d": `${i * 35}ms`, zIndex: Math.round(5000 - s.y) } as CSSProperties}
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
