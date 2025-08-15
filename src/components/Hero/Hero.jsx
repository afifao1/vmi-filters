import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={s.section}>
      <div className={s.grid}>
        <div>
          <h1 className={s.title}>Промышленные фильтры</h1>
          <ul className={s.list}>
            <li>— Защищают двигатель</li>
            <li>— Оптимизируют работу системы</li>
            <li>— Обеспечивают долгосрочную эффективность</li>
          </ul>
          <button className={s.cta}>Каталог</button>

          <div className={s.badgeRow}>
            <span className={s.badge}><i className={s.badgeDot} /> Фильтры</span>
            <span className={s.badge}><i className={s.badgeDot} /> Насосы</span>
            <span className={s.badge}><i className={s.badgeDot} /> Масла</span>
          </div>
        </div>
        <img src="https://via.placeholder.com/520x380" alt="Фильтры" className={s.image} />
      </div>
    </section>
  );
}