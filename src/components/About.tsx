import { motion } from 'framer-motion';
import adultTraining from '../assets/aldulttraining.png';

export default function About() {
  const principles = [
    { title: 'DISCIPLINE', desc: 'The foundation of all growth' },
    { title: 'RESPECT', desc: 'For self, others, and tradition' },
    { title: 'STRENGTH', desc: 'Physical and mental resilience' },
    { title: 'HONOR', desc: 'Living with integrity always' },
  ];

  return (
    <section id="about" className="py-20 md:py-32 px-4 md:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ABOUT THE <span className="text-red-600">DOJO</span>
            </h2>

            <p className="text-gray-300 text-base mb-6 leading-relaxed">
              Founded on principles of traditional karate, our dojo is a sanctuary for discipline and personal growth. We honor 300 years of martial arts heritage while embracing modern training science.
            </p>

            <p className="text-gray-400 text-sm md:text-base mb-8 leading-relaxed">
              Every student is more than a rank. They're a part of our family, learning not just to fight, but to live with purpose, respect, and unshakeable resolve.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {principles.map((principle, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="p-4 border-l-4 border-red-600"
                >
                  <h3 className="text-yellow-600 font-bold text-sm cinzel mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{principle.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 flex justify-center"
          >
            <div className="relative w-full max-w-2xl">
              <div className="absolute -inset-6 rounded-2xl bg-gradient-to-br from-red-600/20 to-yellow-600/20 blur-2xl" />
              <img
                src={adultTraining}
                alt="Dojo training session"
                className="w-full h-[420px] md:h-[520px] rounded-2xl object-cover border-4 border-yellow-600 relative z-10 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
