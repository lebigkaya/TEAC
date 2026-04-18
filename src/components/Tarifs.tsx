import { motion } from 'motion/react';
import { FileText, Handshake, CreditCard } from 'lucide-react';

export default function Tarifs() {
  return (
    <section id="tarifs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-6"
          >
            Tarifs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-600"
          >
            Des tarifs adaptés à chaque prestation.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-primary-50 rounded-2xl p-8 text-center border border-primary-100"
          >
            <div className="w-16 h-16 mx-auto bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6">
              <Handshake size={32} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4">1. Première rencontre</h3>
            <p className="text-neutral-600 mb-4">
              La première rencontre est <strong>gratuite</strong>.
            </p>
            <p className="text-sm text-neutral-500">
              Elle permet de faire un point complet sur vos besoins et vos attentes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-accent-50 rounded-2xl p-8 text-center border border-accent-100"
          >
            <div className="w-16 h-16 mx-auto bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mb-6">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4">2. Devis personnalisé</h3>
            <p className="text-neutral-600 mb-4">
              Un devis personnalisé est ensuite établi.
            </p>
            <p className="text-sm text-neutral-500">
              Il est construit sur-mesure en fonction du projet défini ensemble.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-blue-50 rounded-2xl p-8 text-center border border-blue-100"
          >
            <div className="w-16 h-16 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
              <CreditCard size={32} />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-4">3. Tarification</h3>
            <p className="text-neutral-600 mb-4">
              Mes tarifs s’adaptent à la nature de l’accompagnement.
            </p>
            <p className="text-sm text-neutral-500">
              Que ce soit pour du quotidien, des sorties ou un projet spécifique.
            </p>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-block bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-medium transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Demander un devis
          </a>
        </motion.div>
      </div>
    </section>
  );
}
