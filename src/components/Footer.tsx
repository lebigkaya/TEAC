export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-wood-900 text-cream-100 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <h3 className="font-serif font-semibold text-xl mb-3">
              Ton Éduc <span className="text-honey-500">au Quotidien</span>
            </h3>
            <p className="text-cream-100/75 max-w-xs leading-relaxed">
              Accompagnement à domicile et en structure pour personnes en situation de handicap et leur famille.
              Lyon et métropole.
            </p>
          </div>

          <nav aria-label="Liens du site">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-honey-500 mb-3">Navigation</h4>
            <ul className="space-y-2 text-cream-100/85">
              <li><a href="#services" className="hover:text-honey-500 transition-colors">Services</a></li>
              <li><a href="#parcours" className="hover:text-honey-500 transition-colors">Parcours</a></li>
              <li><a href="#about" className="hover:text-honey-500 transition-colors">À propos</a></li>
              <li><a href="#temoignages" className="hover:text-honey-500 transition-colors">Témoignages</a></li>
              <li><a href="#contact" className="hover:text-honey-500 transition-colors">Contact</a></li>
            </ul>
          </nav>

          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-honey-500 mb-3">Contact</h4>
            <ul className="space-y-2 text-cream-100/85">
              <li><a href="tel:+33779241915" className="hover:text-honey-500 transition-colors">07 79 24 19 15</a></li>
              <li><a href="mailto:toneducauquotien@gmail.com" className="hover:text-honey-500 transition-colors break-all">toneducauquotien@gmail.com</a></li>
              <li className="text-sm">25 rue F.V. Raspail<br />69190 Saint-Fons</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cream-100/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-cream-100/60">
          <p>© {year} Ton Éduc au Quotidien · Conçu avec soin.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-honey-500">Mentions légales</a>
            <a href="#" className="hover:text-honey-500">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
