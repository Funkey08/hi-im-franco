import { gauss } from "../lib/util";
import type { Sim, SimOptions } from "./types";

interface Node { l: number; x: number; y: number; a: number; inc: Edge[] }
interface Edge { l: number; a: Node; b: Node; w: number; k: number }

export interface NetOptions extends SimOptions {
  layers: number[];
  /** ms per layer of the forward pass */
  perLayer?: number;
}

/**
 * Feed-forward network doing forward passes, strictly layer by layer, left to right.
 * Pulses only leave a layer after that layer has fired; a node lights when pulses arrive;
 * the path the signal took stays lit, then the pass fades and the next one starts.
 * In `sweep` mode the caller drives `progress` (0 … layers-1) instead of the clock.
 */
export function createNet(canvas: HTMLCanvasElement, opt: NetOptions): Sim {
  const ctx = canvas.getContext("2d")!;
  const col = opt.color ?? "125,255,176";
  const per = opt.perLayer ?? 340;
  const HOLD = 650, FADE = 450;
  let W = 0, H = 0, L = 0, r = 3, dpr = 1, t0 = 0;
  let nodes: Node[][] = [];
  let edges: Edge[] = [];

  const forward = (now: number) => {
    nodes[0].forEach((n) => (n.a = Math.random() * 2 - 1));
    for (let l = 1; l < L; l++) nodes[l].forEach((b) => {
      let s = 0;
      b.inc.forEach((e) => (s += e.w * e.a.a));
      b.a = Math.tanh(s * 0.9);
    });
    edges.forEach((e) => { e.k = Math.min(1, Math.abs(e.w * e.a.a)); e.w += gauss() * 0.04; }); // slow "learning" drift
    t0 = now;
  };

  const sim: Sim = {
    bright: opt.bright ?? 0.7,
    progress: 0,
    resize(dprIn) {
      dpr = dprIn;
      W = canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      H = canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      L = opt.layers.length;
      const mx = W * 0.08, my = H * 0.13;
      nodes = opt.layers.map((n, l) => Array.from({ length: n }, (_, j) => ({
        l, x: mx + (l * (W - 2 * mx)) / (L - 1), y: n === 1 ? H / 2 : my + (j * (H - 2 * my)) / (n - 1), a: 0, inc: [] as Edge[],
      })));
      edges = [];
      for (let l = 0; l < L - 1; l++) for (const a of nodes[l]) for (const b of nodes[l + 1]) {
        const e = { l, a, b, w: gauss() * 0.8, k: 0 };
        edges.push(e);
        b.inc.push(e);
      }
      r = Math.max(2.2 * dpr, Math.min(W, H) * 0.022);
      forward(performance.now());
    },
    tick(now) {
      if (W < 2) return;
      let p: number, fade = 1;
      if (opt.sweep) p = sim.progress;
      else {
        let e = now - t0;
        const total = (L - 1) * per;
        if (e > total + HOLD + FADE + 200) { forward(now); e = 0; }
        p = Math.min(L - 1, e / per);
        if (e > total + HOLD) fade = Math.max(0, 1 - (e - total - HOLD) / FADE);
      }
      const B = sim.bright;
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 0.8 * dpr;
      for (const e of edges) {
        let a = 0.03 + 0.05 * Math.min(1, Math.abs(e.w));
        if (p >= e.l + 1) a += 0.22 * e.k * fade;
        ctx.strokeStyle = `rgba(${col},${(a * B * 1.4).toFixed(3)})`;
        ctx.beginPath(); ctx.moveTo(e.a.x, e.a.y); ctx.lineTo(e.b.x, e.b.y); ctx.stroke();
      }
      ctx.shadowColor = `rgb(${col})`;
      ctx.shadowBlur = 6 * dpr;
      for (const e of edges) {
        const f = p - e.l;
        if (f <= 0 || f >= 1 || e.k < 0.05) continue;
        ctx.fillStyle = `rgba(${col},${((0.25 + 0.75 * e.k) * B).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(e.a.x + (e.b.x - e.a.x) * f, e.a.y + (e.b.y - e.a.y) * f, (0.9 + 1.4 * e.k) * dpr * (opt.sweep ? 1.5 : 1), 0, 6.283);
        ctx.fill();
      }
      for (const layer of nodes) for (const n of layer) {
        let b = 0;
        if (p >= n.l) b = Math.min(1, 0.3 + 0.7 * Math.abs(n.a) + 0.7 * Math.exp(-(p - n.l) * 5)) * fade;
        ctx.shadowBlur = (2 + 14 * b) * dpr;
        ctx.fillStyle = `rgba(${col},${((0.08 + 0.92 * b) * B).toFixed(3)})`;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 6.283); ctx.fill();
        ctx.strokeStyle = `rgba(${col},${(0.45 * B).toFixed(3)})`;
        ctx.lineWidth = dpr;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    },
  };
  return sim;
}
