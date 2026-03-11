import { motion } from 'motion/react';
import { BookOpen, Cpu, Brain, Globe, Landmark, User, Heart, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const categories = [
  {
    title: 'Ekonomi & Keuangan',
    icon: <Landmark className="w-6 h-6 text-accent-yellow" />,
    progress: 95,
    color: 'bg-accent-yellow',
    border: 'border-accent-yellow/50',
    text: 'text-accent-yellow',
    gradient: 'from-accent-yellow/10',
    iconBg: 'bg-accent-yellow/20',
    borderLeft: 'border-accent-yellow/40',
    shadowColor: 'rgba(255,214,10,0.3)',
    items: [
      { name: 'Economics', desc: 'Memahami dinamika ekonomi makro dan mikro serta pengaruhnya terhadap perkembangan masyarakat dan sistem global.' },
      { name: 'Financial Markets', desc: 'Mempelajari pergerakan pasar keuangan serta faktor ekonomi dan psikologis yang mempengaruhi perubahan pasar.' }
    ]
  },
  {
    title: 'Teknologi Masa Depan',
    icon: <Cpu className="w-6 h-6 text-accent-blue" />,
    progress: 85,
    color: 'bg-accent-blue',
    border: 'border-accent-blue/50',
    text: 'text-accent-blue',
    gradient: 'from-accent-blue/10',
    iconBg: 'bg-accent-blue/20',
    borderLeft: 'border-accent-blue/40',
    shadowColor: 'rgba(10,132,255,0.3)',
    items: [
      { name: 'Artificial Intelligence', desc: 'Memahami perkembangan teknologi AI dan dampaknya terhadap ekonomi dan perubahan sistem dunia.' },
      { name: 'Blockchain & Web3', desc: 'Mengeksplorasi sistem desentralisasi, aset digital, dan masa depan jaringan informasi.' }
    ]
  },
  {
    title: 'Psikologi & Analisis Manusia',
    icon: <Brain className="w-6 h-6 text-accent-purple" />,
    progress: 90,
    color: 'bg-accent-purple',
    border: 'border-accent-purple/50',
    text: 'text-accent-purple',
    gradient: 'from-accent-purple/10',
    iconBg: 'bg-accent-purple/20',
    borderLeft: 'border-accent-purple/40',
    shadowColor: 'rgba(191,90,242,0.3)',
    items: [
      { name: 'Human Psychology', desc: 'Menganalisis perilaku manusia dan bagaimana bias psikologis mempengaruhi proses pengambilan keputusan.' },
      { name: 'Strategic Thinking', desc: 'Mengembangkan pola pikir analitis untuk pemecahan masalah dan perencanaan jangka panjang.' }
    ]
  },
  {
    title: 'Politik & Geopolitik',
    icon: <Globe className="w-6 h-6 text-red-500" />,
    progress: 80,
    color: 'bg-red-500',
    border: 'border-red-500/50',
    text: 'text-red-500',
    gradient: 'from-red-500/10',
    iconBg: 'bg-red-500/20',
    borderLeft: 'border-red-500/40',
    shadowColor: 'rgba(239,68,68,0.3)',
    items: [
      { name: 'Geopolitics', desc: 'Mempelajari dinamika kekuatan global, kebijakan negara, dan dampaknya terhadap stabilitas dunia.' },
      { name: 'Political Systems', desc: 'Memahami struktur pemerintahan dan bagaimana kebijakan publik dibentuk serta diimplementasikan.' }
    ]
  },
  {
    title: 'Peradaban Dunia',
    icon: <BookOpen className="w-6 h-6 text-emerald-500" />,
    progress: 85,
    color: 'bg-emerald-500',
    border: 'border-emerald-500/50',
    text: 'text-emerald-500',
    gradient: 'from-emerald-500/10',
    iconBg: 'bg-emerald-500/20',
    borderLeft: 'border-emerald-500/40',
    shadowColor: 'rgba(16,185,129,0.3)',
    items: [
      { name: 'History & Civilization', desc: 'Menelusuri jejak sejarah peradaban manusia untuk memahami pola siklus kehidupan dan kemajuan.' },
      { name: 'Philosophy of Life', desc: 'Mengkaji nilai-nilai fundamental yang membentuk pandangan hidup dan tujuan eksistensial.' }
    ]
  },
  {
    title: 'Pengembangan Diri',
    icon: <User className="w-6 h-6 text-orange-500" />,
    progress: 95,
    color: 'bg-orange-500',
    border: 'border-orange-500/50',
    text: 'text-orange-500',
    gradient: 'from-orange-500/10',
    iconBg: 'bg-orange-500/20',
    borderLeft: 'border-orange-500/40',
    shadowColor: 'rgba(249,115,22,0.3)',
    items: [
      { name: 'Leadership', desc: 'Membangun kapasitas kepemimpinan, komunikasi efektif, dan kemampuan membangun jaringan.' },
      { name: 'Mental & Physical Health', desc: 'Menjaga keseimbangan antara kesehatan mental dan fisik sebagai fondasi produktivitas.' }
    ]
  },
  {
    title: 'Nilai Moral & Etika',
    icon: <Heart className="w-6 h-6 text-pink-500" />,
    progress: 100,
    color: 'bg-pink-500',
    border: 'border-pink-500/50',
    text: 'text-pink-500',
    gradient: 'from-pink-500/10',
    iconBg: 'bg-pink-500/20',
    borderLeft: 'border-pink-500/40',
    shadowColor: 'rgba(236,72,153,0.3)',
    items: [
      { name: 'Ethics & Integrity', desc: 'Menjunjung tinggi nilai moral, tanggung jawab sosial, dan integritas dalam setiap tindakan.' },
      { name: 'Long-Term Vision', desc: 'Mengutamakan visi jangka panjang yang berkelanjutan di atas keuntungan jangka pendek.' }
    ]
  },
];

export default function FieldsOfKnowledge() {
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
    <section id="knowledge" className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 font-heading">
            Bidang <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Pengetahuan</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Eksplorasi multidisiplin untuk memahami dunia dari berbagai perspektif.
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
            {categories.map((category, index) => {
              const isActive = activeIndex === index;
              const colorClass = category.color.replace('bg-', '');
              
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
                      ? `bg-white/[0.08] border ${category.border} shadow-[0_20px_60px_rgba(255,255,255,0.1)] scale-[1.02]` 
                      : 'glass-panel glass-panel-hover'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 20px 60px ${category.shadowColor}` : ''
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                  
                  <div className="relative z-10 pointer-events-none">
                    <div className="flex items-center gap-5 mb-8">
                      <div className={`p-4 rounded-2xl border shadow-inner transition-transform duration-700 ${isActive ? `${category.iconBg} ${category.border} scale-110` : 'bg-white/5 border-white/10 group-hover:scale-110'}`}>
                        {category.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xl md:text-2xl font-bold leading-tight mb-3 font-heading transition-colors duration-500 ${isActive ? category.text : 'text-white'}`}>
                          {category.title}
                        </h3>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${category.progress}%` }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 1.5, delay: index * 0.1 + 0.3, ease: [0.25, 1, 0.5, 1] }}
                            className={`h-full rounded-full ${category.color} shadow-[0_0_15px_currentColor]`}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      initial={false}
                      animate={{ height: isActive ? 'auto' : '100px', opacity: isActive ? 1 : 0.7 }}
                      className="space-y-6 flex-1 mt-2 overflow-hidden"
                    >
                      {category.items.map((item, i) => (
                        <div key={i} className="flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${category.color} shadow-[0_0_8px_currentColor]`}></span>
                            <h4 className="text-base md:text-lg font-semibold text-gray-100">{item.name}</h4>
                          </div>
                          <p className={`text-sm md:text-base leading-relaxed pl-4 border-l-2 ml-[3px] transition-colors duration-500 ${isActive ? `text-gray-300 ${category.borderLeft}` : 'text-gray-400 border-white/10'}`}>
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                    
                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                      <span className={`text-xs font-mono uppercase tracking-widest transition-colors duration-500 ${isActive ? category.text : 'text-white/30 group-hover:text-white/50'}`}>
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
