import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import s from "./CategoriesAccordion.module.css";
import { cn } from "../../lib/cn";

const categories = [
  "Топливные фильтры",
  "Масляные фильтры",
  "Воздушные фильтры",
  "Насосы",
];

export default function CategoriesAccordion() {
  const [open, setOpen] = useState(null);

  return (
    <section id="catalog" className={s.section}>
      <div className="container-max">
        <p className={s.header}>
          Предоставляем <span className={s.count}>более 100</span> наименований продукции по следующим категориям
        </p>

        <div>
          {categories.map((name, i) => (
            <div key={name} className={s.item}>
              <button className={s.row} onClick={() => setOpen(open === i ? null : i)}>
                <span>{name}</span>
                <FiArrowUpRight />
              </button>
              <div className={cn(s.panel, open === i ? s.panelOpen : s.panelClosed)}>
                <p className={s.desc}>Описание категории «{name}». Контент по ТЗ/каталогу.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
