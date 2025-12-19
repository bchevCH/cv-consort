/**
 * Animation variants for scroll-triggered animations.
 * Uses Framer Motion's Variants type for type-safe animation definitions.
 *
 * Usage:
 *   import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
 *   <motion.div variants={fadeInUp} initial="hidden" whileInView="visible">
 */
import type { Variants } from 'framer-motion';

/** Fade in from bottom with slight upward movement */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

/** Container that staggers children animations */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

/** Scale up from slightly smaller size */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

