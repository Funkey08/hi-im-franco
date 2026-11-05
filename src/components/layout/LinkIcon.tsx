import type { LinkIcon as Kind } from "../../data/site";

/** Brand marks for the top-bar links, in their own colours (GitHub ink, LinkedIn blue, Gmail red). */
export default function LinkIcon({ kind }: { kind: Kind }) {
  if (kind === "github") return (
    <svg className="link-icon gh" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" /></svg>
  );
  if (kind === "linkedin") return (
    <svg className="link-icon li" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="3" fill="#0A66C2" />
      <path fill="#fff" d="M7.1 9.5H4.6V19h2.5V9.5zM5.85 8.3a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9zM19.4 13.8c0-2.6-1.4-4.5-3.9-4.5-1.3 0-2.2.7-2.6 1.4V9.5h-2.4V19H13v-5c0-1.3.6-2.3 1.9-2.3 1.2 0 1.8.9 1.8 2.3v5h2.6v-5.2z" />
    </svg>
  );
  return (
    <svg className="link-icon gm" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M1.6 20.5h3.8v-9.2L0 7.3v11.6c0 .9.7 1.6 1.6 1.6z" />
      <path fill="#34A853" d="M18.6 20.5h3.8c.9 0 1.6-.7 1.6-1.6V7.3l-5.4 4z" />
      <path fill="#FBBC04" d="M18.6 4.3v7l5.4-4V5.2c0-2-2.3-3.1-3.9-1.9z" />
      <path fill="#EA4335" d="M5.4 11.3v-7L12 8.4l6.6-4.1v7L12 15.2z" />
      <path fill="#C5221F" d="M0 5.2v2.1l5.4 4v-7L3.9 3.3C2.3 2.1 0 3.2 0 5.2z" />
    </svg>
  );
}
