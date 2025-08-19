import StatusPill from "./StatusPill";

export default function ProductCard({ p }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* картинка — как было */}
      <div className="h-[180px] md:h-[200px] grid place-items-center mb-4">
        <img
          src={p.img}
          alt=""
          className="max-h-full max-w-full object-contain"
          onError={(e) => e.currentTarget.remove()}
        />
      </div>

      {/* НАЗВАНИЕ — только шрифт/размер/межстрочный */}
      <div className="text-slate-900 text-[20px] md:text-[22px] leading-[1.25] tracking-[-0.01em] font-medium max-w-[360px]">
        {p.title}
      </div>

      {/* ПРОИЗВОДИТЕЛЬ — только шрифты */}
      <div className="mt-2 text-[14px] leading-5 text-slate-500">
        Производитель:{" "}
        <span className="text-slate-900 font-semibold uppercase tracking-wide">
          {p.manufacturer}
        </span>
      </div>

      {/* Статус — без изменений */}
      <div className="mt-3">
        <StatusPill status={p.status} />
      </div>

      {/* Кнопка — только размер шрифта (по желанию можно вернуть 14px) */}
      <button
        type="button"
        data-open-contact
        className="mt-4 h-10 rounded-md px-6 bg-orange-500 text-white text-[16px] font-medium hover:bg-orange-600 transition"
      >
        Оставить заявку
      </button>
    </div>
  );
}
