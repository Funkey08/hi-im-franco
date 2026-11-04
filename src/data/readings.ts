/**
 * What the nixie tubes can "measure". Index 0 is the resting state (the name).
 * Rules: real work metrics only, every value tagged [V] in the FACT_SHEET, no grades.
 * `value` is what the tubes show (max 6 characters; "." lights the previous tube's decimal point).
 */
export interface Reading {
  value: string;
  /** Short lamp label beside the tubes. */
  unit: string;
  /** Panel heading: the quantity being measured. */
  label: string;
  caption: string;
  numeric: boolean;
}

export const READINGS: Reading[] = [
  { value: "FRANCO", unit: "Name", label: "Name", caption: "", numeric: false },
  { value: "48600", unit: "Decisions", label: "Decisions modelled", numeric: true,
    caption: "Human accept/reject choices I fit with mixed-effects logistic regression at EPFL." },
  { value: "4366", unit: "Adolescents", label: "Adolescents studied", numeric: true,
    caption: "Respondents in my first-author, survey-weighted mental-health study (Stanford, under review)." },
  { value: "2.4M", unit: "Records", label: "Death records analysed", numeric: true,
    caption: "U.S. death records in a co-authored cardiovascular and stroke mortality study (Stanford)." },
  { value: "2000", unit: "Clients", label: "Client records parsed", numeric: true,
    caption: "2,000+ client histories my async LLM pipeline read at Intact Financial." },
  { value: "4628", unit: "Restaurants", label: "Restaurants ranked", numeric: true,
    caption: "Toronto restaurants scored by the LLM ranking agent in Vera (U of T Innovation Lab)." },
  { value: "0.002", unit: "p-value", label: "p-value", numeric: true,
    caption: "My LLM agent fixed 10 of its own drafts and broke none (exact McNemar test). VeriSkeptic." },
  { value: "3.74", unit: "USD", label: "Total study cost (USD)", numeric: true,
    caption: "What the entire 152-problem VeriSkeptic benchmark cost to run in API calls." },
  { value: "1342", unit: "Checksums", label: "Checksums matched", numeric: true,
    caption: "Live order-book checksums verified: 1,342 of 1,342. λ Lambda, in progress." },
  { value: "2100", unit: "Days", label: "Day streak", numeric: true,
    caption: "Consecutive days of Duolingo, and counting." },
];
