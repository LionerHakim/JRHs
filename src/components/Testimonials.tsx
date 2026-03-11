import { motion, useMotionValue, useAnimationFrame, wrap } from 'motion/react';
import { Star, Quote, ChevronRight, Sparkles } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const testimonials = [
  {
    name: 'Budi Santoso',
    role: 'Pengusaha',
    text: 'Insight dari Mas Jefri sangat membantu saya memahami arah pasar dengan lebih jernih. Sangat direkomendasikan untuk diskusi mendalam!',
  },
  {
    name: 'Andi Pratama',
    role: 'Investor Pemula',
    text: 'Advice yang diberikan selalu objektif dan berdasarkan data. Terima kasih atas pandangannya yang luar biasa dan mudah dipahami.',
  },
  {
    name: 'Siti Maharani',
    role: 'Profesional',
    text: 'Sangat menginspirasi! Cara pandangnya terhadap ekonomi makro mengubah cara saya mengelola keuangan dan berinvestasi.',
  },
  {
    name: 'Reza Pahlevi',
    role: 'Mahasiswa Ekonomi',
    text: 'Diskusi yang sangat berbobot. Banyak insight baru yang saya dapatkan tentang psikologi pasar dan perilaku manusia.',
  }
];

export default function Testimonials() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        // Calculate width of one set of testimonials
        const firstChild = containerRef.current.children[0] as HTMLElement;
        if (firstChild) {
          // Card width + gap
          const gap = window.innerWidth < 768 ? 32 : 40; // 8 or 10 tailwind units
          setCardWidth((firstChild.offsetWidth + gap) * testimonials.length);
        }
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useAnimationFrame((_, delta) => {
    if (!isHovered && cardWidth > 0) {
      let moveBy = 0.05 * delta;
      
      // Wrap the value to create infinite scroll
      const currentX = baseX.get();
      const newX = currentX - moveBy;
      
      // If we've scrolled past one full set, reset
      if (newX <= -cardWidth) {
        baseX.set(newX + cardWidth);
      } else {
        baseX.set(newX);
      }
    }
  });

  // Duplicate testimonials 3 times to ensure smooth infinite scrolling
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-purple/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-accent-yellow text-sm font-medium mb-8 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
        >
          <Star size={16} className="fill-accent-yellow text-accent-yellow animate-pulse" />
          <span className="tracking-wide">5+ Tahun Pengalaman & Kepercayaan Publik</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 font-heading leading-tight"
        >
          Dampak & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink">Insight</span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="text-lg md:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto font-light mb-12 leading-relaxed"
        >
          Memberikan pandangan, saran, dan wawasan yang berdampak positif bagi banyak orang dalam mengambil keputusan.
        </motion.p>
      </div>

      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        className="overflow-hidden pb-20 -mx-6 px-6 cursor-grab active:cursor-grabbing relative z-10"
      >
        <motion.div 
          ref={containerRef}
          style={{ x: baseX }}
          drag="x"
          dragConstraints={{ left: -cardWidth * 2, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsHovered(true)}
          onDragEnd={() => setIsHovered(false)}
          className="flex gap-8 md:gap-10 w-max"
        >
          {duplicatedTestimonials.map((testimonial, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                onClick={() => setActiveIndex(isActive ? null : index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: (index % testimonials.length) * 0.1 }}
                className={`w-[85vw] sm:w-[350px] md:w-[400px] h-auto min-h-[400px] md:min-h-[450px] flex-shrink-0 group p-6 md:p-12 rounded-[3rem] flex flex-col justify-between star-border transition-all duration-700 ease-out relative overflow-hidden ${
                  isActive 
                    ? 'bg-white/[0.06] border border-accent-blue/40 shadow-[0_20px_80px_rgba(59,130,246,0.25)] scale-[1.03] -translate-y-4' 
                    : 'glass-panel hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 via-transparent to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex-1 flex flex-col pointer-events-none">
                  <div className="flex justify-between items-start mb-8">
                    <Quote className={`w-12 h-12 md:w-16 md:h-16 transition-all duration-700 ease-out ${isActive ? 'text-accent-blue/80 scale-110 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'text-white/10 group-hover:text-white/20'}`} />
                    {isActive && <Sparkles className="text-accent-yellow w-6 h-6 animate-pulse" />}
                  </div>
                  <p className={`text-base md:text-lg lg:text-xl leading-relaxed font-light transition-colors duration-500 flex-1 ${isActive ? 'text-white drop-shadow-sm' : 'text-gray-300 group-hover:text-gray-200'}`}>
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center gap-5 relative z-10 pt-8 border-t border-white/10 transition-colors duration-500 pointer-events-none">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-inner transition-all duration-700 ease-out ${isActive ? 'bg-gradient-to-br from-accent-blue to-accent-purple shadow-[0_0_30px_rgba(59,130,246,0.6)] scale-110' : 'bg-white/10 group-hover:bg-white/20 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}>
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className={`text-lg md:text-xl font-semibold transition-colors duration-500 font-heading ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]' : 'text-white group-hover:text-gray-100'}`}>{testimonial.name}</h4>
                    <p className={`text-base transition-colors duration-500 ${isActive ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'}`}>{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="flex justify-center mt-8 relative z-10">
        <div className="swipe-indicator opacity-60 hover:opacity-100 transition-opacity duration-500 bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-3 backdrop-blur-md">
          <span className="text-sm tracking-wide">Geser untuk eksplorasi</span>
          <ChevronRight size={18} className="animate-bounce-x text-accent-blue" />
        </div>
      </div>
    </section>
  );
}
