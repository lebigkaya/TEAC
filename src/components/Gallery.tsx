import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useMotionSafe } from '../hooks/useMotionSafe';

const galleryImages = [
  { src: 'https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/1000172609-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800', alt: 'Activité poterie' },
  { src: 'https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_3036-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800', alt: 'À la découverte du monde' },
  { src: 'https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_1854-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800', alt: 'Petite pause après une randonnée' },
  { src: 'https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_0514-high.jpg?enable-io=true&enable=upscale&crop=0.6667%3A1&width=800', alt: 'Sortie vélo pour profiter du soleil' },
];

export default function Gallery() {
  const motionSafe = useMotionSafe();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [activeIndex]);

  const active = activeIndex !== null ? galleryImages[activeIndex] : null;

  return (
    <section id="galerie" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-4">
            Des moments partagés
          </h2>
          <p className="text-wood-600 text-base md:text-lg">
            Quelques instants vécus lors de nos activités et sorties.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {galleryImages.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setActiveIndex(i)}
              initial={motionSafe ? { opacity: 0, y: 20 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: motionSafe ? i * 0.08 : 0 }}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-card hover:shadow-card-lg transition-shadow"
              aria-label={`Agrandir : ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[100] bg-wood-900/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            aria-label="Fermer"
          >
            <X size={24} aria-hidden="true" />
          </button>
          <img
            src={active.src}
            alt={active.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
