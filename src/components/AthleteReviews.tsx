import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Quote, Flame } from 'lucide-react';
import { GlowCard } from './ui/GlowCard';

export const AthleteReviews: React.FC = () => {
  const reviews = [
    {
      name: 'Lucas "RX" Mendes',
      role: 'Atleta & Coach de Crossfit',
      badge: 'CROSSFIT RX',
      rating: 5,
      comment: 'Uso a camiseta RX nos treinos mais brutais com bar muscle-up e levantamento de peso. Não sobe, não assa a axila e o suor evapora instantaneamente. A melhor peça que já usei em box.',
      item: 'Camiseta NJAL RX Performance'
    },
    {
      name: 'F. Diogo (@diogolivera_02)',
      role: 'Atleta de Musculação & Heavy Lifter',
      badge: 'VALHALLA DEPT',
      rating: 5,
      comment: 'A regata cavada da NJAL entrega exatamente o que quem treina pesado precisa: cava anatômica que não limita os dorsais e tecido leve que aguenta o pump do início ao fim.',
      item: 'Regata Cavada Training Dept'
    },
    {
      name: 'Professor Rodrigo Silva',
      role: 'Faixa Preta - Templo Jiu-Jitsu',
      badge: 'FIGHTWEAR',
      rating: 5,
      comment: 'A rashguard desenvolvida com o Templo Jiu Jitsu Culture aguenta pegadas duras de No-Gi sem lacear. Protege a pele no tatame e a compressão muscular faz toda a diferença no gás.',
      item: 'Rashguard NJAL x Templo Culture'
    },
    {
      name: 'Renato B. (Owner Box Valhalla)',
      role: 'Gestor & Dono de Box',
      badge: 'CONFECÇÃO B2B',
      rating: 5,
      comment: 'Fizemos 150 uniformes para os alunos do nosso campeonato interno. O acabamento do silk, o corte e o prazo de entrega da confecção da NJAL superaram todas as expectativas.',
      item: 'Confecção Personalizada Box'
    }
  ];

  return (
    <section id="depoimentos" className="relative py-24 bg-njal-dark/90 border-t border-njal-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-njal-card border border-njal-red/40 clip-chamfer mb-3">
            <Flame className="w-3.5 h-3.5 text-njal-red" />
            <span className="font-display text-xs font-black tracking-widest text-njal-red uppercase">
              FORJADOS NA DOR // PROVA SOCIAL
            </span>
          </div>

          <h2 className="font-heading text-5xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none mb-4">
            QUEM USA, <span className="text-njal-red text-glow-red">NÃO TROCA.</span>
          </h2>

          <p className="text-njal-gray text-sm sm:text-base leading-relaxed">
            Veja o depoimento de atletas de alta performance, professores de artes marciais e gestores de box que vestem a armadura NJAL diariamente.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlowCard className="p-6 h-full flex flex-col justify-between bg-njal-card border-njal-border group">
                <div>
                  {/* Top Rating & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-njal-red gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-njal-red" />
                      ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-njal-dark border border-njal-border text-njal-red clip-badge">
                      {rev.badge}
                    </span>
                  </div>

                  {/* Quote text */}
                  <div className="relative mb-6">
                    <Quote className="w-6 h-6 text-njal-red/20 absolute -top-2 -left-2 -z-0" />
                    <p className="text-xs text-njal-silver leading-relaxed relative z-10 italic">
                      "{rev.comment}"
                    </p>
                  </div>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-njal-border/60">
                  <h4 className="font-display text-sm font-black uppercase text-white tracking-wide">
                    {rev.name}
                  </h4>
                  <span className="text-[11px] text-njal-gray block">
                    {rev.role}
                  </span>
                  <span className="text-[10px] font-bold text-njal-red uppercase tracking-wider mt-1 block">
                    {rev.item}
                  </span>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
