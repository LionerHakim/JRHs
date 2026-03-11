import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function Motivation() {
  return (
    <section id="motivation" className="py-32 px-6 relative">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="glass-panel p-8 md:p-16 lg:p-24 rounded-[3rem] relative overflow-hidden glass-panel-hover star-border group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-110 transform">
            <Quote size={120} className="text-accent-blue" />
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 tracking-tighter font-heading">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Motivasi</span>
            </h2>
            
            <div className="space-y-6 md:space-y-8 text-xl md:text-3xl lg:text-4xl text-gray-200 leading-tight font-light italic max-w-4xl mx-auto">
              <p className="group-hover:text-white transition-colors duration-500">
                "Saya percaya bahwa kehidupan adalah proses belajar yang <span className="text-accent-blue font-medium">tidak pernah berhenti</span>."
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-400 group-hover:text-gray-300 transition-colors duration-500">
                "Pengetahuan, pengalaman, dan refleksi diri membantu seseorang memahami dunia serta berkembang menjadi pribadi yang lebih baik."
              </p>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/10 flex justify-center items-center gap-4">
              <div className="w-12 h-[1px] bg-accent-blue/50" />
              <span className="text-sm font-mono tracking-widest text-accent-blue uppercase">Jefri Rahman Hakim</span>
              <div className="w-12 h-[1px] bg-accent-blue/50" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
