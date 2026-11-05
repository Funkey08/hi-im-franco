# Design decisions log

Every design round of the Nov 2026 overhaul, oldest first. Later rounds override earlier ones where they conflict.
The current state is summarised in `TODO.md` → "Current design (home page)". Prototype: `docs/mockups/nixie_home.html`.

## Round 1 · Nov 3, 2026
- **Theme: "The Lab" (dark only).** The site is your lab: Home = terminal, Work = experiment write-ups, Proud Of = achievement log, Life = field notes. Dark background, terminal-green accent (`#57e389`), Inter for text, JetBrains Mono for labels and code. Reference mockup: `docs/mockups/archive/theme_mockup.html`. No light-mode toggle.
- **Layouts (proposed, as shown in the mockup):** Home B (terminal hero), Work A (case-study list), Proud Of B (achievements unlocked), Life B (scrapbook). Wireframes: `docs/mockups/archive/wireframes_v2.html`.
- **Positioning:** "Data scientist & quantitative researcher", with health research as part of the story. Matches the resume.
- **Dates:** the FACT_SHEET is right. Takehara Lab May 2023 – Jan 2024; Stanford CARE Apr 2024 (with SC² to Apr 2026); NUS May – Aug 2024. The site's 2022/2023 dates are wrong.
- **Projects:** include all of them, in tiers: flagships (VeriSkeptic, λ Lambda, CHIS paper) → compact cards → one-line archive.
- **Institutions:** include all (NUS stays). Relabel the row so it covers studying, working and research.
- **BiblioLinguist:** team project, equal contribution (FACT_SHEET corrected).
- **Books:** same 5 for now; must be easy to edit/add (data file, §6).
- **URSA line:** confirmed accurate (URSA is the largest in Canada).

## Round 2 · Nov 3, 2026
- The first mockup read as generic / "vibe-coded". New direction: **the hero itself is the signature** — a huge name built by a live, interactive quantitative animation. Much less text.
- **Home first screen = name + one role line + 4 links + orbiting work carousel. Nothing else.** No stats, no paragraphs.
- **Metrics move to `/projects` (Work):** 7 manuscripts, 5 conference presentations, $30k+ awards, 1 of 24 CARE fellows, publications list.
- **Featured work = slow 3D orbiting carousel** (pause on hover, click opens case study, swipe row on mobile), replacing the single featured card.
- **Hero concepts prototyped** in `docs/mockups/archive/hero_concepts.html` (all working, interactive): 1 Fit (particles trained into the name, live loss), 2 Descent (SGD with momentum over a loss surface, click to drop particles), 3 Life (name inside Conway's Game of Life), 4 Nixie (name in glowing nixie tubes, divergence-meter roll). ❓ Pick one.
- **Cursor options prototyped** (same file): A reticle + coordinates, B regression trail with live r, C terminal block, D sophon. ❓ Pick one.
- ❓ **Does the separate intro animation survive?** If the hero is already animated (esp. Fit or Life), a 3-second CRT intro before it becomes redundant. Options: drop it, shrink it to a ~1s CRT flicker that hands off to the hero, or keep it as the hero's first act.

## Round 3 · Nov 3, 2026
Prototype: **`docs/mockups/nixie_home.html`** (working: home, measurements, channel transitions, Work and Life stubs).
- **Theme: "Nixie Lab"** (replaces green "The Lab"). Warm near-black, nixie amber (`#ffb35c` / glow `#ffd29a`) as the main accent, film grain, vignette, dust drifting in the tube light, glass reflections, engraved mono labels, a red Dymo label. Fonts: Oswald (tube glyphs, big headings), JetBrains Mono (labels), Inter (body).
- **Section colours as phosphor channels:** Work = CH 1, green oscilloscope phosphor (`#7dffb0`). Life = CH 2, amber. Each section keeps its channel colour on its own page.
- **Hero = the name in six nixie tubes**, ~136px wide on desktop. **The tubes are the intro:** they power on one at a time and roll into FRANCO (~1.5s). ✅ The separate 3s "Worldline Boot" intro is dropped; the CRT/divergence ideas live on as the tube roll and the channel sweeps.
- **The name is a measuring instrument:** click the tubes (or the readout plate) to "take a measurement". The tubes roll to a verified number with a caption, cycling back to FRANCO after the last one: GPA 3.94 · 48,600 decisions modelled (EPFL) · 4,366 adolescents (first-author study) · p = 0.002 (VeriSkeptic self-repair) · 1,342/1,342 checksums (Lambda) · 2,100 Duolingo days. Readings live in one data array; every value must trace to the FACT_SHEET.
- **Role line:** "data scientist · applied researcher".
- **Slogan:** "I love experiencing things I know nothing about." on a Dymo label under the name, repeated as the Life page header. The Life channel is framed as a *random walk* to match it.
- **Work / Life = two oscilloscope "channel" buttons** with live traces (Work: noisy data with a fitted signal; Life: a random walk). Hover lights them in their channel colour.
- **Section transition:** tubes roll to WORK/LIFE → full-screen oscilloscope sweep draws that channel's waveform (~1s) → flash → page powers on like a CRT. Back = CRT power-off, then the tubes roll back to FRANCO.
- **Resume / GitHub / LinkedIn / email:** small links top-right and in the footer.
- **Below the fold on Home:** "recent experiments" orbit carousel (restyled warm), then footer with Lab Mem 008.
- Credentials on Work are shown as mini nixie counters (7 · 5 · 30K · 24).
- Accessibility kept: tubes are keyboard-operable (Enter/Space), readout is `aria-live`, reduced-motion skips rolls/sweeps.

## Round 4 · Nov 3, 2026
Prototype updated in place (`nixie_home.html`; round-3 backup since deleted).
- **Readings are now a front-panel instrument:** a big MEASURE button (pulses until first use), a lit unit column beside the tubes (NAME / GPA / DECISIONS / PEOPLE / P-VALUE / CHECKSUMS / DAYS, each clickable), progress pips, a status LED, and a larger typed caption.
- **Slogan:** the Dymo label now *prints itself* letter by letter after the tubes power on, bigger and centred.
- **Work vs Life = artificial vs real neurons.** Work card: a feed-forward net doing forward passes + a faint backprop wave (green). Life card: branching biological neurons firing action potentials along curved axons (amber). Transitions: full-screen forward pass (Work) / a wave of action potentials crossing the screen (Life). Same visuals as banners on each sub-page.
- **Carousel cards:** no "Chapter", no status/source/date header. Each card = photo (tinted amber, full colour on hover) + title + one line. Missing photos for now: λ Lambda, Intact, Vera.
- **Kurisu (bottom-right of Home):** amber/colour ASCII version types itself in when you scroll to the footer; hover/focus cross-fades to the real art with a small caption. Assets: `kurisu_pose.png` (clean pixel-art source, user-supplied), `kurisu_pose_web.webp` (534px, 90 KB, rendered pixelated), `kurisu_ascii.json` (64 cols, colour runs). Old Okabe-cutout versions deleted.
- **Name:** MIGUEL VALENCIA sits directly under the tubes in large Oswald. When the tubes leave FRANCO (any reading, or WORK/LIFE), the letters F-R-A-N-C-O drop in one by one and join it as FRANCO MIGUEL VALENCIA; they leave again when the tubes return to FRANCO.

## Round 5 · Nov 3, 2026
- **Slogan** is plain sentence-case text (Inter, ~27px), typed with a caret after power-on; "know nothing about" in amber. No Dymo label anywhere.
- **Firing is causal/ordered.** Work net: strict forward pass, one layer at a time left to right; nodes light only when pulses arrive; the path taken stays lit; pause, fade, next pass. Life neurons: one neuron starts a wave, spikes travel along axons, a neuron fires only when a spike reaches it; refractory period so waves die out before the next starts.
- **Kurisu:** new clean flat-colour art (`kurisu_pose.png` + `kurisu_pose_web.webp`, 520px, 69 KB), shown as-is bottom-right. Hover/focus pops the caption instantly; no fades. ASCII version retired.

## Round 6 · Nov 3, 2026
- **Kurisu is ASCII again** (66 cols, colour runs, generated from the new flat art; prints row by row on reaching the footer). Hover/focus pops a "// lab note" bubble (spring scale-in) that types: "This website was inspired by Steins;Gate. It made me realize that determination precedes intelligence." + "El Psy Kongroo."
- **Slogan font:** Instrument Serif italic, ~42px; "know nothing about" in amber.
- **Role line:** data scientist · applied researcher · human being.
- **More breathing room** on the bench (bigger gaps between tubes / name / meter / role / slogan / channels).
- **Light:** faint graph-paper grid revealed by a soft light around the cursor and under the tubes; dust motes lit by tubes and cursor, and motes near the cursor link up with thin lines (a live graph). Each MEASURE press flares the tube glow.
- **Carousel:** header is just "// recent experiments" (scroll cue is a bobbing arrow); slower orbit; cards 330×300 on a tighter ring; pauses only while the cursor is on a card. Projects without a figure get generated on-theme cover art (Lambda: order-book depth chart, Intact: documents → extracted fields, Vera: city grid with ranked pins); swap for real images when available.

## Round 7 · Nov 3, 2026
- **Kurisu message** (exact, italic Instrument Serif, plain text to her left, no bubble; two lines slide in on hover): "This website was inspired by Steins;Gate." / "For making me realize that determination precedes intelligence."
- **Role line** sits directly under the name. **Prompt** above the channels: "Click on a section to learn more about me."
- **Readings = real work metrics only** (GPA removed). Label shows the quantity, not "Reading 0X". Order: 48,600 decisions modelled (EPFL) · 4,366 adolescents (first-author) · 2.4M death records (mortality study) · 2,000+ client records (Intact) · 4,628 restaurants (Vera) · p = 0.002 (VeriSkeptic) · $3.74 total study cost (VeriSkeptic) · 1,342 checksums (Lambda) · 2,100 Duolingo days (❓ keep or move to Life). All [V] in the FACT_SHEET.
- **Carousel is draggable** (mouse/touch, with inertia); a drag never triggers a card click; auto-rotation resumes after.
- ❓ Custom cursor: options proposed (probe dot + ring, reticle, phosphor trail); not chosen yet.

## Round 8 · Nov 3, 2026
- **Kurisu ASCII softened** (CSS filter saturate .78 / brightness .86).
- **Kurisu message:** small plain Inter (13.5px, muted), two lines exactly as written, then "El Psy Kongroo." in Instrument Serif italic, amber. Lines stagger in on hover.
- **Cursor = probe + regression** (mouse/trackpad only; touch keeps native behaviour):
  - Amber dot + lagging ring. Ring grows and labels the target: MEASURE (tubes/button), READ (unit lamps/pips), OPEN · DRAG (cards), DRAG (carousel), WORK (green) / LIFE (amber) on the channels; shrinks on press.
  - Your last ~0.65s of movement is drawn as fading points with residual ticks to a dashed fitted line (principal axis).
  - Top-left readout, always on: "cursor fit · r² 0.991 ▬ n 16" (r² = squared Pearson correlation of the recent path).

## Round 9 · Nov 3, 2026
- Cursor-fit regression switched OFF (too noisy); code kept behind `SHOW_FIT = false` in the probe block. Top-left now shows a plain, unhighlighted page-coordinate readout "x 0536 · y 0482".

## Round 10 · Nov 3, 2026 — cleanup, review, and the brief for the real home page
- Repo cleanup: planning docs to `docs/planning/`, old mockups to `docs/mockups/archive/`, source art to `docs/source-art/`, ASCII generator in `scripts/`. Work happens on branch `overhaul`; `main` stays the live site.
- "Oomph" review of the prototype found: one climax (the boot) and then a flat page; no human presence; the readings feature waits to be discovered; low contrast on dim labels; mobile carousel broken.
- **Chosen for the real build (React, on its own branch off `overhaul`):**
  - Tubes **dock into the header** when you scroll past the hero, and keep working there.
  - **Opening animation** upgraded; the instrument demonstrates itself if the visitor doesn't click.
  - **ASCII self-portrait** of Franco on the left of the hero (from his own flat-colour art, same pose family as Kurisu).
  - **Background a tad lighter**, so the site reads less like a generic dark programmer page; Kurisu's ASCII colours retuned to match.
  - **MEASURE button** sends out a few signal pulses until it's pressed the first time.
  - **Tube display polished to "as good as it can look"**, with an implicit hover cue that says "click me".
- Not chosen (for now): optional sound, the "currently" line, the scroll-signal line, carousel duotone.

## Round 11 · Nov 3, 2026 — the real home page (React, branch `feat/home-page`)
- **Routing:** clean URLs via BrowserRouter + the spa-github-pages `404.html` redirect (vs hash URLs). The old site moves to `src/legacy/` and stays reachable at `/legacy`.
- **Work / Life:** placeholder pages in the new style until they're designed.
- **Background lifted** from `#0b0806` to a warm brown `#1c1611`; edges, panels and dim text lifted to match. Kurisu's ASCII re-tuned (shadow lift, slight desaturation, pull toward the tube-light tint).
- **ASCII self-portrait** from Franco's own art (`docs/source-art/franco_pose.png`). Dark-on-dark source, so the generator histogram-equalises luminance (`stretch`) and keeps a minimum glyph density; otherwise the sweater collapses to one character.
- **Clock redesign:** glass, getter, hex mesh, ghost cathodes, decimal points, sockets, walnut plinth with brass plate + READY lamp; parallax lean. Hover cue = brighten + lift + left-to-right ripple + ghosts + READY lamp + probe label.
- **Opening:** strike flicker + synchronised 0-9 sweep, then FRANCO; staged reveal; self-demo reading on first visit.
- **Docking:** one clock instance, portalled between the hero slot and a fixed layer; flies into the bar over 300 px of scroll.
- **MEASURE** pings until first use (persisted).

## Round 12 · Nov 3, 2026 — intro, footer, contact, Work wireframes
- **Worldline boot is back** as a short pre-roll (it also hides font/figure loading): amber phosphor CRT (not green, to match the theme), real loading log, divergence meter locking on 1.048596, CRT power-off. Game-of-Life initials and manga wipe stay dropped (too long).
- **Docked clock defaults to FRANCO**; a click on it while docked on Home scrolls back up instead of measuring.
- **Self-portrait moved** from beside the hero to the footer (left), mirroring Kurisu (right).
- **Contact box** at the bottom of Home: mailto compose + copy address (Franco chose this over Formspree).
- **Duolingo** = 2128 on Nov 3 2026, counted up nightly in America/New_York.
- **Work wireframes** (`docs/mockups/work_wireframes.html`): statement (Franco's wording, fact-checked: ~10 institutions, 3 continents) + 2–3 sentence intro (not 1–2 paragraphs); logos wired to a DATA hub; counters; one-line roles; three project-list options (A tiered notebook, B worldline lanes, C sortable index); publications. Recommendation: A's flagships + C's index.
- Logos: Intact added (Wikimedia SVG render). Harvard, MIT, Harvard i-lab PNGs to come from Franco.

## Round 13 · Nov 4, 2026 — logos, assets, Work wireframe v2
- **Logos** live in `src/assets/logos/` (kebab-case): Harvard and MIT SVGs from Franco; Harvard i-lab "Hi" mark pulled from innovationlabs.harvard.edu (+ wordmark); Intact without its three colour bars. Shown **in full colour** on cream plaques (dark-on-light logos were illegible on the brown). All other assets renamed to kebab-case.
- **Facts:** Harvard i-lab role = founder of a stealth AI startup; awards = $30k+; breast-cancer project verified from local terminal summaries (CNN/ResNet-18/ViT ensemble on BreakHis + RCL-7500 tiles, test AUC 0.98); repo is private. Added to the FACT_SHEET.
- **Work wireframe v2:** statement with three amber-highlighted phrases and a phosphor-green glowing "data"; intro is a placeholder; hub reads just DATA; counters swap "1/24 CARE fellows" for "2.4M records in my largest dataset"; publications removed; projects = **lab notebook** (every entry: figure, 2+ sentence description, tools, GitHub link or honest "private"/"proprietary"). Ordered by strength for a quant/ML reader.

## Round 14 · Nov 4, 2026 — Work page built
- Statement: colour change only (no highlighter); "data" keeps its glow. Intro left empty.
- Institutions: scattered (hand-placed, slight tilts, gentle float) instead of an even ring. Plaques in two subdued tones close to the background (walnut, bone) instead of white; logos shown exactly as published (the earlier white-plaque version had recoloured Harvard and Cove). Fixed: hover note hidden under neighbouring plaques (hovered plaque now rises above all).
- Counters: "5 of the world's top 25 universities (QS 2026)" replaces "2.4M records".
- Projects: no card is "punished" for lacking an image: every card has a figure (real, or generated on-theme art / a big-number panel). New figures: EPFL delay vs no-delay line plot, BetterYears screenshot, breast-cancer integrated-gradients tiles, CVD Fig. 2 (published paper, CC BY-NC-ND, unmodified, credited).
- Facts found: the CVD paper is published (AJPC 2026); the breast-cancer repo is UTMIST/breast-cancer-detection (Franco owned the histopathology stream); EEG pipeline repo is public.
- Built in React and wired in: `/work` replaces the placeholder; home carousel cards deep-link to `/work#slug`.

## Round 15 · Nov 4, 2026 — Work polish, Kurisu retired, original site archived
- Original site frozen: `archive/original-site` (= `main` @ 21357cc) and `archive/original-site-build` (= `gh-pages` @ 612555d), tag `v1-original-site`. Verified: identical commit and tree hashes, identical served `index.html`, same JS/CSS bundles when served locally.
- Footer: Franco's ASCII self-portrait on the right replaces the Kurisu art entirely (asset, source image and generator entry deleted).
- Work: experience timeline and all projects open by default; project filters removed; GitHub link beside the projects heading; updated MIT lockup.
- Figures: TI-task rig photo (Franco), DAS-change figure for EPFL (Franco), generated BiblioLinguist cover (book + quiz + readability meter, same style as the other generated covers).
- CHIS paper: under review at *Epidemiology and Psychiatric Sciences* (not JAACAP).

## Round 16 · Nov 4, 2026 — Work: awards + stack; footer everywhere; Life wireframes
- Intro: was gated to once per tab session (refresh skipped it, which read as "gone"). Now plays on every full load; still skippable, never on in-app navigation.
- Footer self-portrait on every page (moved into the shell), smaller.
- Harvard: Franco's replacement logo, on a bone plaque.
- Work order is now statement → institutions → counters → experience → **awards** → **tech stack** → projects. Why: awards belong with the record (experience) rather than the proof (projects); the stack sits directly above the projects because it works as their legend (each tool's pips count the projects below that use it, hover lists them, click jumps). Putting the stack higher (e.g. under the counters) would separate it from what it describes.
- Awards: six named (EPFL, Stanford Chi-Li Pao, Yale, U of T CS Engagement, Eric Jackman, Trinity Experiential Learning) + "4 more · $30k+ in total". No years: the old component's years were unverified (it had EPFL as 2024).
- Life wireframes (A field notebook / B atlas / C the desk), real content from CONTENT.md and the fact sheet.

## Round 17 · Nov 4, 2026 — every award; plainer stack; contact row on every page
- Awards: all ten listed (Franco: "hide none").
- Stack: pips and click-to-jump removed, all chips the same colour; the hover note stays.
- Footer: compose box (left) + self-portrait (right) in one row on every page, so the page ends without empty space. Phones stack them.
- Life work continues on branch `feat/life-page` (off `feat/home-page`).

## Round 18 · Nov 4, 2026 — Life page built
- Franco's picks from the wireframes: A's "things I'm proud of" list and bookshelf, B's map with pins, C's scattered photos.
- Proud-of list kept as a notebook (ruled paper, margin line, glowing numbers) instead of B's photo cards; photos appear as small taped polaroids that peek on hover, so it stays dense. Facts verbatim from `info_for_life.md`, two grammar fixes; "15-hour" kept from the fact sheet (Stanford in summer is UTC−7, Singapore UTC+8) and flagged to Franco.
- Map: Natural Earth 1:110m, Equal Earth projection, generated to JSON (103 KB, page lazy-loaded). Singapore is too small at this scale, so it is a pin only.
- Photos: 16 of his ~50 picked for variety (9 countries, mostly scenery, a few with him); places from each photo's GPS; published copies are re-encoded so no location data ships. Originals moved out of the repo to `../life-photo-originals/`.
- Board: higher prints lie on top so captions are never covered. Map pins with photos light their prints on the board.
- Kept the Persona 5 plush at Ayutthaya as an easter egg ("with a travel companion"): passes the non-fan test.
- Placeholder SectionPage removed (Work and Life are both real pages now).

## Round 19 · Nov 4, 2026 — Life: map without pins, 30 photos, a real scatter
- Map: pins removed; hovering a country outline shows its name (Singapore drawn from 1:50m with a bigger invisible hover target). The map no longer links to the photos.
- Photos: 14 more of his picks (bike, Big Ben, feet in the grass, Toblerone, Montreux church, St Paul's alley, motorbike on Hải Vân Pass, upside-down capybara, pointing out to sea, Suga Shrine stairs, Shinjuku at night, Nara deer, a local train, Leblanc with the Joker plush) = 30. "Staring at the Queen's bridge" read as the Tower Bridge shot already on the board.
- Board: no more columns. Sizes vary with each photo's shape and a seeded scale; each print drops as high as it fits, may tuck under the bottom of the print above (whose caption stays on top) and never covers a caption or more than 20% of a photo.
- Stanford/NUS fact gets his Singapore night photo, captioned with both clocks (7:46 pm in Singapore = 4:46 am in Palo Alto, from its timestamp).

## Round 20 · Nov 4, 2026 — after the first merge to main + deploy
- Deployed main to GitHub Pages (gh-pages @ f125228). Hosting stays on GitHub Pages for now; Cloudflare Pages / a custom domain discussed and parked.
- Off the clock added to Life (six cards; Franco's photos for karate, piano, bouldering, digital art).
- Captions and map subtitle rewritten in his words; contact lede is "Send me a message!"; Work: "Harvard i-Lab + MIT Orbit".
- Brand-coloured icons in the top bar. Portrait note no longer covers the email box.
- Bug: home.css's `.role` leaked into Work's timeline (spaced monospace text); renamed to `.hero-role`. Lesson: page CSS is global once loaded; prefix page-specific class names.

