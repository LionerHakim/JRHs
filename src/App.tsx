/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/Profile';
import Education from './components/Education';
import StrategicInsights from './components/StrategicInsights';
import FieldsOfKnowledge from './components/FieldsOfKnowledge';
import Skills from './components/Skills';
import Hobbies from './components/Hobbies';
import Motivation from './components/Perspective';
import Reflection from './components/Reflection';
import Relationship from './components/Relationship';
import MegaProjects from './components/MegaProjects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import ParallaxBackground from './components/ParallaxBackground';
import CustomCursor from './components/CustomCursor';

export default function App() {
  return (
    <div className="bg-black text-white min-h-screen font-sans selection:bg-accent-blue/30 relative overflow-hidden cursor-none md:cursor-auto">
      <CustomCursor />
      <ParallaxBackground />
      <ScrollProgress />
      <ScrollToTop />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Education />
        <StrategicInsights />
        <FieldsOfKnowledge />
        <Skills />
        <Hobbies />
        <Motivation />
        <Reflection />
        <Relationship />
        <MegaProjects />
        <Testimonials />
        <Contact />
      </main>
      
      <footer className="py-20 px-6 bg-black border-t border-white/10 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold tracking-widest uppercase font-heading mb-4 text-glow">JRH</h3>
            <p className="text-gray-400 max-w-md mx-auto font-light">
              Membangun masa depan melalui pemahaman ekonomi, teknologi, dan nilai-nilai kemanusiaan.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {['Tentang', 'Pendidikan', 'Wawasan', 'Pengetahuan', 'Keahlian', 'Hobi', 'Visi', 'Kontak'].map((item) => (
              <a 
                key={item} 
                href={`#${item === 'Wawasan' ? 'insights' : item === 'Visi' ? 'megaprojects' : item === 'Pengetahuan' ? 'knowledge' : item.toLowerCase()}`} 
                className="text-sm font-medium text-gray-500 hover:text-white transition-colors duration-300 uppercase tracking-widest"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 text-gray-500 text-xs font-mono tracking-widest uppercase">
            <p>© {new Date().getFullYear()} Jefri Rahman Hakim. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
