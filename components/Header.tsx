"use client"

import { useState } from "react"
import Link from "next/link"
import MobileMenu from "./MobileMenu"

import { navLinks, whatsappUrl } from "@/lib/contact"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[rgba(17,17,17,0.10)]">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="font-heading font-semibold text-base tracking-tight text-[#111111]"
        >
          rafael setubal®
        </Link>

        {/* Desktop Nav and CTA */}
        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#5F6368] hover:text-[#111111] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href={whatsappUrl()} target="_blank" rel="noopener noreferrer"
            className="btn-primary-blue inline-flex items-center justify-center text-xs sm:text-sm px-5 py-2.5 font-medium"
          >
            Conversar sobre meu site →
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="lg:hidden p-2 -mr-2 text-neutral-900 hover:text-black transition-colors focus:outline-none"
          aria-label="Abrir menu de navegação"
          aria-expanded={isMenuOpen}
          aria-controls={isMenuOpen ? "mobile-navigation" : undefined}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}
