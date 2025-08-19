import { useRef, useLayoutEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// ---- your existing data ----
const imgMap = import.meta.glob(
  "../assets/timeline/*.{avif,png,jpg,jpeg,webp}",
  {
    eager: true,
    as: "url",
  }
);

const timelineData = [
  {
    year: "2022",
    title: "Where It Began (feat. Mice 🐭)",
    description: (
      <>
        In my first year, I had the privilege of stepping into a computational
        lab for the very first time. Working with Arduino, MATLAB, and Bonsai, I
        engineered an <strong>automated transitive inference paradigm</strong>{" "}
        for mice — a system that could run experiments in their entirety without
        human intervention. That experience opened my eyes to the immense
        potential of data and computation in streamlining research, and set me
        on the path to pursue computer science and statistical methods as part
        of my studies and, eventually, a long-term goal.
      </>
    ),
    img: imgMap["../assets/timeline/mouse_lab.avif"],
  },
  {
    year: "2023",
    title: "Lab Coat by Day, Data by Night (literally...)",
    description: (
      <>
        My curiosity for the power of data took me to{" "}
        <strong>Stanford Medicine</strong>, where I used R, Joinpoint
        regression, and iterative model building to uncover trends in mental
        health and mortality among minority populations. During that same
        period, a scholarship brought me to the{" "}
        <strong>National University of Singapore</strong>, where I gained
        hands-on experience in a wet lab. While I enjoyed working at the bench,
        it solidified my belief that my greatest potential lies in computational
        research — where I realized data could scale insights beyond just the
        physical lab.
      </>
    ),
    img: imgMap["../assets/timeline/stanford_pres.avif"],
  },
  {
    year: "2024",
    title: "I wanna try more of this...",
    description: (
      <>
        Wanting to see how my skills translated to industry, I joined{" "}
        <strong>Cove Neurosciences</strong> as an R&D Data Scientist intern.
        There, I developed data-driven biomarkers for cognitive disorders, using
        Python to create an end-to-end analytical pipeline for processing
        thousands of patients in one go. It was here that I was inspired to look
        beyond biotechnology — how else could advanced analytics and AI could
        tackle problems across fields?
      </>
    ),
    img: imgMap["../assets/timeline/cove_group.avif"],
  },
  {
    year: "2025",
    title: "{-m venv new_environment}",
    description: (
      <>
        Thus, with a strong desire to experience new perspectives and diversify
        my skills, I found myself in Geneva to intern at{" "}
        <strong>EPFL Biotech</strong>. My work spanned designing online
        platforms and surveys for large-scale experiments, developing portable
        apps to enable global data collection, and running analyses on datasets
        with tens of thousands of entries. I became not only more adaptable, but
        more inspired and confident that I could bring ideas to life in a more
        tangible way!
      </>
    ),
    img: imgMap["../assets/timeline/toblerone_1.avif"],
  },
  {
    year: "infinity and beyond",
    title: "So...where do we go from here? 🤔",
    description: (
      <>
        I still enjoy exploring — but now, I'm focusing on applying my skills to
        create <strong>measurable impact</strong>. I began engineering for the
        University of Toronto Machine Intelligence Student Team (UTMIST),
        experimenting with LLMs and transformers, and building this very website
        from scratch (using what I’ve learned as an intern). I want to keep
        pushing myself beyond what I thought I was capable of learning, in a way
        that benefits others.
      </>
    ),
    img: imgMap["../assets/timeline/view.avif"],
  },
];

// ---- timeline with elbow connectors ----
const Timeline = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [paths, setPaths] = useState<string[]>([]);

  const computePaths = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const crect = container.getBoundingClientRect();
    const GUTTER = 100; // distance from viewport edge for the vertical trunk
    const R = 12; // elbow radius in px

    const nextPaths: string[] = [];

    for (let i = 0; i < itemRefs.current.length - 1; i++) {
      const a = itemRefs.current[i];
      const b = itemRefs.current[i + 1];
      if (!a || !b) continue;

      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();

      const aLeftSide = i % 2 === 0; // your alternating rule

      // positions relative to container
      const aMidY = ar.top - crect.top + ar.height / 2;
      const bMidY = br.top - crect.top + br.height / 2;

      const aEdgeX = aLeftSide
        ? ar.left - crect.left // left edge of card A
        : ar.right - crect.left; // right edge of card A

      const bEdgeX =
        (i + 1) % 2 === 0
          ? br.left - crect.left // left edge of card B
          : br.right - crect.left; // right edge of card B

      // vertical trunk near the outer page edge
      const gutterX = aLeftSide ? GUTTER : crect.width - GUTTER;

      // We’ll leave room for rounded corners (R) before turning
      const h1 = aLeftSide ? gutterX + R : gutterX - R; // stop before corner 1
      // const h2 = aLeftSide ? gutterX + R : gutterX - R; // after vertical, stop before corner 2
      const dirToNext = aLeftSide ? +1 : -1; // horizontal direction from trunk toward next card

      // Build rounded-elbow path with two small quadratic curves
      // 1) Move from card edge → almost to gutter
      // 2) Curve into vertical
      // 3) Vertical down near next
      // 4) Curve into horizontal
      // 5) Horizontal into next card edge
      const d = [
        `M ${aEdgeX} ${aMidY}`, // start at card A edge
        `H ${h1}`, // go sideways toward gutter (leave R for the curve)
        `Q ${gutterX} ${aMidY} ${gutterX} ${aMidY + R}`, // rounded corner into vertical
        `V ${bMidY - R}`, // down near next
        `Q ${gutterX} ${bMidY} ${gutterX + dirToNext * R} ${bMidY}`, // rounded corner into horizontal
        `H ${bEdgeX}`, // into card B edge
      ].join(" ");

      nextPaths.push(d);
    }

    setPaths(nextPaths);
  }, []);

  useLayoutEffect(() => {
    computePaths();
    const onResize = () => computePaths();
    window.addEventListener("resize", onResize);

    // Recompute after images load (in case size changes)
    const imgs = Array.from(
      containerRef.current?.querySelectorAll("img") ?? []
    );
    let pending = imgs.length;
    if (pending === 0) computePaths();
    imgs.forEach((img) => {
      if (img.complete) {
        if (--pending === 0) computePaths();
      } else {
        img.addEventListener("load", () => {
          if (--pending === 0) computePaths();
        });
        img.addEventListener("error", () => {
          if (--pending === 0) computePaths();
        });
      }
    });

    return () => window.removeEventListener("resize", onResize);
  }, [computePaths]);

  return (
    <section
      id="TimelineBio"
      className="w-full py-12 bg-neutral-950 text-white"
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <h2 className="text-4xl mb-12 font-semibold text-center">But how did we get here?</h2>

        <div ref={containerRef} className="relative w-full">
          {/* center spine (optional now) */}
          <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

          {/* SVG overlay for elbows */}
          <svg
            className="absolute inset-0 pointer-events-none"
            width="100%"
            height="100%"
          >
            {paths.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="rgb(129 140 248 / 0.9)" // indigo-400-ish
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>

          <div className="space-y-10">
            {timelineData.map((item, idx) => {
              const leftSide = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className={`relative flex ${
                    leftSide ? "justify-start" : "justify-end"
                  }`}
                >
                  {/* Full-bleed background card with scrim to reduce negative space */}
                  <motion.div
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`
                      relative overflow-hidden rounded-2xl shadow-lg
                      w-[min(60rem,90vw)]
                      min-h-[260px] md:min-h-[320px]
                      ${
                        leftSide
                          ? "mr-[min(2.5rem,4vw)]"
                          : "ml-[min(2.5rem,4vw)]"
                      }
                    `}
                    style={{
                      backgroundImage: `url(${item.img as string})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* side scrim */}
                    <div
                      className={`
                        absolute inset-y-0 w-[60%] md:w-[20%]
                        ${
                          leftSide
                            ? "left-0 bg-gradient-to-r"
                            : "right-0 bg-gradient-to-l"
                        }
                        from-neutral-950/85 via-neutral-900/70 to-transparent
                      `}
                    />
                    <div
                      className={`
                            absolute inset-y-0 w-[48%] md:w-[60%]
                            ${
                              leftSide
                                ? "left-0 bg-gradient-to-r"
                                : "right-0 bg-gradient-to-l"
                            }
                            from-neutral-950/80 via-neutral-900/55 to-transparent
                            backdrop-blur-sm md:backdrop-blur-md
                        `}
                      style={{
                        WebkitMaskImage: `linear-gradient(${
                          leftSide ? "to right" : "to left"
                        }, black 85%, transparent)`,
                        maskImage: `linear-gradient(${
                          leftSide ? "to right" : "to left"
                        }, black 85%, transparent)`,
                      }}
                    />

                    {/* text content */}
                    <div
                      className={`
                        relative z-10 p-6 md:p-8
                        ${
                          leftSide
                            ? "max-w-[560px]"
                            : "max-w-[560px] ml-auto text-right"
                        }
                      `}
                    >
                      <div className="text-xs text-indigo-300 font-mono mb-1">
                        {item.year}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-white/85 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
