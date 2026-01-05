import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu with Escape and lock body scroll when open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Instructor', to: '/instructor' },
    { label: 'Programs', to: '/programs' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Locations', to: '/locations' },
    { label: 'Contact', to: '/contact' },
  ];

  const scrollToSection = (_: string) => {
    // kept for signature compatibility, navigation handled by router below
    setIsMobileMenuOpen(false);
  };

  const navigate = useNavigate();

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full h-16 z-50 transition-all duration-300 bg-black/60 backdrop-blur-sm ${
          isScrolled ? 'bg-black/90 shadow-lg' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold tracking-wider cursor-pointer"
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="text-white">MWIKI</span>
            <span className="text-red-600"> DOJO</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative font-semibold text-sm transition-colors group ${
                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 h-0.5 bg-red-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </NavLink>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/contact')}
            className="hidden md:block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
          >
            JOIN
          </motion.button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 hover:bg-gray-900/50 rounded-lg transition-colors"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 bg-black/80 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-gray-950 p-6 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center justify-start gap-6 pt-2 px-2">
                {navLinks.map((link, idx) => (
                  <motion.button
                    key={link.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.04 }}
                    onClick={() => {
                      navigate(link.to);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left text-2xl font-bold text-white hover:text-red-600 transition-colors py-3 px-2"
                  >
                    {link.label}
                  </motion.button>
                ))}

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: navLinks.length * 0.04 }}
                  onClick={() => scrollToSection('contact')}
                  className="w-full text-left px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-bold mt-4 rounded-lg"
                >
                  JOIN TRAINING
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
