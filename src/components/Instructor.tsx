import { motion } from 'framer-motion';
import { Medal, Trophy, Award, Clock, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import instructorImage from '../assets/instructor.jpg';

export default function Instructor({ summary }: { summary?: boolean }) {
  const isSummary = !!summary;
  const achievements = [
    { label: 'Medals', count: 8, icon: Medal, color: 'text-red-500' },
    { label: 'Trophies', count: 4, icon: Trophy, color: 'text-yellow-500' },
    { label: 'Dan Rank', count: 2, icon: Award, color: 'text-gray-200' },
    { label: 'Years', count: '15+', icon: Clock, color: 'text-red-500' },
  ];

  const stats = [
    { value: '200+', label: 'Students Trained', icon: Users },
    { value: '98%', label: 'Satisfaction Rate', icon: Target },
  ];

  if (isSummary) {
    return (
      <section className="py-16 px-4 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-40 h-40 rounded-2xl overflow-hidden border-4 border-yellow-600 bg-black flex items-center justify-center">
            <img src={instructorImage} alt="Sensei Kelvin" className="max-h-full max-w-full object-contain object-center" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white">Sensei Kelvin Kiarie</h3>
            <p className="text-yellow-600 font-semibold mb-2">2nd Degree Black Belt • Head Instructor</p>
            <p className="text-gray-400 mb-4 max-w-xl">Sensei Kelvin has over 15 years of dedicated training and competitive experience. He focuses on discipline, skill development, and mentorship.</p>
            <Link to="/instructor" className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg">Read more</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="instructor"
      className="relative py-28 px-4 bg-gradient-to-b from-black via-gray-950 to-black overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-600/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-3 gap-12 items-start"
        >
          {/* IMAGE COLUMN - Fixed cropping */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full lg:col-span-2"
          >
            {/* Main Image Container - large, fills most of the section */}
            <div className="relative group w-full h-[min(80vh,900px)] rounded-3xl overflow-hidden border-8 border-gray-800 shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
              {/* Image - keep portrait fully visible */}
              <div className="w-full h-full flex items-center justify-center bg-black">
                <img
                  src={instructorImage}
                  alt="Sensei Kelvin Kiarie"
                  className="max-h-full max-w-full w-auto h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Top-left Experience Badge */}
              <div className="absolute top-6 left-6 bg-red-700/90 text-white px-5 py-3 rounded-xl shadow-2xl z-20">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold tracking-widest">15+ YEARS</span>
                </div>
              </div>

              {/* Bottom-right Rank Badge */}
              <div className="absolute bottom-6 right-6 bg-yellow-400 text-black px-6 py-3 rounded-xl border border-black/20 shadow-2xl z-20">
                <div className="flex flex-col items-center">
                  <span className="text-xs font-bold uppercase tracking-widest">Rank</span>
                  <span className="text-2xl font-black">2ND DAN</span>
                </div>
              </div>

              {/* Stats column - left side overlay */}
              <div className="absolute left-6 bottom-6 flex flex-col gap-4 z-20">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.08 }}
                    className="bg-black/70 backdrop-blur-sm border border-gray-800 rounded-xl px-5 py-3 shadow-xl"
                  >
                    <div className="flex items-center gap-3">
                      <stat.icon className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-gray-400">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CONTENT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-start lg:col-span-1 lg:sticky lg:top-28 space-y-6"
          >
            <div>
              <p className="text-sm text-red-500 font-semibold uppercase tracking-widest mb-3">
                Elite Martial Arts Instructor
              </p>

              <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Sensei <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-500 to-red-600">Kelvin Kiarie Nyambura</span>
              </h2>

              <p className="text-yellow-400 font-semibold mt-2">2nd Degree Black Belt • Head Instructor</p>
            </div>

            <div className="text-gray-300 text-sm leading-relaxed">
              <p className="mb-3">
                Sensei Kelvin brings 15+ years of training and coaching experience. He focuses on
                technique, discipline, and developing confident students through structured training.
              </p>
              <p className="mb-1 text-gray-400">Born in 1986; started formal training in 2010; 2nd Degree Black Belt (2022).</p>
            </div>

            <div className="h-px bg-gray-800 my-2" />

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-800">
                <h4 className="text-white font-bold mb-2">Certifications</h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>1st Degree Black Belt — 2016</li>
                  <li>2nd Degree Black Belt — 2022</li>
                </ul>
              </div>

              <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-800">
                <h4 className="text-white font-bold mb-2">Contact</h4>
                <p className="text-gray-300 text-sm">Email: <a href="mailto:kevokiash@gmail.com" className="text-yellow-500">kevokiash@gmail.com</a></p>
                <p className="text-gray-300 text-sm">Phone: <a href="tel:+254713178790" className="text-yellow-500">0713178790</a></p>
              </div>
            </div>

            <div className="h-px bg-gray-800 my-2" />

            <div>
              <h4 className="text-white font-bold mb-3">Achievements</h4>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((a, i) => {
                  const Icon = a.icon;
                  return (
                    <div key={i} className="bg-gray-900/60 p-3 rounded-lg border border-gray-800 flex items-start gap-3">
                      <Icon className={`${a.color} w-6 h-6 mt-1`} />
                      <div>
                        <p className="text-lg font-bold text-white">{a.count}</p>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">{a.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <a href="#contact" className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-lg text-center">Start Training</a>
              <a href="#achievements" className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg text-center">View Achievements</a>
            </div>

            <div className="text-gray-400 text-xs mt-4">
              <p>Clubs: Mwiki Kenpo Club • Gym Rock • Mount Lavena Girls</p>
              <p className="mt-1">Social: <a href="https://wa.me/254713178790" className="text-yellow-500">WhatsApp</a> • <a href="https://www.facebook.com/search/top?q=Kelvin%20Kiarie" className="text-yellow-500">Facebook</a></p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}