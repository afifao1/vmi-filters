import Hero from "../components/Hero/Hero.jsx";
import CategoriesAccordion from "../components/Categories/CategoriesAccordion.jsx";
import Brands from "../components/Brands/Brands.jsx";
import QualitySection from "../components/Quality/QualitySection.jsx";
import ContactCta from "../components/Contact/ContactCta.jsx";

export default function Home() {
  return (
    <main>
      <Hero />
      <CategoriesAccordion />
      <Brands />
      <QualitySection />
      <ContactCta />
    </main>
  );
}
