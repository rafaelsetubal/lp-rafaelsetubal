# Rafael Setubal — landing page

Next.js App Router, React, TypeScript e Tailwind CSS.

## Executar

- `npm ci`
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run start`

## Oferta

Criação de landing page a partir de R$ 700 ou institucional a partir de R$ 2.000.
Landing page: R$ 100/mês obrigatórios de hospedagem, HTTPS, backups e cuidado técnico, sem relatórios ou alterações de conteúdo. Institucional: R$ 250/mês de cuidado técnico, relatórios trimestrais e recomendações. Domínio cobrado à parte nos dois planos. Suporte, início da cobrança, cancelamento e condições de cartão/parcelamento são definidos na proposta. Nenhum checkout ou cobrança recorrente foi integrado.

Projetos específicos: escopo, investimento e acompanhamento sob consulta.

WhatsApp e navegação centralizados em `lib/contact.ts`.

## Ativar formulário de e-mail

O formulário usa uma rota de servidor (`/api/contact`) e a API do Resend. Destino fixo: marzcreativedesign@gmail.com. A senha do Gmail não é necessária.

1. Criar uma conta no Resend e verificar um domínio remetente sob seu controle.
2. Criar a chave de envio e preencher `RESEND_API_KEY` em `.env.local` (local) e nas variáveis da hospedagem (produção). Nunca colocar a chave no frontend ou no Git.
3. Preencher `CONTACT_FROM_EMAIL` com um remetente autorizado nesse domínio, por exemplo `Site <contato@seu-dominio.com.br>`.
4. Preencher `SITE_URL` com a URL pública final; ela alimenta canonical e sitemap.
5. Reiniciar/recompilar e enviar um teste, verificando também a caixa de spam do Gmail.

Sem as credenciais, a API responde 503 e a interface oferece WhatsApp/e-mail, sem exibir confirmação falsa. A resposta de sucesso confirma a aceitação pelo provedor, não a chegada à caixa de entrada.

Referência: https://resend.com/docs/api-reference/emails/send-email

## Proteção e publicação

O envio valida os campos no servidor, usa destinatário fixo, texto simples, verificação de origem, campo antispam, timeout e limite de tentativas por processo. Em uma hospedagem com múltiplas instâncias, configurar limite compartilhado/WAF; o limite local não substitui esse controle. O proxy deve substituir cabeçalhos de IP fornecidos pelo cliente.

A medição de acessos/cliques ainda precisa de uma ferramenta de analytics configurada para gerar relatórios reais. Nenhum relatório, dado de público ou resultado comercial foi inventado. Configurar avisos e escolhas de privacidade conforme a ferramenta selecionada.

Os materiais originais de vídeo ficam em `source-assets/projects`, fora da pasta pública. Os scripts de processamento usam esse caminho. Os componentes usam a pasta `public/projects/video-optimized`.

## Copy sobre busca e IA

A copy explica elegibilidade e descoberta, sem prometer rankings, citações ou vendas.
Fontes de referência:
- https://developers.google.com/search/docs/appearance/ai-features
- https://help.openai.com/en/articles/12627856-publishers-and-developers-faq

## Verificação manual

- Conferir menu em 390px: abertura, Escape, foco e navegação.
- Conferir cards de preços e condição do domínio.
- Verificar que CTAs comerciais usam 5571993972676.
- Testar formulário inválido, indisponibilidade, erro e envio aceito.
- Confirmar recebimento no Gmail após configurar o provedor.
- Testar galeria, FAQ e preferência de movimento reduzido.
