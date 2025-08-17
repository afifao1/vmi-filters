import s from "./ContactCta.module.css";

export default function ContactCta() {
  return (
    <section id="contact" className={s.wrap}>
      <div className="container-max">
        <div className={s.gridWrap}>
          <div className={s.left}>
            <h3 className={s.title}>
              Напишите нам <span className={s.accent}>прямо сейчас</span>
            </h3>

            <p className={s.subtitle}>
              Наши менеджеры свяжутся с вами в ближайшее время
            </p>

            <a href="#"
               className={s.outlineBtn}
               onClick={(e) => e.preventDefault()}>
              Оставить заявку
            </a>
          </div>

          <div className={s.right}>
            <img
              src="/images/contact.png"
              alt="Фильтры"
              width={481}
              height={439}
              className={s.image}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
