import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

import FooterAbout from "./components/Footer/FooterAbout.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <FooterAbout />
    </>
  );
}
