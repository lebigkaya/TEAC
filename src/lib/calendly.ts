declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

const CALENDLY_SCRIPT_URL = 'https://assets.calendly.com/assets/external/widget.js';
const CALENDLY_CSS_URL = 'https://assets.calendly.com/assets/external/widget.css';

let loadPromise: Promise<void> | null = null;

export function loadCalendly(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    // CSS
    if (!document.querySelector(`link[href="${CALENDLY_CSS_URL}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = CALENDLY_CSS_URL;
      document.head.appendChild(link);
    }

    // JS
    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      loadPromise = null;
      reject(new Error('Calendly script failed to load'));
    };
    document.body.appendChild(script);
  });

  return loadPromise;
}

export async function openCalendlyPopup(url: string): Promise<void> {
  await loadCalendly();
  window.Calendly?.initPopupWidget({ url });
}
