# docs/

Planning material for the 2026 site overhaul. Nothing in here ships with the site (Vite only bundles `src/`).

| Path | What it is |
|---|---|
| `mockups/nixie_home.html` | Prototype the React home page was built from (Nixie Lab theme; the React version in `src/` is now the reference). Open it directly in a browser. It reads images from `../../src/assets/`, so keep the folder layout intact. |
| `mockups/life_wireframes.html` | Life page wireframes: three layouts (tabs A field notebook / B atlas / C the desk), real copy and photos (small previews in `mockups/life-previews/`), plus open questions. |
| `mockups/work_wireframes.html` | Work page wireframe the React page was built from (the React version in `src/pages/work/` is now the reference). |
| `mockups/archive/` | Earlier explorations, kept for reference: wireframes, the green "The Lab" theme, the four hero concepts, the Worldline intro storyboard, the easter-egg brainstorm. Superseded by `nixie_home.html`. |
| `planning/DECISIONS_LOG.md` | Every design decision, round by round, in order. `TODO.md` holds only the current state. |
| `planning/CONTENT.md` | Copy drafts (the "Proud Of" list) with fact-check flags. |
| `planning/CONTENT_AUDIT.md` | Audit of outdated or overstated claims on the live site, checked against the FACT_SHEET. |
| `planning/OUTDATED_CONTENT.md` | An earlier, shorter pass of the same audit. Kept for its section-by-section notes; `CONTENT_AUDIT.md` is the one to work from. |
| `source-art/` | Full-resolution source images that aren't loaded by the site: `franco_pose.png`, which the ASCII art is generated from. |

`scripts/make_ascii.py` (repo root) regenerates `src/assets/ascii/*.json` from `docs/source-art/`.
