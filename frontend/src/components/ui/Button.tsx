import { memo, forwardRef } from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'white';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'ref'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500",
  secondary: "bg-white border border-slate-300 hover:border-primary-600 text-slate-700 hover:text-primary-600 focus:ring-primary-500",
  outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
  white: "bg-white text-slate-900 hover:bg-slate-100 focus:ring-white/50"
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-sm min-h-[44px]",
  md: "px-5 sm:px-6 py-3 text-sm sm:text-base min-h-[44px]",
  lg: "px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg min-h-[48px]"
};

const hoverAnimation = { scale: 1.02 };
const tapAnimation = { scale: 0.98 };

export const Button = memo(forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
  }, ref) {
    return (
      <motion.button
        ref={ref}
        whileHover={hoverAnimation}
        whileTap={tapAnimation}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
));