import StatusPill from "./StatusPill";

export default function ProductCard({ p, onOrder }) {
  return (
    <div className="h-full flex flex-col items-center text-center">
      {/* фиксированная зона под картинку */}
      <div className="h-[180px] w-full grid place-items-center mb-4">
        <img
          src={p.img}
          alt=""
          className="max-h-full max-w-full object-contain"
          onError={(e) => e.currentTarget.remove()}
        />
      </div>

      {/* Весь текстовый блок растягиваем, чтобы кнопка ушла вниз */}
      <div className="px-2 grow flex flex-col items-center">
        {/* Заголовок: одинаковая высота (2–3 строки) */}
        <h3
          className="
            text-[22px] md:text-[24px] leading-tight font-semibold text-slate-900
            min-h-[88px] md:min-h-[96px]
          "
        >
          {p.title}
        </h3>

        <div className="mt-2 text-[14px] text-slate-500">
          Производитель: <span className="font-medium">{p.manufacturer}</span>
        </div>

        <div className="mt-3">
          <StatusPill status={p.status} />
        </div>
      </div>

      <button
        type="button"
        data-open-contact
        onClick={() => onOrder?.(p)}
        className="mt-6 h-11 w-[220px] rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
      >
        Оставить заявку
      </button>
    </div>
  );
}
