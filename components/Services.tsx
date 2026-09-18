import Link from "next/link"

export default function Services() {
  return (
    <section id="servicos" className="py-24 md:py-32 border-t border-[rgba(17,17,17,0.10)] bg-transparent relative z-10">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Editorial Section Header on 12-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16 md:mb-20 items-end">
          <div className="md:col-span-7">
            <span className="font-sans text-[0.72rem] md:text-[0.78rem] uppercase tracking-[0.16em] text-[#8A8F98] font-medium block mb-4">
              Sites sob medida
            </span>
            <h2 className="font-heading text-[2rem] sm:text-[2.5rem] md:text-[2.85rem] font-semibold tracking-[-0.03em] leading-[1.08] text-[#111111]">
              Soluções para cada etapa do seu negócio.
            </h2>
          </div>
          <div className="md:col-span-5 md:pl-6">
            <p className="font-sans text-sm md:text-base text-[#5F6368] font-normal leading-relaxed">
              Do site simples e objetivo ao projeto mais complexo, sempre com foco em resultado, performance e uma experiência de alto nível.
            </p>
          </div>
        </div>

        {/* 3 Services on 12-column grid with contextual vertical lines strictly within this block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-0 pt-12 pb-12 border-t border-b border-[rgba(17,17,17,0.10)]">

          {/* Service 01 — cols 1-4 */}
          <div className="md:col-span-4 md:pr-8 lg:pr-12 flex flex-col justify-between">
            <div>
              <span className="font-sans text-xs md:text-sm font-medium text-[#8A8F98] block mb-5">
                01
              </span>
              <h3 className="font-heading font-semibold text-xl md:text-[1.35rem] text-[#111111] mb-3 tracking-tight">
                Landing Page
              </h3>
              <p className="font-sans text-sm md:text-[0.9375rem] text-[#5F6368] leading-relaxed mb-8 font-normal">
                Ideal para lançamentos, campanhas e validação de ideias. Páginas objetivas para gerar resultados.
              </p>
            </div>
            <div>
              <Link
                href="#contato"
                className="font-sans font-medium text-sm text-[#3D6AFF] hover:text-[#2F59E8] transition-colors inline-flex items-center gap-1 group"
              >
                A partir de R$ 700 <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Service 02 — cols 5-8 */}
          <div className="md:col-span-4 md:px-8 lg:px-12 md:border-l md:border-[rgba(17,17,17,0.10)] flex flex-col justify-between">
            <div>
              <span className="font-sans text-xs md:text-sm font-medium text-[#8A8F98] block mb-5">
                02
              </span>
              <h3 className="font-heading font-semibold text-xl md:text-[1.35rem] text-[#111111] mb-3 tracking-tight">
                Site Institucional
              </h3>
              <p className="font-sans text-sm md:text-[0.9375rem] text-[#5F6368] leading-relaxed mb-8 font-normal">
                Para empresas que precisam apresentar sua história, serviços e soluções de forma profissional.
              </p>
            </div>
            <div>
              <Link
                href="#contato"
                className="font-sans font-medium text-sm text-[#3D6AFF] hover:text-[#2F59E8] transition-colors inline-flex items-center gap-1 group"
              >
                A partir de R$ 2.000 <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

          {/* Service 03 — cols 9-12 */}
          <div className="md:col-span-4 md:pl-8 lg:pl-12 md:border-l md:border-[rgba(17,17,17,0.10)] flex flex-col justify-between">
            <div>
              <span className="font-sans text-xs md:text-sm font-medium text-[#8A8F98] block mb-5">
                03
              </span>
              <h3 className="font-heading font-semibold text-xl md:text-[1.35rem] text-[#111111] mb-3 tracking-tight">
                Projeto Específico
              </h3>
              <p className="font-sans text-sm md:text-[0.9375rem] text-[#5F6368] leading-relaxed mb-8 font-normal">
                Soluções personalizadas para demandas mais complexas. Escopo e investimento definidos individualmente.
              </p>
            </div>
            <div>
              <Link
                href="#contato"
                className="font-sans font-medium text-sm text-[#3D6AFF] hover:text-[#2F59E8] transition-colors inline-flex items-center gap-1 group"
              >
                Sob consulta <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
