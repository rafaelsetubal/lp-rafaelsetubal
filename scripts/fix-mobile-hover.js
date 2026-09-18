const fs = require('fs');
let content = fs.readFileSync('components/Experience.tsx', 'utf8');

if (!content.includes('"use client"')) {
  content = '"use client";\nimport { useEffect, useRef, useState } from "react";\n' + content;
}

const cardComponent = `
function ExperienceCard({ item, isBottomRowDesktop, isLastInRowDesktop, isBottomRowTablet, isLastInRowTablet }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsActive(entry.isIntersecting);
    }, { rootMargin: '-30% 0px -30% 0px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      data-active={isActive}
      className={\`group flex flex-col justify-between min-h-[260px] p-6 lg:p-8 relative
        border-[rgba(17,17,17,0.08)]
        border-b md:border-b-0
        \${!isBottomRowDesktop ? 'lg:border-b' : ''}
        \${!isLastInRowDesktop ? 'lg:border-r' : ''}
        \${!isBottomRowTablet ? 'md:max-lg:border-b' : ''}
        \${!isLastInRowTablet ? 'md:max-lg:border-r' : ''}
      \`}
    >
      {/* Vídeo Hover Background com Overlay Escuro */}
      {item.videoUrl && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 max-md:group-data-[active=true]:opacity-100">
          <video 
            src={item.videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay loop muted playsInline
          />
          {/* Overlay escuro para garantir leitura do texto branco */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}

      {/* Header do item (Logos + Atuação) */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3">
          {item.logos.length === 1 ? (
            <div className="relative h-6 md:h-7 w-auto min-w-[80px]">
              <Image 
                src={item.logos[0]} 
                alt={item.company} 
                fill 
                className="object-contain object-left transition-all duration-500 group-hover:brightness-0 group-hover:invert max-md:group-data-[active=true]:brightness-0 max-md:group-data-[active=true]:invert"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="relative h-6 md:h-7 w-[80px]">
                <Image src={item.logos[0]} alt="Company 1" fill className="object-contain object-left transition-all duration-500 group-hover:brightness-0 group-hover:invert max-md:group-data-[active=true]:brightness-0 max-md:group-data-[active=true]:invert" />
              </div>
              <span className="text-[#8A8F98] group-hover:text-white/60 max-md:group-data-[active=true]:text-white/60 transition-colors duration-500 text-lg font-light leading-none pb-1">×</span>
              <div className="relative h-6 md:h-7 w-[80px]">
                <Image src={item.logos[1]} alt="Company 2" fill className="object-contain object-left transition-all duration-500 group-hover:brightness-0 group-hover:invert max-md:group-data-[active=true]:brightness-0 max-md:group-data-[active=true]:invert" />
              </div>
            </div>
          )}
        </div>
        <span className="font-sans text-[11px] md:text-xs text-[#5F6368] group-hover:text-white/90 max-md:group-data-[active=true]:text-white/90 transition-colors duration-500 font-medium tracking-wide">
          {item.actuation}
        </span>
      </div>

      {/* Métrica e Descrição */}
      <div className="mb-8 mt-auto relative z-10">
        <h3 className="font-heading text-[2.25rem] lg:text-[2.75rem] font-semibold tracking-tight text-[#3D6AFF] group-hover:text-white max-md:group-data-[active=true]:text-white transition-all duration-500 mb-2 leading-none group-hover:-translate-y-[1px] max-md:group-data-[active=true]:-translate-y-[1px] flex items-center gap-2">
          {item.isGrowth && (
            <span className="text-[#10B981] group-hover:text-[#34D399] max-md:group-data-[active=true]:text-[#34D399] transition-colors duration-500 text-[1.75rem] lg:text-[2.25rem] font-medium leading-none -mt-1">
              ↑
            </span>
          )}
          {item.metric}
        </h3>
        <p className="font-sans text-sm text-[#5F6368] group-hover:text-white/80 max-md:group-data-[active=true]:text-white/80 transition-colors duration-500 leading-relaxed max-w-[90%]">
          {item.description}
        </p>
      </div>

      {/* Footer do item (Fonte + Número) */}
      <div className="flex items-center justify-between mt-auto relative z-10">
        <a 
          href={item.sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-[#5F6368] group-hover:text-white max-md:group-data-[active=true]:text-white transition-colors duration-500"
        >
          Fonte: {item.sourceText}
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        
        <span className="font-sans text-xs md:text-sm font-semibold text-[rgba(61,106,255,0.35)] group-hover:text-white/40 max-md:group-data-[active=true]:text-white/40 transition-colors duration-500">
          {item.id}
        </span>
      </div>
    </div>
  )
}
`;

const searchStr = `            return (
              <div 
                key={item.id}`;

const endSearchStr = `              </div>
            )
          })}`;

if (!content.includes('function ExperienceCard(')) {
  const startIndex = content.indexOf(searchStr);
  const endIndex = content.indexOf(endSearchStr) + `              </div>
            )`.length;

  if (startIndex !== -1 && endIndex !== -1) {
    const blockToReplace = content.substring(startIndex, endIndex);
    const replacement = `            return (
              <ExperienceCard 
                key={item.id} 
                item={item} 
                isBottomRowDesktop={isBottomRowDesktop} 
                isLastInRowDesktop={isLastInRowDesktop} 
                isBottomRowTablet={isBottomRowTablet} 
                isLastInRowTablet={isLastInRowTablet} 
              />
            )`;
    content = content.replace(blockToReplace, replacement);
    content = content + '\n' + cardComponent;
    fs.writeFileSync('components/Experience.tsx', content);
    console.log('Success!');
  } else {
    console.log('Could not find replace bounds');
  }
} else {
  console.log('ExperienceCard already exists');
}
