import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Play } from 'lucide-react';
import heroImage from '../assets/hero-karate.png';
import adultTraining from '../assets/aldulttraining.png';
import dojoCelebration from '../assets/dojocelebration.png';
import teenTraining from '../assets/teentraining.png';
import OptimizedImage from './OptimizedImage';

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" aria-label="Hero">
      {/* Soft background using main hero image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage src={heroImage} alt="Dojo background" priority className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT: Content */}
          <div className="text-left">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/20 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-sm text-red-200 font-medium">New classes — enroll now</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4"
            >
              Master Discipline, Strength, and Confidence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="text-gray-300 text-lg md:text-xl max-w-xl mb-6"
            >
              Train with experienced instructors in a supportive community. Our programs build real skill,
              mental toughness, and lifelong discipline — for kids, teens, and adults.
            </motion.p>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.16 }} className="flex flex-wrap gap-4">
              <button onClick={() => scrollToSection('programs')} className="inline-flex items-center gap-3 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>

              <button onClick={() => scrollToSection('gallery')} className="inline-flex items-center gap-3 px-5 py-3 bg-transparent border border-gray-600 text-gray-100 rounded-lg hover:bg-white/5">
                <Play className="w-4 h-4" />
                See Gallery
              </button>
            </motion.div>
          </div>

          {/* RIGHT: Image collage */}
          <div className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center">
            <div className="relative w-full h-full rounded-3xl">
              {/* Large base image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden border-4 border-black/40 shadow-2xl">
                <OptimizedImage src={adultTraining} alt="Adult training" className="w-full h-full object-cover object-center" />
              </div>

              {/* Top-right accent */}
              <div className="absolute top-6 right-6 w-36 h-36 rounded-xl overflow-hidden border-2 border-white/10 shadow-lg">
                <OptimizedImage src={dojoCelebration} alt="Dojo celebration" className="w-full h-full object-cover object-center" />
              </div>

              {/* Bottom-left accent */}
              <div className="absolute bottom-6 left-6 w-44 h-28 rounded-xl overflow-hidden border-2 border-white/10 shadow-lg">
                <OptimizedImage src={teenTraining} alt="Teen training" className="w-full h-full object-cover object-center" />
              </div>

              {/* Center floating badge image */}
              <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-40 h-40 rounded-full overflow-hidden ring-4 ring-red-600/40 shadow-2xl">
                <OptimizedImage src={heroImage} alt="Sensei" className="w-full h-full object-cover object-center" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-center">
        <span className="text-xs text-gray-300 uppercase tracking-widest mb-2">Explore</span>
        <ChevronDown className="w-6 h-6 text-gray-300 animate-bounce" />
      </div>
    </section>
  );
}
