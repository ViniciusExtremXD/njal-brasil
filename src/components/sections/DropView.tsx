'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import type { Drop } from '@/data/drops';
import { BRAND, concierge } from '@/lib/brand';
import { Reveal, RevealLines, RevealMedia, RevealRule, RevealWords } from '@/components/motion/Reveal';
import { Magnetic } from '@/components/motion/Magnetic';
import { Scramble } from '@/components/motion/Scramble';
import { DropCard } from '@/components/ui/DropCard';
import { Footer } from '@/components/layout/Footer';

export function DropView({ drop, others }: { drop: Drop; others: Drop[] }) {
  const [shot, setShot] = useState(0);
  const gallery = [drop.image, drop.alt];

  return (
    <main className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8">
        <Reveal kind="right" as="div">
          <Link
            href="/#arsenal"
            data-cursor="link"
            className="type-tactical inline-flex items-center gap-2 text-[10px] text-ash transition-colors hover:text-blood"
          >
            <span aria-hidden>←</span> VOLTAR AO ARSENAL
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Galeria */}
          <div className="lg:col-span-7">
            <RevealMedia className="aspect-[4/5] w-full bg-graphite sm:aspect-[5/4]">
              <motion.img
                key={shot}
                src={gallery[shot]}
                alt={drop.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="h-full w-full object-cover object-center"
              />
            </RevealMedia>

            <div className="mt-4 flex gap-3">
              {gallery.map((src, i) => (
                <Reveal key={src} kind="up" delay={500 + i * 90}>
                  <button
                    onClick={() => setShot(i)}
                    data-cursor="media"
                    className={`relative h-20 w-20 overflow-hidden border transition-colors duration-300 sm:h-24 sm:w-24 ${
                      shot === i ? 'border-blood' : 'border-iron hover:border-smoke'
                    }`}
                    aria-label={`Ver imagem ${i + 1}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover object-center" />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Ficha */}
          <div className="lg:col-span-5">
            <div className="type-tactical flex items-center gap-3 text-[9px]">
              <Reveal kind="right" as="span" className="text-blood">
                {drop.index}
              </Reveal>
              <RevealRule delay={100} className="w-8 flex-none" />
              <Reveal kind="left" delay={160} as="span" className="text-ash">
                {drop.line}
              </Reveal>
            </div>

            <RevealLines
              as="h1"
              lines={drop.name.split(' ')}
              className="type-brutal mt-5 text-bone"
              lineClassName="text-[13vw] leading-[0.84] sm:text-[8vw] lg:text-[4.4vw]"
              delay={140}
            />

            <Reveal kind="up" delay={380} as="div" className="type-tactical mt-5 text-[10px] text-blood">
              <Scramble text={drop.battlecry} />
            </Reveal>

            <RevealWords
              as="p"
              text={drop.story}
              className="mt-7 block text-sm leading-relaxed text-smoke sm:text-base"
              delay={440}
              step={14}
            />

            <dl className="mt-9 grid gap-px overflow-hidden border border-iron/70 bg-iron/70 sm:grid-cols-2">
              {drop.specs.map((spec, i) => (
                <Reveal key={spec.label} kind="up" delay={i * 90} className="bg-void p-5">
                  <dt className="type-tactical text-[9px] text-ash">{spec.label}</dt>
                  <dd className="type-brutal mt-2 text-base text-bone">{spec.value}</dd>
                </Reveal>
              ))}
            </dl>

            <div className="mt-9 flex flex-col gap-3">
              <Reveal kind="up" delay={120}>
                <Magnetic strength={0.25}>
                  <a
                    href={concierge(
                      `Olá NJAL! Quero a ${drop.name} (${drop.line}). Pode me passar tamanhos e disponibilidade?`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="type-tactical cut-badge flex items-center justify-center gap-3 bg-blood px-8 py-5 text-[10px] text-bone transition-colors duration-300 hover:bg-ember"
                  >
                    CONSULTAR NO WHATSAPP
                    <span aria-hidden>↗</span>
                  </a>
                </Magnetic>
              </Reveal>

              <Reveal kind="up" delay={200}>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="type-tactical flex items-center justify-center gap-3 border border-iron px-8 py-5 text-[10px] text-smoke transition-colors duration-300 hover:border-blood hover:text-bone"
                >
                  VER O DROP NO INSTAGRAM
                </a>
              </Reveal>
            </div>

            <Reveal kind="up" delay={280} as="p" className="type-tactical mt-6 text-[9px] leading-relaxed text-ash">
              lote curto · pedido fechado no atendimento direto
            </Reveal>
          </div>
        </div>

        {/* Resto do arsenal */}
        <section className="mt-24 border-t border-iron/70 pt-14 sm:mt-32">
          <div className="mb-10 flex items-center gap-4">
            <Reveal kind="right" as="span" className="type-tactical text-[10px] text-blood">
              RESTO DO ARSENAL
            </Reveal>
            <RevealRule delay={120} className="flex-1" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, i) => (
              <DropCard key={other.slug} drop={other} delay={i * 100} />
            ))}
          </div>
        </section>
      </div>

      <div className="mt-24 sm:mt-32">
        <Footer />
      </div>
    </main>
  );
}
