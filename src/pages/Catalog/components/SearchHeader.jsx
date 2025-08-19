export default function SearchHeader({ q, setQ, count }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 items-center">
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
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Поиск"
          className="w-full h-10 pl-9 pr-3 rounded-md border border-slate-300
                     focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none bg-white"
        />
      </div>

      <div className="text-slate-500 text-sm md:text-base">
        {count} позиций
      </div>
    </div>
  );
}
