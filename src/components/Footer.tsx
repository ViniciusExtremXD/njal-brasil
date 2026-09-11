import React from 'react';
import { MessageCircle, MapPin, ArrowUp, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './ui/Icons';
import { BRAND, asset } from '../config/brand';

const NAV_LINKS = [
  { label: 'O Manifesto da Marca', href: '#manifesto' },
  { label: 'Vitrine de Drops', href: '#vitrine' },
  { label: 'Lookbook dos Atletas', href: '#lookbook' },
  { label: 'Engenharia Têxtil', href: '#tecnologia' },
  { label: 'A Saga NJAL & Valhalla', href: '#filosofia' },
  { label: 'Feed & Reels @njalbrasil', href: '#instagram' },
  { label: 'Confecção Sob Medida B2B', href: '#confeccao' },
];

const LINES = [
  'Linha Crossfit RX',
  'Linha Valhalla Heavy',
  'Streetwear Oversized',
  'Jiu-Jitsu Fightwear',
  'Uniformes Personalizados',
];

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-njal-border pt-16 pb-12 overflow-hidden text-njal-gray">
      {/* Fio de luz vermelha no topo */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-njal-red to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-njal-border/70">

          {/* Identidade da marca */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-10 bg-njal-dark border border-njal-red clip-chamfer flex items-center justify-center p-1.5 shadow-lg shadow-njal-red/25">
                <img
                  src={asset('/assets/njal-monogram-hd.png')}
                  alt="Monograma NJAL"
                  className="h-full w-full object-contain filter drop-shadow-[0_0_8px_rgba(255,11,58,0.7)]"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <img
                    src={asset('/assets/njal-wordmark-hd.png')}
                    alt="NJAL BRASIL"
                    className="h-7 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(255,11,58,0.5)]"
                  />
                  <span className="text-[10px] font-heading font-black tracking-widest px-1.5 py-0.5 bg-njal-red/20 text-njal-red border border-njal-red/40 clip-badge">
                    BRASIL
                  </span>
                </div>
                <span className="text-[10px] font-bold text-njal-red block tracking-widest uppercase mt-1">
                  {BRAND.slogan}
                </span>
              </div>
            </div>

            <p className="text-xs text-njal-gray max-w-sm mb-4 leading-relaxed">
              Marca brasileira de vestuário de alta performance para atletas de Crossfit RX,
              musculação pesada até Valhalla, tatame de Jiu-Jitsu e lifestyle autêntico.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-njal-dark border border-njal-border clip-chamfer text-xs text-njal-silver mb-6">
              <span>✌️</span> Se fala <strong className="text-white">NIJAL</strong>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={BRAND.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center bg-njal-card border border-njal-border hover:border-njal-red hover:text-white transition-colors clip-chamfer"
                title="Instagram @njalbrasil"
              >
                <InstagramIcon className="w-4 h-4 text-njal-red" />
              </a>

              <a
                href={BRAND.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center bg-njal-card border border-njal-border hover:border-njal-red hover:text-white transition-colors clip-chamfer"
                title="WhatsApp Oficial"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-display text-xs font-black uppercase tracking-widest text-white mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-njal-red transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Linhas oficiais */}
          <div>
            <h4 className="font-display text-xs font-black uppercase tracking-widest text-white mb-4">
              Linhas Oficiais
            </h4>
            <ul className="space-y-2.5 text-xs">
              {LINES.map((line) => (
                <li key={line} className="flex items-center gap-1.5 text-njal-silver">
                  <span className="h-1 w-1 bg-njal-red rounded-full" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Ponto físico + canal oficial */}
          <div>
            <h4 className="font-display text-xs font-black uppercase tracking-widest text-white mb-4">
              Ponto Físico Parceiro
            </h4>
            <div className="p-3.5 bg-njal-dark border border-njal-border clip-chamfer space-y-2 text-xs mb-4">
              <div className="flex items-start gap-2 text-njal-silver">
                <MapPin className="w-4 h-4 text-njal-red shrink-0 mt-0.5" />
                <span>
                  <strong>{BRAND.storePoint.name}</strong>
                  <br />
                  {BRAND.storePoint.street}
                  <br />
                  {BRAND.storePoint.city}
                </span>
              </div>
              <span className="text-[10px] font-bold text-njal-muted block">
                Disponível para pronta-entrega na recepção.
              </span>
            </div>

            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 bg-njal-red hover:bg-njal-redDeep text-white text-[11px] font-black uppercase tracking-widest clip-chamfer flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-njal-red/30"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Ver os Drops</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Barra inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-njal-muted text-center sm:text-left">
            © 2026 NJAL Brasil. Todos os direitos reservados. {BRAND.slogan}.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 bg-njal-card hover:bg-njal-cardHover border border-njal-border text-white text-xs font-bold uppercase tracking-wider clip-chamfer transition-colors cursor-pointer"
          >
            <span>Voltar ao Topo</span>
            <ArrowUp className="w-3.5 h-3.5 text-njal-red" />
          </button>
        </div>
      </div>
    </footer>
  );
};
