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
          alt="VMI Filter"
          className={s.logo}
          width={147}
          height={52}
        />

      <nav className={s.nav} aria-label="Главная навигация">
        <a className={s.navLink} href="#" aria-current="page">Главная</a>

        <a className={s.navLink} href="#catalog">
          Каталог
          <svg className={s.caret} viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <a className={s.navLink} href="#about">О компании</a>
      </nav>

        <a href="#contact" className="btn-outline">Связаться с менеджером</a>
      </div>
    </header>
  );
}
