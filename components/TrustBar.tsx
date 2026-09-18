const logos = [
  'Logo 1',
  'Logo 2',
  'Logo 3',
  'Logo 4',
  'Logo 5',
  'Logo 6',
]

export default function TrustBar() {
  return (
    <section className="py-12 md:py-16 border-y border-neutral-200">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-[0.7rem] uppercase tracking-[0.15em] text-neutral-400 text-center mb-8 font-medium">
          Empresas e profissionais que já confiaram
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="w-24 h-8 flex items-center justify-center text-neutral-300 text-lg font-medium select-none"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { TrustBar }
