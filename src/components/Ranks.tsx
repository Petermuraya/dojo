import { motion } from 'framer-motion';
import { ArrowRight, Target, Clock, Star, Award, Trophy } from 'lucide-react';

export default function Ranks() {
  const belts = [
    { 
      name: 'White Belt', 
      level: 'Beginner', 
      color: 'bg-gray-100', 
      textColor: 'text-gray-900',
      description: 'The foundation of your martial arts journey begins here',
      icon: '🥋',
      time: '3-6 months'
    },
    { 
      name: 'Yellow Belt', 
      level: 'Foundation', 
      color: 'bg-yellow-400', 
      textColor: 'text-gray-900',
      description: 'First light appears as basic techniques are mastered',
      icon: '🌟',
      time: '6-9 months'
    },
    { 
      name: 'Orange Belt', 
      level: 'Progress', 
      color: 'bg-orange-500', 
      textColor: 'text-white',
      description: 'Growing strength and confidence in technique',
      icon: '🔥',
      time: '9-12 months'
    },
    { 
      name: 'Purple Belt', 
      level: 'Development', 
      color: 'bg-purple-600', 
      textColor: 'text-white',
      description: 'Deepening technique, strategy, and conditioning',
      icon: '🟣',
      time: '10-14 months'
    },
    { 
      name: 'Green Belt', 
      level: 'Intermediate', 
      color: 'bg-emerald-600', 
      textColor: 'text-white',
      description: 'Significant growth and technical refinement',
      icon: '🌿',
      time: '1-1.5 years'
    },
    { 
      name: 'Brown Belt', 
      level: 'Master', 
      color: 'bg-amber-900', 
      textColor: 'text-white',
      description: 'Near completion, preparation for black belt',
      icon: '🎯',
      time: '3-4 years'
    },
    { 
      name: 'Black Belt', 
      level: 'Mastery', 
      color: 'bg-gradient-to-b from-gray-900 to-black', 
      textColor: 'text-white',
      description: 'The beginning of true learning and teaching',
      icon: '🥷',
      time: '4-5 years'
    },
  ];

  const danLevels = [
    'Shodan (1st Dan)', 'Nidan (2nd Dan)', 'Sandan (3rd Dan)', 
    'Yondan (4th Dan)', 'Godan (5th Dan)', 'Rokudan (6th Dan)',
    'Nanadan (7th Dan)', 'Hachidan (8th Dan)', 'Kudan (9th Dan)', 'Judan (10th Dan)'
  ];

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-gray-950 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 19px, #e53e3e 20px)`,
          backgroundSize: '20px 100%'
        }} />
      </div>
      
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-600/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900/50 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-red-600" />
            <span className="text-red-500 font-semibold tracking-widest text-sm uppercase">
              The Path to Mastery
            </span>
            <div className="w-12 h-px bg-red-600" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white">
              Belt
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-red-600">
              {' '}Ranks & Progression
            </span>
          </h2>
          
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Each belt represents not just a rank, but a milestone in your personal growth and martial arts journey
          </p>
        </motion.div>

        {/* Belt Grid */}
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-gray-800 to-transparent hidden md:block" />
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-red-600/50 via-yellow-500/50 to-red-600/50 hidden md:block blur-sm" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {belts.map((belt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300 }
                }}
                className="group relative"
              >
                {/* Card */}
                <div className="relative h-full rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-b from-gray-900/90 to-gray-950/90 backdrop-blur-sm">
                  {/* Belt Color Indicator */}
                  <div className={`h-3 ${belt.color} w-full`} />
                  
                  {/* Content */}
                  <div className="p-4 md:p-6">
                    {/* Emoji Icon */}
                    <div className="text-3xl mb-4">{belt.icon}</div>
                    
                    {/* Belt Info */}
                    <div className="mb-4">
                      <div className={`text-sm font-bold uppercase tracking-widest ${belt.textColor} mb-1`}>
                        {belt.level}
                      </div>
                      <h3 className="text-lg md:text-xl font-black text-white">{belt.name}</h3>
                    </div>
                    
                    {/* Time to Achieve */}
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{belt.time}</span>
                    </div>
                    
                    {/* Description (Hidden until hover) */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      whileHover={{ opacity: 1, height: 'auto' }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {belt.description}
                      </p>
                    </motion.div>
                    
                    {/* Progress Indicator */}
                    <div className="mt-6">
                      <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(idx + 1) * 12.5}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className={`h-full ${belt.color} rounded-full`}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Start</span>
                        <span>Progress</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                {/* Connection Arrow (Desktop only) */}
                {idx < belts.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-20 opacity-30 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-6 h-6 text-yellow-500" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Panels */}
        <div className="mt-20 grid lg:grid-cols-2 gap-8">
          {/* Dan Levels Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-yellow-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
            <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-yellow-500" />
                <h3 className="text-2xl font-bold text-white">Dan Levels (Black Belt)</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Black Belt is not the end, but the beginning of true mastery. Progress through 10 Dan levels represents decades of dedication.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {danLevels.map((level, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-sm text-gray-300">{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Timeline & Achievement Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-600 to-red-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition duration-500" />
            <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-8 h-8 text-red-500" />
                <h3 className="text-2xl font-bold text-white">Your Journey Timeline</h3>
              </div>
              <p className="text-gray-400 mb-6">
                The path to Black Belt typically takes 4-5 years of consistent training, but mastery is a lifelong pursuit.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-green-500" />
                    <span className="text-white">Average Time to Black Belt</span>
                  </div>
                  <span className="text-2xl font-black text-yellow-500">4-5 Years</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-blue-500" />
                    <span className="text-white">Minimum Training (Weekly)</span>
                  </div>
                  <span className="text-2xl font-black text-red-500">3 Sessions</span>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-400 italic">
                  "The black belt is not a sign of superiority, but an indicator that one is willing to be a student for life."
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg mb-6">
            Ready to begin your journey?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/30"
          >
            <span>Start Your Training Today</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}