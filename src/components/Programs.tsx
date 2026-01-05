import { motion } from 'framer-motion';
import { Users, Clock, Target, Award, Sparkles, Shield, Zap, Heart, Brain, Trophy, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface Program {
  title: string;
  age: string;
  description: string;
  schedule: string;
  icon: React.ReactNode;
  benefits: { name: string; icon: React.ReactNode; description: string }[];
  intensity: number;
  focus: string[];
}

const programs: Program[] = [
  {
    title: 'Kids Karate',
    age: 'Ages 5-8',
    description: 'Building confidence, coordination, and character through fun, engaging martial arts lessons designed for young minds.',
    schedule: 'Mon, Wed, Fri • 4:00 PM',
    icon: <Users className="w-8 h-8" />,
    intensity: 2,
    focus: ['Fun Learning', 'Character Building', 'Basic Techniques'],
    benefits: [
      { name: 'Confidence', icon: <Star className="w-4 h-4" />, description: 'Build self-esteem through achievement' },
      { name: 'Discipline', icon: <Shield className="w-4 h-4" />, description: 'Develop focus and self-control' },
      { name: 'Coordination', icon: <Zap className="w-4 h-4" />, description: 'Improve motor skills and balance' },
      { name: 'Social Skills', icon: <Heart className="w-4 h-4" />, description: 'Learn teamwork and respect' }
    ],
  },
  {
    title: 'Teens Training',
    age: 'Ages 9-14',
    description: 'Dynamic training that builds physical strength, mental focus, and competitive spirit in a supportive environment.',
    schedule: 'Tue, Thu, Sat • 5:00 PM',
    icon: <Target className="w-8 h-8" />,
    intensity: 4,
    focus: ['Advanced Techniques', 'Competition Prep', 'Leadership'],
    benefits: [
      { name: 'Leadership', icon: <TrendingUp className="w-4 h-4" />, description: 'Develop responsibility and guidance skills' },
      { name: 'Stress Relief', icon: <Brain className="w-4 h-4" />, description: 'Healthy outlet for teenage pressures' },
      { name: 'Goal Setting', icon: <Target className="w-4 h-4" />, description: 'Learn to set and achieve objectives' },
      { name: 'Physical Fitness', icon: <Zap className="w-4 h-4" />, description: 'Build strength and endurance' }
    ],
  },
  {
    title: 'Adult Karate',
    age: 'Ages 15+',
    description: 'Comprehensive training for adults seeking physical fitness, stress relief, and martial arts mastery.',
    schedule: 'Mon, Wed, Fri • 6:30 PM',
    icon: <Award className="w-8 h-8" />,
    intensity: 5,
    focus: ['Mastery', 'Physical Fitness', 'Mental Discipline'],
    benefits: [
      { name: 'Mental Clarity', icon: <Brain className="w-4 h-4" />, description: 'Improved focus and mindfulness' },
      { name: 'Total Fitness', icon: <Zap className="w-4 h-4" />, description: 'Complete body workout' },
      { name: 'Stress Management', icon: <Heart className="w-4 h-4" />, description: 'Release tension through movement' },
      { name: 'Community', icon: <Users className="w-4 h-4" />, description: 'Connect with like-minded individuals' }
    ],
  },
  {
    title: 'Competition Training',
    age: 'All Ages',
    description: 'Elite coaching program for serious competitors aiming for tournament success and championship titles.',
    schedule: 'Sat, Sun • 10:00 AM',
    icon: <Trophy className="w-8 h-8" />,
    intensity: 5,
    focus: ['Tournament Prep', '1-on-1 Coaching', 'Performance Excellence'],
    benefits: [
      { name: 'Elite Coaching', icon: <Sparkles className="w-4 h-4" />, description: 'Personalized training plans' },
      { name: 'Competition Skills', icon: <Trophy className="w-4 h-4" />, description: 'Tournament strategy and execution' },
      { name: 'Performance Analysis', icon: <Target className="w-4 h-4" />, description: 'Video review and technique refinement' },
      { name: 'Championship Mindset', icon: <Award className="w-4 h-4" />, description: 'Mental preparation for competition' }
    ],
  },
];

export default function Programs() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section id="programs" className="relative py-24 px-4 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            <span className="text-red-500 font-semibold tracking-widest text-sm uppercase">
              Transformative Training
            </span>
            <div className="w-12 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              TRAINING
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-red-600">
              {' '}PROGRAMS
            </span>
          </h2>
          
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Each program is carefully designed to maximize growth, development, and achievement at every age and skill level
          </p>
        </motion.div>

        {/* Program Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ 
                y: -6,
                transition: { type: 'spring', stiffness: 300 }
              }}
              className="group relative"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600/30 via-yellow-500/20 to-red-600/30 rounded-2xl blur opacity-0 group-hover:opacity-70 transition duration-500" />
              
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                {/* Intensity Indicator */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="flex items-center gap-1 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-700">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i < program.intensity ? 'bg-red-500' : 'bg-gray-700'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Header Section */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-xl border border-red-600/30">
                        <div className="text-red-500">{program.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white mb-1">{program.title}</h3>
                        <div className="flex items-center gap-3">
                          <span className="text-yellow-500 font-bold text-sm tracking-wider bg-yellow-500/10 px-3 py-1 rounded-full">
                            {program.age}
                          </span>
                          <div className="text-xs text-gray-400 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {program.schedule}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 mb-8 leading-relaxed">
                    {program.description}
                  </p>

                  {/* Focus Areas */}
                  <div className="mb-8">
                    <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-3">
                      Program Focus
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {program.focus.map((focus, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-800/50 text-gray-300 text-sm font-medium rounded-full border border-gray-700"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Benefits Toggle */}
                  <div className="mb-6">
                    <button
                      onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <span className="text-white font-bold text-lg">
                        Key Benefits
                        <span className="text-red-500 ml-2">↓</span>
                      </span>
                      <span className="text-gray-400 text-sm">
                        {expandedIdx === idx ? 'Show Less' : 'Show More'}
                      </span>
                    </button>
                  </div>

                  {/* Expanded Benefits */}
                  <motion.div
                    initial={false}
                    animate={{ height: expandedIdx === idx ? 'auto' : 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 border-t border-gray-800">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {program.benefits.map((benefit, i) => (
                          <div
                            key={i}
                            className="group/benefit p-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-xl border border-gray-700/50 hover:border-red-500/30 transition-all duration-300"
                          >
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-lg">
                                <div className="text-red-400">{benefit.icon}</div>
                              </div>
                              <div>
                                <h4 className="text-white font-bold mb-1">{benefit.name}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                  {benefit.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* CTA Section */}
                <div className="px-8 pb-8">
                  <div className="pt-6 border-t border-gray-800">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="flex-1 px-6 py-4 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/40 group/btn">
                        <span className="flex items-center justify-center gap-2">
                          START TRAINING
                          <Sparkles className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </span>
                      </button>
                      <button className="flex-1 px-6 py-4 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 text-white font-bold rounded-xl transition-all duration-300">
                        FREE TRIAL CLASS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="relative overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-r from-gray-900/50 to-gray-950/50 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-yellow-600/10" />
            
            <div className="relative p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center md:justify-start gap-3 mb-4">
                    <Shield className="w-6 h-6 text-yellow-500" />
                    <h3 className="text-xl font-bold text-white">All Programs Include</h3>
                  </div>
                  <ul className="text-gray-400 space-y-2">
                    <li className="flex items-center justify-center md:justify-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      Personalized Instruction
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      Belt Testing Opportunities
                    </li>
                    <li className="flex items-center justify-center md:justify-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      Tournament Network Access
                    </li>
                  </ul>
                </div>

                <div className="text-center md:text-left">
                  <div className="inline-flex items-center justify-center md:justify-start gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-red-500" />
                    <h3 className="text-xl font-bold text-white">Special Offer</h3>
                  </div>
                  <p className="text-yellow-500 font-bold text-lg">
                    First Class is FREE
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    No commitment required • Experience real training
                  </p>
                </div>

                <div className="text-center">
                  <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/40">
                    BOOK YOUR FREE TRIAL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}