import { motion } from 'motion/react';
import { Instagram, MessageCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [isActive, setIsActive] = useState(false);

  return (
    <section id="contact" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          onClick={() => setIsActive(!isActive)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className={`p-8 md:p-16 lg:p-20 rounded-[3rem] star-border cursor-pointer transition-all duration-700 relative overflow-hidden group ${
            isActive 
              ? 'bg-emerald-500/10 border border-emerald-500/40 shadow-[0_30px_100px_rgba(16,185,129,0.2)] scale-[1.02]' 
              : 'glass-panel glass-panel-hover'
          }`}
        >
          <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-700 pointer-events-none ${isActive ? 'opacity-100' : 'group-hover:opacity-50'}`} />
          
          <div className="relative z-10">
            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tighter font-heading transition-colors duration-500 ${isActive ? 'text-emerald-400' : 'text-white'}`}>
              Mari <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-accent-blue">Terhubung</span>
            </h2>
            
            <div className={`max-w-2xl mx-auto space-y-6 text-lg md:text-xl lg:text-2xl leading-relaxed font-light mb-16 transition-colors duration-500 ${isActive ? 'text-gray-100' : 'text-gray-400'}`}>
              <p>
                Saya terbuka untuk percakapan yang bermakna, diskusi ide inovatif, maupun peluang kolaborasi strategis.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href="https://instagram.com/jefrirh_"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="group/btn flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-semibold shadow-[0_10px_30px_rgba(236,72,153,0.3)] hover:shadow-[0_20px_40px_rgba(236,72,153,0.5),0_0_30px_rgba(147,51,234,0.5)] transition-all duration-500 w-full sm:w-auto justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
                <Instagram size={24} className="relative z-10 group-hover/btn:rotate-12 transition-transform duration-500" />
                <span className="relative z-10 text-lg tracking-wide">Instagram</span>
                <ArrowRight size={20} className="relative z-10 opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-500" />
              </motion.a>
              
              <motion.a
                href="https://wa.me/6284916088?text=Halo%20Jefri,%20saya%20mengunjungi%20website%20CV%20Anda%20dan%20tertarik%20untuk%20berdiskusi%20lebih%20lanjut%20mengenai%20peluang%20kolaborasi."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="group/btn flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full text-white font-semibold shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.5),0_0_30px_rgba(45,212,191,0.5)] transition-all duration-500 w-full sm:w-auto justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
                <MessageCircle size={24} className="relative z-10 group-hover/btn:-rotate-12 transition-transform duration-500" />
                <span className="relative z-10 text-lg tracking-wide">WhatsApp</span>
                <ArrowRight size={20} className="relative z-10 opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-500" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
