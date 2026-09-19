import { whatsappUrl } from "@/lib/contact"
import CareDetails from "./CareDetails"
import Reveal from "./ui/Reveal"
import TextReveal from "./ui/TextReveal"

const steps = [
  ["Conversa", "Entendemos seu negócio e o que o site precisa fazer."],
  ["Proposta", "Você conhece o escopo, o prazo e o investimento."],
  ["Planejamento", "Alinhamos a estrutura, os textos e as imagens."],
  ["Criação", "Eu desenvolvo. Você acompanha e participa dos ajustes."],
  ["Publicação", "Testamos e colocamos seu site no ar."],
  ["Continuidade", "Cuidado técnico e acompanhamento conforme o plano."],
]

export default function Process() {
  return (
    <section id="processo" className="py-16 md:py-24 border-t border-[var(--line-subtle)]">
      <div className="max-w-[1160px] mx-auto px-6 grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
        <Reveal className="lg:col-span-5 lg:col-start-8 lg:row-start-1">
          <p className="eyebrow">Você fala direto com quem faz</p>
          <h2 className="font-heading text-[2.5rem] sm:text-5xl lg:text-[3.4rem] font-semibold tracking-[-.04em] leading-[1.04]">
            <TextReveal>
              Sua ideia.<br />Um caminho claro.<br /><span className="text-[#3D6AFF] metallic-pulse-text">Seu site no ar.</span>
            </TextReveal>
          </h2>
          <p className="mt-5 text-[#5F6368] leading-relaxed max-w-sm">Do primeiro contato à publicação, você sabe o que acontece e qual é o próximo passo.</p>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-secondary-white inline-block px-6 py-3.5 mt-7 text-sm">Vamos dar o primeiro passo →</a>
        </Reveal>
        <ol className="lg:col-span-6 lg:col-start-1 lg:row-start-1 relative">
          {steps.map(([title, text], index) => (
            <Reveal key={title} as="li" delay={index * 100} className="relative grid grid-cols-[48px_1fr] sm:grid-cols-[60px_1fr] gap-4 sm:gap-6 pb-6 last:pb-0">
              {index < steps.length - 1 && <span aria-hidden="true" className="absolute left-[23px] sm:left-[29px] top-11 bottom-0 w-px bg-[#DCE3F1]" />}
              <span className={`relative z-10 flex items-center justify-center h-11 w-11 sm:w-[60px] font-heading text-xl ${index === 5 ? "text-[#3D6AFF]" : "text-[#9099AB]"}`}>0{index + 1}</span>
              <div className="pt-1"><h3 className="font-heading font-semibold text-xl mb-1">{title}</h3><p className="text-sm text-[#5F6368] leading-relaxed">{text}</p>{index === 5 && <CareDetails label="Conhecer as entregas" />}</div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
