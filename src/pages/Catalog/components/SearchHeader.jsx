export default function SearchHeader({ q, setQ }) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <h1 className="text-slate-900 leading-none font-light text-[44px] md:text-[52px]">
        Каталог
      </h1>

      <div className="relative w-[280px] md:w-[360px]">
        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 outline-none
                     focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
      </div>
    </div>
  );
}
