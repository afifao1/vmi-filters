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
    q, setQ,
    sort, setSort,

    statusIn, setStatusIn,
    statusPre, setStatusPre,

    typeFuel, setTypeFuel,
    typeOil, setTypeOil,
    typeAir, setTypeAir,
    typePump, setTypePump,

    capacities, toggleCapacity,   
    voltages, toggleVoltage,     

    filtered,
    resetAll,
  } = useCatalogFilters(PRODUCTS);

  return (
    <main className="bg-[var(--page-bg)] pt-20 md:pt-24">
      <div className="container-max px-4 md:px-6 lg:px-8">
        <SearchHeader q={q} setQ={setQ} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px,1fr]">
          <FiltersSidebar
            statusIn={statusIn} setStatusIn={setStatusIn}
            statusPre={statusPre} setStatusPre={setStatusPre}

            typeFuel={typeFuel} setTypeFuel={setTypeFuel}
            typeOil={typeOil} setTypeOil={setTypeOil}
            typeAir={typeAir} setTypeAir={setTypeAir}
            typePump={typePump} setTypePump={setTypePump}

            sort={sort} setSort={setSort}

            capacities={capacities}
            toggleCapacity={toggleCapacity}
            CAPACITY_OPTIONS={CAPACITY_OPTIONS}

            voltages={voltages}
            toggleVoltage={toggleVoltage}
            VOLTAGE_OPTIONS={VOLTAGE_OPTIONS}

            resetAll={resetAll}
          />

          <section>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg className="mb-3 h-10 w-10 text-slate-300" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
                        stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round" />
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
                  gap-x-[180px]   /* горизонтальный отступ между карточками */
                  gap-y-[100px]   /* вертикальный отступ между карточками */
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
