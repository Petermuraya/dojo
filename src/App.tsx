import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import InstructorPage from './pages/InstructorPage';
import ContactPage from './pages/ContactPage';
import RegisterPage from './pages/RegisterPage';
import RolesPage from './pages/Admin/RolesPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
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
        <RRoute path="/register" element={<RegisterPage />} />
        <RRoute path="/admin/roles" element={<RolesPage />} />
        <RRoute path="/admin" element={<Navigate to="/admin/roles" replace />} />
        <RRoute path="/login" element={<LoginPage />} />
        <RRoute path="/reset-password" element={<ResetPasswordPage />} />
        <RRoute
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
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
