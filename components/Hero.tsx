"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import ProjectVideo from "./ProjectVideo"
import { heroShowcaseProjects } from "@/lib/projects-data"

import CareDetails from "./CareDetails"
import { whatsappUrl } from "@/lib/contact"
import Reveal from "./ui/Reveal"
import TextReveal from "./ui/TextReveal"

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [manualPause, setManualPause] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focusWithin, setFocusWithin] = useState(false)
  const isPaused = manualPause || hovered || focusWithin
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const total = heroShowcaseProjects.length

  const nextProject = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const goToProject = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play interval: 5.5 seconds
  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    timerRef.current = setInterval(() => {
      if (!document.hidden && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) nextProject()
    }, 5500)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPaused, nextProject])



  return (
    <section className="relative w-full pt-10 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-transparent">

      {/* ================= AMBIENT BACKGROUND WAVES ================= */}
      <div className="absolute top-[260px] sm:top-[280px] md:top-[300px] left-0 right-0 w-full h-[650px] md:h-[820px] pointer-events-none opacity-45 select-none overflow-hidden z-0">
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          preload
          className="object-cover object-center"
        />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 relative z-10">

        {/* ================= 1. EYEBROW ================= */}
        <Reveal className="text-center">
          <span className="font-sans text-[0.72rem] md:text-[0.78rem] uppercase tracking-[0.16em] text-[#8A8F98] font-medium block mb-4">
            Sites que impulsionam negócios
          </span>
        </Reveal>

        {/* ================= 2. HEADLINE ================= */}
        <h1 className="font-heading text-[2.625rem] sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4rem] font-semibold tracking-[-0.035em] leading-[0.98] text-center text-[#111111] max-w-4xl mx-auto">
          <TextReveal>
            <span className="block">Seu negócio merece</span>
            <span className="block">ser encontrado.</span>
            <span className="block text-[#3D6AFF]">E bem apresentado.</span>
          </TextReveal>
        </h1>

        {/* ================= 3. SUBHEADLINE ================= */}
        <Reveal delay={250}>
          <p className="font-sans mt-6 text-base sm:text-lg md:text-[1.0625rem] text-[#5F6368] max-w-[600px] mx-auto text-center leading-[1.48] font-normal">
            Crio sites que explicam o valor da sua empresa, ampliam sua presença além das redes sociais e facilitam o próximo contato. Do planejamento ao acompanhamento, você fala comigo.
          </p>
        </Reveal>

        <Reveal delay={350}>
          <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-14">

            {/* Offer 1 */}
            <div className="text-center min-w-[120px]">
              <span className="font-sans block text-xs md:text-[0.82rem] font-medium text-[#111111]">
                Landing Page
              </span>
              <span className="font-sans block text-[0.68rem] text-[#8A8F98] font-normal mt-0.5">
                a partir de
              </span>
              <span className="font-heading block text-lg sm:text-xl md:text-[1.35rem] font-semibold text-[#111111] tracking-tight mt-0.5">
                R$ 700
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-10 bg-neutral-200/90" />

            {/* Offer 2 */}
            <div className="text-center min-w-[120px]">
              <span className="font-sans block text-xs md:text-[0.82rem] font-medium text-[#111111]">
                Site Institucional
              </span>
              <span className="font-sans block text-[0.68rem] text-[#8A8F98] font-normal mt-0.5">
                a partir de
              </span>
              <span className="font-heading block text-lg sm:text-xl md:text-[1.35rem] font-semibold text-[#111111] tracking-tight mt-0.5">
                R$ 2.000
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-[1px] h-10 bg-neutral-200/90" />

            {/* Offer 3 */}
            <div className="text-center min-w-[120px]">
              <span className="font-sans block text-xs md:text-[0.82rem] font-medium text-[#111111]">
                Projeto Específico
              </span>
              <span className="font-sans block text-[0.68rem] text-[#8A8F98] font-normal mt-0.5">
                escopo personalizado
              </span>
              <span className="font-heading block text-lg sm:text-xl md:text-[1.35rem] font-semibold text-[#111111] tracking-tight mt-0.5">
                Sob consulta
              </span>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-[#5F6368]">Landing page: + R$ 100/mês. Institucional: + R$ 250/mês. Domínio à parte.</p>
          <div className="text-center"><CareDetails label="Entenda o cuidado mensal" /></div>
          {/* ================= 5. CTAS ================= */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href={whatsappUrl()} target="_blank" rel="noopener noreferrer"
              className="btn-primary-blue inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-medium tracking-tight shadow-md"
            >
              Conversar sobre meu site →
            </Link>
            <Link
              href="#portfolio"
              className="btn-secondary-white inline-flex items-center justify-center px-8 py-3.5 text-sm sm:text-base font-medium tracking-tight"
            >
              Ver projetos
            </Link>
          </div>
        </Reveal>

        {/* ================= 6. TRUST BADGES ================= */}
        <div className="font-sans mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-7 text-xs sm:text-sm text-[#5F6368] font-medium">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-[#3D6AFF] shrink-0"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
            </svg>
            <span>Design personalizado</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-[#3D6AFF] shrink-0"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
            </svg>
            <span>Atendimento direto comigo</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-[#3D6AFF] shrink-0"
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0z" />
            </svg>
            <span>Preço definido antes de começar</span>
          </div>
        </div>

        {/* ================= 7. CINEMATIC 3D PERSPECTIVE WEBSITE SHOWCASE ================= */}
        <div
          className="mt-12 md:mt-16 relative w-full max-w-[1080px] mx-auto flex flex-col items-center select-none"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocusWithin(true)}
          onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusWithin(false) }}
        >
          {/* Diffused Floor Shadow / Ground Reflection underneath showcase */}
          <div className="absolute -bottom-8 sm:-bottom-10 left-1/2 -translate-x-1/2 w-[92%] sm:w-[85%] h-[50px] sm:h-[80px] pointer-events-none z-0">
            <div className="w-full h-full rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(40,70,120,0.25)_0%,rgba(61,106,255,0.12)_35%,transparent_70%)] blur-[16px]" />
          </div>

          {/* 3D Perspective Stage Container */}
          <div
            className="relative w-full aspect-[16/9] sm:aspect-[16/8.8] md:aspect-[16/8.5] max-h-[560px] flex items-center justify-center"
            style={{ perspective: "1400px" }}
          >
            {heroShowcaseProjects.map((project, idx) => {
              // Calculate relative distance from current index with circular wrapping
              let diff = (idx - currentIndex) % total
              if (diff < -Math.floor(total / 2)) diff += total
              if (diff > Math.floor(total / 2)) diff -= total

              const isCenter = diff === 0
              const isImmediateLeft = diff === -1
              const isImmediateRight = diff === 1
              const isFarLeft = diff === -2
              const isFarRight = diff === 2

              // Compute 3D transforms & styling based on position
              let transform = "translateX(0%) scale(1) rotateY(0deg)"
              let zIndex = 30
              let opacity = 1
              let cursor = "default"
              let filter = "none"

              if (isImmediateLeft) {
                transform = "translateX(-48%) scale(0.78) rotateY(24deg)"
                zIndex = 20
                opacity = 0.82
                cursor = "pointer"
                filter = "brightness(0.92)"
              } else if (isImmediateRight) {
                transform = "translateX(48%) scale(0.78) rotateY(-24deg)"
                zIndex = 20
                opacity = 0.82
                cursor = "pointer"
                filter = "brightness(0.92)"
              } else if (isFarLeft) {
                transform = "translateX(-82%) scale(0.62) rotateY(32deg)"
                zIndex = 10
                opacity = 0.35
                cursor = "pointer"
                filter = "brightness(0.8)"
              } else if (isFarRight) {
                transform = "translateX(82%) scale(0.62) rotateY(-32deg)"
                zIndex = 10
                opacity = 0.35
                cursor = "pointer"
                filter = "brightness(0.8)"
              } else if (diff !== 0) {
                // Any hidden state
                transform = "translateX(0%) scale(0.5) rotateY(0deg)"
                zIndex = 0
                opacity = 0
                cursor = "default"
              }

              return (
                <div
                  key={project.id}
                  onClick={() => !isCenter && goToProject(idx)}
                  role={isCenter ? undefined : "button"}
                  tabIndex={isCenter ? -1 : 0}
                  aria-label={isCenter ? undefined : `Ver projeto ${project.name}`}
                  onKeyDown={(event) => { if (!isCenter && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); goToProject(idx) } }}
                  className="absolute w-[82%] sm:w-[74%] md:w-[68%] lg:w-[64%] aspect-[16/8.5] will-change-transform"
                  style={{
                    transform,
                    zIndex,
                    opacity,
                    cursor,
                    filter,
                    transition:
                      "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 900ms cubic-bezier(0.16, 1, 0.3, 1), filter 900ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 900ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  {isCenter ? (
                    /* Dominant Center Realistic MacBook Mockup */
                    <div className="relative w-full h-full flex flex-col items-center">
                      {/* Display Top Lid & Bezel with metallic rim & shadow */}
                      <div className="relative w-full h-[94%] bg-[#121316] rounded-t-[16px] sm:rounded-t-[22px] p-[2%] pb-[1.2%] shadow-[0_24px_50px_rgba(30,50,90,0.22),0_40px_80px_rgba(61,106,255,0.18)] border border-neutral-700/60 overflow-hidden">
                        {/* Top Camera Notch */}
                        <div className="absolute top-[1.2%] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700/50 flex items-center justify-center z-30">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#1e293b]" />
                        </div>

                        {/* Display Screen Frame */}
                        <div className="relative w-full h-full bg-[#0a0a0c] rounded-t-[10px] sm:rounded-t-[14px] overflow-hidden">
                          {/* Browser Top Chrome */}
                          <div className="h-6 sm:h-7 bg-[#1c1d22] border-b border-neutral-800 flex items-center px-3.5 gap-1.5 justify-between relative z-20">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                            </div>
                            <span className="text-[10px] text-neutral-400 font-mono tracking-tight font-medium">
                              {project.name}
                            </span>
                            <div className="w-8" />
                          </div>

                          {/* Website Content (Poster + Video Layer) */}
                          <div className="relative w-full h-[calc(100%-24px)] sm:h-[calc(100%-28px)] bg-neutral-900 overflow-hidden">
                            <Image
                              src={project.poster}
                              alt={project.name}
                              fill
                              sizes="(max-width: 1024px) 90vw, 760px"
                              preload
                              className="object-cover object-left-top"
                            />

                            {(project.videoWebm || project.videoMp4) && (
                              <ProjectVideo project={project} active={!manualPause} />
                            )}

                            {/* Glass Surface Reflection */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.12] pointer-events-none z-20" />
                          </div>
                        </div>
                      </div>

                      {/* Laptop Bottom Aluminum Base */}
                      <div className="relative w-[104%] -mt-[0.4%] h-[6%] bg-gradient-to-b from-[#2e2f35] via-[#212226] to-[#121316] rounded-b-[12px] sm:rounded-b-[16px] shadow-[0_12px_24px_rgba(0,0,0,0.35)] border-t border-neutral-600/50 flex items-start justify-center">
                        <div className="w-20 sm:w-28 h-1.5 sm:h-2 bg-[#141518] rounded-b-md border-t border-neutral-700/60" />
                      </div>
                    </div>
                  ) : (
                    /* Flanking 3D Perspective Browser Card */
                    <div className="relative w-full h-[94%] bg-[#141519] rounded-[16px] sm:rounded-[20px] p-[1.8%] pb-[1.4%] shadow-[0_20px_50px_rgba(0,0,0,0.4),0_10px_25px_rgba(0,0,0,0.25)] border border-neutral-700/50 overflow-hidden hover:border-[#3D6AFF]/50 transition-colors">
                      <div className="relative w-full h-full bg-[#0a0a0c] rounded-[10px] sm:rounded-[14px] overflow-hidden flex flex-col">
                        {/* Browser Chrome Header */}
                        <div className="h-6 sm:h-7 bg-[#1c1d22] border-b border-neutral-800 flex items-center px-3 gap-1.5 justify-between relative z-20">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#ff5f56]/80" />
                            <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/80" />
                            <span className="w-2 h-2 rounded-full bg-[#27c93f]/80" />
                          </div>
                          <span className="text-[10px] text-neutral-400 font-medium font-sans truncate px-2">
                            {project.name}
                          </span>
                          <div className="w-5" />
                        </div>

                        {/* Website Poster */}
                        <div className="relative w-full h-[calc(100%-24px)] sm:h-[calc(100%-28px)] bg-neutral-900 overflow-hidden">
                          <Image
                            src={project.poster}
                            alt={project.name}
                            fill
                            sizes="(max-width: 1024px) 50vw, 450px"
                            className="object-cover object-left-top"
                          />
                          {/* Dark overlay & subtle glass glare */}
                          <div className="absolute inset-0 bg-neutral-950/20 pointer-events-none" />
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.08] pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Project Switcher Navigation Dots */}
          <div className="flex items-center gap-2 mt-6 sm:mt-8 z-10">
            <button type="button" onClick={() => setManualPause((value) => !value)} className="text-xs px-3 py-3" aria-pressed={manualPause}>{manualPause ? "Retomar carrossel" : "Pausar carrossel"}</button>
            {heroShowcaseProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToProject(idx)}
                aria-label={`Ir para projeto ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-8 h-6 border-y-[9px] border-white bg-[#3D6AFF]"
                    : "w-6 h-6 border-[9px] border-white bg-neutral-400 hover:bg-neutral-600"
                }`}
              />
            ))}
          </div>

          {/* ================= 8. SIGNATURE TAG & FULL PORTFOLIO BUTTON BELOW SHOWCASE ================= */}
          <div className="mt-5 flex flex-col items-center gap-3 text-center z-10">
            <Link
              href="#portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium border border-neutral-200/90 bg-white/90 hover:bg-white text-neutral-800 hover:text-[#3D6AFF] shadow-sm hover:shadow transition-all duration-200"
            >
              <span>Ver portfólio completo com todos os projetos</span>
              <span className="text-[#3D6AFF] font-bold">↓</span>
            </Link>
            <span className="font-sans text-[0.68rem] md:text-[0.72rem] uppercase tracking-[0.2em] text-[#8A8F98] font-medium block">
              Design · Performance · Resultados
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
