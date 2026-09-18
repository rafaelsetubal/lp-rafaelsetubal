import React from "react"

interface SectionFrameProps {
  children: React.ReactNode
  id?: string
  className?: string
  showTopLine?: boolean
  showBottomLine?: boolean
  showDiagonalAccent?: boolean
  maxWidth?: string
}

/**
 * SectionFrame Component
 * Provides contextual architectural framing (top/bottom structural lines and optional diagonal accents)
 * for sections without polluting the viewport with a permanent full-screen wireframe grid.
 */
export default function SectionFrame({
  children,
  id,
  className = "",
  showTopLine = true,
  showBottomLine = false,
  showDiagonalAccent = false,
  maxWidth = "max-w-[1280px]",
}: SectionFrameProps) {
  return (
    <section
      id={id}
      className={`relative w-full ${
        showTopLine ? "border-t border-[rgba(17,17,17,0.10)]" : ""
      } ${showBottomLine ? "border-b border-[rgba(17,17,17,0.10)]" : ""} ${className}`}
    >
      {/* Optional ultra-subtle diagonal accent strip along the border */}
      {showDiagonalAccent && (
        <div
          aria-hidden="true"
          className="w-full h-2 opacity-70 pointer-events-none select-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(17, 17, 17, 0.045) 0, rgba(17, 17, 17, 0.045) 1px, transparent 0, transparent 8px)",
          }}
        />
      )}

      <div className={`w-full ${maxWidth} mx-auto px-6 relative z-10`}>
        {children}
      </div>
    </section>
  )
}
