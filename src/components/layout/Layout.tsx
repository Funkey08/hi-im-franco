import { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { LINKS } from "../../data/site";
import { useInstrument } from "../../instrument/context";
import Atmosphere from "../fx/Atmosphere";
import ProbeCursor from "../fx/ProbeCursor";
import WarpOverlay from "../fx/WarpOverlay";
import WorldlineBoot from "../fx/WorldlineBoot";
import Footer from "./Footer";
import NixieDock from "./NixieDock";
import "./layout.css";

const EOT: Record<string, string> = { home: "— end of readings —", work: "— end of channel —", life: "— end of channel —" };

/** App shell: atmosphere, top bar with the docking clock, transitions, and the current page. */
export default function Layout() {
  const { pathname } = useLocation();
  const { leaving, introDone, finishIntro } = useInstrument();
  const section = pathname.replace(/^\/+|\/+$/g, "") || "home";
  // Only pages reached by navigation power on like a CRT; the page you land on doesn't.
  const [landing] = useState(pathname);
  const animateIn = pathname !== landing || history.state?.idx > 0;

  // New page: start at the top, and let CSS know which section we're in (probe colour, etc.).
  const prev = useRef(pathname);
  useEffect(() => {
    if (prev.current !== pathname) window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    prev.current = pathname;
    document.body.dataset.section = section;
  }, [pathname, section]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Atmosphere />
      <header className="topbar">
        <div className="topbar-left">
          <Link to="/" className="topbar-plate" data-probe="HOME">FMV-08 · 170 V DC</Link>
          <span className="topbar-coords" id="probe-coords" aria-hidden="true">x 0000 · y 0000</span>
        </div>
        <nav className="topbar-nav" aria-label="Elsewhere">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{l.label}</a>
          ))}
        </nav>
      </header>
      <NixieDock />
      <WarpOverlay />
      <ProbeCursor />
      {!introDone && <WorldlineBoot onDone={finishIntro} />}
      <div
        id="main"
        key={pathname}
        className={`page${animateIn ? " page-enter" : ""}${leaving ? " page-leave" : ""}`}
      >
        <Outlet />
        <Footer eot={EOT[section] ?? EOT.home} />
      </div>
    </>
  );
}
