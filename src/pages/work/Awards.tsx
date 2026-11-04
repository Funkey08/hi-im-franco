import { AWARDS, AWARDS_MORE } from "../../data/work";

/** A short shelf of awards under the experience timeline. */
export default function Awards() {
  return (
    <section className="wsec awards-sec" aria-labelledby="awards-title">
      <h2 className="wlabel" id="awards-title">// <b>awards</b> <span>selected</span></h2>
      <ul className="awards">
        {AWARDS.map((a) => (
          <li key={a.name} className="award">
            <span className="award-logo"><img src={a.logo} alt="" /></span>
            <span className="award-text">
              <b>{a.name}</b>
              <small>{a.from}{a.note ? ` · ${a.note}` : ""}</small>
            </span>
          </li>
        ))}
      </ul>
      <p className="awards-more">{AWARDS_MORE}</p>
    </section>
  );
}
