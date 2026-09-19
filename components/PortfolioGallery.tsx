"use client"

import { useState } from "react"
import Image from "next/image"
import { allProjects } from "@/lib/projects-data"

import ProjectVideo from "./ProjectVideo"
import Reveal from "./ui/Reveal"
import TextReveal from "./ui/TextReveal"

export default function PortfolioGallery() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)
  const displayedProjects = showAll ? allProjects : allProjects.slice(0, 8)

  return (
    <section id="portfolio" className="relative w-full py-16 md:py-20 bg-[#FBFBFB] border-t border-[var(--line-subtle)]">
      <div className="max-w-[1280px] mx-auto px-6">

        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-8 border-b border-[var(--line-subtle)]">
          <div><p className="eyebrow">Portfólio selecionado</p><h2 className="font-heading text-3xl sm:text-4xl font-semibold tracking-tight"><TextReveal>O trabalho fala por si.</TextReveal></h2></div>
          <p className="text-sm text-[#5F6368] max-w-[290px] md:text-right">{allProjects.length} projetos, diferentes negócios.<br />Explore as prévias abaixo.</p>
        </Reveal>
        {/* ================= EDITORIAL 12-COLUMN PORTFOLIO GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12 md:gap-y-16 pt-9 md:pt-12">
          {displayedProjects.map((project, idx) => {
            // Asymmetric editorial 12-col spans: alternated layout for natural visual flow
            let colSpan = "md:col-span-6"
            const cycleIndex = idx % 4
            if (cycleIndex === 0) colSpan = "md:col-span-7"
            else if (cycleIndex === 1) colSpan = "md:col-span-5"
            else if (cycleIndex === 2) colSpan = "md:col-span-5"
            else if (cycleIndex === 3) colSpan = "md:col-span-7"

            const isHovered = activeVideoId === project.id

            return (
              <div
                key={project.id}
                data-project-id={project.id}
                className={`${colSpan} group portfolio-video-card flex flex-col`}
                onMouseEnter={() => setActiveVideoId(project.id)}
                onMouseLeave={() => setActiveVideoId(null)}
              >
                {/* Ultra-Lightweight Minimal Device/Browser Frame (Precision Aspect Ratio ~16:8.2) */}
                <div className="relative w-full aspect-[16/8.2] bg-[#0c0d10] rounded-[10px] sm:rounded-[14px] p-[1.2%] pb-[0.8%] shadow-[0_12px_28px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.04)] border border-neutral-200/90 group-hover:border-[#3D6AFF]/40 group-hover:shadow-[0_20px_45px_rgba(61,106,255,0.12)] transition-all duration-500 overflow-hidden flex flex-col">

                  {/* Super Sleek Minimal Browser Top Bar */}
                  <div className="relative h-4 sm:h-5 bg-[#16171b] rounded-t-[6px] sm:rounded-t-[8px] border-b border-neutral-800/80 flex items-center px-2.5 gap-1.5 justify-between select-none shrink-0 z-20">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]/80" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]/80" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f]/80" />
                    </div>
                    <span className="text-[9px] text-neutral-400 font-mono tracking-tight opacity-70">
                      {project.name}
                    </span>
                    <div className="w-3" />
                  </div>

                  {/* Viewport Screen Content (100% Fit with No Lateral Cropping) */}
                  <div className="relative w-full flex-1 bg-[#0a0a0c] overflow-hidden rounded-b-[5px] sm:rounded-b-[7px]">

                    {/* 1. Static Poster Image (Instant load, WebP) */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={project.poster}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 58vw, 720px"
                        className={`object-cover object-left-top transition-transform duration-700 ease-out ${
                          isHovered ? "scale-[1.012]" : "scale-100"
                        }`}

                      />
                    </div>

                    {/* 2. Optimized Video Layer (Plays on hover / mobile intersection) */}
                    {(project.videoWebm || project.videoMp4) && (
                      <ProjectVideo project={project} active={isHovered} preview />
                    )}

                    {/* Subtle Glass Surface Glare */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.015] to-white/[0.06] pointer-events-none z-20" />

                    {/* Live Play Indicator Badge (only if project has video) */}
                    {(project.videoMp4 || project.videoWebm) && (
                      <div
                        className={`absolute bottom-2.5 right-2.5 z-30 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 flex items-center gap-1.5 transition-all duration-300 ${
                          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 pointer-events-none"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-pulse" />
                        <span className="text-[9px] text-white font-mono uppercase tracking-wider font-medium">
                          Live Preview
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Metadata (Editorial Typography - Pure Visual, No Links) */}
                <div className="pt-3.5 flex flex-col">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-[#111111] tracking-tight group-hover:text-[#3D6AFF] transition-colors duration-200">
                      {project.name}
                    </h3>
                    <span className="font-sans text-xs text-[#8A8F98] font-medium">
                      {project.category}
                    </span>
                  </div>
                  {project.description && (
                    <p className="font-sans text-xs sm:text-[0.84rem] text-[#5F6368] mt-1 leading-relaxed line-clamp-1">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* ================= VIEW ALL PROJECTS BUTTON ================= */}
        {allProjects.length > 8 && (
          <div className="mt-14 md:mt-18 pt-10 border-t border-[var(--line-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-sans text-xs sm:text-sm text-[#5F6368]">
              Exibindo <span className="font-medium text-[#111111]">{displayedProjects.length}</span> de{" "}
              <span className="font-medium text-[#111111]">{allProjects.length}</span> projetos desenvolvidos.
            </p>

            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-[#111111] text-white hover:bg-[#3D6AFF] transition-all duration-300 shadow-sm"
            >
              {showAll ? "Mostrar menos projetos ↑" : `Ver todos os projetos (${allProjects.length}) ↓`}
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
