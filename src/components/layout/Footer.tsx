import type { ReactNode } from "react";
import { LINKS } from "../../data/site";

/** Bottom-of-page links. Pages can put something beside it (Home puts Kurisu there). */
export default function Footer({ left, aside, eot = "— end of readings —" }: { left?: ReactNode; aside?: ReactNode; eot?: string }) {
  return (
    <footer className={`footer${left ? " has-left" : ""}`}>
      {left}
      <div className="footer-links">
        <div className="footer-eot">{eot}</div>
        <nav aria-label="Contact">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{l.label}</a>
          ))}
        </nav>
        <div>© {new Date().getFullYear()} Franco Miguel Valencia · Lab Mem 008</div>
      </div>
      {aside}
    </footer>
  );
}
