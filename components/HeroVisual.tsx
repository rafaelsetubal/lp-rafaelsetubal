import Image from "next/image"

interface HeroVisualProps {
  className?: string
}

/**
 * HeroVisual Component
 * Displays the transparent device mockup (notebook + smartphone with real client websites).
 * Features:
 * - 15-20% increased scale for strong visual presence
 * - 2 floating commercial micro-pills (e.g., "Site no ar ✓", "Design personalizado")
 * - Subtle gentle floating animation (motion-safe)
 * - Modular design ready for future video/GIF swap
 */
export default function HeroVisual({ className = "" }: HeroVisualProps) {
  return (
    <div className={`relative w-full flex items-center justify-center lg:justify-end animate-hero-mockup ${className}`}>
      {/* Container with gentle float motion */}
      <div className="relative w-full max-w-[580px] sm:max-w-[660px] lg:max-w-none lg:w-[125%] xl:w-[132%] lg:-mr-[14%] xl:-mr-[18%] animate-floating">

        {/* Floating Pill 1: Top Left / Center - "Site no ar ✓" */}
        <div className="absolute top-[6%] left-[4%] sm:left-[8%] lg:left-[6%] z-20 animate-badge-floating hidden xs:flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-neutral-200/90 shadow-[0_8px_20px_rgba(0,0,0,0.06)] px-3.5 py-1.5 rounded-full select-none pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-[#3D6AFF] animate-pulse" />
          <span className="text-xs font-semibold text-neutral-900 tracking-tight">
            Site no ar <span className="text-[#3D6AFF]">✓</span>
          </span>
        </div>

        {/* Floating Pill 2: Bottom Left near phone - "Landing Page & Institucional" */}
        <div className="absolute bottom-[8%] left-[2%] sm:left-[6%] lg:left-[4%] z-20 animate-badge-floating-delayed hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-sm border border-neutral-200/90 shadow-[0_8px_20px_rgba(0,0,0,0.06)] px-3.5 py-1.5 rounded-full select-none pointer-events-none">
          <svg
            className="w-3.5 h-3.5 text-[#3D6AFF]"
            viewBox="0 0 16 16"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 6.5-4 4a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 1 1 1.06-1.06L7 8.94l3.47-3.5a.75.75 0 0 1 1.06 1.06z" />
          </svg>
          <span className="text-xs font-semibold text-neutral-900 tracking-tight">
            Design + Código
          </span>
        </div>

        {/* Main Mockup Image */}
        <div className="relative">
          <Image
            src="/hero-mockup.png"
            alt="Mockup de notebook e smartphone exibindo sites desenvolvidos por rafael setubal"
            width={1500}
            height={1000}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 85vw, (max-width: 1440px) 60vw, 850px"
            className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.06)]"
          />
        </div>
      </div>
    </div>
  )
}
