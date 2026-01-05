import { motion } from 'framer-motion';
import { Award, Medal, Trophy } from 'lucide-react';

export default function Instructor() {
  const achievements = [
    { label: 'Gold Medals', count: 12, icon: Medal, color: 'text-yellow-500' },
    { label: 'Silver', count: 8, icon: Medal, color: 'text-gray-300' },
    { label: 'Bronze', count: 15, icon: Medal, color: 'text-orange-600' },
    { label: 'Trophies', count: 24, icon: Trophy, color: 'text-yellow-600' },
  ];

  return (
    <section id="instructor" className="py-20 md:py-32 px-4 md:px-8 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full opacity-20" />
              <img
                src="https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg"
                alt="Sensei Karate Master"
                className="w-80 h-80 md:w-96 md:h-96 rounded-full object-cover border-4 border-yellow-600 relative z-10"
              />
              <div className="absolute -top-6 -right-6 bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-sm cinzel border-2 border-yellow-600">
                2ND DAN
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold text-white mb-2">
              Sensei <span className="text-red-600">Takeshi</span>
            </h2>
            <p className="text-yellow-600 font-bold text-lg cinzel mb-6">
              2nd Dan Black Belt • Master Instructor
            </p>

            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              With over 25 years of dedicated training and 15 years of instruction, Sensei Takeshi brings authentic discipline and modern teaching methods to every student. A former national champion, he combines traditional karate principles with contemporary coaching techniques to develop champions both in and out of the dojo.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {achievements.map((achievement, idx) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-red-600 transition-colors cursor-pointer group"
                  >
                    <Icon className={`${achievement.color} w-6 h-6 mb-2 group-hover:animate-pulse`} />
                    <p className="text-3xl font-bold text-white">{achievement.count}</p>
                    <p className="text-sm text-gray-400">{achievement.label}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
              >
                TRAIN WITH SENSEI
              </a>
              <a
                href="#contact"
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold transition-all duration-300"
              >
                LEARN MORE
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
