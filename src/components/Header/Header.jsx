import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const ddRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!ddRef.current) return;
      if (!ddRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const goType = (type) => {
    setCatOpen(false);
    navigate(`/catalog?type=${type}`);
  };

  const navLink =
    "inline-flex items-center rounded-lg px-4 py-3 text-[18px] md:text-[20px] " +
    "font-medium tracking-[-0.02em] text-slate-500 hover:text-slate-900 transition-colors";

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-shadow",
        scrolled && "shadow-md"
      )}
      style={{ backgroundColor: "var(--page-bg)" }} 
    >
      <div
        className={cx(
          "container-max",
          "grid grid-cols-[auto,1fr,auto] items-center gap-x-8",
          "py-3"
        )}
      >
        <Link to="/" className="block">
          <img
            src="/logo.svg"
            alt="VMI"
            className="block w-[147px] h-[52px]"
            width={147}
            height={52}
          />
        </Link>

        <nav className="flex items-center gap-8">
          <Link to="/" className={navLink}>Главная</Link>

          <div className="relative" ref={ddRef}>
            <button
              type="button"
              onClick={() => setCatOpen((v) => !v)}
              aria-expanded={catOpen}
              className={cx(navLink, "gap-1")}
            >
              Каталог
              <svg viewBox="0 0 24 24" fill="none" className={cx("h-4 w-4 transition", catOpen && "rotate-180")}>
                <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {catOpen && (
              <div
                role="menu"
                className="absolute left-0 mt-3 w-64 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg z-50"
              >
                {[
                  ["Топливные фильтры", "fuel"],
                  ["Масляные фильтры", "oil"],
                  ["Воздушные фильтры", "air"],
                  ["Насосы", "pump"],
                ].map(([label, type]) => (
                  <button
                    key={type}
                    role="menuitem"
                    onClick={() => goType(type)}
                    className="block w-full px-4 py-3 text-left text-[15px] hover:bg-slate-50"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" className={navLink}>О компании</Link>
        </nav>

        <button
          type="button"
          data-open-contact
          className="inline-flex h-11 items-center justify-center rounded-lg
                     border border-orange-500 px-5 text-[15px] font-medium
                     text-orange-600 transition-colors hover:bg-orange-50
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          Связаться с менеджером
        </button>
      </div>
    </header>
  );
}
