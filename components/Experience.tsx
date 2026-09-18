"use client";
import { useEffect, useRef, useState } from "react";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Evidence {
  id: string
  company: string
  logos: string[]
  actuation: string
  metric: string
  isGrowth?: boolean
  description: string
  sourceText: string
  sourceUrl: string
  videoUrl?: string
}

const evidences: Evidence[] = [
  {
    id: "01",
    company: "Rôgga",
    logos: ["/logos/rogga.png"],
    actuation: "Site · Projeto digital",
    metric: "+14,7%",
    isGrowth: true,
    description: "em vendas no 1º semestre de 2026",
    sourceText: "Rôgga",
    sourceUrl: "https://blog.rogga.com.br/rogga-cresce-147-e-prepara-r-881-mi-em-lancamentos/",
    videoUrl: "/projects/video-optimized/rogga.mp4"
  },
  {
    id: "02",
    company: "BRZ",
    logos: ["/logos/BRZ.png"],
    actuation: "Site · Projeto digital",
    metric: "R$ 1,2 bilhão",
    isGrowth: true,
    description: "em VGV em 2025",
    sourceText: "VEJA",
    sourceUrl: "https://veja.abril.com.br/coluna/radar-economico/brz-alcanca-r-12-bilhao-em-vendas-e-mira-aquisicoes/",
    videoUrl: "/projects/video-optimized/brz.mp4"
  },
  {
    id: "03",
    company: "Pride",
    logos: ["/logos/PRIDE.png"],
    actuation: "Site · Projeto digital",
    metric: "R$ 535 milhões",
    isGrowth: true,
    description: "em VGV e 2.200 unidades vendidas em 2025",
    sourceText: "Bem Paraná",
    sourceUrl: "https://www.bemparana.com.br/noticias/economia/pride-construtora-cresce-no-mercado-imobiliario-com-um-dos-melhores-anos-da-empresa/",
    videoUrl: "/projects/video-optimized/pride.mp4"
  },
  {
    id: "04",
    company: "MRV",
    logos: ["/logos/mrv.png"],
    actuation: "Site · Projeto digital",
    metric: "+640,4%",
    isGrowth: true,
    description: "de lucro no 1T26",
    sourceText: "CNN Brasil",
    sourceUrl: "https://www.cnnbrasil.com.br/branded-content/economia/money/negocios/mrv-incorporacao-registra-lucro-de-r-133-milhoes-no-1o-tri-alta-de-640/",
    videoUrl: "/projects/video-optimized/mrv-co.mp4"
  },
  {
    id: "05",
    company: "Sá Cavalcante",
    logos: ["/logos/SA.png"],
    actuation: "Produto digital · Site",
    metric: "R$ 50 milhões",
    isGrowth: true,
    description: "em vendas movimentadas pelo app",
    sourceText: "ABRASCE",
    sourceUrl: "https://abrasce.com.br/espaco-do-associado/institucional/premio-abrasce-2026-sa-cavalcante-emplaca-seis-cases-na-final/",
    videoUrl: "/projects/video-optimized/sa-cavalcante.mp4"
  },
  {
    id: "06",
    company: "Sicredi × Zallpy",
    logos: ["/logos/sicredi.png", "/logos/zallpy.png"],
    actuation: "Produto digital · Automação",
    metric: "RPA · Eficiência",
    isGrowth: false,
    description: "Projeto de automação e transformação digital para o Sicredi.",
    sourceText: "Zallpy",
    sourceUrl: "https://zallpy.com/cases/sicredi"
  }
]

export default function Experience() {
  return (
    <section id="experiencia" className="py-24 md:py-32 bg-white relative z-10 border-t border-[rgba(17,17,17,0.06)]">
      <div className="max-w-[1280px] mx-auto px-6">
        
        {/* 1. HEADER EDITORIAL */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-20 md:mb-24 items-start">
          <div className="md:col-span-7 lg:col-span-8">
            <span className="font-sans text-[0.72rem] md:text-[0.78rem] uppercase tracking-[0.16em] text-[#7F8792] font-medium block mb-5">
              Experiência em contextos reais
            </span>
            <h2 className="font-heading text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] font-semibold tracking-[-0.03em] leading-[1.0] text-[#111111]">
              Projetos que fazem parte<br />
              de <span className="text-[#3D6AFF]">negócios reais.</span>
            </h2>
          </div>
          <div className="md:col-span-5 lg:col-span-4 md:pl-8 md:border-l md:border-[rgba(17,17,17,0.08)] mt-2 md:mt-10">
            <p className="font-sans text-sm md:text-base text-[#5F6368] font-normal leading-relaxed mb-6">
              Sites, produtos digitais e experiências que desenvolvi ou dos quais participei, em empresas de diferentes setores e escalas.
            </p>
            <Link 
              href="#portfolio" 
              className="font-sans text-[0.8rem] md:text-[0.85rem] font-medium text-[#3D6AFF] tracking-wide uppercase flex items-center gap-1.5 hover:text-[#2F59E8] transition-colors"
            >
              Ver todas as referências 
              <span className="text-lg leading-none mb-[2px]">→</span>
            </Link>
          </div>
        </div>

        {/* 2. GRID DE EVIDÊNCIAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {evidences.map((item, index) => {
            // Determine border classes based on position to avoid outside borders wrapping the section
            const isLastInRowDesktop = (index + 1) % 3 === 0;
            const isBottomRowDesktop = index >= 3;
            const isLastInRowTablet = (index + 1) % 2 === 0;
            const isBottomRowTablet = index >= 4;

            return (
              <ExperienceCard 
                key={item.id} 
                item={item} 
                isBottomRowDesktop={isBottomRowDesktop} 
                isLastInRowDesktop={isLastInRowDesktop} 
                isBottomRowTablet={isBottomRowTablet} 
                isLastInRowTablet={isLastInRowTablet} 
              />
            )
          })}
        </div>

        {/* 3. FAIXA DE CONTEXTO */}
        <div className="mt-16 md:mt-24 bg-[rgba(61,106,255,0.025)] border border-[rgba(61,106,255,0.10)] rounded-[16px] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          
          {/* Background SVG sutil */}
          <div 
            className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
            style={{ 
              backgroundImage: "url('/decorations/dot-pattern.svg')", 
              backgroundSize: "600px", 
              backgroundPosition: "center right",
              backgroundRepeat: "no-repeat"
            }}
          ></div>
          
          <div className="relative z-10 flex items-start gap-5 md:gap-8 max-w-2xl">
            <div className="hidden md:flex flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(61,106,255,0.08)] items-center justify-center mt-1">
              <span className="text-[#3D6AFF] text-xl font-light">↑</span>
            </div>
            <div>
              <h4 className="font-sans text-[1.25rem] md:text-[1.5rem] font-semibold text-[#111111] mb-3 leading-tight tracking-tight">
                Diferentes setores.<br />
                <span className="text-[#3D6AFF]">O mesmo objetivo: projetos digitais que funcionam.</span>
              </h4>
              <p className="font-sans text-sm md:text-base text-[#5F6368] font-normal leading-relaxed">
                Mais do que sites, projetos digitais pensados para funcionar na prática e acompanhar as necessidades de cada negócio.
              </p>
            </div>
          </div>

          <div className="relative z-10 font-sans text-[0.70rem] md:text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[#8A8F98] leading-[2.2] md:pl-10 md:border-l md:border-[rgba(61,106,255,0.15)] whitespace-nowrap">
            <p>Imobiliário</p>
            <p>Financeiro</p>
            <p>Tecnologia</p>
            <p>Varejo</p>
            <p className="text-[#3D6AFF] mt-1">E mais</p>
          </div>
        </div>

        {/* 4. CTA FINAL */}
        <div className="mt-16 md:mt-24 pt-8 md:pt-10 border-t border-[rgba(17,17,17,0.06)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-sans text-[0.72rem] uppercase tracking-[0.16em] text-[#8A8F98] font-medium block mb-2">
              Vamos conversar?
            </span>
            <h3 className="font-heading text-[1.75rem] md:text-[2rem] font-semibold text-[#111111] tracking-tight">
              Seu projeto pode ser o próximo.
            </h3>
          </div>
          <a
            href="#contato"
            className="btn-primary-blue inline-block text-center text-sm font-medium py-4 px-8 shadow-sm flex-shrink-0 w-full md:w-auto"
          >
            Solicitar orçamento →
          </a>
        </div>

      </div>
    </section>
  )
}


function ExperienceCard({ item, isBottomRowDesktop, isLastInRowDesktop, isBottomRowTablet, isLastInRowTablet }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsActive(entry.isIntersecting);
    }, { rootMargin: '-30% 0px -30% 0px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      data-active={isActive}
      className={`group flex flex-col justify-between min-h-[260px] p-6 lg:p-8 relative
        border-[rgba(17,17,17,0.08)]
        border-b md:border-b-0
        ${!isBottomRowDesktop ? 'lg:border-b' : ''}
        ${!isLastInRowDesktop ? 'lg:border-r' : ''}
        ${!isBottomRowTablet ? 'md:max-lg:border-b' : ''}
        ${!isLastInRowTablet ? 'md:max-lg:border-r' : ''}
      `}
    >
      {/* Vídeo Hover Background com Overlay Escuro */}
      {item.videoUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 max-md:group-data-[active=true]:opacity-100">
          <video 
            src={item.videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay loop muted playsInline
          />
          {/* Overlay escuro para garantir leitura do texto branco */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}

      {/* Header do item (Logos + Atuação) */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          {item.logos.length === 1 ? (
            <div className="relative h-6 md:h-7 w-auto min-w-[80px]">
              <Image 
                src={item.logos[0]} 
                alt={item.company} 
                fill 
                className="object-contain object-left transition-all duration-500 group-hover:brightness-0 group-hover:invert max-md:group-data-[active=true]:brightness-0 max-md:group-data-[active=true]:invert"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative h-6 md:h-7 w-[80px]">
                <Image src={item.logos[0]} alt="Company 1" fill className="object-contain object-left transition-all duration-500 group-hover:brightness-0 group-hover:invert max-md:group-data-[active=true]:brightness-0 max-md:group-data-[active=true]:invert" />
              </div>
              <span className="text-[#8A8F98] group-hover:text-white/60 max-md:group-data-[active=true]:text-white/60 transition-colors duration-500 text-lg font-light leading-none pb-1">×</span>
              <div className="relative h-6 md:h-7 w-[80px]">
                <Image src={item.logos[1]} alt="Company 2" fill className="object-contain object-left transition-all duration-500 group-hover:brightness-0 group-hover:invert max-md:group-data-[active=true]:brightness-0 max-md:group-data-[active=true]:invert" />
              </div>
            </div>
          )}
        </div>
        <span className="font-sans text-[11px] md:text-xs text-[#5F6368] group-hover:text-white/90 max-md:group-data-[active=true]:text-white/90 transition-colors duration-500 font-medium tracking-wide">
          {item.actuation}
        </span>
      </div>

      {/* Métrica e Descrição */}
      <div className="mb-8 mt-auto relative z-10">
        <h3 className="font-heading text-[2.25rem] lg:text-[2.75rem] font-semibold tracking-tight text-[#3D6AFF] group-hover:text-white max-md:group-data-[active=true]:text-white transition-all duration-500 mb-2 leading-none group-hover:-translate-y-[1px] max-md:group-data-[active=true]:-translate-y-[1px] flex items-center gap-2">
          {item.isGrowth && (
            <span className="text-[#10B981] group-hover:text-[#34D399] max-md:group-data-[active=true]:text-[#34D399] transition-colors duration-500 text-[1.75rem] lg:text-[2.25rem] font-medium leading-none -mt-1">
              ↑
            </span>
          )}
          {item.metric}
        </h3>
        <p className="font-sans text-sm text-[#5F6368] group-hover:text-white/80 max-md:group-data-[active=true]:text-white/80 transition-colors duration-500 leading-relaxed max-w-[90%]">
          {item.description}
        </p>
      </div>

      {/* Footer do item (Fonte + Número) */}
      <div className="flex items-center justify-between mt-auto relative z-10">
        <a 
          href={item.sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-[#5F6368] group-hover:text-white max-md:group-data-[active=true]:text-white transition-colors duration-500"
        >
          Fonte: {item.sourceText}
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        
        <span className="font-sans text-xs md:text-sm font-semibold text-[rgba(61,106,255,0.35)] group-hover:text-white/40 max-md:group-data-[active=true]:text-white/40 transition-colors duration-500">
          {item.id}
        </span>
      </div>
    </div>
  )
}
