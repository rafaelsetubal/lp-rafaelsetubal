import type { Metadata } from "next"
import { Fustat, Inter_Tight } from "next/font/google"
import "./globals.css"

const fustat = Fustat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

export const metadata: Metadata = {
  ...(process.env.SITE_URL ? { metadataBase: new URL(process.env.SITE_URL), alternates: { canonical: "/" } } : {}),
  title: "rafael setubal® — Landing Pages e Sites Institucionais",
  description:
    "Sites e landing pages para apresentar seu negócio além das redes sociais. Landing pages a partir de R$ 700 + R$ 100/mês; institucionais a partir de R$ 2.000 + R$ 250/mês. Domínio à parte.",
  openGraph: {
    title: "rafael setubal® — Landing Pages e Sites Institucionais",
    description:
      "Sites e landing pages para apresentar seu negócio além das redes sociais. Landing pages a partir de R$ 700 + R$ 100/mês; institucionais a partir de R$ 2.000 + R$ 250/mês. Domínio à parte.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body

        className={`${fustat.variable} ${interTight.variable} font-sans antialiased text-[#111111] bg-white selection:bg-[#3D6AFF] selection:text-white`}
      >
        {children}
      </body>
    </html>
  )
}
