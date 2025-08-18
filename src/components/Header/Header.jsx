import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.css";
import { cn } from "../../lib/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(s.wrapper, scrolled && s.scrolled)}>
      <div className={s.inner}>
        <img src="/logo.svg" alt="" style={{ width: 147, height: 52, display: "block" }} />

        <nav className={s.nav}>
          <Link className={s.navLink} to="/">Главная</Link>
          <a className={s.navLink} href="/#catalog">Каталог</a>
          <Link className={s.navLink} to="/about">О компании</Link>
        </nav>

        <a href="/#contact" className="btn-outline">Связаться с менеджером</a>
      </div>
    </header>
  );
}
