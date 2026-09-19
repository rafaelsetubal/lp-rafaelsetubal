"use client"

import { useEffect, useRef, useState, ReactNode } from "react"

interface TextRevealProps {
  children: ReactNode
  /** Base delay before animation starts (ms) */
  delay?: number
  /** Delay between each word (ms) */
  stagger?: number
  /** The final/target color for "dark" words (default #111111) */
  darkColor?: string
  /** The final/target color for "accent" words (default #3D6AFF) */
  accentColor?: string
  className?: string
  /** IntersectionObserver threshold */
  threshold?: number
}

/**
 * Splits children text into words.
 * Each word animates: white → inverted color → original color
 * with a staggered delay to create a typing/cascade effect.
 *
 * Accent words are detected by wrapping them in <span data-accent> or <strong>.
 */
export default function TextReveal({
  children,
  delay = 0,
  stagger = 80,
  darkColor = "#111111",
  accentColor = "#3D6AFF",
  className = "",
  threshold = 0.15,
}: TextRevealProps) {
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
      { threshold, rootMargin: "0px 0px -40px 0px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  // Parse children to extract words and detect accent spans
  const segments = parseChildren(children)

  return (
    <span ref={ref} className={className}>
      {segments.map((seg, i) => {
        if (seg.type === "br") {
          return <br key={i} />
        }

        const wordDelay = delay + i * stagger
        const isAccent = seg.isAccent

        // Animation phases:
        // white → inverted → original
        // Dark word: white → blue → black
        // Accent word: white → black → blue
        const finalColor = isAccent ? accentColor : darkColor

        return (
          <span
            key={i}
            className="inline-block transition-colors"
            style={{
              color: isVisible ? finalColor : "transparent",
              textShadow: isVisible ? "none" : "none",
              animation: isVisible
                ? `textReveal${isAccent ? "Accent" : "Dark"} 1s cubic-bezier(0.16, 1, 0.3, 1) ${wordDelay}ms both`
                : "none",
            }}
          >
            {seg.text}
            {seg.trailingSpace ? "\u00A0" : ""}
          </span>
        )
      })}
    </span>
  )
}

interface Segment {
  type: "word" | "br"
  text: string
  isAccent: boolean
  trailingSpace: boolean
}

function parseChildren(children: ReactNode): Segment[] {
  const segments: Segment[] = []

  function walk(node: ReactNode, accent: boolean) {
    if (node === null || node === undefined) return

    if (typeof node === "string") {
      const parts = node.split(/(\s+)/)
      parts.forEach((part) => {
        if (/^\s+$/.test(part)) return // skip whitespace-only
        const words = part.split(" ")
        words.forEach((word) => {
          if (!word) return
          segments.push({
            type: "word",
            text: word,
            isAccent: accent,
            trailingSpace: true,
          })
        })
      })
      return
    }

    if (typeof node === "number") {
      segments.push({
        type: "word",
        text: String(node),
        isAccent: accent,
        trailingSpace: true,
      })
      return
    }

    if (Array.isArray(node)) {
      node.forEach((child) => walk(child, accent))
      return
    }

    if (typeof node === "object" && "type" in node) {
      const el = node as React.ReactElement<{
        children?: ReactNode
        className?: string
        "data-accent"?: boolean
      }>

      // Handle <br />
      if (el.type === "br") {
        segments.push({ type: "br", text: "", isAccent: false, trailingSpace: false })
        return
      }

      // Handle accent markers: <span data-accent>, <strong>, or <span className containing "text-[#3D6AFF]" or "text-brand">
      const isAccentEl =
        el.type === "strong" ||
        (el.props && el.props["data-accent"]) ||
        (el.props?.className && /text-\[#3D6AFF\]|text-brand|text-blue/.test(el.props.className))

      walk(el.props?.children, accent || !!isAccentEl)
    }
  }

  walk(children, false)

  // Remove trailing space from last segment
  if (segments.length > 0) {
    segments[segments.length - 1].trailingSpace = false
  }

  return segments
}
