'use client';

import { useState } from 'react';
import { concierge, asset } from '@/lib/brand';
import { Reveal, RevealLines, RevealRule, RevealWords, RevealMedia } from '@/components/motion/Reveal';
import { Magnetic } from '@/components/motion/Magnetic';

const PIECES = [
  'Camisetas Dry-Fit',
  'Oversized Streetwear',
  'Regatas Cavadas',
  'Bermudas 4-Way',
  'Rashguards No-Gi',
  'Moletom & Agasalho',
];

const VOLUMES = ['10 a 50', '50 a 100', '100 a 300', '+300'];

export function Forja() {
  const [piece, setPiece] = useState(PIECES[0]);
  const [volume, setVolume] = useState(VOLUMES[1]);
  const [team, setTeam] = useState('');
  const [city, setCity] = useState('');

  const message = [
    'Olá, equipe de confecção da NJAL!',
    '',
    'Quero um orçamento de produção personalizada:',
    `• Box / marca: ${team || 'não informado'}`,
    `• Cidade: ${city || 'não informada'}`,
    `• Peça: ${piece}`,
    `• Volume: ${volume} peças`,
    '',
    'Conseguem me passar prazo e valores?',
  ].join('\n');

  return (
    <section id="forja" className="relative overflow-hidden border-t border-iron/60 bg-void py-24 sm:py-32">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8">
        <div className="mb-12 flex items-center gap-4">
          <Reveal kind="right" as="span" className="type-tactical text-[10px] text-blood">
            05 — A FORJA
          </Reveal>
          <RevealRule delay={120} className="flex-1" />
        </div>

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <RevealLines
              as="h2"
              lines={['NOSSA', 'CONFECÇÃO.', 'SUA IDEIA.']}
              className="type-brutal text-bone"
              lineClassName="text-[13vw] leading-[0.84] sm:text-[8vw] lg:text-[5vw]"
            />

            <RevealWords
              as="p"
              text="Máquina, corte, modelagem e estamparia dentro de casa. Produzimos a linha oficial do seu box, academia, equipe de luta ou marca própria a partir de 10 peças — com o mesmo padrão das peças que vestimos nos nossos atletas."
              className="mt-8 block max-w-lg text-sm leading-relaxed text-smoke sm:text-base"
              delay={220}
              step={16}
            />

            <div className="mt-10 grid gap-px overflow-hidden border border-iron/70 bg-iron/70 sm:grid-cols-2">
              {[
                { k: 'MÍNIMO', v: '10 PEÇAS' },
                { k: 'TÉCNICAS', v: 'SILK · DTF · BORDADO' },
                { k: 'MOCKUP', v: 'APROVAÇÃO ANTES DO CORTE' },
                { k: 'ENVIO', v: 'TODO O BRASIL' },
              ].map((item, i) => (
                <Reveal key={item.k} kind="up" delay={i * 100} className="bg-void p-6">
                  <div className="type-tactical text-[9px] text-ash">{item.k}</div>
                  <div className="type-brutal mt-2 text-lg text-bone">{item.v}</div>
                </Reveal>
              ))}
            </div>

            <RevealMedia className="mt-10 aspect-[16/10] w-full" kind="clip-x">
              <img
                data-parallax="9"
                src={asset('/assets/images/post-confeccao-portfolio.jpg')}
                alt="Portfólio da confecção NJAL"
                loading="lazy"
                className="h-full w-full scale-[1.22] object-cover object-center"
              />
            </RevealMedia>
          </div>

          {/* Configurador que monta a mensagem do orçamento */}
          <div className="lg:col-span-6">
            <Reveal kind="left" className="cut-corner border border-iron/70 bg-graphite p-7 sm:p-10">
              <Reveal kind="right" as="div" className="type-tactical text-[9px] text-blood">
                MONTE SEU PEDIDO
              </Reveal>
              <RevealLines
                as="h3"
                lines={['ORÇAMENTO EM', 'UMA MENSAGEM']}
                className="type-brutal mt-3 text-2xl text-bone sm:text-3xl"
                delay={120}
              />

              <div className="mt-8 space-y-7">
                <Field label="TIPO DE PEÇA" delay={260}>
                  <div className="flex flex-wrap gap-2">
                    {PIECES.map((p) => (
                      <Chip key={p} active={piece === p} onClick={() => setPiece(p)}>
                        {p}
                      </Chip>
                    ))}
                  </div>
                </Field>

                <Field label="VOLUME ESTIMADO" delay={340}>
                  <div className="flex flex-wrap gap-2">
                    {VOLUMES.map((v) => (
                      <Chip key={v} active={volume === v} onClick={() => setVolume(v)}>
                        {v} peças
                      </Chip>
                    ))}
                  </div>
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="BOX / MARCA" delay={420}>
                    <input
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                      placeholder="Ex.: Box Valhalla"
                      className="w-full border-b border-iron bg-transparent pb-2.5 text-sm text-bone outline-none transition-colors placeholder:text-ash/70 focus:border-blood"
                    />
                  </Field>

                  <Field label="CIDADE / UF" delay={480}>
                    <input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex.: São Paulo · SP"
                      className="w-full border-b border-iron bg-transparent pb-2.5 text-sm text-bone outline-none transition-colors placeholder:text-ash/70 focus:border-blood"
                    />
                  </Field>
                </div>
              </div>

              {/* Prévia do que será enviado — nada de caixa-preta. */}
              <Reveal kind="up" delay={560} className="mt-8 border border-iron/70 bg-void/60 p-5">
                <div className="type-tactical mb-3 text-[9px] text-ash">PRÉVIA DA MENSAGEM</div>
                <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-smoke">
                  {message}
                </pre>
              </Reveal>

              <Reveal kind="up" delay={640} className="mt-8 inline-block">
                <Magnetic strength={0.25}>
                <a
                  href={concierge(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="type-tactical cut-badge inline-flex items-center gap-3 bg-blood px-8 py-4 text-[10px] text-bone transition-colors duration-300 hover:bg-ember"
                >
                  ABRIR NO WHATSAPP
                  <span aria-hidden>↗</span>
                </a>
                </Magnetic>
              </Reveal>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  delay = 0,
}: {
  label: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal kind="up" delay={delay}>
      <label className="block">
        <span className="type-tactical mb-3 block text-[9px] text-ash">{label}</span>
        {children}
      </label>
    </Reveal>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="link"
      className={`border px-3.5 py-2 text-[11px] transition-all duration-300 ${
        active
          ? 'border-blood bg-blood text-bone'
          : 'border-iron text-ash hover:border-smoke hover:text-smoke'
      }`}
    >
      {children}
    </button>
  );
}
