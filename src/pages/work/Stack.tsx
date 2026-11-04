import { useMemo, useState } from "react";
import { PROJECTS, STACK, type Tool } from "../../data/work";

const usedIn = (t: Tool) => {
  const keys = (t.match ?? [t.name]).map((k) => k.toLowerCase());
  return PROJECTS.filter((p) => p.tools.some((x) => keys.includes(x.toLowerCase())));
};

/** The toolkit, grouped, right before the projects. Hovering (or focusing) a tool says where it was used. */
export default function Stack() {
  const rows = useMemo(() => STACK.map((g) => ({
    ...g,
    tools: g.tools.map((t) => ({ t, note: [usedIn(t).map((p) => p.title).join(" · "), t.also].filter(Boolean).join(" · also ") })),
  })), []);
  const [open, setOpen] = useState<string | null>(null);
  const on = (id: string) => () => setOpen(id);
  const off = (id: string) => () => setOpen((o) => (o === id ? null : o));

  return (
    <section className="wsec" aria-labelledby="stack-title">
      <h2 className="wlabel" id="stack-title">// <b>tech stack</b></h2>
      <div className="stack">
        {rows.map((g) => (
          <div key={g.id} className="stack-row">
            <h3>{g.label}</h3>
            <ul>
              {g.tools.map(({ t, note }) => {
                const id = `${g.id}:${t.name}`;
                return (
                  <li key={t.name} className={open === id ? "open" : ""} onPointerEnter={on(id)} onPointerLeave={off(id)}>
                    <span className="tool" tabIndex={note ? 0 : undefined} onFocus={on(id)} onBlur={off(id)}
                      aria-label={note ? `${t.name}: used in ${note}` : undefined}>{t.name}</span>
                    {note && <span className="tool-note" aria-hidden="true">used in {note}</span>}
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
