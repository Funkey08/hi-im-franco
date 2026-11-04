import { useEffect, useMemo, useRef, useState } from "react";
import { EXPERIMENTS, type Experiment } from "../../data/experiments";
import { reducedMotion } from "../../lib/util";
import { COVER_ART } from "./coverArt";

function Cover({ exp }: { exp: Experiment }) {
  const svg = useMemo(() => ("art" in exp.cover ? COVER_ART[exp.cover.art]() : null), [exp]);
  return (
    <div className="card-cover">
      {"image" in exp.cover
        ? <img src={exp.cover.image} alt="" loading="lazy" draggable={false} />
        : <div className="card-art" dangerouslySetInnerHTML={{ __html: svg! }} />}
    </div>
  );
}

function CardBody({ exp }: { exp: Experiment }) {
  return (
    <>
      <Cover exp={exp} />
      <div className="card-body">
        <h3>{exp.title}</h3>
        <p>{exp.blurb}</p>
      </div>
      <span className="card-open" aria-hidden="true">open →</span>
    </>
  );
}

/** Narrow screens / touch: a plain swipeable row with scroll-snap. */
function Strip({ onOpen }: { onOpen: (e: Experiment) => void }) {
  return (
    <div className="strip" role="list">
      {EXPERIMENTS.map((exp) => (
        <button key={exp.slug} type="button" role="listitem" className="card" onClick={() => onOpen(exp)}>
          <CardBody exp={exp} />
        </button>
      ))}
    </div>
  );
}

/**
 * Desktop: a slow 3D orbit. Drag to spin it (with inertia); it pauses only while the cursor is
 * on a card; a drag never counts as a click; only the front half of the ring is visible.
 */
function Orbit({ onOpen }: { onOpen: (e: Experiment) => void }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const dragMoved = useRef(false);

  useEffect(() => {
    const stage = stageRef.current!;
    const cards = cardsRef.current.filter(Boolean) as HTMLButtonElement[];
    const still = reducedMotion();
    let ang = 0, paused = false, dragging = false, dragX = 0, lastX = 0, lastT = 0, vel = 0, raf = 0, visible = false;
    const radius = () => Math.min(stage.clientWidth * 0.34, 470);

    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };
    cards.forEach((c) => { c.addEventListener("pointerenter", onEnter); c.addEventListener("pointerleave", onLeave); });

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      dragging = true; dragMoved.current = false; dragX = lastX = e.clientX; lastT = performance.now(); vel = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      if (Math.abs(e.clientX - dragX) > 5) { dragMoved.current = true; stage.classList.add("dragging"); }
      const now = performance.now(), dx = e.clientX - lastX;
      ang += dx / radius();
      vel = (dx / radius() / Math.max(1, now - lastT)) * 16;
      lastX = e.clientX; lastT = now;
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove("dragging");
      window.setTimeout(() => { dragMoved.current = false; }, 0); // after the click event has fired
    };
    // window-level move/up: pointer capture would retarget the click to the stage
    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    const frame = () => {
      if (!dragging) {
        if (Math.abs(vel) > 0.0002) { ang += vel; vel *= 0.94; }
        else { vel = 0; if (!paused && !still) ang += 0.0007; }
      }
      const n = cards.length, R = radius();
      cards.forEach((c, i) => {
        let th = (ang + (i * 2 * Math.PI) / n) % (2 * Math.PI);
        if (th > Math.PI) th -= 2 * Math.PI;
        if (th < -Math.PI) th += 2 * Math.PI;
        const front = (Math.cos(th) + 1) / 2, vis = Math.max(0, Math.min(1, (front - 0.5) / 0.5));
        c.style.transform = `translate3d(${(Math.sin(th) * R).toFixed(1)}px, ${((1 - front) * -24).toFixed(1)}px, ${(Math.cos(th) * R * 0.6 - 80).toFixed(1)}px) rotateY(${(-Math.sin(th) * 0.5).toFixed(3)}rad)`;
        c.style.opacity = Math.pow(vis, 1.4).toFixed(3);
        c.style.filter = vis < 0.999 ? `blur(${((1 - vis) * 2.5).toFixed(2)}px)` : "";
        c.style.zIndex = String(Math.round(front * 100));
        c.style.pointerEvents = front > 0.55 ? "auto" : "none";
        c.tabIndex = front > 0.75 ? 0 : -1;
      });
      if (visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(stage);
    frame();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      cards.forEach((c) => { c.removeEventListener("pointerenter", onEnter); c.removeEventListener("pointerleave", onLeave); });
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className="orbit" ref={stageRef} data-probe="DRAG">
      <div className="orbit-ring">
        {EXPERIMENTS.map((exp, i) => (
          <button
            key={exp.slug}
            ref={(el) => { cardsRef.current[i] = el; }}
            type="button"
            className="card"
            data-probe="OPEN · DRAG"
            onClick={() => { if (!dragMoved.current) onOpen(exp); }}
          >
            <CardBody exp={exp} />
          </button>
        ))}
      </div>
    </div>
  );
}

const useWide = () => {
  const q = "(min-width: 760px) and (hover: hover) and (pointer: fine)";
  const [wide, setWide] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setWide(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return wide;
};

export default function Experiments() {
  const wide = useWide();
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef(0);
  // Case-study pages don't exist yet; say where the card will go.
  const open = (exp: Experiment) => {
    setToast(`case study coming soon: /work/${exp.slug}`);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 1800);
  };
  return (
    <section className="experiments" aria-labelledby="experiments-title">
      <h2 className="section-head" id="experiments-title">// <b>recent experiments</b></h2>
      {wide ? <Orbit onOpen={open} /> : <Strip onOpen={open} />}
      <p className={`toast${toast ? " show" : ""}`} role="status">{toast}</p>
    </section>
  );
}
