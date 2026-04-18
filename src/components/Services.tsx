import { motion } from 'motion/react';
import { Heart, Palette, Navigation, CheckCircle2 } from 'lucide-react';
import { useMotionSafe } from '../hooks/useMotionSafe';

const services = [
  {
    title: 'Accompagnement au quotidien',
    description:
      "Aide personnalisée pour les gestes de tous les jours : repas, courses, entretien du logement, organisation, gestion du budget et démarches simples. Objectif : favoriser l'autonomie, le confort et le bien-être.",
    icon: Heart,
  },
  {
    title: 'Sortie, activité & apprentissage',
    description:
      "Accompagnement dans les sorties (cinéma, sport, restaurant, balades) et les loisirs. Apprentissage de compétences utiles (cuisine, argent, communication) pour favoriser l'épanouissement et la socialisation.",
    icon: Palette,
  },
  {
    title: 'Projet personnalisé',
    description:
      "Chaque accompagnement est construit autour des besoins, envies et objectifs de la personne. Ensemble, nous définissons un projet qui respecte son rythme, avec un suivi régulier pour valoriser les réussites.",
    icon: Navigation,
  },
];

const questions = [
  "Vous rencontrez des difficultés dans l'accompagnement de votre proche ?",
  'Vous traversez une étape de vie qui bouscule vos habitudes ?',
  "Vous vous interrogez sur la meilleure façon de soutenir son autonomie ?",
  "Votre enfant, adolescent ou adulte présente des difficultés dans son quotidien, ses relations et ses émotions ?",
];

export default function Services() {
  const motionSafe = useMotionSafe();

  return (
    <section id="services" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* À qui s'adresse */}
        <motion.div
          initial={motionSafe ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16 md:mb-20 bg-white rounded-3xl p-6 md:p-12 shadow-card border border-cream-200"
        >
          <h2 className="font-serif font-semibold text-2xl md:text-3xl text-wood-900 text-center mb-8">
            À qui s'adresse mon accompagnement&nbsp;?
          </h2>
          <ul className="space-y-4">
            {questions.map((q, i) => (
              <motion.li
                key={i}
                initial={motionSafe ? { opacity: 0, x: -16 } : false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: motionSafe ? i * 0.08 : 0 }}
                className="flex items-start gap-3 text-wood-700"
              >
                <CheckCircle2
                  size={22}
                  className="text-sage-500 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-base md:text-lg leading-relaxed">{q}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-4">
            Mes services
          </h2>
          <p className="text-wood-600 text-base md:text-lg">
            Un accompagnement bienveillant et adapté à chaque étape de la vie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={motionSafe ? { opacity: 0, y: 20 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: motionSafe ? i * 0.1 : 0 }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-cream-200 shadow-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-terracotta-50 text-terracotta-700 flex items-center justify-center mb-5">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <h3 className="font-serif font-semibold text-xl text-wood-900 mb-3">{service.title}</h3>
                <p className="text-wood-600 text-base leading-relaxed">{service.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
