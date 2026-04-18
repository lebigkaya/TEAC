import { useEffect, useState } from 'react';
import { loadCalendly } from '../lib/calendly';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

interface CalendlyEmbedProps {
  className?: string;
  mobileHeight?: number;
  desktopHeight?: number;
}

export default function CalendlyEmbed({
  className = '',
  mobileHeight = 640,
  desktopHeight = 820,
}: CalendlyEmbedProps) {
  const [error, setError] = useState(false);
  const [height, setHeight] = useState(mobileHeight);

  useEffect(() => {
    if (!CALENDLY_URL) return;
    loadCalendly().catch(() => setError(true));

    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setHeight(mq.matches ? desktopHeight : mobileHeight);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [mobileHeight, desktopHeight]);

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
    <div className={`bg-white rounded-3xl overflow-hidden shadow-card-lg p-4 md:p-6 ${className}`}>
      <div
        className="calendly-inline-widget"
        data-url={`${CALENDLY_URL}?hide_gdpr_banner=1`}
        style={{ minWidth: '320px', height, width: '100%' }}
      />
    </div>
  );
}
