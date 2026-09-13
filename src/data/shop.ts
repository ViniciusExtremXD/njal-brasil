/**
 * Catálogo da loja oficial (njal.com.br).
 * Nome, preço, imagem e link de cada peça foram extraídos do site oficial em 2026-09-12.
 * O "Comprar" de cada produto leva para o link real do produto em njal.com.br — é lá que o
 * carrinho, o frete, o parcelamento e o pagamento acontecem de fato. Este site não processa
 * pagamento nem mantém estoque próprio: é a vitrine que leva até a compra real.
 */
import type { ImageMetadata } from 'astro';

import camisetaFemininaBranca from '../assets/shop/camiseta-feminina-branca.png';
import camisetaFemininaRosa from '../assets/shop/camiseta-feminina-rosa.png';
import camisetaOversizedFemininaTreinoAbencoado from '../assets/shop/camiseta-oversized-feminina-treino-abencoado.png';
import moletonFemininoPreto from '../assets/shop/moleton-feminino-preto.png';
import camisetaOversizedFemininaBranca from '../assets/shop/camiseta-oversized-feminina-branca.png';
import camisetaFemininaOversized from '../assets/shop/camiseta-feminina-oversized.png';
import regataFeminina from '../assets/shop/regata-feminina.png';
import cropedOversizedVermelho from '../assets/shop/croped-oversized-vermelho.png';
import shortsBlackTeam from '../assets/shop/shorts-black-team.png';
import topBlackTeam from '../assets/shop/top-black-team.png';
import camisetaOversizedMasculinaTreinoAbencoado from '../assets/shop/camiseta-oversized-masculina-treino-abencoado.png';
import moletonMasculinoPreto from '../assets/shop/moleton-masculino-preto.png';
import camisetaOversizedMasculinaBranca from '../assets/shop/camiseta-oversized-masculina-branca.png';
import camisetaMasculinaRosa from '../assets/shop/camiseta-masculina-rosa.png';
import camisetaMasculinaBranca from '../assets/shop/camiseta-masculina-branca.png';
import rashguardMangaCurta from '../assets/shop/rashguard-manga-curta.png';
import rashguardMangaLonga from '../assets/shop/rashguard-manga-longa.png';
import camisetaDryfitBlack from '../assets/shop/camiseta-dryfit-black.png';
import camisetaOversizedUnissex from '../assets/shop/camiseta-oversized-unissex.png';
import garrafinhaPerola from '../assets/shop/garrafinha-perola.png';
import garrafinhaRed from '../assets/shop/garrafinha-red.jpeg';

export type ShopCategory = 'feminino' | 'masculino' | 'sale';

export interface Product {
  slug: string;
  name: string;
  price: number;
  category: ShopCategory;
  /** Link direto do produto em njal.com.br — onde a compra de fato acontece. */
  href: string;
  image: ImageMetadata;
  /**
   * Agrupa variantes de cor da mesma peça num só card (ex.: as duas garrafinhas).
   * Produtos com o mesmo `line` viram um card com seletor de cor.
   */
  line?: string;
  lineName?: string;
  color?: string;
  swatch?: string;
}

/** Uma peça, com uma ou mais variantes de cor (ver `line` em Product). */
export interface Line {
  slug: string;
  name: string;
  category: ShopCategory;
  variants: { color?: string; swatch?: string; price: number; href: string; image: ImageMetadata }[];
}

function buildLines(products: Product[]): Line[] {
  const bySlug = new Map<string, Line>();
  for (const p of products) {
    const key = p.line ?? p.slug;
    const variant = { color: p.color, swatch: p.swatch, price: p.price, href: p.href, image: p.image };
    const existing = bySlug.get(key);
    if (existing) {
      existing.variants.push(variant);
    } else {
      bySlug.set(key, { slug: key, name: p.lineName ?? p.name, category: p.category, variants: [variant] });
    }
  }
  return Array.from(bySlug.values());
}

export const money = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const CATEGORIES: { id: ShopCategory | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'feminino', label: 'Feminino' },
  { id: 'masculino', label: 'Masculino' },
  { id: 'sale', label: 'Sale' },
];

const SHOP = 'https://www.njal.com.br/';

export const PRODUCTS: Product[] = [
  // Feminino
  {
    slug: 'camiseta-feminina-branca',
    name: 'Camiseta Feminina Irmã Marluce — Branca',
    price: 100,
    category: 'feminino',
    href: SHOP + 'camiseta-feminina-irma-marluce-dale-bicuda-branca',
    image: camisetaFemininaBranca,
    line: 'camiseta-feminina-irma-marluce',
    lineName: 'Camiseta Feminina Irmã Marluce',
    color: 'Branca',
    swatch: '#f2f0ec',
  },
  {
    slug: 'camiseta-feminina-rosa',
    name: 'Camiseta Feminina Irmã Marluce — Rosa',
    price: 100,
    category: 'feminino',
    href: SHOP + 'camiseta-feminina-irma-marluce-dale-bicuda-rosa',
    image: camisetaFemininaRosa,
    line: 'camiseta-feminina-irma-marluce',
    lineName: 'Camiseta Feminina Irmã Marluce',
    color: 'Rosa',
    swatch: '#e39ab0',
  },
  {
    slug: 'oversized-feminina-treino-abencoado',
    name: 'Oversized Feminina — Treino Abençoado',
    price: 120,
    category: 'feminino',
    href: SHOP + 'camiseta-oversized-feminina-treino-abencoado',
    image: camisetaOversizedFemininaTreinoAbencoado,
  },
  {
    slug: 'moletom-feminino-preto',
    name: 'Moletom Feminino Dale Bicuda — Preto',
    price: 157,
    category: 'feminino',
    href: SHOP + 'moleton-feminino-dale-bicuda-preto',
    image: moletonFemininoPreto,
  },
  {
    slug: 'oversized-feminina-branca',
    name: 'Oversized Feminina Irmã Marluce — Branca',
    price: 120,
    category: 'feminino',
    href: SHOP + 'camiseta-oversized-feminina-branca-irma-marluce-dale-bicuda',
    image: camisetaOversizedFemininaBranca,
    line: 'oversized-feminina-irma-marluce',
    lineName: 'Oversized Feminina Irmã Marluce',
    color: 'Branca',
    swatch: '#f2f0ec',
  },
  {
    slug: 'oversized-feminina-preta',
    name: 'Oversized Feminina Irmã Marluce — Preta',
    price: 120,
    category: 'feminino',
    href: SHOP + 'camiseta-feminina-oversized-irma-marluce-dale-bicuda',
    image: camisetaFemininaOversized,
    line: 'oversized-feminina-irma-marluce',
    lineName: 'Oversized Feminina Irmã Marluce',
    color: 'Preta',
    swatch: '#050506',
  },
  {
    slug: 'regata-feminina',
    name: 'Regata Irmã Marluce',
    price: 90,
    category: 'feminino',
    href: SHOP + 'regata-feminina-irma-marluce-dale-bicuda',
    image: regataFeminina,
  },
  {
    slug: 'croped-oversized-vermelho',
    name: 'Croped Oversized — Vermelho',
    price: 85,
    category: 'feminino',
    href: SHOP + 'croped-oversized-vermelho',
    image: cropedOversizedVermelho,
  },
  {
    slug: 'shorts-black-team',
    name: 'Shorts Black NJAL Team',
    price: 107,
    category: 'feminino',
    href: SHOP + 'shorts-black-njal-team',
    image: shortsBlackTeam,
  },
  {
    slug: 'top-black-team',
    name: 'Top Black NJAL Team',
    price: 100,
    category: 'feminino',
    href: SHOP + 'top-black-njal-team',
    image: topBlackTeam,
  },
  // Masculino
  {
    slug: 'oversized-masculina-treino-abencoado',
    name: 'Oversized Masculina — Treino Abençoado',
    price: 120,
    category: 'masculino',
    href: SHOP + 'camiseta-oversized-masculina-treino-abencoado',
    image: camisetaOversizedMasculinaTreinoAbencoado,
  },
  {
    slug: 'moletom-masculino-preto',
    name: 'Moletom Masculino Dale Bicuda — Preto',
    price: 157,
    category: 'masculino',
    href: SHOP + 'moleton-masculino-dale-bicuda-preto',
    image: moletonMasculinoPreto,
  },
  {
    slug: 'oversized-masculina-branca',
    name: 'Oversized Masculina Irmã Marluce — Branca',
    price: 120,
    category: 'masculino',
    href: SHOP + 'camiseta-oversized-masculina-branca-irma-marluce-dale-bicuda',
    image: camisetaOversizedMasculinaBranca,
    line: 'oversized-masculina-irma-marluce',
    lineName: 'Oversized Masculina Irmã Marluce',
    color: 'Branca',
    swatch: '#f2f0ec',
  },
  {
    slug: 'camiseta-masculina-rosa',
    name: 'Camiseta Masculina Irmã Marluce — Rosa',
    price: 100,
    category: 'masculino',
    href: SHOP + 'camiseta-masculina-irma-marluce-dale-bicuda-rosa',
    image: camisetaMasculinaRosa,
    line: 'camiseta-masculina-irma-marluce',
    lineName: 'Camiseta Masculina Irmã Marluce',
    color: 'Rosa',
    swatch: '#e39ab0',
  },
  {
    slug: 'camiseta-masculina-branca',
    name: 'Camiseta Masculina Irmã Marluce — Branca',
    price: 100,
    category: 'masculino',
    href: SHOP + 'camiseta-marculina-irma-marluce-dale-bicuda',
    image: camisetaMasculinaBranca,
    line: 'camiseta-masculina-irma-marluce',
    lineName: 'Camiseta Masculina Irmã Marluce',
    color: 'Branca',
    swatch: '#f2f0ec',
  },
  {
    slug: 'rashguard-manga-curta',
    name: 'RashGuard Manga Curta',
    price: 95,
    category: 'masculino',
    href: SHOP + 'rash-guard-njal-treino-manga-curta',
    image: rashguardMangaCurta,
  },
  {
    slug: 'rashguard-manga-longa',
    name: 'RashGuard Manga Longa',
    price: 120,
    category: 'masculino',
    href: SHOP + 'blusa-njal-treino-manga-longa',
    image: rashguardMangaLonga,
  },
  {
    slug: 'camiseta-dryfit-black',
    name: 'Dryfit NJAL — Black',
    price: 85,
    category: 'masculino',
    href: SHOP + 'camiseta-dryfit-njal-black',
    image: camisetaDryfitBlack,
  },
  {
    slug: 'oversized-masculina-preta',
    name: 'Oversized Masculina Irmã Marluce — Preta',
    price: 120,
    category: 'masculino',
    href: SHOP + 'camiseta-oversized-irma-marluce-dale-bicuda',
    image: camisetaOversizedUnissex,
    line: 'oversized-masculina-irma-marluce',
    lineName: 'Oversized Masculina Irmã Marluce',
    color: 'Preta',
    swatch: '#050506',
  },
  // Sale
  {
    slug: 'garrafinha-perola',
    name: 'Garrafinha NJAL — Pérola',
    price: 20,
    category: 'sale',
    href: SHOP + '86ykpstqc-garrafinha-njal-black',
    image: garrafinhaPerola,
    line: 'garrafinha-njal',
    lineName: 'Garrafinha NJAL',
    color: 'Pérola',
    swatch: '#e7ded0',
  },
  {
    slug: 'garrafinha-red',
    name: 'Garrafinha NJAL — Vermelha',
    price: 20,
    category: 'sale',
    href: SHOP + 'garrafinha-njal-red',
    image: garrafinhaRed,
    line: 'garrafinha-njal',
    lineName: 'Garrafinha NJAL',
    color: 'Vermelha',
    swatch: '#e8123f',
  },
];

/** Seleção curada para a vitrine da home: um recorte das duas linhas + sale. */
export const FEATURED_SLUGS = [
  'oversized-feminina-treino-abencoado',
  'moletom-masculino-preto',
  'oversized-masculina-branca',
  'regata-feminina',
  'rashguard-manga-longa',
  'shorts-black-team',
  'top-black-team',
  'croped-oversized-vermelho',
];

export const FEATURED: Product[] = FEATURED_SLUGS.map(
  (slug) => PRODUCTS.find((p) => p.slug === slug)!,
);

/** Catálogo completo, com variantes de cor agrupadas num card por peça. */
export const LINES: Line[] = buildLines(PRODUCTS);

/** Vitrine da home, com variantes de cor agrupadas. */
export const FEATURED_LINES: Line[] = buildLines(FEATURED);
