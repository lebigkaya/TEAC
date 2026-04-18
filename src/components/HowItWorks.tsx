import { motion } from 'motion/react';
import { Handshake, FileText, HeartHandshake } from 'lucide-react';
import CalendlyButton from './CalendlyButton';
import { useMotionSafe } from '../hooks/useMotionSafe';

const steps = [
  {
    number: '01',
    title: 'Premier échange',
    description: "Nous discutons de vos besoins lors d'une rencontre offerte, sans engagement.",
    icon: Handshake,
  },
  {
    number: '02',
    title: 'Projet personnalisé',
    description: 'Je vous propose un accompagnement adapté, avec un devis clair et sur-mesure.',
    icon: FileText,
  },
  {
    number: '03',
    title: 'Accompagnement',
    description: 'Nous avançons ensemble, au rythme qui convient, avec des points réguliers.',
    icon: HeartHandshake,
  },
];

export default function HowItWorks() {
  const motionSafe = useMotionSafe();

  return (
    <section id="parcours" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-4">
            Comment ça se passe&nbsp;?
          </h2>
          <p className="text-wood-600 text-base md:text-lg">
            Un parcours simple, en trois étapes, sans engagement.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === steps.length - 1;
            return (
              <motion.li
                key={step.number}
                initial={motionSafe ? { opacity: 0, y: 20 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: motionSafe ? i * 0.12 : 0 }}
                className="relative bg-cream-50 rounded-2xl p-6 md:p-8 border border-cream-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    aria-hidden="true"
                    className="font-serif font-semibold text-5xl text-terracotta-200 leading-none"
                  >
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-terracotta-500 text-white flex items-center justify-center">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                </div>
                <h3 className="font-serif font-semibold text-xl text-wood-900 mb-2">{step.title}</h3>
                <p className="text-wood-600 leading-relaxed">{step.description}</p>

                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-honey-500 text-2xl font-bold"
                  >
                    →
                  </span>
                )}
              </motion.li>
            );
          })}
        </ol>

        <div className="text-center mt-10 md:mt-14">
          <CalendlyButton size="lg">Prendre rendez-vous</CalendlyButton>
          <p className="text-sm text-wood-600 mt-3">1ère rencontre gratuite · sans engagement</p>
        </div>
      </div>
    </section>
  );
}
