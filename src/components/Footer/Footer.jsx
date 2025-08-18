import React from "react";
import s from "./Footer.module.css";
import bg from "../../../public/footer-bg2.svg";

const contact = {
  address:
    "г. Москва, Николоямский переулок, дом 4–6, строение 3, пом. IV, офис 3В",
  phones: ["8 (926) 255-68-50", "8 (495) 369-27-15"],
  email: "info@vmi-filtr.ru",
};

const links = [
  "Топливные фильтры",
  "Масляные фильтры",
  "Воздушные фильтры",
  "Насосы",
  "О компании",
];

export default function Footer() {
  return (
    <footer className={s["ft-footer"]}>
      {/* <div className={s["ft-bg"]} /> */}

      <img src={bg} className="absolute w-[100vw]  right-0"/>

      <div className={`container-max ${s["ft-inner"]}`}>
        <ul className={s["ft-pills"]}>
          {links.map((t) => (
            <li key={t}>
              <a href="#" className={s["ft-pill"]}>
                {t}
              </a>
            </li>
          ))}
        </ul>

        <div className={s["ft-contacts"]}>
          <div className={s["ft-col"]}>
            <div className={s["ft-colTitle"]}>Адрес:</div>
            <div className={s["ft-colText"]}>{contact.address}</div>
          </div>

          <div className={s["ft-col"]}>
            <div className={s["ft-colTitle"]}>Телефон:</div>
            <div className={s["ft-colText"]}>
              {contact.phones.map((p) => (
                <div key={p}>{p}</div>
              ))}
            </div>
          </div>

          <div className={s["ft-col"]}>
            <div className={s["ft-colTitle"]}>Почта:</div>
            <a
              className={`${s["ft-colText"]} ${s["ft-link"]}`}
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          </div>
        </div>
      </div>

      <div className={`container-max ${s["ft-bottom"]}`}>
        <img src="/footer-bg.svg" alt="VMI" className={s["ft-logo"]} />
        <a href="#" className={s["ft-policy"]}>
          Политика обработки персональных данных
        </a>
        <div className={s["ft-copy"]}>©2025 VMI. Все права защищены</div>
      </div>
    </footer>
  );
}
