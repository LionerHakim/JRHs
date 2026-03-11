import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function ParallaxBackground() {
  // Track window scroll instead of a fixed element
  const { scrollYProgress } = useScroll();

  // Apply spring physics for smoother parallax
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Transform values for parallax effect - different layers move at different speeds
  const y1 = useTransform(smoothProgress, [0, 1], [0, 800]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -600]);
  const y3 = useTransform(smoothProgress, [0, 1], [0, 700]);
  const y4 = useTransform(smoothProgress, [0, 1], [0, -400]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020202]">
      {/* Aurora Animated Background */}
      <div className="absolute inset-0 aurora-bg opacity-50 mix-blend-screen"></div>

      {/* Animated Blobs with Parallax */}
      <motion.div
        style={{ y: y1, willChange: "transform" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 150, 0],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent-blue/20 rounded-full blur-[140px] mix-blend-screen"
      />

      <motion.div
        style={{ y: y2, willChange: "transform" }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -150, 0],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] bg-accent-purple/20 rounded-full blur-[140px] mix-blend-screen"
      />

      <motion.div
        style={{ y: y3, willChange: "transform" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, 100, 0],
          rotate: [0, 180, 0]
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-accent-pink/15 rounded-full blur-[160px] mix-blend-screen"
      />

      <motion.div
        style={{ y: y4, willChange: "transform" }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [0, -100, 0],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", delay: 8 }}
        className="absolute top-[60%] right-[20%] w-[400px] h-[400px] bg-accent-yellow/10 rounded-full blur-[120px] mix-blend-screen"
      />

      {/* Subtle Grid Overlay for texture */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]"></div>
    </div>
  );
}
