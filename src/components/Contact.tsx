import { motion } from 'motion/react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 mb-6"
          >
            Contactez-moi
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-600"
          >
            N'hésitez pas à me contacter pour échanger sur vos besoins ou prendre un premier rendez-vous.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
              <h3 className="text-2xl font-serif font-bold text-neutral-900 mb-6">Informations Pratiques</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full text-primary-600 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Téléphone</p>
                    <a href="tel:+33779241915" className="text-neutral-600 hover:text-primary-600 transition-colors">07 79 24 19 15</a>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full text-primary-600 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Email</p>
                    <a href="mailto:toneducauquotien@gmail.com" className="text-neutral-600 hover:text-primary-600 transition-colors">toneducauquotien@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full text-primary-600 shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Horaires d'ouvertures</p>
                    <p className="text-neutral-600">Du lundi au vendredi : de 9h à 17h<br/>Samedi : 10h - 15h<br/>Dimanche : Fermé</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full text-primary-600 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Adresse</p>
                    <p className="text-neutral-600">25 rue François Vincent Raspail<br/>69190 Saint-Fons</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-2">Prénom</label>
                  <input type="text" id="firstName" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="Jean" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-2">Nom</label>
                  <input type="text" id="lastName" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="Dupont" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                <input type="email" id="email" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all" placeholder="jean.dupont@email.com" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 mb-2">Sujet</label>
                <select id="subject" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white">
                  <option>Demande de renseignements</option>
                  <option>Prendre rendez-vous</option>
                  <option>Accompagnement au quotidien</option>
                  <option>Sortie / Activité</option>
                  <option>Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">Message</label>
                <textarea id="message" rows={4} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none" placeholder="Comment puis-je vous aider ?"></textarea>
              </div>

              <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-white font-medium py-4 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5">
                Envoyer le message
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
