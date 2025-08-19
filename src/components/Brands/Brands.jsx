const brands = [
  { src: "/brands/big.svg",       alt: "BIG Filter" },
  { src: "/brands/donaldson.svg", alt: "Donaldson" },
  { src: "/brands/mann.svg",      alt: "MANN Filter" },
  { src: "/brands/masuma.svg",    alt: "MASUMA" },
  { src: "/brands/micro.svg",     alt: "MICRO" },
  { src: "/brands/swc.svg",       alt: "SWC" },
];

export default function Brands() {
  return (
    <section className="py-14 md:py-16">
      <div className="container-max px-4 md:px-6 lg:px-8">
        <h3 className="text-slate-900 text-[34px] md:text-[44px] leading-[1.15] font-light tracking-[-0.01em] mb-8 md:mb-10">
          Сотрудничаем с проверенными брендами
        </h3>

          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 md:gap-6">
            {brands.map((b) => (
              <li
                key={b.alt}
                aria-label={b.alt}
                className="
                  h-[102px] w-full
                  rounded-xl bg-white
                  shadow-[0_6px_20px_rgba(16,24,40,0.06)]
                  border border-slate-200/60
                  flex items-center justify-center
                "
              >
                <img
                  src={b.src}
                  alt={b.alt}
                  loading="lazy"
                  className="block max-w-[86%] max-h-[72%] object-contain"
                />
              </li>
            ))}
          </ul>

      </div>
    </section>
  );
}
