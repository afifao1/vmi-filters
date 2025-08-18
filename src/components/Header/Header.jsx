import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "./Header.module.css";
import { cn } from "../../lib/cn";
import { useContactModal } from "../../features/contact-modal/ContactModalProvider";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { open } = useContactModal(); // ← функция открытия модалки

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(s.wrapper, scrolled && s.scrolled)}>
      <div className={s.inner}>
        <img src="/logo.svg" alt="VMI" style={{ width: 147, height: 52, display: "block" }} />

        <nav className={s.nav}>
          <Link className={s.navLink} to="/">Главная</Link>
          <a className={s.navLink} href="/#catalog">Каталог</a>
          <Link className={s.navLink} to="/about">О компании</Link>
        </nav>

          <a href="#" className="btn-outline" data-open-contact>
            Связаться с менеджером
          </a>
          
      </div>
    </header>
  );
}
