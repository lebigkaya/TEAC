import { useEffect, useRef, useState } from 'react';
import { loadCalendly } from '../lib/calendly';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

interface CalendlyEmbedProps {
  className?: string;
  minHeight?: number;
}

export default function CalendlyEmbed({ className = '', minHeight = 640 }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!CALENDLY_URL || !containerRef.current) return;
    let cancelled = false;

    loadCalendly()
      .then(() => {
        if (cancelled || !containerRef.current) return;
        window.Calendly?.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: containerRef.current,
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!CALENDLY_URL) {
    return (
      <div className={`bg-cream-50 rounded-2xl p-6 text-center text-wood-600 ${className}`} role="status">
        Le calendrier n'est pas encore configuré. Contactez-moi par téléphone au{' '}
        <a href="tel:+33779241915" className="font-semibold text-terracotta-700 underline">07 79 24 19 15</a>.
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-cream-50 rounded-2xl p-6 text-center text-wood-600 ${className}`} role="alert">
        Le calendrier n'a pas pu charger. Appelez-moi au{' '}
        <a href="tel:+33779241915" className="font-semibold text-terracotta-700 underline">07 79 24 19 15</a>.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`bg-white rounded-3xl overflow-hidden shadow-card-lg ${className}`}
      style={{ minHeight }}
      aria-label="Calendrier de prise de rendez-vous"
    />
  );
}
