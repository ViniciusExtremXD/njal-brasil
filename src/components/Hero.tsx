import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ArrowRight, MessageCircle, Dumbbell, ShieldCheck, Swords, Sparkles, ChevronRight, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './ui/Icons';
import { MagneticButton } from './ui/MagneticButton';
import { FloatingBadge } from './ui/FloatingBadge';
import { BRAND, asset } from '../config/brand';

export const Hero: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const athleteSlides = [
    {
      id: 'para-quem',
      title: 'PARA QUEM É A NJAL',
      subtitle: 'MANIFESTO OFICIAL // 2026',
      tag: 'DROP EXCLUSIVO',
      image: asset('/assets/images/para-quem-e-a-njal.png'),
      statLabel: 'CONSTRUÇÃO',
      statValue: 'HEAVYWEIGHT',
      caption: 'Modelagem brutal e atitude inegociável dentro e fora do treino.',
      badgeTitle: 'Até Chegar em Valhalla',
      badgeSubtitle: 'Estilo nórdico & streetwear',
      badgeIcon: <Flame className="w-5 h-5 text-njal-red" />,
      accent: 'red' as const,
    },
    {
      id: 'crossfit-rx',
      title: 'LINHA CROSSFIT RX',
      subtitle: 'ATLETA @DIOGOLIVERA_02',
      tag: 'ALTA PERFORMANCE',
      image: asset('/assets/images/post-diogo-crossfit.jpg'),
      statLabel: 'WOD INTENSITY',
      statValue: '100% RX READY',
      caption: '4-Way Stretch ultra-respirável testado nos treinos mais implacáveis.',
      badgeTitle: 'Linha Crossfit RX',
      badgeSubtitle: 'Alta flexibilidade e zero assaduras',
      badgeIcon: <Dumbbell className="w-5 h-5 text-white" />,
      accent: 'silver' as const,
    },
    {
      id: 'valhalla-black',
      title: 'VALHALLA TRAINING DEPT',
      subtitle: 'DISCIPLINA & CONSTÂNCIA',
      tag: 'MAIS VENDIDO',
      image: asset('/assets/images/post-athlete-blacktee.jpg'),
      statLabel: 'TECNOLOGIA',
      statValue: 'ANTI-ODOR PERMANENTE',
      caption: 'Algodão nobre peletizado com corte ergonômico que não limita dorsais.',
      badgeTitle: 'Armadura Diária',
      badgeSubtitle: 'Corte anatômico & presença brutal',
      badgeIcon: <ShieldCheck className="w-5 h-5 text-njal-red" />,
      accent: 'red' as const,
    },
    {
      id: 'jiujitsu-fightwear',
      title: 'FIGHTWEAR // TATAME NO-GI',
      subtitle: 'NJAL x TEMPLO JIU-JITSU CULTURE',
      tag: 'PARCERIA OFICIAL',
      image: asset('/assets/images/post-templo-jiujitsu.jpg'),
      statLabel: 'COMPRESSÃO',
      statValue: 'FIGHT PRO 6-FIOS',
      caption: 'Resistência extrema a pegadas, atrito de tatame e puxões agressivos.',
      badgeTitle: 'Templo Jiu-Jitsu',
      badgeSubtitle: 'Colaboração oficial Anália Franco SP',
      badgeIcon: <Swords className="w-5 h-5 text-white" />,
      accent: 'silver' as const,
    }
  ];

  const currentSlide = athleteSlides[activeSlide];

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-radial-vignette bg-tech-grid">
      {/* Ambient Red Glow Beams */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-njal-red/20 rounded-full blur-[150px]" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[600px] h-[600px] bg-njal-red/15 rounded-full blur-[170px]" />
      <div className="pointer-events-none absolute bottom-0 -left-40 w-[500px] h-[500px] bg-njal-red/10 rounded-full blur-[140px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Authentic Brand Identity, Brutalist Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Top Official Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-njal-dark/95 border border-njal-red/50 clip-chamfer mb-6 backdrop-blur-md shadow-lg shadow-njal-red/20"
            >
              <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-njal-red opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-njal-red" />
              </div>
              <span className="font-display text-xs font-black tracking-widest text-njal-red uppercase">
                NJAL BRASIL • VITRINE OFICIAL
              </span>
              <span className="text-njal-borderLight">|</span>
              <span className="text-xs font-semibold text-njal-silver flex items-center gap-1.5">
                <span className="text-white text-sm">✌️</span> Se fala <strong className="text-white tracking-wide">NIJAL</strong>
              </span>
            </motion.div>

            {/* Authentic Brand Header Display: Exact Wordmark + Scripture */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-8 bg-njal-dark border border-njal-red clip-chamfer p-1 flex items-center justify-center shadow-md shadow-njal-red/30">
                  <img
                    src={asset('/assets/njal-monogram-hd.png')}
                    alt="NJAL"
                    className="h-full w-full object-contain filter drop-shadow-[0_0_8px_rgba(255,11,58,0.7)]"
                  />
                </div>
                <img
                  src={asset('/assets/njal-wordmark-hd.png')}
                  alt="NJAL BRASIL"
                  className="h-9 sm:h-11 md:h-12 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(255,11,58,0.6)]"
                />
              </div>

              {/* Giant Brutalist Headline */}
              <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.88] text-white">
                PARA QUEM É <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-njal-red via-njal-redBright to-white text-glow-red">
                  A NJAL.
                </span>
              </h1>
            </div>

            {/* Authentic Scripture Subtitle */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-black font-display tracking-widest text-njal-red uppercase mb-3">
                <span>FORGED FOR CHAMPIONS</span>
                <span>•</span>
                <span>ATÉ CHEGAR EM VALHALLA</span>
              </div>
              <p className="text-base sm:text-lg text-njal-gray max-w-xl leading-relaxed font-normal">
                Muito mais que roupas de treino: uma armadura para os que não aceitam desculpas. Conheça nossa história, o manifesto de guerra e acompanhe os drops exclusivos diretamente no Instagram oficial.
              </p>
            </div>

            {/* Dynamic CTAs - Shifted to Instagram & Brand Experience */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <MagneticButton
                href={BRAND.instagram}
                target="_blank"
                variant="primary"
                size="lg"
                icon={<ArrowUpRight className="w-5 h-5 text-white" />}
                className="w-full sm:w-auto shadow-xl shadow-njal-red/30"
              >
                Acompanhar Drops no Instagram
              </MagneticButton>

              <MagneticButton
                href="#vitrine"
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5 text-njal-red" />}
                className="w-full sm:w-auto"
              >
                Conhecer a Vitrine
              </MagneticButton>

              <a
                href="#manifesto"
                className="inline-flex items-center gap-2 text-xs font-display font-black uppercase tracking-widest text-njal-silver hover:text-njal-red transition-colors py-2 px-1"
              >
                <span>Ler Nosso Manifesto</span>
                <ChevronRight className="w-4 h-4 text-njal-red" />
              </a>
            </div>

            {/* Quick Specs & Community Proof Bar */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-njal-border/70 w-full max-w-lg">
              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-black text-white flex items-center gap-1">
                  +2.000
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-njal-gray">
                  Atletas na Comunidade
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-black text-njal-red flex items-center gap-1">
                  DROPS
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-njal-gray">
                  Lotes Limitados
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl font-black text-white flex items-center gap-1">
                  100%
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-njal-gray">
                  Confecção Própria B2B
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Multi-Athlete Interactive Editorial Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
          >
            {/* Visual Frame Container */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-none clip-chamfer border border-njal-border bg-gradient-to-b from-njal-dark to-black p-2.5 box-glow-red group">
              
              {/* Image Container with Animated Switch */}
              <div className="relative w-full h-full overflow-hidden clip-chamfer bg-black">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide.id}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full object-cover object-center filter brightness-95 contrast-110"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-njal-red/5 mix-blend-overlay" />

                {/* Top Overlay: Authentic Watermark & Tag */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 bg-njal-red text-white text-[10px] font-black uppercase tracking-wider clip-badge shadow-md shadow-njal-red/60 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {currentSlide.tag}
                  </span>

                  <div className="h-10 w-9 p-1 bg-black/80 backdrop-blur-md border border-njal-red/60 clip-chamfer flex items-center justify-center">
                    <img
                      src={asset('/assets/njal-monogram-hd.png')}
                      alt="N"
                      className="h-full w-full object-contain filter drop-shadow-[0_0_6px_rgba(255,11,58,0.7)]"
                    />
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-njal-red">
                    {currentSlide.subtitle}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-black uppercase text-white tracking-wider leading-tight mb-1">
                    {currentSlide.title}
                  </h3>
                  <p className="text-xs text-njal-silver leading-tight line-clamp-2">
                    {currentSlide.caption}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[11px]">
                    <span className="font-bold text-njal-gray uppercase tracking-wider">
                      {currentSlide.statLabel}
                    </span>
                    <span className="font-black text-white font-display tracking-widest">
                      {currentSlide.statValue}
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Dynamic Badge */}
              <FloatingBadge
                title={currentSlide.badgeTitle}
                subtitle={currentSlide.badgeSubtitle}
                icon={currentSlide.badgeIcon}
                className="-top-6 -right-2 max-w-[15rem] hidden sm:flex z-20"
                delay={0.2}
                duration={3.8}
                accent={currentSlide.accent}
              />

              {/* Glowing Corner Accents */}
              <div className="absolute -top-2 -left-2 h-6 w-6 border-t-2 border-l-2 border-njal-red" />
              <div className="absolute -bottom-2 -right-2 h-6 w-6 border-b-2 border-r-2 border-njal-red" />
            </div>

            {/* Interactive Athlete Switcher Thumbnails */}
            <div className="flex items-center gap-2.5 mt-4 w-full max-w-md justify-center">
              {athleteSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(idx)}
                  className={`relative flex-1 h-14 overflow-hidden clip-chamfer border transition-all cursor-pointer ${
                    activeSlide === idx
                      ? 'border-njal-red ring-2 ring-njal-red/50 scale-105 opacity-100'
                      : 'border-njal-border opacity-50 hover:opacity-80'
                  }`}
                  title={slide.title}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] font-black uppercase tracking-wider text-white truncate text-center">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
