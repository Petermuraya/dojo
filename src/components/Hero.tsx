import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Play } from 'lucide-react';
import heroImage from '../assets/hero-karate.png';

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16" aria-label="Hero">
      {/* Background image (local) */}
      <div
        className="absolute inset-0 bg-cover bg-center hero-bg-zoom z-0"
        style={{ backgroundImage: `url(${heroImage})`, opacity: 0.3 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 z-10" />

      <div className="max-w-6xl mx-auto relative z-20 px-4 md:px-8 py-20">
        <div className="max-w-2xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 mb-6"
            aria-hidden
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm text-red-200 font-medium">New Classes Starting January 2026</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-white mb-6"
          >
            MASTER THE
            <span className="block text-red-500">ART OF</span>
            <span className="block">KARATE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.18 }}
            className="text-base md:text-lg text-gray-300 max-w-lg mb-8"
          >
            Transform your body and mind through traditional martial arts training. Build discipline, strength,
            and confidence at Iron Fist Dojo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollToSection('programs')}
              className="inline-flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm sm:text-lg rounded-lg shadow-lg transition-transform transform-gpu hover:scale-105"
              aria-label="Start your journey"
            >
              Start Your Journey
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('video')}
              className="inline-flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 bg-transparent border border-gray-300 text-gray-100 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Watch video"
            >
              <Play className="w-4 h-4" />
              Watch Video
            </button>
          </motion.div>

          
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-300 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-red-500 to-transparent" />
      </motion.div>
    </section>
  );
}
