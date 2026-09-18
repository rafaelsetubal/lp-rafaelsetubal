"use client"

import { useEffect, useRef, useState } from "react"
import type { ProjectItem } from "@/lib/projects-data"

type Candidate = { video: HTMLVideoElement; eligible: boolean; ratio: number; failed: () => void }
const candidates = new Map<HTMLVideoElement, Candidate>()
let playing: HTMLVideoElement | null = null

function updatePlayback() {
  const available = [...candidates.values()].filter((item) => item.eligible)
  available.sort((a, b) => b.ratio - a.ratio)
  const best = available[0]
  const previous = playing && candidates.get(playing)
  const selected = previous && previous.eligible && best && previous.ratio === best.ratio ? previous : best
  for (const { video } of candidates.values()) {
    if (video !== selected?.video && !video.paused) video.pause()
  }
  playing = selected?.video ?? null
  if (selected && selected.video.paused) {
    void selected.video.play().catch(selected.failed)
  }
}

export default function ProjectVideo({ project, active = false, preview = false }: {
  project: ProjectItem; active?: boolean; preview?: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    const touch = matchMedia("(hover: none)")
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const candidate: Candidate = { video, eligible: false, ratio: 0, failed: () => setReady(false) }
    candidates.set(video, candidate)
    const sync = () => {
      candidate.eligible = candidate.ratio >= 0.6 && !document.hidden && !motion.matches && !connection?.saveData && (active || (preview && touch.matches))
      updatePlayback()
    }
    const observer = new IntersectionObserver(([entry]) => {
      candidate.ratio = entry.isIntersecting ? entry.intersectionRatio : 0
      sync()
    }, { threshold: [0, 0.6, 0.8, 1] })
    observer.observe(video)
    motion.addEventListener("change", sync)
    touch.addEventListener("change", sync)
    document.addEventListener("visibilitychange", sync)
    return () => {
      observer.disconnect()
      candidates.delete(video)
      video.pause()
      motion.removeEventListener("change", sync)
      touch.removeEventListener("change", sync)
      document.removeEventListener("visibilitychange", sync)
      updatePlayback()
    }
  }, [active, preview, project.id])

  if (!project.videoMp4 && !project.videoWebm) return null
  return (
    <video ref={ref} preload="none" muted loop playsInline aria-hidden="true"
      onPlaying={() => setReady(true)} onPause={() => setReady(false)} onError={() => setReady(false)}
      className={`absolute inset-0 w-full h-full object-cover object-left-top z-10 transition-opacity pointer-events-none ${ready ? "opacity-100" : "opacity-0"}`}>
      {project.videoWebm && <source src={project.videoWebm} type="video/webm" />}
      {project.videoMp4 && <source src={project.videoMp4} type="video/mp4" />}
    </video>
  )
}
