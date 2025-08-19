const stats = [
  { k: "🏆12+", v: "Awards and Scholarships", color: "text-yellow-200" },
  { k: "📜$30k+", v: "Grants and Awards Funding", color: "text-orange-200" },
  { k: "🗺️4", v: "Countries and Institutions Recognized", color: "text-sky-300" },
];

export default function AwardsStats() {
  return (
    <section id="AwardSection" className="w-full text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center pt-12 mb-12">
          What I’ve Got!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className="group text-center transition-all duration-300 cursor-pointer hover:scale-110"
            >
              <div
                className={`text-5xl font-bold ${s.color}`}
                style={{
                  transition: "all 0.3s ease",
                }}
              >
                <span
                  className="inline-block transition-all duration-300 group-hover:drop-shadow-[0_0_10px_currentColor]"
                >
                  {s.k}
                </span>
              </div>
              <div className="text-base md:text-xl pt-2 text-white/70">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
