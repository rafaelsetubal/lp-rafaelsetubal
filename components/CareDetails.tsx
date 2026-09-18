"use client"

import React, { useRef, useEffect, useId } from "react"
import Image from "next/image"

export default function CareDetails({ label = "O que está incluído?" }: { label?: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const previousOverflow = useRef<string | null>(null)
  const titleId = useId()

  function restoreScroll() {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current
      previousOverflow.current = null
    }
  }

  useEffect(() => () => {
    if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current
  }, [])

  function open() {
    if (!dialog.current || dialog.current.open) return
    previousOverflow.current = document.body.style.overflow
    dialog.current.showModal()
    document.body.style.overflow = "hidden"
  }

  return (
    <>
      <button ref={trigger} type="button" onClick={open} aria-haspopup="dialog" className="py-2 text-left text-[0.8rem] md:text-[0.85rem] font-medium text-[#3D6AFF] uppercase tracking-wide inline-flex items-center justify-center sm:justify-start gap-1.5 hover:text-[#2F59E8] transition-colors">{label} <span className="text-lg leading-none mb-[2px]">→</span></button>

      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        onClose={() => { restoreScroll(); trigger.current?.focus() }}
        className="care-dialog fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-1.5rem)] max-w-[850px] rounded-[16px] border-0 bg-white p-0 text-[#111111] shadow-[0_32px_100px_rgba(7,18,42,0.15)] backdrop:bg-[#081225]/30 backdrop:backdrop-blur-sm text-left"
      >
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Fechar detalhes"
          className="absolute right-5 top-4 md:right-6 md:top-6 z-20 flex h-8 w-8 items-center justify-center text-xl font-light text-[#8A8F98] hover:text-[#111111] bg-transparent border-0 transition-colors"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row min-h-[600px] md:h-[640px]">
          {/* ÁREA ESQUERDA (Visual - ~35%) */}
          <div className="relative isolate w-full md:w-[35%] flex flex-col p-8 md:p-10 overflow-hidden bg-[#F8F9FA] md:border-r border-[rgba(17,17,17,0.06)] shrink-0 min-h-[340px] md:min-h-full">
            <Image 
              src="/hero-bg.png" 
              alt="Abstrato" 
              fill 
              className="object-cover object-bottom z-0 opacity-70"
            />
            {/* Bloco sólido de cor cobrindo os 65% superiores para garantir 100% de leitura */}
            <div className="absolute inset-x-0 top-0 h-[65%] bg-[#F8F9FA] z-0 pointer-events-none"></div>
            {/* Gradiente fazendo a transição suave para a imagem no rodapé */}
            <div className="absolute inset-x-0 top-[65%] h-[35%] bg-gradient-to-b from-[#F8F9FA] to-transparent z-0 pointer-events-none"></div>
            
            <div className="relative z-10 flex-1 flex flex-col justify-start">
              <div>
                <p className="font-sans text-[0.65rem] md:text-[0.7rem] uppercase tracking-[0.16em] text-[#5F6368] font-medium mb-4">
                  Depois da publicação
                </p>
                <h2 id={titleId} className="font-heading text-[1.8rem] md:text-[2.2rem] font-semibold leading-[1.05] tracking-[-0.03em] text-[#111111]">
                  Seu site no ar.<br />
                  <span className="text-[#3D6AFF]">E bem cuidado.</span>
                </h2>
                <p className="mt-4 text-[0.9rem] leading-relaxed text-[#5F6368] font-sans font-normal md:max-w-[280px]">
                  Você pode deixar a parte técnica comigo e acompanhar o desempenho do site ao longo do tempo.
                </p>
              </div>
            </div>
          </div>

          {/* ÁREA DIREITA (Conteúdo - ~65%) */}
          <div className="w-full md:w-[65%] p-8 md:p-12 flex flex-col overflow-y-auto bg-white relative z-10">
            <div>
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-[#111111] tracking-[-0.02em]">Dois níveis de cuidado</h3>
              <p className="mt-1.5 text-[0.9rem] text-[#5F6368] font-sans font-normal">Escolha o nível de acompanhamento que faz sentido para o seu site.</p>
            </div>

            <div className="mt-8 flex flex-col gap-6 flex-1 justify-start">
              {/* PLANO 01 */}
              <div className="flex items-start gap-4">
                <span className="font-heading text-sm font-semibold text-[#8A8F98] pt-1 w-5">01</span>
                <div>
                  <h4 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[#5F6368]">Cuidado técnico</h4>
                  <p className="mt-1 font-heading text-[1.4rem] font-semibold tracking-tight text-[#111111]">R$ 100 <span className="text-[0.8rem] font-normal text-[#8A8F98]">/mês</span></p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-[#5F6368] font-sans">Para manter o site funcionando com segurança.</p>
                  
                  <ul className="mt-3 space-y-2">
                    {["Hospedagem do site", "Certificado de segurança (HTTPS)", "Backups", "Correções técnicas"].map(item => (
                      <li key={item} className="flex gap-2.5 items-center text-[0.85rem] text-[#111111] font-sans">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#8A8F98] flex-shrink-0"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* DIVISÓRIA */}
              <div className="w-full h-[1px] bg-[rgba(17,17,17,0.06)] ml-9 md:ml-9 max-w-[90%]"></div>

              {/* PLANO 02 */}
              <div className="flex items-start gap-4">
                <span className="font-heading text-sm font-semibold text-[#3D6AFF] pt-1 w-5">02</span>
                <div>
                  <h4 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-[#3D6AFF]">Acompanhamento</h4>
                  <p className="mt-1 font-heading text-[1.4rem] font-semibold tracking-tight text-[#111111]">R$ 250 <span className="text-[0.8rem] font-normal text-[#8A8F98]">/mês</span></p>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-[#5F6368] font-sans">Para acompanhar o desempenho e evoluir o site.</p>
                  
                  <ul className="mt-3 space-y-2">
                    {["Tudo do plano anterior", "Relatório trimestral", "Análise de acessos e público", "Análise de desempenho", "Recomendações de melhoria"].map(item => (
                      <li key={item} className="flex gap-2.5 items-center text-[0.85rem] text-[#111111] font-sans">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#3D6AFF] flex-shrink-0"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* NOTA FINAL */}
            <div className="mt-8 pt-5 border-t border-[rgba(17,17,17,0.06)] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-[0.75rem] text-[#7D838D] font-sans leading-relaxed max-w-[280px]">
                Alterações de conteúdo, novas páginas, campanhas e integrações são orçadas à parte.
              </p>
              <a href="#contato" onClick={() => dialog.current?.close()} className="inline-flex font-sans text-[0.8rem] font-medium text-[#3D6AFF] hover:text-[#2F59E8] transition-colors whitespace-nowrap">
                Falar sobre acompanhamento →
              </a>
            </div>
            
          </div>
        </div>
      </dialog>
      
      <style dangerouslySetInnerHTML={{__html: `
        dialog.care-dialog {
          transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        dialog.care-dialog[open] {
          animation: modalEntrance 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes modalEntrance {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        dialog.care-dialog::backdrop {
          transition: opacity 0.25s ease;
          opacity: 0;
        }
        dialog.care-dialog[open]::backdrop {
          opacity: 1;
        }
      `}} />
    </>
  )
}
