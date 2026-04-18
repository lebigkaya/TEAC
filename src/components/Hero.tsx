import { motion } from 'motion/react';

export default function Hero() {
  const title = "Accompagnement à domicile et en structure".split(" ");

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://primary.jwwb.nl/public/y/y/r/temp-epgxyojzwxhwltvwdttk/img_3099-standard-kcvz2n.jpg"
          alt="Accompagnement chaleureux"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-900/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          {title.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-lg md:text-2xl text-neutral-100 mb-10 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Je vous aide à mieux comprendre ses besoins, à valoriser ses capacités et à cheminer vers des solutions adaptées, celles qui favorisent son épanouissement et celui de votre famille.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-full font-medium text-lg transition-all hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto"
          >
            Prendre rendez-vous
          </a>
          <a
            href="#services"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-medium text-lg transition-all w-full sm:w-auto"
          >
            Découvrir les services
          </a>
        </motion.div>
      </div>
    </section>
  );
}
