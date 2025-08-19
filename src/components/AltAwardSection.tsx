/** Map award items to a logo key and optional accent color */
const awards = [
  { title: "EPFL Excellence Research Internship Award", year: "2024", logo: "epfl", color: "text-red-400" },
  { title: "Stanford Chi-Li Pao Foundation Award", year: "2025", logo: "stanford", color: "text-rose-300" },
  { title: "UofT Computer Science Engagement Award", year: "2023", logo: "utcs", color: "text-sky-300" },
  { title: "Yale Research Fund", year: "2022–2024", logo: "yale", color: "text-blue-300" },
  { title: "Eric Jackman Scholarship", year: "2024", logo: "trinity", color: "text-sky-300" },
  { title: "UofT Research Exchange Award", year: "2025", logo: "uoft", color: "text-blue-300" },
  { title: "ASSU Conference Grant", year: "2023", logo: "assu", color: "text-fuchsia-400" },
  { title: "UTSU Academic Pursuits Award", year: "2022–2024", logo: "utsu", color: "text-indigo-300" },
  { title: "Trinity Experiential Learning Award", year: "2022–2024", logo: "trinity", color: "text-sky-300" },
];

/** Auto-import all images in src/assets/awards */
const logos = import.meta.glob("../assets/awards/*.{png,jpg,jpeg,webp,svg}", {
  eager: true,
  as: "url",
});

/** Utility: resolve a logo URL by key */
function logoSrc(key: string) {
  // Try common filename patterns: key.*, key-logo.*, etc.
  const tryNames = [
    `../assets/awards/${key}.png`,
    `../assets/awards/${key}.svg`,
    `../assets/awards/${key}.jpg`,
    `../assets/awards/${key}.jpeg`,
    `../assets/awards/${key}.webp`,
    `../assets/awards/${key}-logo.png`,
    `../assets/awards/${key}-logo.svg`,
  ];
  for (const name of tryNames) {
    if (name in logos) return logos[name as keyof typeof logos] as string;
  }
  return ""; // fallback: no image
}

const AwardsSection = () => {
  return (
    <section id="AwardsSection" className="w-full py-16 bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl font-bold mb-6">My Awards</h2>

        {/* Dense list (2 columns on md+, 1 on mobile) */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {awards.map(({ title, year, logo, color }, i) => {
            const src = logoSrc(logo);
            return (
              <li
                key={i}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-neutral-900/70
                           hover:bg-neutral-900 hover:border-white/20 transition-colors px-3 py-2"
              >
                {/* Logo box */}
                <div className="shrink-0 h-10 w-10 rounded-md overflow-hidden ring-1 ring-white/10 group-hover:ring-white/20 transition-shadow">
                  {src ? (
                    <img src={src} alt="" className="h-full w-full object-contain" />
                  ) : (
                    <div className="h-full w-full bg-white/5" />
                  )}
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <div className={`text-sm md:text-base truncate ${color ?? "text-white"}`}>
                    {title}
                  </div>
                </div>

                {/* Year badge */}
                <span className="ml-2 shrink-0 text-xs px-2 py-1 rounded-md bg-white/5 text-white/70">
                  {year}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Optional: footnote link row */}
        {/* <div className="mt-4 text-sm text-white/60">
          Full list & details available upon request.
        </div> */}
      </div>
    </section>
  );
};

export default AwardsSection;
