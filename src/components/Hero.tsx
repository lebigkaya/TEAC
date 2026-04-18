import { motion } from 'motion/react';
import { Phone, Check } from 'lucide-react';
import CalendlyButton from './CalendlyButton';
import { useMotionSafe } from '../hooks/useMotionSafe';

const HERO_IMAGE = 'https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_3099-standard-kcvz2n.jpg';

const trustPoints = [
  '1ère rencontre gratuite',
  'Accompagnement sur-mesure',
  'Disponible 6j/7',
];

export default function Hero() {
  const motionSafe = useMotionSafe();
  const transition = motionSafe ? { duration: 0.6 } : { duration: 0 };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] md:min-h-screen flex items-end md:items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Emmanuelle accompagnant une personne dans son quotidien"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(61,47,38,0.72) 0%, rgba(165,89,62,0.65) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-28 md:py-0 md:max-w-4xl lg:max-w-5xl">
        <motion.div
          initial={motionSafe ? { opacity: 0, y: 20 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
          className="text-white max-w-2xl"
        >
          <div className="text-xs md:text-sm font-semibold uppercase tracking-[0.15em] text-honey-400 mb-4">
            Lyon métropole · Saint-Fons
          </div>

          <h1 className="font-serif font-semibold text-[2rem] leading-[1.1] md:text-5xl lg:text-[3.25rem] tracking-tight mb-5">
            Accompagnement à domicile<br className="hidden md:block" /> et en structure
          </h1>

          <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8 max-w-xl">
            Je vous aide à mieux comprendre ses besoins, à valoriser ses capacités et à cheminer
            vers des solutions adaptées, celles qui favorisent son épanouissement et celui de votre famille.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <CalendlyButton size="lg" className="sm:w-auto">
              Prendre rendez-vous
            </CalendlyButton>
            <a
              href="tel:+33779241915"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg hover:bg-white/20 transition-all"
            >
              <Phone size={20} aria-hidden="true" />
              07 79 24 19 15
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/85">
            {trustPoints.map((p) => (
              <li key={p} className="inline-flex items-center gap-1.5">
                <Check size={16} className="text-sage-500" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
