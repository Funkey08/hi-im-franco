import AboutMe from "./AboutMe.tsx";
import Header from "./Header.tsx";
import ImageCarousel from "./ImageCarousel.tsx";
import InstitutionGrid from "./InstitutionGrid.tsx";
import ProjectShowcase from "./ProjectShowcase.tsx";
import FavBooks from "./FavBooks.tsx";
import ContactSection from "./ContactSection.tsx";
import Timeline from "./TimelineBio.tsx";
import Footer from "./Footer.tsx";
import NavLinks from "./NavLinks.tsx";
import AwardsSection from "./AwardSection.tsx";
import "./legacy.css";

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

const personalImages = Object.values(
  import.meta.glob<string>(
    "../assets/carousel/personal/*.{avif,jpg,JPG,jpeg,png,webp}",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  )
);

const personalImagesSort = [...personalImages].sort(collator.compare);

const academicImages = Object.values(
  import.meta.glob<string>(
    "../assets/carousel/academic/*.{avif,jpg,JPG,jpeg,png,webp}",
    {
      eager: true,
      query: "?url",
      import: "default",
    }
  )
);

/** The pre-2026 site, kept reachable at /legacy while the redesign replaces it section by section. */
function LegacyApp() {
  return (
    <main className="legacy font-sans">
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

export default LegacyApp;
