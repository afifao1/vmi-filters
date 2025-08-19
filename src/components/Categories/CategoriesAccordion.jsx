import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const CATS = [
  { label: "Топливные фильтры", slug: "fuel" },
  { label: "Масляные фильтры", slug: "oil" },
  { label: "Воздушные фильтры", slug: "air" },
  { label: "Насосы",            slug: "pump" },
];

export default function CategoriesAccordion() {
  const navigate = useNavigate();

  const goTo = (slug) => {
    navigate(`/catalog?type=${slug}`);
  };

  return (
    <section id="catalog" className="py-14">
      <div className="container-max">
        <p className="text-center text-slate-900 font-normal md:font-light
                       text-[32px] leading-10 md:text-[36px] md:leading-[44px] tracking-[-0.01em]">
          Предоставляем <span className="text-[#F97316] font-bold">более 100</span> наименований продукции
          по следующим категориям
        </p>

        <div className="mt-6 rounded-xl overflow-hidden">
          {CATS.map((c, idx) => (
            <div
              key={c.slug}
              className={`
                border-slate-200
                ${idx === 0 ? "border-t" : ""}
                border-b
              `}
            >
              <button
                type="button"
                onClick={() => goTo(c.slug)}
                className="
                  group w-full flex items-center justify-between
                  py-6 md:py-7
                  text-[18px] md:text-[20px]
                  text-slate-900
                "
              >
                <span className="text-left"> {c.label} </span>
                <FiArrowUpRight
                  className="
                    text-slate-300
                    w-6 h-6 shrink-0
                    group-hover:text-slate-400
                    transition-transform
                    group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                  "
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
