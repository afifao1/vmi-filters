import StatusPill from "./StatusPill";

export default function ProductCard({ p }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* изображение */}
      <div className="h-[180px] md:h-[200px] grid place-items-center mb-4">
        <img
          src={p.img}
          alt=""
          className="max-h-full max-w-full object-contain"
          onError={(e) => e.currentTarget.remove()}
        />
      </div>

      {/* название */}
      <div className="text-[15px] md:text-[16px] font-medium text-slate-900 leading-snug max-w-[320px]">
        {p.title}
      </div>

      {/* производитель */}
      <div className="mt-1 text-[13px] text-slate-500">
        Производитель: <span className="font-medium">{p.manufacturer}</span>
      </div>

      {/* статус */}
      <div className="mt-3">
        <StatusPill status={p.status} />
      </div>

      {/* кнопка открытия формы: передаём товар через data-* */}
      <button
        type="button"
        data-open-contact
        data-p-title={p.title}
        data-p-img={p.img}
        className="mt-4 h-10 rounded-md px-6 bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
      >
        Оставить заявку
      </button>
    </div>
  );
}
