import { memo, type CSSProperties } from "react";
import "./ascii.css";

export interface AsciiData {
  cols: number;
  rows: number;
  /** rows of [text, colour | null] runs, as written by scripts/make_ascii.py */
  runs: [string, string | null][][];
}

interface Props {
  data: AsciiData;
  /** Start the row-by-row print-in. Until then the art is invisible. */
  play: boolean;
  rowMs?: number;
  className?: string;
}

/** Coloured ASCII art that prints in row by row, like a slow terminal. Decorative: aria-hidden. */
const AsciiArt = memo(function AsciiArt({ data, play, rowMs = 20, className = "" }: Props) {
  return (
    <pre className={`ascii${play ? " play" : ""} ${className}`} aria-hidden="true" style={{ "--row-ms": `${rowMs}ms` } as CSSProperties}>
      {data.runs.map((row, i) => (
        <span className="ascii-row" key={i} style={{ "--r": i } as CSSProperties}>
          {row.length ? row.map(([text, color], k) => (color ? <span key={k} style={{ color }}>{text}</span> : text)) : " "}
        </span>
      ))}
    </pre>
  );
});

export default AsciiArt;
