import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Stars } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function Hero() {
  const [showSecret, setShowSecret] = useState(false);
  const [butterflyLanded, setButterflyLanded] = useState(false);
  const [teddyWaving, setTeddyWaving] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleDoubleClick = () => {
    setShowSecret(true);
    setTimeout(() => setShowSecret(false), 5000);
  };

  // Mouse parallax for text
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-aurora animate-aurora"
      onDoubleClick={handleDoubleClick}
    >
      {/* Dynamic Aurora Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-soft-pink/10 via-transparent to-transparent mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-sky-blue/10 via-transparent to-transparent mix-blend-screen" />

      <motion.div 
        style={{ y: y1, opacity }}
        className="z-10 text-center px-4 max-w-5xl flex flex-col items-center"
      >
        <motion.div style={{ x: mousePos.x, y: mousePos.y }} className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // Custom cubic bezier
          className="mb-8"
        >
          <div className="glass-premium px-6 py-2 rounded-full inline-flex items-center gap-3 text-soft-pink">
            <Stars size={16} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase">An Unforgettable Day</span>
            <Stars size={16} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-white mb-8 leading-[1.1] tracking-tighter mix-blend-plus-lighter"
        >
          Happy Birthday, <br/>
          <span className="text-gradient-gold block mt-2">My Best Friend.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          className="text-lg md:text-2xl text-white/60 font-light max-w-2xl mx-auto mb-16 tracking-wide"
        >
          Today is all about celebrating the most amazing person in my life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <button 
            className="group relative px-10 py-5 glass-premium rounded-full text-white font-medium text-sm tracking-[0.15em] uppercase hover:bg-white hover:text-black transition-all duration-700 overflow-hidden"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            data-cursor-text="SCROLL"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start the Journey
              <Heart className="w-4 h-4 group-hover:scale-125 transition-transform duration-500" />
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
          </button>
        </motion.div>
        </motion.div>
      </motion.div>

      {/* Teddy Bear Easter Egg */}
      <motion.div 
        className="absolute bottom-32 left-12 cursor-pointer z-50 text-soft-pink/50 hover:text-soft-pink transition-colors"
        onClick={() => setTeddyWaving(true)}
        animate={teddyWaving ? { rotate: [0, -20, 20, -20, 20, 0] } : {}}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setTeddyWaving(false)}
        title="Teddy Bear"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          {/* Simple Teddy Bear SVG */}
          <circle cx="12" cy="14" r="6" />
          <circle cx="12" cy="8" r="4" />
          <circle cx="8" cy="5" r="2.5" />
          <circle cx="16" cy="5" r="2.5" />
          <circle cx="7" cy="11" r="2" />
          <circle cx="17" cy="11" r="2" />
          <circle cx="9" cy="19" r="2.5" />
          <circle cx="15" cy="19" r="2.5" />
        </svg>
      </motion.div>

      {/* Butterfly Easter Egg */}
      <motion.div
        className="absolute z-50 cursor-pointer text-sky-blue/80 hover:text-sky-blue transition-colors"
        initial={{ top: '20%', right: '10%' }}
        animate={butterflyLanded ? { top: '50%', right: '50%', x: 100, y: -50, scale: 0.8 } : { y: [0, -20, 0], x: [0, -10, 0] }}
        transition={butterflyLanded ? { duration: 2, type: "spring" } : { repeat: Infinity, duration: 4, ease: "easeInOut" }}
        onClick={() => setButterflyLanded(true)}
        title="Butterfly"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={!butterflyLanded ? "animate-pulse" : ""}>
          <path d="M12,15.5C12,15.5 10.5,18 7.5,18C4.5,18 3,15.5 3,12C3,8.5 6,5 9,5C10.5,5 12,7 12,7C12,7 13.5,5 15,5C18,5 21,8.5 21,12C21,15.5 19.5,18 16.5,18C13.5,18 12,15.5 12,15.5Z" />
        </svg>
      </motion.div>

      {/* Secret Message */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: showSecret ? 1 : 0, y: showSecret ? 0 : 50, scale: showSecret ? 1 : 0.9 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 glass-premium px-8 py-4 rounded-full pointer-events-none z-50"
      >
        <p className="font-handwriting text-3xl text-gradient-gold">You found a secret! I love you! ✨</p>
      </motion.div>
    </section>
  );
}
