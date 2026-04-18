import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Kra Frejus",
    text: "Une vraie perle ! Emmanuelle est gentille, pro, et elle a su nous aider comme il faut. Je la recommande les yeux fermés !"
  },
  {
    name: "Rioux Jocelyne",
    text: "Emmanuelle a changé notre quotidien. Elle comprend vraiment les besoins des personnes en situation de handicap, et elle fait tout avec le cœur. Merci pour tout."
  },
  {
    name: "Stephanie Lopez",
    text: "Super accompagnement ! Très humaine, très pro, et toujours là quand on en a besoin. On se sent en confiance."
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-neutral-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold mb-6"
          >
            Ce qu'ils en pensent
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-neutral-800 p-8 rounded-3xl relative"
            >
              <Quote className="absolute top-6 right-6 text-neutral-700 w-12 h-12 opacity-50" />
              <p className="text-lg text-neutral-300 italic mb-8 relative z-10">
                "{t.text}"
              </p>
              <div className="font-bold text-primary-400">
                {t.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
