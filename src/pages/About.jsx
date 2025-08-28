import { useState, useEffect } from "react";
import { FiPackage, FiUser, FiThumbsUp } from "react-icons/fi";
import api from "../api";

export default function About() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    api
      .get("/certificates")
      .then(({ data }) => {
        if (!cancelled) {
          const apiCerts = Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data)
              ? data
              : [];
          setCertificates(apiCerts);
        }
      })
      .catch((error) => {
        console.warn("Failed to load certificates from API:", error.message);
        // Keep fallback empty array on error
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);
  return (
    <main className="pt-28 bg-[var(--page-bg)]">
      <section className="py-10 md:py-16">
        <div className="container-max grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-slate-900 font-extrabold uppercase leading-tight text-5xl md:text-6xl">
              О компании
              <br /> VMI-Filter
            </h1>
            <p className="text-slate-600 text-lg leading-7">
              Мы специализируемся на поставках высококачественных промышленных
              фильтров, насосов и расходных материалов. Работаем с проверенными
              поставщиками и помогаем подобрать оптимальные решения под задачи
              клиента.
            </p>
          </div>

          <div className="justify-self-end">
            <img
              src="/images/about-hero.png"
              alt="VMI — промышленные фильтры"
              className="w-full max-w-[520px] drop-shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container-max">
          <div className="border-y border-slate-200">
            <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x divide-slate-200">
              {/* 100+ */}
              <div className="flex items-start gap-6 px-6 md:px-8 py-8">
                <div className="flex-1">
                  <div className="text-orange-500 text-[36px] md:text-[40px] font-medium leading-none">
                    100+
                  </div>
                  <div className="text-slate-900 text-lg md:text-xl font-normal mt-2">
                    наименований
                  </div>
                  <div className="text-slate-500 text-sm mt-4">
                    в каталоге продукции
                  </div>
                </div>
                <img
                  src="/stickers/stat-1.svg"
                  alt=""
                  className="w-10 h-10 mt-1 shrink-0"
                  loading="lazy"
                />
              </div>

              <div className="flex items-start gap-6 px-6 md:px-8 py-8">
                <div className="flex-1">
                  <div className="text-orange-500 text-[36px] md:text-[40px] font-medium leading-none">
                    30+
                  </div>
                  <div className="text-slate-900 text-lg md:text-xl font-normal mt-2">
                    человек
                  </div>
                  <div className="text-slate-500 text-sm mt-4">
                    в нашей команде
                  </div>
                </div>
                <img
                  src="/stickers/stat-2.svg"
                  alt=""
                  className="w-10 h-10 mt-1 shrink-0"
                  loading="lazy"
                />
              </div>

              <div className="flex items-start gap-6 px-6 md:px-8 py-8">
                <div className="flex-1">
                  <div className="text-orange-500 text-[36px] md:text-[40px] font-medium leading-none">
                    3
                  </div>
                  <div className="text-slate-900 text-lg md:text-xl font-normal mt-2">
                    года
                  </div>
                  <div className="text-slate-500 text-sm mt-4">
                    работаем на рынке
                  </div>
                </div>
                <img
                  src="/stickers/stat-3.svg"
                  alt=""
                  className="w-10 h-10 mt-1 shrink-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-max">
          <div className="relative pb-8 md:pb-10">
            <div className="absolute inset-x-0 top-0 h-px bg-slate-200 opacity-0 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-slate-200 opacity-0 pointer-events-none" />

            <div className="grid gap-6 md:gap-10 md:grid-cols-[420px,1fr]">
              <h2 className="leading-tight font-semibold text-[34px] md:text-[40px]">
                <span className="text-orange-500">Сертификаты</span>
                <br />
                <span className="text-slate-900">брендов</span>
              </h2>
              <p className="text-slate-600 text-[15px] leading-7 max-w-[540px]">
                Сертификаты перечисленных брендов в активе компании — это
                доказательство стабильности и успешности предприятия, большого
                опыта и доверия покупателей.
              </p>
            </div>
          </div>

          {loading && (
            <div className="text-slate-500 mb-6">Загрузка сертификатов…</div>
          )}

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {certificates.length > 0
              ? certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white border border-slate-200 rounded-xl shadow-sm p-3 flex items-center justify-center"
                  >
                    <img
                      src={cert.file}
                      alt={cert.title}
                      className="h-[320px] lg:h-[360px] w-auto object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                ))
              : // Fallback certificates if API is empty or failed
                ["1", "2", "3", "4"].map((n) => (
                  <div
                    key={n}
                    className="bg-white border border-slate-200 rounded-xl shadow-sm p-3 flex items-center justify-center"
                  >
                    <img
                      src={`/images/cert-${n}.png`}
                      alt={`Сертификат ${n}`}
                      className="h-[320px] lg:h-[360px] w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container-max">
          <div className="grid gap-8 md:gap-10 md:grid-cols-[1fr,440px] items-start py-8 md:py-10">
            <div>
              <h3 className="text-slate-900 text-[34px] md:text-[44px] leading-tight font-light">
                Напишите нам{" "}
                <span className="text-orange-500 font-normal">
                  прямо сейчас
                </span>
              </h3>

              <p className="text-slate-600 mt-3 font-normal">
                Наши менеджеры свяжутся с вами в ближайшее время.
              </p>

              <button
                type="button"
                className="mt-6 h-11 w-[280px] rounded-md border border-orange-500
                           text-orange-500 hover:bg-orange-500 hover:text-white
                           transition"
                data-open-contact
              >
                Оставить заявку
              </button>
            </div>

            <img
              src="/images/contact.png"
              alt=""
              className="justify-self-end w-[320px] md:w-[440px] drop-shadow-2xl md:translate-x-4"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
