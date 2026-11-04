import { useState } from "react";
import Lightbox from "../../components/fx/Lightbox";
import { FACTS, FACTS_CODA } from "../../data/life";
import { rich } from "../../lib/rich";
import { useSeen } from "../../lib/useSeen";

const plain = (t: string) => t.replace(/\*\*/g, "").replace(/\[(.+?)\]\([^)]*\)/g, "$1");

/**
 * "Things I'm proud of": a numbered field-notebook list. Entries with a photo carry a small taped
 * polaroid in the margin; hovering the entry lifts it into a bigger peek, clicking opens it.
 */
export default function Facts() {
  const [ref, seen] = useSeen<HTMLOListElement>(0.15);
  const [open, setOpen] = useState<number | null>(null);
  const withPhoto = FACTS.map((f, i) => ({ f, i })).filter(({ f }) => f.photo);
  const slides = withPhoto.map(({ f }) => ({ src: f.photo!.lg, alt: "", caption: f.caption ?? "", sub: plain(f.text), w: f.photo!.w, h: f.photo!.h }));

  return (
    <section className="lsec" aria-labelledby="facts-title">
      <h2 className="llabel" id="facts-title">// <b>things I'm proud of</b> <span>serious and otherwise</span></h2>
      <ol className={`facts${seen ? " seen" : ""}`} ref={ref}>
        {FACTS.map((f, i) => (
          <li key={i} className={`fact${f.photo ? " has-photo" : ""}`} style={{ "--i": i } as React.CSSProperties}>
            <span className="fact-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <p>{rich(f.text)}</p>
            {f.photo && (
              <button type="button" className="fact-pol" onClick={() => setOpen(withPhoto.findIndex((w) => w.i === i))}
                data-probe="PHOTO" aria-label={`Photo: ${f.caption}`}>
                <img src={f.photo.sm} alt="" width={f.photo.w} height={f.photo.h} loading="lazy" />
              </button>
            )}
            {f.photo && (
              <span className="fact-peek" aria-hidden="true">
                <img src={f.photo.sm} alt="" width={f.photo.w} height={f.photo.h} loading="lazy" />
                <span>{f.caption}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="facts-coda">{FACTS_CODA}</p>
      {open !== null && <Lightbox slides={slides} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}
