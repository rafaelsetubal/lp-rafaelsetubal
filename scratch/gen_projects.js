const sharp = require('sharp');
const fs = require('fs');

if (!fs.existsSync('public/projects')) {
  fs.mkdirSync('public/projects', { recursive: true });
}

// Generate high quality, ultra crisp SVG-based website screenshots for each real project:

const projects = [
  {
    id: 'glemo',
    name: 'GLEMO',
    category: 'Hub Imobiliário',
    title: 'Encontre o imóvel ideal para o seu momento.',
    subtitle: 'O hub imobiliário com os melhores empreendimentos e construtoras do Brasil.',
    theme: 'dark-warm',
    bgImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    accent: '#F97316',
    badge: 'LANÇAMENTOS EM DESTAQUE',
  },
  {
    id: 'oxford-cove',
    name: 'OXFORD COVE',
    category: 'Dubai Luxury Real Estate',
    title: 'Excelência em cada detalhe.',
    subtitle: 'Acesso prioritário a um dos projetos boutique de maior potencial de valorização em JVC.',
    theme: 'luxury-neutral',
    bgImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop',
    accent: '#D4AF37',
    badge: 'OXFORD COVE BY IMAN',
  },
  {
    id: 'beruf',
    name: 'BERUF BRASIL',
    category: 'Soluções Industriais',
    title: 'Tecnologia que move indústrias.',
    subtitle: 'Site institucional focado em geração de oportunidades comerciais e autoridade industrial.',
    theme: 'industrial-dark',
    bgImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
    accent: '#3D6AFF',
    badge: 'INDÚSTRIA 4.0',
  },
  {
    id: 'almeida',
    name: 'ALMEIDA CONSTRUTORA',
    category: 'Engenharia & Arquitetura',
    title: 'Do conceito ao seu novo endereço.',
    subtitle: 'Construindo valor para gerações com rigor arquitetônico e acabamento de alto padrão.',
    theme: 'minimal-warm',
    bgImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    accent: '#8B5CF6',
    badge: 'PROJETOS EXCLUSIVOS',
  },
  {
    id: 'kovin',
    name: 'KOVIN',
    category: 'Tecnologia & Precisão',
    title: 'Precisão para grandes desafios.',
    subtitle: 'Soluções industriais e componentes sob medida para o mercado nacional e internacional.',
    theme: 'tech-dark',
    bgImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop',
    accent: '#06B6D4',
    badge: 'ENGENHARIA AVANÇADA',
  }
];

async function generateScreenshots() {
  for (const p of projects) {
    let bgGradient = '';
    let textColor = '#ffffff';
    let subColor = 'rgba(255,255,255,0.7)';
    let navBg = 'rgba(255,255,255,0.08)';

    if (p.theme === 'dark-warm') {
      bgGradient = `
        <defs>
          <linearGradient id="grad-${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#181512" />
            <stop offset="50%" stop-color="#2c221a" />
            <stop offset="100%" stop-color="#0f0c0a" />
          </linearGradient>
        </defs>
      `;
    } else if (p.theme === 'luxury-neutral') {
      bgGradient = `
        <defs>
          <linearGradient id="grad-${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1E2022" />
            <stop offset="50%" stop-color="#2D3035" />
            <stop offset="100%" stop-color="#141517" />
          </linearGradient>
        </defs>
      `;
    } else if (p.theme === 'industrial-dark') {
      bgGradient = `
        <defs>
          <linearGradient id="grad-${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0c0e12" />
            <stop offset="50%" stop-color="#141923" />
            <stop offset="100%" stop-color="#07090c" />
          </linearGradient>
        </defs>
      `;
    } else if (p.theme === 'minimal-warm') {
      bgGradient = `
        <defs>
          <linearGradient id="grad-${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#f5f3ef" />
            <stop offset="100%" stop-color="#e8e4dc" />
          </linearGradient>
        </defs>
      `;
      textColor = '#171717';
      subColor = '#525252';
      navBg = 'rgba(0,0,0,0.05)';
    } else {
      bgGradient = `
        <defs>
          <linearGradient id="grad-${p.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0b111e" />
            <stop offset="50%" stop-color="#111c30" />
            <stop offset="100%" stop-color="#070b14" />
          </linearGradient>
        </defs>
      `;
    }

    const svg = `
    <svg width="1200" height="750" viewBox="0 0 1200 750" xmlns="http://www.w3.org/2000/svg">
      ${bgGradient}
      <rect width="1200" height="750" fill="url(#grad-${p.id})" />

      <!-- Top Nav Bar -->
      <rect y="0" width="1200" height="70" fill="${navBg}" />
      <text x="60" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-weight="800" font-size="20" fill="${textColor}" letter-spacing="1">${p.name}</text>
      
      <!-- Nav Items -->
      <text x="480" y="43" font-family="sans-serif" font-size="14" fill="${subColor}">Empreendimentos</text>
      <text x="640" y="43" font-family="sans-serif" font-size="14" fill="${subColor}">Construtoras</text>
      <text x="770" y="43" font-family="sans-serif" font-size="14" fill="${subColor}">Mercado</text>
      <text x="870" y="43" font-family="sans-serif" font-size="14" fill="${subColor}">Contato</text>

      <rect x="1020" y="20" width="120" height="34" rx="17" fill="${p.accent}" />
      <text x="1080" y="42" font-family="sans-serif" font-weight="600" font-size="13" fill="#ffffff" text-anchor="middle">Acessar →</text>

      <!-- Badge -->
      <rect x="60" y="160" width="220" height="30" rx="15" fill="${p.accent}" opacity="0.2" />
      <text x="170" y="180" font-family="sans-serif" font-weight="700" font-size="11" fill="${p.accent}" text-anchor="middle" letter-spacing="1.5">${p.badge}</text>

      <!-- Main Headline -->
      <text x="60" y="250" font-family="-apple-system, BlinkMacSystemFont, 'Inter', sans-serif" font-weight="800" font-size="52" fill="${textColor}" letter-spacing="-1.5">
        <tspan x="60" dy="0">${p.title.split(' ').slice(0, 3).join(' ')}</tspan>
        <tspan x="60" dy="65">${p.title.split(' ').slice(3).join(' ')}</tspan>
      </text>

      <!-- Subtitle -->
      <text x="60" y="385" font-family="sans-serif" font-weight="400" font-size="20" fill="${subColor}">
        ${p.subtitle}
      </text>

      <!-- Search Bar / Action Box -->
      <rect x="60" y="450" width="520" height="60" rx="30" fill="${textColor === '#ffffff' ? '#ffffff' : '#ffffff'}" />
      <text x="90" y="486" font-family="sans-serif" font-size="16" fill="#999999">Buscar por cidade, bairro, projeto...</text>
      <circle cx="545" cy="480" r="22" fill="${p.accent}" />
      <path d="M539 474l12 12m-3-6a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" stroke="#ffffff" stroke-width="2.5" fill="none" stroke-linecap="round"/>

      <!-- Tags below search -->
      <rect x="60" y="540" width="130" height="32" rx="16" fill="${navBg}" />
      <circle cx="75" cy="556" r="4" fill="${p.accent}" />
      <text x="90" y="561" font-family="sans-serif" font-size="13" fill="${subColor}">Lançamentos</text>

      <rect x="205" y="540" width="140" height="32" rx="16" fill="${navBg}" />
      <circle cx="220" cy="556" r="4" fill="${p.accent}" />
      <text x="235" y="561" font-family="sans-serif" font-size="13" fill="${subColor}">Em construção</text>

      <rect x="360" y="540" width="130" height="32" rx="16" fill="${navBg}" />
      <circle cx="375" cy="556" r="4" fill="${p.accent}" />
      <text x="390" y="561" font-family="sans-serif" font-size="13" fill="${subColor}">Prontos p/ morar</text>

      <!-- Visual cards / decorative preview on the right -->
      <g transform="translate(680, 130)">
        <rect width="460" height="540" rx="20" fill="${textColor === '#ffffff' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'}" stroke="${textColor === '#ffffff' ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}" stroke-width="1.5" />
        <rect x="25" y="25" width="410" height="280" rx="14" fill="${textColor === '#ffffff' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}" />
        <text x="230" y="170" font-family="sans-serif" font-weight="700" font-size="18" fill="${p.accent}" text-anchor="middle" letter-spacing="1">PREVIEW EXCLUSIVO</text>
        
        <text x="30" y="350" font-family="sans-serif" font-weight="700" font-size="22" fill="${textColor}">Residencial Vista Parque</text>
        <text x="30" y="380" font-family="sans-serif" font-size="15" fill="${subColor}">3 a 4 suítes • 180m² a 320m² • 3 vagas</text>
        
        <rect x="30" y="420" width="180" height="46" rx="23" fill="${p.accent}" />
        <text x="120" y="448" font-family="sans-serif" font-weight="700" font-size="14" fill="#ffffff" text-anchor="middle">Ver detalhes</text>
      </g>
    </svg>
    `;

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 95 })
      .toFile(`public/projects/${p.id}.jpg`);

    console.log(`Generated public/projects/${p.id}.jpg`);
  }
}

generateScreenshots().catch(console.error);
