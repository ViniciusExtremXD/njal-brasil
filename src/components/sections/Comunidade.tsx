'use client';

import { BRAND, asset } from '@/lib/brand';
import { RevealLines, RevealMedia } from '@/components/motion/Reveal';
import { Marquee } from '@/components/motion/Marquee';

const FEED = [
  {
    image: asset('/assets/images/post-diogo-crossfit.jpg'),
    caption: 'WOD sem piedade com @diogolivera_02',
    kind: 'REEL',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    image: asset('/assets/images/post-templo-jiujitsu.jpg'),
    caption: 'NJAL × Templo Jiu-Jitsu Culture',
    kind: 'CARROSSEL',
    span: '',
  },
  {
    image: asset('/assets/images/post-forged-dept.jpg'),
    caption: 'Forged Dept. — disciplina e propósito',
    kind: 'POST',
    span: '',
  },
  {
    image: asset('/assets/images/post-confeccao-portfolio.jpg'),
    caption: 'Dentro da nossa confecção',
    kind: 'CARROSSEL',
    span: 'sm:row-span-2',
  },
  {
    image: asset('/assets/images/post-cristaofit.jpg'),
    caption: 'Linha comemorativa Cristão Fit',
    kind: 'POST',
    span: '',
  },
  {
    image: asset('/assets/images/gear-fold-c2hjd3.jpg'),
    caption: 'Acabamento peça a peça',
    kind: 'POST',
    span: '',
  },
];

export function Comunidade() {
  return (
    <section
      id="comunidade"
      className="relative border-t border-iron/60 bg-carbon py-24 sm:py-32"
    >
      <Marquee
        items={[BRAND.handle, 'COMUNIDADE', BRAND.creed, 'SIGA O FEED', BRAND.say]}
        className="mb-16 border-y border-iron/60 py-4"
        itemClassName="type-brutal text-4xl text-iron sm:text-6xl"
        separator="✦"
        baseDuration={28}
        reverse
      />

      <div className="mx-auto max-w-[1680px] px-5 sm:px-8">
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <RevealLines
            as="h2"
            lines={['QUEM VESTE', 'NÃO TROCA.']}
            className="type-brutal text-bone"
            lineClassName="text-[12vw] leading-[0.84] sm:text-[8vw] lg:text-[5.4vw]"
          />

          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="type-tactical inline-flex w-fit items-center gap-3 border border-iron px-7 py-4 text-[10px] text-smoke transition-colors duration-300 hover:border-blood hover:text-bone"
          >
            ABRIR O FEED {BRAND.handle}
            <span aria-hidden>↗</span>
          </a>
        </div>

        {/* Grade assimétrica */}
        <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 sm:grid-cols-4">
          {FEED.map((item, i) => (
            <a
              key={item.caption}
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="media"
              className={`group relative overflow-hidden bg-graphite ${item.span}`}
            >
              <RevealMedia className="h-full w-full" delay={i * 0.04}>
                <img
                  src={item.image}
                  alt={item.caption}
                  loading="lazy"
                  className="h-full min-h-[180px] w-full object-cover object-center transition-transform duration-[1200ms] ease-brutal group-hover:scale-105"
                />
              </RevealMedia>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/90 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="pointer-events-none absolute inset-x-4 bottom-4 z-20 translate-y-2 opacity-0 transition-all duration-500 ease-brutal group-hover:translate-y-0 group-hover:opacity-100">
                <div className="type-tactical text-[9px] text-blood">{item.kind}</div>
                <div className="mt-1.5 text-xs text-bone">{item.caption}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Depoimentos curtos, no tom do direct */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {[
            {
              quote:
                'Uso no box há oito meses. Não sobe no muscle-up, não assa e sai da máquina de lavar igual.',
              who: 'Lucas M.',
              role: 'Coach Crossfit RX',
            },
            {
              quote:
                'A rashguard aguenta pegada de faixa-preta puxando pelo ombro. Não laceou até hoje.',
              who: 'Prof. Rodrigo',
              role: 'Templo Jiu-Jitsu',
            },
            {
              quote:
                'Fechei 150 uniformes para o campeonato interno. Prazo batido e acabamento acima do que esperava.',
              who: 'Renato B.',
              role: 'Dono de box',
            },
          ].map((t) => (
            <figure key={t.who} className="cut-corner border border-iron/70 bg-graphite p-7">
              <span className="type-brutal block text-4xl leading-none text-blood">“</span>
              <blockquote className="mt-3 text-sm leading-relaxed text-smoke">{t.quote}</blockquote>
              <figcaption className="mt-5 border-t border-iron/70 pt-4">
                <div className="type-brutal text-base text-bone">{t.who}</div>
                <div className="type-tactical mt-1 text-[9px] text-ash">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
