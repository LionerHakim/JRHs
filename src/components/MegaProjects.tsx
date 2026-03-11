import { motion } from 'motion/react';
import { BookOpen, Globe2, Building2, Landmark, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const projects = [
  {
    title: 'Buku',
    icon: <BookOpen className="w-8 h-8 text-accent-yellow" />,
    description: 'Sedang mengembangkan buku yang membahas investasi, pemahaman pasar keuangan, serta perspektif ekonomi modern.',
    color: 'from-accent-yellow/20 to-transparent',
    baseColor: 'accent-yellow',
    borderColor: 'group-hover:border-accent-yellow/30',
    glowColor: 'group-hover:shadow-[0_8px_30px_rgba(255,214,10,0.15)]',
    activeBorder: 'border-accent-yellow/50',
    shadowColor: 'rgba(255,214,10,0.3)',
    iconBg: 'bg-accent-yellow/20',
    text: 'text-accent-yellow'
  },
  {
    title: 'Startup Multinasional',
    icon: <Globe2 className="w-8 h-8 text-accent-blue" />,
    description: 'Memiliki visi membangun startup berskala internasional yang berfokus pada teknologi dan ekonomi digital.',
    color: 'from-accent-blue/20 to-transparent',
    baseColor: 'accent-blue',
    borderColor: 'group-hover:border-accent-blue/30',
    glowColor: 'group-hover:shadow-[0_8px_30px_rgba(10,132,255,0.15)]',
    activeBorder: 'border-accent-blue/50',
    shadowColor: 'rgba(10,132,255,0.3)',
    iconBg: 'bg-accent-blue/20',
    text: 'text-accent-blue'
  },
  {
    title: 'Foundation',
    icon: <Building2 className="w-8 h-8 text-accent-pink" />,
    description: 'Berencana membangun foundation yang bergerak di bidang pendidikan, literasi keuangan, dan kontribusi sosial.',
    color: 'from-accent-pink/20 to-transparent',
    baseColor: 'accent-pink',
    borderColor: 'group-hover:border-accent-pink/30',
    glowColor: 'group-hover:shadow-[0_8px_30px_rgba(255,55,95,0.15)]',
    activeBorder: 'border-accent-pink/50',
    shadowColor: 'rgba(255,55,95,0.3)',
    iconBg: 'bg-accent-pink/20',
    text: 'text-accent-pink'
  },
  {
    title: 'Perusahaan Investment',
    icon: <Landmark className="w-8 h-8 text-emerald-500" />,
    description: 'Mengembangkan visi untuk membangun perusahaan investasi yang berfokus pada pengelolaan aset dan pengembangan peluang ekonomi jangka panjang.',
    color: 'from-emerald-500/20 to-transparent',
    baseColor: 'emerald-500',
    borderColor: 'group-hover:border-emerald-500/30',
    glowColor: 'group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]',
    activeBorder: 'border-emerald-500/50',
    shadowColor: 'rgba(16,185,129,0.3)',
    iconBg: 'bg-emerald-500/20',
    text: 'text-emerald-500'
  }
];

export default function MegaProjects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return (
    <section id="megaprojects" className="py-32 relative z-10 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 font-heading">
            Mega Proyek & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Visi Masa Depan</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Visi jangka panjang untuk menciptakan dampak yang lebih luas melalui berbagai inisiatif strategis.
          </p>
        </motion.div>

        <motion.div ref={carouselRef} className="overflow-hidden cursor-grab active:cursor-grabbing pb-16 -mx-6 px-6">
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }} 
            dragElastic={0.15}
            dragTransition={{ bounceStiffness: 100, bounceDamping: 20 }}
            className="flex gap-8 w-max"
          >
            {projects.map((project, index) => {
              const isActive = activeIndex === index;
              
              return (
                <motion.div
                  key={index}
                  onClick={() => setActiveIndex(isActive ? null : index)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
                  className={`w-[85vw] sm:w-[350px] md:w-[420px] group relative overflow-hidden p-6 md:p-10 rounded-[2.5rem] transition-all duration-700 star-border flex flex-col ${
                    isActive 
                      ? `bg-white/[0.08] border ${project.activeBorder} shadow-[0_20px_60px_rgba(255,255,255,0.1)]` 
                      : `glass-panel ${project.borderColor} ${project.glowColor}`
                  }`}
                  style={{
                    boxShadow: isActive ? `0 20px 60px ${project.shadowColor}` : ''
                  }}
                >
                  <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                  
                  <div className="relative z-10 flex-1 flex flex-col pointer-events-none">
                    <div className={`mb-8 inline-block p-5 rounded-3xl border shadow-inner transition-transform duration-700 self-start ${isActive ? `${project.iconBg} ${project.activeBorder} scale-110` : 'bg-white/5 border-white/10 group-hover:scale-110'}`}>
                      {project.icon}
                    </div>
                    <h3 className={`text-2xl md:text-3xl font-bold mb-6 font-heading tracking-wide transition-colors duration-500 ${isActive ? project.text : 'text-white'}`}>
                      {project.title}
                    </h3>
                    
                    <motion.div 
                      initial={false}
                      animate={{ height: isActive ? 'auto' : '80px', opacity: isActive ? 1 : 0.7 }}
                      className="overflow-hidden"
                    >
                      <p className={`leading-relaxed font-light text-base md:text-lg transition-colors duration-500 ${isActive ? 'text-gray-100' : 'text-gray-400'}`}>
                        {project.description}
                      </p>
                    </motion.div>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 text-center mt-auto">
                      <span className={`text-xs font-mono uppercase tracking-widest transition-colors duration-500 ${isActive ? project.text : 'text-white/30'}`}>
                        {isActive ? 'Tutup Detail' : 'Klik untuk detail'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <div className="flex justify-center mt-4">
          <div className="swipe-indicator opacity-60 hover:opacity-100 transition-opacity duration-500 bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-md">
            <span className="text-sm tracking-wide">Geser untuk eksplorasi</span>
            <ChevronRight size={18} className="animate-bounce-x text-accent-blue" />
          </div>
        </div>
      </div>
    </section>
  );
}
