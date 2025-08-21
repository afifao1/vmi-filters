import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";

/* API base: берём из VITE_API_URL, иначе http://127.0.0.1:8000 */
const API_BASE = (import.meta?.env?.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

/* Утилиты -------------------------------------------------- */
const initialForm = { name: "", phone: "", email: "", message: "", agree: false };
const initialTouched = { name: false, phone: false, email: false, message: false, agree: false };

function digits(v = "") {
  return v.replace(/\D+/g, "");
}

// простая маска +7 (XXX) XXX-XX-XX (разрешаем начинать с 8 → превращаем в 7)
function formatPhone(v) {
  const d = digits(v).replace(/^8/, "7");
  let out = "+7";
  if (d.length > 1) {
    out += " (" + d.slice(1, 4);
    if (d.length >= 5) out += ") " + d.slice(4, 7);
    if (d.length >= 8) out += "-" + d.slice(7, 9);
    if (d.length >= 10) out += "-" + d.slice(9, 11);
  }
  return out;
}

function validate(form) {
  const e = {};

  // Имя — только буквы, минимум 2 символа
  if (!form.name.trim()) e.name = "Заполните это поле.";
  else if (!/^[A-Za-zА-Яа-яЁё\s-]{2,}$/.test(form.name.trim()))
    e.name = "Введите только буквы (минимум 2 символа)";

  // Телефон — 11 цифр и начинается на 7 (соответствует E.164 для RU: +7XXXXXXXXXX)
  if (!form.phone.trim()) e.phone = "Заполните это поле.";
  else {
    const d = digits(form.phone);
    if (!(d.length === 11 && d[0] === "7")) e.phone = "Неверный формат телефона";
  }

  // Email
  if (!form.email.trim()) e.email = "Заполните это поле.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
    e.email = "Введите корректный email";

  if (!form.agree) e.agree = "Требуется согласие";

  return e;
}

/* Компонент ------------------------------------------------ */
export default function ContactModal({
  open,
  onClose,
  order,           // { id?, title, img?, qty? }
  setOrder,        // setState для qty, если используете
}) {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState(initialTouched);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [okId, setOkId] = useState(null);

  // очистить форму при каждом закрытии модалки
  useEffect(() => {
    if (!open) {
      setForm(initialForm);
      setTouched(initialTouched);
      setSubmitting(false);
      setSubmitError("");
      setOkId(null);
    }
  }, [open]);

  // ESC закрывает модалку
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const errors = useMemo(() => validate(form), [form]);
  const isValid =
    Object.keys(errors).length === 0 &&
    form.name &&
    form.phone &&
    form.email &&
    form.agree;

  /* хэндлеры */
  const markTouched = (key) => setTouched((t) => ({ ...t, [key]: true }));

  const handleChange = (key) => (e) => {
    let value = key === "agree" ? e.target.checked : e.target.value;
    // маска телефона
    if (key === "phone") value = formatPhone(value);
    setForm((s) => ({ ...s, [key]: value }));
    // считаем поле "потроганным" сразу при первом вводе/фокусе,
    // чтобы ошибка появлялась немедленно
    markTouched(key);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // на всякий случай отметим все поля "потроганными"
    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true,
      agree: true,
    });
    if (!isValid || submitting) return;

    setSubmitting(true);
    setSubmitError("");
    setOkId(null);

    // формируем payload для API
    const isProduct = !!order?.title;
    const payload = {
      type: isProduct ? "product" : "contact",
      name: form.name.trim(),
      phone: form.phone.trim(), // +7 ХХХ
      email: form.email.trim(),
      message: form.message?.trim() || null,
      product_id: isProduct ? (order?.id ?? null) : null,
      product_title: isProduct ? (order?.title ?? null) : null,
      quantity: isProduct ? (order?.qty || 1) : null,
      source: isProduct ? "catalog" : "hero",
      source_url: window.location.href,
    };

    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", 
        },
        body: JSON.stringify(payload),
      });

      const ct = res.headers.get("content-type") || "";
      const data = ct.includes("application/json") ? await res.json() : null;

      if (!res.ok) {
        // покажем первую ошибку если есть
        const msg =
          data?.message ||
          data?.errors?.email?.[0] ||
          data?.errors?.phone?.[0] ||
          data?.errors?.name?.[0] ||
          "Не удалось отправить заявку";
        setSubmitError(msg);
        setSubmitting(false);
        return;
      }

      // успех — закрываем и чистим
      setOkId(data?.id || null);
      onClose?.();
      setOrder?.(order ? { ...order, qty: 1 } : order);
    } catch (err) {
      setSubmitError("Ошибка сети. Попробуйте позже.");
      setSubmitting(false);
    }
  };

  // количество (если заказ пришёл из карточки)
  const qty = order?.qty ?? 1;
  const dec = () =>
    setOrder?.((o) => (o ? { ...o, qty: Math.max(1, (o.qty || 1) - 1) } : o));
  const inc = () =>
    setOrder?.((o) => (o ? { ...o, qty: (o.qty || 1) + 1 } : o));

  const inputCls = (err, extra = "") =>
    `mt-1 w-full h-11 rounded-md border px-3 outline-none transition
     ${err ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
           : "border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"} ${extra}`;

  const textareaCls = (err) =>
    `mt-1 w-full min-h-[90px] rounded-md border px-3 py-2 outline-none transition
     ${err ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
           : "border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"}`;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Оставить заявку"
      widthClass="w-[760px] max-w-[95vw]"
    >
      <p className="text-slate-600 mb-5">
        Менеджер перезвонит вам в ближайшее время
      </p>

      {/* Блок товара с количеством (если заказ пришёл из каталога) */}
      {order?.title && (
        <div className="mb-6 flex items-center justify-between rounded-md border border-orange-100 bg-orange-50 px-4 py-3">
          <div className="flex items-center gap-4">
            {order.img && (
              <img src={order.img} alt="" className="h-12 w-12 object-contain" />
            )}
            <div className="text-[15px] md:text-[16px] font-semibold text-slate-900 leading-snug">
              {order.title}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={dec}
              className="h-9 w-9 rounded-md bg-orange-500 text-white text-lg leading-none hover:bg-orange-600"
              aria-label="Уменьшить"
            >
              –
            </button>
            <input
              value={qty}
              onChange={(e) => {
                const v = Math.max(1, parseInt(e.target.value || "1", 10));
                setOrder?.((o) => (o ? { ...o, qty: v } : o));
              }}
              className="h-9 w-12 rounded-md border border-slate-300 text-center"
              inputMode="numeric"
            />
            <button
              type="button"
              onClick={inc}
              className="h-9 w-9 rounded-md bg-orange-500 text-white text-lg leading-none hover:bg-orange-600"
              aria-label="Увеличить"
            >
              +
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Имя */}
        <label className="block mb-4">
          <span className="text-xs text-slate-500">Имя</span>
          <input
            autoFocus
            className={inputCls(touched.name && !!errors.name)}
            value={form.name}
            onFocus={() => markTouched("name")}
            onChange={handleChange("name")}
            placeholder="Иван"
            aria-invalid={!!(touched.name && errors.name)}
          />
          {touched.name && errors.name && (
            <div className="text-xs text-red-500 mt-1">{errors.name}</div>
          )}
        </label>

        {/* Телефон */}
        <label className="block mb-4">
          <span className="text-xs text-slate-500">Мобильный телефон</span>
          <input
            className={inputCls(touched.phone && !!errors.phone)}
            value={form.phone}
            onFocus={() => markTouched("phone")}
            onChange={handleChange("phone")}
            placeholder="+7 (___) ___-__-__"
            inputMode="tel"
            aria-invalid={!!(touched.phone && errors.phone)}
          />
          {touched.phone && errors.phone && (
            <div className="text-xs text-red-500 mt-1">{errors.phone}</div>
          )}
        </label>

        {/* Email */}
        <label className="block mb-4">
          <span className="text-xs text-slate-500">Email</span>
          <input
            type="email"
            className={inputCls(touched.email && !!errors.email)}
            value={form.email}
            onFocus={() => markTouched("email")}
            onChange={handleChange("email")}
            placeholder="example@mail.ru"
            aria-invalid={!!(touched.email && errors.email)}
          />
          {touched.email && errors.email && (
            <div className="text-xs text-red-500 mt-1">{errors.email}</div>
          )}
        </label>

        {/* Сообщение */}
        <label className="block mb-4">
          <span className="text-xs text-slate-500">Сообщение</span>
          <textarea
            rows={3}
            className={textareaCls(touched.message && !!errors.message)}
            value={form.message}
            onFocus={() => markTouched("message")}
            onChange={handleChange("message")}
            placeholder="Коротко опишите задачу"
            aria-invalid={!!(touched.message && errors.message)}
          />
          {touched.message && errors.message && (
            <div className="text-xs text-red-500 mt-1">{errors.message}</div>
          )}
        </label>

        {/* Согласие */}
        <label className="flex items-start gap-2 text-sm text-slate-600 mb-2">
          <input
            type="checkbox"
            className={`mt-1 rounded border-slate-300 text-orange-500 focus:ring-orange-500 ${
              touched.agree && errors.agree ? "ring-1 ring-red-500" : ""
            }`}
            checked={form.agree}
            onFocus={() => markTouched("agree")}
            onChange={handleChange("agree")}
          />
          <span>
            Соглашаюсь с политикой конфиденциальности и договором оферты
          </span>
        </label>
        {touched.agree && errors.agree && (
          <div className="text-xs text-red-500 mb-3">{errors.agree}</div>
        )}

        {submitError && (
          <div className="mb-3 text-xs text-red-600">{submitError}</div>
        )}

        <button
          type="submit"
          disabled={!isValid || submitting}
          className={`w-full h-11 rounded-md font-medium transition ${
            isValid && !submitting
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-slate-300 text-white cursor-not-allowed"
          }`}
        >
          {submitting ? "Отправка..." : "Отправить"}
        </button>

        {/* мягкий статус после успешной отправки */}
        {okId && (
          <div className="mt-3 text-sm text-green-600">Готово! Заявка #{okId}</div>
        )}
      </form>
    </Modal>
  );
}
