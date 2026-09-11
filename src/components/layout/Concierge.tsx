'use client';

import { motion } from 'motion/react';
import { concierge } from '@/lib/brand';
import { Magnetic } from '@/components/motion/Magnetic';

/**
 * Atalho fixo para o atendimento. Sem balão, sem ruído: um alvo magnético
 * com anel de radar que respira.
 */
export function Concierge({ ready }: { ready: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={ready ? { scale: 1, opacity: 1 } : undefined}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 right-5 z-[130] sm:bottom-8 sm:right-8"
    >
      <Magnetic strength={0.4}>
        <a
          href={concierge('Olá NJAL! Vim pelo site e quero garantir minha armadura.')}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="group relative flex h-14 w-14 items-center justify-center bg-blood transition-colors duration-300 hover:bg-ember sm:h-16 sm:w-16"
          aria-label="Falar no WhatsApp da NJAL"
        >
          <span className="absolute inset-0 animate-breathe bg-blood/40 blur-xl" />
          <svg viewBox="0 0 24 24" className="relative h-6 w-6 fill-bone sm:h-7 sm:w-7">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.34-.5.04-.97.22-3.26-.68-2.74-1.08-4.48-3.9-4.61-4.08-.14-.18-1.11-1.48-1.11-2.82s.7-2 .95-2.28c.25-.27.54-.34.72-.34.18 0 .36 0 .52.01.17.01.39-.06.61.47.24.56.8 1.94.87 2.08.07.14.12.3.02.48-.09.18-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.27.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.27.14.43.12.59-.07.16-.18.68-.79.86-1.07.18-.27.36-.22.61-.13.25.09 1.6.75 1.87.89.27.14.45.2.52.32.07.11.07.65-.17 1.33Z" />
          </svg>
          <span className="type-tactical pointer-events-none absolute right-full mr-3 whitespace-nowrap bg-void/90 px-3 py-2 text-[9px] text-bone opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            CHAMAR NO WHATS
          </span>
        </a>
      </Magnetic>
    </motion.div>
  );
}
