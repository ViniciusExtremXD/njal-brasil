'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { ARENAS, DROPS, type Arena } from '@/data/drops';
import { BRAND } from '@/lib/brand';
import { DropCard } from '@/components/ui/DropCard';
import { Reveal, RevealLines, RevealRule, RevealWords } from '@/components/motion/Reveal';
import { Magnetic } from '@/components/motion/Magnetic';

export function Arsenal() {
  const [arena, setArena] = useState<Arena | 'TODOS'>('TODOS');

  const visible = useMemo(
    () => (arena === 'TODOS' ? DROPS : DROPS.filter((d) => d.arena === arena)),
    [arena]
  );

  return (
    <section id="arsenal" className="relative border-t border-iron/60 bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8">
        {/* Cabeçalho da seção */}
        <div className="mb-12 flex items-center gap-4">
          <Reveal kind="right" as="span" className="type-tactical text-[10px] text-blood">
            01 — ARSENAL
          </Reveal>
          <RevealRule delay={120} className="flex-1" />
          <Reveal kind="left" delay={200} as="span" className="type-tactical text-[10px] text-ash">
            {String(visible.length).padStart(2, '0')} PEÇAS
          </Reveal>
        </div>

        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealLines
            as="h2"
            lines={['O QUE VOCÊ', 'VESTE PARA', 'A GUERRA.']}
            className="type-brutal text-bone lg:col-span-7"
            lineClassName="text-[12vw] leading-[0.84] sm:text-[8vw] lg:text-[5.4vw]"
          />

          <RevealWords
            as="p"
            text="Cada linha existe porque um atleta reclamou de algo que não funcionava. Escolha a arena e veja o que foi construído para ela."
            className="max-w-sm text-sm leading-relaxed text-smoke lg:col-span-5 lg:justify-self-end"
            delay={260}
            step={18}
          />
        </div>

        {/* Filtros: cada pílula entra em sequência */}
        <LayoutGroup id="arena">
          <div className="mb-12 flex flex-wrap items-center gap-2 border-y border-iron/70 py-4">
            {ARENAS.map((item, i) => {
              const active = arena === item.id;
              return (
                <Reveal key={item.id} kind="up" delay={i * 70} as="span">
                  <button
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
                </Reveal>
              );
            })}
          </div>
        </LayoutGroup>

        <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((drop, i) => (
              <motion.div
                key={drop.slug}
                layout
                exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
                className={i === 0 && arena === 'TODOS' ? 'sm:col-span-2' : ''}
              >
                <DropCard
                  drop={drop}
                  eager={i < 2}
                  wide={i === 0 && arena === 'TODOS'}
                  delay={i * 90}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Aviso de escassez */}
        <div className="mt-16 flex flex-col gap-6 border border-iron/70 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <Reveal kind="right" as="div" className="type-tactical text-[9px] text-blood">
              ESTOQUE REAL
            </Reveal>
            <RevealLines
              as="p"
              lines={['LOTE CURTO.', 'QUANDO ACABA, ACABOU.']}
              className="type-brutal mt-3 max-w-xl text-2xl text-bone sm:text-3xl"
              delay={90}
            />
            <Reveal kind="up" delay={280}>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-smoke">
                Não trabalhamos com arara infinita. Os lançamentos abrem no feed e nos stories, e o
                pedido é fechado no atendimento direto.
              </p>
            </Reveal>
          </div>

          <Reveal kind="left" delay={340} className="shrink-0">
            <Magnetic strength={0.3}>
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="type-tactical cut-badge inline-flex items-center gap-3 bg-bone px-7 py-4 text-[10px] text-void transition-colors duration-300 hover:bg-blood hover:text-bone"
              >
                SEGUIR {BRAND.handle}
                <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
