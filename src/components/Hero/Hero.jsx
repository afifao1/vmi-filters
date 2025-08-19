export default function Hero() {
  return (
    <section className="bg-white pt-28 md:pt-32 pb-20">
      <div className="container-max grid items-end gap-10
                      xl:grid-cols-[1fr_680px]">

        <div className="relative pb-16">
          <h1
            className="
              uppercase
              font-normal               
              text-[#222222]           
              tracking-[0]              
              antialiased
              text-[44px] leading-[46px]  
              sm:text-[64px] sm:leading-[68px]
              lg:text-[96px] lg:leading-[104px]  
            "
          >
            ПРОМЫШЛЕННЫЕ <br /> ФИЛЬТРЫ
          </h1>

          <ul className="mt-4 space-y-2 text-[18px] md:text-[20px] leading-7 text-[#6B7280]">
            <li className="flex items-center before:content-['—'] before:mr-2 before:text-[#9CA3AF]">
              Защищают двигатель
            </li>
            <li className="flex items-center before:content-['—'] before:mr-2 before:text-[#9CA3AF]">
              Оптимизируют работу системы
            </li>
            <li className="flex items-center before:content-['—'] before:mr-2 before:text-[#9CA3AF]">
              Обеспечивают долгосрочную эффективность
            </li>
          </ul>

          <a
            href="#catalog"
            aria-label="Перейти в каталог"
            className="absolute z-[1] flex items-center justify-center
                       w-[170px] h-[170px] rounded-full
                       border border-[#F18B2E] text-[#F18B2E]
                       text-[18px] md:text-[20px] font-medium
                       transition-colors duration-200
                       hover:bg-[#F18B2E] hover:text-white
                       focus:outline-none focus-visible:ring-4 focus-visible:ring-[#f18b2e33]"
            style={{ top: 330, left: 360 }}
          >
            Каталог
          </a>
        </div>

        <div className="justify-self-end overflow-visible -mr-24 xl:-mr-32 2xl:-mr-40">
          <img
            src="/images/filters.png"
            alt="Фильтры"
            className="block object-contain
                       w-[700px] xl:w-[820px] 2xl:w-[920px]"
          />
        </div>
      </div>
    </section>
  );
}
