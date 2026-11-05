import type { LinkIcon as Kind } from "../../data/site";

/** Single-colour marks for the top-bar links, drawn in the theme's amber (see .link-icon in layout.css). */
export default function LinkIcon({ kind }: { kind: Kind }) {
  if (kind === "github") return (
    <svg className="link-icon" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
  );
  if (kind === "linkedin") return (
    <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" fillRule="evenodd" d="M4 1h16a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3zm3.1 8.5H4.6V19h2.5V9.5zM5.85 8.3a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9zM19.4 13.8c0-2.6-1.4-4.5-3.9-4.5-1.3 0-2.2.7-2.6 1.4V9.5h-2.4V19H13v-5c0-1.3.6-2.3 1.9-2.3 1.2 0 1.8.9 1.8 2.3v5h2.6v-5.2z" />
    </svg>
  );
  return (
    <svg className="link-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
      <rect x="2.5" y="5" width="19" height="14" rx="2.2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" strokeLinecap="round" />
    </svg>
  );
}
