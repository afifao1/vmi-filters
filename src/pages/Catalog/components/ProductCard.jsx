import StatusPill from "./StatusPill";

export default function ProductCard({ p }) {
  return (
    <div
      className="
        group rounded-xl border border-slate-200 bg-white
        p-4 hover:shadow-md transition
        flex flex-col
      "
    >
      {/* Картинка — центрируем, фиксируем высоту */}
      <div className="h-[160px] grid place-items-center overflow-hidden">
        <img
          src={p.img}
          alt=""
          className="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </div>

      {/* Название */}
      <div className="mt-3 text-center text-[14px] font-medium text-slate-900 leading-snug">
        {p.title}
      </div>

      {/* Производитель */}
      <div className="mt-1 text-center text-[12px] text-slate-500">
        Производитель: <span className="font-medium">{p.manufacturer}</span>
      </div>

      {/* Статус — по центру */}
      <div className="mt-2 flex justify-center">
        <StatusPill status={p.status} />
      </div>

      {/* Кнопка прижата книзу для одинаковой высоты карточек */}
      <div className="mt-3">
        <button
          type="button"
          data-open-contact
          className="h-9 w-full rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
        >
          Оставить заявку
        </button>
      </div>
    </div>
  );
}
