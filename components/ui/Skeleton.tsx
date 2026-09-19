export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 bg-[length:200%_100%] rounded-lg ${className}`}
      style={{ animation: "shimmer 1.8s ease-in-out infinite" }}
    />
  )
}
