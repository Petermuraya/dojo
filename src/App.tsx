import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import InstructorPage from './pages/InstructorPage';
import ContactPage from './pages/ContactPage';
import Ranks from './components/Ranks';
import Programs from './components/Programs';
import Locations from './components/Locations';
import Testimonials from './components/Testimonials';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="w-full bg-black pt-16 min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/instructor" element={<InstructorPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Additional standalone pages that reuse components */}
        <Route path="/programs" element={<Programs />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/ranks" element={<Ranks />} />
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
