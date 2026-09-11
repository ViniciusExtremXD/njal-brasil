import React from 'react';

const PRIMARY_ITEMS = [
  'FORGED FOR CHAMPIONS',
  'ATÉ CHEGAR EM VALHALLA',
  'CROSSFIT RX',
  'JIU-JITSU FIGHTWEAR',
  'PARA QUEM É A NJAL',
  'NJAL TRAINING DEPT',
];

const SECONDARY_ITEMS = [
  'NÃO SÃO APENAS ROUPAS. SÃO ARMADURAS DE TREINO.',
  '✌️ SE FALA NIJAL',
  'DROPS LIMITADOS ANUNCIADOS NO INSTAGRAM',
  'ATENDIMENTO DIRETO NO WHATSAPP',
  'LINHA JIU-JITSU CULTURE',
  'NOSSA CONFECÇÃO. SUA IDEIA.',
  'ENTREGA EM TODO O BRASIL',
];

export const MarqueeTicker: React.FC = () => {
  return (
    <div className="relative z-20 overflow-hidden py-6 -my-4 select-none">
      {/* Fita superior: vermelho de alta voltagem */}
      <div className="relative -rotate-1 bg-njal-red text-black py-3.5 shadow-xl shadow-njal-red/30 overflow-hidden">
        <div className="flex w-fit whitespace-nowrap animate-marquee">
          {[...PRIMARY_ITEMS, ...PRIMARY_ITEMS, ...PRIMARY_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 mx-4">
              <span className="font-heading font-black text-2xl sm:text-3xl tracking-wider uppercase">
                {item}
              </span>
              <span className="font-heading font-black text-2xl text-black/50">//</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fita inferior: obsidiana com pulsos vermelhos */}
      <div className="relative rotate-1 bg-njal-dark/95 border-y border-njal-border py-2.5 shadow-lg overflow-hidden -mt-2">
        <div className="flex w-fit whitespace-nowrap animate-marquee-reverse">
          {[...SECONDARY_ITEMS, ...SECONDARY_ITEMS, ...SECONDARY_ITEMS].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 mx-5">
              <span className="font-display font-bold text-xs sm:text-sm tracking-widest uppercase text-njal-silver flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-njal-red animate-pulse" />
                {item}
              </span>
              <span className="text-njal-red font-bold text-sm">//</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
