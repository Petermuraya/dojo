import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Instructor from './components/Instructor';
import About from './components/About';
import Ranks from './components/Ranks';
import Programs from './components/Programs';
import Gallery from './components/Gallery';
import Locations from './components/Locations';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="w-full bg-black">
      <Navbar />
      <Hero />
      <Instructor />
      <About />
      <Ranks />
      <Programs />
      <Gallery />
      <Locations />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
