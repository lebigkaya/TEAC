import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCalendly } from '../hooks/useCalendly';

type Variant = 'primary' | 'accent' | 'dark';

interface CalendlyButtonProps {
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children?: ReactNode;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-terracotta-500 hover:bg-terracotta-700 text-white',
  accent: 'bg-honey-500 hover:bg-honey-600 text-wood-900',
  dark: 'bg-wood-900 hover:bg-wood-700 text-cream-50',
};

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function CalendlyButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children = 'Prendre rendez-vous',
  className = '',
}: CalendlyButtonProps) {
  const { open, isOpening } = useCalendly();

  return (
    <button
      type="button"
      onClick={open}
      disabled={isOpening}
      className={[
        'inline-flex items-center justify-center gap-2 font-semibold rounded-full',
        'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-lg',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
    >
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </button>
  );
}
