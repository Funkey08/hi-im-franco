import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { READINGS } from "../data/readings";
import { flare, reducedMotion } from "../lib/util";
import { InstrumentContext, type Instrument, type Phase, type Section } from "./context";
import { NixieController } from "./nixie";

const MEASURED_KEY = "fmv.hasMeasured";
const BOOTED_KEY = "fmv.booted";
const SECTIONS: Section[] = ["work", "life"];

const sectionOf = (path: string): Section | null => {
  const s = path.replace(/^\/+|\/+$/g, "");
  return (SECTIONS as string[]).includes(s) ? (s as Section) : null;
};

const readFlag = (store: Storage, key: string) => {
  try { return store.getItem(key) === "1"; } catch { return false; }
};
const writeFlag = (store: Storage, key: string) => {
  try { store.setItem(key, "1"); } catch { /* private mode: ignore */ }
};

export default function InstrumentProvider({ children }: { children: ReactNode }) {
  const [nixie] = useState(() => new NixieController(6));
  const [phase, setPhase] = useState<Phase>("off");
  const [readingIndex, setReadingIndex] = useState(0);
  const [sectionShown, setSectionShown] = useState(false);
  const [hasMeasured, setHasMeasured] = useState(() => readFlag(localStorage, MEASURED_KEY));
  const [warp, setWarp] = useState<Section | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [heroSlot, registerHeroSlot] = useState<HTMLElement | null>(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const busy = useRef(false);
  const interacted = useRef(false);
  const indexRef = useRef(0);
  const phaseRef = useRef<Phase>("off");
  const warpRef = useRef<Section | null>(null);
  // The provider lives as long as the app, so its timers are never cancelled. (Clearing them in an
  // effect cleanup would break the boot under StrictMode, which simulates an unmount in development.)
  const later = useCallback((fn: () => void, ms: number) => { window.setTimeout(fn, ms); }, []);
  const setPhaseBoth = useCallback((p: Phase) => { phaseRef.current = p; setPhase(p); }, []);

  /** Put reading `i` on the tubes. `user` = the visitor asked for it (vs the self-demo). */
  const display = useCallback((i: number, user: boolean) => {
    const r = READINGS[i];
    indexRef.current = i;
    setReadingIndex(i);
    setSectionShown(false);
    nixie.show(r.value, { numeric: r.numeric });
    flare();
    if (user) {
      interacted.current = true;
      if (i !== 0) { setHasMeasured(true); writeFlag(localStorage, MEASURED_KEY); }
    }
  }, [nixie]);

  const showReading = useCallback((i: number) => { if (!busy.current) display(i, true); }, [display]);
  const measure = useCallback(() => {
    if (!busy.current) display((indexRef.current + 1) % READINGS.length, true);
  }, [display]);

  /**
   * Power-on sequence: tubes strike one by one and sweep 0-9, then settle on FRANCO left to right.
   * First visit of the session also gets a self-demo: if the visitor hasn't touched anything,
   * the instrument takes one reading by itself, then returns to the name.
   */
  const boot = useCallback(() => {
    if (phaseRef.current !== "off") return;
    const repeat = readFlag(sessionStorage, BOOTED_KEY);
    writeFlag(sessionStorage, BOOTED_KEY);
    if (reducedMotion()) { nixie.show("FRANCO"); setPhaseBoth("ready"); return; }
    setPhaseBoth("boot");
    const sweepMs = repeat ? 350 : 1050;
    later(() => nixie.ignite(repeat ? 40 : 95), 180);
    later(() => {
      const settle = nixie.show("FRANCO", { base: 120, stagger: repeat ? 70 : 120 });
      later(() => { setPhaseBoth("ready"); flare(); }, settle + 80);
      if (!repeat) {
        later(() => {
          if (interacted.current || window.scrollY > 240) return;
          display(1, false);
          later(() => { if (!interacted.current && indexRef.current === 1) display(0, false); }, 3800);
        }, settle + 4200);
      }
    }, 180 + sweepMs);
  }, [nixie, display, later, setPhaseBoth]);

  const enter = useCallback((section: Section) => {
    if (busy.current) return;
    busy.current = true;
    interacted.current = true;
    setSectionShown(true);
    const settle = nixie.show(section.toUpperCase(), { base: 220, stagger: 80 });
    flare();
    window.setTimeout(() => { warpRef.current = section; setWarp(section); }, reducedMotion() ? 0 : settle);
  }, [nixie]);

  const finishWarp = useCallback(() => {
    const s = warpRef.current;
    warpRef.current = null;
    setWarp(null);
    busy.current = false;
    if (s) navigate(`/${s}`);
  }, [navigate]);

  const back = useCallback(() => {
    if (busy.current) return;
    busy.current = true;
    setLeaving(true);
    window.setTimeout(() => {
      navigate("/");
      setLeaving(false);
      busy.current = false;
    }, reducedMotion() ? 0 : 380);
  }, [navigate]);

  // Keep the tubes in sync with the page: section pages show their name, Home shows FRANCO.
  const prevPath = useRef<string | null>(null);
  useEffect(() => {
    const section = sectionOf(pathname);
    const prev = prevPath.current;
    prevPath.current = pathname;
    if (section) {
      setSectionShown(true);
      if (nixie.text !== section.toUpperCase()) nixie.show(section.toUpperCase(), { base: 160, stagger: 60 });
      if (phaseRef.current === "off") setPhaseBoth("ready");
    } else if (pathname === "/" && prev !== null && prev !== "/" && phaseRef.current === "ready") {
      display(0, false);
    } else if (pathname !== "/" && !section) {
      setSectionShown(true);
      nixie.show("404", { numeric: true, base: 160, stagger: 60 });
      if (phaseRef.current === "off") setPhaseBoth("ready");
    }
  }, [pathname, nixie, display, setPhaseBoth]);

  const value = useMemo<Instrument>(() => ({
    nixie, phase, readingIndex, hasMeasured, warp, leaving, heroSlot, registerHeroSlot,
    fullName: readingIndex !== 0 || sectionShown,
    boot, showReading, measure, enter, finishWarp, back,
  }), [nixie, phase, readingIndex, sectionShown, hasMeasured, warp, leaving, heroSlot,
    boot, showReading, measure, enter, finishWarp, back]);

  return <InstrumentContext.Provider value={value}>{children}</InstrumentContext.Provider>;
}
