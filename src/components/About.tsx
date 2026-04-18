import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';
import { useMotionSafe } from '../hooks/useMotionSafe';

const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

export default function About() {
  const motionSafe = useMotionSafe();

  return (
    <section id="about" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div
            initial={motionSafe ? { opacity: 0, x: -30 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2 max-w-md lg:max-w-none"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-terracotta-100 rounded-3xl translate-x-4 translate-y-4 -z-10" aria-hidden="true" />
              <img
                src={ABOUT_IMAGE}
                alt="Portrait d'Emmanuelle, fondatrice de Ton Éduc au Quotidien"
                className="rounded-3xl shadow-card-lg w-full object-cover aspect-[4/5]"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={motionSafe ? { opacity: 0, x: 30 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-6">
              Mon histoire
            </h2>

            <div className="text-base md:text-lg text-wood-600 leading-relaxed space-y-4 mb-8">
              <p>
                Tout a commencé avec une idée simple nourrie par une passion profonde. Issue d'une famille modeste,
                j'ai très tôt appris à prendre soin des autres en accompagnant mes parents dans leur clinique,
                où je me suis engagée comme bénévole auprès des patients.
              </p>
              <p>
                Plus tard, je me suis d'abord orientée vers un diplôme de vente. Mais la période du Covid a été un
                tournant : elle m'a poussée à écouter mon véritable appel, celui d'aider et d'accompagner. Depuis,
                je consacre ma vie à apporter de l'autonomie, du soutien et du soulagement aux personnes en situation
                de handicap.
              </p>
              <p>
                Aujourd'hui, cette vocation est au cœur de mon entreprise : offrir un accompagnement de qualité,
                humain et personnalisé, où chaque personne compte et mérite d'être valorisée.
              </p>
            </div>

            <p className="font-serif italic text-lg md:text-xl text-terracotta-700 border-l-2 border-terracotta-300 pl-4 mb-6">
              Mon approche : écoute · respect du rythme · valorisation des capacités.
            </p>

            <div className="inline-flex items-center gap-2 text-wood-700 font-medium">
              <MapPin size={18} className="text-sage-600" aria-hidden="true" />
              J'interviens sur Lyon et la métropole.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
