import { useMemo, useState } from "react";
import { PROJECTS, STACK, type Tool } from "../../data/work";
import { reducedMotion } from "../../lib/util";

const usedIn = (t: Tool) => {
  const keys = (t.match ?? [t.name]).map((k) => k.toLowerCase());
  return PROJECTS.filter((p) => p.tools.some((x) => keys.includes(x.toLowerCase())));
};

/**
 * The toolkit, grouped, right before the projects. Each chip shows how many of the projects below
 * use it (pips); hovering lists them, clicking jumps to the first one.
 */
export default function Stack() {
  const rows = useMemo(() => STACK.map((g) => ({ ...g, tools: g.tools.map((t) => ({ t, uses: usedIn(t) })) })), []);
  const [open, setOpen] = useState<string | null>(null);

  const jump = (slug: string) => {
    const el = document.getElementById(slug);
    if (!el) return;
    el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
    el.classList.remove("flash");
    void el.offsetWidth;
    el.classList.add("flash");
  };

  return (
    <section className="wsec" aria-labelledby="stack-title">
      <h2 className="wlabel" id="stack-title">// <b>tech stack</b> <span>pips = projects below that use it</span></h2>
      <div className="stack">
        {rows.map((g) => (
          <div key={g.id} className="stack-row">
            <h3>{g.label}</h3>
            <ul>
              {g.tools.map(({ t, uses }) => {
                const id = `${g.id}:${t.name}`;
                const note = [uses.map((p) => p.title).join(" · "), t.also].filter(Boolean).join(" · also ");
                return (
                  <li key={t.name} className={open === id ? "open" : ""}
                    onPointerEnter={() => setOpen(id)} onPointerLeave={() => setOpen((o) => (o === id ? null : o))}>
                    <button type="button" className={`tool${uses.length ? "" : " quiet"}`}
                      onFocus={() => setOpen(id)} onBlur={() => setOpen((o) => (o === id ? null : o))}
                      onClick={() => uses[0] && jump(uses[0].slug)} data-probe={uses.length ? "JUMP" : undefined}
                      aria-label={`${t.name}${note ? `: ${note}` : ""}`}>
                      {t.name}
                      {uses.length > 0 && <i aria-hidden="true">{uses.map((p) => <em key={p.slug} />)}</i>}
                    </button>
                    {note && <span className="tool-note" aria-hidden="true">{note}</span>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
