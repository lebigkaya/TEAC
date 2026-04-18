import { useCallback, useState } from 'react';
import { openCalendlyPopup } from '../lib/calendly';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL as string | undefined;

export function useCalendly() {
  const [isOpening, setIsOpening] = useState(false);

  const open = useCallback(async () => {
    if (!CALENDLY_URL) {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    try {
      setIsOpening(true);
      await openCalendlyPopup(CALENDLY_URL);
    } catch {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } finally {
      setIsOpening(false);
    }
  }, []);

  return { open, isOpening, isConfigured: Boolean(CALENDLY_URL) };
}
