/**
 * Identidade NJAL BRASIL — fonte única de verdade.
 * Extraída do feed oficial @njalbrasil: escrituras, canais e ponto físico.
 */

export const BRAND = {
  name: 'NJAL',
  full: 'NJAL BRASIL',
  handle: '@njalbrasil',
  instagram: 'https://www.instagram.com/njalbrasil/',
  whatsapp: 'https://wa.me/qr/SCWJ6A6MNLGHN1',
  say: 'SE FALA NIJAL',
  creed: 'FORGED FOR CHAMPIONS',
  manifesto: 'PARA QUEM É A NJAL',
  armor: 'NÃO SÃO APENAS ROUPAS. SÃO ARMADURAS DE TREINO.',
  saga: 'ATÉ CHEGAR EM VALHALLA',
  point: {
    name: 'Templo Jiu-Jitsu Culture',
    street: 'R. Curupá, 328 — Vila Formosa',
    city: 'São Paulo · SP',
  },
} as const;

/** Prefixo do deploy (GitHub Pages serve em subdiretório). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** Resolve um caminho de asset estático respeitando o basePath. */
export const asset = (path: string) => `${BASE}${path.startsWith('/') ? path : `/${path}`}`;

/**
 * Link do concierge no WhatsApp.
 * O canal oficial da marca é um short link de QR; o WhatsApp descarta o
 * parâmetro `text` nesse formato. Assim que houver um número direto
 * (`wa.me/55DDDNUMERO`), a mensagem pré-escrita passa a chegar sozinha.
 */
export function concierge(message?: string) {
  return message ? `${BRAND.whatsapp}?text=${encodeURIComponent(message)}` : BRAND.whatsapp;
}
