import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export interface Slide { src: string; alt: string; caption: string; sub?: string; w: number; h: number }

/**
 * Full-screen photo viewer: ←/→ to step, Esc or a click outside to close. Focus moves to the
 * dialog and back to the opener on close; page scroll is locked while open.
 */
export default function Lightbox({ slides, index, onIndex, onClose }: {
  slides: Slide[]; index: number; onIndex: (i: number) => void; onClose: () => void;
}) {
  const box = useRef<HTMLDivElement>(null);
  const s = slides[index];
  const many = slides.length > 1;
  const step = (d: number) => onIndex((index + d + slides.length) % slides.length);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    box.current?.focus();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => { html.style.overflow = prev; opener?.focus?.(); };
  }, []);

  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (many && e.key === "ArrowRight") onIndex((index + 1) % slides.length);
      else if (many && e.key === "ArrowLeft") onIndex((index - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [index, many, onClose, onIndex, slides.length]);

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={s.caption} tabIndex={-1} ref={box}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <figure className="lightbox-fig">
        <img key={s.src} src={s.src} alt={s.alt} width={s.w} height={s.h} />
        <figcaption><b>{s.caption}</b>{s.sub && <span>{s.sub}</span>}{many && <small>{index + 1} / {slides.length}</small>}</figcaption>
      </figure>
      {many && <button type="button" className="lightbox-nav prev" onClick={() => step(-1)} aria-label="Previous photo" data-probe="PREV">‹</button>}
      {many && <button type="button" className="lightbox-nav next" onClick={() => step(1)} aria-label="Next photo" data-probe="NEXT">›</button>}
      <button type="button" className="lightbox-close" onClick={onClose} aria-label="Close" data-probe="CLOSE">✕</button>
    </div>,
    document.body,
  );
}
