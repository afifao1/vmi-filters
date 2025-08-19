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
          <h2 className="container-max text-slate-900 text-[44px] md:text-[48px] font-semibold leading-[1.15] tracking-[-0.01em] mb-6">
            Преимущества
          </h2>
          
          <div className="py-10">
            <div className="container-max flex justify-start md:justify-center items-center -space-x-4 md:-space-x-6">
          
              <div className="size-[260px] rounded-full bg-[var(--app-bg)] border border-[#D9E2EC] flex flex-col items-center justify-center text-center select-none">
                <span className="text-orange-500 font-semibold mb-2">1</span>
                <p className="text-orange-500 text-[14px] leading-[1.25]">Широкий ассортимент</p>
              </div>
          
              <div className="size-[260px] rounded-full bg-[var(--app-bg)] border border-[#D9E2EC] flex flex-col items-center justify-center text-center select-none">
                <span className="text-orange-500 font-semibold mb-2">2</span>
                <p className="text-orange-500 text-[14px] leading-[1.25]">Проверенные бренды</p>
              </div>
          
              <div className="size-[260px] rounded-full bg-[var(--app-bg)] border border-[#D9E2EC] flex flex-col items-center justify-center text-center select-none">
                <span className="text-orange-500 font-semibold text-4xl leading-none mb-1">4,5</span>
                <p className="text-slate-900 font-semibold text-[14px] leading-[1.25]">Рейтинг Яндекс</p>
              </div>
          
              {/* 3 */}
              <div className="size-[260px] rounded-full bg-[var(--app-bg)] border border-[#D9E2EC] flex flex-col items-center justify-center text-center select-none">
                <span className="text-orange-500 font-semibold mb-2">3</span>
                <p className="text-orange-500 text-[14px] leading-[1.25]">Опытные специалисты</p>
              </div>
          
            </div>
          </div>
        </section>

      </div>
    </section>
  );
}
