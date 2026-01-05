import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useState } from 'react';

const galleryItems = [
  {
    src: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg',
    alt: 'Training Session',
    category: 'Training',
  },
  {
    src: 'https://images.pexels.com/photos/416680/pexels-photo-416680.jpeg',
    alt: 'Karate Tournament',
    category: 'Competition',
  },
  {
    src: 'https://images.pexels.com/photos/416758/pexels-photo-416758.jpeg',
    alt: 'Student Training',
    category: 'Training',
  },
  {
    src: 'https://images.pexels.com/photos/3761959/pexels-photo-3761959.jpeg',
    alt: 'Kids Class',
    category: 'Kids',
  },
  {
    src: 'https://images.pexels.com/photos/4326531/pexels-photo-4326531.jpeg',
    alt: 'Advanced Techniques',
    category: 'Training',
  },
  {
    src: 'https://images.pexels.com/photos/416744/pexels-photo-416744.jpeg',
    alt: 'Belt Ceremony',
    category: 'Achievement',
  },
  {
    src: 'https://images.pexels.com/photos/4325797/pexels-photo-4325797.jpeg',
    alt: 'Team Training',
    category: 'Training',
  },
  {
    src: 'https://images.pexels.com/photos/4325891/pexels-photo-4325891.jpeg',
    alt: 'Performance',
    category: 'Competition',
  },
];

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const openLightbox = (idx: number) => {
    setSelectedIdx(idx);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setSelectedIdx((prev) => (prev + 1) % galleryItems.length);
  };

  const prevImage = () => {
    setSelectedIdx((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section id="gallery" className="py-20 md:py-32 px-4 md:px-8 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            DOJO <span className="text-red-600">MOMENTS</span>
          </h2>
          <p className="text-gray-400 text-lg">Capturing the spirit of our training community</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer overflow-hidden rounded-lg"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-900">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <p className="text-white font-bold text-sm">{item.alt}</p>
                    <p className="text-yellow-600 text-xs cinzel">{item.category}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="flex items-center justify-center gap-4 w-full max-w-4xl">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <motion.img
              key={selectedIdx}
              src={galleryItems[selectedIdx].src}
              alt="Gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-full max-h-[80vh] rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <p className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
            {selectedIdx + 1} / {galleryItems.length}
          </p>
        </motion.div>
      )}
    </section>
  );
}
