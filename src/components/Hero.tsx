import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center hero-bg-zoom"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/4325744/pexels-photo-4325744.jpeg)',
          opacity: 0.3,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />

      <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wider">
            FORGING <span className="text-red-600">DISCIPLINE</span>
          </h1>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider">
            BUILDING <span className="text-yellow-500">CHAMPIONS</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl"
        >
          Traditional Karate • Modern Training • Global Standards
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 mb-16"
        >
          <button
            onClick={() => scrollToSection('programs')}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 hover:scale-105"
          >
            JOIN TRAINING
          </button>
          <button
            onClick={() => scrollToSection('instructor')}
            className="px-8 py-4 bg-transparent border-2 border-yellow-500 hover:bg-yellow-500/10 text-yellow-500 font-bold text-lg transition-all duration-300"
          >
            MEET THE INSTRUCTOR
          </button>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8"
        >
          <ChevronDown className="w-8 h-8 text-red-600" />
        </motion.div>
      </div>
    </div>
  );
}
