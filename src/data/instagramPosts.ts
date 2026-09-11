import { asset } from '../config/brand';

export interface InstagramPost {
  id: string;
  url: string;
  type: 'carousel' | 'reel' | 'image';
  title: string;
  caption: string;
  likes: number;
  comments: number;
  image: string;
  tag: string;
  date: string;
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    url: 'https://www.instagram.com/njalbrasil/p/C2HjDVfOShR/',
    type: 'carousel',
    title: 'Para quem  a NJAL?',
    caption: 'Conheça nossa marca e para quem ela serve @njalbrasil | Roupas tecnológicas forjadas para atletas de Crossfit, musculação pesada e lifestyle guerreiro.',
    likes: 54,
    comments: 12,
    image: asset('/assets/images/para-quem-e-a-njal.png'),
    tag: '#FORGEDFORCHAMPIONS',
    date: '15 Jan 2024'
  },
  {
    id: 'post-2',
    url: 'https://www.instagram.com/njalbrasil/p/C2HjDVfOShR/?img_index=2',
    type: 'image',
    title: 'Linha Crossfit RX',
    caption: 'Bermudas, camisetas e acessórios de alta qualidade e melhor desempenho para você ser um RX. @NJALBRASIL',
    likes: 89,
    comments: 18,
    image: asset('/assets/images/linha-crossfit.png'),
    tag: '#CROSSFITRX',
    date: '15 Jan 2024'
  },
  {
    id: 'post-3',
    url: 'https://www.instagram.com/njalbrasil/p/C2HjDVfOShR/?img_index=3',
    type: 'image',
    title: 'Linha Academia & Casual',
    caption: 'Seja nos treinos até chegar em Valhalla ou no dia a dia, nossa linha est incrvel. Vista sua jornada.',
    likes: 72,
    comments: 9,
    image: asset('/assets/images/linha-academia-casual.png'),
    tag: '#VALHALLA',
    date: '15 Jan 2024'
  },
  {
    id: 'post-4',
    url: 'https://www.instagram.com/diogolivera_02/reel/Db5roYOxiwV/',
    type: 'reel',
    title: 'Warrior Dept no Treino',
    caption: 'Atleta @diogolivera_02 testando a regata cavada NJAL no treino de bceps e costas. Desempenho e estilo incomparvel.',
    likes: 124,
    comments: 23,
    image: asset('/assets/images/diogo-regata-reel.jpg'),
    tag: '#TRAININGDEPT',
    date: '11 Ago 2026'
  },
  {
    id: 'post-5',
    url: 'https://www.instagram.com/njalbrasil/p/C1uh5w1O7kH/',
    type: 'carousel',
    title: 'A Identidade Nórdica NJAL',
    caption: 'Arraste e conheça a nossa marca! E siga @njalbrasil para novidades. Se fala NIJAL ✌️ #njal #usenjal #marca #viking',
    likes: 68,
    comments: 14,
    image: asset('/assets/images/brand-reveal-c1uh5.jpg'),
    tag: '#USENJAL',
    date: '05 Jan 2024'
  },
  {
    id: 'post-6',
    url: 'https://www.instagram.com/njalbrasil/p/DcjFSJZOnni/',
    type: 'image',
    title: 'Ponto Físico: Templo Jiu-Jitsu',
    caption: 'Onde encontrar as roupas da NJAL? R. Curupá, 328 - Vila Formosa, SP. No Templo Jiu Jitsu Culture Anália Franco.',
    likes: 45,
    comments: 6,
    image: asset('/assets/images/gear-fold-c2hjd3.jpg'),
    tag: '#TEMPLOJIUJITSU',
    date: '27 Ago 2026'
  }
];

export const BRAND_STATS = [
  { value: '+2.000', label: 'Guerreiros Forjados', icon: 'Shield' },
  { value: '100%', label: 'Tecidos Tecnolgicos', icon: 'Zap' },
  { value: '4.9?', label: 'Avaliação Mdia dos Atletas', icon: 'Star' },
  { value: 'BR', label: 'Envio para Todo o Brasil', icon: 'Truck' },
];
