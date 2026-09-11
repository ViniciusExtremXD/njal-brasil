'use client';

import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Roda um setup do GSAP dentro de um contexto com escopo no elemento.
 * O revert() do contexto mata tweens e ScrollTriggers criados ali —
 * é o que evita vazamento entre navegações e re-render.
 */
export function useGSAP(
  setup: (ctx: gsap.Context) => void,
  options: { scope: RefObject<HTMLElement | null>; deps?: unknown[] }
) {
  const { scope, deps = [] } = options;

  useEffect(() => {
    if (!registered) {
      gsap.registerPlugin(ScrollTrigger);
      registered = true;
    }

    const ctx = gsap.context(setup, scope.current ?? undefined);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
