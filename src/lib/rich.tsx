import { Fragment, type ReactNode } from "react";

/**
 * Tiny inline markup for copy in src/data: **bold** and [label](https://url). Nothing else, so
 * data files stay plain strings that Franco can edit.
 */
export function rich(text: string): ReactNode {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((https?:\/\/[^)\s]+)\)/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<b key={k++}>{m[1]}</b>);
    else out.push(<a key={k++} href={m[3]} target="_blank" rel="noreferrer">{m[2]}</a>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out.map((n, i) => <Fragment key={i}>{n}</Fragment>);
}
