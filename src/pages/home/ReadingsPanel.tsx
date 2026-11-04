import { useEffect, useState } from "react";
import { READINGS } from "../../data/readings";
import { useInstrument } from "../../instrument/context";
import { reducedMotion } from "../../lib/util";

/** Types `text` out two characters at a time whenever it changes. */
function useTyped(text: string, speed = 12) {
  const [out, setOut] = useState(text);
  useEffect(() => {
    if (reducedMotion()) { setOut(text); return; }
    let i = 0;
    setOut("");
    const iv = window.setInterval(() => {
      i += 2;
      setOut(text.slice(0, i));
      if (i >= text.length) window.clearInterval(iv);
    }, speed);
    return () => window.clearInterval(iv);
  }, [text, speed]);
  return out;
}

/** The instrument's front panel: MEASURE button, status LED, quantity label, progress pips, caption. */
export default function ReadingsPanel() {
  const { readingIndex, hasMeasured, phase, measure, showReading } = useInstrument();
  const reading = READINGS[readingIndex];
  const caption = useTyped(reading.caption);
  const [busy, setBusy] = useState(false);

  // LED blinks while the tubes are rolling
  useEffect(() => {
    setBusy(true);
    const t = window.setTimeout(() => setBusy(false), 1000);
    return () => window.clearTimeout(t);
  }, [readingIndex]);

  return (
    <div className="meter" aria-live="polite">
      <span className="meter-screw tl" /><span className="meter-screw tr" />
      <button
        type="button"
        className={`measure${!hasMeasured && phase === "ready" ? " signal" : ""}`}
        onClick={measure}
        data-probe="MEASURE"
        aria-label="Take a measurement"
      >
        <span className="measure-cap" />
        <span className="measure-label">Measure</span>
      </button>
      <div className="meter-read">
        <div className="meter-top">
          <div className="meter-label">
            <span className={`led${phase !== "off" ? " on" : ""}${busy || phase === "boot" ? " busy" : ""}`} />
            <span>{reading.label}</span>
          </div>
          <div className="pips" role="group" aria-label="Jump to a reading">
            {READINGS.slice(1).map((r, i) => (
              <button
                key={r.unit}
                type="button"
                className={`pip${readingIndex === i + 1 ? " on" : ""}`}
                onClick={() => showReading(i + 1)}
                aria-label={r.label}
                title={r.label}
                data-probe="READ"
              />
            ))}
          </div>
        </div>
        <p className="meter-caption">
          {readingIndex === 0
            ? <span className="meter-hint">Press <b>MEASURE</b> (or the tubes) to take a reading of my work.</span>
            : caption}
        </p>
      </div>
    </div>
  );
}

/** Unit lamps beside the tubes: the one being measured lights up; each is clickable. */
export function UnitLamps() {
  const { readingIndex, showReading } = useInstrument();
  return (
    <div className="units" aria-hidden="true">
      {READINGS.map((r, i) => (
        <span key={r.unit} className={readingIndex === i ? "on" : ""} onClick={() => showReading(i)} data-probe="READ">
          {r.unit}
        </span>
      ))}
    </div>
  );
}
