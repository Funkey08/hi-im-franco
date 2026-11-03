# Outdated content audit (Nov 3, 2026)

> Earlier pass of the audit. Work from `CONTENT_AUDIT.md`; this file is kept for its section-by-section notes.

**Sources checked**
- Live site: every component in `src/components`. Last commit was 2025-12-15.
- Resume: `Resume & Application Documents/Resume Drafts - Agent Panel/FrancoMiguel_Valencia_Resume.pdf` (Nov 2, 2026)
- Fact sheet: `Resume Drafts - Agent Panel/OLD DRAFTS/00_FACT_SHEET.md` (last update Oct 28; tags claims as verified, user-confirmed, or forbidden)
- Repos: `quant_project` (= GitHub `Funkey08/Lambda`), `verilog_llm_agent` (= `Funkey08/VeriSkeptic`)
- Folders: Stanford CARE, Cove, LNCO, Domingue Lab, UTMIST, URSA, Asia trip planning, and the website's own planning docs

**Severity:** 🔴 wrong or overstated (fix no matter what) · 🟠 outdated or missing · 🟡 polish · ❓ needs your answer

---

## Header
- 🟠 The rotating roles ("biotech researcher", "software developer", "statistical analyst", "sci-fi enthusiast") reflect 2025. Your resume now targets quant research first, then data science.
- 🟠 The tagline "...useful for driving positive social change" isn't wrong, but it doesn't match the quant/DS positioning.
- 🟠 Harvard and MIT aren't mentioned anywhere on the site.

## "I have worked at" logo row
- 🟠 Missing: **Intact Financial** (Jan–Apr 2026), **Harvard**, **MIT**. (SC² falls under the existing Stanford logo.)
- 🟡 EPFL and Campus Biotech are the **same internship** (LNCO sits at Campus Biotech, Geneva), so two logos for one role.
- 🟡 UofT and NUS are partly study, not work. Relabel the row "Where I've studied & worked" or split it.
- ❓ NUS: your resume rule says no separate NUS entry, only a short clause. Do you want the NUS logo on the website?

## About section
- 🟠 Languages: missing TypeScript, Julia and C++; "JavaScript" should become TypeScript.
- 🟠 Tools: missing lme4, R survey, JuMP, LangChain, Databricks, Snowflake, Airflow, AWS, GCP and Docker.
- 🟠 Interests: missing **Karate (2x silver, 2x bronze international medalist, kata + kobudo)**, **Piano (RCM Level 9)**, photography and bouldering. The karate medals are some of your best Proud Of material and appear nowhere on the site.
- 🟠 The mission line ("improve human learning, health, business, and logistics") is 2025 framing.
- ❓ URSA caption: "largest student organizations in the country... URSA, the largest undergraduate research association in Canada" isn't in the fact sheet. Confirm before keeping it.

## Projects
| Project | Status | Issue |
|---|---|---|
| Automated Connectivity Analysis Pipeline (Cove) | 🔴 | Tool tags list **PyTorch and RNNs**. The fact sheet says random forests and gradient boosting. Add the honest result (7 of 12 held-out subjects classified correctly, chance = 6/12, directional only) and the open-source GitHub link. |
| BiblioLinguist | 🔴 ❓ | The fact sheet says it was dropped because the readability/quiz parts were **mostly teammates' work**. "Custom Flesch-Kincaid unsupervised learning algorithm" also overstates it (Flesch-Kincaid is a fixed formula, not a learned model). Typo: "Kinkaid". Recommend cutting it. |
| CHIS study | 🟠 | Says "in-progress paper". It's now **under peer review at JAACAP, first author**. The site's title ("...Risk Factors in Immigrants") doesn't match the manuscript ("Acculturation and Mental Health Challenges in California's Youth: A Cross-Racial Statistical Comparison Using CHIS"). Add n = 4,366 adolescents (weighted N ≈ 3.09M) and the survey-weighted methods. |
| Numerosity Test | ❓ | Claims AWS + **MySQL** + Electron. The fact sheet's EPFL apps used **PostgreSQL**, AWS S3/CloudFront and React/TypeScript (jsPsych). Is this one of the 6 EPFL apps? If so, fix the stack. |
| Interpretable Breast Cancer Detection (UTMIST) | ❓ | Not in the fact sheet, so none of the tags (R, LIME, MLPs, XGBoost, LightGBM) are verified. There are result images in the UTMIST folder. |
| Apathy Correlations | 🔴 | "Large patient datasets", "MySQL, scikit-learn, pandas" don't match the real work: **lme4 mixed-effects logistic regression on 48,600 decisions from 81 participants**, with convergence fixed despite near-separation and a result that reproduced the lab's reference estimates. The real version is a much stronger project, so rewrite it. |

🟠 **Missing from the site entirely:** VeriSkeptic · λ Lambda (in progress, no results yet, so it must say so) · BetterYears (Sundai Hack, MIT/Harvard) · Vera/Palate (1 of 8 U of T Innovation Lab ventures) · Intact LLM pipeline · Stanford SC² data pipelines · Stanford mortality study (2.4M death records) · Takehara mouse-task automation · the 6 EPFL experiment apps (~50k events).

⚠️ **Rules carried over from the fact sheet:**
- Intact: never name the confidential variable, make no accuracy or adoption claims, and keep "$300K" as *projected*.
- Lambda: no IC, R², Sharpe or PnL claims (none exist yet).
- Stanford: don't claim you ran the causal/heterogeneous-treatment-effect (HTE) models (you built the data pipelines, others ran the models).
- Anywhere: no A/B testing claims.

## Stats band ("What I've Got")
- ❓ "12+ awards": the resume names 7 plus "others". Confirm the count.
- ✅ "$30k+" matches the resume.
- 🟡 "4 Countries and Institutions Recognized" is vague. Swap it for "7 manuscripts · 5 conference presentations" (your resume's own summary line).

## Timeline
- 🔴 **2022 "Where it began (feat. mice)":** per the fact sheet, the Takehara lab was **May 2023 – Jan 2024**. "Engineered an automated transitive inference paradigm" and "MATLAB" are both on the forbidden list (the hardware design came from the PI/pyControl, and there was no MATLAB analysis). What you verifiably did: debugged and extended the Arduino control code and expanded it from 1 to 5 choice ports. Real result: **6.25× more trials per session** than the published manual design.
- 🔴 **2023 Stanford + NUS:** CARE started **Apr 2024**, and NUS was **May–Aug 2024**. Both belong under 2024. ❓ "Joinpoint regression" isn't in the fact sheet. Confirm it's accurate.
- 🔴 **2024 Cove:** "processing thousands of patients in one go" is overstated (67-channel recordings, 12-subject held-out test set). "Cognitive disorders" should be **depression** (resting-state EEG).
- 🟠 **2025 "EPFL Biotech":** the correct name is EPFL Laboratory of Cognitive Neuroscience (LNCO), Campus Biotech, Geneva.
- 🟠 **Final entry** (UTMIST + "building this website") is stale. Missing:
  - Stanford SC² (Aug 2025 – Apr 2026)
  - Vera (Sep–Dec 2025)
  - Intact (Jan–Apr 2026)
  - U of T graduation (Jun 2026, GPA 3.94, High Distinction)
  - Harvard SM + MIT cross-enrollment (Fall 2026)
  - VeriSkeptic and Lambda (Oct 2026)
  - BetterYears (Oct 2026)

## Proud Of list (`CONTENT.md`)
- ✅ Time difference resolved: the fact sheet says **15 hours** (Stanford/NUS overlap, May–Aug 2024). Updated in `CONTENT.md`.
- 🟠 Add candidates from the fact sheet: karate medals; Piano RCM Level 9; 1 of 24 global CARE fellows; a speaker at ACC.25 in Chicago (photos exist in `Stanford CARE Stuff/ACC Chicago Stuff/Photos from ACC!`); 7 manuscripts.

## Meta / misc
- 🟡 `<title>` is "Hi, I'm Franco!". There's no meta description and no Open Graph (link preview) tags.
- 🟡 No resume link anywhere on the site.
- 🟡 The footer lists the tech stack. Keep it accurate after the rebuild.
- ✅ Contact links (GitHub `Funkey08`, LinkedIn, Gmail) match the resume. The resume header also links "Personal Website", so this site *is* on every resume you send.

---

## Image candidates found (for TODO §7)
- **VeriSkeptic:** `verilog_llm_agent/results/pass_vs_attempts.png`, `verilog_llm_agent/assets/social-preview.png`
- **Lambda:** no figures yet (no results). Use the architecture section of the README as a diagram, or a screenshot of the live order-book recorder.
- **Talks:** `Stanford CARE Stuff/ACC Chicago Stuff/Photos from ACC!/` (many photos)
- **Cove:** `Cove Neurosciences Stuff/Cove Team.png` (team photo; get permission before posting others' faces)
- **UTMIST:** `UTMIST Breast Cancer Detection Stuff/ensemble model comparison summary.png` and `ensemble model CV comparison summary.png`
- **Domingue Lab plots:** not yours to show (others' analyses). Skip.
- **Countries (inferred):** the 2026 Asia trip folder shows Japan, Taiwan, Philippines, Thailand and Vietnam. Plus Canada, the US, Switzerland, Singapore and South Korea from your history. Possibly Italy and Greece (a Rome flight document in the EPFL folder; an ASSC poster in Crete). Needs your confirmation.
