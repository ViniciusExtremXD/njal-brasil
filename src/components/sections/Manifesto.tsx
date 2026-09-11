'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { BRAND, asset } from '@/lib/brand';
import { useHeavyMotion } from '@/hooks/useEnvironment';

const CREED = [
  'NÃO VENDEMOS',
  'ROUPA BONITA.',
  'ENTREGAMOS',
  'ARMADURA.',
];

const WORDS =
  'O nome vem das sagas nórdicas, onde o guerreiro não recuava porque a dor chegou primeiro. A NJAL nasceu no chão do box, entre anilha, cal e suor, para vestir quem entende que treino não é hobby: é a forma mais honesta de construir caráter. Cada peça sai da nossa própria confecção com a mesma obsessão que você coloca na última repetição.';

export function Manifesto() {
  const section = useRef<HTMLElement>(null);
  const heavy = useHeavyMotion();

  useGSAP(
    () => {
      const root = section.current;
      if (!root) return;

      // Palavras do parágrafo acendem conforme a leitura avança.
      const words = root.querySelectorAll<HTMLElement>('[data-word]');
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: root.querySelector('[data-paragraph]'),
            start: 'top 78%',
            end: 'bottom 58%',
            scrub: 0.6,
          },
        }
      );

      // Linhas do credo entram esticando a largura variável da fonte.
      const lines = root.querySelectorAll<HTMLElement>('[data-creed]');
      lines.forEach((line, i) => {
        gsap.fromTo(
          line,
          { fontVariationSettings: "'wdth' 62", opacity: 0.25, x: i % 2 ? 60 : -60 },
          {
            fontVariationSettings: "'wdth' 125",
            opacity: 1,
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: line,
              start: 'top 92%',
              end: 'top 42%',
              scrub: 0.8,
            },
          }
        );
      });

      if (!heavy) return;

      // Retrato com parallax longo apenas onde há folga de performance.
      gsap.to(root.querySelector('[data-portrait]'), {
        yPercent: -16,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
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
      {/* Monograma gigante como marca d'água estrutural. */}
      <img
        src={asset('/assets/njal-monogram-hd.png')}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-[8%] top-1/2 w-[46vw] -translate-y-1/2 opacity-[0.04]"
      />

      <div className="mx-auto max-w-[1680px] px-5 sm:px-8">
        <div className="mb-14 flex items-center gap-4">
          <span className="type-tactical text-[10px] text-blood">02 — MANIFESTO</span>
          <span className="h-px flex-1 bg-iron" />
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <h2 className="type-brutal text-bone">
              {CREED.map((line, i) => (
                <span
                  key={line}
                  data-creed
                  className={`block text-[10.5vw] leading-[0.84] sm:text-[7.5vw] lg:text-[5.6vw] ${
                    i === 3 ? 'text-blood' : ''
                  }`}
                >
                  {line}
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
              {[
                { k: 'ORIGEM', v: 'SÃO PAULO · BRASIL' },
                { k: 'PRODUÇÃO', v: 'CONFECÇÃO PRÓPRIA' },
                { k: 'LOTES', v: 'CURTOS E NUMERADOS' },
              ].map((item) => (
                <div key={item.k}>
                  <div className="type-tactical text-[9px] text-ash">{item.k}</div>
                  <div className="type-brutal mt-2 text-lg text-bone sm:text-xl">{item.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="relative aspect-[3/4] w-full overflow-hidden">
              <img
                data-portrait
                src={asset('/assets/images/post-athlete-blacktee.jpg')}
                alt="Atleta vestindo a linha NJAL"
                className="h-[118%] w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-transparent" />
              <figcaption className="absolute bottom-5 left-5 right-5">
                <div className="type-tactical text-[9px] text-blood">{BRAND.saga}</div>
                <div className="type-brutal mt-2 text-2xl text-bone">{BRAND.manifesto}</div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
