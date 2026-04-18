import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import CTAFinal from './components/CTAFinal';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-cream-50 font-sans text-wood-900">
      <a href="#main" className="skip-link">Aller au contenu</a>
      <Navbar />
      <main id="main">
        <Hero />
        <Services />
        <HowItWorks />
        <About />
        <Testimonials />
        <Gallery />
        <CTAFinal />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
