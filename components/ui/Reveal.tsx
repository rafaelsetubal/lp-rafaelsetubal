"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  /** blur amount in px (default 8) */
  blur?: number
  /** distance to translate from (default 24px) */
  distance?: number
  /** direction: 'up' | 'down' | 'left' | 'right' */
  direction?: "up" | "down" | "left" | "right"
  /** threshold for IntersectionObserver (default 0.15) */
  threshold?: number
  /** tag to render */
  as?: React.ElementType
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  blur = 8,
  distance = 24,
  direction = "up",
  threshold = 0.15,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const translateMap = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : `blur(${blur}px)`,
        transform: isVisible ? "translate(0)" : translateMap[direction],
        transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, filter, transform",
      }}
    >
      {children}
    </Tag>
  )
}
