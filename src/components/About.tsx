import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Image Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary-100 rounded-3xl transform translate-x-4 translate-y-4 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Portrait d'Emmanuelle" 
                className="rounded-3xl shadow-lg w-full object-cover aspect-[4/5]"
              />
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-6">
              Mon Histoire
            </h2>
            <div className="text-lg text-neutral-600 mb-8 leading-relaxed space-y-4">
              <p>
                Tout a commencé avec une idée simple nourrie par une passion profonde. Issue d’une famille modeste, j’ai très tôt appris à prendre soin des autres en accompagnant mes parents dans leur clinique, où je me suis engagée comme bénévole auprès des patients.
              </p>
              <p>
                Plus tard, je me suis d’abord orientée vers un diplôme de vente. Mais la période du Covid a été un tournant : elle m’a poussée à écouter mon véritable appel, celui d’aider et d’accompagner. Depuis, je consacre ma vie à apporter de l’autonomie, du soutien et du soulagement aux personnes en situation de handicap.
              </p>
              <p>
                Aujourd’hui, cette vocation est au cœur de mon entreprise : offrir un accompagnement de qualité, humain et personnalisé, où chaque personne compte et mérite d’être valorisée.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-200 before:to-transparent mt-12">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-neutral-100 bg-neutral-50 shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-neutral-900">Bénévolat en clinique</div>
                  </div>
                  <div className="text-neutral-600 text-sm">J'ai très tôt appris à prendre soin des autres en accompagnant mes parents.</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-neutral-100 bg-neutral-50 shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-neutral-900">Le tournant du Covid</div>
                  </div>
                  <div className="text-neutral-600 text-sm">Après un diplôme de vente, j'ai écouté mon véritable appel : aider et accompagner.</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-accent-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-accent-100 bg-accent-50 shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-neutral-900">Aujourd'hui</div>
                  </div>
                  <div className="text-neutral-600 text-sm">Je consacre ma vie à apporter de l'autonomie et du soutien aux personnes en situation de handicap.</div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
