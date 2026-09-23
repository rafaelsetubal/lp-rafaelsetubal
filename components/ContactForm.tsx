"use client"

import { useRef, useState } from "react"
import { contactEmail, whatsappUrl } from "@/lib/contact"
import Reveal from "./ui/Reveal"
import TextReveal from "./ui/TextReveal"

type FieldErrors = { nome?: string; contato?: string }

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formData, setFormData] = useState({
    nome: "",
    contato: "",
    tipo: "",
    descricao: ""
  })
  const submitting = useRef(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
    if (status === "error") {
      setErrorMessage("")
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return

    const name = formData.nome.trim()
    const contact = formData.contato.trim()
    const nextErrors: FieldErrors = {}

    if (name.length < 2) {
      nextErrors.nome = "Por favor, informe seu nome ou como prefere ser chamado."
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phonePattern = /^\d{10,15}$/
    const cleanedPhone = contact.replace(/[\s()+.-]/g, "")

    if (!emailPattern.test(contact) && !phonePattern.test(cleanedPhone)) {
      nextErrors.contato = "Informe um e-mail válido ou WhatsApp com DDD (ex: 71 99999-9999)."
    }

    setErrors(nextErrors)
    setErrorMessage("")

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error")
      const firstErrorField = nextErrors.nome ? "#nome" : "#contato-input"
      document.querySelector<HTMLInputElement>(firstErrorField)?.focus()
      return
    }

    submitting.current = true
    setStatus("sending")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: name,
          empresa: "",
          contato: contact,
          descricao: formData.descricao.trim(),
          website: "",
          necessidades: formData.tipo ? [formData.tipo] : []
        }),
        signal: AbortSignal.timeout(15000),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.ok) {
        setStatus("error")
        setErrorMessage(
          result?.error ||
            "Não foi possível concluir o envio no momento. Seus dados foram preservados abaixo para você tentar novamente ou continuar pelo WhatsApp."
        )
        return
      }

      setStatus("success")
      window.fbq?.("track", "Lead")
    } catch {
      setStatus("error")
      setErrorMessage(
        "Houve uma instabilidade temporária na conexão. Seus dados foram preservados abaixo; você pode tentar de novo ou me chamar diretamente pelo WhatsApp."
      )
    } finally {
      submitting.current = false
    }
  }

  const resetForm = () => {
    setFormData({
      nome: "",
      contato: "",
      tipo: "",
      descricao: ""
    })
    setErrors({})
    setErrorMessage("")
    setStatus("idle")
  }

  const getInputClass = (hasError: boolean) =>
    `w-full rounded-xl px-4 py-3.5 text-sm transition-all duration-200 outline-none ${
      hasError
        ? "border-2 border-red-500 bg-red-50/30 text-[#111111] focus:ring-4 focus:ring-red-500/15"
        : "border border-[#D5D9E1] bg-white text-[#111111] hover:border-[#B5BAC6] focus:border-[#3D6AFF] focus:ring-4 focus:ring-[#3D6AFF]/15"
    } placeholder:text-[#858B96]`

  return (
    <section id="contato" className="py-16 md:py-24 bg-[#F7F9FD] border-t border-[var(--line-subtle)]">
      <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-12 gap-10 md:gap-16 items-start">
        
        {/* COLUNA ESQUERDA: APRESENTAÇÃO */}
        <Reveal className="md:col-span-5">
          <p className="eyebrow">Seu próximo passo</p>
          <h2 className="section-title">
            <TextReveal>Vamos falar<br />do seu projeto?</TextReveal>
          </h2>
          <p className="text-[#5F6368] mt-5 leading-relaxed max-w-sm">
            Me conte sua ideia. Eu ajudo a definir o formato, o escopo ideal e os próximos passos para colocar seu site no ar.
          </p>
          
          <div className="mt-8 space-y-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-blue inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-medium"
            >
              <span>Conversar pelo WhatsApp</span>
              <span className="text-base leading-none">→</span>
            </a>
            
            <p className="text-xs text-[#5F6368] pt-1">
              Atendimento direto e sem intermediários.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[var(--line-subtle)]">
            <span className="block text-xs uppercase tracking-wider text-[#8A8F98] font-medium mb-1">
              E-mail de contato
            </span>
            <a
              className="text-sm font-medium text-[#111111] hover:text-[#3D6AFF] transition-colors break-all"
              href={`mailto:${contactEmail}`}
            >
              {contactEmail}
            </a>
          </div>
        </Reveal>

        {/* COLUNA DIREITA: FORMULÁRIO OU SUCESSO */}
        <Reveal delay={200} className="md:col-span-7">
          {status === "success" ? (
            /* ================= ESTADO DE SUCESSO ================= */
            <div className="bg-white border border-[var(--line-default)] rounded-2xl p-8 sm:p-12 shadow-sm text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
              
              {/* Ícone com gradiente azul e glow refinado */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#244fc9] via-[#3D6AFF] to-[#80A2FF] flex items-center justify-center text-white shadow-lg shadow-[#3D6AFF]/30 mb-6 transform transition-transform hover:scale-105 duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight">
                Mensagem enviada com sucesso!
              </h3>

              <p className="text-sm sm:text-base text-[#5F6368] mt-3.5 max-w-md leading-relaxed">
                Recebi suas informações com sucesso. Vou analisar sua solicitação e entrarei em contato em breve pelo retorno informado.
              </p>

              <div className="mt-8 pt-6 border-t border-[var(--line-subtle)] w-full flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappUrl(`Olá, Rafael! Acabei de enviar uma mensagem pelo site (${formData.nome || "contato"}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-blue w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-xs sm:text-sm font-medium"
                >
                  Agilizar pelo WhatsApp →
                </a>
                
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary-white w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 text-xs sm:text-sm font-medium text-[#5F6368] hover:text-[#111111]"
                >
                  Enviar outra mensagem
                </button>
              </div>
            </div>
          ) : (
            /* ================= ESTADO DO FORMULÁRIO ================= */
            <div className="bg-white border border-[var(--line-default)] rounded-2xl p-6 sm:p-9 shadow-sm">
              <div className="mb-6">
                <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#111111] tracking-tight">
                  Prefere deixar uma mensagem?
                </h3>
                <p className="text-xs sm:text-sm text-[#5F6368] mt-1">
                  Preencha os campos abaixo para receber uma proposta personalizada.
                </p>
              </div>

              {/* BANNER DE ERRO GLOBAL (SE HOUVER) */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-50/80 border border-red-200 text-red-900 text-xs sm:text-sm flex items-start gap-3">
                  <span className="text-red-600 font-bold text-base leading-none mt-0.5">✕</span>
                  <div className="flex-1 leading-relaxed">
                    <p className="font-medium text-red-950">Atenção ao envio:</p>
                    <p className="mt-0.5 text-red-800">{errorMessage}</p>
                    <div className="mt-2.5">
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-red-900 hover:text-red-700 underline text-xs"
                      >
                        Falar diretamente pelo WhatsApp →
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={submit} noValidate className="space-y-4" aria-busy={status === "sending"}>
                <div className="grid sm:grid-cols-2 gap-4">
                  
                  {/* CAMPO: NOME */}
                  <div>
                    <label htmlFor="nome" className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1.5">
                      Seu Nome <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange("nome", e.target.value)}
                      required
                      minLength={2}
                      maxLength={120}
                      autoComplete="name"
                      placeholder="Como posso te chamar?"
                      className={getInputClass(!!errors.nome)}
                      aria-invalid={!!errors.nome}
                      aria-describedby={errors.nome ? "nome-error" : undefined}
                    />
                    {errors.nome && (
                      <p id="nome-error" className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0-10a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.nome}</span>
                      </p>
                    )}
                  </div>

                  {/* CAMPO: CONTATO */}
                  <div>
                    <label htmlFor="contato-input" className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1.5">
                      WhatsApp ou E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contato-input"
                      name="contato"
                      value={formData.contato}
                      onChange={(e) => handleInputChange("contato", e.target.value)}
                      required
                      maxLength={200}
                      placeholder="seuemail@empresa.com ou (71) 99999-9999"
                      className={getInputClass(!!errors.contato)}
                      aria-invalid={!!errors.contato}
                      aria-describedby={errors.contato ? "contato-error" : undefined}
                    />
                    {errors.contato && (
                      <p id="contato-error" className="text-xs text-red-600 font-medium mt-1.5 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="currentColor">
                          <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0-10a1 1 0 0 1 1 1v3a1 1 0 0 1-2 0V6a1 1 0 0 1 1-1zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.contato}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* CAMPO: TIPO DE PROJETO */}
                <div>
                  <label htmlFor="tipo" className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1.5">
                    Tipo de projeto <span className="font-normal text-[#8A8F98] lowercase">(opcional)</span>
                  </label>
                  <select
                    id="tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={(e) => handleInputChange("tipo", e.target.value)}
                    className={getInputClass(false)}
                  >
                    <option value="">Ainda estou decidindo</option>
                    <option value="Landing Page">Landing Page (a partir de R$ 700)</option>
                    <option value="Site Institucional">Site Institucional (a partir de R$ 2.000)</option>
                    <option value="Outro projeto">Projeto Específico / Sob Consulta</option>
                  </select>
                </div>

                {/* CAMPO: MENSAGEM */}
                <div>
                  <label htmlFor="descricao" className="block text-xs font-semibold uppercase tracking-wider text-[#111111] mb-1.5">
                    Sua mensagem <span className="font-normal text-[#8A8F98] lowercase">(opcional)</span>
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    value={formData.descricao}
                    onChange={(e) => handleInputChange("descricao", e.target.value)}
                    rows={3}
                    maxLength={4000}
                    placeholder="Conte um pouco sobre sua empresa, prazo ou o que você gostaria de criar..."
                    className={getInputClass(false)}
                  />
                </div>

                {/* HONEYPOT */}
                <div hidden aria-hidden="true">
                  <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>

                {/* FOOTER DO FORMULÁRIO */}
                <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                  <p className="text-xs leading-relaxed text-[#5F6368] max-w-xs">
                    Seus dados são confidenciais e serão usados exclusivamente para responder a esta solicitação.
                  </p>
                  
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary-blue shrink-0 px-7 py-3.5 text-sm font-medium disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Enviando mensagem…</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar mensagem</span>
                        <span className="text-base leading-none">→</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  )
}
