import { motion, useScroll, useSpring } from 'motion/react';
export default function ScrollProgress() { const { scrollYProgress } = useScroll(); const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: .2 }); return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-[#007AFF]" />; }
