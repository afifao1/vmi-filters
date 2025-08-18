import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";          
import FooterAbout from "./components/Footer/FooterAbout.jsx"; 
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";

export default function App() {
  const { pathname } = useLocation();
  const isAbout = pathname === "/about";

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {isAbout ? <FooterAbout /> : <Footer />}
    </>
  );
}
