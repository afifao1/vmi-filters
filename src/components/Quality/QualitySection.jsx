import s from "./QualitySection.module.css";
import "./Advantages.css";

export default function QualitySection() {
  return (
    <section className={s.section} id="quality">
      <div className="container-max">
        <div className={s.top}>
          <h3 className={s.title}>
            Гарантируем <span className={s.accent}>высокое качество</span>
            <br /> нашей продукции
          </h3>

          <p className={s.text}>
            Мы ориентируемся на долгосрочные партнёрские отношения, поэтому
            поставляем высококачественные расходные материалы и комплектующие,
            помогаем подобрать оптимальные решения под задачи клиента,
            предоставляем сертификаты соответствия и консультируем на каждом
            этапе заказа.
          </p>
        </div>

        <section className="advantages mt-12">
          <h2 className="text-slate-900 text-4xl md:text-5xl font-semibold mb-6">
            Преимущества
          </h2>

          <div className="relative py-8 md:py-10">
            <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-slate-200" />

            <div className="flex justify-start md:justify-center items-center -space-x-4 md:-space-x-6">
              <div className="size-[220px] md:size-[240px] rounded-full border border-slate-200 bg-white flex flex-col items-center justify-center text-center select-none">
                <span className="text-orange-500 font-semibold mb-2">1</span>
                <p className="text-orange-500 text-[14px] leading-[1.25]">
                  Широкий ассортимент
                </p>
              </div>

              <div className="size-[220px] md:size-[240px] rounded-full border border-slate-200 bg-white flex flex-col items-center justify-center text-center select-none">
                <span className="text-orange-500 font-semibold mb-2">2</span>
                <p className="text-orange-500 text-[14px] leading-[1.25]">
                  Проверенные бренды
                </p>
              </div>

              <div className="size-[220px] md:size-[240px] rounded-full border border-slate-200 bg-white flex flex-col items-center justify-center text-center select-none">
                <span className="text-orange-500 font-semibold text-3xl md:text-4xl leading-none mb-1">
                  4,5
                </span>
                <p className="text-slate-900 font-semibold text-[14px] leading-[1.25]">
                  Рейтинг Яндекс
                </p>
              </div>

              <div className="size-[220px] md:size-[240px] rounded-full border border-slate-200 bg-white flex flex-col items-center justify-center text-center select-none">
                <span className="text-orange-500 font-semibold mb-2">3</span>
                <p className="text-orange-500 text-[14px] leading-[1.25]">
                  Опытные специалисты
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
