import React from "react";

export default function ContactCta() {
  return (
    <section id="contact" className="bg-white border-t border-slate-200">
      <div className="container-max">
        <div className="grid items-center gap-8 py-14 lg:py-16 grid-cols-1 lg:grid-cols-[minmax(720px,1fr),480px]">
          <div className="space-y-4">
            <h3
              className="text-[40px] leading-[48px] md:text-[44px] md:leading-[52px]
                         xl:text-[56px] xl:leading-[64px] tracking-[-0.02em]
                         font-light text-[#111827] lg:whitespace-nowrap"
            >
              {"Напишите\u00A0нам "}
              <span className="text-orange-500 font-medium">
                {"прямо\u00A0сейчас"}
              </span>
            </h3>

            <p className="text-slate-600 text-base md:text-[18px]">
              Наши менеджеры свяжутся с вами в ближайшее время
            </p>

            <button
              type="button"
              data-open-contact
              className="mt-4 md:mt-6 inline-flex h-11 items-center justify-center rounded-lg
                         border border-orange-500 px-6 text-[15px] font-medium
                         text-orange-600 transition-colors
                         hover:bg-orange-50 focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-orange-400"
            >
              Оставить заявку
            </button>
          </div>

          <div className="justify-self-center lg:justify-self-end">
            <img
              src="/images/contact.png"
              alt="Фильтры"
              loading="lazy"
              className="w-[420px] md:w-[480px] h-auto select-none pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
