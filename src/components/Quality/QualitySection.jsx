export default function QualitySection() {
  return (
    <section
      id="quality"
      className="
        text-slate-900
        pt-[72px] pb-[120px]
        lg:pt-[120px] lg:pb-[180px]
      "
    >
      <div className="container-max">
        <div
          className="
            grid items-start gap-[56px]
            text-center lg:text-left
            lg:grid-cols-[560px_1fr]
            mb-[120px] lg:mb-[180px]
          "
        >
          <h3
            className="
              text-[48px] leading-[56px] font-semibold tracking-[-0.01em]
              text-slate-900
            "
          >
            Гарантируем <span className="text-orange-500">высокое качество</span>
            <br /> нашей продукции
          </h3>

          <p
            className="
              max-w-[520px] mx-auto lg:mx-0
              text-slate-500 text-[15px] leading-6
            "
          >
            Мы ориентируемся на долгосрочные партнёрские отношения, поэтому
            поставляем высококачественные расходные материалы и комплектующие,
            помогаем подобрать оптимальные решения под задачи клиента,
            предоставляем сертификаты соответствия и консультируем на каждом
            этапе заказа.
          </p>
        </div>

        <section className="mt-12">
          <h2
            className="
              text-slate-900
              text-4xl md:text-5xl
              font-semibold tracking-[-0.01em]
              mb-6 md:mb-8
            "
          >
            Преимущества
          </h2>
          
          <div className="relative py-8 md:py-10">
            <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-slate-200" />
          
            <div
              className="
                flex items-center justify-start md:justify-center
                -space-x-8 md:-space-x-10 lg:-space-x-16
              "
            >
              <div
                className="
                  w-[220px] h-[220px]
                  md:w-[240px] md:h-[240px]
                  lg:w-[260px] lg:h-[260px]
                  rounded-full bg-white
                  border-[1.25px] md:border-[1.25px] lg:border-[1.5px]
                  border-slate-300
                  flex flex-col items-center justify-center text-center
                  select-none
                "
              >
                <span className="text-orange-500 font-medium mb-2 text-xl">1</span>
                <p className="text-orange-500 text-[14px] leading-[1.25]">
                  Широкий ассортимент
                </p>
              </div>
          
              <div
                className="
                  w-[220px] h-[220px]
                  md:w-[240px] md:h-[240px]
                  lg:w-[260px] lg:h-[260px]
                  rounded-full bg-white
                  border-[1.25px] md:border-[1.25px] lg:border-[1.5px]
                  border-slate-300
                  flex flex-col items-center justify-center text-center
                  select-none
                "
              >
                <span className="text-orange-500 font-medium mb-2 text-xl">2</span>
                <p className="text-orange-500 text-[14px] leading-[1.25]">
                  Проверенные бренды
                </p>
              </div>
          
              <div
                className="
                  relative
                  w-[220px] h-[220px]
                  md:w-[240px] md:h-[240px]
                  lg:w-[260px] lg:h-[260px]
                  rounded-full bg-white
                  border-[1.25px] md:border-[1.25px] lg:border-[1.5px]
                  border-slate-300
                  select-none z-10
                "
              >
                <span
                  className="
                    absolute left-1/2 -translate-x-1/2
                    top-[34%]
                    text-orange-500 font-bold
                    text-3xl md:text-4xl leading-none
                  "
                >
                  4,5
                </span>
                <p
                  className="
                    absolute left-1/2 -translate-x-1/2
                    top-[58%]
                    text-slate-900 font-semibold
                    text-[14px] leading-[1.25]
                    whitespace-nowrap
                  "
                >
                  Рейтинг Яндекс
                </p>
              </div>
          
              <div
                className="
                  w-[220px] h-[220px]
                  md:w-[240px] md:h-[240px]
                  lg:w-[260px] lg:h-[260px]
                  rounded-full bg-white
                  border-[1.25px] md:border-[1.25px] lg:border-[1.5px]
                  border-slate-300
                  flex flex-col items-center justify-center text-center
                  select-none
                "
              >
                <span className="text-orange-500 font-medium mb-2 text-xl">3</span>
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
