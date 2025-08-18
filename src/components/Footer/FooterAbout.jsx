export default function FooterAbout() {
  const address = [
    "г. Москва, Николоямский переулок,",
    "дом 4–6, строение 3, пом. IV, офис 3В",
  ];
  const links = [
    "Топливные фильтры",
    "Масляные фильтры",
    "Воздушные фильтры",
    "Насосы",
    "О компании",
  ];

  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="container-max py-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <img src="/logo.svg" alt="VMI" className="w-[78px] h-[28px]" />
            <ul className="mt-5 space-y-3 text-slate-700">
              {links.map((t) => (
                <li key={t}>
                  <a href="#" className="hover:text-slate-900">
                    {t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-slate-700">
            {address.map((row) => (
              <div key={row}>{row}</div>
            ))}
          </div>

          <div className="md:text-right space-y-3">
            <a href="tel:+79262556850" className="text-orange-500 hover:text-orange-600">
              8 (926) 255-68-50
            </a>
            <div>
              <a href="tel:+74953692715" className="text-orange-500 hover:text-orange-600">
                8 (495) 369-27-15
              </a>
            </div>
            <div>
              <a
                href="mailto:info@vmi-filtr.ru"
                className="text-orange-500 hover:text-orange-600"
              >
                info@vmi-filtr.ru
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-right">
          <a href="#" className="text-slate-400 text-xs hover:text-slate-600">
            Политика обработки персональных данных
          </a>
        </div>
      </div>
    </footer>
  );
}
