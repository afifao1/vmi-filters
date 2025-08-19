import { useMemo, useState } from "react";

/**
 * Хук, который хранит состояние фильтров/сортировки и выдаёт отфильтрованный список.
 */
export function useCatalogFilters(products) {
  const [q, setQ] = useState("");
  const [statusIn, setStatusIn] = useState(false);
  const [statusPre, setStatusPre] = useState(false);

  const [typeFuel, setTypeFuel] = useState(false);
  const [typeOil, setTypeOil] = useState(false);
  const [typeAir, setTypeAir] = useState(false);
  const [typePump, setTypePump] = useState(false);

  const [powers, setPowers] = useState([]);
  const [sort, setSort] = useState("popular"); // az | za | popular

  const togglePower = (v) =>
    setPowers((arr) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]));

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

  const filtered = useMemo(() => {
    let list = products.slice();

    if (q.trim()) {
      const t = q.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(t) ||
          p.manufacturer.toLowerCase().includes(t)
      );
    }

    if (statusIn || statusPre) {
      list = list.filter(
        (p) =>
          (statusIn && p.status === "in_stock") ||
          (statusPre && p.status === "preorder")
      );
    }

    const activeTypes = [
      typeFuel && "fuel",
      typeOil && "oil",
      typeAir && "air",
      typePump && "pump",
    ].filter(Boolean);
    if (activeTypes.length) {
      list = list.filter((p) => activeTypes.includes(p.type));
    }

    if (powers.length) {
      list = list.filter((p) => powers.includes(p.power));
    }

    if (sort === "az") list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "za") list.sort((a, b) => b.title.localeCompare(a.title));
    else list.sort((a, b) => b.popularity - a.popularity);

    return list;
  }, [products, q, statusIn, statusPre, typeFuel, typeOil, typeAir, typePump, powers, sort]);

  return {
    // состояние
    q, setQ,
    statusIn, setStatusIn,
    statusPre, setStatusPre,
    typeFuel, setTypeFuel,
    typeOil, setTypeOil,
    typeAir, setTypeAir,
    typePump, setTypePump,
    powers, togglePower,
    sort, setSort,
    // данные/методы
    filtered,
    resetAll,
  };
}
