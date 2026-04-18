import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { useMotionSafe } from '../hooks/useMotionSafe';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const motionSafe = useMotionSafe();
  const [formState, setFormState] = useState<FormState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim()) {
      setError("Merci d'indiquer votre prénom.");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError('Indiquez un téléphone ou un email pour que je puisse vous recontacter.');
      return;
    }
    if (!message.trim()) {
      setError('Merci de laisser un petit message.');
      return;
    }

    setFormState('submitting');
    await new Promise((r) => setTimeout(r, 400));
    setFormState('success');
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl text-wood-900 mb-4">
            Ou laissez-moi un message
          </h2>
          <p className="text-wood-600 text-base md:text-lg">
            Je vous recontacte dans la journée.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <motion.aside
            initial={motionSafe ? { opacity: 0, x: -20 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 md:p-8 border border-cream-200 shadow-card"
          >
            <h3 className="font-serif font-semibold text-xl text-wood-900 mb-6">Informations pratiques</h3>
            <dl className="space-y-5 text-wood-700">
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-terracotta-700 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-wood-900">Téléphone</dt>
                  <dd>
                    <a href="tel:+33779241915" className="hover:text-terracotta-500">07 79 24 19 15</a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-terracotta-700 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-wood-900">Email</dt>
                  <dd>
                    <a href="mailto:toneducauquotien@gmail.com" className="hover:text-terracotta-500 break-all">
                      toneducauquotien@gmail.com
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-terracotta-700 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-wood-900">Horaires</dt>
                  <dd>Lun – Ven : 9h – 17h<br />Samedi : 10h – 15h<br />Dimanche : fermé</dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-terracotta-700 mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <dt className="font-medium text-wood-900">Adresse</dt>
                  <dd>25 rue François Vincent Raspail<br />69190 Saint-Fons</dd>
                </div>
              </div>
            </dl>
          </motion.aside>

          <motion.div
            initial={motionSafe ? { opacity: 0, x: 20 } : false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 md:p-8 border border-cream-200 shadow-card"
          >
            {formState === 'success' ? (
              <div role="status" className="text-center py-8">
                <CheckCircle2 size={48} className="mx-auto text-sage-500 mb-4" aria-hidden="true" />
                <h3 className="font-serif font-semibold text-xl text-wood-900 mb-2">Merci !</h3>
                <p className="text-wood-600">
                  Votre message a bien été pris en compte. Je vous recontacte dans la journée.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-wood-900 mb-2">
                    Prénom <span className="text-terracotta-700" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 focus:bg-white focus:border-terracotta-500 outline-none transition-colors"
                    placeholder="Jean"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-wood-900 mb-2">
                      Téléphone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 focus:bg-white focus:border-terracotta-500 outline-none transition-colors"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-wood-900 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 focus:bg-white focus:border-terracotta-500 outline-none transition-colors"
                      placeholder="vous@email.com"
                    />
                  </div>
                </div>
                <p className="text-xs text-wood-600 -mt-2">
                  Indiquez au moins un moyen de vous recontacter.
                </p>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-wood-900 mb-2">
                    Message <span className="text-terracotta-700" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-cream-200 bg-cream-50 focus:bg-white focus:border-terracotta-500 outline-none transition-colors resize-none"
                    placeholder="Parlez-moi brièvement de la situation..."
                  />
                </div>

                {error && (
                  <p role="alert" className="text-sm text-terracotta-700 bg-terracotta-50 rounded-lg px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full bg-terracotta-500 hover:bg-terracotta-700 text-white font-semibold py-4 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-card-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? 'Envoi…' : 'Envoyer le message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
