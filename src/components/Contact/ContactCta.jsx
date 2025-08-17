import s from "./ContactCta.module.css";

export default function ContactCta() {
  return (
    <section id="contact" className={s.section}>
      <div className="container-max">
        <div className={s.grid}>
          <div className={s.left}>
            <h3 className={s.title}>
              Напишите нам <span className={s.accent}>прямо сейчас</span>
            </h3>

            <p className={s.subtitle}>
              Наши менеджеры свяжутся с вами в ближайшее время
            </p>

            <button className="btn-outline">Оставить заявку</button>

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
