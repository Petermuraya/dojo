import { motion } from 'framer-motion';
import { MessageCircle, Mail } from 'lucide-react';

export default function CTA() {
  return (
    <section id="contact" className="py-20 md:py-32 px-4 md:px-8 bg-black relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-red-600 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-600 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            READY TO BEGIN YOUR <span className="text-red-600">JOURNEY?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Train with purpose. Rise with discipline. Join a community dedicated to excellence and personal growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <motion.a
            href="https://wa.me/254713178790?text=I%20want%20to%20join%20the%20karate%20dojo"
            target="_blank"
            rel="noopener noreferrer"
            animate={{ boxShadow: ['0 0 20px rgba(34, 197, 94, 0.3)', '0 0 40px rgba(34, 197, 94, 0.6)', '0 0 20px rgba(34, 197, 94, 0.3)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="group px-10 py-5 bg-green-600 hover:bg-green-700 text-white font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            WHATSAPP JOIN
          </motion.a>
          <a
            href="mailto:kevokiash@gmail.com?subject=Karate%20Training%20Inquiry"
            className="group px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
          >
            <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
            EMAIL CONTACT
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="p-6 bg-gray-950 border-2 border-gray-800 rounded-lg hover:border-red-600 transition-colors">
            <p className="text-4xl font-bold text-yellow-600 mb-2">100%</p>
            <p className="text-gray-400">Money-back guarantee if you're not satisfied after your first month</p>
          </div>
          <div className="p-6 bg-gray-950 border-2 border-gray-800 rounded-lg hover:border-yellow-600 transition-colors">
            <p className="text-4xl font-bold text-red-600 mb-2">∞</p>
            <p className="text-gray-400">Lifetime access to our online knowledge base and community</p>
          </div>
          <div className="p-6 bg-gray-950 border-2 border-gray-800 rounded-lg hover:border-green-600 transition-colors">
            <p className="text-4xl font-bold text-green-600 mb-2">FREE</p>
            <p className="text-gray-400">First class is free — no commitment required to try us out</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
