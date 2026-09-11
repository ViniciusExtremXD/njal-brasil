'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { asset } from '@/lib/brand';
import { useHeavyMotion } from '@/hooks/useEnvironment';
import { Scramble } from '@/components/motion/Scramble';
import { Reveal, RevealLines, RevealRule } from '@/components/motion/Reveal';

const CHAPTERS = [
  {
    id: '01',
    title: 'O BOX',
    claim: 'NINGUÉM ESCALA POR PREGUIÇA',
    text: 'Começou vestindo atleta de Crossfit que rasgava camiseta comum em duas semanas. A malha de quatro direções e a costura flatlock nasceram dessa reclamação.',
    image: asset('/assets/images/post-diogo-crossfit.jpg'),
  },
  {
    id: '02',
    title: 'O FERRO',
    claim: 'ATÉ CHEGAR EM VALHALLA',
    text: 'A saga nórdica virou linha: preto de estúdio, vermelho de sangue e corte que respeita dorsal construída no ferro pesado, sem sobrar pano nem travar movimento.',
    image: asset('/assets/images/diogo-regata-reel.jpg'),
  },
  {
    id: '03',
    title: 'O TATAME',
    claim: 'CALMA SOB PRESSÃO',
    text: 'A parceria com o Templo Jiu-Jitsu Culture colocou a marca no No-Gi. Compressão que segura o músculo no rola e tecido que aguenta pegada de faixa-preta.',
    image: asset('/assets/images/post-templo-jiujitsu.jpg'),
  },
  {
    id: '04',
    title: 'A FORJA',
    claim: 'NOSSA CONFECÇÃO, SUA IDEIA',
    text: 'Máquina própria, corte próprio, estamparia própria. O que começou como produção para a marca virou serviço para box, academia e equipe que quer uniforme sério.',
    image: asset('/assets/images/post-confeccao-portfolio.jpg'),
  },
];

export function Legado() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const heavy = useHeavyMotion();

  useGSAP(
    () => {
      if (!heavy || !track.current || !section.current) return;

      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', track.current);
      const distance = () => track.current!.scrollWidth - window.innerWidth;

      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel) => {
        // A foto anda mais devagar que o painel.
        const image = panel.querySelector('[data-panel-image]');
        if (image) {
          gsap.fromTo(
            image,
            { xPercent: -9, scale: 1.16 },
            {
              xPercent: 9,
              scale: 1.04,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            }
          );
        }

        // O texto de cada capítulo entra quando o painel cruza o centro.
        gsap.fromTo(
          panel.querySelectorAll('[data-panel-copy] > *'),
          { yPercent: 60, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.08,
            ease: 'power3.out',
            duration: 0.9,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 72%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      ScrollTrigger.refresh();
    },
    { scope: section, deps: [heavy] }
  );

  return (
    <section
      id="legado"
      ref={section}
      className="relative overflow-hidden border-t border-iron/60 bg-void"
    >
      <div className="mx-auto max-w-[1680px] px-5 pb-10 pt-24 sm:px-8 sm:pt-32">
        <div className="flex items-center gap-4">
          <Reveal kind="right" as="span" className="type-tactical text-[10px] text-blood">
            03 — LEGADO
          </Reveal>
          <RevealRule delay={120} className="flex-1" />
          <Reveal kind="left" delay={220} as="span" className="type-tactical hidden text-[10px] text-ash lg:inline">
            role para atravessar
          </Reveal>
        </div>
      </div>

      {/*
        O trilho só vira horizontal quando o pinning do ScrollTrigger está de
        fato ativo. Amarrar isso a uma media query criava uma faixa horizontal
        sem scroll para quem tem reduced-motion ligado.
      */}
      <div
        ref={track}
        className={heavy ? 'flex w-max flex-row' : 'flex w-full flex-col gap-5 px-5 pb-24 sm:px-8'}
      >
        {CHAPTERS.map((chapter, i) => (
          <article
            key={chapter.id}
            data-panel
            className={`relative flex shrink-0 flex-col justify-end overflow-hidden bg-graphite ${
              heavy ? 'h-[78vh] w-[62vw] border-r border-iron/60' : 'w-full'
            }`}
          >
            <div
              className={
                heavy
                  ? 'absolute inset-0 h-full w-full overflow-hidden'
                  : 'relative aspect-[4/3] w-full overflow-hidden'
              }
            >
              <img
                data-panel-image
                src={chapter.image}
                alt={chapter.title}
                loading="lazy"
                className="h-full w-full scale-110 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-void/10" />
            </div>

            {/* No modo pinado o GSAP anima; fora dele o observador cuida. */}
            <div
              data-panel-copy
              className={`relative z-10 p-6 sm:p-10 ${heavy ? 'max-w-xl p-14' : ''}`}
            >
              {heavy ? (
                <>
                  <div className="type-tactical mb-4 text-[9px] text-blood">
                    CAPÍTULO {chapter.id}
                  </div>
                  <h3 className="type-brutal text-[13vw] leading-[0.84] text-bone sm:text-[8vw] lg:text-[4.2vw]">
                    {chapter.title}
                  </h3>
                  <div className="type-tactical mt-4 text-[10px] text-bone">
                    <Scramble text={chapter.claim} />
                  </div>
                  <p className="mt-5 max-w-md text-sm leading-relaxed text-smoke">{chapter.text}</p>
                </>
              ) : (
                <>
                  <Reveal kind="right" as="div" className="type-tactical mb-4 text-[9px] text-blood">
                    CAPÍTULO {chapter.id}
                  </Reveal>
                  <RevealLines
                    as="h3"
                    lines={[chapter.title]}
                    className="type-brutal text-[13vw] leading-[0.84] text-bone sm:text-[8vw]"
                    delay={80}
                  />
                  <Reveal kind="up" delay={220} as="div" className="type-tactical mt-4 text-[10px] text-bone">
                    <Scramble text={chapter.claim} />
                  </Reveal>
                  <Reveal kind="up" delay={300}>
                    <p className="mt-5 max-w-md text-sm leading-relaxed text-smoke">
                      {chapter.text}
                    </p>
                  </Reveal>
                </>
              )}
              <span className="sr-only">{i + 1}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
