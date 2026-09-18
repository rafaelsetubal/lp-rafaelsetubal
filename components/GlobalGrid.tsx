/**
 * GlobalGrid Component
 * Structural 12-column grid system with ultra-subtle vertical lines (rgba(17,17,17,0.055)).
 * Pure CSS, lightweight, responsive (12 cols desktop, 8 cols tablet, 4 cols mobile).
 */
export default function GlobalGrid() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 flex justify-center select-none overflow-hidden"
    >
      <div className="w-full max-w-[1280px] h-full px-6 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 opacity-70 md:opacity-100">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`h-full border-r border-[rgba(17,17,17,0.09)] ${
              i === 0 ? "border-l border-[rgba(17,17,17,0.09)]" : ""
            } ${i >= 4 ? "hidden md:block" : ""} ${i >= 8 ? "hidden lg:block" : ""}`}
          />
        ))}
      </div>
    </div>
  )
}
