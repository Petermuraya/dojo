import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';

const locations = [
  {
    name: 'Mwiki Kenpo Club',
    address: 'Mwiki, Nairobi',
    hours: 'Mon-Fri: 3:00 PM - 8:00 PM\nSat-Sun: 9:00 AM - 5:00 PM',
    phone: '+254 700 123 456',
    classes: 'All Programs',
  },
  {
    name: 'Gym Rock & Antoniette',
    address: 'Sunton Mwiki, Nairobi',
    hours: 'Mon-Fri: 4:00 PM - 9:00 PM\nSat-Sun: 10:00 AM - 6:00 PM',
    phone: '+254 700 234 567',
    classes: 'Competition Training',
  },
  {
    name: 'Mount Lavena Girls',
    address: 'Kasarani, Nairobi',
    hours: 'Mon-Fri: 3:30 PM - 7:30 PM\nSat: 9:00 AM - 4:00 PM',
    phone: '+254 700 345 678',
    classes: 'Kids & Teens',
  },
];

export default function Locations() {
  return (
    <section id="locations" className="py-20 md:py-32 px-4 md:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            LOCATIONS & <span className="text-red-600">SCHEDULE</span>
          </h2>
          <p className="text-gray-400 text-lg">Train at a dojo near you</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {locations.map((location, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-gray-950 border-2 border-gray-800 hover:border-red-600 rounded-lg overflow-hidden transition-all duration-300"
            >
              <div className="h-32 bg-gradient-to-br from-red-600/20 to-yellow-600/20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2040%2040%22%3E%3Cpath%20d=%22M0%200h40v40H0z%22%20fill=%22%23C1121F%22/%3E%3C/svg%3E')]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-red-600 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{location.name}</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-400 text-sm">{location.address}</p>
                  </div>

                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-gray-400 text-sm whitespace-pre-line">
                      {location.hours}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <a
                      href={`https://wa.me/${location.phone.replace(/\D/g, '')}`}
                      className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>

                <div className="mb-6 p-3 bg-gray-900 rounded border-l-4 border-yellow-600">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-yellow-600">Programs: </span>
                    {location.classes}
                  </p>
                </div>

                <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50">
                  GET DIRECTIONS
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 p-8 bg-gray-950 border-2 border-yellow-600 rounded-lg"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Can't find your location?</h3>
              <p className="text-gray-400">
                We're expanding! Contact us to discuss opening a dojo in your area or arrange a private group session.
              </p>
            </div>
            <button className="px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-600/50 whitespace-nowrap">
              CONTACT US
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
