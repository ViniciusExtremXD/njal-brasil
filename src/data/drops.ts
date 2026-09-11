import { asset } from '@/lib/brand';

export type Arena = 'CROSSFIT' | 'VALHALLA' | 'TATAME' | 'RUA';

export interface Drop {
  slug: string;
  index: string;
  name: string;
  line: string;
  arena: Arena;
  /** Frase curta e agressiva, no tom do feed. */
  battlecry: string;
  story: string;
  image: string;
  /** Segunda imagem revelada no hover — troca de perspectiva. */
  alt: string;
  specs: { label: string; value: string }[];
  status: 'DROP ATIVO' | 'LOTE ESGOTADO' | 'PRÉ-LANÇAMENTO';
}

export const ARENAS: { id: Arena | 'TODOS'; label: string; sub: string }[] = [
  { id: 'TODOS', label: 'TODOS', sub: 'arsenal completo' },
  { id: 'CROSSFIT', label: 'CROSSFIT RX', sub: 'box · wod · barra' },
  { id: 'VALHALLA', label: 'VALHALLA', sub: 'ferro pesado' },
  { id: 'TATAME', label: 'TATAME', sub: 'no-gi · fightwear' },
  { id: 'RUA', label: 'RUA', sub: 'streetwear oversized' },
];

export const DROPS: Drop[] = [
  {
    slug: 'rx-performance',
    index: '001',
    name: 'RX PERFORMANCE',
    line: 'Linha Crossfit',
    arena: 'CROSSFIT',
    battlecry: 'NINGUÉM ESCALA POR PREGUIÇA.',
    story:
      'Bermudas, camisetas e acessórios de alta qualidade e melhor desempenho para você ser um RX. Malha de quatro direções que acompanha o snatch, o muscle-up e o pistol sem uma única trava de movimento. Testada em WOD real, no chão do box, com anilha raspando o antebraço.',
    image: asset('/assets/images/post-diogo-crossfit.jpg'),
    alt: asset('/assets/images/linha-crossfit.png'),
    specs: [
      { label: 'MALHA', value: 'DRY-TECH 4-WAY' },
      { label: 'COSTURA', value: 'FLATLOCK 6 FIOS' },
      { label: 'GRAMATURA', value: '165 G/M²' },
      { label: 'ATLETA', value: '@DIOGOLIVERA_02' },
    ],
    status: 'DROP ATIVO',
  },
  {
    slug: 'valhalla-crimson',
    index: '002',
    name: 'VALHALLA CRIMSON',
    line: 'Academia & Casual',
    arena: 'VALHALLA',
    battlecry: 'ATÉ CHEGAR EM VALHALLA.',
    story:
      'Seja nos treinos até chegar em Valhalla ou no dia a dia. Algodão nobre peletizado, gola encorpada que não deforma na primeira lavagem e caimento que respeita dorsal construída com anos de ferro. Vermelho de sangue arterial sobre preto de estúdio.',
    image: asset('/assets/images/linha-academia-casual.png'),
    alt: asset('/assets/images/diogo-regata-reel.jpg'),
    specs: [
      { label: 'MALHA', value: 'ALGODÃO 30.1' },
      { label: 'ACABAMENTO', value: 'PELETIZADO' },
      { label: 'GRAMATURA', value: '185 G/M²' },
      { label: 'ESTAMPA', value: 'SILK HD' },
    ],
    status: 'DROP ATIVO',
  },
  {
    slug: 'templo-fightwear',
    index: '003',
    name: 'TEMPLO FIGHTWEAR',
    line: 'NJAL × Templo Jiu-Jitsu Culture',
    arena: 'TATAME',
    battlecry: 'CALMA SOB PRESSÃO É VITÓRIA.',
    story:
      'Colaboração oficial com o Templo Jiu-Jitsu Culture, na Vila Formosa. Compressão que segura a musculatura no rola, blindagem de pele contra atrito de tatame e costura que aguenta pegada de faixa-preta puxando pelo ombro.',
    image: asset('/assets/images/post-templo-jiujitsu.jpg'),
    alt: asset('/assets/images/athlete-model-c2hjd2.jpg'),
    specs: [
      { label: 'COMPRESSÃO', value: 'FIGHT PRO' },
      { label: 'PROTEÇÃO', value: 'UV 50+' },
      { label: 'GRIP', value: 'SILICONE INTERNO' },
      { label: 'PARCERIA', value: 'TEMPLO BJJ' },
    ],
    status: 'LOTE ESGOTADO',
  },
  {
    slug: 'oversized-signature',
    index: '004',
    name: 'OVERSIZED SIGNATURE',
    line: 'Streetwear',
    arena: 'RUA',
    battlecry: 'A POSTURA NÃO SAI COM O TREINO.',
    story:
      'A mentalidade não termina quando você larga a barra. Ombro caído, gramatura pesada, gola canelada larga e monograma aplicado em escala grande. Presença bruta no asfalto, mesmo peso visual do treino.',
    image: asset('/assets/images/para-quem-e-a-njal.png'),
    alt: asset('/assets/images/post-athlete-blacktee.jpg'),
    specs: [
      { label: 'MODELAGEM', value: 'OVERSIZED' },
      { label: 'GRAMATURA', value: '230 G/M²' },
      { label: 'GOLA', value: 'CANELADA 3.2CM' },
      { label: 'ACABAMENTO', value: 'MILITAR' },
    ],
    status: 'DROP ATIVO',
  },
  {
    slug: 'forged-dept',
    index: '005',
    name: 'FORGED DEPT.',
    line: 'Training Department',
    arena: 'VALHALLA',
    battlecry: 'DISCIPLINA É O ÚNICO ATALHO.',
    story:
      'A regata cavada que virou assinatura do departamento de treino. Cava anatômica que libera o dorsal inteiro, laterais que não abrem demais e toque seco que não gruda no meio da série de agachamento.',
    image: asset('/assets/images/post-forged-dept.jpg'),
    alt: asset('/assets/images/diogo-regata-reel.jpg'),
    specs: [
      { label: 'CORTE', value: 'CAVA PROFUNDA' },
      { label: 'MALHA', value: 'POLIAMIDA SECA' },
      { label: 'GRAMATURA', value: '150 G/M²' },
      { label: 'USO', value: 'FERRO PESADO' },
    ],
    status: 'DROP ATIVO',
  },
  {
    slug: 'cristao-fit',
    index: '006',
    name: 'CRISTÃO FIT',
    line: 'Linha comemorativa',
    arena: 'RUA',
    battlecry: 'FÉ TAMBÉM SE TREINA.',
    story:
      'Linha comemorativa nascida de um pedido da própria comunidade. Mesma engenharia das peças de treino, tipografia aplicada com a mesma brutalidade e um recado que o público da NJAL carrega dentro e fora do box.',
    image: asset('/assets/images/post-cristaofit.jpg'),
    alt: asset('/assets/images/brand-reveal-c1uh5.jpg'),
    specs: [
      { label: 'EDIÇÃO', value: 'COMEMORATIVA' },
      { label: 'MALHA', value: 'ALGODÃO 30.1' },
      { label: 'ESTAMPA', value: 'SILK HD' },
      { label: 'LOTE', value: 'LIMITADO' },
    ],
    status: 'PRÉ-LANÇAMENTO',
  },
];

export const getDrop = (slug: string) => DROPS.find((d) => d.slug === slug);
