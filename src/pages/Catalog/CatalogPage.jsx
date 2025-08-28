import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import ProductCard from "./components/ProductCard";
import FiltersSidebar from "./components/FiltersSidebar";
import SearchHeader from "./components/SearchHeader";
import { useCatalogFilters } from "./hooks/useCatalogFilters";
import {
  PRODUCTS,            // твои ручные товары остаются
  CAPACITY_OPTIONS,
  VOLTAGE_OPTIONS,
} from "./data";
import api from "../../api"; // axios с baseURL: '/api' (через Vite proxy)

/** Приводим товар из API к формату фронта */
function normalizeApiProduct(item) {
  return {
    id: item.id ?? `api-${item.title}-${item.manufacturer}`,
    title: item.title ?? "",
    manufacturer: item.manufacturer ?? "",
    status: item.status ?? "in_stock", // 'in_stock' | 'preorder'
    type: item.type ?? "",             // 'fuel'|'oil'|'air'|'pump'
    power: item.power ?? null,

    // картинка может приходить как image (через Resource) или как img (сырая БД)
    img: item.image ?? item.img ?? null,

    // этих полей в БД нет — чтобы фильтры не падали, оставим пустыми
    capacity: item.capacity ?? null,
    voltage: item.voltage ?? null,
  };
}

/** Склеиваем локальные и серверные товары без дублей */
function mergeProducts(localArr, remoteArr) {
  const out = [];
  const seen = new Set();
  const push = (p) => {
    const key = p.id ?? `${p.title}__${p.manufacturer}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push(p);
    }
  };
  localArr.forEach(push);
  remoteArr.forEach(push);
  return out;
}

export default function CatalogPage() {
  const [remoteItems, setRemoteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // грузим товары с бэкенда (первая страница без фильтров; при желании можно прокинуть ?type, ?status, ?search)
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setErr("");

    api.get("/products")
        .then(({ data }) => {
          // если это Laravel Pagination Resource -> товары в data.data
          const arr = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
          if (!cancelled) setRemoteItems(arr.map(normalizeApiProduct));
        })
        .catch((e) => !cancelled && setErr(e?.message || "Failed to load products"))
        .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, []);

  // объединяем ручные + серверные
  const items = useMemo(() => mergeProducts(PRODUCTS, remoteItems), [remoteItems]);

  // фильтры работают по объединённому массиву
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
  } = useCatalogFilters(items);

  // читаем ?type=fuel|oil|air|pump и включаем нужный фильтр
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const t = searchParams.get("type");
    if (!t) return;

    // сбрасываем типы и активируем нужный
    setTypeFuel(false); setTypeOil(false); setTypeAir(false); setTypePump(false);
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
              {/* ошибки/лоадер */}
              {err && (
                  <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700">
                    Ошибка загрузки с сервера: {err}
                  </div>
              )}
              {loading && (
                  <div className="mb-6 text-slate-500">Загрузка товаров…</div>
              )}

              {filtered.length === 0 && !loading ? (
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
                        <ProductCard key={p.id ?? `${p.title}-${p.manufacturer}`} p={p} />
                    ))}
                  </div>
              )}
            </section>
          </div>
        </div>
      </main>
  );
}
