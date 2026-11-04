import { useEffect, useRef } from "react";
import { FLARE_EVENT, getDpr, reducedMotion } from "../../lib/util";
import "./fx.css";

interface Mote { x: number; y: number; r: number; vx: number; vy: number; p: number; a: number }

/**
 * The room the instrument sits in: film grain, a vignette, faint graph paper revealed by the tube
 * light and by the cursor, and dust drifting in the light. Dust near the cursor links up with thin
 * lines (a live nearest-neighbour graph). A "flare" (each reading) briefly brightens the dust.
 */
export default function Atmosphere() {
  const grainRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dustRef = useRef<HTMLCanvasElement>(null);

  // grain texture, generated once
  useEffect(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 180;
    const g = c.getContext("2d")!;
    const d = g.createImageData(180, 180);
    for (let i = 0; i < d.data.length; i += 4) {
      const v = Math.random() * 255;
      d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
      d.data[i + 3] = 255;
    }
    g.putImageData(d, 0, 0);
    if (grainRef.current) grainRef.current.style.backgroundImage = `url(${c.toDataURL()})`;
  }, []);

  useEffect(() => {
    const canvas = dustRef.current, grid = gridRef.current;
    if (!canvas || !grid) return;
    const ctx = canvas.getContext("2d")!;
    const still = reducedMotion();
    let W = 0, H = 0, dpr = 1, raf = 0, MX = -1e4, MY = -1e4, flareT = -1e9;
    let motes: Mote[] = [];

    const size = () => {
      dpr = getDpr();
      W = canvas.width = window.innerWidth * dpr;
      H = canvas.height = window.innerHeight * dpr;
      const n = Math.round(Math.min(110, (window.innerWidth * window.innerHeight) / 14000));
      motes = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H, r: (0.5 + Math.random() * 1.5) * dpr,
        vx: (Math.random() - 0.5) * 0.12 * dpr, vy: (-0.05 - Math.random() * 0.12) * dpr, p: Math.random() * 6.28, a: 0,
      }));
    };
    const onMove = (e: PointerEvent) => {
      MX = e.clientX * dpr; MY = e.clientY * dpr;
      grid.style.setProperty("--mx", `${e.clientX}px`);
      grid.style.setProperty("--my", `${e.clientY}px`);
    };
    const onLeave = () => { MX = MY = -1e4; grid.style.setProperty("--mx", "-999px"); };
    const onFlare = () => { flareT = performance.now(); };

    const tick = (now: number) => {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H * 0.3, LR = 200 * dpr, fl = Math.exp(-(now - flareT) / 500);
      const lit: Mote[] = [];
      for (const m of motes) {
        if (!still) {
          m.x += m.vx + Math.sin(now * 0.0004 + m.p) * 0.08 * dpr;
          m.y += m.vy;
          if (m.y < -10) { m.y = H + 10; m.x = Math.random() * W; }
        }
        const tube = Math.max(0, 0.5 - Math.hypot(m.x - cx, (m.y - cy) * 1.6) / (W * 0.45)) * (1 + 1.6 * fl);
        const cur = Math.max(0, 1 - Math.hypot(m.x - MX, m.y - MY) / LR);
        m.a = Math.min(1, (tube + 0.85 * cur) * (0.6 + 0.4 * Math.sin(now * 0.002 + m.p)));
        if (cur > 0) lit.push(m);
        if (m.a <= 0.01) continue;
        ctx.fillStyle = `rgba(255,196,130,${m.a.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r * (1 + 0.6 * cur), 0, 6.283); ctx.fill();
      }
      ctx.lineWidth = 0.8 * dpr;
      const LK = 130 * dpr;
      for (let i = 0; i < lit.length; i++) for (let j = i + 1; j < lit.length; j++) {
        const a = lit[i], b = lit[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > LK) continue;
        const al = (1 - d / LK) * Math.min(a.a, b.a) * 0.55;
        if (al < 0.01) continue;
        ctx.strokeStyle = `rgba(255,196,130,${al.toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };
    const onVis = () => { if (!document.hidden) { cancelAnimationFrame(raf); raf = requestAnimationFrame(tick); } };

    size();
    window.addEventListener("resize", size);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener(FLARE_EVENT, onFlare);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener(FLARE_EVENT, onFlare);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <>
      <div className="fx-grid" ref={gridRef} aria-hidden="true" />
      <canvas className="fx-dust" ref={dustRef} aria-hidden="true" />
      <div className="fx-vignette" aria-hidden="true" />
      <div className="fx-grain" ref={grainRef} aria-hidden="true" />
    </>
  );
}
