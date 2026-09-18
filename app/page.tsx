import Header from "@/components/Header"
import Hero from "@/components/Hero"
import LogosMarquee from "@/components/LogosMarquee"
import Process from "@/components/Process"
import Pricing from "@/components/Pricing"
import PortfolioGallery from "@/components/PortfolioGallery"
import Experience from "@/components/Experience"
import FAQ from "@/components/FAQ"
import ContactForm from "@/components/ContactForm"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <Header />
      <main className="relative z-10">
        <Hero />
        <LogosMarquee />
        <Process />
        <PortfolioGallery />
        <Pricing />
        <Experience />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
