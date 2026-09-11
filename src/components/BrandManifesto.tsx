import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Shield, Swords, Dumbbell, Sparkles, Award, ArrowUpRight } from 'lucide-react';
import { GlowCard } from './ui/GlowCard';
import { BRAND, asset } from '../config/brand';

export const BrandManifesto: React.FC = () => {
  const manifestoPillars = [
    {
      number: '01',
      title: 'A SAGA & O ESPÍRITO DE VALHALLA',
      subtitle: 'ATÉ O FIM, SEM RECUAR',
      description: 'O nome NJAL é forjado nas lendárias sagas nórdicas. Não criamos roupas para quem busca atalhos, mas para os guerreiros modernos que encaram o ferro pesado e o sofrimento do treino como combustível para a honra diária.',
      icon: <Flame className="w-8 h-8 text-njal-red" />,
      tag: 'NÓRDICO // CORAGEM',
      quote: 'Valhalla não é um lugar distante. É o estado de espírito de quem deixa tudo no chão do treino.',
    },
    {
      number: '02',
      title: 'O PADRÃO CROSSFIT RX',
      subtitle: 'NUNCA ESCALONADO POR COMODISMO',
      description: 'O atleta RX não aceita diminuir a carga apenas para parecer bonito no placar. Nossas peças foram desenhadas sob medida para resistir a atrito com anilhas, suor em cascata e movimentos ginásticos de amplitude extrema.',
      icon: <Dumbbell className="w-8 h-8 text-white" />,
      tag: 'CROSSFIT RX // SEM LIMITES',
      quote: 'Se o WOD não te desafia, ele não te transforma.',
    },
    {
      number: '03',
      title: 'TATAME & A CULTURA DO JIU-JITSU',
      subtitle: 'RESPEITO, TÉCNICA E RESILIÊNCIA',
      description: 'Na colaboração com o Templo Jiu-Jitsu Culture, entendemos o que significa a pressão do tatame. As armaduras de compressão NJAL oferecem blindagem de pele, costuras anti-estrangulamento e fixação absoluta durante o rola.',
      icon: <Swords className="w-8 h-8 text-njal-red" />,
      tag: 'FIGHTWEAR // TEMPLO BJJ',
      quote: 'A calma sob pressão é a maior vitória do guerreiro.',
    },
    {
      number: '04',
      title: 'STREETWEAR COM PRESENÇA BRUTAL',
      subtitle: 'A MESMA ATITUDE NO ASFALTO 24/7',
      description: 'Sua mentalidade não acaba quando você guarda o cinto de LPO ou tira a faixa do kimono. A linha casual e oversized da NJAL traduz essa postura imponente em modelagens contemporâneas de alto padrão para o seu dia a dia.',
      icon: <Shield className="w-8 h-8 text-white" />,
      tag: 'LIFESTYLE // POSTURA',
      quote: 'Vista sua jornada. Viva seu propósito. Seja NJAL.',
    }
  ];

  return (
    <section id="manifesto" className="relative py-28 bg-gradient-to-b from-black via-njal-dark/95 to-black border-y border-njal-border overflow-hidden">
      {/* Red ambient illumination */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-njal-red/10 rounded-full blur-[180px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-njal-card border border-njal-red/50 clip-chamfer mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-njal-red" />
            <span className="font-display text-xs font-black tracking-widest text-njal-red uppercase">
              O MANIFESTO // A IDENTIDADE DA MARCA
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight leading-none mb-6"
          >
            NÃO SOMOS APENAS ROUPA. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-njal-red via-njal-redBright to-white text-glow-red">
              SOMOS UMA CULTURA FORJADA NO LIMITE.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-njal-gray text-base sm:text-lg leading-relaxed"
          >
            A <strong className="text-white">NJAL</strong> nasceu para quem se recusa a ser mediano. Não vendemos peças genéricas em araras: criamos armaduras visuais com propósito para os boxes de Crossfit, tatames de luta e academias de ferro pesado.
          </motion.p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {manifestoPillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlowCard className="p-8 sm:p-10 h-full flex flex-col justify-between bg-njal-card/90 border-njal-border hover:border-njal-red/70 group relative overflow-hidden">
                
                {/* Background Monogram Watermark */}
                <div className="absolute -right-8 -bottom-8 w-44 h-44 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                  <img src={asset('/assets/njal-monogram-hd.png')} alt="" className="w-full h-full object-contain" />
                </div>

                <div>
                  {/* Top Bar with Number & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-none clip-chamfer bg-njal-dark border border-njal-border group-hover:border-njal-red flex items-center justify-center transition-colors">
                        {pillar.icon}
                      </div>
                      <span className="font-display text-2xl font-black text-white/30 group-hover:text-njal-red transition-colors">
                        {pillar.number}
                      </span>
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-njal-dark border border-njal-border text-njal-silver group-hover:text-njal-red group-hover:border-njal-red/40 transition-colors">
                      {pillar.tag}
                    </span>
                  </div>

                  {/* Headings */}
                  <span className="text-xs font-bold uppercase tracking-widest text-njal-red mb-1 block">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white tracking-wide mb-4 group-hover:text-njal-silver transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-njal-gray leading-relaxed mb-6 font-normal">
                    {pillar.description}
                  </p>
                </div>

                {/* Quote Box */}
                <div className="pt-4 border-t border-njal-border/60">
                  <p className="text-xs italic text-white/90 font-medium leading-relaxed">
                    "{pillar.quote}"
                  </p>
                </div>

              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Central Brand Seal Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 bg-gradient-to-r from-njal-dark via-black to-njal-dark border border-njal-red/50 clip-chamfer text-center relative overflow-hidden box-glow-red"
        >
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div className="h-16 w-14 mb-4 p-2 bg-black border border-njal-red clip-chamfer flex items-center justify-center shadow-xl shadow-njal-red/40">
              <img src={asset('/assets/njal-monogram-hd.png')} alt="NJAL Monograma" className="h-full w-full object-contain filter drop-shadow-[0_0_10px_rgba(255,11,58,0.8)]" />
            </div>

            <div className="flex items-center gap-3 mb-3">
              <img src={asset('/assets/njal-wordmark-hd.png')} alt="NJAL" className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(255,11,58,0.6)]" />
              <span className="text-xs font-heading font-black tracking-widest px-2 py-0.5 bg-njal-red/30 text-njal-red border border-njal-red/50 clip-badge">
                BRASIL
              </span>
            </div>

            <h3 className="font-heading text-3xl sm:text-4xl font-black uppercase text-white mb-3 tracking-wide">
              FORGED FOR CHAMPIONS.
            </h3>

            <p className="text-sm text-njal-silver leading-relaxed mb-6">
              Nossos lançamentos são limitados, forjados sob demanda e apresentados oficialmente pelo nosso feed e stories.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-njal-red hover:bg-njal-redDeep text-white font-display text-xs font-black uppercase tracking-widest clip-chamfer transition-all shadow-xl shadow-njal-red/40 flex items-center gap-2"
              >
                <span>Seguir @njalbrasil no Instagram</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 bg-njal-card hover:bg-njal-cardHover border border-njal-border hover:border-njal-red/50 text-white font-display text-xs font-black uppercase tracking-widest clip-chamfer transition-all flex items-center gap-2"
              >
                <span>Falar no WhatsApp Oficial</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
