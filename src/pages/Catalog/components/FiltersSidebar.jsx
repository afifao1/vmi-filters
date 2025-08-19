import { useState } from "react";

const Row = ({ children }) => (
  <label className="flex items-center gap-3 py-2 text-[16px] text-slate-700">
    {children}
  </label>
);

const Box = (props) => (
  <input
    type="checkbox"
    className="h-4 w-4 rounded border-slate-300 text-orange-500 focus:ring-orange-400"
    {...props}
  />
);

function Section({ title, open, onToggle, children }) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between text-slate-900
                   text-[22px] md:text-[24px] leading-[1.2] font-medium"
      >
        <span>{title}</span>

        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`h-4 w-4 text-slate-800 transition-transform ${
            open ? "" : "rotate-180"
          }`}
        >
          <path
            d="M6 15l6-6 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={`overflow-hidden transition-[max-height] duration-200 ${open ? "mt-3" : ""}`}>
        {open && <div className="space-y-1">{children}</div>}
      </div>

      <div className="my-6 h-px bg-slate-200" />
    </div>
  );
}

const fmtRU = (n) =>
  typeof n === "number" ? n.toLocaleString("ru-RU") : String(n);

export default function FiltersSidebar({
  statusIn, setStatusIn,
  statusPre, setStatusPre,
  sort, setSort,

  typeFuel, setTypeFuel,
  typeOil, setTypeOil,
  typeAir, setTypeAir,
  typePump, setTypePump,

  capacities, toggleCapacity, CAPACITY_OPTIONS,

  voltages, toggleVoltage, VOLTAGE_OPTIONS,

  resetAll,
}) {
  const [open, setOpen] = useState({
    sort: true,
    type: true,
    capacity: true,
    voltage: true,
  });

  return (
    <aside className="space-y-0">
      <Section
        title="Сортировка"
        open={open.sort}
        onToggle={() => setOpen((s) => ({ ...s, sort: !s.sort }))}
      >
        <Row>
          <Box checked={statusIn} onChange={(e) => setStatusIn(e.target.checked)} />
          <span>В наличии</span>
        </Row>
        <Row>
          <Box checked={statusPre} onChange={(e) => setStatusPre(e.target.checked)} />
          <span>На заказ</span>
        </Row>
        <Row>
          <Box checked={sort === "az"} onChange={() => setSort(sort === "az" ? "" : "az")} />
          <span>А - Я</span>
        </Row>
        <Row>
          <Box checked={sort === "za"} onChange={() => setSort(sort === "za" ? "" : "za")} />
          <span>Я - А</span>
        </Row>
        <Row>
          <Box
            checked={sort === "popular"}
            onChange={() => setSort(sort === "popular" ? "" : "popular")}
          />
          <span>По популярности</span>
        </Row>
      </Section>

      <Section
        title="Тип фильтра"
        open={open.type}
        onToggle={() => setOpen((s) => ({ ...s, type: !s.type }))}
      >
        <Row>
          <Box checked={typeFuel} onChange={(e) => setTypeFuel(e.target.checked)} />
          <span>Топливные фильтры</span>
        </Row>
        <Row>
          <Box checked={typeOil} onChange={(e) => setTypeOil(e.target.checked)} />
          <span>Масляные фильтры</span>
        </Row>
        <Row>
          <Box checked={typeAir} onChange={(e) => setTypeAir(e.target.checked)} />
          <span>Воздушные фильтры</span>
        </Row>
        <Row>
          <Box checked={typePump} onChange={(e) => setTypePump(e.target.checked)} />
          <span>Насосы</span>
        </Row>
      </Section>

      <Section
        title="Мощность"
        open={open.capacity}
        onToggle={() => setOpen((s) => ({ ...s, capacity: !s.capacity }))}
      >
        {CAPACITY_OPTIONS.map((n) => {
          const active = capacities.includes(n);
          return (
            <Row key={n}>
              <Box checked={active} onChange={() => toggleCapacity(n)} />
              <span>{fmtRU(n)}</span>
            </Row>
          );
        })}
      </Section>

      <Section
        title="Напряжение"
        open={open.voltage}
        onToggle={() => setOpen((s) => ({ ...s, voltage: !s.voltage }))}
      >
        {VOLTAGE_OPTIONS.map((v) => {
          const active = voltages.includes(v);
          return (
            <Row key={v}>
              <Box checked={active} onChange={() => toggleVoltage(v)} />
              <span>{fmtRU(v)}</span>
            </Row>
          );
        })}
      </Section>

      <div className="flex items-center justify-between text-[15px]">
        <button
          type="button"
          onClick={resetAll}
          className="text-slate-500 hover:text-slate-700"
        >
          Сбросить
        </button>
        <button
          type="button"
          className="text-orange-600 hover:text-orange-700"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Применить
        </button>
      </div>
    </aside>
  );
}
