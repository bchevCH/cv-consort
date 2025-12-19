import { memo } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/hooks/useScrollAnimation';

type SectionTitleVariant = 'default' | 'light';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
  variant?: SectionTitleVariant;
}

const variantColorMap: Record<SectionTitleVariant, { title: string; subtitle: string; bar: string }> = {
  light: { title: 'text-white', subtitle: 'text-slate-400', bar: 'bg-primary-500' },
  default: { title: 'text-slate-900', subtitle: 'text-slate-600', bar: 'bg-primary-600' }
};

const viewportConfig = { once: true, margin: "-100px" as const };

export const SectionTitle = memo<SectionTitleProps>(function SectionTitle({
  title,
  subtitle,
  className = "",
  align = 'center',
  variant = 'default'
}) {
  const colors = variantColorMap[variant];
  const isCenter = align === 'center';

  return (
    <motion.div
      className={`mb-8 md:mb-12 ${isCenter ? 'text-center' : 'text-left'} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeInUp}
    >
      <h2 className={`text-3xl md:text-4xl font-bold ${colors.title} mb-4`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base sm:text-lg ${colors.subtitle} max-w-2xl mx-auto`}>
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 ${colors.bar} mt-4 rounded-full ${isCenter ? 'mx-auto' : ''}`} />
    </motion.div>
  );
});