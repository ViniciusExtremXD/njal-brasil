# NJAL BRASIL — Vitrine Editorial

> **FORGED FOR CHAMPIONS** · ✌️ Se fala **NIJAL**
> Não são apenas roupas. São armaduras de treino.

Vitrine oficial da marca [@njalbrasil](https://www.instagram.com/njalbrasil/) — Crossfit RX,
Saga Valhalla, Jiu-Jitsu Fightwear e Streetwear Oversized.

**Isto não é uma loja virtual.** Não há carrinho, preço nem checkout: os drops são anunciados
no Instagram oficial e a conversão acontece no atendimento concierge do WhatsApp.

🔗 **No ar:** https://viniciusextremxd.github.io/njal-brasil/

## Stack

React 18 · TypeScript · Vite 6 · Tailwind CSS 3 · framer-motion 12 · Canvas 2D · lucide-react

## Rodando local

```bash
npm install
npm run dev     # http://localhost:3000
```

## Publicando

```bash
npm run deploy
```

Builda com `VITE_BASE=/njal-brasil/` e faz push da pasta `dist/` para a branch `gh-pages`.
O GitHub Pages serve essa branch em alguns instantes.

## Estrutura

| Caminho | O que é |
| --- | --- |
| `src/config/brand.ts` | Fonte única: links oficiais, escrituras da marca e `whatsappLink()` / `asset()` |
| `src/components/` | Seções da vitrine (Hero, Manifesto, Vitrine de Drops, Lookbook, Tech, B2B…) |
| `src/components/ui/` | Peças de motion design: `GlowCard`, `MagneticButton`, `ParticleCanvas`, `FloatingBadge` |
| `src/data/instagramPosts.ts` | Mural do feed @njalbrasil |
| `public/assets/` | Logotipos HD autênticos e fotos reais dos atletas |

## Trocando links ou textos da marca

Tudo passa por `src/config/brand.ts` — Instagram, WhatsApp, slogan, ponto físico.
Alterar lá reflete no site inteiro.
