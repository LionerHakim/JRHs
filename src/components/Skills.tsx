import { motion } from 'motion/react';
import { useState } from 'react';
import { Users, Mic, TrendingUp, Landmark, Lightbulb, Target, Briefcase, Search, PieChart } from 'lucide-react';

const skills = [
  { 
    name: 'Public Relations', 
    desc: 'Membangun dan menjaga citra positif serta hubungan baik dengan berbagai pihak strategis.', 
    icon: <Users size={28} className="text-accent-blue" />, 
    color: 'accent-blue',
    border: 'border-accent-blue/40',
    bg: 'bg-accent-blue/20',
    text: 'text-accent-blue',
    shadowColor: 'rgba(10,132,255,0.3)'
  },
  { 
    name: 'Public Speaking', 
    desc: 'Menyampaikan ide dan gagasan secara efektif, meyakinkan, dan menginspirasi di depan umum.', 
    icon: <Mic size={28} className="text-accent-purple" />, 
    color: 'accent-purple',
    border: 'border-accent-purple/40',
    bg: 'bg-accent-purple/20',
    text: 'text-accent-purple',
    shadowColor: 'rgba(191,90,242,0.3)'
  },
  { 
    name: 'Traderpreneur', 
    desc: 'Menggabungkan keahlian analisis trading pasar keuangan dengan insting kewirausahaan.', 
    icon: <TrendingUp size={28} className="text-accent-pink" />, 
    color: 'accent-pink',
    border: 'border-accent-pink/40',
    bg: 'bg-accent-pink/20',
    text: 'text-accent-pink',
    shadowColor: 'rgba(255,55,95,0.3)'
  },
  { 
    name: 'Investor', 
    desc: 'Menganalisis dan mengalokasikan modal pada aset potensial untuk pertumbuhan jangka panjang.', 
    icon: <Landmark size={28} className="text-accent-yellow" />, 
    color: 'accent-yellow',
    border: 'border-accent-yellow/40',
    bg: 'bg-accent-yellow/20',
    text: 'text-accent-yellow',
    shadowColor: 'rgba(255,214,10,0.3)'
  },
  { 
    name: 'Problem Solving', 
    desc: 'Mengidentifikasi masalah kompleks dan merumuskan solusi yang efektif, logis, dan efisien.', 
    icon: <Lightbulb size={28} className="text-emerald-500" />, 
    color: 'emerald-500',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-500',
    shadowColor: 'rgba(16,185,129,0.3)'
  },
  { 
    name: 'Leadership', 
    desc: 'Membimbing, memotivasi, dan mengembangkan potensi tim untuk mencapai tujuan bersama.', 
    icon: <Target size={28} className="text-accent-orange" />, 
    color: 'accent-orange',
    border: 'border-accent-orange/40',
    bg: 'bg-accent-orange/20',
    text: 'text-accent-orange',
    shadowColor: 'rgba(249,115,22,0.3)'
  },
  { 
    name: 'Business Analysis', 
    desc: 'Mengevaluasi model bisnis dan tren pasar untuk merancang strategi yang lebih kompetitif.', 
    icon: <Briefcase size={28} className="text-accent-blue" />, 
    color: 'accent-blue',
    border: 'border-accent-blue/40',
    bg: 'bg-accent-blue/20',
    text: 'text-accent-blue',
    shadowColor: 'rgba(10,132,255,0.3)'
  },
  { 
    name: 'Research', 
    desc: 'Melakukan riset mendalam untuk mendukung pengambilan keputusan yang berbasis data dan fakta.', 
    icon: <Search size={28} className="text-accent-purple" />, 
    color: 'accent-purple',
    border: 'border-accent-purple/40',
    bg: 'bg-accent-purple/20',
    text: 'text-accent-purple',
    shadowColor: 'rgba(191,90,242,0.3)'
  },
  { 
    name: 'Finance', 
    desc: 'Mengelola keuangan, menganalisis laporan, dan merencanakan strategi finansial yang solid.', 
    icon: <PieChart size={28} className="text-accent-pink" />, 
    color: 'accent-pink',
    border: 'border-accent-pink/40',
    bg: 'bg-accent-pink/20',
    text: 'text-accent-pink',
    shadowColor: 'rgba(255,55,95,0.3)'
  },
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<number | null>(null);

  return (
    <section id="skills" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 font-heading">
            Keahlian & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Kompetensi</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Kombinasi keterampilan analitis, komunikasi, dan kepemimpinan untuk menciptakan nilai tambah di berbagai sektor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const isActive = activeSkill === index;
            return (
              <motion.div
                key={index}
                onClick={() => setActiveSkill(isActive ? null : index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
                className={`p-6 md:p-10 rounded-[2rem] flex flex-col gap-6 star-border cursor-pointer transition-all duration-700 group ${
                  isActive 
                    ? `bg-white/[0.08] border ${skill.border} shadow-[0_20px_60px_rgba(255,255,255,0.1)] scale-[1.02]` 
                    : 'glass-panel glass-panel-hover'
                }`}
                style={{
                  boxShadow: isActive ? `0 20px 60px ${skill.shadowColor}` : ''
                }}
              >
                <div className="flex items-center gap-5 mb-2">
                  <div className={`p-4 rounded-2xl transition-all duration-700 ${isActive ? `${skill.bg} scale-110 shadow-[0_0_20px_currentColor]` : 'bg-white/5 group-hover:bg-white/10 group-hover:scale-110'}`}>
                    {skill.icon}
                  </div>
                  <h3 className={`text-xl md:text-2xl font-bold font-heading transition-colors duration-500 ${isActive ? skill.text : 'text-white group-hover:text-gray-200'}`}>
                    {skill.name}
                  </h3>
                </div>
                
                <motion.div 
                  initial={false}
                  animate={{ height: isActive ? 'auto' : '60px', opacity: isActive ? 1 : 0.7 }}
                  className="overflow-hidden"
                >
                  <p className={`leading-relaxed font-light text-base md:text-lg transition-colors duration-500 ${isActive ? 'text-gray-100' : 'text-gray-400 line-clamp-2'}`}>
                    {skill.desc}
                  </p>
                </motion.div>

                <div className="mt-auto pt-6 border-t border-white/10">
                  <span className={`text-xs font-mono uppercase tracking-widest transition-colors duration-500 ${isActive ? skill.text : 'text-white/30 group-hover:text-white/50'}`}>
                    {isActive ? 'Tutup Detail' : 'Klik untuk detail'}
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
