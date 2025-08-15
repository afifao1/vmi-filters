import { useState } from "react";
import s from "./ContactForm.module.css";

export default function ContactForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="section">
      <div className="container-max grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold">
            Напишите нам <span style={{ color: "var(--brand)" }}>прямо сейчас</span>
          </h3>
          <p className="muted mt-2">Мы свяжемся с вами в ближайшее время</p>

          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.field}>
              <label className={s.label} htmlFor="name">Имя</label>
              <input
                id="name"
                name="name"
                type="text"
                className={s.input}
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                className={s.input}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className={s.field}>
              <label className={s.label} htmlFor="message">Сообщение</label>
              <textarea
                id="message"
                name="message"
                className={s.textarea}
                value={form.message}
                onChange={handleChange}
                placeholder="Кратко опишите задачу"
                required
              />
            </div>

            <button type="submit" className="btn-primary px-4 py-2 rounded-md">
              Отправить
            </button>
          </form>
        </div>
        <img
          src="https://dummyimage.com/220x300/eeeeee/b3b3b3&text=%D0%A4%D0%B8%D0%BB%D1%8C%D1%82%D1%80%D1%8B"
          alt="Фильтры"
          className="justify-self-end w-40 md:w-56 h-auto rounded-2xl shadow"
        />
      </div>
    </section>
  );
}
