'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@/hooks/useGSAP';
import { useHeavyMotion } from '@/hooks/useEnvironment';

/**
 * Movimento contínuo: enquanto a revelação cuida da entrada, isto mantém a
 * página respirando durante o scroll.
 *
 * Funciona por atributo, não por componente — qualquer elemento ganha o efeito
 * só de declarar `data-parallax`, `data-drift` ou `data-tilt-scroll`, sem
 * precisar ser reescrito para virar um nó de motion.
 */
export function ScrollFX() {
  const heavy = useHeavyMotion();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heavy) return;

      // Parallax vertical: a imagem viaja mais devagar que o bloco que a contém.
      document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
        const strength = Number(el.dataset.parallax) || 12;
        gsap.fromTo(
          el,
          { yPercent: -strength },
          {
            yPercent: strength,
            ease: 'none',
            scrollTrigger: {
              trigger: el.parentElement ?? el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // Blocos que deslizam de lado conforme atravessam a tela.
      document.querySelectorAll<HTMLElement>('[data-drift]').forEach((el) => {
        const strength = Number(el.dataset.drift) || 40;
        gsap.fromTo(
          el,
          { x: -strength },
          {
            x: strength,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });

      // Inclinação sutil que endireita quando o bloco chega ao centro.
      document.querySelectorAll<HTMLElement>('[data-tilt-scroll]').forEach((el) => {
        gsap.fromTo(
          el,
          { rotate: Number(el.dataset.tiltScroll) || 3 },
          {
            rotate: 0,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 45%', scrub: true },
          }
        );
      });

      ScrollTrigger.refresh();
    },
    { scope, deps: [heavy] }
  );

  return <div ref={scope} className="hidden" aria-hidden />;
}
