export default function StatusPill({ status }) {
  const inStock = status === "in_stock";
  return (
    <span
      className={[
        "inline-flex items-center gap-1 px-2.5 h-5 rounded-full text-[11px] border",
        inStock
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-slate-50 text-slate-600 border-slate-200",
      ].join(" ")}
    >
      <span className={["w-1.5 h-1.5 rounded-full", inStock ? "bg-emerald-600" : "bg-slate-400"].join(" ")} />
      {inStock ? "В наличии" : "На заказ"}
    </span>
  );
}
