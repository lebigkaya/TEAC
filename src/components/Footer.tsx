export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          <div>
            <h4 className="text-xl font-serif font-bold text-white mb-4">Ton Educ au quotidien</h4>
            <p className="text-neutral-400 max-w-xs">
              Accompagnement à domicile et en structure. Service à la personne adapté à vos besoins.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Navigation Rapide</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-primary-400 transition-colors">Accueil</a></li>
              <li><a href="#services" className="hover:text-primary-400 transition-colors">Nos Services</a></li>
              <li><a href="#tarifs" className="hover:text-primary-400 transition-colors">Tarifs</a></li>
              <li><a href="#contact" className="hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">Légal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Mentions légales</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Politique de confidentialité</a></li>
            </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-neutral-800 text-center text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Ton Educ au quotidien. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
