import { useState } from "react";
import { SLOGAN } from "../../data/site";
import { useInstrument } from "../../instrument/context";
import { createBrain } from "../../sims/brain";
import SimCanvas from "../../sims/SimCanvas";
import Facts from "./Facts";
import PhotoBoard from "./PhotoBoard";
import Shelf from "./Shelf";
import WorldMap from "./WorldMap";
import "../section.css";
import "./life.css";

const makeBrain = (c: HTMLCanvasElement) => createBrain(c, { count: 22 });

/** /life: the motto, then things I'm proud of → where I've been → photos from there → books. */
export default function LifePage() {
  const { back } = useInstrument();
  const [pick, setPick] = useState<{ iso: string; n: number } | null>(null);
  return (
    <main className="life-page">
      <div className="lwrap">
        <button type="button" className="section-back" onClick={back} data-probe="BACK">← back to the bench</button>
        <header className="lhead">
          <div className="section-kicker">real neurons · places · photos · the rest of me</div>
          <h1>LIFE</h1>
          <div className="lbanner"><SimCanvas create={makeBrain} bright={0.85} /></div>
          <p className="lmotto">{SLOGAN.lead}<em>{SLOGAN.accent}</em>{SLOGAN.tail}</p>
        </header>
        <Facts />
        <WorldMap onPick={(iso) => setPick((p) => ({ iso, n: (p?.n ?? 0) + 1 }))} />
        <PhotoBoard pick={pick} />
        <Shelf />
      </div>
    </main>
  );
}
