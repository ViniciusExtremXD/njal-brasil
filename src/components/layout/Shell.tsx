'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { RevealProvider } from '@/components/motion/Reveal';
import { ScrollFX } from '@/components/motion/ScrollFX';
import { Atmosphere } from '@/components/motion/Atmosphere';
import { Cursor } from '@/components/motion/Cursor';
import { Preloader } from '@/components/motion/Preloader';
import { Nav } from '@/components/layout/Nav';
import { Concierge } from '@/components/layout/Concierge';

const SEEN_KEY = 'njal:entered';

/**
 * Casca da aplicação: scroll suave, revelações, atmosfera, cursor e a
 * transição entre rotas em volta de qualquer página.
 */
export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [booting, setBooting] = useState(true);
  const [entered, setEntered] = useState(false);

  // ?motion=full libera a experiência completa mesmo com reduced-motion ligado.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('motion') === 'full') {
      document.documentElement.dataset.motion = 'full';
    }
  }, []);

  // O preloader só aparece na primeira visita da sessão.
  useEffect(() => {
    const seen = sessionStorage.getItem(SEEN_KEY) === '1';
    setBooting(!seen);
    setEntered(seen);
  }, []);

  const finish = useCallback(() => {
    sessionStorage.setItem(SEEN_KEY, '1');
    setBooting(false);
    setEntered(true);
  }, []);

  return (
    // reducedMotion="user": quem desativou animação no sistema recebe o estado
    // final na hora, sem depender de nenhum frame chegar.
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <RevealProvider>
          {booting && <Preloader onDone={finish} />}

          <Cursor />
          <Atmosphere />
          <Nav ready={entered} />

          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>

          {/* Remontado a cada rota: os gatilhos de scroll pertencem à página. */}
          <ScrollFX key={`fx-${pathname}`} />

          <Concierge ready={entered} />
        </RevealProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}
