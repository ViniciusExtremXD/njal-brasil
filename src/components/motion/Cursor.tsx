'use client';

import { useEffect, useRef, useState } from 'react';
import { useFinePointer } from '@/hooks/useEnvironment';

type Mode = 'idle' | 'link' | 'media' | 'drag';

const LABEL: Record<Mode, string> = {
  idle: '',
  link: '',
  media: 'VER',
  drag: 'ARRASTA',
};

/**
 * Cursor próprio: ponto duro que gruda no ponteiro e um anel que persegue
 * com atraso. Elementos marcam a intenção com data-cursor="media|drag|link".
 */
export function Cursor() {
  const fine = useFinePointer();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('idle');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    document.body.dataset.cursor = 'on';

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const trail = { ...pointer };
    const visibleRef = { current: false };
    const modeRef = { current: 'idle' as Mode };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor], a, button'
      );
      const next = (target?.dataset.cursor as Mode | undefined) ?? (target ? 'link' : 'idle');
      if (next !== modeRef.current) {
        modeRef.current = next;
        setMode(next);
      }
    };

    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    const render = () => {
      trail.x += (pointer.x - trail.x) * 0.16;
      trail.y += (pointer.y - trail.y) * 0.16;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${trail.x}px, ${trail.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      delete document.body.dataset.cursor;
    };
  }, [fine]);

  if (!fine) return null;

  const expanded = mode === 'media' || mode === 'drag';

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200] hidden lg:block"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 240ms ease' }}
    >
      <div
        ref={ring}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-bone/70 backdrop-invert-[0.08] transition-[width,height,background-color,border-color] duration-300 ease-brutal"
        style={{
          width: expanded ? 88 : mode === 'link' ? 46 : 32,
          height: expanded ? 88 : mode === 'link' ? 46 : 32,
          backgroundColor: expanded ? 'rgb(232 18 63 / 0.92)' : 'transparent',
          borderColor: expanded ? 'rgb(232 18 63)' : 'rgb(242 240 236 / 0.7)',
        }}
      >
        <span
          className="type-tactical text-[9px] text-bone transition-opacity duration-200"
          style={{ opacity: expanded ? 1 : 0 }}
        >
          {LABEL[mode]}
        </span>
      </div>

      <div
        ref={dot}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-blood transition-opacity duration-200"
        style={{ opacity: expanded ? 0 : 1 }}
      />
    </div>
  );
}
