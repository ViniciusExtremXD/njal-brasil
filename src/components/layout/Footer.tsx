'use client';

import { useState } from 'react';
import { BRAND, asset, concierge } from '@/lib/brand';
import { Magnetic } from '@/components/motion/Magnetic';
import { Reveal, RevealLines, RevealWords } from '@/components/motion/Reveal';

const COLUMNS = [
  {
    title: 'NAVEGAR',
    links: [
      { label: 'Arsenal', href: '#arsenal' },
      { label: 'Manifesto', href: '#manifesto' },
      { label: 'Legado', href: '#legado' },
      { label: 'Comunidade', href: '#comunidade' },
      { label: 'Forja B2B', href: '#forja' },
    ],
  },
  {
    title: 'ARENAS',
    links: [
      { label: 'Crossfit RX', href: '#arsenal' },
      { label: 'Valhalla', href: '#arsenal' },
      { label: 'Tatame No-Gi', href: '#arsenal' },
      { label: 'Streetwear', href: '#arsenal' },
    ],
  },
];

export function Footer() {
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden border-t border-iron/60 bg-carbon">
      <div className="mx-auto max-w-[1680px] px-5 pt-20 sm:px-8 sm:pt-24">
        {/* Chamada final */}
        <div className="grid gap-12 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal kind="right" as="div" className="type-tactical mb-5 text-[9px] text-blood">
              ÚLTIMO AVISO
            </Reveal>
            <RevealLines
              as="p"
              lines={['A ARMADURA NÃO', 'ESPERA VOCÊ.']}
              className="type-brutal text-bone"
              lineClassName="text-[11vw] leading-[0.84] sm:text-[7vw] lg:text-[4.6vw]"
              delay={90}
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <Reveal kind="up" delay={320}>
              <Magnetic strength={0.3}>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="type-tactical cut-badge inline-flex items-center gap-3 bg-blood px-7 py-4 text-[10px] text-bone transition-colors duration-300 hover:bg-ember"
                >
                  INSTAGRAM {BRAND.handle}
                  <span aria-hidden>↗</span>
                </a>
              </Magnetic>
              </Reveal>
              <Reveal kind="up" delay={400}>
              <a
                href={concierge('Olá NJAL! Quero garantir minha peça.')}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="type-tactical inline-flex items-center gap-3 border border-iron px-7 py-4 text-[10px] text-smoke transition-colors duration-300 hover:border-blood hover:text-bone"
              >
                FALAR NO WHATSAPP
              </a>
              </Reveal>
            </div>
          </div>

          {/* Aviso de drop */}
          <div className="lg:col-span-5">
            <Reveal kind="left" delay={180} className="cut-corner border border-iron/70 p-7">
              <Reveal kind="right" delay={260} as="div" className="type-tactical text-[9px] text-ash">
                AVISO DE DROP
              </Reveal>
              <RevealWords
                as="p"
                text="A NJAL não dispara e-mail: o aviso de lote novo sai no story. Ative o sininho do perfil e você vê antes de esgotar."
                className="mt-3 block text-sm leading-relaxed text-smoke"
                delay={320}
                step={14}
              />

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="mt-6 flex items-center gap-3 border-b border-iron pb-3"
              >
                <input
                  type="email"
                  required
                  placeholder="seu@email.com"
                  className="w-full bg-transparent text-sm text-bone outline-none placeholder:text-ash/70"
                  aria-label="E-mail para aviso de drop"
                />
                <button
                  type="submit"
                  data-cursor="link"
                  className="type-tactical shrink-0 text-[10px] text-blood transition-colors hover:text-ember"
                >
                  {sent ? 'ANOTADO ✓' : 'AVISAR-ME'}
                </button>
              </form>

              <p className="type-tactical mt-3 text-[9px] leading-relaxed text-ash">
                {sent
                  ? 'lista local — o canal oficial continua sendo o instagram'
                  : 'o canal oficial de lançamento é o feed'}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Colunas */}
        <div className="grid gap-10 border-t border-iron/70 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {COLUMNS.map((col, c) => (
            <Reveal key={col.title} kind="up" delay={c * 110}>
              <div className="type-tactical mb-5 text-[9px] text-ash">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((link, i) => (
                  <Reveal as="li" key={link.label} kind="right" delay={c * 110 + i * 55}>
                    <a
                      href={link.href}
                      className="text-sm text-smoke transition-colors duration-300 hover:text-blood"
                    >
                      {link.label}
                    </a>
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal kind="up" delay={240}>
            <div className="type-tactical mb-5 text-[9px] text-ash">PONTO FÍSICO</div>
            <p className="text-sm leading-relaxed text-smoke">
              <strong className="text-bone">{BRAND.point.name}</strong>
              <br />
              {BRAND.point.street}
              <br />
              {BRAND.point.city}
            </p>
          </Reveal>

          <Reveal kind="up" delay={340}>
            <div className="type-tactical mb-5 text-[9px] text-ash">PRONÚNCIA</div>
            <RevealLines
              lines={[`✌ ${BRAND.say}`]}
              className="type-brutal text-3xl text-bone"
              delay={380}
            />
            <RevealWords
              as="p"
              text={BRAND.armor}
              className="mt-3 block text-sm leading-relaxed text-smoke"
              delay={460}
              step={16}
            />
          </Reveal>
        </div>
      </div>

      {/* Wordmark gigante de fechamento: emerge de dentro da própria borda */}
      <div className="relative overflow-hidden border-t border-iron/70 pt-6">
        <span className="line-mask block">
          <img
            data-reveal="mask"
            style={{ '--reveal-duration': '1500ms' } as React.CSSProperties}
            src={asset('/assets/njal-wordmark-hd.png')}
            alt={BRAND.full}
            className="mx-auto block w-[112%] max-w-none translate-y-[14%] px-2 opacity-90"
          />
        </span>
      </div>

      <div className="mx-auto flex max-w-[1680px] flex-col gap-3 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Reveal kind="right" as="span" className="type-tactical text-[9px] text-ash">
          © {new Date().getFullYear()} {BRAND.full} · {BRAND.creed}
        </Reveal>
        <Reveal kind="left" delay={120} as="span">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          data-cursor="link"
          className="type-tactical text-[9px] text-ash transition-colors hover:text-blood"
        >
          VOLTAR AO TOPO ↑
        </button>
        </Reveal>
      </div>
    </footer>
  );
}
