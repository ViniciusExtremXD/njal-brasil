'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\\<>#*%';

/**
 * Glitch sob demanda: o texto se decodifica caractere a caractere.
 * Dispara ao entrar em cena e de novo a cada hover.
 */
export function Scramble({
  text,
  className,
  speed = 28,
  autoStart = true,
}: {
  text: string;
  className?: string;
  speed?: number;
  autoStart?: boolean;
}) {
  const [output, setOutput] = useState(autoStart ? '' : text);
  const raf = useRef<number | null>(null);
  const host = useRef<HTMLSpanElement>(null);

  const run = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const started = performance.now();
    const total = text.length * speed + 260;

    const tick = (now: number) => {
      const elapsed = now - started;
      const settled = Math.floor(elapsed / speed);

      const next = text
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          if (i < settled) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join('');

      setOutput(next);

      if (elapsed < total) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setOutput(text);
        raf.current = null;
      }
    };

    raf.current = requestAnimationFrame(tick);
  }, [text, speed]);

  useEffect(() => {
    const node = host.current;
    if (!node || !autoStart) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);

    return () => {
      io.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [run, autoStart]);

  useEffect(
    () => () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    },
    []
  );

  return (
    <span ref={host} className={className} onPointerEnter={run}>
      {output || ' '}
    </span>
  );
}
