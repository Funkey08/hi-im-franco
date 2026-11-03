# Outdated & inaccurate content audit (Nov 3, 2026)

Sources compared against the live site:
- `Resume Drafts - Agent Panel/OLD DRAFTS/00_FACT_SHEET.md` (ground truth, last updated Oct 28)
- `Resume Drafts - Agent Panel/FrancoMiguel_Valencia_Resume.pdf` (newest resume, Nov 2)
- GitHub profile `Funkey08` (25 repos)
- `Coding Projects for Fun/` (quant_project = Lambda, verilog_llm_agent = VeriSkeptic)
- Older drafts in this folder (`personal website summary.docx`, `text for website timeline.docx`)

Severity: 🔴 wrong or overstated (a recruiter could catch it) · 🟠 outdated · 🟡 missing · ⚪ minor / style
Items marked ❓ need your answer. See the questions in chat.

---

## Hero (`Header.tsx`)
| | Site says | Reality | Action |
|---|---|---|---|
| 🟠 | Rotating roles: data scientist, statistical analyst, software developer, **biotech researcher**, sci-fi enthusiast | Resume now leads with quant research / data science (Harvard SM, Intact DS, Lambda, VeriSkeptic) | ❓ Rewrite around your current positioning |
| 🟠 | "...making data interpretable, accessible, and useful for driving positive **social change**" | Doesn't match the quant-first direction, but it fits the health research | ❓ Keep, blend, or replace |
| 🟡 | No mention of Harvard or MIT anywhere on the site | Harvard SM Data Science, MIT cross-enrolled, Dec 2027 | Add to hero and proof strip |
| ⚪ | Portrait `face.JPG` (Jul 2025) | — | ❓ Still the photo you want? |

## "I have worked at" logos (`InstitutionGrid.tsx`)
| | Site says | Reality | Action |
|---|---|---|---|
| 🟡 | UofT, Stanford, EPFL, Campus Biotech, NUS, Cove | Missing **Harvard, MIT, Intact**. Yale was a collaborator on the Stanford papers | Add logos |
| 🔴 | Heading says "worked at" | UofT is where you studied (and Harvard/MIT will be too) | Relabel ("Where I've studied, worked and researched") or split the row |
| ⚪ | EPFL **and** Campus Biotech as separate logos | Same job: LNCO is EPFL's lab at Campus Biotech, Geneva | Keep one (EPFL) |
| ⚪ | NUS | The resume rules say "no NUS entry" (resume space). On the website, a logo is fine since you did research there | ❓ keep? |

## Stats (`AwardSection.tsx`)
| | Site says | Reality | Action |
|---|---|---|---|
| 🔴 | "12+ Awards and Scholarships" | The fact sheet names 7 awards "+ others", and the unused `AltAwardSection.tsx` lists 9. "12+" isn't verified anywhere | ❓ Confirm count, or switch stats |
| ✅ | "$30k+ grants and awards funding" | Matches the fact sheet | Keep |
| ⚪ | "4 Countries and Institutions Recognized" | Vague. What's being counted? | Replace with something verifiable |
| 🟡 | — | Strong, verified stats that are missing: **7 manuscripts (1 first author), 5 conference presentations, 1 of 24 global Stanford CARE fellows** | Use these instead |

## About Me (`AboutMe.tsx`)
| | Site says | Reality | Action |
|---|---|---|---|
| 🟠 | Skills: Python, R, Java, SQL, JavaScript, MATLAB; Scikit-learn, Pandas, NumPy, PyTorch, Dplyr, Seaborn; React, Vite, Tailwind, Tableau | Resume adds TypeScript, Julia, C++, lme4, R survey, JuMP, LangChain, Databricks, Snowflake, Airflow, AWS, GCP, Docker | Update, or drop the list from About entirely and let the projects show it |
| 🟡 | Hobbies: sci-fi, anime, jRPGs, piano, guitar, digital art, walks | Missing: **Karate (2x silver, 2x bronze international medalist, kata + kobudo)**, **Piano Level 9 RCM**, bouldering, photography | Add. The karate medals should also be a Proud Of card |
| ⚪ | URSA: "some of the largest student organizations in the country, including URSA, the largest undergraduate research association in Canada" | Not in the fact sheet | ❓ Confirm wording |
| ⚪ | "Thanks for coming to see me on my way!" tone | — | Rewrite in the copy pass |

## Projects (`ProjectShowcase.tsx`)
No project has a GitHub or paper link.

| | Project | Problem | Action |
|---|---|---|---|
| 🔴 | Automated Connectivity Pipeline | Tags include **PyTorch, RNNs**. The fact sheet says random forests + gradient boosting; no RNN is verified | Fix tags, add repo link (it exists: `Automated-Connectivity-Neuroimaging-Analysis-Pipeline`), add the real result (7/12 held-out vs chance 6/12, directional) |
| 🔴 | BiblioLinguist | Fact sheet: "dropped; its readability-quiz parts were mostly teammates' work. Do not re-add without asking." The site also calls Flesch-Kincaid (misspelled "Kinkaid") an "unsupervised learning algorithm" — it's a readability formula | ❓ Drop, or reword with honest scope |
| 🟠 | CHIS study | Says "in-progress paper". Now **under peer review at JAACAP** (first author), presented at NCPS, AACAP and PRCP/WACP (Tokyo). Site title ("...Risk Factors in Immigrants") doesn't match the paper title ("Acculturation and Mental Health Challenges in California's Youth") | Update status, title and venues |
| 🔴 | Numerosity Test | Says AWS + **MySQL**. The fact sheet says the EPFL apps used **PostgreSQL** | ❓ Is this one of the 6 EPFL apps? Fix the stack |
| ⚪ | Interpretable Breast Cancer Detection | Not in the fact sheet, so nothing to verify the claimed stack (XGBoost, LightGBM, MLPs, SHAP, LIME) against | ❓ Keep? Repo/status? |
| 🟠 | Apathy correlations | "Large patient datasets", stack "R, MySQL, scikit-learn". Real EPFL work: 48,600 decisions from 81 participants, mixed-effects logistic regression (lme4), OLS N = 77 | Rewrite with the real (much stronger) numbers, or merge into an EPFL case study |
| 🟡 | **Missing: VeriSkeptic** | Your strongest public project, with real results (86.2% → 87.5%, McNemar p = 0.002, honest null vs. single call) | Add as a flagship |
| 🟡 | **Missing: λ Lambda** | In progress: L2 recorder built (1,342/1,342 checksums), pre-registered spec. **No results yet**, so present it as "in progress", never with numbers | Add as a flagship |
| 🟡 | **Missing: Intact** | LLM extraction pipeline + life-event detector, projected $300K | Add as experience (no confidential variable name, "projected" wording) |
| 🟡 | Missing: BetterYears (Sundai Hack, Vision Pro), Vera/Palate (1 of 8 U of T Innovation Lab ventures), Stanford mortality study (ACC.25 talk), SC² Item Response Warehouse, Takehara transitive-inference task (accepted at CAN) | ❓ Which to add |
| 🟡 | Missing fun projects: **Anime-Disser** ("AI that watches your gameplay and roasts you") and others on GitHub | Perfect for a "Just for fun" strip, and it fits the personality angle | ❓ Include? |

## Timeline (`TimelineBio.tsx`)
| | Site says | Reality | Action |
|---|---|---|---|
| 🔴 | **2022**: transitive inference lab in first year | Fact sheet: Takehara Lab **May 2023 – Jan 2024** (ROP course, summer 2023) | ❓ Which year is right? |
| 🔴 | Transitive inference: "engineered... with Arduino, **MATLAB**, and Bonsai" | Fact sheet forbids "MATLAB analysis" and "designed the hardware". Verified: debugged and extended the Arduino code, 1 → 5 choice ports, annotated the Bonsai logging. Result: 6.25× more trials per session | Reword |
| 🔴 | **2023**: Stanford Medicine + NUS | Fact sheet: CARE **Apr 2024 – Aug 2025**, NUS **May – Aug 2024**. But `AltAwardSection` lists "Yale Research Fund 2022–2024" | ❓ When did the Stanford work actually start? |
| 🔴 | **2024** Cove: "R&D Data Scientist **and Software Engineer**", "biomarkers for **cognitive disorders**", "processing **thousands of patients** in one go" | Title is "R&D Data Science & Software Engineering **Intern**". The disorder was **depression**. "Thousands of patients" isn't supported (the held-out test set was 12 subjects) | Fix all three. This is the most dangerous line on the site |
| 🟠 | **2025** "EPFL Biotech" | Not a real name: it's EPFL's Laboratory of Cognitive Neuroscience (LNCO) at Campus Biotech, Geneva | Fix the name |
| 🟠 | "infinity and beyond": UTMIST, LLMs, building this website | Stale. Now: U of T grad Jun 2026, Intact Jan–Apr 2026, Stanford SC² to Apr 2026, Harvard + MIT from Fall 2026, VeriSkeptic and Lambda | Add 2025–2026 entries; rewrite the ending |
| 🟡 | — | Missing: Vera (Sep–Dec 2025), publications (7 manuscripts), ACC.25 talk | Add where relevant |

## Favorite books (`FavBooks.tsx`)
| ⚪ | Kafka on the Shore, Three-Body, LOTR, Dune, Exhalation | ❓ Still your top 5? |

## Contact / footer / meta
| | Item | Action |
|---|---|---|
| 🟡 | No resume link anywhere | Add (use `FrancoMiguel_Valencia_Resume.pdf`) |
| ✅ | GitHub `Funkey08`, LinkedIn, Gmail links | Correct, keep |
| ⚪ | Footer "built with React, TypeScript, Tailwind, Framer Motion" | Update after the rebuild |
| ⚪ | `<title>Hi, I'm Franco!</title>`; no meta description / OG tags | Add (TODO §0) |
| ⚪ | Nav labels: "📷 Cool Pics", "🙃 About Me", "💻 Things I've Done", ... | Replaced by the new nav (Home / Work / Life) |

## Not used on the site, but useful
- `AltAwardSection.tsx` has a 9-item award list with years (EPFL, Stanford Chi-Li Pao, UofT CS Engagement, Yale Research Fund, Eric Jackman, UofT Research Exchange, ASSU, UTSU, Trinity). Could become a compact awards list on `/projects` or `/life`. Check that the years are right first.
- The publications list (7 manuscripts) isn't on the site at all. ❓ Add a "Publications & talks" block on `/projects`?

---

## Resolved (Nov 3)
- Timeline dates: **fact sheet is right**. Takehara May 2023 – Jan 2024 (not 2022); Stanford CARE from Apr 2024 and NUS May – Aug 2024 (not 2023).
- BiblioLinguist: **keep**, as a team project with equal contribution. The fact sheet is corrected. Still fix "unsupervised learning algorithm" and the "Kinkaid" typo.
- Projects: keep all, tiered.
- NUS: keep. Include all institutions.
- URSA line: confirmed true (it's the largest undergraduate research association in Canada).
- Books: unchanged, but they move to an editable data file.
- Awards count: the Jan 2026 grad-school CV names **10 awards** (EPFL Excellence Research Internship Award, Stanford Chi-Li Pao Foundation Award, Yale Research Fund, U of T CS Engagement Award, Eric Jackman Scholarship, U of T Research Exchange Award, ASSU Conference Grant, U of T DCS Academic Grant, UTSU Academic Pursuits Award, Trinity Experiential Learning Award). So say **"10+ awards"**, not "12+". ❓ That CV says **$20k+ USD**; the Nov resume and fact sheet say **$30k+**. Possibly currency (CAD vs USD) or newer awards. Pick one and label the currency.

## Why the site is wrong: it was written from the older CV
The grad-school CV (`GRAD SCHOOL STUFF/FrancoMiguel_Valencia_CV.pdf`, Jan 2026) contains most of the claims your Oct 2026 fact-sheet audit later marked forbidden: MATLAB / "~300%" / "300+ hours" at Takehara, Gaussian processes + TD learning + MySQL at EPFL, RNNs at Cove, multi-agent + A/B testing at Vera, "97% AUC" on breast cancer. The website copy came from that era. **For every line on the new site, the fact sheet wins.** The breast-cancer project in particular: the CV claims CNNs, ViTs and 97% AUC, and none of that is in the fact sheet. ❓ Do you have the repo or report so we can verify what to say?

## Found in your CV but not on the site (❓ which to include)
Good material for `/life`, an "Also" block, or Proud Of cards:
- **UTMIST** ML Research Engineer (Jul 2025 –), led the vision-analysis sub-team
- **Parkinson Canada**, Research Methods & Evidence Analyst (Sep – Dec 2025)
- **Science Rendezvous National Hackathon**, Head of Mentoring & Judging (managed 20+ judges, mentored 40+ finalists)
- **The Neurogenesis Project**, founding member (100+ members in year one)
- **HOSA** chapter president
- **"A Cup of Life Lessons" YouTube channel** (neuroscience, psychology, philosophy) — a fun Proud Of card
- **Editorial**: Editor-in-Chief, Juxtaposition Global Health Magazine; Managing Editor (Sciences), The Arbor Journal; Senior Editor, JULS; Associate Editor, Mentis
- **NUS Ong Lab**: glioblastoma wet-lab + ImageJ/Python image-analysis pipelines (the site mentions NUS but not what you did there)
- The "~2% acceptance rate" for the EPFL Excellence program — ❓ verify before using; it's not in the fact sheet

## Keep the fact sheet's forbidden list out of the website
Never put these on the site: any Lambda result/IC/Sharpe, Intact accuracy or adoption claims, the confidential Intact variable name, "multi-agent", A/B testing, Cove "95% accuracy" / "integrated into workflow", CHIS as "predictive", running HTE models yourself at SC², TD learning at EPFL, VeriSkeptic "pass@5 baseline" / "4-mode ablation".
