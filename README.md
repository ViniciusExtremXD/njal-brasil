# NJAL BRASIL — vitrine

> **FORGED FOR CHAMPIONS** · ✌ SE FALA NIJAL
> Não são apenas roupas. São armaduras de treino.

Site oficial da [@njalbrasil](https://www.instagram.com/njalbrasil/). Não é loja:
os drops são anunciados no feed e o pedido fecha no WhatsApp.

🔗 **No ar:** https://viniciusextremxd.github.io/njal-brasil/

## Stack

Next.js 16 (App Router, export estático) · React 19 · TypeScript · Tailwind CSS 3 ·
Framer Motion · GSAP + ScrollTrigger · Lenis · Three.js via React Three Fiber

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
```

`?motion=full` na URL ignora o `prefers-reduced-motion` do sistema — útil para
revisar a experiência completa em máquina com a flag ligada.

## Publicando

```bash
npm run deploy
```

Builda com `NEXT_PUBLIC_BASE_PATH=/njal-brasil` e empurra `out/` para a branch `gh-pages`.

## Mapa

| Caminho | O que é |
| --- | --- |
| `src/lib/brand.ts` | Links oficiais, escrituras da marca, `concierge()` e `asset()` |
| `src/data/drops.ts` | Catálogo editorial dos drops (alimenta a vitrine e as rotas `/drop/[slug]`) |
| `src/components/motion/` | Primitivos: scroll suave, cursor, revelações, magnetismo, glitch, letreiros |
| `src/components/three/` | Shader do retrato do Hero (distorção + aberração cromática) |
| `src/components/sections/` | Hero, Arsenal, Manifesto, Legado, Comunidade, Forja |
| `src/hooks/useEnvironment.ts` | Decide onde os efeitos pesados podem rodar |

## Camadas de degradação

O site tem três níveis, escolhidos em runtime:

1. **Completo** — desktop com ponteiro fino: WebGL no retrato, scroll suave via Lenis,
   pinning horizontal do Legado, cursor próprio.
2. **Leve** — mobile/tablet: mesmo conteúdo, seções empilhadas, sem WebGL nem pinning.
3. **Reduzido** — `prefers-reduced-motion`: tudo entra no estado final, sem animação.

Se o contexto WebGL cair (GPU reset, aba suspensa), o Hero volta sozinho para a
foto tratada em CSS.
