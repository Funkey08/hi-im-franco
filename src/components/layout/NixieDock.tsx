import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router";
import { READINGS } from "../../data/readings";
import { useInstrument } from "../../instrument/context";
import { clamp, easeInOutCubic, lerp } from "../../lib/util";
import Clock from "../nixie/Clock";

type Mode = "hero" | "fly" | "dock";

/** Height the tubes shrink to in the header (px). */
const DOCK_TUBE_H = 36;
/** Scroll distance over which the clock travels from the hero into the header (px). */
const DOCK_START = 20;
const DOCK_RANGE = 300;

/**
 * Owns the one clock on the page. In the hero it renders *inside* the hero's slot (normal flow,
 * so it scrolls perfectly with the page). Once you scroll, it moves into a fixed layer and flies
 * up into the header, shrinking as it goes; it stays there, still clickable, on every page.
 */
export default function NixieDock() {
  const inst = useInstrument();
  const { heroSlot, readingIndex, hasMeasured, measure, back, rest } = inst;
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  const [layer, setLayer] = useState<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>(heroSlot ? "hero" : "dock");
  const modeRef = useRef<Mode>(mode);
  const clockRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const update = useCallback(() => {
    const clock = clockRef.current;
    if (!clock) return;
    const tubes = clock.firstElementChild as HTMLElement | null;
    const W = clock.offsetWidth;
    const tubesH = tubes?.offsetHeight || clock.offsetHeight;
    const slot = heroSlot;

    const p = slot ? clamp((window.scrollY - DOCK_START) / DOCK_RANGE) : 1;
    const next: Mode = !slot ? "dock" : p <= 0 ? "hero" : p >= 1 ? "dock" : "fly";
    if (next !== modeRef.current) {
      modeRef.current = next;
      setMode(next);
      return; // the clock re-mounts in its new parent; the layout effect below calls update() again
    }

    if (next === "hero" && slot) {
      // reserve the clock's footprint so the hero doesn't jump when the clock leaves it
      slot.style.width = `${W}px`;
      slot.style.height = `${clock.offsetHeight}px`;
      clock.style.transform = "";
      clock.style.setProperty("--dock", "0");
      if (captionRef.current) captionRef.current.style.opacity = "0";
      return;
    }

    const s = DOCK_TUBE_H / tubesH;
    const barH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--bar-h")) || 60;
    // centred in the bar; on phones it takes the left corner so it never collides with the links
    const tx = window.innerWidth < 700 ? 6 : window.innerWidth / 2 - (W * s) / 2;
    const ty = (barH - tubesH * s) / 2;
    let x = tx, y = ty, sc = s, e = 1;
    if (next === "fly" && slot) {
      const r = slot.getBoundingClientRect();
      e = easeInOutCubic(p);
      x = lerp(r.left, tx, e);
      y = lerp(r.top, ty, e);
      sc = lerp(1, s, e);
    }
    clock.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${sc.toFixed(4)})`;
    clock.style.setProperty("--dock", e.toFixed(3));
    const cap = captionRef.current;
    if (cap) {
      cap.style.transform = `translate3d(${(tx + W * s + 14).toFixed(1)}px, ${(barH / 2).toFixed(1)}px, 0) translateY(-50%)`;
      cap.style.opacity = next === "dock" && window.innerWidth >= 1000 ? "1" : "0";
    }
  }, [heroSlot]);

  // Re-run after every mode switch / re-parent, and whenever the hero slot appears or goes.
  useLayoutEffect(() => {
    if (!heroSlot && modeRef.current !== "dock") { modeRef.current = "dock"; setMode("dock"); return; }
    update();
  }, [mode, heroSlot, layer, update]);

  useLayoutEffect(() => {
    let raf = 0;
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    if (clockRef.current) ro.observe(clockRef.current);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
    };
  }, [update]);

  const docked = mode !== "hero";
  // the top bar turns solid once the clock is in it (see layout.css)
  useLayoutEffect(() => { document.body.toggleAttribute("data-docked", mode === "dock"); }, [mode]);
  // in the header the clock always reads FRANCO: it's the site's name plate
  useEffect(() => { if (mode === "dock") rest(); }, [mode, rest]);
  const target = mode === "hero" && heroSlot ? heroSlot : layer;
  // hero: take a reading · docked on Home: scroll back up to the instrument · other pages: go home
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const activate = !onHome ? back : docked ? toTop : measure;
  const reading = READINGS[readingIndex];

  return (
    <>
      <div className="dock-layer" ref={setLayer}>
        <div
          ref={captionRef}
          className="dock-caption"
          aria-hidden="true"
          style={{ opacity: 0 } as CSSProperties}
        >
          {onHome && readingIndex > 0 && mode !== "dock" && <b>{reading.label}</b>}
        </div>
      </div>
      {target && createPortal(
        <Clock
          ref={clockRef}
          docked={docked}
          onActivate={activate}
          probe={!onHome ? "HOME" : docked ? "TOP" : "MEASURE"}
          ariaLabel={!onHome ? "Back to the home page" : docked ? "Back to the top" : "Franco. Press to take a measurement."}
          invite={onHome && !hasMeasured && !docked}
        />,
        target,
      )}
    </>
  );
}
