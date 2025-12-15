import ursaTalk from "../assets/ursa_talk.JPG";

const AboutMe = () => {
  return (
    <section
      id="AboutMe"
      className="w-full px-10 md:px-40 pt-10 bg-neutral-900 text-white"
    >
      <div className="max-w-8xl mx-auto text-left">
        <div className="float-left mr-8 mb-4">
          <img
            src={ursaTalk}
            alt="Speaking at URSA"
            className="rounded-lg w-full md:w-150 h-auto object-cover"
          />
          <p className="text-base text-neutral-400 mt-2 italic max-w-150">
            I've had the privilege of sharing my journey in front of some of the
            largest student organizations in the country, including URSA, the
            largest undergraduate research association in Canada.
          </p>
        </div>
        <h2 className="text-4xl font-semibold mb-2">
          I still have much to learn...
        </h2>
        <p className="text-lg leading-relaxed text-neutral-300">
          <span className="font-semibold">
            {" "}
            <br />
            ...because my passion is using data to understand and improve the
            human experience. 💻
            <br />
            <br />
          </span>
          Ever since I joined a neurocomputational lab in my freshman year, I’ve
          been captivated by the power of{" "}
          <span className="font-semibold">
            statistics, machine learning, and data visualization
          </span>{" "}
          to turn complex information into clear and quantifiable metrics. Since
          then, I’ve pursued this passion beyond neuroscience across several
          domains — from computational social science and experimental design to
          biotechnology and digital health.
          <br />
          <br />
          <span className="text-2xl italic">
            The process of exploration is what excites me the most!
          </span>
          <br />
          <br />
          <span className="font-semibold">
            Technically, I work across the stack.
          </span>{" "}
          I’m experienced in{" "}
          <span className="font-semibold">
            Python, R, Java, SQL, JavaScript, and MATLAB,
          </span>{" "}
          and I regularly use analytical tools like{" "}
          <span className="font-semibold">
            Scikit-learn, Pandas, NumPy, PyTorch, Dplyr, and Seaborn.
          </span>{" "}
          I enjoy building interfaces and tools for exploring and interacting
          with data using{" "}
          <span className="font-semibold">
            React, Vite, TailwindCSS, Tableau,
          </span>{" "}
          and more.
          <br />
          <br />
          But more than anything, {" "}
          <span className="font-semibold">
            I want to keep learning!
          </span>{" "}
          When I’m not looking at numbers, you’ll probably find me reading
          sci-fi, watching anime, exploring a new jRPG, learning a song on the
          piano or guitar, creating digital art, or walking around outside (and
          staring at the clouds).
          <br />
          <br />I want to commit myself to using technology to improve human
          learning, health, business, and logistics. Thanks for coming to see me
          on my way! 😄
        </p>
      </div>
    </section>
  );
};

export default AboutMe;
