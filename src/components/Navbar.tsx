import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './ui/Icons';
import { MagneticButton } from './ui/MagneticButton';
import { BRAND, asset } from '../config/brand';

const NAV_LINKS = [
  { name: 'Manifesto', href: '#manifesto' },
  { name: 'Vitrine', href: '#vitrine' },
  { name: 'Lookbook', href: '#lookbook' },
  { name: 'Tecnologia', href: '#tecnologia' },
  { name: 'Depoimentos', href: '#depoimentos' },
  { name: 'A Saga', href: '#filosofia' },
  { name: 'Instagram', href: '#instagram' },
  { name: 'Confecção B2B', href: '#confeccao' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fecha o menu mobile com ESC
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-njal-bg/95 backdrop-blur-2xl border-b border-njal-red/30 py-2.5 shadow-2xl shadow-black'
          : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Identidade autêntica: monograma + wordmark + escritura oficial */}
          <a href="#" className="flex items-center gap-3 group select-none">
            <div className="relative flex items-center justify-center h-12 w-10 bg-njal-dark/90 border border-njal-red/60 clip-chamfer group-hover:border-njal-red transition-all p-1.5 shadow-lg shadow-njal-red/20">
              <img
                src={asset('/assets/njal-monogram-hd.png')}
                alt="NJAL Monograma Autêntico"
                className="h-full w-full object-contain filter drop-shadow-[0_0_8px_rgba(255,11,58,0.6)] transition-transform duration-300 group-hover:scale-110"
              />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-njal-red animate-ping" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <img
                  src={asset('/assets/njal-wordmark-hd.png')}
                  alt="NJAL Logo Original"
                  className="h-6 sm:h-7 w-auto object-contain filter drop-shadow-[0_0_10px_rgba(255,11,58,0.5)]"
                />
                <span className="text-[10px] uppercase font-heading font-black tracking-widest px-1.5 py-0.5 bg-njal-red/20 text-njal-red border border-njal-red/40 clip-badge">
                  BRASIL
                </span>
              </div>

              <div className="hidden sm:flex xl:hidden 2xl:flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
                <span className="text-white/80 font-heading tracking-wider">
                  {BRAND.slogan}
                </span>
                <span className="text-njal-red">•</span>
                <span className="text-njal-gray normal-case font-medium flex items-center gap-1">
                  <span>✌️</span> Se fala <strong className="text-white">NIJAL</strong>
                </span>
              </div>
            </div>
          </a>

          {/* Navegação desktop */}
          <nav className="hidden xl:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-display font-bold uppercase tracking-widest text-njal-silver hover:text-njal-red transition-colors relative group py-1"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-njal-red transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Ações: Instagram oficial + concierge WhatsApp */}
          <div className="flex items-center gap-3">
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-njal-card hover:bg-njal-cardHover border border-njal-border hover:border-njal-red/60 text-white rounded-none clip-chamfer transition-all text-xs font-display font-bold uppercase tracking-wider group"
              title="Acessar Instagram Oficial @njalbrasil"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-njal-red group-hover:scale-110 transition-transform" />
              <span className="text-njal-silver group-hover:text-white">{BRAND.handle}</span>
              <ArrowUpRight className="w-3 h-3 text-njal-gray group-hover:text-njal-red" />
            </a>

            <MagneticButton
              href={BRAND.whatsapp}
              target="_blank"
              variant="primary"
              size="sm"
              icon={<MessageCircle className="w-4 h-4 text-white" />}
              className="hidden md:inline-flex"
            >
              Falar no Whats
            </MagneticButton>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-njal-silver hover:text-white cursor-pointer"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Barra de progresso de leitura */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-njal-redDeep via-njal-red to-njal-redBright"
      />

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="xl:hidden overflow-hidden bg-njal-dark/98 backdrop-blur-2xl border-b border-njal-border"
          >
            <div className="flex flex-col gap-3 px-6 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-display font-bold uppercase tracking-wider text-njal-silver hover:text-njal-red transition-colors py-2 border-b border-njal-border/50"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-3 flex flex-col gap-2.5">
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-njal-red to-njal-redBright text-white font-bold uppercase tracking-wider text-xs clip-chamfer"
                >
                  <InstagramIcon className="w-4 h-4" />
                  Acessar Coleções no Instagram {BRAND.handle}
                </a>

                <a
                  href={BRAND.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-njal-card border border-njal-border text-njal-silver font-semibold text-xs uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  Falar com a NJAL no WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
