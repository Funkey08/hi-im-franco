import { useInstrument, type Section } from "../instrument/context";
import { createBrain } from "../sims/brain";
import { createNet } from "../sims/net";
import SimCanvas from "../sims/SimCanvas";
import { SLOGAN } from "../data/site";
import "./section.css";

const makeNet = (c: HTMLCanvasElement) => createNet(c, { layers: [5, 8, 10, 10, 8, 5, 3], perLayer: 260 });
const makeBrain = (c: HTMLCanvasElement) => createBrain(c, { count: 22 });

const COPY: Record<Section, { kicker: string; coming: { title: string; body: string }[] }> = {
  work: {
    kicker: "artificial neurons · research · industry · projects",
    coming: [
      { title: "Flagship experiments", body: "VeriSkeptic · λ Lambda · CHIS paper, as full case studies" },
      { title: "Everything else", body: "Intact · EPFL · Cove · mortality study · SC² · Vera · …" },
      { title: "Timeline + publications", body: "2023 → now, with every talk and manuscript" },
    ],
  },
  life: {
    kicker: "real neurons · places · photos · achievements",
    coming: [
      { title: "Things I'm proud of", body: "Two places at once · banned from a buffet · a driver's license · …" },
      { title: "Places", body: "A world map: every country, with a photo" },
      { title: "Bookshelf · photos", body: "Kafka on the Shore, The Three-Body Problem, Dune, …" },
    ],
  },
};

/** Placeholder for a section that's still being built: same instrument, real banner animation. */
export default function SectionPage({ section }: { section: Section }) {
  const { back } = useInstrument();
  const copy = COPY[section];
  return (
    <main className={`section-page ${section}`}>
      <div className="section-wrap">
        <button type="button" className="section-back" onClick={back} data-probe="BACK">← back to the bench</button>
        <header className="section-head-row">
          <div>
            <div className="section-kicker">{copy.kicker}</div>
            <h1>{section.toUpperCase()}</h1>
          </div>
          {section === "life" && (
            <p className="section-slogan">{SLOGAN.lead}<em>{SLOGAN.accent}</em>{SLOGAN.tail}</p>
          )}
        </header>
        <div className={`section-banner ${section}`}>
          <SimCanvas create={section === "work" ? makeNet : makeBrain} bright={0.85} />
        </div>
        <p className="section-building"><span className="led on busy" /> This section is being built. Here's what's coming:</p>
        <div className="section-stubs">
          {copy.coming.map((c) => (
            <div key={c.title} className="section-stub"><b>{c.title}</b>{c.body}</div>
          ))}
        </div>
      </div>
    </main>
  );
}
