# Website Overhaul TODO

Stack: React + Vite + TypeScript + Tailwind, deployed to GitHub Pages at `/hi-im-franco/`.
Current sections (in `App.tsx`): NavLinks → Header → ImageCarousel(x2) → InstitutionGrid → AboutMe → ProjectShowcase → AwardsSection → Timeline → FavBooks → ContactSection → Footer.
Planning docs live in `docs/` (see `docs/README.md`). Copy drafts (Proud Of list, etc.): `docs/planning/CONTENT.md`.

Legend: 🐛 bug fix · 🧱 structure · ✨ new section · 🎨 visual · ✍️ copy · ⚙️ infra · 🖼️ asset hunting · 🥚 easter egg · ❓ open decision

**Order of work:** Phase 1 bugs (§0) → Phase 2 page map + routing (§A, §1, §8 routing) → Phase 3 content (§2, §3, §5, `docs/planning/CONTENT.md`, `docs/planning/CONTENT_AUDIT.md`) → Phase 4 visual design (§B, §4) → Phase 5 intro + easter eggs (§8, §9). Easter eggs go last on purpose. They only work once the site underneath them is solid.

## ✅ Current design (home page)
Prototype: **`docs/mockups/nixie_home.html`** (open in a browser). Full history of how we got here: `docs/planning/DECISIONS_LOG.md`.

- **Theme "Nixie Lab":** warm near-black `#0b0806`, nixie amber `#ffb35c` (glow `#ffd29a`), Work channel green `#7dffb0`. Film grain, vignette, dust in the tube light, graph paper lit by the tubes and the cursor. Fonts: Oswald (tubes, headings), JetBrains Mono (labels), Inter (body), Instrument Serif italic (slogan, "El Psy Kongroo.").
- **Hero:** FRANCO in six nixie tubes that power on one by one (this *is* the intro; no separate intro). Underneath: MIGUEL VALENCIA, then "data scientist · applied researcher · human being".
- **Readings (the name is an instrument):** MEASURE button / click the tubes / click a unit lamp. Tubes roll to a metric, the label names the quantity, a caption explains it, and FRANCO drops down to join MIGUEL VALENCIA. Metrics (all [V] in the FACT_SHEET): 48,600 decisions modelled (EPFL) · 4,366 adolescents (first-author) · 2.4M death records (mortality study) · 2,000+ client records (Intact) · 4,628 restaurants (Vera) · p = 0.002 (VeriSkeptic) · $3.74 total study cost (VeriSkeptic) · 1,342 checksums (Lambda) · 2,100 Duolingo days (❓ keep or move to Life). No GPA.
- **Slogan:** "I love experiencing things I know nothing about." types itself after power-on; "know nothing about" in amber.
- **Work vs Life:** "Click on a section to learn more about me." above two channel cards. Work = feed-forward net (strict layer-by-layer forward pass, green). Life = spiking biological neurons (causal cascades, refractory period, amber). Entering = tubes roll to WORK/LIFE → full-screen version of that animation → CRT power-on. Back = CRT power-off.
- **Recent experiments carousel:** slow 3D orbit, drag to spin (inertia), pauses only while hovering a card, click opens the case study. Cards = image + title + one line. Projects without a figure use generated on-theme art (Lambda, Intact, Vera) until real images exist.
- **Footer:** links, "Lab Mem 008", ASCII Kurisu (subdued colours) that prints in on scroll. Hover note: "This website was inspired by Steins;Gate." / "For making me realize that determination precedes intelligence." / *El Psy Kongroo.*
- **Cursor:** probe (amber dot + lagging ring; ring grows and labels MEASURE / READ / OPEN · DRAG / DRAG / WORK / LIFE). Faint page-coordinate readout top-left. Cursor-fit regression exists but is off (`SHOW_FIT = false`). Mouse/trackpad only.
- **Resume / GitHub / LinkedIn / email:** small links top-right and in the footer.
- **Accessibility:** tubes keyboard-operable, readout `aria-live`, ASCII `aria-hidden` with a real label, `prefers-reduced-motion` skips rolls/sweeps/typing.
- **Next:** design the Work and Life pages (currently stubs in the prototype).

---

## A. Page map (source of truth for layout)
Every existing component has a home here. If it isn't on this map, it's cut.

### `/` — Home: the 15-second pitch (see "Current design" above)
1. **Hero**: nixie-tube name (doubles as the intro) + MIGUEL VALENCIA + role line + readings panel + slogan
2. **Work / Life channel cards** → `/projects`, `/life`
3. **Recent experiments** carousel → click opens the case study
4. ❓ Proud Of teaser below the carousel, or keep Home this short?
5. **Contact** (D-Mail-styled form, ❓ placement) + footer (Lab Mem badge, Kurisu cameo)

Removed from Home (round 2): proof strip / stats (→ `/projects`), short About (→ `/life` or one line under the name), logos (→ `/projects`).

Cut from Home: both scrolling carousels (personal photos move to `/life`; academic figures get reused inside project cards), Timeline (moves to `/projects`), FavBooks (moves to `/life`), URSA talk block (becomes a Proud Of card, or one line in About).

### `/projects` — Work
1. Page header + GitHub profile button
2. **Credentials band** (moved from Home): 7 manuscripts (1 first author) · 5 conference presentations · $30k+ awards · 1 of 24 CARE fellows · institution logos
3. Track filter (quant / AI-infra & DS / ML-health). ❓ build in v1 or later
4. Tiered projects: flagships first (VeriSkeptic, λ Lambda, CHIS paper) as case studies → compact cards (Intact, EPFL, Cove EEG pipeline, Stanford mortality study, SC², Vera, BetterYears, Breast Cancer, Numerosity, BiblioLinguist, mouse TI task) → one-line archive
5. **Experience timeline** (moved from Home, rebuilt, see §0)
6. Publications & talks
7. Joker cameo

### `/life` — renamed from `/gallery`
"Gallery" undersells what goes here. This is the personal page.
1. Full **Proud Of** list
2. **Countries visited** map
3. **Photo gallery** (grid + lightbox, from `carousel/personal`)
4. **Favorite books** (`FavBooks`)
5. (optional) "Currently" section
6. Cameo ❓ TBD

### `404` — Persona 5 "All-Out Attack" page (see §9)

---

## B. Design coherence rules (the "non-anime-fan test")
These rules keep the site from looking chaotic and keep it readable for recruiters who don't know any of the references.

- [ ] 🎨 **One base design system: "Nixie Lab" (dark).** Amber is the site-wide accent (tubes, labels, ASCII cameos, D-Mail form, Lab Mem badge); green is reserved for the Work channel. Persona red/black appears **only** on the 404 page.
- [ ] 🎨 **Every reference must work without the reference.** For each easter egg, ask: "Would a recruiter who has never seen anime find this confusing or off-putting?" If yes, rework or cut it. A non-fan should read the intro as a stylish loading sequence, the cameo as a small piece of ASCII art, and the D-Mail form as a retro terminal contact form.
- [ ] 🎨 **Give curious people a way in.** Each cameo gets a small hover tooltip or caption (e.g. "Makise Kurisu, *Steins;Gate*"). Non-fans learn what it is, and fans get the nod.
- [ ] 🎨 **Motion budget.** The tube power-on plays on load; the channel animation + CRT power-on plays **only between pages**. Sections within a page get, at most, a simple fade.
- [ ] 🎨 **Professional content always comes first.** The top of every page is real content, never an easter egg. Easter eggs never block navigation or reading.
- [ ] 🎨 **Max one cameo per page**, small, below the fold.

---

## 0. Bugs to fix first (don't build on top of broken foundations)
- [ ] 🐛 **Images not rendering on load — likely root cause found:** `src/assets/carousel/personal` is **61 MB for 22 photos** (largest: `1.avif` at 8.9 MB), and the home page loads every carousel image eagerly, twice over for the loop. Fix: resize to display size (~800px wide, ~100–250 KB each), lazy-load, and move personal photos off Home (see §A). Whole `src/assets` folder is 74 MB. `face.JPG` (1 MB) and `ursa_talk.JPG` (1.2 MB) need compressing too. After the fix, re-check whether any rendering issue remains.
- [ ] 🐛 **Timeline animation** — rebuild as a clean static layout or a simple fade-in when it moves to `/projects`. Don't fix the old animation.
- [ ] 🐛 Carousel looping — may become moot if the carousels leave Home (see §A). Re-check only if a carousel survives.
- [ ] 🐛 Mobile responsiveness pass: nav, project cards, timeline, intro, cameos — test at 375px width.
- [ ] 🐛 Accessibility: alt text, color contrast (especially dim amber labels on near-black), keyboard nav / focus states, skip-to-content link.
- [ ] 🐛 Performance: Lighthouse audit after the image fix.
- [ ] 🐛 SEO/meta: `<title>`, meta description, Open Graph tags + preview image (for LinkedIn/Slack link previews), favicon check.

## 1. Information architecture / structure
- [ ] 🧱 Implement the page map in §A.
- [ ] 🧱 Clean, sticky nav: Home · Work · Life + always-visible Resume / GitHub / LinkedIn / Email icons. (Replaces the old "hyperlink area above Header" item.)
- [ ] 🧱 One-line thesis near the top. ❓ Wording TBD. Since you're exploring 3 tracks, a unifying thesis ("I turn messy data into decisions, from mental-health research to markets") beats a list of 3 job titles, which can read as undecided.
- [ ] 🧱 Spacing system (see §4) — replaces the old "make spacing overall cleaner" item.

## 2. New sections
- [ ] ✨ **Things I'm Most Proud Of** — draft list in `CONTENT.md`.
  - Format: card grid. Each card = one line + optional photo/icon + optional link.
  - Mix real accomplishments with deadpan funny ones on purpose. The joke works best when "Did full-time research at Stanford and NUS at the same time" sits next to "Got my driver's license." Lead with a strong real one.
  - Home shows ~6 cards, `/life` shows all of them.
  - Keep "many, many more, omitted to keep this website minimalist" as the closing line, with "Owning 5 student ID cards" after it as a post-credits gag (if that order was intentional).
- [ ] ✨ **Live Duolingo streak counter** (2100+ days). Duolingo has no official public API, and the unofficial one will likely be blocked by CORS from a browser. Simplest reliable option: store the streak start date and compute days since in the browser. Always correct while the streak lives, and you edit one date if it ever breaks. Fancier option: a daily GitHub Action that fetches the real number into a JSON file.
- [ ] ✨ **Countries visited map** on `/life`. An interactive SVG world map with visited countries highlighted; click or hover a country to see a photo from there. It's a small data-viz flex that fits a data scientist, and it ties the gallery together. ❓ Need your list of countries — the image you attached was the Kurisu image again, not the map.
- [ ] ✨ **Photo gallery** — grid + lightbox on `/life`, using the resized personal photos.
- [ ] ✨ (optional) "Currently" section — what you're reading / learning / building right now.
- [ ] ✨ (optional) Short testimonials from PIs or managers (Stanford CARE, Cove Neurosciences, EPFL).
- [ ] ✨ (optional, later) Blog / notes for technical write-ups (e.g. VeriSkeptic null-result reporting).

## 3. Portfolio / project section overhaul
- [ ] 🧱 One clean, prominent GitHub profile button at the top of `/projects`, plus a repo link on each project.
- [ ] ✍️ One-line *result/impact* per project card, not just tech-stack tags.
- [ ] 🧱 Track tags + filter (see §A).
- [ ] 🧱 Lead with λ Lambda (`quant_project`) and VeriSkeptic (currently not on the site at all). Lambda has no results yet: always label it "in progress", never show a number.
- [ ] 🧱 Link to live demos where they exist.
- [ ] 🧱 Reuse the academic carousel figures (`carousel/academic`, 17 images) as visuals inside the matching project cards instead of a separate scrolling strip.

## 4. Visual design overhaul
- [ ] 🎨 Base palette + type scale + spacing scale in Tailwind config, following the rules in §B.
- [ ] 🎨 Fewer emoji in headings; let personality show in the copy instead.
- [x] 🎨 ~~Dark/light mode toggle~~ → decided: dark only ("Nixie Lab"). Check contrast of the dim labels.

## 5. Copy pass
- [ ] ✍️ **Work through `docs/planning/CONTENT_AUDIT.md`** (full audit, Nov 3). It has 🔴 items (overstated or wrong claims: Cove tool tags and "thousands of patients", timeline years, Takehara wording, Numerosity stack, Apathy project, unverified "12+ awards") that must be fixed even if nothing else ships.
- [ ] ✍️ **Missing current status:** the site doesn't mention Harvard (SM Data Science), MIT cross-registration, or Intact anywhere. The timeline ends at UTMIST in 2025. Add a 2026 entry, update the logos, and update the hero/About.
- [ ] ✍️ "I have worked at" logo row includes UofT and NUS (study/exchange). Either relabel ("Where I've studied & worked") or split the row.
- [ ] ✍️ Shorten About to 3–4 sentences for Home. A longer version can live on `/life` if you want it.
- [ ] ✍️ Proofread the timeline once it's rebuilt.
- [ ] ✍️ Fact-check every claim against the FACT_SHEET (no overstated scope; see the known resume issues: Vera team size, SC2/Domingue Lab scope). Grep found no "full scholarship at EPFL" claim in the site source — good.
- [ ] ✍️ Fact-check the Proud Of list (flagged items in `docs/planning/CONTENT.md`).

## 6. Technical / infra
- [ ] ⚙️ **Contact form backend.** GitHub Pages is static, so the D-Mail form needs a form service (Formspree, Web3Forms, etc.) or it falls back to `mailto:`. Pick one before styling it.
- [ ] ⚙️ **Content as data.** Move projects, Proud Of items, countries, books and timeline entries into typed data files (e.g. `src/data/*.ts`) so updating content never means editing components.
- [ ] ⚙️ Remove dead code: `AltAwardSection.tsx` isn't imported anywhere.
- [ ] ⚙️ Resume PDF: visible link, and a reminder to replace it each time the resume changes.
- [ ] ⚙️ Lightweight analytics (e.g. Plausible / GA).
- [ ] ⚙️ robots.txt / sitemap.
- [ ] ⚙️ Image optimization in the build (`vite-imagetools` or a pre-commit script) so this 61 MB problem can't come back.
- [ ] ⚙️ Basic CI (lint + build) on push.

## 7. Asset hunting (screenshots / images needed)
- [ ] 🖼️ Connectivity Analysis Pipeline — pipeline diagram or key output plot.
- [ ] 🖼️ BiblioLinguist — real app screenshot.
- [ ] 🖼️ CHIS paper — cleaner figure or paper thumbnail + key finding.
- [ ] 🖼️ Numerosity Test — short demo GIF.
- [ ] 🖼️ Breast Cancer Detection — SHAP plot + results metric.
- [x] 🖼️ VeriSkeptic — `src/assets/projects/veriskeptic_pass_vs_attempts.png`.
- [ ] 🖼️ λ Lambda, Intact, Vera — real images to replace the generated cover art in the carousel.
- [ ] 🖼️ Proud Of photos/links (see `docs/planning/CONTENT.md`).
- [ ] 🖼️ One photo per visited country (for the map).
- [ ] 🖼️ Joker image (for the `/projects` cameo).

---

## 8. Creative direction (confirmed decisions)
- [x] 🎨 ~~**Entrance animation — "Worldline Boot" sequence.**~~ **Superseded:** the nixie tube power-on is the intro. Original plan kept for reference: Revised so it passes the non-anime-fan test:
  1. CRT terminal look — green monospace, scanlines. Text uses **plain words** a non-fan can read (e.g. "loading: research · data science · quant"). Only the visual style and one number are the Steins;Gate nod.
  2. Divergence-meter style number ticks and settles. This is the one wink for fans; to everyone else it just looks like a loading readout. ❌ Dropped "WORLDLINE: β → α" — too cryptic as the first thing a recruiter sees.
  3. CRT power-off collapse.
  4. Conway's Game of Life cells evolve into your initials (deterministic seed).
  5. Manga-panel wipe reveals the Hero.
  - Guardrails: ~2.5–3s total, "Skip →" visible from the first frame, disabled under `prefers-reduced-motion`, plays once per browser session (`localStorage` flag), and real content is never hidden for longer than that.
- [ ] 🎨 ❓ **Manga-panel wipe** — probably superseded by the channel transitions; decide when building `/projects` and `/life`. Earlier plan: use it only for page-to-page transitions (Home → Work → Life) and at the end of the intro. Not on every in-page section (see §B motion budget).
- [ ] 🧱 **Hybrid site structure** — confirmed, now detailed in §A (`/`, `/projects`, `/life`, 404).
- [ ] ⚙️ ❓ **Routing on GitHub Pages — decide before building routes.** `HashRouter` (zero config, `/#/projects` URLs) vs `BrowserRouter` + `404.html` redirect trick (clean URLs). Either way, also add a catch-all route in React Router that renders the P5 404 page. With `HashRouter`, GitHub's `404.html` never fires for in-app bad links.

## 9. Easter eggs (selected — keep all of these subtle)
Must pass the §B rules: the site reads as polished to someone who never notices any of these.

- [ ] 🥚 **Per-page coded character cameo**, rendered through code (ASCII / Analog Resolve / GoL / dithering), small, below the fold, with a hover caption:
  - `/` → Makise Kurisu, "El Psy Kongroo" pose (Steins;Gate)
  - `/projects` → Joker (Persona 5)
  - `/life` → ❓ TBD (Link, Professor Layton, something Three-Body)
  - ✅ Home cameo built in the prototype: `src/assets/easter-eggs/kurisu_ascii.json`, generated by `scripts/make_ascii.py` from `docs/source-art/kurisu_pose.png`.
  - Accessibility: ASCII art must be `aria-hidden` with a real text alternative. Otherwise screen readers read out hundreds of symbols.
  - Mobile: smaller or hidden on narrow screens. Never overlaps content.
  - Copyright: this is official character art. Fine for a personal non-commercial site in practice, and turning it into ASCII art makes it more your own work. Still, don't put it in OG preview images or anything that looks like branding.
- [x] 🥚 ~~**"Analog Resolve"**~~ → decided: plain ASCII that prints in row by row; no crossfade to the real image. Original idea — ASCII art that crossfades into the real image as the visitor scrolls to the bottom. Strong candidate for how all cameos render, so build it once as a reusable component.
- [ ] 🥚 **Lab Mem badge** — tiny footer line, e.g. "Future Gadget Lab Member 008".
- [ ] 🥚 **D-Mail contact form** — light retro-terminal styling on the real contact form. Needs a backend first (§6).
- [x] 🥚 **Custom cursor** — probe dot + lagging ring with target labels, built in the prototype. Falls back to the native cursor on touch devices. ❓ Keep the native caret over text inputs once the contact form exists.
- [ ] 🥚 **Persona 5 "All-Out Attack" 404 page** — the only place P5 red/black is used. Must include a clear "back to home" button.
- [ ] 🥚 **Logic/math mini-puzzle** — one real interactive puzzle with Layton-style "Puzzle #001" framing. ❓ Puzzle, placement and reward TBD.

Parked (not selected for now): Konami-code flash, console.log signature, Zelda chime, GoL Triforce, Three-Body gravity sim background, Layton puzzle-counter umbrella, Item Get! reveal, calling card, countdown timer, glitch flicker.

---

## Open decisions (❓ summary)
1. Routing: HashRouter vs BrowserRouter + 404 trick
2. Thesis line wording (mockup draft: "from mental-health research to market microstructure")
3. Track filter in v1 or later
4. Contact form service
5. `/life` cameo character
6. Mini-puzzle design
7. Countries list (re-send the map)
8. Which extracurriculars/editorial roles appear on the site (see `docs/planning/CONTENT_AUDIT.md`, "Found in your CV")
9. Awards: show the 10 named awards as a list? Reconcile "$20k+ USD" (Jan CV) vs "$30k+" (Nov resume)
10. Yale logo: include it (Yale Research Fund + co-affiliation on 2 papers)?
11. Duolingo reading: keep on Home or move to `/life`
12. Proud Of teaser on Home, or keep Home short

## Old items (carried over)
- [x] Multiple carousel parts
- [x] Carousel looping fixed (may be moot, see §0)
- [ ] Campus Biotech logo — decide during the logo-row update (§5)
- [x] ~~Conway's Game of Life in a footer/summary section~~ → superseded: GoL now lives in the intro (§8)
