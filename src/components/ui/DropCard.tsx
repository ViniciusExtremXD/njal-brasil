'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import type { Drop } from '@/data/drops';
import { useFinePointer } from '@/hooks/useEnvironment';

const MotionLink = motion.create(Link);

/**
 * Card do arsenal: inclina em 3D seguindo o ponteiro e troca a foto por uma
 * segunda perspectiva no hover.
 */
export function DropCard({
  drop,
  eager = false,
  wide = false,
}: {
  drop: Drop;
  eager?: boolean;
  /** Card em destaque ocupa duas colunas — proporção deitada evita um bloco gigante. */
  wide?: boolean;
}) {
  const fine = useFinePointer();
  const ref = useRef<HTMLAnchorElement>(null);
  const [hover, setHover] = useState(false);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], ['7deg', '-7deg']), {
    stiffness: 180,
    damping: 20,
  });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], ['-9deg', '9deg']), {
    stiffness: 180,
    damping: 20,
  });

  const onMove = (e: React.PointerEvent) => {
    if (!fine) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
    setHover(false);
  };

  return (
    <MotionLink
      ref={ref as never}
      href={`/drop/${drop.slug}`}
      data-cursor="media"
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      className="group relative block w-full will-change-transform"
      aria-label={`${drop.name} — ${drop.line}`}
    >
      <div
        className={`relative w-full overflow-hidden bg-graphite ${
          wide ? 'aspect-[16/11]' : 'aspect-[4/5]'
        }`}
      >
        <img
          src={drop.image}
          alt={drop.name}
          loading={eager ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-[900ms] ease-brutal"
          style={{ opacity: hover ? 0 : 1, transform: hover ? 'scale(1.06)' : 'scale(1)' }}
        />
        <img
          src={drop.alt}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-[900ms] ease-brutal"
          style={{ opacity: hover ? 1 : 0, transform: hover ? 'scale(1)' : 'scale(1.08)' }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/10 to-transparent" />

        {/* Faixa de status */}
        <div className="absolute left-0 top-5 flex items-center">
          <span
            className={`type-tactical cut-badge px-3 py-1.5 text-[9px] ${
              drop.status === 'LOTE ESGOTADO'
                ? 'bg-iron text-smoke'
                : drop.status === 'PRÉ-LANÇAMENTO'
                  ? 'bg-bone text-void'
                  : 'bg-blood text-bone'
            }`}
          >
            {drop.status}
          </span>
        </div>

        <span className="type-tactical absolute right-5 top-5 text-[9px] text-bone/70">
          {drop.index}
        </span>

        {/* Grito de guerra revelado no hover */}
        <div className="absolute inset-x-5 bottom-5">
          <div className="type-tactical mb-2 text-[9px] text-blood">{drop.line}</div>
          <h3 className="type-brutal text-2xl text-bone sm:text-3xl">{drop.name}</h3>
          <div
            className="grid transition-all duration-500 ease-brutal"
            style={{ gridTemplateRows: hover ? '1fr' : '0fr', opacity: hover ? 1 : 0 }}
          >
            <p className="overflow-hidden text-xs leading-relaxed text-smoke">
              <span className="block pt-2">{drop.battlecry}</span>
            </p>
          </div>
        </div>

        {/* Borda que acende */}
        <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-blood/70" />
      </div>
    </MotionLink>
  );
}
