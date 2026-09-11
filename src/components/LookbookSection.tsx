import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ArrowUpRight, Flame, ShoppingBag, Eye, Zap, Sparkles } from 'lucide-react';
import { GlowCard } from './ui/GlowCard';
import { asset, whatsappLink } from '../config/brand';

interface LookbookItem {
  id: string;
  image: string;
  title: string;
  category: string;
  athlete: string;
  gear: string;
  location: string;
  tag: string;
}

export const LookbookSection: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<LookbookItem | null>(null);

  const lookbookItems: LookbookItem[] = [
    {
      id: 'look-1',
      image: asset('/assets/images/post-diogo-crossfit.jpg'),
      title: 'Alta Intensidade // WOD Mode',
      category: 'Crossfit RX',
      athlete: '@diogolivera_02',
      gear: 'Camiseta NJAL RX Black + Bermuda 4-Way Stretch',
      location: 'Box Crossfit SP',
      tag: 'DROP EXCLUSIVO'
    },
    {
      id: 'look-2',
      image: asset('/assets/images/linha-academia-casual.png'),
      title: 'Valhalla Collection // Crimson & Black',
      category: 'Streetwear & Gym',
      athlete: 'NJAL Athletic Dept',
      gear: 'Camisetas Algodão Nobre Peletizado',
      location: 'São Paulo - SP',
      tag: 'VALHALLA SERIES'
    },
    {
      id: 'look-3',
      image: asset('/assets/images/post-athlete-blacktee.jpg'),
      title: 'Corte Ergonômico // Zero Restrição',
      category: 'Linha Academia',
      athlete: 'Team NJAL',
      gear: 'Camiseta Classic Monogram Red & Black',
      location: 'Gym Training Dept',
      tag: 'MAIS VENDIDO'
    },
    {
      id: 'look-4',
      image: asset('/assets/images/diogo-regata-reel.jpg'),
      title: 'Treino de Dorsais // Cava Profunda',
      category: 'Musculação Pesada',
      athlete: '@diogolivera_02',
      gear: 'Regata Cavada Forged For Champions',
      location: 'Iron Gym',
      tag: 'BEST SELLER'
    },
    {
      id: 'look-5',
      image: asset('/assets/images/post-templo-jiujitsu.jpg'),
      title: 'Tatame & No-Gi // Parceria Oficial',
      category: 'Fightwear',
      athlete: 'Templo Jiu-Jitsu Culture',
      gear: 'Rashguard Compressão Templo x NJAL',
      location: 'R. Curupá, 328 - Anália Franco',
      tag: 'PARCERIA OFICIAL'
    },
    {
      id: 'look-6',
      image: asset('/assets/images/post-forged-dept.jpg'),
      title: 'Disciplina, Foco & Propósito',
      category: 'Lifestyle Guerreiro',
      athlete: 'Atletas Njal Brasil',
      gear: 'Linha Completa Casual & Performance',
      location: 'Brasil',
      tag: 'ORIGINAL SAGA'
    }
  ];

  return (
    <section id="lookbook" className="relative py-28 bg-black border-t border-njal-border overflow-hidden">
      {/* Red ambient spotlights */}
      <div className="pointer-events-none absolute top-10 left-10 w-[500px] h-[500px] bg-njal-red/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 w-[500px] h-[500px] bg-njal-red/10 rounded-full blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-njal-dark border border-njal-red/40 clip-chamfer mb-3">
              <Camera className="w-3.5 h-3.5 text-njal-red" />
              <span className="font-display text-xs font-black tracking-widest text-njal-red uppercase">
                LOOKBOOK EDITORIAL // FOTOS REAIS
              </span>
            </div>

            <h2 className="font-heading text-5xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none">
              A ARMADURA <br />
              <span className="text-njal-red text-glow-red">EM AÇÃO NO MUNDO REAL.</span>
            </h2>
          </div>

          <p className="text-njal-gray max-w-md text-sm sm:text-base leading-relaxed">
            Sem modelos genéricos. Aqui você vê atletas reais nos boxes de Crossfit, nos tatames e nas academias de ferro pesado vivendo a essência da NJAL.
          </p>
        </div>

        {/* Dynamic Asymmetric Lookbook Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lookbookItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden clip-chamfer bg-njal-card border border-njal-border group-hover:border-njal-red/80 transition-all duration-500 shadow-2xl">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-njal-red text-white text-[10px] font-black uppercase tracking-wider clip-badge shadow-md shadow-njal-red/50 flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    {item.tag}
                  </span>
                </div>

                {/* Authentic Monogram Watermark on Top Right */}
                <div className="absolute top-4 right-4 h-9 w-8 p-1 bg-black/60 backdrop-blur-md border border-njal-red/40 clip-chamfer flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                  <img src={asset('/assets/njal-monogram-hd.png')} alt="N" className="h-full w-full object-contain" />
                </div>

                {/* Hover Reveal Quick Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-display font-black text-xs uppercase tracking-wider clip-chamfer shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Eye className="w-4 h-4 text-njal-red" />
                    Ver Detalhes do Look
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-njal-red mb-1 block">
                    {item.category} • {item.athlete}
                  </span>
                  <h3 className="font-display text-lg font-black uppercase text-white tracking-wide leading-tight group-hover:text-njal-silver transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-xs text-njal-gray line-clamp-1 mt-1">
                    {item.gear}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal for Lookbook Details */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 w-full max-w-2xl bg-njal-dark border border-njal-red clip-chamfer p-6 sm:p-8 shadow-2xl shadow-njal-red/20 box-glow-red"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden clip-chamfer bg-black mb-6">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-bold text-njal-red uppercase tracking-widest block">
                      {selectedItem.category}
                    </span>
                    <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase text-white">
                      {selectedItem.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 mb-6 text-sm text-njal-silver">
                  <div>
                    <strong className="text-white uppercase font-display text-xs">Peças Utilizadas: </strong>
                    <span>{selectedItem.gear}</span>
                  </div>
                  <div>
                    <strong className="text-white uppercase font-display text-xs">Atleta / Referência: </strong>
                    <span className="text-njal-red font-bold">{selectedItem.athlete}</span>
                  </div>
                  <div>
                    <strong className="text-white uppercase font-display text-xs">Ponto / Local: </strong>
                    <span>{selectedItem.location}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={whatsappLink(`Olá NJAL! Vi o look "${selectedItem.title}" no site e gostaria de saber sobre as peças.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 bg-njal-red hover:bg-njal-redDeep text-white text-xs font-black uppercase tracking-widest clip-chamfer text-center shadow-lg shadow-njal-red/40"
                  >
                    Pedir Este Look no WhatsApp
                  </a>

                  <button
                    onClick={() => setSelectedItem(null)}
                    className="py-3 px-6 bg-njal-card border border-njal-border text-white text-xs font-black uppercase tracking-widest clip-chamfer hover:bg-njal-cardHover"
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};