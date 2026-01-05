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
import { useEffect } from 'react';
import { useLocation, Routes as RR, Route as RRoute, Navigate } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Always start at top on route change / refresh
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="w-full bg-black pt-16 min-h-screen">
      <Navbar />
      <ScrollToTop />

      <RR>
        <RRoute path="/" element={<Home />} />
        <RRoute path="/about" element={<AboutPage />} />
        <RRoute path="/instructor" element={<InstructorPage />} />
        <RRoute path="/gallery" element={<GalleryPage />} />
        <RRoute path="/contact" element={<ContactPage />} />
        {/* Additional standalone pages that reuse components */}
        <RRoute path="/programs" element={<Programs />} />
        <RRoute path="/locations" element={<Locations />} />
        <RRoute path="/ranks" element={<Ranks />} />
        <RRoute path="/testimonials" element={<Testimonials />} />
        {/* Fallback to home for unknown routes */}
        <RRoute path="*" element={<Navigate to="/" replace />} />
      </RR>

      <Footer />
    </div>
  );
}

export default App;
