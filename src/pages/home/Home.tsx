import { useEffect, useRef, useState } from "react";
import franco from "../../assets/ascii/franco.json";
import kurisu from "../../assets/ascii/kurisu.json";
import AsciiArt, { type AsciiData } from "../../components/ascii/AsciiArt";
import Footer from "../../components/layout/Footer";
import { KURISU_NOTE, KURISU_SIGNOFF } from "../../data/site";
import ContactBox from "./ContactBox";
import Experiments from "./Experiments";
import Hero from "./Hero";
import "./home.css";

const KURISU_ART = kurisu as unknown as AsciiData;
const FRANCO_ART = franco as unknown as AsciiData;

/** True once the element has scrolled (20%) into view; used to start the ASCII print-in. */
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/** Footer, left: the operator (Franco's ASCII self-portrait). */
function Operator() {
  const [ref, play] = useSeen<HTMLDivElement>();
  return (
    <div className="operator" ref={ref} aria-hidden="true">
      <AsciiArt data={FRANCO_ART} play={play} rowMs={14} />
      <span className="operator-tag">// operator</span>
    </div>
  );
}

/** Footer, right: ASCII Kurisu prints in when you reach the bottom; hovering shows the note. */
function Kurisu() {
  const [ref, play] = useSeen<HTMLDivElement>();
  return (
    <div
      className="kurisu"
      ref={ref}
      tabIndex={0}
      aria-label={`Makise Kurisu from Steins;Gate, in ASCII. ${KURISU_NOTE.join(" ")} ${KURISU_SIGNOFF}`}
    >
      <AsciiArt data={KURISU_ART} play={play} />
      <div className="kurisu-note" aria-hidden="true">
        {KURISU_NOTE.map((line) => <span key={line}>{line}</span>)}
        <span className="signoff">{KURISU_SIGNOFF}</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="home">
      <Hero />
      <Experiments />
      <ContactBox />
      <Footer left={<Operator />} aside={<Kurisu />} />
    </main>
  );
}
