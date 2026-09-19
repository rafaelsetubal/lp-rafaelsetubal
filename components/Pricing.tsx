import CareDetails from "./CareDetails"
import { whatsappUrl } from "@/lib/contact"
import Reveal from "./ui/Reveal"
import TextReveal from "./ui/TextReveal"

const plans = [
  {
    name: "Landing page", price: "R$ 700", featured: false,
    description: "Uma página focada na sua oferta, campanha ou serviço.",
    items: ["1 página · até 6 seções", "Foco em uma oferta", "Design sob medida", "WhatsApp + formulário", "Preparação para buscas", "Entrega em até 7 dias*"],
    cta: "Quero uma landing page", message: "Olá, Rafael! Tenho interesse na landing page a partir de R$ 700 + R$ 100/mês de hospedagem e cuidado técnico.",
  },
  {
    name: "Site institucional", price: "R$ 2.000", featured: true,
    description: "Sua empresa, seus serviços e sua experiência em uma estrutura completa.",
    items: ["Até 5 páginas", "Empresa e serviços em detalhe", "Portfólio e prova de experiência", "WhatsApp + formulário", "Estrutura para buscas e IA", "Medição de acessos e contatos"],
    cta: "Quero um site institucional", message: "Olá, Rafael! Tenho interesse no site institucional a partir de R$ 2.000 + R$ 250/mês de acompanhamento.",
  },
]

export default function Pricing() {
  return (
    <section id="precos" className="py-16 md:py-24 border-t border-[var(--line-subtle)]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-6 items-end mb-12">
          <Reveal className="md:col-span-7">
            <p className="eyebrow">Investimento</p>
            <h2 className="section-title">
              <TextReveal>Quanto custa<br /><span className="text-[#3D6AFF]">um site?</span></TextReveal>
            </h2>
          </Reveal>
          <Reveal className="md:col-span-5" delay={200}>
            <p className="max-w-md text-[#5F6368] leading-relaxed">Uma oferta em destaque ou sua empresa por completo. Escolha o formato para o seu momento.</p>
          </Reveal>
        </div>
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} as="article" delay={i * 200} className={plan.featured ? "pricing-featured relative isolate lg:col-span-5 rounded-[24px] border border-[#B9CCFF] p-7 md:p-9 flex flex-col shadow-[0_16px_48px_rgba(61,106,255,0.10)]" : "lg:col-span-3 py-7 lg:py-9 flex flex-col"}>
              {plan.featured && <span className="self-start mb-5 rounded-full bg-[#3D6AFF] px-3.5 py-1.5 text-[11px] font-medium text-white">Presença completa</span>}
              <h3 className="eyebrow !text-[#44516A]">{plan.name}</h3>
              <p className="text-xs text-[#5F6368]">Criação a partir de</p>
              <p className={`font-heading font-semibold tracking-tight mt-2 ${plan.featured ? "text-5xl metallic-pulse-text" : "text-4xl"}`}>{plan.price}</p>
              <p className="mt-5 text-sm leading-relaxed text-[#5F6368]">{plan.description}</p>
              <ul className="mt-6 pt-6 border-t border-[#DDE3EF] space-y-3 mb-7">
                {plan.items.map((item) => <li key={item} className="flex gap-2.5 text-sm leading-relaxed"><span aria-hidden="true" className="text-[#3D6AFF]">✓</span><span>{item}</span></li>)}
              </ul>
              <div className="mt-auto">
                <p className="text-sm font-medium">+ {plan.featured ? "R$ 250/mês" : "R$ 100/mês"}</p>
                <p className="text-xs text-[#5F6368] mt-1">{plan.featured ? "Acompanhamento e relatórios trimestrais" : "Hospedagem e cuidado técnico"}</p>
                <div className="mb-4"><CareDetails /></div>
                <a href={whatsappUrl(plan.message)} target="_blank" rel="noopener noreferrer" className={`${plan.featured ? "btn-primary-blue" : "btn-secondary-white"} block px-4 py-3.5 text-sm text-center`}>{plan.cta} →</a>
              </div>
            </Reveal>
          ))}
          <Reveal as="article" delay={400} className="lg:col-span-4 py-7 lg:py-9 lg:pl-5 flex flex-col border-t lg:border-t-0 border-[var(--line-subtle)]">
            <h3 className="eyebrow">Projeto específico</h3>
            <p className="text-xs text-[#5F6368]">Para outras necessidades</p>
            <p className="font-heading font-semibold text-4xl tracking-tight mt-2">Sob consulta</p>
            <p className="mt-5 text-sm leading-relaxed text-[#5F6368]">Uma estrutura pensada para o que seu projeto precisa.</p>
            <ul className="mt-6 pt-6 border-t border-[#DDE3EF] space-y-3 mb-7 text-sm">
              {["Escopo personalizado", "Funcionalidades e integrações", "Cronograma sob medida"].map((item) => <li key={item} className="flex gap-2.5"><span aria-hidden="true" className="text-[#3D6AFF]">✓</span>{item}</li>)}
            </ul>
            <p className="text-sm leading-relaxed text-[#5F6368] mb-6">Escopo, investimento e acompanhamento definidos na proposta.</p>
            <a href={whatsappUrl("Olá, Rafael! Quero conversar sobre um projeto específico.")} target="_blank" rel="noopener noreferrer" className="btn-secondary-white block mt-auto px-4 py-3.5 text-sm text-center">Conversar sobre minha ideia →</a>
          </Reveal>
        </div>
        <Reveal delay={300}>
          <div className="mt-9 pt-6 border-t border-[var(--line-subtle)] text-sm text-[#5F6368]">
            <p><span className="font-medium text-[#111111]">Nos dois planos:</span> versão para celular, publicação e atendimento direto. Mensalidade obrigatória conforme o plano; domínio à parte.</p>
            <p className="mt-3 text-xs leading-relaxed">* Prazos após materiais e aprovações: landing page até 7 dias; institucional de 2 a 4 semanas. Registro e renovação de domínio cobrados separadamente. Condições de cartão e parcelamento são combinadas na proposta.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
