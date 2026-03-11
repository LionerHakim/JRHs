import { motion } from 'motion/react';
import { Heart, Shield, TrendingUp, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Relationship() {
  const [isActive, setIsActive] = useState(false);

  return (
    <section id="relationship" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          onClick={() => setIsActive(!isActive)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className={`p-6 md:p-12 lg:p-16 rounded-[3rem] relative overflow-hidden star-border cursor-pointer transition-all duration-700 group ${
            isActive 
              ? 'bg-accent-pink/5 border border-accent-pink/40 shadow-[0_20px_80px_rgba(236,72,153,0.2)] scale-[1.02]' 
              : 'glass-panel glass-panel-hover'
          }`}
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-accent-pink via-accent-purple to-accent-orange opacity-80 group-hover:w-3 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/5 via-transparent to-accent-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-pink text-xs font-medium mb-8 shadow-[0_0_15px_rgba(236,72,153,0.1)]">
              <Heart size={14} className={isActive ? "animate-pulse" : ""} />
              <span className="tracking-widest uppercase">Nilai Personal</span>
            </div>

            <h2 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tighter font-heading transition-colors duration-500 ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-accent-pink to-accent-orange' : 'text-white group-hover:text-gray-200'}`}>
              Perspektif Hubungan
            </h2>
            
            <div className={`space-y-6 text-lg md:text-xl lg:text-2xl leading-relaxed font-light mb-16 transition-colors duration-500 max-w-3xl ${isActive ? 'text-gray-100' : 'text-gray-300 group-hover:text-gray-200'}`}>
              <p className="relative pl-6 border-l-2 border-white/10 group-hover:border-accent-pink/50 transition-colors duration-500">
                Hubungan yang bermakna dibangun di atas fondasi komunikasi yang jujur, rasa saling menghargai yang mendalam, dan keselarasan dalam nilai-nilai kehidupan.
              </p>
            </div>

            <div className="pt-10 border-t border-white/10">
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="text-accent-yellow w-5 h-5" />
                <h3 className="text-2xl font-medium text-white font-heading">Karakter Esensial:</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center gap-4 hover:bg-accent-pink/10 hover:border-accent-pink/40 hover:shadow-[0_15px_40px_rgba(236,72,153,0.2)] transition-all duration-500 cursor-pointer star-border group/card"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-pink/10 flex items-center justify-center mb-2 group-hover/card:scale-110 group-hover/card:bg-accent-pink/20 transition-all duration-500">
                    <Heart className="text-accent-pink w-8 h-8" />
                  </div>
                  <span className="text-gray-100 font-medium text-lg">Kedewasaan Emosional</span>
                  <p className="text-sm text-gray-400 font-light">Kemampuan memahami dan mengelola emosi dengan bijak.</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center gap-4 hover:bg-accent-blue/10 hover:border-accent-blue/40 hover:shadow-[0_15px_40px_rgba(59,130,246,0.2)] transition-all duration-500 cursor-pointer star-border group/card"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-blue/10 flex items-center justify-center mb-2 group-hover/card:scale-110 group-hover/card:bg-accent-blue/20 transition-all duration-500">
                    <Shield className="text-accent-blue w-8 h-8" />
                  </div>
                  <span className="text-gray-100 font-medium text-lg">Integritas</span>
                  <p className="text-sm text-gray-400 font-light">Kejujuran dan konsistensi dalam tindakan dan nilai.</p>
                </motion.div>
                
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 flex flex-col items-center text-center gap-4 hover:bg-accent-yellow/10 hover:border-accent-yellow/40 hover:shadow-[0_15px_40px_rgba(251,191,36,0.2)] transition-all duration-500 cursor-pointer star-border group/card"
                >
                  <div className="w-16 h-16 rounded-full bg-accent-yellow/10 flex items-center justify-center mb-2 group-hover/card:scale-110 group-hover/card:bg-accent-yellow/20 transition-all duration-500">
                    <TrendingUp className="text-accent-yellow w-8 h-8" />
                  </div>
                  <span className="text-gray-100 font-medium text-lg">Tumbuh Bersama</span>
                  <p className="text-sm text-gray-400 font-light">Komitmen untuk terus belajar dan berkembang berdua.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
