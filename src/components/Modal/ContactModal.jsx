import { useState } from "react";
import Modal from "./Modal";

export default function ContactModal({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    agree: false,
  });

  const canSubmit =
    form.agree && (form.name.trim() || form.phone.trim() || form.email.trim());

  const set = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    // TODO: отправка на бекенд/телеграм и т.п.
    onClose?.();
  };

  return (
    <Modal open={open} onClose={onClose} title="Оставить заявку">
      <p className="text-slate-600 mb-4">
        Менеджер перезвонит вам в ближайшее время
      </p>

      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className="text-xs text-slate-500">Имя</span>
          <input
            className="mt-1 w-full h-11 rounded-md border border-slate-300 px-3
                       focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            value={form.name}
            onChange={set("name")}
            placeholder="Ваше имя"
          />
        </label>

        <label className="block">
          <span className="text-xs text-slate-500">Мобильный телефон</span>
          <input
            className="mt-1 w-full h-11 rounded-md border border-slate-300 px-3
                       focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            value={form.phone}
            onChange={set("phone")}
            placeholder="+7 (___) ___-__-__"
          />
        </label>

        <label className="block">
          <span className="text-xs text-slate-500">Email</span>
          <input
            type="email"
            className="mt-1 w-full h-11 rounded-md border border-slate-300 px-3
                       focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            value={form.email}
            onChange={set("email")}
            placeholder="example@mail.ru"
          />
        </label>

        <label className="block">
          <span className="text-xs text-slate-500">Сообщение</span>
          <textarea
            rows={3}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2
                       focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
            value={form.message}
            onChange={set("message")}
            placeholder="Коротко опишите задачу"
          />
        </label>

        <label className="flex items-start gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-1 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
            checked={form.agree}
            onChange={(e) => setForm((s) => ({ ...s, agree: e.target.checked }))}
          />
          <span>
            Соглашаюсь с политикой конфиденциальности и договором оферты
          </span>
        </label>

        <button
          type="submit"
          disabled={!canSubmit}
          className="w-full h-11 rounded-md bg-orange-500 text-white font-medium
                     disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          Отправить
        </button>
      </form>
    </Modal>
  );
}
