import { createContext, useContext } from "react";
import type { NixieController } from "./nixie";

export type Section = "work" | "life";
export type Phase = "off" | "boot" | "ready";

export interface Instrument {
  nixie: NixieController;
  /** off → boot (tubes powering on) → ready (rest of the hero reveals). */
  phase: Phase;
  readingIndex: number;
  /** FRANCO has dropped into the nameplate: the tubes show a metric or a section name. */
  fullName: boolean;
  /** The visitor has pressed MEASURE (or picked a reading) at least once, ever. */
  hasMeasured: boolean;
  /** Section whose full-screen transition is playing. */
  warp: Section | null;
  /** The current page is powering off (CRT collapse) before navigating home. */
  leaving: boolean;
  /** The worldline boot intro has finished (or was skipped / already seen this session). */
  introDone: boolean;
  finishIntro: () => void;
  heroSlot: HTMLElement | null;
  registerHeroSlot: (el: HTMLElement | null) => void;
  boot: () => void;
  showReading: (i: number) => void;
  measure: () => void;
  /** Return the tubes to the name (FRANCO), e.g. when the clock docks into the header. */
  rest: () => void;
  /** Play the section transition, then open it (optionally scrolled to `#hash`). */
  enter: (section: Section, hash?: string) => void;
  finishWarp: () => void;
  back: () => void;
}

export const InstrumentContext = createContext<Instrument | null>(null);

export function useInstrument(): Instrument {
  const ctx = useContext(InstrumentContext);
  if (!ctx) throw new Error("useInstrument must be used inside <InstrumentProvider>");
  return ctx;
}
