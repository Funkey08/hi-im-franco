import { useEffect, useRef, useState } from "react";
import { EXPERIMENTS } from "../../data/experiments";
import { reducedMotion } from "../../lib/util";
import "./worldline.css";

/** The divergence number the meter settles on (fans will know it; to everyone else it's a readout). */
const TARGET = "1.048596";
const MIN_MS = 1500;   // never shorter than this, so it reads as an intentional beat
const MAX_WAIT = 4200; // never hold the visitor longer than this, even on a slow connection
const SETTLE_STAGGER = 95;

/** Wait for an image to load (or fail); resolves either way. */
const preload = (src: string) => new Promise<void>((done) => {
  const img = new Image();
  img.onload = img.onerror = () => done();
  img.src = src;
});

interface Line { text: string; value?: string }

/**
 * "Worldline boot": the first thing a new visitor sees (once per session). A phosphor CRT logs a
 * cold start while the fonts and the carousel figures actually load, a divergence-meter readout
 * spins and locks onto 1.048596, then the screen collapses like an old monitor switching off and
 * the nixie tubes power on underneath. Skippable from the first frame; off under reduced motion.
 */
export default function WorldlineBoot({ onDone }: { onDone: () => void }) {
  const [digits, setDigits] = useState<string[]>(() => TARGET.split("").map((c) => (c === "." ? "." : "0")));
  const [locked, setLocked] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [closing, setClosing] = useState(false);
  const doneRef = useRef(false);
  const onDoneRef = useRef(onDone);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setClosing(true);
    window.setTimeout(() => onDoneRef.current(), 520);
  };
  const finishRef = useRef(finish);

  useEffect(() => {
    if (reducedMotion()) { onDoneRef.current(); return; }
    const t0 = performance.now();
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    let cancelled = false;

    // lock scrolling while the intro is up
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    // --- real loading, reported in the log
    const images = EXPERIMENTS.flatMap((e) => ("image" in e.cover ? [e.cover.image] : []));
    let loaded = 0;
    const setValue = (i: number, value: string) =>
      setLines((ls) => ls.map((l, k) => (k === i ? { ...l, value } : l)));
    const push = (text: string, value?: string) => setLines((ls) => [...ls, { text, value }]);

    at(120, () => push("FMV-08 · cold start"));
    at(330, () => push("warming cathodes", "170 V"));
    at(560, () => push("loading type", "…"));
    at(780, () => push("loading figures", `0/${images.length}`));
    at(1040, () => push("calibrating", "research · data science · quant"));

    const fonts = (document.fonts?.ready ?? Promise.resolve()).then(() => { if (!cancelled) at(Math.max(0, 600 - (performance.now() - t0)), () => setValue(2, "ok")); });
    const figs = Promise.all(images.map((src) => preload(src).then(() => {
      loaded += 1;
      const n = loaded;
      if (!cancelled) at(Math.max(0, 820 - (performance.now() - t0)), () => setValue(3, `${n}/${images.length}`));
    })));
    const ready = Promise.race([
      Promise.all([fonts, figs]),
      new Promise<void>((r) => at(MAX_WAIT, r)),
    ]);

    // --- the meter: every digit spins until everything is ready, then they lock left to right
    let lockedUpTo = 0;
    const spin = window.setInterval(() => {
      setDigits((d) => d.map((c, i) => (c === "." || i < lockedUpTo ? c : String((Math.random() * 10) | 0))));
    }, 48);
    ready.then(() => {
      if (cancelled) return;
      const wait = Math.max(0, MIN_MS - (performance.now() - t0));
      at(wait, () => {
        TARGET.split("").forEach((_, i) => at(i * SETTLE_STAGGER, () => {
          lockedUpTo = i + 1;
          setDigits((d) => d.map((x, k) => (k <= i ? TARGET[k] : x)));
          if (i === TARGET.length - 1) {
            window.clearInterval(spin);
            setLocked(true);
            at(520, () => finishRef.current());
          }
        }));
      });
    });

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" || e.key === "Enter" || e.key === " ") finishRef.current(); };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.clearInterval(spin);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className={`worldline${closing ? " closing" : ""}`} role="dialog" aria-label="Loading" aria-live="polite">
      <div className="wl-screen">
        <ol className="wl-log">
          {lines.map((l, i) => (
            <li key={i}>
              <span className="wl-prompt">{i === 0 ? "" : ">"}</span>
              <span>{l.text}</span>
              {l.value !== undefined && <><span className="wl-dots" /><b>{l.value}</b></>}
            </li>
          ))}
          {!locked && <li className="wl-caret" aria-hidden="true">_</li>}
        </ol>
        <div className={`wl-meter${locked ? " locked" : ""}`} aria-hidden="true">
          {digits.map((c, i) => <span key={i} className={c === "." ? "dot" : ""}>{c}</span>)}
        </div>
        <div className="wl-status">{locked ? "signal locked" : "acquiring signal"}</div>
        <button type="button" className="wl-skip" onClick={() => finishRef.current()} data-probe="SKIP">skip →</button>
      </div>
    </div>
  );
}
