import { contactEmail } from "@/lib/contact"

export const runtime = "nodejs"
const attempts = new Map<string, { count: number; expires: number }>()
const fail = (message: string, status = 400) => Response.json({ error: message }, { status })

export async function POST(request: Request) {
  const origin = request.headers.get("origin")
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host")

  if (origin) {
    try {
      const originHost = new URL(origin).host
      const siteUrlHost = process.env.SITE_URL ? new URL(process.env.SITE_URL).host : null
      const isAllowed =
        !originHost ||
        (host && originHost === host) ||
        originHost === siteUrlHost ||
        originHost === "lp.marzcreativedesign.com" ||
        originHost === "marzcreativedesign.com" ||
        originHost.endsWith(".vercel.app") ||
        originHost.startsWith("localhost") ||
        originHost.startsWith("127.0.0.1")

      if (!isAllowed) return fail("Origem inválida.", 403)
    } catch {
      return fail("Origem inválida.", 403)
    }
  }

  if (!request.headers.get("content-type")?.includes("application/json")) return fail("Formato inválido.", 415)
  if (Number(request.headers.get("content-length")) > 16000) return fail("Mensagem muito longa.", 413)

  // Local safeguard only. Add a shared edge/WAF limit when deploying multiple instances.
  const now = Date.now()
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key)
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  const attempt = attempts.get(ip) || { count: 0, expires: now + 600000 }
  if (attempt.count >= 5 || attempts.size >= 10000) return fail("Muitas tentativas. Aguarde alguns minutos ou fale pelo WhatsApp.", 429)
  attempt.count++
  attempts.set(ip, attempt)

  let body: Record<string, unknown>
  try {
    const raw = await request.text()
    if (raw.length > 16000) return fail("Mensagem muito longa.", 413)
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fail("Dados inválidos.")
    body = parsed as Record<string, unknown>
  } catch { return fail("Dados inválidos.") }

  if (body.website) return fail("Não foi possível enviar esta mensagem.")
  
  const field = (key: string, max: number) => {
    const val = body[key]
    if (typeof val === "string") return val.trim().slice(0, max)
    return ""
  }

  const name = field("nome", 120)
  const contact = field("contato", 200)
  const company = field("empresa", 160)
  const description = field("descricao", 4000)
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const phone = contact.replace(/[\s()+.-]/g, "")
  
  if (name.length < 2 || (!emailPattern.test(contact) && !/^\d{10,15}$/.test(phone))) {
    return fail("Informe seu nome e um e-mail ou telefone válido.")
  }

  const allowed = ["Landing Page", "Site Institucional", "Outro projeto", "Acompanhamento"]
  const necessidades = Array.isArray(body.necessidades) 
    ? body.necessidades.filter((v): v is string => typeof v === "string" && allowed.includes(v))
    : []

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL || "Site <onboarding@resend.dev>"

  if (!apiKey) {
    console.error("ERRO: RESEND_API_KEY não configurada no ambiente!")
    return fail("O envio por formulário está temporariamente indisponível. Fale comigo pelo WhatsApp ou e-mail.", 503)
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${apiKey.trim()}`, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({
        from,
        to: [contactEmail],
        subject: `Novo contato pelo site — ${name}`,
        ...(emailPattern.test(contact) ? { reply_to: contact } : {}),
        text: `Nome: ${name}\nEmpresa: ${company || "Não informada"}\nContato: ${contact}\nInteresse: ${necessidades.length > 0 ? necessidades.join(", ") : "Não informado"}\n\n${description || "(Sem mensagem adicional)"}`
      }),
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      const errJson = await response.json().catch(() => null)
      console.error("Resend API error:", response.status, errJson)
      return fail("Não foi possível enviar pelo provedor de e-mail. Tente novamente ou fale pelo WhatsApp.", 502)
    }

    const result = await response.json()
    if (!result.id) return fail("Não foi possível confirmar o envio. Fale pelo WhatsApp.", 502)
    return Response.json({ ok: true })
  } catch (err) {
    console.error("Contact route exception:", err)
    return fail("O envio demorou mais que o esperado. Fale pelo WhatsApp ou tente novamente.", 502)
  }
}
