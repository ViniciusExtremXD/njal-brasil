import React from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowUpRight, MessageCircle, Sparkles, ShieldCheck, Dumbbell, Swords, Factory } from 'lucide-react';
import { InstagramIcon } from './ui/Icons';
import { GlowCard } from './ui/GlowCard';
import { BRAND, asset, whatsappLink } from '../config/brand';

interface ExemplarDrop {
  id: string;
  dropNumber: string;
  title: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  highlightSpecs: string[];
  instagramLink: string;
  whatsappMessage: string;
}

export const CollectionShowcase: React.FC = () => {
  const drops: ExemplarDrop[] = [
    {
      id: 'drop-01',
      dropNumber: 'DROP 01',
      title: 'Linha Crossfit RX Performance',
      category: 'ALTA INTENSIDADE // WOD MODE',
      tag: 'CROSSFIT RX',
      image: asset('/assets/images/post-diogo-crossfit.jpg'),
      description: 'Tecnologia 4-Way Stretch ultra-respirável com costuras reforçadas flatlock. Desenhada para não subir nos burpees, muscle-ups e levantamentos olímpicos pesados.',
      highlightSpecs: ['4-Way Stretch Dry-Tech', 'Costuras Anti-Assadura', 'Monograma N Refletivo'],
      instagramLink: BRAND.instagram,
      whatsappMessage: 'Olá NJAL! Vi o exemplar da Linha Crossfit RX no site e gostaria de saber sobre disponibilidade de tamanhos.',
    },
    {
      id: 'drop-02',
      dropNumber: 'DROP 02',
      title: 'Valhalla Series Crimson & Noir',
      category: 'STREETWEAR & MUSCULAÇÃO PESADA',
      tag: 'VALHALLA EDITION',
      image: asset('/assets/images/linha-academia-casual.png'),
      description: 'Inspirada nas sagas nórdicas e na mente dos guerreiros que treinam até o limite. Algodão nobre peletizado com corte imponente que valoriza peitoral e dorsais.',
      highlightSpecs: ['100% Algodão 30.1 Peletizado', 'Gola Encorpada Anti-Deformação', 'Silk Industrial HD'],
      instagramLink: BRAND.instagram,
      whatsappMessage: 'Olá NJAL! Gostei muito da Camiseta Valhalla Series Crimson. Como faço para pedir?',
    },
    {
      id: 'drop-03',
      dropNumber: 'DROP 03',
      title: 'Rashguard Templo Jiu-Jitsu Culture',
      category: 'TATAME & NO-GI FIGHTWEAR',
      tag: 'PARCERIA OFICIAL',
      image: asset('/assets/images/post-templo-jiujitsu.jpg'),
      description: 'Colaboração oficial com o Templo Jiu-Jitsu Culture (Anália Franco - SP). Desenvolvida para resistir a puxões violentos, proteger a pele e oferecer compressão anatômica no rola.',
      highlightSpecs: ['Compressão Muscular 6-Fios', 'Grip de Silicone Interno', 'Proteção Térmica UV50+'],
      instagramLink: BRAND.instagram,
      whatsappMessage: 'Olá NJAL! Tenho interesse na Rashguard da colaboração com o Templo Jiu-Jitsu.',
    },
    {
      id: 'drop-04',
      dropNumber: 'DROP 04',
      title: 'Streetwear Oversized Signature',
      category: 'LIFESTYLE GUERREIRO URBANO',
      tag: 'DROP EXCLUSIVO',
      image: asset('/assets/images/para-quem-e-a-njal.png'),
      description: 'A expressão máxima do lifestyle NJAL fora dos boxes e academias. Modelagem moderna com ombros caídos e tecido de alta gramatura que impõe presença onde quer que você vá.',
      highlightSpecs: ['Gramatura Heavyweight 230g', 'Gola Canelada Gringo 3.2cm', 'Acabamento Militar Premium'],
      instagramLink: BRAND.instagram,
      whatsappMessage: 'Olá NJAL! Quero informações sobre a Camiseta Oversized Signature.',
    },
    {
      id: 'drop-05',
      dropNumber: 'DROP 05',
      title: 'Confecção Própria B2B Sob Medida',
      category: 'UNIFORMES & EQUIPES',
      tag: 'NOSSA FORJA, SUA MARCA',
      image: asset('/assets/images/post-confeccao-portfolio.jpg'),
      description: 'Desenvolvemos a linha oficial de roupas para o seu box de Crossfit, academia ou time de artes marciais. Cuidamos do corte, modelagem e estamparia industrial a partir de 20 peças.',
      highlightSpecs: ['Mínimo 20 Peças', 'Silk, DTF e Bordado', 'Entrega para todo o Brasil'],
      instagramLink: BRAND.instagram,
      whatsappMessage: 'Olá NJAL! Gostaria de um orçamento para confecção personalizada de uniformes para minha equipe.',
    },
  ];

  return (
    <section id="vitrine" className="relative py-28 bg-njal-bg overflow-hidden border-t border-njal-border">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute top-10 right-0 w-[500px] h-[500px] bg-njal-red/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute bottom-10 left-0 w-[500px] h-[500px] bg-njal-red/10 rounded-full blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-njal-dark border border-njal-red/40 clip-chamfer mb-4">
              <Sparkles className="w-3.5 h-3.5 text-njal-red" />
              <span className="font-display text-xs font-black tracking-widest text-njal-red uppercase">
                VITRINE EDITORIAL // DROPS EM DESTAQUE
              </span>
            </div>

            <h2 className="font-heading text-5xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none">
              EXEMPLARES <br />
              <span className="text-njal-red text-glow-red">DA FORJA NJAL.</span>
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-njal-gray text-sm sm:text-base leading-relaxed mb-3">
              Não operamos como uma loja comum com estoques massivos. Nossos drops são limitados e as coleções completas são reveladas em primeira mão em nosso Instagram oficial.
            </p>
            <div className="flex items-center gap-2 text-xs font-display font-black tracking-widest text-njal-red uppercase">
              <span>DROPS EXCLUSIVOS</span>
              <span>•</span>
              <span>ACOMPANHE NO INSTAGRAM</span>
            </div>
          </div>
        </div>

        {/* Exemplar Drops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {drops.map((drop, index) => (
            <motion.div
              key={drop.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlowCard className="p-0 overflow-hidden h-full flex flex-col justify-between bg-njal-card border-njal-border group shadow-2xl">
                
                {/* Visual Image Showcase */}
                <div className="relative aspect-[4/4] w-full overflow-hidden bg-black">
                  <img
                    src={drop.image}
                    alt={drop.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

                  {/* Top Badge & Watermark */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-2.5 py-1 bg-njal-red text-white text-[10px] font-black uppercase tracking-wider clip-badge shadow-md shadow-njal-red/60">
                      {drop.tag}
                    </span>

                    <div className="h-9 w-8 p-1 bg-black/80 backdrop-blur-md border border-njal-red/50 clip-chamfer flex items-center justify-center">
                      <img src={asset('/assets/njal-monogram-hd.png')} alt="N" className="h-full w-full object-contain" />
                    </div>
                  </div>

                  {/* Drop Number Floating */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-display font-black tracking-widest text-njal-red uppercase block">
                      {drop.dropNumber}
                    </span>
                    <h3 className="font-heading text-2xl font-black uppercase text-white tracking-wide leading-tight">
                      {drop.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-njal-red mb-2 block">
                      {drop.category}
                    </span>
                    
                    <p className="text-xs text-njal-gray leading-relaxed mb-5">
                      {drop.description}
                    </p>

                    {/* Specs Pill List */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {drop.highlightSpecs.map((spec) => (
                        <span
                          key={spec}
                          className="px-2.5 py-1 bg-njal-dark border border-njal-border text-[10px] font-bold uppercase tracking-wider text-njal-silver"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Direct to Instagram & WhatsApp */}
                  <div className="pt-4 border-t border-njal-border/60 flex flex-col gap-2">
                    <a
                      href={drop.instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-njal-red to-njal-redBright hover:from-njal-redDeep hover:to-njal-red text-white text-xs font-black uppercase tracking-wider clip-chamfer flex items-center justify-center gap-2 transition-all shadow-md shadow-njal-red/30 cursor-pointer"
                    >
                      <InstagramIcon className="w-4 h-4 text-white" />
                      <span>Ver Peça no Instagram</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={whatsappLink(drop.whatsappMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-4 bg-njal-dark hover:bg-njal-cardHover border border-njal-border hover:border-njal-red/40 text-njal-silver hover:text-white text-[11px] font-bold uppercase tracking-wider clip-chamfer flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Consultar no WhatsApp</span>
                    </a>
                  </div>

                </div>

              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Global Instagram Redirection Notice Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 bg-gradient-to-br from-njal-dark via-black to-njal-dark border border-njal-red/60 clip-chamfer relative overflow-hidden box-glow-red"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border border-njal-red/40 text-xs font-display font-black tracking-widest text-njal-red uppercase mb-4">
                <InstagramIcon className="w-3.5 h-3.5 text-njal-red" />
                <span>CANAL OFICIAL DE DROPS & LANÇAMENTOS</span>
              </div>

              <h3 className="font-heading text-4xl sm:text-5xl font-black uppercase text-white tracking-tight leading-none mb-4">
                TODOS OS DROPS SÃO LANÇADOS NO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-njal-red via-njal-redBright to-white text-glow-red">
                  INSTAGRAM OFICIAL @NJALBRASIL
                </span>
              </h3>

              <p className="text-sm sm:text-base text-njal-silver max-w-2xl leading-relaxed">
                Não mantemos estoque infinito. Cada nova coleção é apresentada com fotos detalhadas, enquetes e abertura de pedidos diretamente pelo direct e stories do Instagram. Siga a comunidade para não ficar sem sua peça.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 bg-njal-red hover:bg-njal-redDeep text-white font-display text-xs font-black uppercase tracking-widest clip-chamfer text-center shadow-xl shadow-njal-red/50 flex items-center justify-center gap-2"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
                <span>Seguir @njalbrasil no Instagram</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href={whatsappLink('Olá NJAL! Vim pela vitrine do site e gostaria de saber como adquirir as peças.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-6 bg-njal-card hover:bg-njal-cardHover border border-njal-border hover:border-njal-red/40 text-white font-display text-xs font-bold uppercase tracking-wider clip-chamfer text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-njal-red" />
                <span>Pedir Catálogo no WhatsApp</span>
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
