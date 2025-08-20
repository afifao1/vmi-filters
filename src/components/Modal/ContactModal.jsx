// FILE: src/components/Modal/ContactModal.jsx
import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";

// API base URL из VITE_API_URL или дефолт
const API_BASE = (import.meta?.env?.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

const initialForm = {
  type: "contact", // contact|product
  name: "",
  phone: "",
  email: "",
  message: "",
  product_id: undefined,
  product_title: "",
  quantity: 1,
  source: "",
  source_url: "",
};

export default function ContactModal({ open, onClose, order, setOrder }) {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [okId, setOkId] = useState(null);

  // Префилл при открытии из карточки товара
  useEffect(() => {
    if (open) {
      setOkId(null);
      const fromOrder = order && (order.id || order.title);
      setForm((f) => ({
        ...initialForm,
        type: fromOrder ? "product" : "contact",
        product_id: fromOrder ? (order.id ?? undefined) : undefined,
        product_title: fromOrder ? (order.title ?? "") : "",
        quantity: fromOrder ? (order.qty ?? 1) : 1,
        source: document.body.dataset.page || "", // опционально: откуда открыли
        source_url: window.location.href,
      }));
      setTouched({});
      setErrors({});
    }
  }, [open, order]);

  // Сброс при закрытии
  const closeAndReset = () => {
    setForm(initialForm);
    setTouched({});
    setErrors({});
    setOkId(null);
    setOrder?.(null);
    onClose?.();
  };

  const setField = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
  };

  // Простая клиентская валидация (моментально, по touched)
  const validate = useMemo(() => {
    const e = {};
    const nameOk = /^[\p{L}\s\-']{2,}$/u.test(form.name || "");
    if (!nameOk) e.name = "Минимум 2 символа, только буквы/пробел/дефис/апостроф";

    const phoneOk = /^\+?[1-9]\d{7,14}$/.test(form.phone || "");
    if (!phoneOk) e.phone = "Формат E.164, напр. +998901234567";

    const emailOk = /\S+@\S+\.\S+/.test(form.email || "");
    if (!emailOk) e.email = "Неверный email";

    if (form.type === "product") {
      if (!Number.isInteger(Number(form.product_id))) e.product_id = "Число (ID товара)";
      if (!(form.product_title || "").trim()) e.product_title = "Название товара";
      if (Number(form.quantity) < 1) e.quantity = "Минимум 1";
    }
    return e;
  }, [form]);

  useEffect(() => setErrors(validate), [validate]);

  const submit = async (e) => {
    e?.preventDefault?.();
    setTouched({
      name: true,
      phone: true,
      email: true,
      message: true,
      product_id: true,
      product_title: true,
      quantity: true,
    });

    // Если есть ошибки — не отправляем
    if (Object.keys(validate).length) return;

    setLoading(true);
    setOkId(null);
    try {
      const payload = {
        type: form.type,
        name: form.name?.trim(),
        phone: form.phone?.trim(),
        email: form.email?.trim(),
        message: form.message?.trim() || undefined,
        product_id: form.type === "product" ? Number(form.product_id) : undefined,
        product_title: form.type === "product" ? form.product_title?.trim() : undefined,
        quantity: form.type === "product" ? Number(form.quantity || 1) : undefined,
        source: form.source || undefined,
        source_url: form.source_url || undefined,
      };

      const res = await fetch(`${API_BASE}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (res.status === 422 && data?.errors) {
          const be = {};
          Object.entries(data.errors).forEach(([k, arr]) => (be[k] = Array.isArray(arr) ? arr[0] : String(arr)));
          setErrors(be);
        } else {
          alert(data?.message || "Ошибка отправки");
        }
        return;
      }

      setOkId(data?.id || null);
      // Очистка формы после успеха
      setForm(initialForm);
      setTouched({});
      setOrder?.(null);
    } catch (err) {
      console.error(err);
      alert("Сеть недоступна или сервер не отвечает");
    } finally {
      setLoading(false);
    }
  };

  const fieldError = (k) => (touched[k] && errors[k] ? errors[k] : "");

  return (
    <Modal open={open} onClose={closeAndReset} title="Связаться с менеджером">
      <form onSubmit={submit} className="space-y-4">
        {/* Тип заявки (readonly, но показываем) */}
        <div className="text-sm text-slate-500">Тип: <span className="font-medium">{form.type}</span></div>

        {form.type === "product" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1">ID товара</label>
              <input
                type="number"
                className={`input ${fieldError("product_id") ? "input-error" : ""}`}
                value={form.product_id ?? ""}
                onChange={(e) => setField("product_id", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, product_id: true }))}
              />
              {fieldError("product_id") && <p className="text-red-500 text-xs mt-1">{fieldError("product_id")}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm mb-1">Название товара</label>
              <input
                type="text"
                className={`input ${fieldError("product_title") ? "input-error" : ""}`}
                value={form.product_title}
                onChange={(e) => setField("product_title", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, product_title: true }))}
              />
              {fieldError("product_title") && <p className="text-red-500 text-xs mt-1">{fieldError("product_title")}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1">Количество</label>
              <input
                type="number"
                min={1}
                className={`input ${fieldError("quantity") ? "input-error" : ""}`}
                value={form.quantity}
                onChange={(e) => setField("quantity", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, quantity: true }))}
              />
              {fieldError("quantity") && <p className="text-red-500 text-xs mt-1">{fieldError("quantity")}</p>}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Имя</label>
            <input
              type="text"
              className={`input ${fieldError("name") ? "input-error" : ""}`}
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            />
            {fieldError("name") && <p className="text-red-500 text-xs mt-1">{fieldError("name")}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1">Телефон</label>
            <input
              type="tel"
              className={`input ${fieldError("phone") ? "input-error" : ""}`}
              placeholder="+998901234567"
              value={form.phone}
              onChange={(e) => setField("phone", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            />
            {fieldError("phone") && <p className="text-red-500 text-xs mt-1">{fieldError("phone")}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className={`input ${fieldError("email") ? "input-error" : ""}`}
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            />
            {fieldError("email") && <p className="text-red-500 text-xs mt-1">{fieldError("email")}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Сообщение (необязательно)</label>
          <textarea
            className="input h-28 resize-none"
            value={form.message}
            onChange={(e) => setField("message", e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, message: true }))}
          />
        </div>

        {/* Кнопки */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-60"
          >
            {loading ? "Отправка..." : "Отправить"}
          </button>
          <button type="button" onClick={closeAndReset} className="btn-secondary">
            Отмена
          </button>
          {okId && <span className="text-green-600 text-sm">Готово! Заявка #{okId}</span>}
        </div>
      </form>
    </Modal>
  );
}
