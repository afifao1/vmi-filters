import s from "./Brands.module.css";

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
    <section className={s.section}>
      <div className="container-max">
        <h3 className={s.title}>Сотрудничаем с проверенными брендами</h3>

        <ul className={s.row}>
          {brands.map((b) => (
            <li key={b.alt} className={s.card} aria-label={b.alt}>
              <img
                src={b.src}
                alt={b.alt}
                width={204}
                height={102}
                className={s.logo}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
