import franco from "../../assets/ascii/franco.json";
import AsciiArt, { type AsciiData } from "../../components/ascii/AsciiArt";
import Footer from "../../components/layout/Footer";
import { SIGNOFF, SIGNOFF_NOTE } from "../../data/site";
import { useSeen } from "../../lib/useSeen";
import ContactBox from "./ContactBox";
import Experiments from "./Experiments";
import Hero from "./Hero";
import "./home.css";

const FRANCO_ART = franco as unknown as AsciiData;

/** Footer, right: Franco's ASCII self-portrait prints in at the bottom; hovering shows the sign-off note. */
function Portrait() {
  const [ref, play] = useSeen<HTMLDivElement>(0.2);
  return (
    <div className="portrait" ref={ref} tabIndex={0} aria-label={`Franco, in ASCII. ${SIGNOFF_NOTE.join(" ")} ${SIGNOFF}`}>
      <AsciiArt data={FRANCO_ART} play={play} rowMs={14} />
      <div className="portrait-note" aria-hidden="true">
        {SIGNOFF_NOTE.map((line) => <span key={line}>{line}</span>)}
        <span className="signoff">{SIGNOFF}</span>
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
      <Footer aside={<Portrait />} />
    </main>
  );
}
