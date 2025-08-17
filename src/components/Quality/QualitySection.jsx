import s from "./QualitySection.module.css";

export default function QualitySection() {
  return (
    <section className={s.section} id="quality">
      <div className="container-max">
        <div className={s.top}>
          <h3 className={s.title}>
            Гарантируем <span className={s.accent}>высокое качество</span>
            <br /> нашей продукции
          </h3>

          <p className={s.text}>
            Мы ориентируемся на долгосрочные партнёрские отношения, поэтому
            поставляем высококачественные расходные материалы и комплектующие,
            помогаем подобрать оптимальные решения под задачи клиента,
            предоставляем сертификаты соответствия и консультируем на каждом
            этапе заказа.
          </p>
        </div>

        <h4 className={s.benefitsTitle}>Преимущества</h4>

        <ul className={s.circles}>
          <li className={s.circle}>
            <div className={s.num}>1</div>
            <div className={s.label}>Широкий<br />ассортимент</div>
          </li>

          <li className={s.circle}>
            <div className={s.num}>2</div>
            <div className={s.label}>Проверенные<br />бренды</div>
          </li>

          <li className={s.circle}>
            <div className={`${s.circle} ${s.circleHi}`}>
              <div className={s.numHi}>4.5</div>
              <div className={s.label}>Рейтинг Яндекс</div>
            </div>
          </li>

          <li className={s.circle}>
            <div className={s.num}>3</div>
            <div className={s.label}>Опытные<br />специалисты</div>
          </li>
        </ul>
      </div>
    </section>
  );
}
