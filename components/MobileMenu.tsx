"use client"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { navLinks, whatsappUrl } from "@/lib/contact"
export default function MobileMenu({isOpen,onClose}:{isOpen:boolean;onClose:()=>void}) {
  const dialogRef=useRef<HTMLDialogElement>(null)
  useEffect(()=>{
    if(!isOpen)return
    const dialog=dialogRef.current
    const previous=document.activeElement as HTMLElement | null
    const overflow=document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow="hidden"
    return ()=>{dialog?.close();document.body.style.overflow=overflow;previous?.focus()}
  },[isOpen])
  if(!isOpen)return null
  return createPortal(<dialog ref={dialogRef} id="mobile-navigation" aria-label="Menu de navegação" onCancel={onClose} className="m-0 h-dvh max-h-none w-screen max-w-none bg-white text-[#111111] p-6 backdrop:bg-white"><div className="min-h-full flex flex-col gap-8"><div className="flex justify-between items-center"><a href="#" onClick={onClose} className="font-heading font-semibold">rafael setubal®</a><button type="button" autoFocus onClick={onClose} aria-label="Fechar menu" className="w-11 h-11 text-3xl">×</button></div><nav className="flex flex-col items-center gap-7 my-auto py-8">{navLinks.map(link=><a key={link.href} href={link.href} onClick={onClose} className="text-2xl font-heading">{link.label}</a>)}</nav><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" onClick={onClose} className="btn-primary-blue text-center px-6 py-4">Conversar sobre meu site →</a></div></dialog>,document.body)
}
