import { whatsappUrl } from "@/lib/contact"
import CareDetails from "./CareDetails"
import Reveal from "./ui/Reveal"
import TextReveal from "./ui/TextReveal"

const items = [
  ["Já tenho Instagram. Por que preciso de um site?", "O Instagram cria relacionamento. Seu site organiza serviços, projetos e contato em um endereço próprio, que recebe visitas de buscas, indicações e campanhas."],
  ["Meu site pode aparecer no Google e no ChatGPT?", "Sim. Eu organizo o site para que mecanismos de busca entendam melhor sua empresa. A posição nos resultados depende da concorrência, do conteúdo e das regras de cada plataforma."],
  ["Landing page ou institucional: qual escolher?", "A landing page destaca uma oferta em uma página. O institucional apresenta sua empresa e seus serviços em até 5 páginas. Outros formatos são definidos sob consulta."],
  ["Quanto tempo leva?", "Até 7 dias para landing pages e de 2 a 4 semanas para institucionais, após receber os materiais combinados. O prazo depende do escopo e das aprovações."],
  ["Preciso fornecer textos e imagens?", "Eu oriento a organização do conteúdo. Combinamos os materiais, as responsabilidades e as revisões antes de começar."],
  ["Como funciona o pagamento?", "A criação pode ser dividida entre aprovação e entrega. Condições de cartão e parcelamento são combinadas na proposta, com valor total e datas definidos antes da contratação."],
  ["O que está incluído na mensalidade?", "A landing page tem hospedagem e cuidado técnico por R$ 100/mês. O institucional inclui acompanhamento e relatórios trimestrais por R$ 250/mês. São mensalidades obrigatórias; projetos específicos têm condições sob consulta."],
  ["O domínio está incluído?", "Não. Registro e renovação são cobrados separadamente, conforme disponibilidade e período contratado. Se você já possui um domínio, podemos utilizá-lo."],
]

export default function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-20 border-t border-[var(--line-subtle)]">
      <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-12 gap-9 md:gap-16">
        <Reveal className="md:col-span-4">
          <p className="eyebrow">Perguntas frequentes</p>
          <h2 className="section-title">
            <TextReveal>Antes<br />de começar.</TextReveal>
          </h2>
          <p className="text-sm text-[#5F6368] mt-4 leading-relaxed">O essencial para tirar seu projeto do papel.</p>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 text-sm text-[#3D6AFF] font-medium">Tirar outra dúvida →</a>
        </Reveal>
        <div className="md:col-span-8 border-t border-[var(--line-subtle)]">
          {items.map(([question, answer], index) => (
            <Reveal key={question} delay={index * 60}>
              <details name="faq" className="group border-b border-[var(--line-subtle)]">
                <summary className="faq-summary flex justify-between items-center gap-5 py-5 cursor-pointer font-medium text-base">{question}<span aria-hidden="true" className="text-[#3D6AFF] text-xl shrink-0 group-open:rotate-45 transition-transform">+</span></summary>
                <div className="pb-5 pr-5"><p className="text-sm text-[#5F6368] leading-relaxed">{answer}</p>{index === 6 && <CareDetails label="Ver as entregas de cada plano" />}</div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
