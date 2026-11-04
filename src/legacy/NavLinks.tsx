// FloatingNav.tsx
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { id: "ImageCarousel", label: "📷 Cool Pics" },
  { id: "AboutMe", label: "🙃 About Me" },
  { id: "ProjectShowcase", label: "💻 Things I've Done" },
  { id: "AwardSection", label: "🏆 What I've Got" },
  { id: "TimelineBio", label: "📅 Timeline Bio" },
  { id: "FavBooks", label: "📚 Fav Books" },
  { id: "ContactSection", label: "📧 Contact" },
];

const FloatingNav = () => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  const handleNavClick = (hash: string) => {
    setOpen(false);
    setTimeout(() => {
      document
        .getElementById(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <div ref={rootRef} className="fixed top-4 right-4 z-[60]">
      {/* Bigger button */}
      <button
        aria-expanded={open}
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((v) => !v)}
        className="h-14 w-14 rounded-full bg-neutral-900/90 text-white shadow-xl border border-white/10
                   flex items-center justify-center hover:scale-105 transition-transform"
      >
        {/* Wider hamburger */}
        <span className="relative block h-6 w-8">
          <span
            className={`absolute left-0 top-[6px] h-[2px] w-full bg-white transition-transform ${
              open ? "rotate-45 top-1/2" : ""
            }`}
          />
          <span
            className={`absolute left-0 top-[12px] h-[2px] w-full bg-white transition-opacity ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 top-[18px] h-[2px] w-full bg-white transition-transform ${
              open ? "-rotate-45 top-1/2" : ""
            }`}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="absolute right-0 mt-3"
          >
            <div className="min-w-[220px] max-w-[300px] rounded-2xl bg-neutral-900/95 border border-white/10 shadow-2xl p-2">
              <nav aria-label="Site">
                <ul className="divide-y divide-white/10">
                  {links.map(({ id, label }) => (
                    <li key={id}>
                      <button
                        className="w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                        onClick={() => handleNavClick(id)}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingNav;
