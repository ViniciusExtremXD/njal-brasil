import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swords, CheckCircle2, ChevronRight } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';
import { asset } from '../config/brand';

export const BrandPhilosophy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const pillars = [
    {
      id: 'crossfit',
      title: '01. Linha Crossfit RX',
      motto: 'PARA QUEM NÃO ACEITA SER ESCALONADO',
      subtitle: 'Feito para aguentar WODs sem piedade',
      desc: 'No Crossfit, cada segundo conta e cada repetição cobra seu preço. Nossas bermudas e camisetas foram construídas com elasticidade multidirecional para que você execute snatches, cleans, pistols e muscle-ups com zero restrição de movimento.',
      image: asset('/assets/images/post-diogo-crossfit.jpg'),
      quote: 'Bermudas, camisetas e acessórios de alta qualidade e melhor desempenho para você ser um RX.',
      tags: ['Dry-Tech', 'Alta Flexibilidade', 'Zero Assadura']
    },
    {
      id: 'valhalla',
      title: '02. Academia & Valhalla',
      motto: 'ATÉ CHEGAR EM VALHALLA',
      subtitle: 'A atitude dos guerreiros modernos',
      desc: 'Inspirada nas sagas nórdicas e no espírito inquebrantável dos guerreiros que lutavam até o fim. Peças com visual dark imponente, algodão de toque nobre e cortes que valorizam a musculatura construída com disciplina e ferro pesado.',
      image: asset('/assets/images/linha-academia-casual.png'),
      quote: 'Seja nos treinos pesados até chegar em Valhalla ou no seu dia a dia, nossa linha está incrível.',
      tags: ['Heavyweight', 'Nórdico', 'Presença Brutal']
    },
    {
      id: 'lifestyle',
      title: '03. Streetwear & Casual',
      motto: 'VISTA SUA JORNADA. VIVA SEU PROPÓSITO.',
      subtitle: 'A mentalidade de campeão 24/7',
      desc: 'Sua atitude de treino não termina quando você sai do box ou da academia. A linha casual da NJAL une caimento oversized premium com design minimalista futurista para que você represente sua jornada onde quer que esteja.',
      image: asset('/assets/images/para-quem-e-a-njal.png'),
      quote: 'Desempenho • Disciplina • Foco • Estilo. Vista sua jornada e viva seu propósito.',
      tags: ['Streetwear', 'Oversized', 'Identidade Marcante']
    }
  ];

  return (
    <section id="filosofia" className="relative py-28 bg-njal-dark/80 border-y border-njal-border overflow-hidden">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute -bottom-20 left-1/4 w-[600px] h-[600px] bg-njal-red/10 rounded-full blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-njal-card border border-njal-red/40 clip-chamfer mb-4">
            <Swords className="w-4 h-4 text-njal-red" />
            <span className="font-display text-xs font-black tracking-widest text-njal-red uppercase">
              A SAGA NJAL // ESPÍRITO GUERREIRO
            </span>
          </div>

          <h2 className="font-heading text-5xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none mb-6">
            NÃO SÃO APENAS ROUPAS. <br />
            <span className="text-njal-red text-glow-red">SÃO ARMADURAS DE TREINO.</span>
          </h2>

          <p className="text-njal-gray text-base sm:text-lg leading-relaxed">
            O nome <strong>NJAL</strong> carrega séculos de história, honra e resistência das antigas sagas. Forjamos cada peça para atletas que não buscam facilidades — mas sim superação a cada gota de suor.
          </p>
        </div>

        {/* Interactive Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {pillars.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(idx)}
              className={`px-6 py-3 font-display text-sm font-black uppercase tracking-wider transition-all duration-300 clip-chamfer cursor-pointer flex items-center gap-2 ${
                activeTab === idx
                  ? 'bg-njal-red text-white shadow-lg shadow-njal-red/40 border border-njal-redBright'
                  : 'bg-njal-card text-njal-gray border border-njal-border hover:text-white hover:border-njal-red/40'
              }`}
            >
              <span>{item.title}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="bg-njal-card/90 border border-njal-border clip-chamfer p-6 sm:p-10 lg:p-12 box-glow-red">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              {/* Left Column: Text & Quote */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="font-display text-xs font-black tracking-widest text-njal-red uppercase mb-2 block">
                  {pillars[activeTab].subtitle}
                </span>

                <h3 className="font-heading text-4xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight mb-4">
                  {pillars[activeTab].motto}
                </h3>

                <p className="text-njal-gray text-base leading-relaxed mb-6">
                  {pillars[activeTab].desc}
                </p>

                {/* Quote Box with Red Border */}
                <div className="relative pl-5 py-3 border-l-4 border-njal-red bg-njal-dark/80 mb-6 clip-chamfer">
                  <p className="text-sm font-semibold italic text-white leading-relaxed">
                    "{pillars[activeTab].quote}"
                  </p>
                  <span className="text-[11px] font-bold text-njal-red uppercase tracking-wider mt-1 block">
                    — @NJALBRASIL NO INSTAGRAM
                  </span>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {pillars[activeTab].tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-njal-dark border border-njal-border text-xs font-bold uppercase tracking-wider text-njal-silver"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-njal-red" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div>
                  <MagneticButton
                    href="#catalogo"
                    variant="primary"
                    size="md"
                    icon={<ChevronRight className="w-4 h-4 text-white" />}
                  >
                    Ver Produtos Desta Linha
                  </MagneticButton>
                </div>
              </div>

              {/* Right Column: Visual Showcase */}
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/4] sm:aspect-[4/3] lg:aspect-[4/4] max-w-md mx-auto overflow-hidden clip-chamfer border border-njal-border/80 bg-black group shadow-2xl">
                  <img
                    src={pillars[activeTab].image}
                    alt={pillars[activeTab].title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  {/* Authentic Monogram Emblem */}
                  <div className="absolute top-4 right-4 h-11 w-9 p-1 bg-njal-dark/95 border border-njal-red clip-chamfer flex items-center justify-center shadow-lg shadow-njal-red/40">
                    <img src={asset('/assets/njal-monogram-hd.png')} alt="Njal" className="h-full w-full object-contain" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-njal-silver">
                    <span>NJAL // SAGA COLLECTION</span>
                    <span className="text-njal-red">ORIGINAL ASSET</span>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
