'use client';

import { useEffect, useState } from 'react';

/** Casa um media query com o estado do React, sem quebrar no SSR/export. */
export function useMediaQuery(query: string, fallback = false) {
  const [matches, setMatches] = useState(fallback);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Ponteiro fino de verdade (mouse/trackpad) — libera cursor custom e WebGL pesado. */
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');

/**
 * Respeita quem desativou animação no sistema.
 * `?motion=full` na URL ignora a preferência — serve para revisar a
 * experiência completa em máquinas/navegadores com a flag ligada.
 */
export function useReducedMotion() {
  const systemReduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [forced, setForced] = useState(false);

  useEffect(() => {
    setForced(new URLSearchParams(window.location.search).get('motion') === 'full');
  }, []);

  return systemReduced && !forced;
}

/**
 * Define se os efeitos pesados (WebGL, parallax de longa distância, pinning)
 * devem rodar. No mobile e em reduced-motion caímos para gestos leves.
 */
export function useHeavyMotion() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const wide = useMediaQuery('(min-width: 1024px)');
  return fine && wide && !reduced;
}
