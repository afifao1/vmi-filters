// FILE: src/App.jsx
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
  const [order, setOrder] = useState(null); // { id, title, img, qty }

  useEffect(() => {
    const onClick = (e) => {
      const btn = e.target.closest("[data-open-contact]");
      if (!btn) return;

      const p = {
        id: btn.dataset.pId ? Number(btn.dataset.pId) : undefined,
        title: btn.dataset.pTitle || undefined,
        img: btn.dataset.pImg || undefined,
        qty: btn.dataset.pQty ? Number(btn.dataset.pQty) : 1,
      };

      setOrder(p.id || p.title ? p : null);
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
