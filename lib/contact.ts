export const contactEmail = "marzcreativedesign@gmail.com"
export function whatsappUrl(message = "Olá, Rafael! Quero conversar sobre um site para minha empresa.") {
  return `https://wa.me/5571993972676?text=${encodeURIComponent(message)}`
}
export const navLinks = [
  { href: "#processo", label: "Processo" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#precos", label: "Investimento" },
  { href: "#por-que-um-site", label: "Por que um site?" },
  { href: "#faq", label: "FAQ" },
]
