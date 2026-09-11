'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { BRAND, asset } from '@/lib/brand';
import { Magnetic } from '@/components/motion/Magnetic';
import { Scramble } from '@/components/motion/Scramble';

const LINKS = [
  { label: 'ARSENAL', href: '/#arsenal', index: '01' },
  { label: 'MANIFESTO', href: '/#manifesto', index: '02' },
  { label: 'LEGADO', href: '/#legado', index: '03' },
  { label: 'COMUNIDADE', href: '/#comunidade', index: '04' },
  { label: 'FORJA B2B', href: '/#forja', index: '05' },
];

export function Nav({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    document.documentElement.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[130] transition-colors duration-500 ${
          solid ? 'bg-void/80 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-[1680px] items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label={BRAND.full}>
            <img
              src={asset('/assets/njal-monogram-hd.png')}
              alt=""
              className="h-8 w-auto transition-transform duration-500 ease-brutal group-hover:rotate-[8deg]"
            />
            <span className="hidden flex-col leading-none sm:flex">
              <img src={asset('/assets/njal-wordmark-hd.png')} alt={BRAND.full} className="h-4 w-auto" />
              <span className="type-tactical mt-1.5 text-[8px] text-ash">{BRAND.creed}</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {LINKS.map((link) => (
              <a key={link.href} href={link.href} className="group relative py-1">
                <span className="type-tactical text-[10px] text-smoke transition-colors duration-300 group-hover:text-bone">
                  {link.label}
                </span>
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-blood transition-all duration-500 ease-brutal group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.3} className="hidden sm:block">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="type-tactical cut-badge bg-blood px-5 py-2.5 text-[10px] text-bone transition-colors duration-300 hover:bg-ember"
              >
                VER OS DROPS
              </a>
            </Magnetic>

            <button
              onClick={() => setOpen(true)}
              className="group flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-iron transition-colors duration-300 hover:border-blood lg:hidden"
              aria-label="Abrir menu"
            >
              <span className="h-px w-4 bg-bone transition-all duration-300 group-hover:w-5" />
              <span className="h-px w-5 bg-bone transition-all duration-300 group-hover:w-3" />
            </button>
          </div>
        </div>

        <motion.div
          style={{ scaleX: progress }}
          className="h-px w-full origin-left bg-blood"
        />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[190] flex flex-col bg-void"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <img src={asset('/assets/njal-monogram-hd.png')} alt="" className="h-8 w-auto" />
              <button
                onClick={() => setOpen(false)}
                className="type-tactical text-[10px] text-smoke hover:text-blood"
                aria-label="Fechar menu"
              >
                FECHAR ✕
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-5 sm:px-8">
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: 60, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.22 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-baseline gap-4 border-b border-iron/70 py-4"
                >
                  <span className="type-tactical text-[9px] text-blood">{link.index}</span>
                  <span className="type-brutal text-[13vw] text-bone transition-colors group-hover:text-blood sm:text-[8vw]">
                    <Scramble text={link.label} autoStart={false} />
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="flex flex-col gap-3 px-5 pb-10 sm:px-8">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="type-tactical cut-badge bg-blood px-6 py-4 text-center text-[10px] text-bone"
              >
                INSTAGRAM {BRAND.handle}
              </a>
              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="type-tactical border border-iron px-6 py-4 text-center text-[10px] text-smoke"
              >
                FALAR NO WHATSAPP
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
