import { motion } from 'framer-motion';
import { Users, Clock, Target, Award } from 'lucide-react';
import { useState } from 'react';

interface Program {
  title: string;
  age: string;
  description: string;
  schedule: string;
  icon: React.ReactNode;
  benefits: string[];
  price: string;
}

const programs: Program[] = [
  {
    title: 'Kids Karate',
    age: 'Ages 5-8',
    description: 'Building confidence and coordination in our youngest martial artists.',
    schedule: 'Mon, Wed, Fri • 4:00 PM',
    icon: <Users className="w-8 h-8" />,
    benefits: ['Discipline', 'Coordination', 'Confidence', 'Respect'],
    price: '$59/month',
  },
  {
    title: 'Teens Training',
    age: 'Ages 9-14',
    description: 'Intensive technique development with focus on competition preparation.',
    schedule: 'Tue, Thu, Sat • 5:00 PM',
    icon: <Target className="w-8 h-8" />,
    benefits: ['Advanced Techniques', 'Competition', 'Leadership', 'Strength'],
    price: '$69/month',
  },
  {
    title: 'Adult Karate',
    age: 'Ages 15+',
    description: 'Professional training for serious martial artists seeking mastery.',
    schedule: 'Mon, Wed, Fri • 6:30 PM',
    icon: <Award className="w-8 h-8" />,
    benefits: ['Mastery', 'Physical Fitness', 'Mental Discipline', 'Community'],
    price: '$79/month',
  },
  {
    title: 'Competition Training',
    age: 'All Ages',
    description: 'Elite coaching for tournament preparation and championship success.',
    schedule: 'Sat, Sun • 10:00 AM',
    icon: <Clock className="w-8 h-8" />,
    benefits: ['Tournament Prep', '1-on-1 Coaching', 'Performance', 'Excellence'],
    price: '$99/month',
  },
];

export default function Programs() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section id="programs" className="py-20 md:py-32 px-4 md:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            TRAINING <span className="text-red-600">PROGRAMS</span>
          </h2>
          <p className="text-gray-400 text-lg">TRAIN WITH PURPOSE</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {programs.map((program, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-gray-950 border-2 border-gray-800 hover:border-red-600 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-red-600">{program.icon}</div>
                  <span className="text-yellow-600 font-bold text-sm cinzel">
                    {program.age}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{program.description}</p>

                <div className="flex items-center text-gray-300 text-sm mb-6">
                  <Clock className="w-4 h-4 mr-2 text-red-600" />
                  {program.schedule}
                </div>

                <div className="text-2xl font-bold text-yellow-600 mb-6">
                  {program.price}
                </div>

                <motion.div
                  animate={{ height: expandedIdx === idx ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mb-6"
                >
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-gray-300 text-sm font-semibold mb-3">Key Benefits:</p>
                    <div className="flex flex-wrap gap-2">
                      {program.benefits.map((benefit, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-red-600/20 text-red-300 text-xs font-semibold rounded-full"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <button className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-red-600 hover:bg-red-700 text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50">
                  ENROLL NOW
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 p-8 bg-gradient-to-r from-red-600/10 to-yellow-600/10 border-2 border-red-600/30 rounded-lg text-center"
        >
          <p className="text-gray-300 mb-4">
            All programs include personalized instruction, belt testing opportunities, and access to our competitive tournament network.
          </p>
          <p className="text-yellow-600 font-bold">First class is FREE • No contract required</p>
        </motion.div>
      </div>
    </section>
  );
}
