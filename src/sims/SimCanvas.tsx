import { useEffect, useRef } from "react";
import { getDpr, reducedMotion } from "../lib/util";
import type { Sim } from "./types";

interface Props {
  create: (canvas: HTMLCanvasElement) => Sim;
  /** Brightness multiplier (e.g. raised while the parent card is hovered). */
  bright?: number;
  className?: string;
}

/**
 * Hosts one simulation on a canvas: sizes it with the element, runs it on rAF only while it is
 * on screen and the tab is visible, and renders a single still frame under reduced motion.
 */
export default function SimCanvas({ create, bright, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<Sim | null>(null);
  const createRef = useRef(create);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const sim = createRef.current(canvas);
    simRef.current = sim;
    let raf = 0, visible = false;
    const still = reducedMotion();

    const loop = (now: number) => {
      sim.tick(now);
      if (!still && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };
    const resize = () => { sim.resize(getDpr()); sim.tick(performance.now() + 1500); };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden && visible) start(); };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    if (simRef.current && bright !== undefined) simRef.current.bright = bright;
  }, [bright]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
