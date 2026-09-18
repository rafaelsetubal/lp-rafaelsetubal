

import Image from "next/image"

const logos = [
  { name: "ABRAINC", src: "/logos/ABRAINC.png", height: 26 },
  { name: "BMPI", src: "/logos/BMPI.png", height: 22 },
  { name: "BRZ", src: "/logos/BRZ.png", height: 26 },
  { name: "PRIDE", src: "/logos/PRIDE.png", height: 24 },
  { name: "Sá Cavalcante", src: "/logos/SA.png", height: 28 },
  { name: "ADN", src: "/logos/adn.png", height: 22 },
  { name: "Andy Shop", src: "/logos/andyshop.png", height: 24 },
  { name: "CBM", src: "/logos/cbm.png", height: 26 },
  { name: "MRV", src: "/logos/mrv.png", height: 30 }, // Centralized in sequence
  { name: "Compra Fiel", src: "/logos/comprafiel.png", height: 22 },
  { name: "Glemo", src: "/logos/glemO.png", height: 24 },
  { name: "Menin", src: "/logos/menin.png", height: 24 },
  { name: "Mito", src: "/logos/mito.png", height: 22 },
  { name: "Rogga", src: "/logos/rogga.png", height: 26 },
  { name: "Sicredi", src: "/logos/sicredi.png", height: 24 },
  { name: "Zallpy", src: "/logos/zallpy.png", height: 24 },
]

export default function LogosMarquee() {
  return (
    <div className="relative w-full pt-10 pb-12 md:pt-14 md:pb-16 overflow-hidden bg-transparent select-none">
      {/* Section Title */}
      <div className="text-center mb-6 md:mb-8 px-6">
        <span className="font-sans text-[0.72rem] md:text-[0.78rem] uppercase tracking-[0.16em] text-[#8A8F98] font-medium">
          Marcas que confiaram no meu trabalho
        </span>
      </div>

      {/* Left and Right Fade Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

      {/* Infinite Scrolling Track */}
      <div className="animate-marquee flex items-center gap-12 sm:gap-16 md:gap-20">
        {/* First Loop Set */}
        {logos.map((logo, idx) => (
          <div
            key={`logo-1-${idx}`}
            className="flex items-center justify-center shrink-0 h-10 px-2 grayscale opacity-50 hover:opacity-90 hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={140}
              height={logo.height}
              className="h-6 sm:h-7 md:h-8 w-auto object-contain max-w-[130px]"
            />
          </div>
        ))}

        {/* Duplicate Loop Set for Seamless Continuous Scroll */}
        {logos.map((logo, idx) => (
          <div
            key={`logo-2-${idx}`}
            aria-hidden="true"
            className="flex items-center justify-center shrink-0 h-10 px-2 grayscale opacity-50 hover:opacity-90 hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={140}
              height={logo.height}
              className="h-6 sm:h-7 md:h-8 w-auto object-contain max-w-[130px]"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
