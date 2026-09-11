'use client';

import clsx from 'clsx';

/**
 * Campo de monogramas repetidos — a estampa que a NJAL usa nas próprias peças
 * e embalagens, rebaixada a textura de fundo.
 *
 * É desenhado em SVG (e não com o PNG da marca) para que o contraste seja
 * exato: a opacidade fica no `fill`, não numa camada por cima, evitando que a
 * textura pese demais dependendo do gamma da tela.
 */
export function MonogramField({
  className,
  tile = 104,
  alpha = 0.035,
  tint = '242, 240, 236',
}: {
  className?: string;
  /** Lado do ladrilho em px. */
  tile?: number;
  /** Opacidade do traço (0..1). */
  alpha?: number;
  /** Cor do traço em "r, g, b". */
  tint?: string;
}) {
  const fill = `rgba(${tint}, ${alpha})`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="72" viewBox="0 0 60 72">
      <g fill="${fill}">
        <path d="M8 10h11v52H8z"/>
        <path d="M41 10h11v52H41z"/>
        <path d="M19 10h9l13 24v11z"/>
        <path d="M19 47v-11l13 24h-9z"/>
      </g>
    </svg>`;

  return (
    <div
      aria-hidden
      className={clsx('pointer-events-none absolute inset-0', className)}
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        backgroundSize: `${tile}px auto`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
}
