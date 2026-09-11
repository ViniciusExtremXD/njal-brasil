'use client';

import { useRef } from 'react';
import {
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValueEvent,
  motion,
} from 'motion/react';
import clsx from 'clsx';

/**
 * Letreiro cinético: roda sozinho e ganha impulso extra conforme a página
 * rola — a velocidade do scroll vira velocidade do letreiro.
 */
export function Marquee({
  items,
  className,
  itemClassName,
  separator = '/',
  baseDuration = 34,
  reverse = false,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: string;
  baseDuration?: number;
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const skew = useSpring(0, { stiffness: 140, damping: 22 });

  // A velocidade do scroll inclina o letreiro — sensação de inércia.
  useMotionValueEvent(scrollVelocity, 'change', (v) => {
    skew.set(Math.max(-8, Math.min(8, v / 220)) * (reverse ? -1 : 1));
  });

  const row = [...items, ...items];

  return (
    <div ref={ref} className={clsx('relative overflow-hidden', className)}>
      <motion.div
        className="flex w-max whitespace-nowrap will-change-transform"
        style={{ skewX: skew }}
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: baseDuration, ease: 'linear', repeat: Infinity }}
      >
        {row.map((item, i) => (
          <span key={`${item}-${i}`} className={clsx('flex shrink-0 items-center', itemClassName)}>
            {item}
            <span className="mx-6 text-blood opacity-70 sm:mx-10">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Variante ligada ao progresso do scroll — desliza só enquanto você rola. */
export function ScrollMarquee({
  text,
  className,
  distance = 340,
}: {
  text: string;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const smooth = useSpring(x, { stiffness: 90, damping: 26, mass: 0.6 });

  return (
    <div ref={ref} className={clsx('overflow-hidden', className)}>
      <motion.div style={{ x: smooth }} className="w-max whitespace-nowrap will-change-transform">
        {text}
      </motion.div>
    </div>
  );
}
