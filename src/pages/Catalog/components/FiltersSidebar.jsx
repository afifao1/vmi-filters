import { useState } from "react";

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-200 pb-3 mb-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-[15px] font-medium text-slate-700"
      >
        {title}
        <svg className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

function Check({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input
        type="checkbox"
        className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}

export default function FiltersSidebar(props) {
  const {
    statusIn, setStatusIn,
    statusPre, setStatusPre,
    typeFuel, setTypeFuel,
    typeOil, setTypeOil,
    typeAir, setTypeAir,
    typePump, setTypePump,
    powers, togglePower,
    sort, setSort,
    resetAll,
    POWER_OPTIONS,
  } = props;

  return (
    <aside className="rounded-xl border border-slate-200 bg-white p-4 h-fit">
      {/* Сортировка */}
      <Section title="Сортировка" defaultOpen>
        <div className="space-y-2">
          <Check label="В наличии" checked={statusIn} onChange={setStatusIn} />
          <Check label="На заказ" checked={statusPre} onChange={setStatusPre} />
          <div className="pt-1.5 border-t border-slate-200" />
          <Check label="А - Я" checked={sort === "az"} onChange={(v) => v && setSort("az")} />
          <Check label="Я - А" checked={sort === "za"} onChange={(v) => v && setSort("za")} />
          <Check label="По популярности" checked={sort === "popular"} onChange={(v) => v && setSort("popular")} />
        </div>
      </Section>

      {/* Тип фильтра */}
      <Section title="Тип фильтра" defaultOpen>
        <Check label="Топливные фильтры" checked={typeFuel} onChange={setTypeFuel} />
        <Check label="Масляные фильтры" checked={typeOil} onChange={setTypeOil} />
        <Check label="Воздушные фильтры" checked={typeAir} onChange={setTypeAir} />
        <Check label="Насосы" checked={typePump} onChange={setTypePump} />
      </Section>

      {/* Напряжение */}
      <Section title="Напряжение" defaultOpen>
        <div className="flex flex-wrap gap-2">
          {POWER_OPTIONS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => togglePower(p)}
              className={[
                "h-8 px-3 rounded-md border text-sm",
                powers.includes(p)
                  ? "border-orange-500 text-orange-600 bg-orange-50"
                  : "border-slate-300 text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              {p}
            </button>
          ))}
        </div>
      </Section>

      {/* Сброс / Применить */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          className="text-slate-500 text-sm hover:text-slate-700"
          onClick={resetAll}
        >
          Сбросить
        </button>
        <button
          type="button"
          className="text-orange-600 text-sm hover:text-orange-700"
          title="Фильтры уже применяются автоматически"
        >
          Применить
        </button>
      </div>
    </aside>
  );
}
