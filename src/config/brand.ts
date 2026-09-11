/**
 * Fonte única de verdade da identidade NJAL Brasil.
 * Links oficiais, escrituras da marca e helpers de contato.
 */

export const BRAND = {
  name: 'NJAL',
  fullName: 'NJAL BRASIL',
  handle: '@njalbrasil',
  instagram: 'https://www.instagram.com/njalbrasil/',
  whatsapp: 'https://wa.me/qr/SCWJ6A6MNLGHN1',
  pronunciation: '✌️ Se fala NIJAL',
  slogan: 'FORGED FOR CHAMPIONS',
  manifesto: 'PARA QUEM É A NJAL',
  armorLine: 'NÃO SÃO APENAS ROUPAS. SÃO ARMADURAS DE TREINO.',
  saga: 'ATÉ CHEGAR EM VALHALLA',
  storePoint: {
    name: 'Templo Jiu-Jitsu Culture',
    street: 'R. Curupá, 328 - Vila Formosa',
    city: 'São Paulo - SP, 03355-010',
  },
} as const;

/**
 * Monta o link de atendimento no WhatsApp.
 *
 * Observação: o link oficial da marca é um short link de QR Code
 * (`wa.me/qr/...`). O WhatsApp ignora o parâmetro `?text=` nesse formato —
 * a mensagem pré-configurada só é anexada de fato quando a NJAL informar o
 * número no formato `wa.me/55DDDNUMERO`. O parâmetro é mantido aqui para que
 * a troca seja de uma linha só quando o número estiver disponível.
 */
export function whatsappLink(message?: string): string {
  if (!message) return BRAND.whatsapp;
  return `${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
}

/**
 * Resolve um caminho de asset respeitando a base do deploy.
 * Em dev a base e "/"; no GitHub Pages e "/<repo>/".
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}
