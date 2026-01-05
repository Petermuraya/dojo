import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Instructor', href: '#instructor', id: 'instructor' },
    { label: 'Programs', href: '#programs', id: 'programs' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Locations', href: '#locations', id: 'locations' },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled ? 'bg-black/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold tracking-wider cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-white">MWIKI</span>
            <span className="text-red-600"> DOJO</span>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative text-gray-300 hover:text-white font-semibold text-sm transition-colors group"
              >
                {link.label}
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 h-0.5 bg-red-600"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('contact')}
            className="hidden md:block px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
          >
            JOIN
          </motion.button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-900/50 rounded-lg transition-colors"
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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 bg-black z-30 md:hidden"
          >
            <div className="flex flex-col items-center justify-start gap-8 pt-12 px-4">
              {navLinks.map((link, idx) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  onClick={() => scrollToSection(link.id)}
                  className="text-2xl font-bold text-white hover:text-red-600 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold mt-8 transition-all duration-300"
              >
                JOIN TRAINING
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
