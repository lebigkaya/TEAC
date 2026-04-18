import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone } from 'lucide-react';
import CalendlyButton from './CalendlyButton';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Parcours', href: '#parcours' },
  { name: 'À propos', href: '#about' },
  { name: 'Témoignages', href: '#temoignages' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 60);
    handle();
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const shell = isScrolled
    ? 'bg-cream-50/95 backdrop-blur-md shadow-card py-3 text-wood-900'
    : 'bg-transparent py-5 text-white';

  return (
    <header
      aria-label="Navigation principale"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${shell}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#home" className="font-serif font-semibold text-lg md:text-xl leading-none">
          Ton Éduc <span className="text-honey-500">au Quotidien</span>
        </a>

        <nav className="hidden md:flex items-center gap-7" aria-label="Menu principal">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-terracotta-500 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <CalendlyButton size="sm">Prendre rendez-vous</CalendlyButton>
        </nav>

        <button
          type="button"
          className="md:hidden w-11 h-11 flex items-center justify-center -mr-2"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-cream-50 text-wood-900 border-t border-cream-200 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="py-3 text-base font-medium hover:text-terracotta-500"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="tel:+33779241915"
                className="flex items-center gap-2 py-3 text-base font-medium text-wood-700"
              >
                <Phone size={18} aria-hidden="true" /> 07 79 24 19 15
              </a>
              <div className="pt-2">
                <CalendlyButton fullWidth>Prendre rendez-vous</CalendlyButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
