import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Nos Services', href: '#services' },
    { name: 'Galerie', href: '#galerie' },
    { name: 'Tarifs', href: '#tarifs' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#home" className="text-2xl font-serif font-bold text-primary-800">
          Ton Educ<br/><span className="text-sm font-sans font-medium text-neutral-600">au quotidien</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-neutral-800 hover:text-primary-600 font-medium relative group transition-colors"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a
            href="#contact"
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2.5 rounded-full font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Prendre RDV
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-neutral-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-neutral-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-neutral-800 hover:text-primary-600"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-accent-500 text-white text-center px-6 py-3 rounded-full font-medium mt-4"
              >
                Prendre RDV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
