import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function About() {
  const [isActive, setIsActive] = useState(false);

  return (
    <section id="about" className="py-24 md:py-32 lg:py-40 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[800px] h-[800px] rounded-full blur-[200px] bg-gradient-to-l from-blue-500/15 via-purple-500/10 to-transparent"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          onClick={() => setIsActive(!isActive)}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ boxShadow: '0 25px 80px rgba(59, 130, 246, 0.15)' }}
          whileTap={{ scale: 0.98 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1 }}
          className={`group relative overflow-hidden rounded-3xl border transition-all duration-700 cursor-pointer ${
            isActive
              ? 'bg-white/[0.08] border-blue-500/40 shadow-[0 25px 80px rgba(59, 130, 246, 0.25)]'
              : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
          }`}
        >
          {/* Inner gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <div className="relative z-10 p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Left column */}
              <div className="lg:w-1/3 flex flex-col">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-semibold mb-8 w-fit">
                  <Sparkles size={14} />
                  <span className="uppercase tracking-wider">About</span>
                </div>
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6 transition-colors duration-500 ${
                  isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' : 'text-white'
                }`}>
                  About Me.
                </h2>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              </div>

              {/* Right column */}
              <div className="lg:w-2/3">
                <div className="space-y-6 md:space-y-8">
                  <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed font-light transition-colors duration-500 ${
                    isActive ? 'text-gray-100' : 'text-gray-300'
                  }`}>
                    I have a deep interest in understanding how economics, financial markets, technology, and human behavior interconnect in our modern ecosystem.
                  </p>

                  <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed font-light border-l-2 border-blue-500/40 pl-6 transition-all duration-500 ${
                    isActive ? 'text-gray-100' : 'text-gray-300'
                  }`}>
                    My journey into trading and investing began on March 9, 2019 — a moment that marked the start of understanding markets through both analytical and psychological lenses.
                  </p>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="pt-6 border-t border-white/10"
                    >
                      <p className="italic text-base md:text-lg text-gray-400">
                        "For me, understanding economics isn't just about numbers—it's about understanding people and the decisions they make."
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
                  <span className={`text-xs font-mono uppercase tracking-wider transition-colors duration-500 ${
                    isActive ? 'text-blue-400' : 'text-white/40 group-hover:text-white/60'
                  }`}>
                    {isActive ? 'Close details' : 'Click to explore'}
                  </span>
                  <ArrowRight size={20} className={`transition-all duration-500 ${
                    isActive ? 'text-blue-400 translate-x-2' : 'text-white/30 group-hover:text-white/50'
                  }`} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
