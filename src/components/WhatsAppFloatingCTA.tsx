import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { whatsappLink } from '../config/brand';

export const WhatsAppFloatingCTA: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-end gap-3 select-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="hidden sm:flex items-center gap-3 p-3.5 bg-njal-dark/95 border border-njal-red/60 text-white rounded-none clip-chamfer shadow-2xl backdrop-blur-md max-w-xs box-glow-red"
          >
            <div className="flex flex-col">
              <span className="font-display text-[11px] font-black uppercase text-njal-red flex items-center gap-1.5 mb-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ATENDIMENTO NJAL ONLINE
              </span>
              <p className="text-xs text-njal-silver leading-snug">
                Dúvidas de tamanho ou quer pedir direto? Fale com a gente no WhatsApp! ⚡
              </p>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="p-1 text-njal-muted hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing Floating Button */}
      <a
        href={whatsappLink('Olá NJAL! Vim pelo site e gostaria de tirar uma dúvida sobre as peças.')}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group flex items-center justify-center h-14 w-14 rounded-none clip-chamfer bg-gradient-to-tr from-njal-red to-njal-redBright text-white shadow-2xl shadow-njal-red/60 transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        title="Falar no WhatsApp da NJAL"
      >
        {/* Radar Ring */}
        <span className="absolute inset-0 rounded-none clip-chamfer bg-njal-red opacity-70 animate-ping -z-10" />

        <MessageCircle className="w-7 h-7 fill-white/20 text-white" />
      </a>
    </div>
  );
};
