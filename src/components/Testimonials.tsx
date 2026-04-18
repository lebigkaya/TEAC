import { motion } from 'motion/react';
import { useMotionSafe } from '../hooks/useMotionSafe';

const testimonials = [
  {
    name: 'Kra Frejus',
    context: 'Famille accompagnée',
    text: 'Une vraie perle ! Emmanuelle est gentille, pro, et elle a su nous aider comme il faut. Je la recommande les yeux fermés !',
  },
  {
    name: 'Rioux Jocelyne',
    context: 'Proche aidante',
    text: 'Emmanuelle a changé notre quotidien. Elle comprend vraiment les besoins des personnes en situation de handicap, et elle fait tout avec le cœur. Merci pour tout.',
  },
  {
    name: 'Stéphanie Lopez',
    context: 'Maman',
    text: 'Super accompagnement ! Très humaine, très pro, et toujours là quand on en a besoin. On se sent en confiance.',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Testimonials() {
  const motionSafe = useMotionSafe();

  return (
    <section id="temoignages" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-4">
            Ils ont fait confiance à TEAC
          </h2>
          <p className="text-wood-600 text-base md:text-lg">
            Merci aux familles qui m'ont laissé partager leur quotidien.
          </p>
        </div>

        <div className="md:grid md:grid-cols-3 md:gap-6 flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible pb-2 md:pb-0">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={motionSafe ? { opacity: 0, y: 20 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: motionSafe ? i * 0.1 : 0 }}
              className="snap-center shrink-0 w-[85vw] md:w-auto bg-cream-50 rounded-2xl p-6 md:p-7 border border-cream-200 flex flex-col"
            >
              <span aria-hidden="true" className="font-serif text-5xl text-terracotta-300 leading-none mb-2">
                &ldquo;
              </span>
              <p className="text-wood-700 italic text-base leading-relaxed mb-6 flex-grow">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-terracotta-500 text-white flex items-center justify-center font-semibold text-sm">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="font-semibold text-wood-900 text-sm">{t.name}</div>
                  <div className="text-xs text-wood-600">{t.context}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
