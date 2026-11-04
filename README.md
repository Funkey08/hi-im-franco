# 👋 Hi, I'm Franco!

I built [this website](https://funkey08.github.io/hi-im-franco/) to introduce myself and for you to get to know me better! 🙂

It's made from scratch with React 19, TypeScript, Vite 7, Tailwind CSS v4 and Framer Motion, and deployed to GitHub Pages.

## Status

The site is being redesigned ("Nixie Lab": a warm, lab-bench theme where my name is a nixie-tube instrument).

- `main` is the live site.
- `archive/original-site` (source) and `archive/original-site-build` (the built `gh-pages` output), plus tag `v1-original-site`, freeze the original site exactly as it was before the redesign. Never change them.
- `overhaul` is the redesign base; features are built on branches off it.
- Plan and current design: [`TODO.md`](TODO.md). Design history, content audits and mockups: [`docs/`](docs/README.md).

## Development

```bash
yarn            # install
yarn dev        # local dev server
yarn build      # production build to dist/
yarn lint       # ESLint
yarn deploy     # build + publish dist/ to the gh-pages branch
```

`scripts/make_ascii.py` regenerates the ASCII art in `src/assets/ascii/` from the source images in `docs/source-art/` (needs Python + Pillow).

Thanks for stopping by!
