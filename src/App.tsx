import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Gallery from './components/Gallery';
import Tarifs from './components/Tarifs';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Gallery />
        <Tarifs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
