import s from "./QualitySection.module.css";
import "./Advantages.css"; 

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

        <section className="advantages">
          <h2>Преимущества</h2>

          <div className="advantages-grid">
            <div className="advantages-item">
              <span>1</span>
              <p>Широкий ассортимент</p>
            </div>

            <div className="advantages-item">
              <span>2</span>
              <p>Проверенные бренды</p>
            </div>

            <div className="advantages-item center">
              <span>4,5</span>
              <p>Рейтинг Яндекс</p>
            </div>

            <div className="advantages-item">
              <span>3</span>
              <p>Опытные специалисты</p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
