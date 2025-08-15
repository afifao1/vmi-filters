import s from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={s.wrap}>
      <div className="container-max">
        <div className={s.gridWrap}>
          <div className={s.left}>
            <h1 className={s.h1}>Промышленные фильтры</h1>

            <ul className={s.bullets}>
              <li>Защищают двигатель</li>
              <li>Оптимизируют работу системы</li>
              <li>Обеспечивают долгосрочную эффективность</li>
            </ul>

            <a href="#catalog" className={s.circleCta}>Каталог</a>
          </div>

          <div className={s.right}>
            <img
              src="/images/filters.png"
              alt="Фильтры"
              width={1100}
              height={630}
              className={s.heroImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
