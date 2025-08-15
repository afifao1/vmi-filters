import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className="container-max grid md:grid-cols-3 gap-8">
        <div className={s.brand}>
          <img src="/logo.svg" alt="VMI" className={s.logo} />
        </div>

        <div>
          <h4 className={s.h4}>Категории</h4>
          <ul className={s.list}>
            <li><a href="#catalog">Топливные фильтры</a></li>
            <li><a href="#catalog">Масляные фильтры</a></li>
            <li><a href="#catalog">Воздушные фильтры</a></li>
            <li><a href="#catalog">Насосы</a></li>
          </ul>
        </div>

        <div>
          <h4 className={s.h4}>Контакты</h4>
          <ul className={s.list}>
            <li>г. Ижевск, Ижевский пр-д, дом 4</li>
            <li>Пн–Пт: 9:00–18:00</li>
            <li><a href="tel:+73412999999">+7 (3412) 999-999</a></li>
            <li><a href="mailto:info@vmi.example">info@vmi.example</a></li>
          </ul>
        </div>
      </div>

      <div className={s.bottom}>
        <div className="container-max flex flex-col md:flex-row gap-2 md:gap-0 items-center justify-between">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} VMI. Все права защищены.</p>
          <p className="text-xs text-gray-400">Гарантируем высокое качество нашей продукции</p>
        </div>
      </div>
    </footer>
  );
}
