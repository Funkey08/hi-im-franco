import { useEffect, useState } from "react";
import { useInstrument } from "../../instrument/context";
import { clamp, reducedMotion } from "../../lib/util";
import { rich } from "../../lib/rich";
import { useSeen } from "../../lib/useSeen";
import { createNet } from "../../sims/net";
import SimCanvas from "../../sims/SimCanvas";
import { COUNTERS, ROLES, STATEMENT } from "../../data/work";
import InstitutionMap from "./InstitutionMap";
import { useHashScroll } from "../../lib/useHashScroll";
import Awards from "./Awards";
import Projects from "./Projects";
import Stack from "./Stack";
import "../section.css";
import "./work.css";

const makeNet = (c: HTMLCanvasElement) => createNet(c, { layers: [5, 8, 10, 10, 8, 5, 3], perLayer: 260 });

function Statement() {
  const [ref, seen] = useSeen<HTMLParagraphElement>(0.4);
  return (
    <section className="wsec statement-sec">
      <p className={`statement${seen ? " seen" : ""}`} ref={ref}>
        {STATEMENT.parts.map((p, i) => (typeof p === "string" ? p : <span key={i} className="hl">{p.hl}</span>))}
        <span className="data">{STATEMENT.data}</span>.
      </p>
      {STATEMENT.intro && (
        <div className="intro">{STATEMENT.intro.split("\n\n").map((para, i) => <p key={i}>{rich(para)}</p>)}</div>
      )}
    </section>
  );
}

/** Counts up once when the row scrolls into view, like the tubes rolling to a value. */
function Counter({ value, prefix, suffix, label, note, go }: (typeof COUNTERS)[number] & { go: boolean }) {
  const [n, setN] = useState(() => (reducedMotion() ? value : 0));
  useEffect(() => {
    if (!go || reducedMotion()) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = clamp((now - t0) / 1100);
      setN(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [go, value]);
  return (
    <div className="counter">
      <b>{prefix}{n}{suffix}</b>
      <span>{label}</span>
      {note && <small>{note}</small>}
    </div>
  );
}

function Counters() {
  const [ref, seen] = useSeen<HTMLDivElement>(0.4);
  return (
    <section className="wsec">
      <div className="counters" ref={ref}>
        {COUNTERS.map((c) => <Counter key={c.label} {...c} go={seen} />)}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="wsec" aria-labelledby="experience-title">
      <h2 className="wlabel" id="experience-title">// <b>experience</b></h2>
      <ol className="roles">
        {ROLES.map((r) => (
          <li key={r.id} id={`role-${r.id}`} className="role">
            <div className="role-when">{r.when}</div>
            <h3>{r.org} <small>· {r.title}</small></h3>
            <p>{r.line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** /work: who → how broad → proof → depth. */
export default function WorkPage() {
  const { back } = useInstrument();
  useHashScroll();
  return (
    <main className="work-page">
      <div className="wwrap">
        <button type="button" className="section-back" onClick={back} data-probe="BACK">← back to the bench</button>
        <header className="whead">
          <div className="section-kicker">artificial neurons · research · industry · projects</div>
          <h1>WORK</h1>
          <div className="wbanner"><SimCanvas create={makeNet} bright={0.85} /></div>
        </header>
        <Statement />
        <section className="wsec" aria-label="Institutions">
          <InstitutionMap />
        </section>
        <Counters />
        <Experience />
        <Awards />
        <Stack />
        <Projects />
      </div>
    </main>
  );
}
