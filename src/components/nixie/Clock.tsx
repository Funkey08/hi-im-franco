import { forwardRef, memo, useEffect, useRef, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from "react";
import { useInstrument } from "../../instrument/context";
import type { Cell } from "../../instrument/nixie";
import { clamp, finePointer, reducedMotion } from "../../lib/util";
import "./nixie.css";

/** Unlit cathodes stacked behind the lit one, like the wire digits inside a real tube. */
const CATHODES = ["8", "0", "3", "6"];

const Tube = memo(function Tube({ cell, index }: { cell: Cell; index: number }) {
  const cls = `tube${cell.on ? " on" : ""}${cell.rolling ? " rolling" : ""}`;
  return (
    <div className={cls} style={{ "--i": index } as CSSProperties}>
      <div className="tube-glass">
        <div className="tube-getter" />
        <div className="tube-stack">
          {CATHODES.map((d, k) => (
            <span key={k} style={{ "--k": k } as CSSProperties}>{d}</span>
          ))}
        </div>
        {/* keyed by `strike` so the strike-flicker replays every time the tube lights up */}
        <span className="tube-glyph" key={cell.strike}>{cell.ch}</span>
        <span className={`tube-dp${cell.dp ? " on" : ""}`} />
        <div className="tube-mesh" />
        <div className="tube-shine" />
      </div>
      <div className="tube-socket"><i /><i /></div>
      <div className="tube-pool" />
    </div>
  );
});

interface ClockProps {
  docked: boolean;
  onActivate: () => void;
  /** Label the probe cursor shows over the clock. */
  probe: string;
  ariaLabel: string;
  /** Blink the READY lamp until the visitor has used the instrument once. */
  invite: boolean;
}

/** Six nixie tubes on a walnut plinth. Purely presentational; the NixieController drives the digits. */
const Clock = forwardRef<HTMLDivElement, ClockProps>(function Clock({ docked, onActivate, probe, ariaLabel, invite }, ref) {
  const { nixie } = useInstrument();
  const cells = useSyncExternalStore(nixie.subscribe, nixie.getSnapshot);
  const lit = cells.filter((c) => c.on).length;
  const tubesRef = useRef<HTMLDivElement>(null);

  // In the hero the tubes lean slightly toward the cursor, so the clock reads as a physical object.
  useEffect(() => {
    const el = tubesRef.current;
    if (docked || !el || !finePointer() || reducedMotion()) return;
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = clamp((e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2), -1, 1);
      ty = clamp((e.clientY - (r.top + r.height / 2)) / (window.innerHeight / 2), -1, 1);
    };
    const loop = () => {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      el.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
  }, [docked]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onActivate(); }
  };

  return (
    <div
      ref={ref}
      className={`clock${docked ? " is-docked" : ""}${invite ? " invite" : ""}`}
      style={{ "--lit": lit / cells.length } as CSSProperties}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      data-probe={probe}
      onClick={onActivate}
      onKeyDown={onKey}
    >
      <div className="clock-tubes" ref={tubesRef}>
        {cells.map((c, i) => <Tube key={i} cell={c} index={i} />)}
      </div>
      <div className="clock-plinth" aria-hidden="true">
        <div className="plinth-top" />
        <div className="plinth-face">
          <span className="plinth-screw" />
          <span className="plinth-plate">FMV-08 · Nixie instrument</span>
          <span className="plinth-ready"><i className="plinth-led" />Ready</span>
          <span className="plinth-screw" />
        </div>
      </div>
    </div>
  );
});

export default Clock;
