import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Catalog from "./pages/Catalog.jsx";             
import FooterAbout from "./components/Footer/FooterAbout.jsx";
import ContactModal from "./components/Modal/ContactModal.jsx";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const onClick = (e) => {
      const trigger = e.target.closest("[data-open-contact]");
      if (!trigger) return;
      if (trigger.tagName === "A") e.preventDefault();
      setContactOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog />} />  
        <Route path="*" element={<Home />} />
      </Routes>

      <FooterAbout />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
