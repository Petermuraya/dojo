import { motion } from 'framer-motion';

export default function Ranks() {
  const belts = [
    { name: 'White Belt', level: 'Beginner', color: 'belt-white', description: 'The start of your journey' },
    { name: 'Yellow Belt', level: 'Foundation', color: 'belt-yellow', description: 'First light appears' },
    { name: 'Orange Belt', level: 'Progress', color: 'belt-orange', description: 'Growing strength' },
    { name: 'Green Belt', level: 'Intermediate', color: 'belt-green', description: 'Growth continues' },
    { name: 'Blue Belt', level: 'Advanced', color: 'belt-blue', description: 'Sky opens up' },
    { name: 'Red Belt', level: 'Expert', color: 'belt-red', description: 'Fire and mastery' },
    { name: 'Brown Belt', level: 'Master', color: 'belt-brown', description: 'Near completion' },
    { name: 'Black Belt', level: 'Master', color: 'belt-black', description: 'The beginning of true learning' },
  ];

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            RANKS & <span className="text-red-600">PROGRESSION</span>
          </h2>
          <p className="text-gray-400 text-lg">Each belt represents a milestone in your martial journey</p>
        </motion.div>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-max md:grid md:grid-cols-4 md:gap-4 md:min-w-full md:overflow-visible">
            {belts.map((belt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="group relative flex-shrink-0 md:flex-shrink"
              >
                <div className={`h-32 w-24 md:w-full md:h-40 ${belt.color} rounded-lg cursor-pointer overflow-hidden flex flex-col items-center justify-center p-3 text-center`}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center px-2 relative z-10">
                    <h3 className="text-white font-bold text-xs md:text-sm tracking-wider">
                      {belt.name}
                    </h3>
                    <p className="text-gray-200 text-xs md:text-xs mt-1">{belt.level}</p>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-300 text-xs mt-2 md:text-xs opacity-0 group-hover:opacity-100"
                    >
                      {belt.description}
                    </motion.p>
                  </div>
                  <motion.div
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="absolute bottom-0 left-0 h-1 bg-yellow-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 bg-gray-900 border-2 border-yellow-600 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Dan Levels (Black Belt)</h3>
              <p className="text-gray-400">
                Black Belt progression continues through 10 Dan levels, representing decades of dedicated practice and mastery.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold text-xl mb-4">Your Timeline</h3>
              <p className="text-gray-400">
                Most students reach Black Belt in 3-5 years of consistent training. Each rank takes dedication, discipline, and perseverance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
