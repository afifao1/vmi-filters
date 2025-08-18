import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import FooterAbout from "./components/Footer/FooterAbout.jsx";

// просто подключаем саму модалку
import ContactModal from "./components/Modal/ContactModal.jsx";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  // ГЛОБАЛЬНЫЙ перехват кликов по data-open-contact
  useEffect(() => {
    const onClick = (e) => {
      const trigger = e.target.closest("[data-open-contact]");
      if (!trigger) return;

      // не даём ссылке перейти по href
      if (trigger.tagName === "A") e.preventDefault();

      setContactOpen(true);
    };

    // делегирование кликов на весь документ
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <FooterAbout />

      {/* одна модалка на всё приложение */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
