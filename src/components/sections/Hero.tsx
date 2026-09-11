'use client';

import dynamic from 'next/dynamic';
import { useCallback, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { BRAND, asset } from '@/lib/brand';
import { useHeavyMotion } from '@/hooks/useEnvironment';
import { Magnetic } from '@/components/motion/Magnetic';
import { Marquee } from '@/components/motion/Marquee';
import { MonogramField } from '@/components/ui/MonogramField';

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), { ssr: false });

/*
 * As artes da marca trazem tipografia embutida à esquerda do quadro. Em vez de
 * esticar a peça no fundo inteiro (o que empilharia dois textos), o retrato vive
 * numa moldura à direita e mostra só a região fotográfica — em resolução nativa.
 */
const PORTRAIT = asset('/assets/images/athlete-model-c2hjd2.jpg');
const PORTRAIT_FOCUS: [number, number] = [0.775, 0.42];
const PORTRAIT_ZOOM = 0.50;

export function Hero() {
  const heavy = useHeavyMotion();
  const [glDown, setGlDown] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Contexto WebGL perdido: a página segue com a foto tratada em CSS.
  const onContextLost = useCallback(() => setGlDown(true), []);
  const useCanvas = heavy && !glDown;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pb-24 pt-28 sm:pt-32"
    >
      {/* Fundo: estampa de monograma + brasa vermelha. */}
      <MonogramField alpha={0.02} tile={112} />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-[560px] w-[560px] rounded-full bg-blood/20 blur-[190px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-blood/10 blur-[170px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1680px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* Tipografia */}
        <motion.div style={{ y: copyY, opacity: fade }} className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            <span className="h-px w-10 bg-blood sm:w-16" />
            <span className="type-tactical text-[10px] text-bone">{BRAND.creed}</span>
            <span className="type-tactical text-[10px] text-ash">✌ {BRAND.say}</span>
          </motion.div>

          <h1 className="type-brutal text-bone">
            {['PARA', 'QUEM', 'É A NJAL'].map((line, i) => (
              <span key={line} className="line-mask">
                <motion.span
                  className="block whitespace-nowrap text-[14.5vw] leading-[0.84] sm:text-[13vw] lg:text-[8.4vw]"
                  initial={{ y: '112%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.2, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 2 ? (
                    <>
                      É A <span className="text-blood">NJAL</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 max-w-xl border-t border-iron/80 pt-7"
          >
            <p className="text-sm leading-relaxed text-smoke sm:text-base">
              <strong className="font-normal text-bone">{BRAND.armor}</strong> Forjadas para o box,
              o tatame, o ferro pesado e o asfalto — e entregues em lotes curtos, anunciados só no
              feed.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.32}>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="type-tactical cut-badge inline-flex items-center gap-3 bg-bone px-7 py-4 text-[10px] text-void transition-colors duration-300 hover:bg-blood hover:text-bone"
                >
                  ACOMPANHAR OS DROPS
                  <span aria-hidden>↗</span>
                </a>
              </Magnetic>

              <a
                href="#arsenal"
                data-cursor="link"
                className="type-tactical inline-flex items-center gap-3 border border-iron px-7 py-4 text-[10px] text-smoke transition-colors duration-300 hover:border-blood hover:text-bone"
              >
                VER O ARSENAL
                <span aria-hidden>↓</span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Retrato emoldurado */}
        <motion.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden bg-graphite lg:max-w-none">
            {useCanvas ? (
              <HeroCanvas
                src={PORTRAIT}
                focus={PORTRAIT_FOCUS}
                zoom={PORTRAIT_ZOOM}
                onContextLost={onContextLost}
              />
            ) : (
              <img
                src={PORTRAIT}
                alt="Atleta vestindo a linha Crossfit da NJAL"
                fetchPriority="high"
                className="h-full w-full origin-right scale-[1.98] object-cover object-[100%_42%] brightness-[1.6] contrast-[1.05]"
              />
            )}

            {/* Cantos de mira: o enquadramento tático da marca. */}
            <span className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-blood" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-blood" />
            <span className="pointer-events-none absolute inset-0 edge-blood" />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="type-tactical text-[9px] text-ash">LINHA CROSSFIT · RX</span>
            <span className="type-tactical text-[9px] text-blood">{BRAND.handle}</span>
          </div>
        </motion.div>
      </div>

      {/* Letreiro de rodapé */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-y border-iron/60 bg-void/70 backdrop-blur-sm">
        <Marquee
          items={[BRAND.creed, BRAND.saga, 'CROSSFIT RX', 'JIU-JITSU FIGHTWEAR', BRAND.say]}
          className="py-2.5"
          itemClassName="type-tactical text-[10px] text-smoke"
          separator="//"
          baseDuration={38}
        />
      </div>
    </section>
  );
}
