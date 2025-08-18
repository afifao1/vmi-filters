import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./Header.module.css";
import { cn } from "../../lib/cn";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const ddRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // закрываем дропдаун по клику вне
  useEffect(() => {
    const onDocClick = (e) => {
      if (!ddRef.current) return;
      if (!ddRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  // переход в каталог с типом в query
  const goType = (type) => {
    setCatOpen(false);
    navigate(`/catalog?type=${type}`);
  };

  return (
    <header className={cn(s.wrapper, scrolled && s.scrolled)}>
      <div className={s.inner}>
        <img src="/logo.svg" alt="VMI" style={{ width: 147, height: 52, display: "block" }} />

        <nav className={s.nav}>
          <Link className={s.navLink} to="/">Главная</Link>

          {/* ▼ Каталог с выпадушкой */}
          <div className="relative" ref={ddRef}>
            <button
              type="button"
              className={`${s.navLink} inline-flex items-center gap-1`}
              onClick={() => setCatOpen((v) => !v)}
              aria-expanded={catOpen}
            >
              Каталог
              <svg
                className={`w-4 h-4 transition ${catOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {catOpen && (
              <div
                className="absolute left-0 mt-3 w-64 rounded-md border border-slate-200 bg-white shadow-lg z-50"
                role="menu"
              >
                <button
                  className="w-full text-left px-4 py-3 hover:bg-slate-50"
                  onClick={() => goType("fuel")}
                  role="menuitem"
                >
                  Топливные фильтры
                </button>
                <button
                  className="w-full text-left px-4 py-3 hover:bg-slate-50"
                  onClick={() => goType("oil")}
                  role="menuitem"
                >
                  Масляные фильтры
                </button>
                <button
                  className="w-full text-left px-4 py-3 hover:bg-slate-50"
                  onClick={() => goType("air")}
                  role="menuitem"
                >
                  Воздушные фильтры
                </button>
                <button
                  className="w-full text-left px-4 py-3 hover:bg-slate-50"
                  onClick={() => goType("pump")}
                  role="menuitem"
                >
                  Насосы
                </button>
              </div>
            )}
          </div>

          <Link className={s.navLink} to="/about">О компании</Link>
        </nav>

        <button type="button" className="btn-outline" data-open-contact>
          Связаться с менеджером
        </button>
      </div>
    </header>
  );
}
