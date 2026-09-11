import React from 'react';
import { motion } from 'framer-motion';

interface FloatingBadgeProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  delay?: number;
  duration?: number;
  accent?: 'red' | 'silver' | 'dark';
}

export const FloatingBadge: React.FC<FloatingBadgeProps> = ({
  icon,
  title,
  subtitle,
  className = '',
  delay = 0,
  duration = 4,
  accent = 'red',
}) => {
  const accentStyles = {
    red: 'border-njal-red/60 bg-njal-dark/90 text-white shadow-njal-red/30',
    silver: 'border-white/40 bg-njal-card/90 text-njal-silver shadow-white/10',
    dark: 'border-njal-border bg-njal-bg/95 text-njal-gray shadow-black/60',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      className={`absolute z-20 flex items-center gap-3.5 px-4 py-2.5 backdrop-blur-md border rounded-sm clip-chamfer shadow-xl select-none ${accentStyles[accent]} ${className}`}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
        className="flex items-center gap-3"
      >
        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-njal-red/20 text-njal-red border border-njal-red/40">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {icon}
            </motion.div>
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-display text-xs font-black uppercase tracking-wider text-white">
            {title}
          </span>
          {subtitle && (
            <span className="text-[10px] font-medium tracking-wide text-njal-gray">
              {subtitle}
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};