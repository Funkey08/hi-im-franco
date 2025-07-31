// import { useState } from "react";
import AboutMe from "./components/AboutMe.tsx";
import Header from "./components/Header.tsx";
import ImageCarousel from "./components/ImageCarousel.tsx";
import InstitutionGrid from "./components/InstitutionGrid.tsx";
import ProjectShowcase from "./components/ProjectShowcase.tsx";
import FavBooks from "./components/FavBooks.tsx";
import ContactSection from "./components/ContactSection.tsx";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//import "./App.css";

const personalImages = Object.values(
  import.meta.glob("./assets/carousel/personal/*.{jpg,jpeg,png,webp}", {
    eager: true,
    as: "url",
  })
);
const academicImages = Object.values(
  import.meta.glob("./assets/carousel/academic/*.{jpg,jpeg,png,webp}", {
    eager: true,
    as: "url",
  })
);

function App() {
  return (
    <main className="font-sans">
      <Header />
      <div className="space-y-4">
        <ImageCarousel images={personalImages} speed={0.05} />
        <ImageCarousel images={academicImages} speed={0.05} reverse />
      </div>
      <InstitutionGrid />
      <AboutMe />
      <ProjectShowcase />
      <FavBooks />
      <ContactSection />
    </main>
  );
}

export default App;
