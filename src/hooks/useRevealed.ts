'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';

/**
 * Diz quando um bloco deve aparecer.
 *
 * Revelar no scroll é um enfeite; o conteúdo estar visível não é. Se o
 * IntersectionObserver não reportar (aba em segundo plano, rAF estrangulado,
 * observer que nunca dispara), o prazo de segurança revela mesmo assim — nada
 * no site pode ficar escondido esperando um frame que talvez não venha.
 */
export function useRevealed(
  ref: RefObject<Element | null>,
  { margin = '-10% 0px', fallbackMs = 1200 }: { margin?: string; fallbackMs?: number } = {}
) {
  const [revealed, setRevealed] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;

    const reveal = () => {
      if (done.current) return;
      done.current = true;
      setRevealed(true);
    };

    const node = ref.current;
    let observer: IntersectionObserver | undefined;

    if (node && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            reveal();
            observer?.disconnect();
          }
        },
        { rootMargin: margin }
      );
      observer.observe(node);
    } else {
      reveal();
    }

    const timer = window.setTimeout(reveal, fallbackMs);

    return () => {
      observer?.disconnect();
      window.clearTimeout(timer);
    };
  }, [ref, margin, fallbackMs]);

  return revealed;
}
