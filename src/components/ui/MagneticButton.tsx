import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  glow?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  target,
  variant = 'primary',
  size = 'md',
  icon,
  glow = true,
}) => {
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.25;
    const y = (clientY - (top + height / 2)) * 0.25;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs font-semibold uppercase tracking-wider',
    md: 'px-5 py-2.5 text-sm font-bold uppercase tracking-wider',
    lg: 'px-7 py-3.5 text-base font-bold uppercase tracking-wider',
    xl: 'px-9 py-4 text-lg font-extrabold uppercase tracking-widest',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-njal-red to-njal-redDeep text-white shadow-lg shadow-njal-red/30 border border-njal-redBright/40 hover:shadow-njal-red/60 hover:brightness-110',
    secondary:
      'bg-njal-card text-njal-silver border border-njal-border hover:border-njal-red/60 hover:text-white hover:bg-njal-cardHover',
    outline:
      'bg-transparent text-njal-silver border-2 border-njal-red/70 hover:bg-njal-red/15 hover:text-white hover:border-njal-red',
    ghost:
      'bg-transparent text-njal-gray hover:text-white hover:bg-white/5',
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.2 }}
      whileTap={{ scale: 0.95 }}
      className={`relative inline-flex items-center justify-center gap-3 rounded-none clip-chamfer font-display cursor-pointer transition-all duration-200 select-none group ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${
        glow && variant === 'primary' ? 'box-glow-red' : ''
      } ${className}`}
    >
      {/* Liquid Red Glare Effect */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      {icon && (
        <span className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 text-njal-silver">
          {icon}
        </span>
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className="inline-block" onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block bg-transparent border-0 p-0 cursor-pointer">
      {content}
    </button>
  );
};
