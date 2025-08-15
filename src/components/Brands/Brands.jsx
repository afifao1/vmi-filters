import s from "./Brands.module.css";

const logos = [
  { alt: "BIG FILTER", src: "https://dummyimage.com/120x40/ddd/000&text=BIG" },
  { alt: "Donaldson", src: "https://dummyimage.com/120x40/ddd/000&text=Don" },
  { alt: "MANN FILTER", src: "https://dummyimage.com/120x40/ddd/000&text=MANN" },
  { alt: "MASUMA", src: "https://dummyimage.com/120x40/ddd/000&text=MAS" },
  { alt: "MICRO", src: "https://dummyimage.com/120x40/ddd/000&text=MIC" },
  { alt: "AMC", src: "https://dummyimage.com/120x40/ddd/000&text=AMC" },
];

export default function Brands() {
  return (
    <section className={s.section}>
      <h3 className={s.header}>Сотрудничаем с проверенными брендами</h3>
      <div className={s.grid}>
        {logos.map((l) => (
          <div key={l.alt} className={s.logoWrap}>
            <img className={s.logo} src={l.src} alt={l.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}