# NJAL BRASIL — site institucional

Vitrine editorial da NJAL BRASIL (@njalbrasil): vestuário de treino de alta intensidade, São Paulo.
Não é e-commerce. Os drops são anunciados no Instagram e a venda fecha no WhatsApp.

## Stack

- [Astro](https://astro.build) 7, saída 100% estática. Zero framework no cliente.
- CSS puro com tokens de marca (`src/styles/global.css`). Sem Tailwind, sem GSAP, sem WebGL.
- Um único script (~1 KB): revelações por scroll com IntersectionObserver e o estado da navegação.
  Sem JS, tudo continua visível e funcional, inclusive o menu mobile (`<details>`).
- Fontes self-hosted no build pela Fonts API do Astro: **Tektur** (display quadrada) e **Comfortaa** (corpo).
- Imagens otimizadas em AVIF/WebP com `astro:assets`, sempre em larguras iguais ou menores que o nativo.

## Rodar

```bash
npm install
npm run dev
```

Build de produção em `dist/`:

```bash
npm run build
```

## Deploy no GitHub Pages

O workflow em `.github/workflows/deploy.yml` faz build e publica a cada push na `main`.
Como o GitHub Pages serve o site em subdiretório, o workflow exporta `BASE_PATH=/<nome-do-repo>`;
o Astro prefixa todos os caminhos automaticamente (`astro.config.mjs`).
Em **Settings → Pages**, escolha *Source: GitHub Actions*.

Para simular o build de produção localmente:

```bash
BASE_PATH=/njal-brasil npm run build
```

## Regras das imagens (leia antes de trocar qualquer arte)

As imagens em `src/assets/images` são artes de Instagram já finalizadas, com tipografia embutida e fotografadas em
low-key extremo. Por isso o componente `Plate.astro` exibe **cada arte inteira**, na proporção nativa, sem crop,
sem texto sobreposto e nunca acima do tamanho nativo em CSS px. Para substituir uma arte, troque o arquivo e o
`import` em `src/data/site.ts`; o layout se adapta à proporção. Exports de 1080 px ou mais melhoram a nitidez em
telas Retina (os posts atuais de 480–640 px são o limite).

Os logos (`Wordmark.astro`, `Monogram.astro`) foram traçados a partir dos PNGs oficiais e são vetoriais puros.

## Conteúdo

Tudo que é texto, link e ordem de seção mora em `src/data/site.ts`. Os textos de manifesto e da seção de tecido
estão em voz de marca e podem ser ajustados ali sem tocar nos componentes.

## Canais

- Instagram: https://www.instagram.com/njalbrasil/
- WhatsApp: https://wa.me/qr/SCWJ6A6MNLGHN1 (short link de QR: o WhatsApp descarta `?text=`, então nenhum fluxo
  depende de mensagem pré-preenchida)
