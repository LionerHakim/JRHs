import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const scaleX = useSpring(
    scrollYProgress,
    reduceMotion
      ? { stiffness: 1000, damping: 100, mass: 0.1 }
      : { stiffness: 180, damping: 34, mass: .22 },
  );

  return <motion.div aria-hidden="true" style={{ scaleX }} className="fixed left-0 right-0 top-0 z-[100] h-px origin-left bg-[var(--color-signal-blue)]" />;
}
