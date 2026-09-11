'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { ARENAS, DROPS, type Arena } from '@/data/drops';
import { BRAND } from '@/lib/brand';
import { DropCard } from '@/components/ui/DropCard';
import { RevealLines } from '@/components/motion/Reveal';
import { Magnetic } from '@/components/motion/Magnetic';

export function Arsenal() {
  const [arena, setArena] = useState<Arena | 'TODOS'>('TODOS');

  const visible = useMemo(
    () => (arena === 'TODOS' ? DROPS : DROPS.filter((d) => d.arena === arena)),
    [arena]
  );

  return (
    <section
      id="arsenal"
      className="relative border-t border-iron/60 bg-void py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8">
        <div className="mb-12 flex items-center gap-4">
          <span className="type-tactical text-[10px] text-blood">01 — ARSENAL</span>
          <span className="h-px flex-1 bg-iron" />
          <span className="type-tactical text-[10px] text-ash">
            {String(visible.length).padStart(2, '0')} PEÇAS
          </span>
        </div>

        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealLines
            as="h2"
            lines={['O QUE VOCÊ', 'VESTE PARA', 'A GUERRA.']}
            className="type-brutal text-bone lg:col-span-7"
            lineClassName="text-[12vw] leading-[0.84] sm:text-[8vw] lg:text-[5.4vw]"
          />

          <p className="max-w-sm text-sm leading-relaxed text-smoke lg:col-span-5 lg:justify-self-end">
            Cada linha existe porque um atleta reclamou de algo que não funcionava. Escolha a
            arena e veja o que foi construído para ela.
          </p>
        </div>

        {/* Filtros com indicador fluido */}
        <LayoutGroup id="arena">
          <div className="mb-12 flex flex-wrap gap-2 border-y border-iron/70 py-4">
            {ARENAS.map((item) => {
              const active = arena === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setArena(item.id)}
                  data-cursor="link"
                  className="relative px-4 py-2.5 sm:px-5"
                >
                  {active && (
                    <motion.span
                      layoutId="arena-pill"
                      className="absolute inset-0 bg-blood"
                      transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                    />
                  )}
                  <span
                    className={`type-tactical relative text-[10px] transition-colors duration-300 ${
                      active ? 'text-bone' : 'text-ash hover:text-smoke'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        {/* Grade assimétrica: a primeira peça ocupa o dobro de espaço. */}
        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((drop, i) => (
              <motion.div
                key={drop.slug}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={i === 0 && arena === 'TODOS' ? 'sm:col-span-2' : ''}
              >
                <DropCard drop={drop} eager={i < 2} wide={i === 0 && arena === 'TODOS'} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Aviso de escassez — o modelo real da marca. */}
        <div className="mt-16 flex flex-col gap-6 border border-iron/70 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <div className="type-tactical text-[9px] text-blood">ESTOQUE REAL</div>
            <p className="type-brutal mt-3 max-w-xl text-2xl text-bone sm:text-3xl">
              LOTE CURTO. QUANDO ACABA, ACABOU.
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-smoke">
              Não trabalhamos com arara infinita. Os lançamentos abrem no feed e nos stories, e o
              pedido é fechado no atendimento direto.
            </p>
          </div>

          <Magnetic strength={0.3}>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="type-tactical cut-badge inline-flex shrink-0 items-center gap-3 bg-bone px-7 py-4 text-[10px] text-void transition-colors duration-300 hover:bg-blood hover:text-bone"
            >
              SEGUIR {BRAND.handle}
              <span aria-hidden>↗</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
