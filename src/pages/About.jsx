export default function About() {
  return (
    <main className="pt-28 bg-white">
      <section className="py-10 md:py-16">
        <div className="container-max grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-slate-900 font-extrabold uppercase leading-tight text-5xl md:text-6xl">
              О компании<br /> VMI-Filter
            </h1>
            <p className="text-slate-600 text-lg leading-7">
              Мы специализируемся на поставках высококачественных
              промышленных фильтров, насосов и расходных материалов.
              Работаем с проверенными поставщиками и помогаем подобрать
              оптимальные решения под задачи клиента.
            </p>
          </div>

          <div className="justify-self-end">
            <img
              src="/images/about-hero.png"
              alt="VMI — промышленные фильтры"
              className="w-full max-w-[520px] drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-max grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="text-orange-500 text-3xl font-extrabold mb-1">100+</div>
            <div className="text-slate-900 font-medium">наименований</div>
            <div className="text-slate-500 text-sm mt-1">в каталоге продукции</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="text-orange-500 text-3xl font-extrabold mb-1">30+</div>
            <div className="text-slate-900 font-medium">человек</div>
            <div className="text-slate-500 text-sm mt-1">в нашей команде</div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="text-orange-500 text-3xl font-extrabold mb-1">3</div>
            <div className="text-slate-900 font-medium">года</div>
            <div className="text-slate-500 text-sm mt-1">работаем на рынке</div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-max grid items-start gap-10 md:grid-cols-[320px,1fr]">
          <div>
            <h2 className="text-slate-900 text-3xl md:text-4xl font-semibold">
              Сертификаты брендов
            </h2>
            <p className="text-slate-600 mt-4">
              Сертификаты проверенных брендов в открытом доступе — это
              подтверждение стабильных поставок и качества продукции.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["1","2","3","4"].map(n => (
              <img
                key={n}
                src={`/images/cert-${n}.jpg`}
                alt={`Сертификат ${n}`}
                className="bg-white border border-slate-200 rounded-lg shadow-sm p-2 w-full"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-max grid items-end gap-8 md:grid-cols-[1fr,420px]">
          <div className="max-w-xl">
            <h3 className="text-slate-900 text-3xl md:text-4xl font-semibold">
              Напишите нам <span className="text-orange-500">прямо сейчас</span>
            </h3>
            <p className="text-slate-600 mt-3">Наши менеджеры свяжутся с вами в ближайшее время.</p>

            <form className="mt-5 flex max-w-md">
              <input
                type="text"
                placeholder="Оставить заявку"
                className="flex-1 h-11 rounded-md border-2 border-orange-400 px-4 text-slate-900 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="ml-3 h-11 px-5 rounded-lg border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition"
              >
                Отправить
              </button>
            </form>
          </div>
          <img src="/images/filters-cta.png" alt="" className="w-full max-w-[420px] justify-self-end" />
        </div>
      </section>
    </main>
  );
}
