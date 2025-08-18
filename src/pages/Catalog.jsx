import { useMemo, useState } from "react";

/** ------------------ демо-данные каталога ------------------ */
const PRODUCTS = [
  {
    id: 1,
    title: "Портативный Очиститель Масла Серии BLYJ",
    manufacturer: "KNELSON",
    status: "in_stock",      
    type: "fuel",            
    power: 220,              
    img: "/images/filters.png",
    popularity: 5,
  },
  {
    id: 2,
    title: "Портативный Очиститель Масла Серии BLYJ",
    manufacturer: "KNELSON",
    status: "preorder",
    type: "oil",
    power: 280,
    img: "/images/filters.png",
    popularity: 3,
  },
  {
    id: 3,
    title: "Портативный Очиститель Масла Серии BLYJ",
    manufacturer: "KNELSON",
    status: "in_stock",
    type: "air",
    power: 120,
    img: "/images/filters.png",
    popularity: 9,
  },
  {
    id: 4,
    title: "Портативный Очиститель Масла Серии BLYJ",
    manufacturer: "KNELSON",
    status: "in_stock",
    type: "pump",
    power: 500,
    img: "/images/filters.png",
    popularity: 1,
  },
  {
    id: 5,
    title: "Портативный Очиститель Масла Серии BLYJ",
    manufacturer: "KNELSON",
    status: "preorder",
    type: "fuel",
    power: 600,
    img: "/images/filters.png",
    popularity: 7,
  },
  {
    id: 6,
    title: "Портативный Очиститель Масла Серии BLYJ",
    manufacturer: "KNELSON",
    status: "in_stock",
    type: "oil",
    power: 220,
    img: "/images/filters.png",
    popularity: 4,
  },
  {
    id: 7,
    title: "Портативный Очиститель Масла Серии BLYJ",
    manufacturer: "KNELSON",
    status: "in_stock",
    type: "air",
    power: 280,
    img: "/images/filters.png",
    popularity: 2,
  },
  {
    id: 8,
    title: "Портативный Очиститель Масла Серии BLYJ",
    manufacturer: "KNELSON",
    status: "preorder",
    type: "pump",
    power: 120,
    img: "/images/filters.png",
    popularity: 8,
  },
];

const POWER_OPTIONS = [120, 220, 280, 500, 600];

const TYPE_LABELS = {
  fuel: "Топливные фильтры",
  oil: "Масляные фильтры",
  air: "Воздушные фильтры",
  pump: "Насосы",
};

/** ------------------ вспомогательные под-компоненты ------------------ */

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
        <svg
          className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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

function SearchInput({ value, onChange, placeholder = "Поиск" }) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-9 pr-3 rounded-md border border-slate-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
      />
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "in_stock") {
    return (
      <span className="inline-flex items-center gap-1 px-2 h-5 text-[11px] rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
        В наличии
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 h-5 text-[11px] rounded-full bg-slate-50 text-slate-600 border border-slate-200">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      На заказ
    </span>
  );
}

function Card({ p }) {
  return (
    <div className="group">
      <div className="aspect-[4/3] rounded-xl border border-slate-200 bg-white grid place-items-center overflow-hidden">
        {/* если нет фото — просто плейсхолдер */}
        <img
          src={p.img}
          alt=""
          className="max-h-full max-w-full object-contain transition group-hover:scale-[1.02]"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      </div>

      <div className="mt-3 text-[14px] text-slate-800 leading-snug">
        <div className="font-medium">{p.title}</div>
        <div className="text-slate-500 mt-1">
          Производитель: <span className="font-medium">{p.manufacturer}</span>
        </div>
        <div className="mt-2">
          <StatusBadge status={p.status} />
        </div>
      </div>

      <button
        type="button"
        data-open-contact
        className="mt-3 h-10 w-full rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
      >
        Оставить заявку
      </button>
    </div>
  );
}

/** ------------------ страница каталога ------------------ */

export default function Catalog() {
  // фильтры
  const [q, setQ] = useState("");
  const [statusIn, setStatusIn] = useState(false);
  const [statusPre, setStatusPre] = useState(false);

  const [typeFuel, setTypeFuel] = useState(false);
  const [typeOil, setTypeOil] = useState(false);
  const [typeAir, setTypeAir] = useState(false);
  const [typePump, setTypePump] = useState(false);

  const [powers, setPowers] = useState([]); 
  const [sort, setSort] = useState("popular"); 

  // применяем фильтры
  const filtered = useMemo(() => {
    let list = PRODUCTS.slice();

    // поиск по названию/производителю
    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(t) ||
          p.manufacturer.toLowerCase().includes(t)
      );
    }

    // статус
    if (statusIn || statusPre) {
      list = list.filter((p) =>
        (statusIn && p.status === "in_stock") ||
        (statusPre && p.status === "preorder")
      );
    }

    // тип
    const typeActive = [
      typeFuel && "fuel",
      typeOil && "oil",
      typeAir && "air",
      typePump && "pump",
    ].filter(Boolean);
    if (typeActive.length) {
      list = list.filter((p) => typeActive.includes(p.type));
    }

    // напряжение
    if (powers.length) {
      list = list.filter((p) => powers.includes(p.power));
    }

    // сортировка
    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "za") list.sort((a, b) => b.title.localeCompare(a.title));
    else list.sort((a, b) => b.popularity - a.popularity);

    return list;
  }, [q, statusIn, statusPre, typeFuel, typeOil, typeAir, typePump, powers, sort]);

  const resetAll = () => {
    setQ("");
    setStatusIn(false);
    setStatusPre(false);
    setTypeFuel(false);
    setTypeOil(false);
    setTypeAir(false);
    setTypePump(false);
    setPowers([]);
    setSort("popular");
  };

  const togglePower = (v) => {
    setPowers((arr) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]));
  };

  return (
    <main className="container-max px-4 md:px-6 lg:px-8 py-8">
      <h1 className="text-[36px] md:text-[44px] font-semibold text-slate-900 mb-6">
        Каталог
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-8">
        {/* ------------ sidebar фильтров ------------ */}
        <aside className="rounded-xl border border-slate-200 p-4 h-fit">
          {/* Сортировка */}
          <Section title="Сортировка" defaultOpen>
            <div className="space-y-2">
              <Check label="В наличии" checked={statusIn} onChange={setStatusIn} />
              <Check label="На заказ" checked={statusPre} onChange={setStatusPre} />
              <div className="pt-1.5 border-t border-slate-200" />
              <Check
                label="А - Я"
                checked={sort === "az"}
                onChange={(v) => v && setSort("az")}
              />
              <Check
                label="Я - А"
                checked={sort === "za"}
                onChange={(v) => v && setSort("za")}
              />
              <Check
                label="По популярности"
                checked={sort === "popular"}
                onChange={(v) => v && setSort("popular")}
              />
            </div>
          </Section>

          {/* Тип фильтра */}
          <Section title="Тип фильтра" defaultOpen>
            <Check
              label="Топливные фильтры"
              checked={typeFuel}
              onChange={setTypeFuel}
            />
            <Check label="Масляные фильтры" checked={typeOil} onChange={setTypeOil} />
            <Check
              label="Воздушные фильтры"
              checked={typeAir}
              onChange={setTypeAir}
            />
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
                  className={`h-8 px-3 rounded-md border text-sm
                     ${
                       powers.includes(p)
                         ? "border-orange-500 text-orange-600 bg-orange-50"
                         : "border-slate-300 text-slate-600 hover:bg-slate-50"
                     }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Section>

          {/* Сброс / Применить (фильтры у нас применяются сразу; «Применить» — просто кнопка) */}
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
              onClick={() => null}
              title="Фильтры уже применяются автоматически"
            >
              Применить
            </button>
          </div>
        </aside>

        {/* ------------ правая часть: поиск + сетка ------------ */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 items-center mb-6">
            <SearchInput value={q} onChange={setQ} />
            <div className="text-slate-500 text-sm md:text-base">
              {filtered.length} позиций
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <svg className="w-10 h-10 text-slate-300 mb-3" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="text-slate-600">
                По вашему запросу ничего не найдено. Попробуйте еще раз.
              </div>
              <button
                type="button"
                onClick={resetAll}
                className="mt-3 text-orange-600 hover:text-orange-700"
              >
                Сбросить все фильтры
              </button>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <Card key={p.id} p={p} />
              ))}
            </div>
          )}
        </section>
      </div>

    </main>
  );
}
