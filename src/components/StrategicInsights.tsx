import { motion } from 'motion/react';
import { TrendingUp, BarChart3, Globe2, BrainCircuit, Lightbulb, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const insights = [
  {
    title: 'Analisis Makro Ekonomi',
    desc: 'Menganalisis kebijakan moneter, inflasi, dan tren global untuk memprediksi arah pasar jangka panjang.',
    icon: <Globe2 className="w-8 h-8 text-accent-blue" />,
    color: 'accent-blue',
    border: 'border-accent-blue/40',
    bg: 'bg-accent-blue/20',
    text: 'text-accent-blue',
    gradient: 'from-accent-blue/10',
    shadowColor: 'rgba(10,132,255,0.3)'
  },
  {
    title: 'Psikologi Pasar',
    desc: 'Memahami perilaku kolektif investor dan bagaimana emosi mendorong siklus pasar keuangan.',
    icon: <BrainCircuit className="w-8 h-8 text-accent-purple" />,
    color: 'accent-purple',
    border: 'border-accent-purple/40',
    bg: 'bg-accent-purple/20',
    text: 'text-accent-purple',
    gradient: 'from-accent-purple/10',
    shadowColor: 'rgba(191,90,242,0.3)'
  },
  {
    title: 'Manajemen Risiko',
    desc: 'Strategi perlindungan aset melalui diversifikasi dan kalkulasi probabilitas yang ketat.',
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
    color: 'emerald-500',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-500/20',
    text: 'text-emerald-500',
    gradient: 'from-emerald-500/10',
    shadowColor: 'rgba(16,185,129,0.3)'
  }
];

export default function StrategicInsights() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="insights" className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent-purple/5 rounded-full blur-[160px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent-purple text-xs font-medium mb-6 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
            <Lightbulb size={14} />
            <span className="tracking-widest uppercase">Perspektif Strategis</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8 font-heading leading-tight">
            Wawasan <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-emerald-500">Ekonomi & Pasar</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Pendekatan multidimensi dalam menganalisis peluang dan menavigasi kompleksitas ekonomi modern.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => {
            const isActive = activeIndex === index;
            return (
              <motion.div
                key={index}
                onClick={() => setActiveIndex(isActive ? null : index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 1, 0.5, 1] }}
                className={`p-6 md:p-10 rounded-[3rem] star-border cursor-pointer transition-all duration-700 relative overflow-hidden flex flex-col gap-8 ${
                  isActive 
                    ? `bg-white/[0.08] border ${insight.border} shadow-[0_30px_80px_rgba(255,255,255,0.1)] scale-[1.05]` 
                    : 'glass-panel glass-panel-hover'
                }`}
                style={{
                  boxShadow: isActive ? `0 30px 80px ${insight.shadowColor}` : ''
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${insight.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
                
                <div className="relative z-10 flex flex-col gap-8 h-full pointer-events-none">
                  <div className={`p-6 rounded-3xl transition-all duration-700 self-start ${isActive ? `${insight.bg} scale-125 shadow-[0_0_40px_currentColor]` : 'bg-white/5 border border-white/10 group-hover:scale-110'}`}>
                    {insight.icon}
                  </div>
                  
                  <div>
                    <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold font-heading mb-4 transition-colors duration-500 ${isActive ? insight.text : 'text-white'}`}>
                      {insight.title}
                    </h3>
                    <p className={`text-base md:text-lg leading-relaxed font-light transition-colors duration-500 ${isActive ? 'text-gray-100' : 'text-gray-400'}`}>
                      {insight.desc}
                    </p>
                  </div>

                  <div className="mt-auto pt-8 border-t border-white/10 flex items-center justify-between">
                    <span className={`text-xs font-mono uppercase tracking-widest transition-colors duration-500 ${isActive ? insight.text : 'text-white/30'}`}>
                      {isActive ? 'Wawasan Aktif' : 'Klik untuk Detail'}
                    </span>
                    <TrendingUp size={16} className={isActive ? insight.text : 'text-white/10'} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
