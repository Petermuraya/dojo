import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Student • 3rd Kyu',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    text: 'Training here changed my life. I came for the fitness, stayed for the discipline and community. Sensei Takeshi is an incredible mentor.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Student • 1st Dan Black Belt',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    text: 'The best decision I made was to train at this dojo. The progression is clear, the teaching is excellent, and I finally achieved my black belt dream.',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Parent • Kids Class',
    image: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg',
    text: 'My son has become so much more confident and disciplined. The instructors really care about each student\'s growth, not just their rank.',
    rating: 5,
  },
  {
    name: 'David Okonkwo',
    role: 'Competitor • Tournament Winner',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
    text: 'The competition coaching here is unmatched. I went from beginner to regional champion in just two years. This is where champions are made.',
    rating: 5,
  },
  {
    name: 'Lisa Park',
    role: 'Student • 2nd Kyu',
    image: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
    text: 'More than a karate dojo, this is a family. The support from Sensei and my fellow students kept me going through tough times.',
    rating: 5,
  },
  {
    name: 'James Mitchell',
    role: 'Student • Adult Program',
    image: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
    text: 'Started training at 35 and never looked back. Proves it\'s never too late to pursue your dreams. Best fitness and mental training ever.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const next = () => {
    setCurrentIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIdx + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            VOICES FROM OUR <span className="text-red-600">DOJO</span>
          </h2>
          <p className="text-gray-400 text-base">Stories of transformation and achievement</p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
            {getVisibleTestimonials().map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-gray-900 border-2 border-gray-800 hover:border-red-600 rounded-lg transition-all duration-300 group"
              >
                <div className="flex gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-yellow-600"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <h3 className="text-white font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-yellow-600 text-sm cinzel">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-600 text-yellow-600" />
                  ))}
                </div>

                <p className="text-gray-300 italic">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="md:hidden">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-gray-900 border-2 border-red-600 rounded-lg"
            >
              <div className="flex gap-4 mb-6">
                <img
                  src={testimonials[currentIdx].image}
                  alt={testimonials[currentIdx].name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-yellow-600"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3 className="text-white font-bold text-lg">{testimonials[currentIdx].name}</h3>
                  <p className="text-yellow-600 text-sm cinzel">{testimonials[currentIdx].role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonials[currentIdx].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-600 text-yellow-600" />
                ))}
              </div>

              <p className="text-gray-300 italic">{testimonials[currentIdx].text}</p>
            </motion.div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 hover:bg-gray-900 rounded-full transition-colors border border-gray-700 hover:border-red-600"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIdx ? 'bg-red-600 w-8' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-3 hover:bg-gray-900 rounded-full transition-colors border border-gray-700 hover:border-red-600"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
