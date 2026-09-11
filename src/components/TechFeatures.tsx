import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Dumbbell, Sparkles, Layers, Scissors, Flame, ArrowUpRight } from 'lucide-react';
import { GlowCard } from './ui/GlowCard';

export const TechFeatures: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-10 h-10 text-njal-red" />,
      title: 'Tecido Dry-Tech 4-Way Stretch',
      subtitle: 'Ventilação Extrema',
      desc: 'Microfibras inteligentes que drenam o suor na velocidade da luz e acompanham cada extensão muscular sem prender o movimento.',
      badge: 'ZERO RETENÇÃO',
      glow: 'rgba(255, 11, 58, 0.35)',
    },
    {
      icon: <Dumbbell className="w-10 h-10 text-white" />,
      title: 'Modelagem RX Engineered',
      subtitle: 'Feita para o Box',
      desc: 'Corte anatômico testado em WODs pesados de levantamento, rope climb e ginástica. A camiseta não sobe nem enrola no meio do set.',
      badge: 'APROVADO POR ATLETAS',
      glow: 'rgba(255, 255, 255, 0.2)',
    },
    {
      icon: <ShieldCheck className="w-10 h-10 text-njal-red" />,
      title: 'Costuras Blindadas Flatlock',
      subtitle: 'Zero Assaduras',
      desc: 'Costura reforçada de 6 fios que desliza suavemente sobre a pele, eliminando qualquer atrito mesmo em treinos de 2 horas.',
      badge: 'ANTI-FRICTION',
      glow: 'rgba(255, 11, 58, 0.35)',
    },
    {
      icon: <Flame className="w-10 h-10 text-njal-red" />,
      title: 'Estética Nórdica & Valhalla',
      subtitle: 'Presença e Imponência',
      desc: 'Cores temáticas vermelho, preto e branco que transmitem a atitude de guerreiro. Do box de crossfit ao lifestyle urbano casual.',
      badge: 'VIKING SPIRIT',
      glow: 'rgba(255, 11, 58, 0.35)',
    },
    {
      icon: <Layers className="w-10 h-10 text-white" />,
      title: 'Estampa High-Tech HD',
      subtitle: 'Não Desbota, Não Craquela',
      desc: 'Técnica de fusão térmica profunda que mantém as cores e logos vívidos mesmo após dezenas de lavagens e treinos com suor pesado.',
      badge: 'ULTRA DURABILIDADE',
      glow: 'rgba(255, 255, 255, 0.2)',
    },
    {
      icon: <Scissors className="w-10 h-10 text-njal-red" />,
      title: 'Confecção Própria & B2B',
      subtitle: 'Sua Marca, Nossa Forja',
      desc: 'Produzimos uniformes e linhas exclusivas para seu box, equipe de Jiu-Jitsu ou academia com padrão premium e envio nacional.',
      badge: 'SOB MEDIDA',
      glow: 'rgba(255, 11, 58, 0.35)',
    },
  ];

  return (
    <section id="tecnologia" className="relative py-28 bg-njal-bg overflow-hidden">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-1/3 left-0 w-96 h-96 bg-njal-red/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 right-0 w-96 h-96 bg-njal-red/10 rounded-full blur-[130px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Motion Reveal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-njal-dark border border-njal-red/30 clip-chamfer mb-4">
              <Sparkles className="w-3.5 h-3.5 text-njal-red" />
              <span className="font-display text-xs font-black tracking-widest text-njal-red uppercase">
                ENGENHARIA TÊXTIL DE GUERRA
              </span>
            </div>
            <h2 className="font-heading text-5xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none">
              TECNOLOGIA QUE <br />
              <span className="text-njal-red text-glow-red">RESISTE AO SEU LIMITE.</span>
            </h2>
          </div>

          <p className="text-njal-gray max-w-md text-sm sm:text-base leading-relaxed">
            Cada detalhe, cada fibra e cada costura foi milimetricamente desenhada para aguentar barras olímpicas, atrito de tatame e suor sem perder a estrutura imponente.
          </p>
        </div>

        {/* 6 Giant Animated Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlowCard glowColor={item.glow} className="p-8 h-full flex flex-col justify-between">
                <div>
                  {/* Big Animated Icon Box */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="relative flex items-center justify-center h-20 w-20 bg-njal-dark border border-njal-border clip-chamfer group-hover:border-njal-red transition-all duration-300">
                      {/* Pulse ring */}
                      <div className="absolute inset-0 bg-njal-red/10 animate-pulse-glow" />
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="relative z-10"
                      >
                        {item.icon}
                      </motion.div>
                    </div>

                    <span className="font-display text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-njal-dark border border-njal-border text-njal-gray group-hover:text-njal-red group-hover:border-njal-red/40 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  {/* Text */}
                  <span className="text-xs font-bold uppercase tracking-widest text-njal-red mb-1 block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-display text-xl font-black uppercase text-white tracking-wide mb-3 group-hover:text-njal-silver transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-njal-gray leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Accents */}
                <div className="mt-8 pt-4 border-t border-njal-border/50 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-njal-muted group-hover:text-white transition-colors">
                  <span>NJAL LABS // SPEC 0{index + 1}</span>
                  <ArrowUpRight className="w-4 h-4 text-njal-red transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
