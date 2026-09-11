'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BRAND, asset } from '@/lib/brand';

/**
 * Entrada do site: contador subindo e persianas verticais que abrem
 * revelando o Hero. Roda uma vez por sessão.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let current = 0;
    const id = window.setInterval(() => {
      // Avança irregular: parece carregamento real, não barra decorativa.
      current = Math.min(100, current + Math.random() * 13 + 4);
      setCount(Math.floor(current));
      if (current >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => setOpen(false), 380);
        window.setTimeout(onDone, 1180);
      }
    }, 110);

    return () => window.clearInterval(id);
  }, [onDone]);

  const blinds = [0, 1, 2, 3, 4];

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[300]" exit={{ pointerEvents: 'none' }}>
          <div className="absolute inset-0 flex">
            {blinds.map((i) => (
              <motion.span
                key={i}
                className="h-full flex-1 bg-void"
                initial={{ y: '0%' }}
                exit={{ y: '-102%' }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.07,
                  ease: [0.85, 0, 0.15, 1],
                }}
              />
            ))}
          </div>

          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-6"
            exit={{ opacity: 0, transition: { duration: 0.24 } }}
          >
            <motion.img
              src={asset('/assets/njal-monogram-hd.png')}
              alt=""
              className="h-14 w-auto"
              animate={{ opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="type-tactical text-ash">{BRAND.creed}</div>

            <div className="relative h-px w-56 overflow-hidden bg-iron sm:w-80">
              <motion.span
                className="absolute inset-y-0 left-0 bg-blood"
                style={{ width: `${count}%` }}
              />
            </div>

            <div className="type-brutal text-6xl text-bone tabular-nums sm:text-8xl">
              {String(count).padStart(3, '0')}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
