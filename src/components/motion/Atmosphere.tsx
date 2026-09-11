'use client';

/**
 * Camada de atmosfera que cobre o site inteiro: grão de filme em movimento,
 * varredura horizontal fina e vinheta. É o que dá a textura "crua" da marca.
 */
export function Atmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120]">
      {/* Grão animado por deslocamento de fundo — sem redesenho por frame. */}
      <div className="absolute -inset-[60px] opacity-[0.16] mix-blend-soft-light [animation:grain_1.1s_steps(6)_infinite]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="njal-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#njal-grain)" />
        </svg>
      </div>

      {/* Scanlines: linha de 1px a cada 3px. */}
      <div
        className="absolute inset-0 opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(255,255,255,0.045) 0 1px, transparent 1px 3px)',
        }}
      />

      {/* Vinheta que fecha as bordas e empurra o olho para o centro. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 45%, transparent 45%, rgba(5,5,6,0.55) 100%)',
        }}
      />

    </div>
  );
}
