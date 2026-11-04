import { useMemo } from "react";
import { COVER_ART } from "../../lib/coverArt";
import { useSeen } from "../../lib/useSeen";
import { GITHUB } from "../../data/site";
import { PROJECTS, type Figure, type Project } from "../../data/work";

function Fig({ figure, title }: { figure: Figure; title: string }) {
  const svg = useMemo(() => ("art" in figure ? COVER_ART[figure.art]() : null), [figure]);
  if ("image" in figure) {
    return (
      <figure className={`pfig${figure.fit === "contain" ? " contain" : ""}`}>
        <img src={figure.image} alt={`Figure from ${title}`} loading="lazy" decoding="async" />
        {figure.credit && <figcaption>{figure.credit}</figcaption>}
      </figure>
    );
  }
  if ("art" in figure) {
    return <figure className="pfig art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg! }} />;
  }
  return (
    <figure className="pfig metric" aria-hidden="true">
      <b>{figure.metric}</b>
      <span>{figure.caption}</span>
    </figure>
  );
}

function Card({ p }: { p: Project }) {
  const [ref, seen] = useSeen<HTMLElement>(0.12);
  return (
    <article id={p.slug} ref={ref} className={`pcard${p.flagship ? " flag" : ""}${seen ? " seen" : ""}`}>
      <Fig figure={p.figure} title={p.title} />
      <div className="pbody">
        <div className="pmeta">
          <span className={`status ${p.status.tone}`}>{p.status.label}</span>
          <span>{p.meta}</span>
        </div>
        <h3>{p.title}</h3>
        {p.headline && <p className="phead">{p.headline}</p>}
        <p className="pdesc">{p.desc}</p>
        {p.stats && (
          <dl className="pstats">
            {p.stats.map(([v, k]) => <div key={k}><dt>{v}</dt><dd>{k}</dd></div>)}
          </dl>
        )}
        <ul className="ptools" aria-label="Tools">
          {p.tools.map((t) => <li key={t}>{t}</li>)}
        </ul>
        <div className="plinks">
          {p.links.map((l) => (l.href
            ? <a key={l.label} href={l.href} target="_blank" rel="noreferrer" data-probe="OPEN">{l.label}</a>
            : <span key={l.label}>{l.label}</span>))}
        </div>
      </div>
    </article>
  );
}

/** The lab notebook: flagships as wide cards, then every other project as an equal card. */
export default function Projects() {
  const flags = PROJECTS.filter((p) => p.flagship);
  const rest = PROJECTS.filter((p) => !p.flagship);
  return (
    <section className="wsec" aria-labelledby="projects-title">
      <div className="phead-row">
        <h2 className="wlabel" id="projects-title">// <b>projects</b></h2>
        <a className="gh-link" href={GITHUB.href} target="_blank" rel="noreferrer" data-probe="GITHUB">
          <svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          <span>{GITHUB.label}</span><span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="pflags">{flags.map((p) => <Card key={p.slug} p={p} />)}</div>
      <div className="pgrid">{rest.map((p) => <Card key={p.slug} p={p} />)}</div>
    </section>
  );
}
