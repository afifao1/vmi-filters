import { useEffect, useState } from "react";
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
      <img
        src="/logo.svg"
        alt="VMI Filters"
        style={{ width: 147, height: 52, display: "block" }}
      />
        <nav className={s.nav}>
          <a className={s.navLink} href="#">Главная</a>
          <a className={s.navLink} href="#catalog">Каталог</a>
          <a className={s.navLink} href="#about">О компании</a>
        </nav>

        <a href="#contact" className={s.cta}>Связаться с менеджером</a>
      </div>
    </header>
  );
}
