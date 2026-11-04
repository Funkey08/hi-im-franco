import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CONTINENTS, INSTITUTIONS, type Institution } from "../../data/work";
import { reducedMotion } from "../../lib/util";

interface Pulse { i: number; t0: number; dur: number; loop: boolean }

/**
 * Institutions as plaques scattered on the bench, each wired to a central DATA node. A pulse runs
 * along a random wire every couple of seconds; hovering a plaque lights its wire and streams pulses
 * to DATA while a note card shows role · place · dates. Clicking jumps to that role below.
 * Narrow screens get a plain plaque grid without wires (CSS).
 */
export default function InstitutionMap() {
  const boxRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hot, setHot] = useState<number | null>(null);
  const hotRef = useRef<number | null>(null);
  useEffect(() => { hotRef.current = hot; }, [hot]);

  useEffect(() => {
    const el = boxRef.current!;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // pulses: drawn imperatively along the wire paths
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reducedMotion()) return;
    const dots = [...svg.querySelectorAll<SVGCircleElement>(".inst-pulse")];
    const pulses: Pulse[] = [];
    let raf = 0, last = 0, visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(svg);
    const frame = (now: number) => {
      if (visible) {
        if (now - last > 1900) { last = now; pulses.push({ i: (Math.random() * INSTITUTIONS.length) | 0, t0: now, dur: 1400, loop: false }); }
        const h = hotRef.current;
        if (h !== null && !pulses.some((p) => p.loop && p.i === h)) pulses.push({ i: h, t0: now, dur: 800, loop: true });
        for (let k = pulses.length - 1; k >= 0; k--) {
          const p = pulses[k];
          if ((p.loop && p.i !== h) || (!p.loop && now - p.t0 > p.dur)) pulses.splice(k, 1);
        }
        dots.forEach((d, k) => {
          const p = pulses[k];
          const path = p && svg.querySelector<SVGPathElement>(`#wire-${p.i}`);
          if (!p || !path) { d.setAttribute("opacity", "0"); return; }
          const t = ((now - p.t0) % p.dur) / p.dur;
          const pt = path.getPointAtLength(path.getTotalLength() * t);
          d.setAttribute("cx", pt.x.toFixed(1));
          d.setAttribute("cy", pt.y.toFixed(1));
          d.setAttribute("opacity", String(Math.min(1, (1 - t) * 4) * (p.loop ? 1 : 0.75)));
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [size.w]);

  const cx = size.w / 2, cy = size.h / 2;
  const wire = (it: Institution) => {
    const x = (it.x / 100) * size.w, y = (it.y / 100) * size.h;
    const mx = (x + cx) / 2 + (y - cy) * 0.18, my = (y + cy) / 2 - (x - cx) * 0.12;
    return `M${x.toFixed(1)},${y.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${cx},${cy}`;
  };

  const jump = (id: string) => {
    window.setTimeout(() => {
      const el = document.getElementById(`role-${id}`);
      if (!el) return;
      el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "center" });
      el.classList.remove("flash");
      void el.offsetWidth;
      el.classList.add("flash");
    }, 30);
  };

  return (
    <div className="inst">
      <div className="inst-map" ref={boxRef}>
        {size.w > 0 && (
          <svg className="inst-wires" ref={svgRef} viewBox={`0 0 ${size.w} ${size.h}`} aria-hidden="true">
            {INSTITUTIONS.map((it, i) => (
              <path key={it.name} id={`wire-${i}`} d={wire(it)} className={hot === i ? "on" : ""} />
            ))}
            {[0, 1, 2, 3].map((k) => <circle key={k} r={3} className="inst-pulse" opacity={0} />)}
          </svg>
        )}
        <div className="inst-hub" aria-hidden="true"><b>DATA</b></div>
        {INSTITUTIONS.map((it, i) => (
          <button
            key={it.name}
            type="button"
            className={`plaque ${it.plate}${hot === i ? " hot" : ""}${it.y > 55 ? " tip-up" : ""}`}
            style={{ "--x": `${it.x}%`, "--y": `${it.y}%`, "--tilt": `${it.tilt}deg`, "--d": `${i * -0.7}s` } as CSSProperties}
            onPointerEnter={() => setHot(i)}
            onPointerLeave={() => setHot((h) => (h === i ? null : h))}
            onFocus={() => setHot(i)}
            onBlur={() => setHot((h) => (h === i ? null : h))}
            onClick={() => jump(it.roleId)}
            data-probe="ROLE"
            aria-label={`${it.name}: ${it.role}, ${it.where}`}
          >
            <img src={it.logo} alt="" draggable={false} />
            <span className="plaque-note" aria-hidden="true"><b>{it.name}</b>{it.role}<br />{it.where}</span>
          </button>
        ))}
      </div>
      <div className="continents">
        {CONTINENTS.map((c) => <span key={c.name}><b>{c.name}</b> · {c.cities}</span>)}
      </div>
    </div>
  );
}
