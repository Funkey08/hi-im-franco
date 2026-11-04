import { useEffect, useRef, useState } from "react";
import kurisu from "../../assets/ascii/kurisu.json";
import AsciiArt, { type AsciiData } from "../../components/ascii/AsciiArt";
import Footer from "../../components/layout/Footer";
import { KURISU_NOTE, KURISU_SIGNOFF } from "../../data/site";
import Experiments from "./Experiments";
import Hero from "./Hero";
import "./home.css";

const KURISU_ART = kurisu as unknown as AsciiData;

/** Footer cameo: ASCII Kurisu prints in when you reach the bottom; hovering shows the note. */
function Kurisu() {
  const ref = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);
  useEffect(() => {
    const el = ref.current!;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setPlay(true); io.disconnect(); } }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
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
      <Footer aside={<Kurisu />} />
    </main>
  );
}
