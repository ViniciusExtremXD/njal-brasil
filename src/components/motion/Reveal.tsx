'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import clsx from 'clsx';

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
  const inView = useInView(ref, { once: true, margin: '-12% 0px' });

  return (
    <Tag ref={ref as never} className={className}>
      {lines.map((line, i) => (
        <span key={`${line}-${i}`} className="line-mask">
          <motion.span
            className={clsx('block', lineClassName)}
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : undefined}
            transition={{
              duration: 1.05,
              delay: delay + i * stagger,
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
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Cortina vermelha que desliza revelando a mídia por baixo. */
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
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  return (
    <div ref={ref} className={clsx('relative overflow-hidden', className)}>
      <motion.div
        initial={{ scale: 1.18 }}
        animate={inView ? { scale: 1 } : undefined}
        transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
      <motion.span
        aria-hidden
        className="absolute inset-0 z-10 origin-bottom bg-blood"
        initial={{ scaleY: 1 }}
        animate={inView ? { scaleY: 0 } : undefined}
        transition={{ duration: 1.05, delay, ease: [0.85, 0, 0.15, 1] }}
      />
    </div>
  );
}
