import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import CatalogPage from "./pages/Catalog/CatalogPage.jsx";
import FooterAbout from "./components/Footer/FooterAbout.jsx";
import ContactModal from "./components/Modal/ContactModal.jsx";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [order, setOrder] = useState(null); // { title, img, qty }

  useEffect(() => {
    const onClick = (e) => {
      const trigger = e.target.closest("[data-open-contact]");
      if (!trigger) return;

      if (trigger.tagName === "A") e.preventDefault();

      const title = trigger.getAttribute("data-p-title") || "";
      const img = trigger.getAttribute("data-p-img") || "";

      // если нажали «связаться с менеджером» (без товара) — просто откроем форму
      setOrder(title ? { title, img, qty: 1 } : null);
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
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <FooterAbout />

      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        order={order}
        setOrder={setOrder}
      />
    </>
  );
}
