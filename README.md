<img src="docs/readme/franco-ascii.png" alt="Franco, in ASCII" width="210" align="right">

# Hi, I'm Franco 👋

**Data scientist · applied researcher · human being.**

This is the source of my personal website, **[funkey08.github.io/hi-im-franco](https://funkey08.github.io/hi-im-franco/)**. I built it from scratch to introduce myself. It's a warm, lamp-lit lab bench where my name is a working nixie-tube instrument.

> *"I like experiencing things I know nothing about."*

<br clear="right">

## What's on it

- **Home: the instrument.** A short "worldline" boot sequence, then FRANCO in six nixie tubes. Press **MEASURE** (or click the tubes) and they roll through real numbers from my work, like decisions modelled and death records analysed, plus a Duolingo streak that ticks up every midnight. Scroll down and the tubes dock into the header. Below that sits a draggable orbit of recent experiments.
- **Work: artificial neurons.** You enter through a forward pass of a neural net. Inside: the institutions I've worked at, wired to a central *DATA* node; my experience; every award; a tech stack whose chips tell you where each tool was used; and lab-notebook project cards, each with a figure, a write-up, tools and links.
- **Life: real neurons.** You enter through firing biological neurons. Inside: things I'm proud of (serious and otherwise), a map of the 17 countries I've been to, 30 photos tossed across a desk, and the books on my shelf.
- **Everywhere:** a probe cursor with a coordinate readout, an "open a channel" email box, and an ASCII me (him, up there) who signs off at the bottom of every page.

Everything respects `prefers-reduced-motion`, works on phones, and needs no backend: it's a static site.

## Built with

React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · Framer Motion · React Router 7 · Canvas 2D (the neuron simulations) · SVG (the map) · GitHub Pages

## Development

```bash
yarn            # install
yarn dev        # local dev server at http://localhost:5173/hi-im-franco/
yarn build      # production build to dist/
yarn lint       # ESLint
yarn deploy     # build, then publish dist/ to the gh-pages branch (the live site)
```

Deep links like `/work` work on GitHub Pages through the `public/404.html` redirect.

## Where things live

| Path | What |
|---|---|
| `src/data/` | **All the copy and numbers**: readings, projects, roles, awards, facts, countries, books. Edit these, not the components. |
| `src/pages/` | `home/`, `work/`, `life/`, and the 404 page |
| `src/instrument/` | The nixie-tube state machine and the provider that runs readings and page transitions |
| `src/components/` | Clock, dock, footer, intro, cursor, lightbox |
| `src/sims/` | Canvas simulations: the neural net (Work) and the biological neurons (Life) |
| `src/legacy/` | The original site, still reachable at `/legacy` |
| `scripts/` | Asset builders (Python + Pillow): ASCII art, Life photos (resized, location data stripped), world map, this README's portrait |
| `docs/` | Design history, decisions log, mockups and source art ([`docs/README.md`](docs/README.md)) |
| [`TODO.md`](TODO.md) | The current design and what's next |

The original site is preserved exactly as it was in the `archive/original-site` branches and the `v1-original-site` tag.

---

Thanks for stopping by. *El Psy Kongroo.*
