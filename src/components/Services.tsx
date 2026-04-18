import { motion } from 'motion/react';
import { Heart, Navigation, Users, Palette, CheckCircle2 } from 'lucide-react';

const services = [
  {
    title: "Accompagnement au quotidien",
    description: "Aide personnalisée pour les gestes de la vie de tous les jours : préparation des repas, aide aux courses, entretien du logement, organisation de la journée, gestion du budget et démarches simples. L’objectif est de favoriser l’autonomie, le confort et le bien-être.",
    icon: Heart,
    color: "bg-rose-100 text-rose-600"
  },
  {
    title: "Sortie, Activité & Apprentissage",
    description: "Accompagnement dans les sorties (cinéma, sport, restaurant, balades) et loisirs. Apprentissage de compétences utiles au quotidien (cuisine, gestion de l’argent, organisation, communication) pour favoriser l’épanouissement et la socialisation.",
    icon: Palette,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Projet personnalisé",
    description: "Chaque accompagnement est construit autour des besoins, envies et objectifs de la personne. Ensemble, nous définissons un projet qui respecte son rythme et ses priorités avec un suivi régulier pour valoriser les réussites.",
    icon: Navigation,
    color: "bg-emerald-100 text-emerald-600"
  }
];

const questions = [
  "Vous rencontrez des difficultés dans l’accompagnement de votre proche ?",
  "Vous traversez une étape de vie qui bouscule vos habitudes ?",
  "Vous vous interrogez sur la meilleure façon de soutenir son autonomie ?",
  "Votre enfant, adolescent ou adulte présente des difficultés dans son quotidien, ses relations et ses émotions ?"
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Questions */}
        <div className="max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-neutral-100"
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 mb-8 text-center">
              À qui s'adresse mon accompagnement ?
            </h2>
            <div className="space-y-4">
              {questions.map((q, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary-500 shrink-0 mt-0.5" />
                  <p className="text-lg text-neutral-700">{q}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-6"
          >
            Nos Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-600"
          >
            Un accompagnement bienveillant et adapté à chaque étape de la vie.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-neutral-100 flex flex-col"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${service.color}`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold text-neutral-900 mb-4">{service.title}</h3>
              <p className="text-neutral-600 leading-relaxed flex-grow">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
