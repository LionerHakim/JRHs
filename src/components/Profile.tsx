import { motion } from 'motion/react';
import { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function About() {
  const [isActive, setIsActive] = useState(false);

  return (
    <section id="about" className="py-32 px-6 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          onClick={() => setIsActive(!isActive)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className={`p-6 md:p-12 lg:p-20 rounded-[3rem] relative overflow-hidden star-border cursor-pointer transition-all duration-700 group ${
            isActive 
              ? 'bg-white/[0.06] border border-accent-blue/40 shadow-[0_20px_80px_rgba(59,130,246,0.25)] scale-[1.02]' 
              : 'glass-panel glass-panel-hover'
          }`}
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-accent-blue via-accent-purple to-accent-pink opacity-80 group-hover:w-3 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-24 items-start relative z-10">
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-yellow text-xs font-medium mb-8 shadow-[0_0_15px_rgba(255,214,10,0.1)]">
                <Sparkles size={14} />
                <span className="tracking-widest uppercase">Profil</span>
              </div>
              <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter transition-colors duration-500 font-heading leading-none mb-8 ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-br from-accent-blue to-accent-purple' : 'text-white group-hover:text-gray-200'}`}>
                Tentang<br />Saya.
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-accent-blue to-accent-purple rounded-full"></div>
            </div>
            
            <div className={`lg:w-2/3 space-y-8 md:space-y-10 text-lg md:text-2xl lg:text-3xl leading-relaxed font-light transition-colors duration-500 ${isActive ? 'text-gray-100' : 'text-gray-300 group-hover:text-gray-200'}`}>
              <p className="first-letter:text-5xl md:first-letter:text-7xl first-letter:font-heading first-letter:mr-2 first-letter:float-left first-letter:text-accent-blue first-letter:leading-[0.8]">
                Saya memiliki ketertarikan mendalam untuk memahami bagaimana ekonomi, pasar keuangan, teknologi, dan perilaku manusia saling mempengaruhi dalam ekosistem modern.
              </p>
              <p className="relative pl-6 border-l-2 border-white/10 group-hover:border-accent-purple/50 transition-colors duration-500">
                Perjalanan saya mempelajari <span className="text-white font-medium bg-white/5 px-2 py-1 rounded-md">trading dan investasi</span> dimulai pada 9 Maret 2019, sebuah titik awal yang mengubah cara pandang saya terhadap nilai dan risiko.
              </p>
              <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                <p className="italic text-base md:text-lg lg:text-xl text-gray-400 font-serif">
                  "Bagi saya, memahami ekonomi bukan hanya tentang angka, tetapi juga tentang memahami manusia dan keputusan yang mereka ambil."
                </p>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 transition-all duration-500 ${isActive ? 'bg-accent-blue/20 border-accent-blue/50 text-accent-blue rotate-[-45deg]' : 'group-hover:bg-white/10 group-hover:scale-110 text-gray-400 group-hover:text-white'}`}>
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
