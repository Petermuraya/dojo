import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-800 px-4 md:px-8 py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-4 gap-12 mb-12"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">
              MWIKI <span className="text-red-600">DOJO</span>
            </h3>
            <p className="text-gray-400 text-sm">
              Forging discipline, building champions. Traditional karate for the modern world.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 cinzel">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Programs
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Locations
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Schedule
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 cinzel">CONTACT</h4>
            <ul className="space-y-3">
              <li className="flex gap-2 items-start">
                <Phone className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <a href="tel:+254713178790" className="text-gray-400 hover:text-red-600 transition-colors text-sm">0713178790</a>
              </li>
              <li className="flex gap-2 items-start">
                <Mail className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <a href="mailto:kevokiash@gmail.com" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  kevokiash@gmail.com
                </a>
              </li>
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Mwiki, Nairobi</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 cinzel">FOLLOW US</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-900 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-900 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-900 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>
              &copy; {currentYear} Mwiki Dojo. All rights reserved. | Train with purpose. Rise with discipline.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
