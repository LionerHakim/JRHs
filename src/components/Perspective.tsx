import { motion } from 'motion/react';
import { Quote, Sparkles } from 'lucide-react';

export default function Motivation() {
  return (
    <section id="motivation" className="py-24 md:py-32 lg:py-40 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ boxShadow: '0 25px 80px rgba(59, 130, 246, 0.15)' }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="group relative rounded-3xl border border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] p-8 md:p-16 lg:p-20 overflow-hidden cursor-pointer transition-all duration-500"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
            <Quote size={120} className="text-blue-400" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-10 md:mb-14">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-400"></div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Personal Philosophy</span>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>
            
            <div className="space-y-8 md:space-y-10 text-xl md:text-2xl lg:text-3xl text-gray-200 leading-tight font-light italic">
              <p className="group-hover:text-white transition-colors duration-500">
                "I believe life is a <span className="text-blue-400 font-medium not-italic">never-ending learning process</span>."
              </p>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-400 group-hover:text-gray-300 transition-colors duration-500 not-italic font-light">
                Knowledge, experience, and self-reflection help one understand the world and grow into a better person.
              </p>
            </div>
            
            <div className="mt-12 md:mt-16 pt-8 border-t border-white/10 flex justify-center items-center gap-4">
              <Sparkles size={16} className="text-blue-400/60" />
              <span className="text-sm font-mono tracking-widest text-blue-400/80 uppercase">Jefri Rahman Hakim</span>
              <Sparkles size={16} className="text-blue-400/60" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
