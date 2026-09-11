import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'rgba(255, 11, 58, 0.25)',
  onClick,
  interactive = true,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={interactive ? { y: -4, transition: { duration: 0.2 } } : undefined}
      className={`relative overflow-hidden bg-njal-card border border-njal-border rounded-none clip-chamfer transition-colors duration-300 hover:border-njal-red/60 group ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
    >
      {/* Dynamic Cursor Spotlight Glow */}
      {interactive && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Cyber Corner Marks */}
      <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-njal-red/40 transition-colors group-hover:border-njal-red" />
      <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-njal-red/40 transition-colors group-hover:border-njal-red" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
