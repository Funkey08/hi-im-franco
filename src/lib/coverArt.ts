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
  /** an open article with vocabulary picked out, turned into a quiz card + readability meter */
  biblio() {
    const R = rng(31);
    const M = "font-family=\"JetBrains Mono, monospace\"";
    let page = "";
    const picks = [[1, 2], [3, 0], [5, 3], [7, 1]];
    for (const side of [0, 1]) {
      const ox = 22 + side * 92;
      for (let l = 0; l < 10; l++) {
        let x = ox;
        for (let w = 0; w < 4; w++) {
          const ww = 8 + R() * 14;
          if (x + ww > ox + 82) break;
          const hit = side === 0 && picks.some(([pl, pw]) => pl === l && pw === w);
          page += `<rect x="${x.toFixed(1)}" y="${30 + l * 11}" width="${ww.toFixed(1)}" height="4" rx="2" fill="${hit ? "#ffb35c" : "#4a3a2c"}"/>`;
          if (hit) page += `<rect x="${(x - 2).toFixed(1)}" y="${26 + l * 11}" width="${(ww + 4).toFixed(1)}" height="11" rx="2" fill="none" stroke="#ffb35c" stroke-opacity=".6"/>`;
          x += ww + 4;
        }
      }
    }
    const book = `<path d="M14,24 Q60,14 106,24 L106,148 Q60,138 14,148 Z" fill="#221a12" stroke="#5a4632"/>`
      + `<path d="M106,24 Q152,14 198,24 L198,148 Q152,138 106,148 Z" fill="#1f1811" stroke="#5a4632"/>`
      + `<line x1="106" y1="24" x2="106" y2="148" stroke="#6b5440"/>`;
    const opts = ["ephemeral", "ubiquitous", "laconic"].map((o, i) =>
      `<rect x="222" y="${62 + i * 22}" width="84" height="16" rx="3" fill="${i === 1 ? "rgba(125,255,176,.14)" : "#1d150e"}" stroke="${i === 1 ? "#7dffb0" : "#45352a"}"/>`
      + `<text x="230" y="${73 + i * 22}" ${M} font-size="8.5" fill="${i === 1 ? "#d8ffe8" : "#a8937c"}">${o}${i === 1 ? "  ✓" : ""}</text>`).join("");
    const quiz = `<rect x="214" y="22" width="100" height="134" rx="5" fill="#18120c" stroke="#5a4632"/>`
      + `<text x="222" y="38" ${M} font-size="8" fill="#ffb35c" letter-spacing="1">QUIZ · 3/10</text>`
      + `<rect x="222" y="45" width="70" height="4" rx="2" fill="#6b5440"/>` + opts
      + `<text x="222" y="146" ${M} font-size="7.5" fill="#8a7764">readability</text>`
      + `<rect x="270" y="140" width="36" height="5" rx="2.5" fill="#2f241a"/><rect x="270" y="140" width="23" height="5" rx="2.5" fill="#ffb35c"/>`;
    return `<svg viewBox="0 0 320 168" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg"><rect width="320" height="168" fill="#15100b"/>${book}${page}${quiz}</svg>`;
  },
};
