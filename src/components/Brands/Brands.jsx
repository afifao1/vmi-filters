import { useState, useEffect } from "react";
import api from "../../api";

const fallbackBrands = [
  { id: 1, name: "BIG Filter", image: "/brands/big.svg" },
  { id: 2, name: "Donaldson", image: "/brands/donaldson.svg" },
  { id: 3, name: "MANN Filter", image: "/brands/mann.svg" },
  { id: 4, name: "MASUMA", image: "/brands/masuma.svg" },
  { id: 5, name: "MICRO", image: "/brands/micro.svg" },
  { id: 6, name: "SWC", image: "/brands/swc.svg" },
];

export default function Brands() {
  const [brands, setBrands] = useState(fallbackBrands);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    api
      .get("/brands")
      .then(({ data }) => {
        if (!cancelled) {
          const apiBrands = Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data)
              ? data
              : [];
          if (apiBrands.length > 0) {
            setBrands(apiBrands);
          }
        }
      })
      .catch((error) => {
        console.warn("Failed to load brands from API:", error.message);
        // Keep fallback brands on error
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="py-14 md:py-16">
      <div className="container-max px-4 md:px-6 lg:px-8">
        <h3 className="text-slate-900 text-[34px] md:text-[44px] leading-[1.15] font-light tracking-[-0.01em] mb-8 md:mb-10">
          Сотрудничаем с проверенными брендами
        </h3>

        {loading && (
          <div className="text-slate-500 mb-6">Загрузка брендов…</div>
        )}

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 md:gap-6">
          {brands.map((brand) => (
            <li
              key={brand.id}
              aria-label={brand.name}
              className="
                h-[102px] w-full
                rounded-xl bg-white
                shadow-[0_6px_20px_rgba(16,24,40,0.06)]
                border border-slate-200/60
                flex items-center justify-center
              "
            >
              <img
                src={brand.image}
                alt={brand.name}
                loading="lazy"
                className="block max-w-[86%] max-h-[72%] object-contain"
                onError={(e) => {
                  // If API image fails, try fallback
                  const fallback = fallbackBrands.find(
                    (f) => f.name === brand.name,
                  );
                  if (fallback && e.target.src !== fallback.image) {
                    e.target.src = fallback.image;
                  }
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
