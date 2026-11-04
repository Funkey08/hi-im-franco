import franco from "../../assets/ascii/franco.json";
import { LINKS, SIGNOFF, SIGNOFF_NOTE } from "../../data/site";
import { useSeen } from "../../lib/useSeen";
import AsciiArt, { type AsciiData } from "../ascii/AsciiArt";
import ContactBox from "./ContactBox";

const FRANCO_ART = franco as unknown as AsciiData;

/** Franco's ASCII self-portrait: prints in row by row when it scrolls into view; hover shows the sign-off note. */
function Portrait() {
  const [ref, play] = useSeen<HTMLDivElement>(0.2);
  return (
    <div className="portrait" ref={ref} tabIndex={0} aria-label={`Franco, in ASCII. ${SIGNOFF_NOTE.join(" ")} ${SIGNOFF}`}>
      <AsciiArt data={FRANCO_ART} play={play} rowMs={12} />
      <div className="portrait-note" aria-hidden="true">
        {SIGNOFF_NOTE.map((line) => <span key={line}>{line}</span>)}
        <span className="signoff">{SIGNOFF}</span>
      </div>
    </div>
  );
}

/** Bottom of every page, one row: the compose box (+ links) on the left, the self-portrait on the right. Rendered by Layout. */
export default function Footer({ eot = "— end of readings —" }: { eot?: string }) {
  return (
    <footer className="footer">
      <div className="footer-main">
        <ContactBox />
        <div className="footer-links">
          <div className="footer-eot">{eot}</div>
          <nav aria-label="Links">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{l.label}</a>
            ))}
          </nav>
          <div>© {new Date().getFullYear()} Franco Miguel Valencia · Lab Mem 008</div>
        </div>
      </div>
      <Portrait />
    </footer>
  );
}
