import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";
import { NAME, ROLES, SLOGAN, SLOGAN_TEXT } from "../../data/site";
import { useInstrument, type Section } from "../../instrument/context";
import { reducedMotion } from "../../lib/util";
import { createBrain } from "../../sims/brain";
import { createNet } from "../../sims/net";
import SimCanvas from "../../sims/SimCanvas";
import ReadingsPanel, { UnitLamps } from "./ReadingsPanel";

const makeNet = (c: HTMLCanvasElement) => createNet(c, { layers: [4, 6, 6, 4, 2] });
const makeBrain = (c: HTMLCanvasElement) => createBrain(c, { count: 8 });

/** MIGUEL VALENCIA, with FRANCO dropping in letter by letter while the tubes show something else. */
function Nameplate() {
  const { fullName } = useInstrument();
  return (
    <h1 className={`nameplate${fullName ? " full" : ""}`} aria-label={`${NAME.first} ${NAME.rest}`}>
      <span className="nameplate-first" aria-hidden="true">
        {NAME.first.toUpperCase().split("").map((ch, k) => (
          <i key={k} style={{ "--k": k } as CSSProperties}>{ch}</i>
        ))}
      </span>
      <span aria-hidden="true">{NAME.rest.toUpperCase()}</span>
    </h1>
  );
}

/** The slogan types itself once the instrument is ready, then the accent words light up. */
function Slogan({ start }: { start: boolean }) {
  const [n, setN] = useState(() => (reducedMotion() ? SLOGAN_TEXT.length : 0));
  useEffect(() => {
    if (!start || reducedMotion()) return;
    let v = 0;
    const iv = window.setInterval(() => {
      v += 1;
      setN(v);
      if (v >= SLOGAN_TEXT.length) window.clearInterval(iv);
    }, 34);
    return () => window.clearInterval(iv);
  }, [start]);
  const done = n >= SLOGAN_TEXT.length;
  const typed = SLOGAN_TEXT.slice(0, n);
  const a = SLOGAN.lead.length, b = a + SLOGAN.accent.length;
  return (
    <p className={`slogan${done ? " done" : ""}`} aria-label={SLOGAN_TEXT}>
      <span aria-hidden="true">
        {typed.slice(0, a)}
        {n > a && <em>{typed.slice(a, b)}</em>}
        {typed.slice(b)}
        {start && <span className="caret" />}
      </span>
    </p>
  );
}

function Channel({ kind, title, kicker, sub, create }: {
  kind: Section; title: string; kicker: string; sub: string; create: (c: HTMLCanvasElement) => ReturnType<typeof createNet>;
}) {
  const { enter } = useInstrument();
  const [hot, setHot] = useState(false);
  return (
    <button
      type="button"
      className={`channel ${kind}`}
      onClick={() => enter(kind)}
      onPointerEnter={() => setHot(true)}
      onPointerLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={() => setHot(false)}
      data-probe={title}
      data-probe-tone={kind}
      aria-label={`Enter the ${title.toLowerCase()} section`}
    >
      <span className="channel-screen"><SimCanvas create={create} bright={hot ? 1 : 0.7} /></span>
      <span className="channel-text">
        <b>{title}</b>
        <small><em>{kicker}</em><br />{sub}</small>
        <span className="channel-go">Enter →</span>
      </span>
    </button>
  );
}

export default function Hero() {
  const { phase, boot, registerHeroSlot, nixie, introDone } = useInstrument();
  const cells = useSyncExternalStore(nixie.subscribe, nixie.getSnapshot);
  const lit = cells.filter((c) => c.on).length / cells.length;
  const ready = phase === "ready";

  // the tubes power on as the worldline intro switches off
  useEffect(() => { if (introDone) boot(); }, [introDone, boot]);

  return (
    <section className={`bench phase-${phase}`} aria-label="Introduction">
      <div className="wallglow" style={{ opacity: 0.25 + 0.75 * lit }} aria-hidden="true" />

      <div className="display-row">
        <div className="clock-slot" ref={registerHeroSlot} />
        <UnitLamps />
      </div>

      <div className="reveal" style={{ "--d": 0 } as CSSProperties}><Nameplate /></div>
      <p className="hero-role reveal" style={{ "--d": 1 } as CSSProperties}>
        {ROLES.map((r, i) => <span key={r}>{i > 0 && <i aria-hidden="true">·</i>}{r}</span>)}
      </p>
      <div className="reveal" style={{ "--d": 2 } as CSSProperties}><ReadingsPanel /></div>
      <Slogan start={ready} />
      <p className="pick reveal" style={{ "--d": 5 } as CSSProperties}>Click on a section to learn more about me.</p>
      <div className="channels reveal" style={{ "--d": 6 } as CSSProperties}>
        <Channel kind="work" title="WORK" kicker="artificial neurons" sub="research · industry · projects" create={makeNet} />
        <span className="channels-vs" aria-hidden="true">vs.</span>
        <Channel kind="life" title="LIFE" kicker="real neurons" sub="places · photos · achievements" create={makeBrain} />
      </div>
      <div className="scrollcue reveal" style={{ "--d": 8 } as CSSProperties} aria-hidden="true">↓</div>
    </section>
  );
}
