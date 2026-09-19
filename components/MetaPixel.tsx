"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

/**
 * Meta Pixel — loads the base script once and fires PageView on every
 * client-side navigation.  Renders nothing if NEXT_PUBLIC_META_PIXEL_ID
 * is not set (graceful degradation: no errors, no empty tags).
 */
export default function MetaPixel() {
  const pathname = usePathname()
  const initialized = useRef(false)

  /* ── 1. Bootstrap the pixel (runs once) ── */
  useEffect(() => {
    if (!PIXEL_ID || initialized.current) return
    initialized.current = true

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any
    const n = function (...args: unknown[]) {
      if (n.callMethod) n.callMethod(...args)
      else n.queue.push(args)
    } as any
    n.push = n
    n.loaded = true
    n.version = "2.0"
    n.queue = [] as unknown[]
    if (!w._fbq) w._fbq = n
    w.fbq = n

    const script = document.createElement("script")
    script.async = true
    script.src = "https://connect.facebook.net/en_US/fbevents.js"
    document.head.appendChild(script)

    w.fbq("init", PIXEL_ID)
    w.fbq("track", "PageView")
  }, [])

  /* ── 2. Track PageView on client-side navigations ── */
  useEffect(() => {
    if (!PIXEL_ID || !initialized.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).fbq?.("track", "PageView")
  }, [pathname])

  /* ── 3. noscript fallback ── */
  if (!PIXEL_ID) return null

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  )
}
