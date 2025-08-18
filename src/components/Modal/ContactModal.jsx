import { useMemo, useState } from "react";
import Modal from "./Modal";

function normalizeDigits(v) {
  return (v || "").replace(/\D+/g, "");
}

function validate(form) {
  const errors = {};

  if (form.name.trim()) {
    const ok = /^[A-Za-zА-Яа-яЁё\s-]{2,}$/.test(form.name.trim());
    if (!ok) errors.name = "Введите только буквы (минимум 2 символа)";
  } else {
    errors.name = "Заполните это поле.";
  }

  if (form.phone.trim()) {
    const d = normalizeDigits(form.phone);
    const ok = d.length === 11 && d[0] === "7";
    if (!ok) errors.phone = "Неверный формат телефона";
  } else {
    errors.phone = "Заполните это поле.";
  }

  if (form.email.trim()) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (!ok) errors.email = "Введите корректный email";
  } else {
    errors.email = "Заполните это поле.";
  }

  if (!form.agree) errors.agree = "Требуется согласие";

  return errors;
}

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    agree: false,
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    message: false,
    agree: false,
  });

  const errors = useMemo(() => validate(form), [form]);

  const isValid =
    Object.keys(errors).length === 0 &&
    form.name &&
    form.phone &&
    form.email &&
    form.agree;

  const handleChange =
    (key) =>
    (e) => {
      const value = key === "agree" ? e.target.checked : e.target.value;
      setForm((s) => ({ ...s, [key]: value }));
      setTouched((t) => ({ ...t, [key]: true }));
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true,
      agree: true,
    });

    if (!isValid) return;

    // TODO: отправка формы (API / Telegram / почта)
    onClose?.();
  };

  const inputClass = (hasError) =>
    `mt-1 w-full h-11 rounded-md border px-3 outline-none
     ${hasError
       ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
       : "border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"}`;

  const textareaClass = (hasError) =>
    `mt-1 w-full rounded-md border px-3 py-2 outline-none
     ${hasError
       ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
       : "border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Оставить заявку"
      widthClass="w-[700px] max-w-[95vw]"
    >
      <p className="text-slate-600 mb-4">
        Менеджер перезвонит вам в ближайшее время
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <label className="block mb-3">
          <span className="text-xs text-slate-500">Имя</span>
          <input
            autoFocus
            className={inputClass(touched.name && !!errors.name)}
            value={form.name}
            onChange={handleChange("name")}
            placeholder="Иван"
          />
          {touched.name && errors.name && (
            <div className="text-xs text-red-500 mt-1">{errors.name}</div>
          )}
        </label>

        <label className="block mb-3">
          <span className="text-xs text-slate-500">Мобильный телефон</span>
          <input
            className={inputClass(touched.phone && !!errors.phone)}
            value={form.phone}
            onChange={handleChange("phone")}
            placeholder="+7 (___) ___-__-__"
          />
          {touched.phone && errors.phone && (
            <div className="text-xs text-red-500 mt-1">{errors.phone}</div>
          )}
        </label>

        <label className="block mb-3">
          <span className="text-xs text-slate-500">Email</span>
          <input
            type="email"
            className={inputClass(touched.email && !!errors.email)}
            value={form.email}
            onChange={handleChange("email")}
            placeholder="example@mail.ru"
          />
          {touched.email && errors.email && (
            <div className="text-xs text-red-500 mt-1">{errors.email}</div>
          )}
        </label>

        <label className="block mb-4">
          <span className="text-xs text-slate-500">Сообщение</span>
          <textarea
            rows={3}
            className={textareaClass(touched.message && !!errors.message)}
            value={form.message}
            onChange={handleChange("message")}
            placeholder="Коротко опишите задачу"
          />
          {touched.message && errors.message && (
            <div className="text-xs text-red-500 mt-1">{errors.message}</div>
          )}
        </label>

        <label className="flex items-start gap-2 text-sm text-slate-600 mb-4">
          <input
            type="checkbox"
            className={`mt-1 rounded border-slate-300 text-orange-500 focus:ring-orange-500
                        ${touched.agree && errors.agree ? "ring-1 ring-red-500" : ""}`}
            checked={form.agree}
            onChange={handleChange("agree")}
          />
          <span>Соглашаюсь с политикой конфиденциальности и договором оферты</span>
        </label>
        {touched.agree && errors.agree && (
          <div className="text-xs text-red-500 mb-3">{errors.agree}</div>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full h-11 rounded-md font-medium transition
                      ${isValid
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-slate-300 text-white cursor-not-allowed"}`}
        >
          Отправить
        </button>
      </form>
    </Modal>
  );
}
