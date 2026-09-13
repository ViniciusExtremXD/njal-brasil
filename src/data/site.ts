/**
 * NJAL BRASIL — fonte única de verdade do site.
 * Fatos da marca vêm do briefing e do material oficial do feed (@njalbrasil).
 * Textos de apoio (manifesto, tecido) estão em voz de marca e podem ser ajustados aqui.
 */
import type { ImageMetadata } from 'astro';

import artQuem from '../assets/images/hero-banner-c2hjd.jpg';
import artOque from '../assets/images/brand-reveal-c1uh5.jpg';
import artCrossfit from '../assets/images/athlete-model-c2hjd2.jpg';
import artAcademia from '../assets/images/gear-fold-c2hjd3.jpg';
import artTemplo from '../assets/images/post-templo-jiujitsu.jpg';
import artTraining from '../assets/images/post-forged-dept.jpg';
import artConfeccao from '../assets/images/post-confeccao-portfolio.jpg';
import artNovidades from '../assets/images/post-athlete-blacktee.jpg';
import feedRegata from '../assets/images/diogo-regata-reel.jpg';
import feedEspelho from '../assets/images/post-diogo-crossfit.jpg';
import avatar from '../assets/images/njal-profile.jpg';

/** Caminho base do deploy (GitHub Pages serve em subdiretório). Use para qualquer link de página interna. */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
export const withBase = (path: string) => `${BASE}${path.startsWith('/') ? path : `/${path}`}`;

/**
 * Número real de WhatsApp da loja oficial (encontrado em njal.com.br). Ao contrário do antigo
 * short link de QR, este formato NÃO descarta `?text=`: a mensagem pré-preenchida chega de verdade.
 */
const WA_NUMBER = '5511988256454';
export const waLink = (msg?: string) => `https://wa.me/${WA_NUMBER}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;

export const BRAND = {
  name: 'NJAL',
  full: 'NJAL BRASIL',
  handle: '@njalbrasil',
  city: 'São Paulo',
  tagline: 'Vestuário de treino de alta intensidade',
  instagram: 'https://www.instagram.com/njalbrasil/',
  whatsapp: waLink('Olá! Vim pelo site da NJAL, quero saber mais.'),
  /** Loja oficial (njal.com.br): catálogo com preço, tamanho, frete e checkout real. */
  shopUrl: 'https://www.njal.com.br/',
  say: 'Se fala NIJAL',
  scriptures: {
    forged: 'Forged for Champions',
    who: 'Para quem é a NJAL',
    valhalla: 'Até chegar em Valhalla',
    armor: 'Não são apenas roupas. São armaduras de treino.',
  },
  point: {
    name: 'Templo Jiu-Jitsu Culture',
    role: 'Parceria oficial · ponto físico',
    street: 'R. Curupá, 328',
    district: 'Vila Formosa',
    city: 'São Paulo',
    uf: 'SP',
    maps:
      'https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('R. Curupá, 328 - Vila Formosa, São Paulo - SP'),
    mapsEmbed:
      'https://www.google.com/maps?q=' +
      encodeURIComponent('R. Curupá, 328 - Vila Formosa, São Paulo - SP') +
      '&output=embed',
  },
} as const;

export const NAV = [
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#pilares', label: 'Pilares' },
  { href: '#drops', label: 'Drops' },
  { href: '#tecido', label: 'Tecido' },
  { href: '#comunidade', label: 'Comunidade' },
  { href: '#confeccao', label: 'Confecção' },
] as const;

export const MANIFESTO_LINES = [
  'acorda antes do alarme.',
  'treina quando ninguém está olhando.',
  'respeita o ferro e o tatame.',
  'não negocia com a preguiça.',
  'vai até chegar em Valhalla.',
] as const;

export type Arena = 'CROSSFIT RX' | 'VALHALLA' | 'NO-GI' | 'RUA' | 'B2B';

export interface Pillar {
  index: string;
  name: string;
  arena: Arena;
  category: string;
  text: string;
}

export const PILLARS: Pillar[] = [
  {
    index: '01',
    name: 'Crossfit RX',
    arena: 'CROSSFIT RX',
    category: 'Box · WOD · barra',
    text: 'Bermudas, camisetas e acessórios de alta qualidade e melhor desempenho para você ser um RX.',
  },
  {
    index: '02',
    name: 'Valhalla',
    arena: 'VALHALLA',
    category: 'Academia · ferro pesado · estética nórdica',
    text: 'Seja nos treinos até chegar em Valhalla ou no dia a dia. Peso no ferro, peso na estética.',
  },
  {
    index: '03',
    name: 'No-Gi',
    arena: 'NO-GI',
    category: 'Jiu-Jitsu · parceria oficial Templo Jiu-Jitsu Culture',
    text: 'Fightwear para o tatame, em parceria oficial com o Templo Jiu-Jitsu Culture, na Vila Formosa.',
  },
  {
    index: '04',
    name: 'Rua',
    arena: 'RUA',
    category: 'Streetwear oversized',
    text: 'Modelagem oversized para a rua carregar o mesmo peso visual do treino. A postura não sai com o suor.',
  },
  {
    index: '05',
    name: 'Confecção',
    arena: 'B2B',
    category: 'Confecção própria · B2B',
    text: 'Sua ideia, nossa confecção. Produção própria para marcas, boxes, academias e equipes.',
  },
];

export interface Drop {
  index: string;
  name: string;
  arena: Arena;
  line: string;
  text: string;
  /** Arte oficial do feed, exibida inteira. `null` = card tipográfico (sem imagem disponível). */
  art: ImageMetadata | null;
  artLabel?: string;
  alt?: string;
  side: 'left' | 'right';
}

export const DROPS: Drop[] = [
  {
    index: '01',
    name: 'Linha Crossfit',
    arena: 'CROSSFIT RX',
    line: 'Bermudas · camisetas · acessórios',
    text: 'Alta qualidade e melhor desempenho para você ser um RX. A armadura do box, do WOD e da barra.',
    art: artCrossfit,
    artLabel: 'Campanha · Linha Crossfit',
    alt: 'Arte oficial da Linha Crossfit: atleta sorrindo de braços cruzados, camiseta preta NJAL, fundo preto.',
    side: 'left',
  },
  {
    index: '02',
    name: 'Linha Academia e Casual',
    arena: 'VALHALLA',
    line: 'Camisetas · ferro pesado · dia a dia',
    text: 'Seja nos treinos até chegar em Valhalla ou no dia a dia. Vermelho de guerra sobre preto de estúdio.',
    art: artAcademia,
    artLabel: 'Campanha · Linha Academia e Casual',
    alt: 'Arte oficial da Linha Academia e Casual: camisetas dobradas, vermelha com NJAL em branco, sobre padrão de monogramas.',
    side: 'right',
  },
  {
    index: '03',
    name: 'NJAL × Templo',
    arena: 'NO-GI',
    line: 'Fightwear · Templo Jiu-Jitsu Culture',
    text: 'Parceria oficial com o Templo Jiu-Jitsu Culture. Aonde encontrar as roupas da NJAL: R. Curupá, 328, Vila Formosa.',
    art: artTemplo,
    artLabel: 'Campanha · NJAL × Templo',
    alt: 'Arte oficial NJAL e Templo Jiu-Jitsu Culture: três atletas de preto, endereço R. Curupá 328, Vila Formosa.',
    side: 'left',
  },
  {
    index: '04',
    name: 'Training Dept.',
    arena: 'VALHALLA',
    line: 'Cross · Jiu-Jitsu · Academia · Moda casual',
    text: 'Vista sua jornada. Viva seu propósito. Seja NJAL. Desempenho, disciplina, foco e estilo em uma só armadura.',
    art: artTraining,
    artLabel: 'Campanha · Conheça NJAL',
    alt: 'Pôster oficial Conheça NJAL: colagem de atletas de crossfit, jiu-jitsu e academia com o brasão do viking.',
    side: 'right',
  },
  {
    index: '05',
    name: 'Oversized',
    arena: 'RUA',
    line: 'Streetwear · próximo drop',
    text: 'A linha de rua sai primeiro no feed. Ative as notificações do @njalbrasil e fale no WhatsApp para garantir a sua.',
    art: null,
    side: 'left',
  },
];

export interface FabricSpec {
  index: string;
  arena: Arena;
  name: string;
  label: string;
  demand: string;
  answer: string;
}

export const FABRIC: FabricSpec[] = [
  {
    index: '01',
    arena: 'CROSSFIT RX',
    name: 'Crossfit RX',
    label: 'Box · WOD · barra',
    demand: 'Snatch, muscle-up, burpee. O corpo vai em todas as direções, e o tecido tem que ir junto.',
    answer: 'Malha que acompanha o movimento sem travar e seca rápido entre um round e outro.',
  },
  {
    index: '02',
    arena: 'VALHALLA',
    name: 'Valhalla',
    label: 'Academia · ferro pesado',
    demand: 'Ferro pesado, séries longas, suor. Ombro e dorsal construídos com anos de disciplina.',
    answer: 'Caimento que respeita o corpo construído e gola que não deforma na primeira lavagem.',
  },
  {
    index: '03',
    arena: 'NO-GI',
    name: 'No-Gi',
    label: 'Tatame · sem kimono',
    demand: 'Atrito de tatame, pegada, pressão. Sem kimono, a roupa é a única camada entre você e o rola.',
    answer: 'Compressão que segura a musculatura e costura que aguenta puxão de faixa-preta.',
  },
  {
    index: '04',
    arena: 'RUA',
    name: 'Rua',
    label: 'Streetwear oversized',
    demand: 'O treino acabou. A postura não. A peça precisa ter presença longe do box.',
    answer: 'Modelagem oversized com o mesmo peso visual da armadura de treino.',
  },
];

export interface FeedItem {
  kind: 'art' | 'say' | 'point' | 'valhalla';
  art?: ImageMetadata;
  alt?: string;
  label?: string;
}

export const FEED: FeedItem[] = [
  {
    kind: 'art',
    art: feedRegata,
    alt: 'Atleta de regata vermelha NJAL em frente ao espelho da academia',
    label: 'Reel · Regata Valhalla',
  },
  { kind: 'say' },
  {
    kind: 'art',
    art: feedEspelho,
    alt: 'Atleta de camiseta preta NJAL com o brasão do viking em frente ao espelho',
    label: 'Feed · Camiseta Training Dept.',
  },
  { kind: 'point' },
  { kind: 'valhalla' },
];

export const AVATAR = avatar;

export const B2B = {
  title: 'Sua ideia. Nossa confecção.',
  intro:
    'Confecção própria em São Paulo para marcas, academias, boxes e equipes. Personalizamos a partir de 10 peças com a sua logo.',
  bullets: [
    { label: 'Do zero', text: 'Crie sua marca do zero: moda casual, esporte ou uniforme para o seu negócio.' },
    { label: 'Todo o Brasil', text: 'Entregamos em todo o Brasil, com produção rápida.' },
    { label: 'Premium', text: 'Qualidade premium com acabamento impecável.' },
    { label: 'Portfólio', text: 'Conheça nosso portfólio no Instagram e fale direto no WhatsApp.' },
  ],
  arts: [
    {
      art: artConfeccao,
      alt: 'Arte oficial: Sua ideia, nossa confecção. Manequim, máquina de costura e cabideiro com peças NJAL',
      label: 'Confecção · Sua ideia, nossa confecção',
    },
    {
      art: artNovidades,
      alt: 'Arte oficial: Novidades NJAL, personalizamos a partir de 10 peças com sua logo. Três atletas com peças personalizadas',
      label: 'Confecção · A partir de 10 peças',
    },
  ],
} as const;

export const ART = { quem: artQuem, oque: artOque } as const;
