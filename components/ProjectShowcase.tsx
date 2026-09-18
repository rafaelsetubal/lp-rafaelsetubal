"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"

export interface ShowcaseProject {
  id: string
  name: string
  category: string
  title: string
  subtitle: string
  image: string
  accent: string
  url?: string
}

const projectsData: ShowcaseProject[] = [
  {
    id: "glemo",
    name: "GLEMO",
    category: "Hub Imobiliário",
    title: "Encontre o imóvel ideal para o seu momento.",
    subtitle: "O hub imobiliário com os melhores empreendimentos e construtoras do Brasil.",
    image: "/projects/glemo.jpg",
    accent: "#F97316",
  },
  {
    id: "oxford-cove",
    name: "OXFORD COVE",
    category: "Dubai Boutique Real Estate",
    title: "Excelência em cada detalhe.",
    subtitle: "Acesso prioritário a um dos projetos boutique de maior potencial de valorização em JVC.",
    image: "/projects/oxford-cove.jpg",
    accent: "#D4AF37",
  },
  {
    id: "beruf",
    name: "BERUF BRASIL",
    category: "Soluções Industriais",
    title: "Tecnologia que move indústrias.",
    subtitle: "Site institucional focado em geração de oportunidades comerciais e autoridade.",
    image: "/projects/beruf.jpg",
    accent: "#3D6AFF",
  },
  {
    id: "almeida",
    name: "ALMEIDA CONSTRUTORA",
    category: "Arquitetura & Engenharia",
    title: "Do conceito ao seu novo endereço.",
    subtitle: "Construindo valor para gerações com rigor arquitetônico e alto padrão.",
    image: "/projects/almeida.jpg",
    accent: "#8B5CF6",
  },
  {
    id: "kovin",
    name: "KOVIN",
    category: "Tecnologia & Precisão",
    title: "Precisão para grandes desafios.",
    subtitle: "Soluções e componentes industriais para o mercado nacional e internacional.",
    image: "/projects/kovin.jpg",
    accent: "#06B6D4",
  },
]

export default function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const total = projectsData.length

  const nextProject = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const prevProject = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const goToProject = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return

    timerRef.current = setInterval(() => {
      nextProject()
    }, 5500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, nextProject])

  // Get relative position offset (-2, -1, 0, 1, 2)
  const getOffset = (index: number) => {
    let offset = index - currentIndex
    if (offset > Math.floor(total / 2)) offset -= total
    if (offset < -Math.floor(total / 2)) offset += total
    return offset
  }

  return (
    <section
      id="projetos"
      className="relative w-full py-20 md:py-28 overflow-hidden bg-white select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[1100px] h-[450px] pointer-events-none opacity-60">
        <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(61,106,255,0.12)_0%,rgba(61,106,255,0.03)_45%,transparent_70%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3D6AFF] bg-[#3D6AFF]/[0.08] px-3 py-1 rounded-full mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D6AFF]" />
              Resultados Reais
            </span>
            <h2 className="text-[1.85rem] md:text-[2.5rem] lg:text-[2.85rem] font-extrabold tracking-[-0.03em] leading-[1.1] text-black">
              Projetos que já estão no ar.
            </h2>
            <p className="mt-3 text-neutral-500 text-base md:text-lg max-w-xl font-light">
              Sites institucionais e landing pages desenvolvidos com foco em comunicação clara e resultado comercial.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Prev / Next buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevProject}
                aria-label="Projeto anterior"
                className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-700 hover:border-black hover:text-black transition-all active:scale-95 shadow-xs"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={nextProject}
                aria-label="Próximo projeto"
                className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-neutral-700 hover:border-black hover:text-black transition-all active:scale-95 shadow-xs"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Physical Showcase Stage */}
        <div className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[560px] flex items-center justify-center perspective-[1200px]">

          {/* Floor Shadow / Reflection directly below center laptop */}
          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[75%] max-w-[720px] h-[36px] pointer-events-none z-10">
            <div className="w-full h-full rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.18)_0%,rgba(61,106,255,0.08)_35%,transparent_70%)] blur-[8px]" />
          </div>

          {/* Project Items in Perspective */}
          {projectsData.map((project, index) => {
            const offset = getOffset(index)
            const isCenter = offset === 0
            const isLeft = offset === -1
            const isRight = offset === 1
            const isFarLeft = offset === -2
            const isFarRight = offset === 2

            // Calculate transform styles based on offset position
            let transformStyle = ""
            let zIndex = 10
            let opacity = 0

            if (isCenter) {
              transformStyle = "translate3d(0, 0, 0) scale(1) rotateY(0deg)"
              zIndex = 30
              opacity = 1
            } else if (isLeft) {
              transformStyle = "translate3d(-52%, -2%, -80px) scale(0.78) rotateY(18deg)"
              zIndex = 20
              opacity = 0.85
            } else if (isRight) {
              transformStyle = "translate3d(52%, -2%, -80px) scale(0.78) rotateY(-18deg)"
              zIndex = 20
              opacity = 0.85
            } else if (isFarLeft) {
              transformStyle = "translate3d(-92%, -4%, -160px) scale(0.62) rotateY(26deg)"
              zIndex = 10
              opacity = 0.45
            } else if (isFarRight) {
              transformStyle = "translate3d(92%, -4%, -160px) scale(0.62) rotateY(-26deg)"
              zIndex = 10
              opacity = 0.45
            } else {
              transformStyle = "translate3d(0, 0, -250px) scale(0.5) opacity(0)"
              zIndex = 5
              opacity = 0
            }

            return (
              <div
                key={project.id}
                onClick={() => !isCenter && goToProject(index)}
                style={{
                  transform: transformStyle,
                  zIndex,
                  opacity,
                  transition: "transform 1000ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1000ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className={`absolute w-[82%] sm:w-[70%] md:w-[60%] lg:w-[58%] max-w-[680px] aspect-[16/10] cursor-pointer origin-center transform-gpu ${
                  isCenter ? "cursor-default" : "hover:opacity-95"
                }`}
              >
                {isCenter ? (
                  /* ================= CENTRAL REALISTIC LAPTOP MOCKUP ================= */
                  <div className="relative w-full h-full flex flex-col items-center">

                    {/* Laptop Screen Top Case */}
                    <div className="relative w-full h-[94%] bg-[#121316] rounded-t-[16px] sm:rounded-t-[20px] p-[2.5%] pb-[1.5%] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_10px_20px_-5px_rgba(61,106,255,0.08)] border border-neutral-700/60">

                      {/* Top Camera Notch Dot */}
                      <div className="absolute top-[1.2%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neutral-900 border border-neutral-700/50 flex items-center justify-center z-30">
                        <div className="w-1 h-1 rounded-full bg-[#1e293b]" />
                      </div>

                      {/* Display Screen Frame */}
                      <div className="relative w-full h-full bg-[#0a0a0c] rounded-t-[8px] sm:rounded-t-[10px] overflow-hidden">

                        {/* Browser Top Chrome */}
                        <div className="h-6 sm:h-7 bg-[#1c1d22] border-b border-neutral-800 flex items-center px-3 gap-1.5 justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                          </div>
                          <div className="bg-[#121316] px-4 py-0.5 rounded-md text-[10px] text-neutral-400 font-mono tracking-tight max-w-[220px] truncate">
                            https://{project.id}.com.br
                          </div>
                          <div className="w-8" />
                        </div>

                        {/* Real Project Image */}
                        <div className="relative w-full h-[calc(100%-24px)] sm:h-[calc(100%-28px)] bg-neutral-900">
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            sizes="(max-width: 768px) 90vw, 680px"
                            priority={index === 0}
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Laptop Bottom Aluminum Chassis Base */}
                    <div className="relative w-[106%] -mt-[0.5%] h-[6%] bg-gradient-to-b from-[#2a2b30] via-[#1f2024] to-[#121316] rounded-b-[10px] sm:rounded-b-[14px] shadow-[0_12px_24px_rgba(0,0,0,0.35)] border-t border-neutral-600/40 flex items-start justify-center">
                      {/* Front Thumb Opening Groove */}
                      <div className="w-16 sm:w-20 h-1.5 bg-[#141518] rounded-b-md border-t border-neutral-700/60" />
                    </div>
                  </div>
                ) : (
                  /* ================= SIDE 3D PERSPECTIVE SCREEN ================= */
                  <div className="relative w-full h-full bg-[#121316] rounded-[16px] sm:rounded-[20px] p-[2%] overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] border border-neutral-700/40">

                    {/* Browser Chrome */}
                    <div className="h-6 sm:h-7 bg-[#1c1d22] border-b border-neutral-800 flex items-center px-3 gap-1.5 justify-between rounded-t-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2 h-2 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="bg-[#121316] px-3 py-0.5 rounded-md text-[9px] text-neutral-400 font-mono tracking-tight truncate max-w-[160px]">
                        {project.name.toLowerCase()}.com.br
                      </div>
                      <div className="w-4" />
                    </div>

                    {/* Image Preview */}
                    <div className="relative w-full h-[calc(100%-24px)] sm:h-[calc(100%-28px)] rounded-b-[10px] overflow-hidden bg-neutral-900">
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="400px"
                        className="object-cover object-top"
                      />
                      {/* Subtle darkening vignette overlay for side cards */}
                      <div className="absolute inset-0 bg-black/15 transition-opacity" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Project Info & Pagination Controls */}
        <div className="mt-8 md:mt-12 flex flex-col items-center text-center">

          {/* Active Project Title & Category */}
          <div className="h-16 flex flex-col items-center justify-center transition-all duration-500">
            <span className="text-xs uppercase tracking-[0.15em] text-[#3D6AFF] font-bold">
              {projectsData[currentIndex].category}
            </span>
            <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-950 mt-1">
              {projectsData[currentIndex].name} —{" "}
              <span className="font-normal text-neutral-600 text-lg md:text-xl">
                {projectsData[currentIndex].title}
              </span>
            </h3>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2 mt-6">
            {projectsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToProject(idx)}
                aria-label={`Ir para projeto ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-7 h-2 bg-[#3D6AFF]"
                    : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
