// import { useState } from "react";
import AboutMe from "./components/AboutMe.tsx";
import Header from "./components/Header.tsx";
import ImageCarousel from "./components/ImageCarousel.tsx";
import InstitutionGrid from "./components/InstitutionGrid.tsx";
import ProjectShowcase from "./components/ProjectShowcase.tsx";
import FavBooks from "./components/FavBooks.tsx";
import ContactSection from "./components/ContactSection.tsx";
import Timeline from "./components/TimelineBio.tsx";
import Footer from "./components/Footer.tsx";
import NavLinks from "./components/NavLinks.tsx";
import AwardsSection from "./components/AwardSection.tsx";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
//import "./App.css";

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

const personalImages = Object.values(
  import.meta.glob(
    "./assets/carousel/personal/*.{avif,jpg,JPG,jpeg,png,webp}",
    {
      eager: true,
      as: "url",
    }
  )
);

const personalImagesSort = [...personalImages].sort(collator.compare);

const academicImages = Object.values(
  import.meta.glob(
    "./assets/carousel/academic/*.{avif,jpg,JPG,jpeg,png,webp}",
    {
      eager: true,
      as: "url",
    }
  )
);

function App() {
  return (
    <main className="font-sans">
      <NavLinks />
      <Header />
      <div className="space-y-4">
        <ImageCarousel images={personalImagesSort} speed={0.05} />
        <ImageCarousel images={academicImages} speed={0.05} reverse />
      </div>
      <InstitutionGrid />
      <AboutMe />
      <ProjectShowcase />
      <AwardsSection />
      <Timeline />
      <FavBooks />
      <ContactSection />
      <Footer />
    </main>
  );
}

export default App;
