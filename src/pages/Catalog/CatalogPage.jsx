import ProductCard from "./components/ProductCard";
import FiltersSidebar from "./components/FiltersSidebar";
import SearchHeader from "./components/SearchHeader";
import { useCatalogFilters } from "./hooks/useCatalogFilters";
import { PRODUCTS, POWER_OPTIONS } from "./data";

export default function CatalogPage() {
  const {
    // состояние из хука
    q, setQ,
    statusIn, setStatusIn,
    statusPre, setStatusPre,
    typeFuel, setTypeFuel,
    typeOil, setTypeOil,
    typeAir, setTypeAir,
    typePump, setTypePump,
    powers, togglePower,
    sort, setSort,
    filtered,
    resetAll,
  } = useCatalogFilters(PRODUCTS);

  return (
    <main className="pt-28 bg-[var(--page-bg)]">
      <div className="container-max px-4 md:px-6 lg:px-8 py-8">
        <h1 className="text-[36px] md:text-[44px] font-semibold text-slate-900 mb-6">
          Каталог
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-8">
          {/* Фильтры слева */}
          <FiltersSidebar
            statusIn={statusIn} setStatusIn={setStatusIn}
            statusPre={statusPre} setStatusPre={setStatusPre}
            typeFuel={typeFuel} setTypeFuel={setTypeFuel}
            typeOil={typeOil} setTypeOil={setTypeOil}
            typeAir={typeAir} setTypeAir={setTypeAir}
            typePump={typePump} setTypePump={setTypePump}
            powers={powers} togglePower={togglePower}
            sort={sort} setSort={setSort}
            resetAll={resetAll}
            POWER_OPTIONS={POWER_OPTIONS}
          />

          {/* Правая часть */}
          <section className="space-y-6">
            <SearchHeader q={q} setQ={setQ} count={filtered.length} />

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
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
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
