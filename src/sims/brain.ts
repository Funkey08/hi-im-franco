import type { Sim, SimOptions } from "./types";

interface Axon { to: Neuron; pts: [number, number][]; len: number }
interface Neuron { x: number; y: number; r: number; t: number; ref: number; ax: Axon[] }
interface Spike { a: Axon; t0: number; prog: number }

export interface BrainOptions extends SimOptions {
  count: number;
  /** Sweep mode: px per ms the wave travels. */
  speed?: number;
}

/** Refractory period: a neuron can't re-fire mid-wave, so each wave travels outward and dies cleanly. */
const REFRACTORY = 2400;

/**
 * Biological neurons with branching dendrites and curved axons. Causal: one neuron starts a wave,
 * spikes travel along axons, and a neuron fires only when a spike reaches it. A new wave starts
 * only after the previous one has died out. Sweep mode fires the left edge and lets it cross.
 */
export function createBrain(canvas: HTMLCanvasElement, opt: BrainOptions): Sim {
  const ctx = canvas.getContext("2d")!;
  const col = opt.color ?? "255,179,92";
  let W = 0, H = 0, dpr = 1, lastFire = -1e9;
  let N: Neuron[] = [];
  let spikes: Spike[] = [];
  let stat: HTMLCanvasElement | null = null;

  const branch = (g: CanvasRenderingContext2D, x: number, y: number, ang: number, len: number, depth: number, w: number) => {
    let cx = x, cy = y;
    g.lineWidth = w;
    g.beginPath(); g.moveTo(x, y);
    for (let i = 0; i < 4; i++) {
      ang += (Math.random() - 0.5) * 0.55;
      cx += (Math.cos(ang) * len) / 4;
      cy += (Math.sin(ang) * len) / 4;
      g.lineTo(cx, cy);
    }
    g.stroke();
    if (depth > 0) {
      const k = Math.random() < 0.65 ? 2 : 1;
      for (let i = 0; i < k; i++) branch(g, cx, cy, ang + (Math.random() - 0.5) * 1.4, len * 0.6, depth - 1, w * 0.62);
    }
  };

  const fire = (n: Neuron, now: number) => {
    n.t = now;
    n.ref = now + (opt.sweep ? 1e9 : REFRACTORY);
    lastFire = now;
    n.ax.forEach((a) => spikes.push({ a, t0: now, prog: 0 }));
  };

  const sim: Sim = {
    bright: opt.bright ?? 0.75,
    progress: 0,
    resize(dprIn) {
      dpr = dprIn;
      W = canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      H = canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      const sc = Math.min(W, H), dmin = Math.sqrt((W * H) / opt.count) * 0.72;
      N = [];
      for (let tries = 0; N.length < opt.count && tries < 4000; tries++) {
        const x = W * (0.05 + 0.9 * Math.random()), y = H * (0.1 + 0.8 * Math.random());
        if (N.every((n) => Math.hypot(n.x - x, n.y - y) > dmin)) N.push({ x, y, r: 0, t: -1e9, ref: 0, ax: [] });
      }
      N.forEach((n, i) => {
        N.map((m, j) => ({ m, j, d: Math.hypot(m.x - n.x, m.y - n.y) }))
          .filter((o) => o.j !== i && (!opt.sweep || o.m.x > n.x - dmin * 0.2))
          .sort((a, b) => a.d - b.d)
          .slice(0, opt.sweep ? 3 : 2)
          .forEach(({ m, d }) => {
            const dx = m.x - n.x, dy = m.y - n.y, nx = -dy / d, ny = dx / d, off = (Math.random() - 0.5) * d * 0.55;
            const c1 = [n.x + dx * 0.33 + nx * off, n.y + dy * 0.33 + ny * off];
            const c2 = [n.x + dx * 0.66 - nx * off * 0.7, n.y + dy * 0.66 - ny * off * 0.7];
            const pts: [number, number][] = [];
            for (let k = 0; k <= 40; k++) {
              const t = k / 40, u = 1 - t;
              pts.push([
                u * u * u * n.x + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t * t * t * m.x,
                u * u * u * n.y + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t * t * t * m.y,
              ]);
            }
            let len = 0;
            for (let k = 1; k < pts.length; k++) len += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]);
            n.ax.push({ to: m, pts, len });
          });
      });
      // dendrites + axons are static: draw them once to an offscreen canvas
      stat = document.createElement("canvas");
      stat.width = W; stat.height = H;
      const g = stat.getContext("2d")!;
      g.lineCap = "round";
      const rs = Math.max(2.4 * dpr, sc * (opt.sweep ? 0.011 : 0.028));
      N.forEach((n) => {
        n.r = rs * (0.75 + 0.5 * Math.random());
        g.strokeStyle = `rgba(${col},.2)`;
        const k = 5 + ((Math.random() * 3) | 0);
        for (let i = 0; i < k; i++) branch(g, n.x, n.y, Math.random() * 6.283, sc * (0.09 + 0.07 * Math.random()), 2, 1.4 * dpr);
        g.strokeStyle = `rgba(${col},.15)`;
        g.lineWidth = 1.1 * dpr;
        n.ax.forEach((a) => {
          g.beginPath();
          a.pts.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1])));
          g.stroke();
        });
      });
      spikes = [];
      lastFire = -1e9;
      if (opt.sweep) {
        const t = performance.now();
        N.filter((n) => n.x < W * 0.14).forEach((n) => fire(n, t));
      }
    },
    tick(now) {
      if (W < 2 || !stat) return;
      const speed = opt.sweep ? (opt.speed ?? 1.7) * dpr : 0.17 * dpr;
      if (!opt.sweep && !spikes.length && now - lastFire > 700 && N.length) fire(N[(Math.random() * N.length) | 0], now);
      for (let i = spikes.length - 1; i >= 0; i--) {
        const s = spikes[i];
        s.prog = Math.max(0, ((now - s.t0) * speed) / s.a.len);
        if (s.prog >= 1) {
          const m = s.a.to;
          if (now > m.ref && (opt.sweep || Math.random() < 0.9)) fire(m, now); // spike arrives → that neuron fires
          spikes.splice(i, 1);
        }
      }
      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = Math.min(1, sim.bright * 1.25);
      ctx.drawImage(stat, 0, 0);
      ctx.globalAlpha = 1;
      ctx.shadowColor = `rgb(${col})`;
      ctx.shadowBlur = 10 * dpr;
      ctx.lineCap = "round";
      for (const s of spikes) {
        const pts = s.a.pts, fi = Math.min(1, s.prog) * (pts.length - 1);
        const i0 = Math.min(pts.length - 1, fi | 0), fr = fi - i0;
        const p0 = pts[i0], p1 = pts[Math.min(pts.length - 1, i0 + 1)];
        const x = p0[0] + (p1[0] - p0[0]) * fr, y = p0[1] + (p1[1] - p0[1]) * fr, ts = Math.max(0, i0 - 6);
        ctx.strokeStyle = `rgba(${col},${(0.75 * sim.bright).toFixed(3)})`;
        ctx.lineWidth = 1.7 * dpr;
        ctx.beginPath(); ctx.moveTo(pts[ts][0], pts[ts][1]);
        for (let k = ts + 1; k <= i0; k++) ctx.lineTo(pts[k][0], pts[k][1]);
        ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = "#fff3e0";
        ctx.beginPath(); ctx.arc(x, y, 1.9 * dpr, 0, 6.283); ctx.fill();
      }
      for (const n of N) {
        const b = opt.sweep ? (now >= n.t ? 0.5 + 0.5 * Math.exp(-(now - n.t) / 260) : 0) : Math.exp(-(now - n.t) / 600);
        ctx.shadowBlur = (3 + 18 * b) * dpr;
        ctx.fillStyle = `rgba(${col},${((0.3 + 0.7 * b) * Math.min(1, sim.bright * 1.2)).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * (1 + 0.3 * b), 0, 6.283); ctx.fill();
      }
      ctx.shadowBlur = 0;
    },
  };
  return sim;
}
