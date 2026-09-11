'use client';

import { motion } from 'motion/react';
import { useRef } from 'react';
import clsx from 'clsx';
import { useRevealed } from '@/hooks/useRevealed';

/**
 * Revelação por máscara: a linha sobe de dentro de um recorte, como cortina.
 * É o gesto de entrada padrão de toda tipografia do site.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  as: Tag = 'div',
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  as?: 'div' | 'h1' | 'h2' | 'h3' | 'p';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useRevealed(ref, { margin: '-12% 0px' });

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="line-mask">
          <motion.span
            className={clsx('block', lineClassName)}
            initial={{ y: '110%' }}
            animate={{ y: shown ? '0%' : '110%' }}
            transition={{
              duration: 1.05,
              delay: shown ? delay + i * stagger : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Entrada genérica de blocos: sobe e materializa. */
export function RevealBlock({
  children,
  className,
  delay = 0,
  y = 34,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useRevealed(ref);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay: shown ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Cortina vermelha que desliza revelando a mídia por baixo.
 *
 * A cortina é um elemento separado e some de vez ao terminar: enquanto ela
 * dependesse de uma animação de transform para sair, qualquer frame perdido
 * (ou reduced-motion desligando transforms) deixaria a imagem coberta.
 */
export function RevealMedia({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useRevealed(ref, { margin: '-8% 0px' });

  return (
    <div ref={ref} className={clsx('relative overflow-hidden', className)}>
      <motion.div
        initial={{ scale: 1.18 }}
        animate={{ scale: shown ? 1 : 1.18 }}
        transition={{ duration: 1.6, delay: shown ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>

      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 origin-bottom bg-blood"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: shown ? 0 : 1, opacity: shown ? 0 : 1 }}
        transition={{
          scaleY: { duration: 1.05, delay: shown ? delay : 0, ease: [0.85, 0, 0.15, 1] },
          // A opacidade é a rede de segurança: ela some mesmo se o transform
          // for descartado (reduced-motion) ou a animação não completar.
          opacity: { duration: 0.4, delay: shown ? delay + 0.9 : 0 },
        }}
      />
    </div>
  );
}
