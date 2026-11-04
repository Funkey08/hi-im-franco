import { useEffect } from "react";
import { reducedMotion } from "./util";

/** Scroll to `#slug` after the page has powered on (the CRT animation takes ~0.55 s). */
export function useHashScroll() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" }); // scroll-margin-top clears the bar
      el.classList.add("flash");
    }, 650);
    return () => window.clearTimeout(t);
  }, []);
}
