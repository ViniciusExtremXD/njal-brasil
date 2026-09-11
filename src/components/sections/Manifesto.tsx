'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { BRAND, asset } from '@/lib/brand';
import { useHeavyMotion } from '@/hooks/useEnvironment';
import { Reveal, RevealLines, RevealRule, RevealMedia } from '@/components/motion/Reveal';

const CREED = ['NÃO VENDEMOS', 'ROUPA BONITA.', 'ENTREGAMOS', 'ARMADURA.'];

const WORDS =
  'O nome vem das sagas nórdicas, onde o guerreiro não recuava porque a dor chegou primeiro. A NJAL nasceu no chão do box, entre anilha, cal e suor, para vestir quem entende que treino não é hobby: é a forma mais honesta de construir caráter. Cada peça sai da nossa própria confecção com a mesma obsessão que você coloca na última repetição.';

const FACTS = [
  { k: 'ORIGEM', v: 'SÃO PAULO · BRASIL' },
  { k: 'PRODUÇÃO', v: 'CONFECÇÃO PRÓPRIA' },
  { k: 'LOTES', v: 'CURTOS E NUMERADOS' },
];

export function Manifesto() {
  const section = useRef<HTMLElement>(null);
  const heavy = useHeavyMotion();

  useGSAP(
    () => {
      const root = section.current;
      if (!root || !heavy) return;

      // As palavras acendem conforme a leitura avança. Só apagamos o parágrafo
      // quando o scrub vai mesmo rodar — senão ficaria ilegível esperando.
      gsap.fromTo(
        root.querySelectorAll<HTMLElement>('[data-word]'),
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.045,
          ease: 'none',
          scrollTrigger: {
            trigger: root.querySelector('[data-paragraph]'),
            start: 'top 82%',
            end: 'bottom 62%',
            scrub: 0.6,
          },
        }
      );

      // O credo estica a largura variável da fonte conforme entra.
      root.querySelectorAll<HTMLElement>('[data-creed]').forEach((line, i) => {
        gsap.fromTo(
          line,
          { fontVariationSettings: "'wdth' 68", x: i % 2 ? 70 : -70, opacity: 0.2 },
          {
            fontVariationSettings: "'wdth' 125",
            x: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: line, start: 'top 94%', end: 'top 44%', scrub: 0.8 },
          }
        );
      });

      // Parallax longo do retrato e do monograma de fundo.
      gsap.to(root.querySelector('[data-portrait]'), {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      gsap.to(root.querySelector('[data-watermark]'), {
        yPercent: 18,
        rotate: 6,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      ScrollTrigger.refresh();
    },
    { scope: section, deps: [heavy] }
  );

  return (
    <section
      id="manifesto"
      ref={section}
      className="relative overflow-hidden border-t border-iron/60 bg-carbon py-24 sm:py-32"
    >
      <img
        data-watermark
        src={asset('/assets/njal-monogram-hd.png')}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-[8%] top-1/2 w-[46vw] -translate-y-1/2 opacity-[0.04]"
      />

      <div className="mx-auto max-w-[1680px] px-5 sm:px-8">
        <div className="mb-14 flex items-center gap-4">
          <Reveal kind="right" as="span" className="type-tactical text-[10px] text-blood">
            02 — MANIFESTO
          </Reveal>
          <RevealRule delay={120} className="flex-1" />
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 className="type-brutal text-bone">
              {CREED.map((line, i) => (
                <span key={line} className="line-mask">
                  <span
                    data-creed
                    data-reveal="mask"
                    style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
                    className={`block text-[10.5vw] leading-[0.84] sm:text-[7.5vw] lg:text-[5.6vw] ${
                      i === 3 ? 'text-blood' : ''
                    }`}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <p
              data-paragraph
              className="mt-12 max-w-2xl text-base leading-relaxed text-smoke sm:text-lg"
            >
              {WORDS.split(' ').map((word, i) => (
                <span key={`${word}-${i}`} data-word className="inline-block">
                  {word}&nbsp;
                </span>
              ))}
            </p>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-iron/70 pt-8">
              {FACTS.map((item, i) => (
                <Reveal key={item.k} kind="up" delay={i * 110}>
                  <div className="type-tactical text-[9px] text-ash">{item.k}</div>
                  <div className="type-brutal mt-2 text-lg text-bone sm:text-xl">{item.v}</div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="relative">
              <RevealMedia className="aspect-[3/4] w-full">
                <img
                  data-portrait
                  src={asset('/assets/images/post-athlete-blacktee.jpg')}
                  alt="Atleta vestindo a linha NJAL"
                  loading="lazy"
                  className="h-[118%] w-full object-cover object-center"
                />
              </RevealMedia>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />

              <figcaption className="absolute bottom-5 left-5 right-5">
                <Reveal kind="up" delay={620} as="div" className="type-tactical text-[9px] text-blood">
                  {BRAND.saga}
                </Reveal>
                <RevealLines
                  lines={[BRAND.manifesto]}
                  className="type-brutal mt-2 text-2xl text-bone"
                  delay={700}
                />
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
