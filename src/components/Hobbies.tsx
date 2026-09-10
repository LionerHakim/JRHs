import { motion } from 'motion/react';
import { BookOpen, Film, Tv, Music, Plane, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const hobbies = [
  { 
    name: 'Reading', 
    icon: BookOpen,
    gradient: 'from-blue-500/20 to-blue-500/5',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    accentBg: 'bg-blue-500/20'
  },
  { 
    name: 'Movies', 
    icon: Film,
    gradient: 'from-purple-500/20 to-purple-500/5',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    accentBg: 'bg-purple-500/20'
  },
  { 
    name: 'Korean Drama', 
    icon: Tv,
    gradient: 'from-pink-500/20 to-pink-500/5',
    border: 'border-pink-500/30',
    text: 'text-pink-400',
    accentBg: 'bg-pink-500/20'
  },
  { 
    name: 'Music', 
    icon: Music,
    gradient: 'from-orange-500/20 to-orange-500/5',
    border: 'border-orange-500/30',
    text: 'text-orange-400',
    accentBg: 'bg-orange-500/20'
  },
  { 
    name: 'Traveling', 
    icon: Plane,
    gradient: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    accentBg: 'bg-amber-500/20'
  },
  { 
    name: 'Discussion', 
    icon: MessageSquare,
    gradient: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    accentBg: 'bg-emerald-500/20'
  },
];

export default function Hobbies() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="hobbies" className="py-24 md:py-32 lg:py-40 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[700px] h-[700px] rounded-full blur-[200px] bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-6 leading-tight">
            Interests & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Hobbies</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Activities that balance professional life and enrich perspective.
          </p>
        </motion.div>

        {/* Hobbies grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {hobbies.map((hobby, index) => {
            const Icon = hobby.icon;
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={index}
                onClick={() => setActiveIndex(isActive ? null : index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className={`group relative rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col items-center justify-center p-8 md:p-10 ${
                  isActive
                    ? `${hobby.border} bg-white/[0.08] shadow-lg`
                    : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${hobby.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className={`p-3 rounded-lg transition-all duration-500 ${
                    isActive ? `${hobby.text} ${hobby.accentBg} border ${hobby.border}` : 'bg-white/5 border border-white/10 text-gray-400'
                  }`}>
                    <Icon size={32} />
                  </div>
                  <span className={`text-lg md:text-xl font-semibold font-heading transition-colors duration-500 text-center ${
                    isActive ? hobby.text : 'text-white'
                  }`}>
                    {hobby.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
