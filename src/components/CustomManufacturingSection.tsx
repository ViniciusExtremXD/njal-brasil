import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, Scissors, Check, MessageCircle, Sparkles, Truck, ShieldAlert } from 'lucide-react';
import { GlowCard } from './ui/GlowCard';
import { whatsappLink } from '../config/brand';

export const CustomManufacturingSection: React.FC = () => {
  const [productType, setProductType] = useState<string>('Camisetas Dry-Fit Crossfit');
  const [quantity, setQuantity] = useState<string>('50 a 100 peças');
  const [brandName, setBrandName] = useState<string>('');
  const [city, setCity] = useState<string>('');

  const productOptions = [
    'Camisetas Dry-Fit Crossfit',
    'Camisetas Oversized Streetwear',
    'Regatas Cavadas Musculação',
    'Bermudas 4-Way Stretch',
    'Rashguards Jiu-Jitsu No-Gi',
    'Moletom & Agasalhos',
  ];

  const quantityOptions = [
    '20 a 50 peças (Mínimo)',
    '50 a 100 peças',
    '100 a 300 peças',
    '+300 peças (Grande Porte)',
  ];

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const message =
      `Olá equipe de Confecção da NJAL!\n` +
      `Gostaria de solicitar um orçamento para confecção personalizada:\n\n` +
      `🏢 *Box / Marca / Empresa:* ${brandName || 'Não informado'}\n` +
      `📍 *Cidade / Estado:* ${city || 'Brasil'}\n` +
      `👕 *Tipo de Peça:* ${productType}\n` +
      `📦 *Quantidade Estimada:* ${quantity}\n\n` +
      `Podem me passar informações sobre prazos e valores para personalização?`;
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="confeccao" className="relative py-28 bg-njal-dark/95 border-t border-njal-border overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-0 w-96 h-96 bg-njal-red/15 rounded-full blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-njal-card border border-njal-red/40 clip-chamfer mb-4">
              <Factory className="w-3.5 h-3.5 text-njal-red" />
              <span className="font-display text-xs font-black tracking-widest text-njal-red uppercase">
                CONFECÇÃO & PRIVATE LABEL
              </span>
            </div>

            <h2 className="font-heading text-5xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none mb-6">
              NOSSA CONFECÇÃO. <br />
              <span className="text-njal-red text-glow-red">SUA IDEIA.</span>
            </h2>

            <p className="text-njal-gray text-base leading-relaxed mb-8">
              Crie a linha de roupas do seu box de Crossfit, equipe de artes marciais ou academia do zero. Desenvolvemos modelagens profissionais, tecidos de alto rendimento e estamparia duradoura com a mesma qualidade premium das armaduras da NJAL.
            </p>

            {/* Benefit Checkmarks */}
            <div className="space-y-4 mb-8">
              {[
                { title: 'Pedido mínimo acessível', desc: 'A partir de apenas 20 peças para você começar sem travar seu caixa.' },
                { title: 'Entrega rápida em todo o Brasil', desc: 'Logística ágil com rastreio total para qualquer estado.' },
                { title: 'Estamparia DTF, Silk e Bordado', desc: 'Acabamentos em alta definição que resistem a centenas de lavagens.' },
                { title: 'Mockup 3D antes da produção', desc: 'Você aprova visualmente cada peça antes do início do corte.' },
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-none bg-njal-red/20 border border-njal-red/50 text-njal-red mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold uppercase text-white tracking-wide">
                      {b.title}
                    </h4>
                    <p className="text-xs text-njal-gray">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Interactive Form Box */}
          <div className="lg:col-span-6">
            <GlowCard className="p-6 sm:p-10 bg-njal-card border-njal-red/40 box-glow-red">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-njal-border">
                <div>
                  <h3 className="font-display text-xl font-black uppercase text-white">
                    Simulador de Encomenda
                  </h3>
                  <span className="text-xs text-njal-gray">
                    Receba um orçamento direto no WhatsApp
                  </span>
                </div>
                <div className="h-10 w-10 bg-njal-dark border border-njal-border clip-chamfer flex items-center justify-center">
                  <Scissors className="w-5 h-5 text-njal-red" />
                </div>
              </div>

              <form onSubmit={handleSendQuote} className="space-y-5">
                {/* Brand / Box Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-njal-silver mb-1.5">
                    Nome do seu Box, Academia ou Marca
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Crossfit Valhalla / Box Alpha"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-4 py-3 bg-njal-dark border border-njal-border text-white text-xs clip-chamfer focus:outline-none focus:border-njal-red"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-njal-silver mb-1.5">
                    Sua Cidade / UF
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: São Paulo - SP"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 bg-njal-dark border border-njal-border text-white text-xs clip-chamfer focus:outline-none focus:border-njal-red"
                  />
                </div>

                {/* Product Type Select */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-njal-silver mb-1.5">
                    Tipo de Peça Principal
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                    className="w-full px-4 py-3 bg-njal-dark border border-njal-border text-white text-xs clip-chamfer focus:outline-none focus:border-njal-red"
                  >
                    {productOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-njal-dark text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity Options */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-njal-silver mb-2">
                    Quantidade Desejada
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {quantityOptions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => setQuantity(q)}
                        className={`py-2 px-2.5 text-[11px] font-bold uppercase tracking-wider clip-chamfer transition-all cursor-pointer ${
                          quantity === q
                            ? 'bg-njal-red text-white border border-njal-redBright'
                            : 'bg-njal-dark text-njal-gray border border-njal-border hover:border-white/30'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-njal-red to-njal-redDeep hover:brightness-110 text-white font-display font-black text-sm uppercase tracking-widest clip-chamfer shadow-xl shadow-njal-red/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  Enviar Cotação pelo WhatsApp
                </button>
              </form>
            </GlowCard>
          </div>

        </div>
      </div>
    </section>
  );
};
