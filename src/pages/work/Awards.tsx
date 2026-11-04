import { AWARDS, AWARDS_TOTAL } from "../../data/work";

/** Every award, under the experience timeline. */
export default function Awards() {
  return (
    <section className="wsec awards-sec" aria-labelledby="awards-title">
      <h2 className="wlabel" id="awards-title">// <b>awards &amp; scholarships</b> <span>{AWARDS_TOTAL}</span></h2>
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
    </section>
  );
}
