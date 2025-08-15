import s from "./QualitySection.module.css";

const items = [
  "Широкий ассортимент",
  "Проверенные бренды",
  "Опытные специалисты",
  "4.5 Рейтинг Яндекс",
];

export default function QualitySection() {
  return (
    <section id="about" className={s.section}>
      <div className={s.wrap}>
        <div>
          <h3 className={s.title}>
            Гарантируем <span className={s.accent}>высокое качество</span> нашей продукции
          </h3>
          <p className={s.text}>
            Мы ориентируемся на долгосрочные партнерские отношения, поэтому поставляем высококачественные расходные материалы и комплектующие,
            помогаем подобрать оптимальные решения под задачи клиента, предоставляем сертификаты соответствия и консультируем на каждом этапе заказа.
          </p>
        </div>
        <div className={s.bullets}>
          {items.map((t) => (
            <div key={t} className={s.bullet}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
