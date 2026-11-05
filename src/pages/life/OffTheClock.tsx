import { useState } from "react";
import Lightbox from "../../components/fx/Lightbox";
import { GALLERY, INTERESTS } from "../../data/life";
import { rich } from "../../lib/rich";
import { reducedMotion } from "../../lib/util";

const FAN = ["miyajima-torii", "stellisee-zermatt", "taipei-at-night"].map((s) => GALLERY.find((g) => g.slug === s)!);

/** "Off the clock": six small cards about everything else, each with a photo (or its stand-in). */
export default function OffTheClock() {
  const withPhoto = INTERESTS.filter((x) => x.photo);
  const slides = withPhoto.map((x) => ({ src: x.photo!.lg, alt: x.caption ?? x.title, caption: x.caption ?? x.title, sub: x.title, w: x.photo!.w, h: x.photo!.h }));
  const [open, setOpen] = useState<number | null>(null);
  const toBoard = () => document.getElementById("photos-title")?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });

  return (
    <section className="lsec" aria-labelledby="clock-title">
      <h2 className="llabel" id="clock-title">// <b>off the clock</b> <span className="llabel-aside">what else I'm into</span></h2>
      <div className="interests">
        {INTERESTS.map((x) => (
          <article key={x.title} className="interest">
            {x.photo && (
              <button type="button" className="interest-fig" onClick={() => setOpen(withPhoto.indexOf(x))} data-probe="ENLARGE" aria-label={`Photo: ${x.caption}`}>
                <img src={x.photo.sm} alt="" width={x.photo.w} height={x.photo.h} loading="lazy" />
                {x.caption && <span>{x.caption}</span>}
              </button>
            )}
            {x.visual === "gallery" && (
              <button type="button" className="interest-fig fan" onClick={toBoard} data-probe="GALLERY" aria-label="Jump to the photos">
                {FAN.map((g, i) => <img key={g.slug} src={g.sm} alt="" style={{ "--k": i } as React.CSSProperties} loading="lazy" />)}
                <span>see the gallery ↑</span>
              </button>
            )}
            {x.lists && (
              <div className="interest-fig lists">
                {x.lists.map((l) => (
                  <div key={l.label}>
                    <b>{l.label}</b>
                    <ul>{l.items.map((it) => <li key={it}>{it}</li>)}</ul>
                  </div>
                ))}
              </div>
            )}
            <h3>{x.title}</h3>
            <p>{rich(x.text)}</p>
          </article>
        ))}
      </div>
      {open !== null && <Lightbox slides={slides} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />}
    </section>
  );
}
