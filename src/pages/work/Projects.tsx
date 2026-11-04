import { useEffect, useMemo, useState } from "react";
import { COVER_ART } from "../../lib/coverArt";
import { useSeen } from "../../lib/useSeen";
import { FIELDS, PROJECTS, type Field, type Figure, type Project } from "../../data/work";

function Fig({ figure, title }: { figure: Figure; title: string }) {
  const svg = useMemo(() => ("art" in figure ? COVER_ART[figure.art]() : null), [figure]);
  if ("image" in figure) {
    return (
      <figure className={`pfig${figure.fit === "contain" ? " contain" : ""}${figure.tall ? " tall" : ""}`}>
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

function Card({ p, dim }: { p: Project; dim: boolean }) {
  const [ref, seen] = useSeen<HTMLElement>(0.12);
  return (
    <article id={p.slug} ref={ref} className={`pcard${p.flagship ? " flag" : ""}${dim ? " dim" : ""}${seen ? " seen" : ""}`}>
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

/**
 * The lab notebook: flagships as wide cards, everything else as equal cards in a two-column grid.
 * Field chips highlight matching projects (others dim) rather than hiding anything.
 */
export default function Projects() {
  const [field, setField] = useState<Field | null>(null);
  const [showMore, setShowMore] = useState(false);

  // deep link (/work#slug) to a project behind "show more": open it first
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (PROJECTS.some((p) => p.more && p.slug === id)) setShowMore(true);
  }, []);

  const dim = (p: Project) => field !== null && !p.fields.includes(field);
  const flags = PROJECTS.filter((p) => p.flagship);
  const rest = PROJECTS.filter((p) => !p.flagship && (!p.more || showMore));
  const hidden = PROJECTS.filter((p) => p.more).length;

  return (
    <section className="wsec" aria-labelledby="projects-title">
      <h2 className="wlabel" id="projects-title">// <b>projects</b></h2>
      <div className="chips" role="group" aria-label="Highlight projects by field">
        <button type="button" className={field === null ? "on" : ""} onClick={() => setField(null)} aria-pressed={field === null}>all</button>
        {FIELDS.map((f) => (
          <button key={f.id} type="button" className={field === f.id ? "on" : ""} aria-pressed={field === f.id}
            onClick={() => setField((cur) => (cur === f.id ? null : f.id))}>{f.label}</button>
        ))}
      </div>
      <div className="pflags">{flags.map((p) => <Card key={p.slug} p={p} dim={dim(p)} />)}</div>
      <div className="pgrid">{rest.map((p) => <Card key={p.slug} p={p} dim={dim(p)} />)}</div>
      {!showMore && (
        <div className="pmore">
          <button type="button" onClick={() => setShowMore(true)} data-probe="MORE">
            show {hidden} earlier projects
          </button>
        </div>
      )}
    </section>
  );
}
