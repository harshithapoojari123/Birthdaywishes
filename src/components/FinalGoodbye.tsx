import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useRef } from 'react';

export default function FinalGoodbye() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0, 1]);
  const scale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1]);
  const filter = useTransform(scrollYProgress, [0.5, 1], ["blur(20px)", "blur(0px)"]);

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="h-screen relative flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Dynamic Glow */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,214,231,0.1)_0%,transparent_60%)]"
      />
      
      <motion.div 
        style={{ opacity, scale, filter }}
        className="text-center z-10 flex flex-col items-center"
      >
        <motion.div 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-soft-pink/50 rounded-full blur-3xl animate-pulse-slow" />
          <Heart fill="#FFD6E7" stroke="#FFD6E7" size={120} className="relative z-10 drop-shadow-[0_0_50px_rgba(255,214,231,0.8)]" />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-wide">
          I will always love you.
        </h2>
        <p className="text-white/50 text-xl font-light mb-16 max-w-md mx-auto">
          Thank you for making every single day brighter. Happy Birthday, Chulbul.
        </p>

        <button 
          onClick={handleReplay}
          className="px-10 py-4 glass-premium rounded-full text-white tracking-[0.2em] uppercase text-sm hover:bg-white hover:text-black transition-colors duration-500"
        >
          Replay Our Journey
        </button>
      </motion.div>
    </section>
  );
}
