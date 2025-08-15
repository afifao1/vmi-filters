import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import CategoriesAccordion from "./components/Categories/CategoriesAccordion.jsx";
import Brands from "./components/Brands/Brands.jsx";
import QualitySection from "./components/Quality/QualitySection.jsx";
import ContactForm from "./components/Contact/ContactForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

export default function App() {
  const handleContactSubmit = (data) => {
    console.log("Contact form:", data);
    alert("Спасибо! Мы скоро свяжемся с вами.");
  };

  return (
    <>
      <Header />

      <main>
        <Hero />

        <CategoriesAccordion />

        <Brands />

        <QualitySection />

        <ContactForm onSubmit={handleContactSubmit} />
      </main>

      <Footer />
    </>
  );
}
