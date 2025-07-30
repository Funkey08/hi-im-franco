import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import face from "../assets/face.JPG";

const roleList = [
  { label: "🧠 data scientist...", color: "text-indigo-300" },
  { label: "📊 statistical analyst...", color: "text-gray-300" },
  { label: "💻 software developer...", color: "text-blue-300" },
  { label: "🧬 biotech researcher...", color: "text-green-300" },
  { label: "🚀 sci-fi enthusiast...", color: "text-pink-300" },
];

const delay = 3000;

const Header = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roleList.length);
    }, delay);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-14 pb-5 w-full text-white">
      <div className="w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-30">
        {/* Text Section */}
        <div className="flex-[70%] text-left">
          <h2 className="text-[50px] mb-1 leading-[1.5]">Hi! My name is</h2>
          <div className="text-[70px] font-bold mb-1 leading-[1.5]">
            Franco Miguel Valencia,
          </div>
          <h2 className="text-[50px] text-white leading-[1.5] flex gap-2 items-center">
            a{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={`inline-block ml-2 ${roleList[index].color}`}
              >
                {roleList[index].label}
              </motion.span>
            </AnimatePresence>
          </h2>
          <h2 className="text-[30px] italic  mt-5 leading-[1.5]">
            ...and I am passionate about making data{" "}
            <span className="font-bold">interpretable</span>,{" "}
            <span className="font-bold">accessible</span>, and{" "}
            <span className="font-bold">useful</span> for driving positive
            social change.
          </h2>
        </div>

        {/* Image Section */}
        <div className="relative flex-[30%] hidden md:flex justify-end relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent z-10" />
          <img
            src={face}
            alt="Franco's portrait"
            className="w-full max-w-md h-auto relative z-0 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
