import veriskeptic from "../assets/projects/veriskeptic-pass-vs-attempts.png";
import breastShap from "../assets/projects/breast-shap.avif";
import weightedOrs from "../assets/carousel/academic/weighted-ors.avif";
import acceptance from "../assets/carousel/academic/acceptance-rate-difference.avif";
import topomap from "../assets/carousel/academic/topomap.avif";

/** Generated cover art (see coverArt.ts) for projects that don't have a figure yet. */
export type CoverArt = "lambda" | "intact" | "vera";

export interface Experiment {
  slug: string;
  title: string;
  blurb: string;
  cover: { image: string } | { art: CoverArt };
}

/** The "recent experiments" carousel on Home. Claims follow the FACT_SHEET. */
export const EXPERIMENTS: Experiment[] = [
  { slug: "veriskeptic", title: "VeriSkeptic", blurb: "A self-checking LLM agent for hardware code. An honest null result.", cover: { image: veriskeptic } },
  { slug: "lambda", title: "λ Lambda", blurb: "Does order-flow imbalance predict crypto prices after costs? In progress.", cover: { art: "lambda" } },
  { slug: "chis-mental-health", title: "CHIS mental health", blurb: "First author: survey-weighted inference on 4,366 adolescents.", cover: { image: weightedOrs } },
  { slug: "intact", title: "Intact Financial", blurb: "An LLM extraction pipeline across 2,000+ client records.", cover: { art: "intact" } },
  { slug: "epfl-decisions", title: "Decisions under effort", blurb: "Mixed-effects models of 48,600 choices at EPFL.", cover: { image: acceptance } },
  { slug: "eeg-connectivity", title: "EEG connectivity", blurb: "An open-source MNE pipeline for depression EEG.", cover: { image: topomap } },
  { slug: "breast-cancer", title: "Breast-cancer detection", blurb: "Interpretable models for detection, explained with SHAP.", cover: { image: breastShap } },
  { slug: "vera", title: "Vera", blurb: "Ranks 4,628 Toronto restaurants. U of T Innovation Lab.", cover: { art: "vera" } },
];
