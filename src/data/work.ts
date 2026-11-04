/**
 * Everything on the Work page. Every claim traces to the FACT_SHEET (00_FACT_SHEET.md); numbers
 * marked [V] there. Project `slug`s double as page anchors (/work#veriskeptic) and match the home
 * carousel in experiments.ts.
 */
import harvard from "../assets/logos/harvard.svg";
import mit from "../assets/logos/mit.svg";
import ilab from "../assets/logos/harvard-i-lab.svg";
import intact from "../assets/logos/intact.svg";
import epfl from "../assets/logos/epfl.png";
import campusBiotech from "../assets/logos/campus-biotech.png";
import nus from "../assets/logos/nus.png";
import stanford from "../assets/logos/stanford.png";
import cove from "../assets/logos/cove.png";
import uoft from "../assets/logos/uoft.png";

import veriskeptic from "../assets/projects/veriskeptic-pass-vs-attempts.png";
import weightedOrs from "../assets/carousel/academic/weighted-ors.avif";
import epflFig from "../assets/projects/epfl-das-change.avif";
import breast from "../assets/projects/breast-cancer-integrated-gradients.avif";
import topomap from "../assets/carousel/academic/topomap.avif";
import betterYears from "../assets/projects/betteryears.avif";
import cvd from "../assets/projects/cvd-heart-failure-asmr.avif";
import tiRig from "../assets/projects/ti-task-rig.avif";
import awEpfl from "../assets/awards/epfl.png";
import awStanford from "../assets/awards/stanford.png";
import awYale from "../assets/awards/yale.svg";
import awUtcs from "../assets/awards/utcs.png";
import awTrinity from "../assets/awards/trinity.png";
import awUoft from "../assets/awards/uoft.png";
import awAssu from "../assets/awards/assu.png";
import awUtsu from "../assets/awards/utsu.png";
import type { CoverArt } from "./experiments";

/* ------------------------------------------------------------------ statement */

/** Rendered with the `hl` phrases in amber and `data` glowing. */
export const STATEMENT = {
  parts: [
    "I've worked for nearly ", { hl: "a dozen different institutions" }, ", across ",
    { hl: "three different continents" }, ", in ", { hl: "distinctly unrelated fields" },
    ". But they've all been connected by one thing, and that's ",
  ] as (string | { hl: string })[],
  data: "data",
  /** Leave null until Franco writes it; the page shows nothing in its place. */
  intro: null as string | null,
};

/* ------------------------------------------------------------------ institutions */

export interface Institution {
  name: string;
  logo: string;
  /** Plaque tone: logos with light ink sit on walnut, dark ink on bone. Logos themselves are never recoloured. */
  plate: "walnut" | "bone";
  role: string;
  where: string;
  /** Scattered position on the map, % of the map box (centre of the plaque). */
  x: number;
  y: number;
  tilt: number;
  /** Anchor of the matching entry in the experience list. */
  roleId: string;
}

export const INSTITUTIONS: Institution[] = [
  { name: "Harvard University", logo: harvard, plate: "bone", role: "SM Data Science", where: "Cambridge, MA · 2026 – Dec 2027", x: 15, y: 17, tilt: -2.5, roleId: "harvard" },
  { name: "MIT", logo: mit, plate: "bone", role: "Cross-enrolled (CS, Statistics)", where: "Cambridge, MA · 2026", x: 41, y: 9, tilt: 1.5, roleId: "harvard" },
  { name: "Harvard Innovation Labs", logo: ilab, plate: "bone", role: "Founder, stealth AI startup", where: "Cambridge, MA · 2026 –", x: 70, y: 13, tilt: -1, roleId: "ilab" },
  { name: "Intact Financial", logo: intact, plate: "bone", role: "Data Scientist I", where: "Toronto · Jan – Apr 2026", x: 89, y: 37, tilt: 2.5, roleId: "intact" },
  { name: "EPFL", logo: epfl, plate: "walnut", role: "Quantitative Neuroscience Researcher", where: "Geneva · May – Aug 2025", x: 80, y: 71, tilt: -2, roleId: "epfl" },
  { name: "Campus Biotech", logo: campusBiotech, plate: "bone", role: "Where EPFL's LNCO lab is based", where: "Geneva · 2025", x: 59, y: 90, tilt: 1, roleId: "epfl" },
  { name: "National University of Singapore", logo: nus, plate: "bone", role: "Full-time research role", where: "Singapore · May – Aug 2024", x: 33, y: 86, tilt: -1.5, roleId: "nus" },
  { name: "Stanford Medicine", logo: stanford, plate: "bone", role: "Data Science Research Fellow (CARE, SC²)", where: "Palo Alto · Apr 2024 – Apr 2026", x: 11, y: 62, tilt: 2, roleId: "stanford" },
  { name: "Cove Neurosciences", logo: cove, plate: "walnut", role: "R&D Data Science & Software Intern", where: "Toronto · Aug 2024 – May 2025", x: 28, y: 40, tilt: -3, roleId: "cove" },
  { name: "University of Toronto", logo: uoft, plate: "bone", role: "BSc Hons · CS, Neuroscience, Psychology", where: "Toronto · to Jun 2026", x: 70, y: 46, tilt: 1.5, roleId: "uoft" },
];

export const CONTINENTS = [
  { name: "N. America", cities: "Toronto · Palo Alto · Cambridge" },
  { name: "Europe", cities: "Geneva" },
  { name: "Asia", cities: "Singapore" },
];

/* ------------------------------------------------------------------ counters */

export const COUNTERS = [
  { value: 7, prefix: "", suffix: "", label: "manuscripts · 1 first-author" },
  { value: 5, prefix: "", suffix: "", label: "conference talks & posters" },
  { value: 30, prefix: "$", suffix: "k+", label: "in research awards" },
  { value: 5, prefix: "", suffix: "", label: "of the world's top 25 universities", note: "MIT, Stanford, Harvard, NUS, EPFL · QS 2026" },
];

/* ------------------------------------------------------------------ experience */

export interface Role {
  id: string;
  when: string;
  org: string;
  title: string;
  line: string;
}

export const ROLES: Role[] = [
  { id: "harvard", when: "2026 – Dec 2027 · Cambridge, MA", org: "Harvard University", title: "SM Data Science · MIT cross-enrolled (CS, Statistics)",
    line: "Causal inference, linear models, optimization and MLOps." },
  { id: "ilab", when: "2026 – · Cambridge, MA", org: "Harvard Innovation Labs", title: "Founder, stealth AI startup",
    line: "Building an AI product in stealth." },
  { id: "intact", when: "Jan – Apr 2026 · Toronto", org: "Intact Financial", title: "Data Scientist I",
    line: "An async LLM pipeline that recovered an inconsistently recorded underwriting variable from 2,000+ client records; profitability drivers in Airflow; a life-event detection engine with up to $300K projected annual upside." },
  { id: "epfl", when: "May – Aug 2025 · Geneva", org: "EPFL, Laboratory of Cognitive Neuroscience", title: "Quantitative Neuroscience Researcher",
    line: "Mixed-effects models of 48,600 accept/reject decisions; six experiment apps shipped three months ahead of schedule." },
  { id: "stanford", when: "Apr 2024 – Apr 2026 · Palo Alto", org: "Stanford Medicine & Stanford SC²", title: "Data Science Research Fellow",
    line: "First author on a survey-weighted study of 4,366 adolescents; co-author on mortality studies of 2.4M death records; data harmonization for the Item Response Warehouse." },
  { id: "cove", when: "Aug 2024 – May 2025 · Toronto", org: "Cove Neurosciences", title: "R&D Data Science & Software Engineering Intern",
    line: "An open-source MNE-Python pipeline for depression EEG, from artifact removal to connectivity features and classifiers." },
  { id: "nus", when: "May – Aug 2024 · Singapore", org: "National University of Singapore", title: "Research (full-time)",
    line: "Held alongside the Stanford fellowship, 15 hours apart." },
  { id: "takehara", when: "May 2023 – Jan 2024 · Toronto", org: "Takehara Lab, University of Toronto", title: "Research Opportunity Program",
    line: "Extended the Arduino control code of an automated transitive-inference task for mice: 6.25× more trials per session than the manual design." },
  { id: "uoft", when: "to Jun 2026 · Toronto", org: "University of Toronto", title: "BSc Hons · Computer Science, Neuroscience, Psychology",
    line: "High Distinction." },
];

/* ------------------------------------------------------------------ awards */

export interface Award { name: string; from: string; logo: string; note?: string }

/** Every award (the Jan 2026 CV's ten; FACT_SHEET total $30k+). Years omitted until verified. */
export const AWARDS: Award[] = [
  { name: "Excellence Research Internship Award", from: "EPFL", logo: awEpfl, note: "funded the summer in Geneva" },
  { name: "Chi-Li Pao Foundation Award", from: "Stanford", logo: awStanford },
  { name: "Yale Research Fund", from: "Yale", logo: awYale },
  { name: "Computer Science Engagement Award", from: "University of Toronto", logo: awUtcs },
  { name: "Research Exchange Award", from: "University of Toronto", logo: awUoft },
  { name: "DCS Academic Grant", from: "U of T Computer Science", logo: awUtcs },
  { name: "Eric Jackman Scholarship", from: "Trinity College, U of T", logo: awTrinity },
  { name: "Experiential Learning Award", from: "Trinity College, U of T", logo: awTrinity },
  { name: "Conference Grant", from: "Arts & Science Students' Union (ASSU)", logo: awAssu },
  { name: "Academic Pursuits Award", from: "U of T Students' Union (UTSU)", logo: awUtsu },
];
export const AWARDS_TOTAL = "$30k+ in total";

/* ------------------------------------------------------------------ tech stack */

export interface Tool {
  name: string;
  /** Project tool names that count as this tool (case-insensitive). Defaults to [name]. */
  match?: string[];
  /** Where else it was used (roles, coursework), shown in the hover note. */
  also?: string;
}
export interface StackGroup { id: string; label: string; tools: Tool[] }

/**
 * Everything in the FACT_SHEET Skills section, grouped. Each tool's hover note lists the projects
 * below that use it (computed from PROJECTS[].tools) plus `also`.
 */
export const STACK: StackGroup[] = [
  { id: "lang", label: "languages", tools: [
    { name: "Python" },
    { name: "R" },
    { name: "SQL", also: "Intact" },
    { name: "TypeScript", also: "EPFL experiment apps, this site" },
    { name: "Java" },
    { name: "C++", match: ["C++ / Arduino"] },
    { name: "Swift" },
    { name: "Julia", also: "MIT 6.C571 (optimization)" },
  ] },
  { id: "stats", label: "statistics", tools: [
    { name: "mixed-effects models", match: ["lme4"] },
    { name: "survey-weighted inference", match: ["survey"] },
    { name: "causal inference", also: "Harvard STAT 289; SC² treatment-effect work", match: [] },
    { name: "Bayesian estimation", match: ["Bayesian regression"] },
    { name: "bootstrap & hypothesis tests", match: ["bootstrap CIs", "likelihood-ratio tests"] },
    { name: "age standardization" },
    { name: "time series", match: [], also: "Harvard coursework; λ Lambda's design" },
    { name: "optimization (LP, convex)", match: [], also: "MIT 6.C571 with JuMP" },
  ] },
  { id: "ml", label: "machine learning & AI", tools: [
    { name: "PyTorch" },
    { name: "scikit-learn", also: "Intact (random-forest importance)" },
    { name: "vision transformers", match: ["ViT"] },
    { name: "tree ensembles", match: ["random forests"], also: "Intact" },
    { name: "LLM APIs", match: ["OpenAI API", "Gemini API"] },
    { name: "LangChain" },
    { name: "interpretability", match: ["integrated gradients"] },
    { name: "MNE-Python" },
  ] },
  { id: "data", label: "data & infrastructure", tools: [
    { name: "asyncio" },
    { name: "Polars / pyarrow", match: ["Polars", "pyarrow"] },
    { name: "tidyverse", match: ["tidyverse", "tidyr", "haven", "ggplot2"] },
    { name: "Databricks" },
    { name: "Snowflake" },
    { name: "Airflow" },
    { name: "GCP", match: ["GCP Cloud Run", "Firestore"] },
    { name: "AWS", match: [], also: "EPFL (S3 + CloudFront deploys)" },
    { name: "GitHub Actions", match: [], also: "EPFL, Vera CI" },
    { name: "Docker", match: [], also: "Harvard AC 215 (MLOps)" },
  ] },
  { id: "build", label: "apps & hardware", tools: [
    { name: "React", match: [], also: "EPFL experiment apps (jsPsych), this site" },
    { name: "FastAPI" },
    { name: "Flutter" },
    { name: "Apple Vision Pro" },
    { name: "Arduino", match: ["C++ / Arduino"] },
    { name: "Bonsai / pyControl", match: ["Bonsai", "pyControl"] },
    { name: "pytest / mypy", match: ["pytest", "mypy"] },
  ] },
];

/* ------------------------------------------------------------------ projects */

export type Figure =
  | { image: string; fit?: "cover" | "contain"; credit?: string }
  | { art: CoverArt }
  | { metric: string; caption: string };

export interface Project {
  slug: string;
  title: string;
  status: { label: string; tone: "live" | "prog" | "pub" };
  meta: string;
  figure: Figure;
  /** Flagships only: the result in one line. */
  headline?: string;
  desc: string;
  stats?: [string, string][];
  tools: string[];
  links: { label: string; href?: string }[];
  flagship?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "veriskeptic", title: "VeriSkeptic", flagship: true,
    status: { label: "public repo", tone: "live" }, meta: "Oct 2026 · solo",
    figure: { image: veriskeptic, fit: "contain" },
    headline: "Letting an LLM test its own hardware code barely beats asking it once: +1.3 points, not significant.",
    desc: "An LLM agent that writes Verilog from a plain-English spec, then writes and simulates its own testbench and revises before submitting. On 152 VerilogEval problems it beat a single call by only 1.3 points (95% CI −3.9 to +6.6), even though its self-checks fixed 10 of its own drafts and broke none. The null result is the headline, reported with the cost of every call.",
    stats: [["+1.3 pp", "vs single call · CI −3.9 to +6.6"], ["10 / 0", "own drafts fixed / broken"], ["$3.74", "the whole study"]],
    tools: ["Python", "Gemini API", "Icarus Verilog", "pytest", "bootstrap CIs"],
    links: [{ label: "GitHub ↗", href: "https://github.com/Funkey08/VeriSkeptic" }],
  },
  {
    slug: "lambda", title: "λ Lambda", flagship: true,
    status: { label: "in progress", tone: "prog" }, meta: "Oct 2026 – · solo",
    figure: { art: "lambda" },
    headline: "Does order-flow imbalance predict crypto prices once you pay for trading? Pre-registered, so a clean “no” counts.",
    desc: "A study of whether order-flow imbalance predicts mid-price moves seconds ahead, net of fees, spread, latency and queue position. The multi-venue L2 recorder is built and verified against the exchanges' own checksums. The walk-forward design, leakage tests and cost model were written down before looking at any data.",
    stats: [["1,342 / 1,342", "live checksums matched"], ["2", "venues · Coinbase, Kraken"], ["49", "tests passing"]],
    tools: ["Python", "asyncio", "websockets", "Polars", "pyarrow", "zstd", "mypy"],
    links: [{ label: "GitHub ↗", href: "https://github.com/Funkey08/Lambda" }],
  },
  {
    slug: "chis-mental-health", title: "Acculturation & adolescent mental health", flagship: true,
    status: { label: "under review · Epidemiol Psychiatr Sci", tone: "pub" }, meta: "Stanford · 2024 – 25 · first author",
    figure: { image: weightedOrs, fit: "contain" },
    headline: "Which factors predict serious distress in California's teenagers, and does it differ by race?",
    desc: "First-author analysis of the California Health Interview Survey: 4,366 adolescents, weighted to represent about 3.1 million. I pooled two survey cycles into a 160-replicate-weight design and fit survey-weighted logistic regressions across six nested specifications, with design-based tests and confidence intervals.",
    stats: [["4,366", "adolescents · ≈3.1M weighted"], ["1.97", "adjusted odds ratio, female vs male"], ["3", "posters"]],
    tools: ["R", "survey", "tidyverse", "ggplot2"],
    links: [{ label: "paper under review" }],
  },
  {
    slug: "epfl-decisions", title: "Decisions under effort and delay",
    status: { label: "3 papers in preparation", tone: "pub" }, meta: "EPFL · May – Aug 2025",
    figure: { image: epflFig, fit: "contain" },
    desc: "Mixed-effects logistic regression of 48,600 accept/reject decisions from 81 participants, part of the lab's work on agency and apathy (the figure tracks questionnaire scores as the agency condition switches). The full interaction model wouldn't converge, so I fixed it with sum-to-zero contrasts and a different optimizer, reproduced the lab's reference estimates, and showed the extra 40 parameters weren't worth it (likelihood-ratio p = 0.35).",
    tools: ["R", "lme4", "likelihood-ratio tests", "OLS"],
    links: [{ label: "papers in preparation" }],
  },
  {
    slug: "breast-cancer", title: "Breast-cancer histopathology",
    status: { label: "team · UTMIST", tone: "live" }, meta: "U of T · 2025",
    figure: { image: breast },
    desc: "Image models that classify breast-tissue biopsy tiles from BreakHis and RCL-7500 as benign or malignant. I built the histopathology pipeline (stain normalization, tiling, tissue filtering, patient-level splits), the vision-transformer baselines and the ensemble, which reached a test ROC-AUC of 0.98, and the integrated-gradient maps (right) that show what it looks at.",
    tools: ["Python", "PyTorch", "ViT", "ResNet-18", "integrated gradients"],
    links: [{ label: "private repo (UTMIST)" }],
  },
  {
    slug: "intact", title: "LLM extraction for underwriting",
    status: { label: "industry", tone: "live" }, meta: "Intact Financial · Jan – Apr 2026",
    figure: { art: "intact" },
    desc: "An async, parallel LLM pipeline that recovered a sparsely recorded underwriting variable from call transcripts and agent notes for 2,000+ clients, with keyword pre-filters to cut inference cost. The extracted features fed random-forest rankings of profitability drivers in Airflow pipelines that actuarial teams can reuse.",
    tools: ["Python", "OpenAI API", "asyncio", "SQL", "Databricks", "Snowflake", "Airflow"],
    links: [{ label: "proprietary · no public code" }],
  },
  {
    slug: "cvd-mortality", title: "Cardiovascular mortality in Asian American subgroups",
    status: { label: "published · AJPC 2026", tone: "pub" }, meta: "Stanford & Yale · co-author",
    figure: { image: cvd, fit: "contain", credit: "Fig. 2, Yang et al. 2026 · CC BY-NC-ND 4.0" },
    desc: "Age-standardized heart-disease and heart-failure death rates for six Asian American subgroups from U.S. death records, 2018–2022. Heart-failure deaths rose 11.6% a year among Vietnamese American women, while ischemic heart disease stayed flat in every group; a companion stroke paper is under review.",
    tools: ["R", "NVSS mortality data", "ACS denominators", "age standardization"],
    links: [{ label: "paper ↗", href: "https://doi.org/10.1016/j.ajpc.2026.101515" }],
  },
  {
    slug: "eeg-connectivity", title: "EEG connectivity pipeline",
    status: { label: "open source", tone: "live" }, meta: "Cove Neurosciences · 2024 – 25",
    figure: { image: topomap },
    desc: "An automated MNE-Python pipeline for resting-state EEG from depression patients and controls: artifact removal, source localization to 61 cortical regions, and connectivity features. Multivariate coupling features got 7 of 12 held-out subjects right versus 6 by chance, and 7 of the top 10 features were frontal–parietal.",
    tools: ["Python", "MNE-Python", "scikit-learn", "random forests"],
    links: [{ label: "GitHub ↗", href: "https://github.com/Funkey08/Automated-Connectivity-Neuroimaging-Analysis-Pipeline" }],
  },
  {
    slug: "betteryears", title: "BetterYears",
    status: { label: "hackathon", tone: "live" }, meta: "Sundai Hack (MIT / Harvard) · Oct 2026",
    figure: { image: betterYears },
    desc: "A Vision Pro physiotherapy app whose eight minigames turn reaction, balance, reach and memory into one “movement age”. I designed the scoring and built the Klemera–Doubal biological-age model, refit with robust Bayesian regression and adopted only when leave-one-out validation says it's no worse.",
    tools: ["Python", "Swift", "Bayesian regression", "Apple Vision Pro"],
    links: [{ label: "GitHub ↗", href: "https://github.com/hunterh37/SpatialHumanAssesment" }],
  },
  {
    slug: "vera", title: "Vera",
    status: { label: "venture", tone: "live" }, meta: "U of T Innovation Lab · Sep – Dec 2025",
    figure: { art: "vera" },
    desc: "A restaurant recommender that scores 4,628 Toronto restaurants against six taste archetypes and your likes, saves and visits, then returns a top five with reasons. One of eight ventures backed by the U of T Innovation Lab.",
    tools: ["Python", "FastAPI", "LangChain", "GCP Cloud Run", "Firestore", "Flutter"],
    links: [{ label: "private repo" }],
  },
  {
    slug: "transitive-inference", title: "Automated transitive-inference task",
    status: { label: "accepted · CAN", tone: "pub" }, meta: "Takehara Lab, U of T · 2023",
    figure: { image: tiRig },
    desc: "An operant task where mice learn a five-item hierarchy through nose-poke ports. I debugged and extended the Arduino control code and the data logging; the automated design ran 6.25 times more trials per session than the published manual one.",
    tools: ["C++ / Arduino", "Bonsai", "pyControl"],
    links: [{ label: "conference abstract" }],
  },
  {
    slug: "item-response-warehouse", title: "Item Response Warehouse",
    status: { label: "research data", tone: "live" }, meta: "Stanford SC² · 2025 – 26",
    figure: { metric: "~175k", caption: "item responses harmonized" },
    desc: "Ingestion pipelines that turn raw SPSS and CSV files from randomized trials into one person × item × response schema. The warehouse is the data layer others use to estimate item-level treatment effects.",
    tools: ["R", "haven", "tidyr"],
    links: [{ label: "used in published treatment-effect studies" }],
  },
  {
    slug: "bibliolinguist", title: "BiblioLinguist",
    status: { label: "team project", tone: "live" }, meta: "U of T",
    figure: { art: "biblio" },
    desc: "A Java language-learning app that turns real articles into AI-generated quizzes and scores how readable each article is. Built as a team, with everyone contributing equally.",
    tools: ["Java", "REST APIs", "OpenAI API"],
    links: [{ label: "private repo" }],
  },
];
