"use client"

import { useRef, useState } from "react"
import { contactEmail, whatsappUrl } from "@/lib/contact"
import Reveal from "./ui/Reveal"
import TextReveal from "./ui/TextReveal"

const inputClass = "w-full border border-[#D5D9E1] rounded-xl px-3.5 py-3 mt-2 bg-white text-sm placeholder:text-[#858B96]"
type FieldErrors = { nome?: string; contato?: string }

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const submitting = useRef(false)

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("nome") || "").trim()
    const contact = String(data.get("contato") || "").trim()
    const nextErrors: FieldErrors = {}
    if (name.length < 2) nextErrors.nome = "Informe seu nome."
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && !/^\d{10,15}$/.test(contact.replace(/[\s()+.-]/g, ""))) {
      nextErrors.contato = "Informe um e-mail ou telefone com DDD."
    }
    setErrors(nextErrors)
    setMessage("")
    if (Object.keys(nextErrors).length) {
      setStatus("idle")
      form.querySelector<HTMLInputElement>(nextErrors.nome ? "#nome" : "#contato-input")?.focus()
      return
    }
    submitting.current = true
    setStatus("sending")
    const type = String(data.get("tipo") || "")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: name, empresa: "", contato: contact, descricao: data.get("descricao"), website: data.get("website"), necessidades: type ? [type] : [] }),
        signal: AbortSignal.timeout(15000),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.ok) {
        setStatus("error")
        setMessage(result?.error || "Não foi possível enviar agora. Seus dados foram mantidos; tente novamente ou fale pelo WhatsApp.")
        return
      }
      setStatus("success")
      setMessage("Mensagem enviada. Obrigado pelo contato!")
      window.fbq?.("track", "Lead")
      form.reset()
    } catch {
      setStatus("error")
      setMessage("Não foi possível confirmar o envio. Seus dados foram mantidos. Você pode tentar novamente ou falar pelo WhatsApp.")
    } finally {
      submitting.current = false
    }
  }

  return (
    <section id="contato" className="py-16 md:py-20 bg-[#F7F9FD] border-t border-[var(--line-subtle)]">
      <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-12 gap-10 md:gap-16">
        <Reveal className="md:col-span-5">
          <p className="eyebrow">Seu próximo passo</p>
          <h2 className="section-title"><TextReveal>Vamos falar<br />do seu projeto?</TextReveal></h2>
          <p className="text-[#5F6368] mt-5 leading-relaxed max-w-sm">Me conte sua ideia. Eu ajudo a definir o formato e os próximos passos.</p>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn-primary-blue inline-block px-7 py-3.5 mt-7 text-sm">Conversar pelo WhatsApp →</a>
          <a className="block mt-5 text-xs text-[#5F6368] underline break-all" href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </Reveal>
        <Reveal delay={200} className="md:col-span-7">
        <form onSubmit={submit} noValidate className="space-y-4" aria-busy={status === "sending"}>
          <h3 className="font-heading text-lg font-semibold">Prefere deixar uma mensagem?</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nome" className="text-sm font-medium">Nome</label>
              <input id="nome" name="nome" required minLength={2} maxLength={120} autoComplete="name" placeholder="Como posso te chamar?" className={inputClass} aria-invalid={!!errors.nome} aria-describedby={errors.nome ? "nome-error" : undefined} />
              {errors.nome && <p id="nome-error" className="text-xs text-red-700 mt-2">{errors.nome}</p>}
            </div>
            <div>
              <label htmlFor="contato-input" className="text-sm font-medium">WhatsApp ou e-mail</label>
              <input id="contato-input" name="contato" required maxLength={200} placeholder="Seu contato para retorno" className={inputClass} aria-invalid={!!errors.contato} aria-describedby={errors.contato ? "contato-error" : undefined} />
              {errors.contato && <p id="contato-error" className="text-xs text-red-700 mt-2">{errors.contato}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="tipo" className="text-sm font-medium">Tipo de projeto <span className="font-normal text-[#5F6368]">(opcional)</span></label>
            <select id="tipo" name="tipo" className={inputClass} defaultValue=""><option value="">Ainda estou decidindo</option><option>Landing Page</option><option>Site Institucional</option><option>Outro projeto</option></select>
          </div>
          <div>
            <label htmlFor="descricao" className="text-sm font-medium">Sua mensagem <span className="font-normal text-[#5F6368]">(opcional)</span></label>
            <textarea id="descricao" name="descricao" rows={3} maxLength={4000} placeholder="O que você gostaria de criar?" className={inputClass} />
          </div>
          <div hidden aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            <p className="text-xs leading-relaxed text-[#5F6368] max-w-xs">Seus dados serão enviados ao meu e-mail para responder a esta solicitação.</p>
            <button type="submit" disabled={status === "sending"} className="btn-primary-blue shrink-0 px-6 py-3.5 text-sm disabled:opacity-60">{status === "sending" ? "Enviando…" : "Enviar mensagem →"}</button>
          </div>
          <p role="status" aria-live="polite" className={`text-sm ${status === "error" ? "text-red-700" : "text-[#315CE6]"}`}>{message}</p>
          {status === "error" && <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-block text-sm underline">Continuar pelo WhatsApp →</a>}
        </form>
        </Reveal>
      </div>
    </section>
  )
}
