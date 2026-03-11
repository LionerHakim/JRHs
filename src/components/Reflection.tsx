import { motion } from 'motion/react';
import { Star, Users, Compass, ChevronRight, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const reflections = [
  {
    title: 'Capricorn',
    icon: <Star className="w-6 h-6 text-accent-blue" />,
    color: 'bg-accent-blue',
    border: 'border-accent-blue/50',
    text: 'text-accent-blue',
    gradient: 'from-accent-blue/10',
    iconBg: 'bg-accent-blue/20',
    borderLeft: 'border-accent-blue/40',
    shadowColor: 'rgba(10,132,255,0.3)',
    items: [
      { name: 'Disiplin & Fokus', desc: 'Sering diasosiasikan dengan tingkat disiplin yang tinggi dan fokus pada pencapaian tujuan.' },
      { name: 'Visi Jangka Panjang', desc: 'Memiliki pandangan jauh ke depan dalam merencanakan setiap langkah kehidupan dan karir.' }
    ]
  },
  {
    title: 'Minggu Legi',
    icon: <Users className="w-6 h-6 text-accent-purple" />,
    color: 'bg-accent-purple',
    border: 'border-accent-purple/50',
    text: 'text-accent-purple',
    gradient: 'from-accent-purple/10',
    iconBg: 'bg-accent-purple/20',
    borderLeft: 'border-accent-purple/40',
    shadowColor: 'rgba(191,90,242,0.3)',
    items: [
      { name: 'Komunikasi', desc: 'Dikenal memiliki kemampuan komunikasi yang baik dan mudah beradaptasi dengan berbagai lingkungan.' },
      { name: 'Relasi Sosial', desc: 'Mampu membangun hubungan sosial yang kuat dan memberikan pengaruh positif bagi orang sekitar.' }
    ]
  },
  {
    title: 'Filosofi Hidup',
    icon: <Compass className="w-6 h-6 text-accent-pink" />,
    color: 'bg-accent-pink',
    border: 'border-accent-pink/50',
    text: 'text-accent-pink',
    gradient: 'from-accent-pink/10',
    iconBg: 'bg-accent-pink/20',
    borderLeft: 'border-accent-pink/40',
    shadowColor: 'rgba(255,55,95,0.3)',
    items: [
      { name: 'Pemahaman Diri', desc: 'Refleksi ini membantu memahami potensi diri untuk terus berkembang menjadi pribadi yang lebih baik.' },
      { name: 'Keseimbangan', desc: 'Mencari harmoni antara ambisi profesional dan kedamaian batin dalam setiap aspek kehidupan.' }
    ]
  }
];

export default function Reflection() {
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
    <section id="reflection" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-accent-yellow text-sm font-medium mb-8 shadow-[0_0_20px_rgba(255,214,10,0.1)]">
            <Sparkles size={18} />
            <span className="tracking-wide uppercase">5 Januari 2003</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 font-heading">
            Refleksi <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Diri</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Mengenal diri lebih dalam melalui lensa astrologi, budaya, dan filosofi personal.
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
            {reflections.map((reflection, index) => {
              const isActive = activeIndex === index;
              const colorClass = reflection.color.replace('bg-', '');

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
                  className={`w-[85vw] sm:w-[350px] md:w-[420px] group p-6 md:p-10 rounded-[2.5rem] flex flex-col h-full relative overflow-hidden star-border cursor-pointer transition-all duration-700 ${
                    isActive 
                      ? `bg-white/[0.08] border ${reflection.border} shadow-[0_20px_60px_rgba(255,255,255,0.1)] scale-[1.02]` 
                      : 'glass-panel glass-panel-hover'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 20px 60px ${reflection.shadowColor}` : ''
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${reflection.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                  
                  <div className="relative z-10 flex-1 flex flex-col pointer-events-none">
                    <div className="flex items-center gap-5 mb-8">
                      <div className={`p-4 rounded-2xl border shadow-inner transition-transform duration-700 ${isActive ? `${reflection.iconBg} ${reflection.border} scale-110` : 'bg-white/5 border-white/10 group-hover:scale-110'}`}>
                        {reflection.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl md:text-2xl font-bold leading-tight mb-3 font-heading transition-colors duration-500 ${isActive ? reflection.text : 'text-white'}`}>
                          {reflection.title}
                        </h3>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '100%' }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: [0.25, 1, 0.5, 1] }}
                            className={`h-full rounded-full ${reflection.color} shadow-[0_0_15px_currentColor]`}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      initial={false}
                      animate={{ height: isActive ? 'auto' : '80px', opacity: isActive ? 1 : 0.7 }}
                      className="space-y-6 flex-1 mt-2 overflow-hidden"
                    >
                      {reflection.items.map((item, i) => (
                        <div key={i} className="flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${reflection.color} shadow-[0_0_8px_currentColor]`}></span>
                            <h4 className="text-base md:text-lg font-semibold text-gray-100">{item.name}</h4>
                          </div>
                          <p className={`text-sm md:text-base leading-relaxed pl-4 border-l-2 ml-[3px] transition-colors duration-500 ${isActive ? `text-gray-300 ${reflection.borderLeft}` : 'text-gray-400 border-white/10'}`}>
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 text-center mt-auto">
                      <span className={`text-xs font-mono uppercase tracking-widest transition-colors duration-500 ${isActive ? reflection.text : 'text-white/30 group-hover:text-white/50'}`}>
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
