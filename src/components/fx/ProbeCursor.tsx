import { useEffect, useRef } from "react";
import { finePointer } from "../../lib/util";

const GREEN = "125,255,176";
const AMBER = "255,179,92";

/**
 * Probe cursor (mouse/trackpad only): an amber dot with a ring that trails behind it. Over anything
 * interactive the ring grows and shows the label from the element's `data-probe` attribute
 * (`data-probe-tone="work"` turns it green). A faint page-coordinate readout lives in the top bar.
 * Text fields keep the native caret.
 */
export default function ProbeCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!finePointer()) return;
    const root = document.documentElement;
    root.classList.add("probe");
    const dot = dotRef.current!, ring = ringRef.current!, lab = labRef.current!;
    const coords = document.getElementById("probe-coords");
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      if (coords) coords.textContent = `x ${String(Math.round(e.pageX)).padStart(4, "0")} · y ${String(Math.round(e.pageY)).padStart(4, "0")}`;
      const target = e.target instanceof Element ? e.target : null;
      const hit = target?.closest<HTMLElement>("[data-probe], a, button, [role=button]");
      const text = target?.closest("input, textarea, [contenteditable=true]");
      root.classList.toggle("probe-text", !!text);
      ring.classList.toggle("hot", !!hit);
      lab.textContent = hit?.dataset.probe ?? "";
      const tone = hit?.dataset.probeTone === "work" || (!hit && document.body.dataset.section === "work") ? GREEN : AMBER;
      dot.style.setProperty("--pc", tone);
      ring.style.setProperty("--pc", tone);
    };
    const onDown = () => ring.classList.add("down");
    const onUp = () => ring.classList.remove("down");
    const onLeave = () => { x = y = rx = ry = -100; };
    const frame = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(frame);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("probe", "probe-text");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div className="probe-dot" ref={dotRef} aria-hidden="true" />
      <div className="probe-ring" ref={ringRef} aria-hidden="true"><span ref={labRef} /></div>
    </>
  );
}
