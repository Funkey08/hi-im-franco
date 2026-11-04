import { Link } from "react-router";
import "./section.css";

/** Temporary 404 (the Persona 5 "All-Out Attack" version is planned). The tubes read 404. */
export default function NotFound() {
  return (
    <main className="section-page">
      <div className="section-wrap" style={{ textAlign: "center", paddingTop: "18vh" }}>
        <div className="section-kicker">signal lost</div>
        <h1 style={{ font: "200 clamp(56px, 10vw, 120px)/1 var(--font-display)", margin: "10px 0 18px", color: "#ffe2bd" }}>
          Nothing here.
        </h1>
        <Link to="/" className="section-back" data-probe="HOME">← back to the bench</Link>
      </div>
    </main>
  );
}
