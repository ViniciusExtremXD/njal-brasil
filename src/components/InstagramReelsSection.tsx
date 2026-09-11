import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Play, ExternalLink, Sparkles, Layers } from 'lucide-react';
import { InstagramIcon } from './ui/Icons';
import { INSTAGRAM_POSTS } from '../data/instagramPosts';
import { GlowCard } from './ui/GlowCard';
import { BRAND } from '../config/brand';

export const InstagramReelsSection: React.FC = () => {
  return (
    <section id="instagram" className="relative py-28 bg-njal-bg overflow-hidden border-t border-njal-border">
      {/* Red ambient light */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-njal-red/10 rounded-full blur-[160px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-njal-dark border border-njal-red/40 clip-chamfer mb-3">
              <InstagramIcon className="w-3.5 h-3.5 text-njal-red" />
              <span className="font-display text-xs font-black tracking-widest text-njal-red uppercase">
                COMUNIDADE // FEED EM TEMPO REAL
              </span>
            </div>

            <h2 className="font-heading text-5xl sm:text-6xl font-black uppercase text-white tracking-tight leading-none">
              DIRETO DO FEED <br />
              <span className="text-njal-red text-glow-red">@NJALBRASIL</span>
            </h2>
          </div>

          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-njal-card hover:bg-njal-cardHover border border-njal-border hover:border-njal-red text-white text-xs font-black uppercase tracking-widest clip-chamfer transition-all duration-300"
          >
            <InstagramIcon className="w-4 h-4 text-njal-red" />
            Seguir no Instagram
            <ExternalLink className="w-3.5 h-3.5 text-njal-gray" />
          </a>
        </div>

        {/* 6 Post Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSTAGRAM_POSTS.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <GlowCard className="p-3 bg-njal-card border-njal-border group">
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-square w-full overflow-hidden clip-chamfer bg-black border border-njal-border mb-3"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-white text-[10px] font-black uppercase tracking-wider clip-badge flex items-center gap-1.5">
                    {post.type === 'reel' ? (
                      <>
                        <Play className="w-3 h-3 text-njal-red fill-njal-red" />
                        Reel
                      </>
                    ) : post.type === 'carousel' ? (
                      <>
                        <Layers className="w-3 h-3 text-njal-red" />
                        Carrossel
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-njal-red" />
                        Post
                      </>
                    )}
                  </div>

                  {/* Tag on Top Right */}
                  <div className="absolute top-3 right-3 text-[10px] font-bold text-njal-red tracking-wider">
                    {post.tag}
                  </div>

                  {/* Play button indicator for reel */}
                  {post.type === 'reel' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-14 w-14 rounded-full bg-njal-red/80 backdrop-blur-sm flex items-center justify-center text-white shadow-xl shadow-njal-red/50 group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 fill-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Bottom Stats & Date */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-3 font-display font-bold">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-njal-red fill-njal-red" />
                        {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-white" />
                        {post.comments}
                      </span>
                    </div>

                    <span className="text-[10px] text-njal-gray uppercase font-bold">
                      {post.date}
                    </span>
                  </div>
                </a>

                {/* Caption Snippet */}
                <div className="px-1 pb-1">
                  <h4 className="font-display text-sm font-black uppercase text-white tracking-wide mb-1 group-hover:text-njal-red transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-xs text-njal-gray line-clamp-2 leading-relaxed">
                    {post.caption}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
