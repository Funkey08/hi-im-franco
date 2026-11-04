import { useEffect, useRef, useState } from "react";
import { useInstrument } from "../../instrument/context";
import { getDpr, reducedMotion } from "../../lib/util";
import { createBrain } from "../../sims/brain";
import { createNet } from "../../sims/net";

const NET_LAYERS = [6, 10, 13, 13, 10, 6, 3];
const COPY = {
  work: { label: "WORK", line: "forward pass in progress…", color: "125,255,176", ms: 1250 },
  life: { label: "LIFE", line: "action potentials propagating…", color: "255,179,92", ms: 1500 },
};

/**
 * Entering a section: that channel's own animation takes over the screen (a full forward pass for
 * Work, a wave of action potentials for Life), then a flash, then the new page powers on.
 */
export default function WarpOverlay() {
  const { warp, finishWarp } = useInstrument();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [flash, setFlash] = useState(0);

  useEffect(() => {
    if (!warp) return;
    if (reducedMotion()) { finishWarp(); return; }
    const canvas = canvasRef.current!;
    const { ms } = COPY[warp];
    const dpr = getDpr();
    const sim = warp === "work"
      ? createNet(canvas, { layers: NET_LAYERS, sweep: true, bright: 1 })
      : createBrain(canvas, { count: 34, sweep: true, bright: 1, color: COPY.life.color, speed: window.innerWidth / (ms * 0.62) });
    sim.resize(dpr);
    const t0 = performance.now();
    let raf = 0;
    const frame = (now: number) => {
      const e = now - t0;
      sim.progress = Math.min(NET_LAYERS.length - 0.7, Math.max(0, (e - 150) / (ms - 250)) * (NET_LAYERS.length - 0.7));
      sim.tick(now);
      if (e < ms) raf = requestAnimationFrame(frame);
      else { setFlash((f) => f + 1); finishWarp(); }
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [warp, finishWarp]);

  const copy = warp ? COPY[warp] : null;
  return (
    <div className={`warp${warp ? " show" : ""}`} aria-hidden="true">
      <canvas ref={canvasRef} />
      {copy && <div className="warp-label" style={{ color: `rgba(${copy.color},.85)` }}>{copy.label}<br />{copy.line}</div>}
      <div className="warp-flash" key={flash} data-go={flash > 0 || undefined} />
    </div>
  );
}
