export interface Project {
  image: string
  name: string
  category: string
  description: string
  url: string
}

export default function PortfolioPlaceholder() {
  return (
    <section id="projetos" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] font-bold tracking-[-0.025em] leading-tight text-neutral-950">
              Projetos que já estão no ar.
            </h2>
            <p className="mt-4 text-neutral-500 text-lg">
              Sites e landing pages desenvolvidos para empresas e profissionais.
            </p>
          </div>
          <a
            href="#projetos"
            className="text-sm text-neutral-500 hover:text-black transition-colors shrink-0"
          >
            Ver todos os projetos &rarr;
          </a>
        </div>

        {/* Placeholder Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((item) => (
            <div key={item} className="space-y-4">
              <div className="aspect-[4/3] bg-neutral-100 rounded-lg flex items-center justify-center">
                <div className="w-10 h-10 rounded-md border border-neutral-200 flex items-center justify-center text-neutral-200">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 bg-neutral-100 rounded" />
                <div className="h-4 w-1/2 bg-neutral-100 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/*
          Example: Render real projects when data is available:

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block space-y-4"
              >
                <div className="aspect-[4/3] bg-neutral-100 rounded-lg overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium">
                    {project.category}
                  </p>
                  <h3 className="text-base font-semibold text-neutral-900 group-hover:text-black transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-neutral-500 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        */}
      </div>
    </section>
  )
}

export { PortfolioPlaceholder }
