import eeg from "../assets/projects/eeg.avif";
// import connectionsMap from "../assets/projects/connections_map.avif";
import apathy from "../assets/projects/apathy.avif";
import mhPaper from "../assets/projects/mh_paper.avif";
import mhFigure from "../assets/projects/mh_figure.avif";
import numerosity from "../assets/projects/numerosity.avif";
import bibliolinguist from "../assets/projects/bibliolinguist.avif";
import breastShap from "../assets/projects/breast_shap.avif";

const projects = [
  {
    title: "Automated Connectivity Analysis Pipeline",
    image: eeg,
    image_height: "h-60",
    // second_image: connectionsMap,
    // second_image_height: "h-60",
    description:
      "An end-to-end pipeline for neuroimaging time-series analysis with built-in preprocessing, data wrangling, and analysis for classifying functional connectivity features from an EEG dataset.",
    tools: [
      "Python",
      "scikit-learn",
      "pandas",
      "NumPy",
      "PyTorch",
      "MNE-Python",
      "RNNs",
    ],
    span: "col-span-2 row-span-1",
  },
  {
    title: "BiblioLinguist 📚",
    image: bibliolinguist,
    image_height: "h-55",
    description:
      "A pure Java-based language learning app using AI-generated quizzes. Includes a custom Flesch-Kinkaid unsupervised learning algorithm to assess article readability and user performance.",
    tools: ["Java", "Rest APIs", "OpenAI", "GPT-3.5"],
    span: "col-span-1 row-span-1",
  },
  {
    title:
      "CHIS Cross-Racial Study for Mental Health Risk Factors in Immigrants",
    image: mhPaper,
    second_image: mhFigure,
    image_height: "h-80",
    second_image_height: "h-60",
    description:
      "An in-progress paper with disaggregated CHIS data to study the effects of acculturation-related variables across races on mental distress. Used an iterative model-building approach to assess the effects of different predictors on effect sizes and statistical significance.",
    tools: ["R", "tidyverse", "dplyr", "ggplot2", "Survey package"],
    span: "col-span-1 row-span-2",
  },
  {
    title: "Numerosity Test",
    image: numerosity,
    image_height: "h-60",
    description:
      "An offline, portable version of a numerosity test to test numerical cognition and intuition with built-in data storage and JSON downloading. A more thorough online version, though private, combines AWS, MySQL, and automated pipelines for data cleaning and logging.",
    tools: ["TypeScript", "HTML / CSS", "AWS", "MySQL", "React", "Electron"],
    span: "col-span-2 row-span-1",
  },
  {
    title: "Interpretable Breast Cancer Detection",
    image: breastShap,
    image_height: "h-50",
    description:
      "A project leveraging classical machine learning models with an emphasis on interpretability and performance.",
    tools: [
      "Python",
      "R",
      "SHAP",
      "LIME",
      "scikit-learn",
      "MLPs",
      "XGBoost",
      "LightGBM",
    ],
    span: "col-span-1 row-span-1",
  },
  {
    title: "Apathy Correlations With Cognitive Adjustment Scores",
    image: apathy,
    image_height: "h-50",
    description:
      "Exploratory analysis with large patient datasets. Identified correlations between patient apathy and cognitive subscales.",
    tools: ["R", "MySQL", "scikit-learn", "pandas", "NumPy"],
    span: "col-span-1 row-span-1",
  },
];

const ProjectShowcase = () => {
  return (
    <section id="ProjectShowcase" className="w-full py-20 px-4">
      <h2 className="text-white text-4xl pl-30 pb-6 text-left">
        Some things I've done...
      </h2>
      <div className="grid grid-cols-3 grid-rows-3 gap-4 max-w-[90rem] mx-auto">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className={`bg-neutral-800 rounded-2xl p-4 text-white flex flex-col justify-between shadow-lg transition duration-300 transform hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] ${proj.span}`}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4">{proj.title}</h3>
              <img
                src={proj.image}
                alt={proj.title}
                className={`rounded-lg w-full ${proj.image_height} object-cover mb-3`}
              />
              {/* Optional second image */}
              {proj.second_image && (
                <img
                  src={proj.second_image}
                  alt={`${proj.title} - extra`}
                  className={`rounded-lg w-full object-cover mb-3 ${proj.second_image_height}`}
                />
              )}
              <p className="text-sm mb-2 tex-white/80">{proj.description}</p>
            </div>
            <div className="flex gap-2m-4 gap-y-2 flex-wrap">
              {proj.tools.map((tool, toolIdx) => (
                <span
                  key={toolIdx}
                  className="text-xs bg-neutral-700 mr-2 px-2 py-1 rounded-md"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-white text-1 pt-10 font-boldmb-10 text-center">
        ...with more on the way 😄
      </h2>
    </section>
  );
};

export default ProjectShowcase;
