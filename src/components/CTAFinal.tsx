import CalendlyButton from './CalendlyButton';
import CalendlyEmbed from './CalendlyEmbed';

export default function CTAFinal() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 20% 0%, rgba(224,164,88,0.25) 0%, transparent 50%), ' +
          'radial-gradient(circle at 80% 100%, rgba(224,164,88,0.18) 0%, transparent 55%), ' +
          '#A5593E',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl mb-10 md:mb-12">
          <h2 className="font-serif font-semibold text-3xl md:text-4xl lg:text-5xl mb-4">
            Discutons de vos besoins
          </h2>
          <p className="text-base md:text-lg text-cream-50/90 leading-relaxed">
            1ère rencontre gratuite · Sans engagement · Je vous recontacte dans la journée.
          </p>
        </div>

        <div className="hidden md:block">
          <CalendlyEmbed minHeight={700} />
        </div>
        <div className="md:hidden flex flex-col gap-3">
          <CalendlyButton variant="accent" fullWidth size="lg">
            Ouvrir le calendrier
          </CalendlyButton>
          <a
            href="tel:+33779241915"
            className="text-center text-cream-50/90 text-sm underline underline-offset-4"
          >
            Ou appelez directement : 07 79 24 19 15
          </a>
        </div>
      </div>
    </section>
  );
}
