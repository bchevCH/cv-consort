import { memo } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const hoverAnimation = { y: -5, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" };
const transitionConfig = { duration: 0.2 };

export const Card = memo<CardProps>(function Card({
  children,
  className = "",
  hoverEffect = true,
  onClick
}) {
  return (
    <motion.div
      className={`bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 ${className}`}
      whileHover={hoverEffect ? hoverAnimation : undefined}
      transition={transitionConfig}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
});