import { rng } from "./util";
import type { CoverArt } from "../data/experiments";

/**
 * On-theme SVG covers for projects that don't have a figure yet. Deterministic (seeded),
 * so they look identical on every visit. Replace with real figures when available.
 */
export const COVER_ART: Record<CoverArt, () => string> = {
  /** order-book depth chart: bids vs asks around the mid price */
  lambda() {
    const R = rng(7);
    let bid = "", y = 150;
    for (let x = 0; x <= 160; x += 8) { y -= R() * 9; bid += `L${x},${y.toFixed(1)} L${x + 8},${y.toFixed(1)} `; }
    let y2 = 150;
    const ask: string[] = [];
    for (let x = 320; x >= 160; x -= 8) { y2 -= R() * 9; ask.push(`L${x},${y2.toFixed(1)} L${x - 8},${y2.toFixed(1)}`); }
    let spark = "M14,40", v = 40;
    for (let x = 14; x <= 306; x += 6) { v = Math.max(16, Math.min(64, v + (R() - 0.5) * 9)); spark += ` L${x},${v.toFixed(1)}`; }
    return `<svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="168" fill="#15100b"/>
      ${[42, 84, 126].map((gy) => `<line x1="0" x2="320" y1="${gy}" y2="${gy}" stroke="#2f241a"/>`).join("")}
      <path d="M0,168 L0,150 ${bid} L160,168 Z" fill="rgba(125,255,176,.16)" stroke="#7dffb0" stroke-width="1.4"/>
      <path d="M320,168 L320,150 ${ask.join(" ")} L160,168 Z" fill="rgba(255,179,92,.16)" stroke="#ffb35c" stroke-width="1.4"/>
      <line x1="160" x2="160" y1="10" y2="168" stroke="#efe3d3" stroke-opacity=".35" stroke-dasharray="3 4"/>
      <path d="${spark}" fill="none" stroke="#ffd29a" stroke-opacity=".7" stroke-width="1.2"/>
      <text x="12" y="160" font-family="JetBrains Mono, monospace" font-size="9" fill="#7dffb0" fill-opacity=".8">BID</text>
      <text x="290" y="160" font-family="JetBrains Mono, monospace" font-size="9" fill="#ffb35c" fill-opacity=".8">ASK</text></svg>`;
  },
  /** documents → highlighted fields → extracted, checked values */
  intact() {
    const R = rng(11);
    const hits = [1, 4, 7];
    let doc = "";
    for (let d = 0; d < 3; d++) {
      const ox = 18 + d * 16, oy = 14 + d * 10;
      doc += `<rect x="${ox}" y="${oy}" width="120" height="140" rx="3" fill="#1d150e" stroke="#3e2f22"/>`;
      if (d !== 2) continue;
      for (let l = 0; l < 10; l++) {
        const lw = 40 + R() * 60, ly = oy + 16 + l * 12, hit = hits.includes(l);
        doc += `<rect x="${ox + 10}" y="${ly}" width="${lw.toFixed(0)}" height="4" rx="2" fill="${hit ? "#ffb35c" : "#45352a"}"/>`;
        if (hit) {
          const ty = 40 + hits.indexOf(l) * 34;
          doc += `<rect x="${ox + 6}" y="${ly - 4}" width="${(lw + 8).toFixed(0)}" height="12" rx="2" fill="none" stroke="#ffb35c" stroke-opacity=".7"/>`
            + `<path d="M${ox + lw + 16},${ly + 2} C${ox + 150},${ly + 2} 190,${ty} 200,${ty}" fill="none" stroke="#ffb35c" stroke-opacity=".45" stroke-dasharray="3 3"/>`;
        }
      }
    }
    const rows = ["field_a", "field_b", "field_c"].map((k, i) =>
      `<rect x="200" y="${30 + i * 34}" width="104" height="22" rx="3" fill="#18120c" stroke="#7dffb0" stroke-opacity=".55"/><text x="208" y="${45 + i * 34}" font-family="JetBrains Mono, monospace" font-size="9" fill="#7dffb0">${k} ✓</text>`).join("");
    return `<svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="168" fill="#15100b"/>${doc}${rows}</svg>`;
  },
  /** city grid with restaurants, top five ranked */
  vera() {
    const R = rng(23);
    let g = "", dots = "";
    for (let i = 0; i < 9; i++) g += `<line x1="${i * 40 + R() * 10}" y1="0" x2="${i * 40 - 20 + R() * 10}" y2="168" stroke="#2f241a"/>`;
    for (let i = 0; i < 6; i++) g += `<line x1="0" y1="${i * 32 + R() * 8}" x2="320" y2="${i * 32 + 6 + R() * 8}" stroke="#2f241a"/>`;
    for (let i = 0; i < 140; i++) dots += `<circle cx="${(R() * 320).toFixed(1)}" cy="${(R() * 168).toFixed(1)}" r="1.6" fill="#a8937c" fill-opacity=".5"/>`;
    const pins = [[92, 58], [214, 40], [150, 112], [262, 120], [48, 128]].map(([x, y], k) =>
      `<circle cx="${x}" cy="${y}" r="9" fill="rgba(255,140,40,.18)"/><circle cx="${x}" cy="${y}" r="4" fill="#ffb35c"/><text x="${x + 8}" y="${y - 7}" font-family="JetBrains Mono, monospace" font-size="10" fill="#ffd29a">#${k + 1}</text>`).join("");
    return `<svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="168" fill="#15100b"/>${g}${dots}${pins}</svg>`;
  },
};
