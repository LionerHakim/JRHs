import { motion } from 'motion/react';
import { useState } from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const educationData = [
  {
    institution: 'Universitas Islam Indonesia',
    degree: 'Ilmu Ekonomi',
    year: '2021 – sekarang',
    activities: ['Kelompok Studi Pasar Modal (KSPM)'],
  },
  {
    institution: 'SMA Negeri 300 Brebes',
    degree: '',
    year: '2018 – 2021',
    activities: ['Ketua OSIS', 'Bendahara Paskibra'],
  },
  {
    institution: 'SMP Negeri 200 Brebes',
    degree: '',
    year: '2015 – 2018',
    activities: ['Paskibra'],
  },
  {
    institution: 'SD Negeri 100 Brebes',
    degree: '',
    year: '2009 – 2015',
    activities: [],
  },
];

export default function Education() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="education" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-24 relative"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-blue text-xs font-medium mb-6 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <GraduationCap size={14} />
            <span className="tracking-widest uppercase">Akademik</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 font-heading leading-tight">
            Perjalanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink">Pendidikan</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative border-l-2 border-white/10 ml-4 md:ml-12 space-y-20">
          {educationData.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
                className="pl-12 md:pl-20 relative group"
              >
                <div className={`absolute w-6 h-6 rounded-full -left-[13px] top-10 transition-all duration-700 border-4 border-black flex items-center justify-center ${isActive ? 'bg-accent-purple shadow-[0_0_30px_rgba(168,85,247,0.8)] scale-125' : 'bg-white/20 group-hover:bg-accent-blue group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] group-hover:scale-110'}`}>
                  {isActive && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                </div>
                
                <motion.div 
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 md:p-12 rounded-[2.5rem] star-border cursor-pointer transition-all duration-700 relative overflow-hidden ${
                    isActive 
                      ? 'bg-white/[0.06] border border-accent-blue/40 shadow-[0_20px_80px_rgba(59,130,246,0.25)] scale-[1.02]' 
                      : 'glass-panel glass-panel-hover'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-6 relative z-10">
                    <div>
                      <h3 className={`text-2xl md:text-4xl font-bold font-heading transition-colors duration-500 mb-3 ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple' : 'text-white group-hover:text-gray-200'}`}>
                        {item.institution}
                      </h3>
                      {item.degree && (
                        <p className={`text-lg md:text-xl lg:text-2xl font-medium transition-colors duration-500 ${isActive ? 'text-gray-100' : 'text-gray-400 group-hover:text-gray-300'}`}>
                          {item.degree}
                        </p>
                      )}
                    </div>
                    <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-wider transition-all duration-500 whitespace-nowrap ${isActive ? 'bg-accent-blue/20 text-accent-blue border border-accent-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'bg-white/5 text-gray-400 border border-white/10 group-hover:bg-white/10 group-hover:text-white'}`}>
                      <Calendar size={14} />
                      {item.year}
                    </div>
                  </div>
                  
                  {item.activities.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                      <div className="flex items-center gap-2 mb-4 text-sm font-medium text-gray-400 uppercase tracking-widest">
                        <Award size={16} className={isActive ? 'text-accent-yellow' : ''} />
                        <span>Aktivitas & Penghargaan</span>
                      </div>
                      <ul className="space-y-4">
                        {item.activities.map((activity, i) => (
                          <li key={i} className={`flex items-center gap-4 text-base md:text-lg lg:text-xl transition-colors duration-500 ${isActive ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'}`}>
                            <span className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-accent-purple shadow-[0_0_15px_rgba(168,85,247,0.8)] scale-125' : 'bg-white/20 group-hover:bg-accent-blue'}`}></span>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
