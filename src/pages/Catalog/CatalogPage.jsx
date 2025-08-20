import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "./components/ProductCard";
import FiltersSidebar from "./components/FiltersSidebar";
import SearchHeader from "./components/SearchHeader";
import { useCatalogFilters } from "./hooks/useCatalogFilters";
import {
  PRODUCTS,
  CAPACITY_OPTIONS,
  VOLTAGE_OPTIONS,
} from "./data";

export default function CatalogPage() {
  const {
    // поиск и сортировка
    q, setQ,
    sort, setSort,

    // статусы
    statusIn, setStatusIn,
    statusPre, setStatusPre,

    // типы
    typeFuel, setTypeFuel,
    typeOil, setTypeOil,
    typeAir, setTypeAir,
    typePump, setTypePump,

    // мощность/напряжение
    capacities, toggleCapacity,
    voltages, toggleVoltage,

    // итог
    filtered,
    resetAll,
  } = useCatalogFilters(PRODUCTS);

  // читаем ?type=fuel|oil|air|pump и включаем нужный фильтр
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const t = searchParams.get("type");
    if (!t) return;

    // сбросить и активировать нужный
    setTypeFuel(false);
    setTypeOil(false);
    setTypeAir(false);
    setTypePump(false);

    if (t === "fuel") setTypeFuel(true);
    else if (t === "oil") setTypeOil(true);
    else if (t === "air") setTypeAir(true);
    else if (t === "pump") setTypePump(true);

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams, setTypeFuel, setTypeOil, setTypeAir, setTypePump]);

  return (
    <main className="bg-[var(--page-bg)] pt-20 md:pt-24">
      <div className="container-max px-4 md:px-6 lg:px-8">
        <SearchHeader q={q} setQ={setQ} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px,1fr]">
          <FiltersSidebar
            /* статусы */
            statusIn={statusIn} setStatusIn={setStatusIn}
            statusPre={statusPre} setStatusPre={setStatusPre}

            /* типы */
            typeFuel={typeFuel} setTypeFuel={setTypeFuel}
            typeOil={typeOil} setTypeOil={setTypeOil}
            typeAir={typeAir} setTypeAir={setTypeAir}
            typePump={typePump} setTypePump={setTypePump}

            /* сортировка */
            sort={sort} setSort={setSort}

            /* мощность */
            capacities={capacities}
            toggleCapacity={toggleCapacity}
            CAPACITY_OPTIONS={CAPACITY_OPTIONS}

            /* напряжение */
            voltages={voltages}
            toggleVoltage={toggleVoltage}
            VOLTAGE_OPTIONS={VOLTAGE_OPTIONS}

            /* сброс */
            resetAll={resetAll}
          />

          <section>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg className="mb-3 h-10 w-10 text-slate-300" viewBox="0 0 24 24" fill="none">
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
            <div
              className="
                grid sm:grid-cols-2 xl:grid-cols-3
                gap-x-[180px] gap-y-[100px]
                items-stretch
              "
            >
              {filtered.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>

            )}
          </section>
        </div>
      </div>
    </main>
  );
}
