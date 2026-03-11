import { motion } from 'motion/react';
import { BookOpen, Film, Tv, Music, Plane, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const hobbies = [
  { name: 'Membaca buku', icon: <BookOpen size={32} className="text-accent-blue group-hover:text-white transition-colors duration-500" />, color: 'accent-blue', border: 'border-accent-blue/50', gradient: 'from-accent-blue/10', bg: 'bg-accent-blue/20', groupHoverBg: 'group-hover:bg-accent-blue/20', text: 'text-accent-blue', shadowColor: 'rgba(10,132,255,0.3)', groupHoverShadow: 'group-hover:shadow-[0_0_20px_rgba(10,132,255,0.3)]' },
  { name: 'Menonton film', icon: <Film size={32} className="text-accent-purple group-hover:text-white transition-colors duration-500" />, color: 'accent-purple', border: 'border-accent-purple/50', gradient: 'from-accent-purple/10', bg: 'bg-accent-purple/20', groupHoverBg: 'group-hover:bg-accent-purple/20', text: 'text-accent-purple', shadowColor: 'rgba(191,90,242,0.3)', groupHoverShadow: 'group-hover:shadow-[0_0_20px_rgba(191,90,242,0.3)]' },
  { name: 'Drama Korea', icon: <Tv size={32} className="text-accent-pink group-hover:text-white transition-colors duration-500" />, color: 'accent-pink', border: 'border-accent-pink/50', gradient: 'from-accent-pink/10', bg: 'bg-accent-pink/20', groupHoverBg: 'group-hover:bg-accent-pink/20', text: 'text-accent-pink', shadowColor: 'rgba(255,55,95,0.3)', groupHoverShadow: 'group-hover:shadow-[0_0_20px_rgba(255,55,95,0.3)]' },
  { name: 'Musik', icon: <Music size={32} className="text-accent-orange group-hover:text-white transition-colors duration-500" />, color: 'accent-orange', border: 'border-accent-orange/50', gradient: 'from-accent-orange/10', bg: 'bg-accent-orange/20', groupHoverBg: 'group-hover:bg-accent-orange/20', text: 'text-accent-orange', shadowColor: 'rgba(255,159,10,0.3)', groupHoverShadow: 'group-hover:shadow-[0_0_20px_rgba(255,159,10,0.3)]' },
  { name: 'Traveling', icon: <Plane size={32} className="text-accent-yellow group-hover:text-white transition-colors duration-500" />, color: 'accent-yellow', border: 'border-accent-yellow/50', gradient: 'from-accent-yellow/10', bg: 'bg-accent-yellow/20', groupHoverBg: 'group-hover:bg-accent-yellow/20', text: 'text-accent-yellow', shadowColor: 'rgba(255,214,10,0.3)', groupHoverShadow: 'group-hover:shadow-[0_0_20px_rgba(255,214,10,0.3)]' },
  { name: 'Diskusi ide', icon: <MessageSquare size={32} className="text-emerald-500 group-hover:text-white transition-colors duration-500" />, color: 'emerald-500', border: 'border-emerald-500/50', gradient: 'from-emerald-500/10', bg: 'bg-emerald-500/20', groupHoverBg: 'group-hover:bg-emerald-500/20', text: 'text-emerald-500', shadowColor: 'rgba(16,185,129,0.3)', groupHoverShadow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]' },
];

export default function Hobbies() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="hobbies" className="py-32 px-6 relative">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 font-heading">
            Minat & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Hobi</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Aktivitas yang menyeimbangkan kehidupan profesional dan memperkaya perspektif.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {hobbies.map((hobby, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                onClick={() => setActiveIndex(isActive ? null : index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
                className={`group p-6 md:p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 star-border cursor-pointer transition-all duration-700 relative overflow-hidden ${
                  isActive 
                    ? `bg-white/[0.08] border ${hobby.border} shadow-[0_20px_60px_rgba(255,255,255,0.1)] scale-[1.02]` 
                    : 'glass-panel glass-panel-hover'
                }`}
                style={{
                  boxShadow: isActive ? `0 20px 60px ${hobby.shadowColor}` : ''
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${hobby.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                <div className="relative z-10 flex flex-col items-center gap-6 pointer-events-none">
                  <div className={`p-5 rounded-3xl transition-all duration-700 ${isActive ? `${hobby.bg} scale-125 shadow-[0_0_30px_currentColor]` : `bg-white/5 ${hobby.groupHoverBg} group-hover:scale-110 ${hobby.groupHoverShadow}`}`}>
                    {hobby.icon}
                  </div>
                  <span className={`text-lg md:text-xl font-semibold font-heading transition-colors duration-500 ${isActive ? hobby.text : 'text-gray-200 group-hover:text-white'}`}>
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
