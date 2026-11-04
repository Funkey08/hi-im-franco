import { useState } from "react";
import { BOOKS } from "../../data/life";
import { rich } from "../../lib/rich";

/** The bookshelf: covers stand on a walnut shelf; the chosen one pulls forward and its note opens below. */
export default function Shelf() {
  const [sel, setSel] = useState(0);
  const b = BOOKS[sel];
  return (
    <section className="lsec" aria-labelledby="books-title">
      <h2 className="llabel" id="books-title">// <b>on the shelf</b> <span>books I love</span></h2>
      <div className="shelf" role="tablist" aria-label="Books">
        {BOOKS.map((bk, i) => (
          <button key={bk.title} type="button" role="tab" aria-selected={i === sel} aria-controls="book-note"
            className={`book${i === sel ? " on" : ""}`} onClick={() => setSel(i)} onPointerEnter={() => setSel(i)} data-probe="READ">
            <img src={bk.cover} alt={`${bk.title} cover`} loading="lazy" />
          </button>
        ))}
      </div>
      <article className="book-note" id="book-note" role="tabpanel" key={b.title}>
        <h3>{b.title} <small>{b.author}</small></h3>
        <p>{rich(b.why)}</p>
      </article>
    </section>
  );
}
