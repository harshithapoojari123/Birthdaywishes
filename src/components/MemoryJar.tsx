import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const memories = [
  "That time we laughed so hard we cried.",
  "Our late-night talks about everything and nothing.",
  "The unforgettable road trip adventures.",
  "Supporting each other through the toughest times.",
  "Celebrating small victories together.",
  "That crazy inside joke nobody else understands."
];

export default function MemoryJar() {
  const [currentMemory, setCurrentMemory] = useState<string | null>(null);
  const [isShaking, setIsShaking] = useState(false);

  const pullMemory = () => {
    if (isShaking) return;
    
    setIsShaking(true);
    setCurrentMemory(null);
    
    setTimeout(() => {
      const random = memories[Math.floor(Math.random() * memories.length)];
      setCurrentMemory(random);
      setIsShaking(false);
    }, 600);
  };

  return (
    <section className="py-40 relative flex flex-col items-center justify-center">
      <div className="text-center mb-16 z-10">
        <span className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4 block">Pick a Memory</span>
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">Memory Jar</h2>
      </div>

      <motion.div 
        animate={isShaking ? { x: [-10, 10, -10, 10, 0], rotate: [-5, 5, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
        onClick={pullMemory}
        className="relative w-48 h-64 glass-premium rounded-b-3xl rounded-t-lg cursor-pointer group flex items-end justify-center pb-6"
        data-cursor-text="PULL"
      >
        {/* Cork */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-900/80 rounded-t-lg" />
        
        {/* Paper slips inside */}
        <div className="w-full h-3/4 bg-white/5 rounded-b-3xl absolute bottom-0 flex flex-wrap gap-2 p-4 overflow-hidden blur-[2px]">
           {Array.from({ length: 15 }).map((_, i) => (
             <div key={i} className="w-8 h-3 bg-pink-100/40 rounded-sm rotate-12" />
           ))}
        </div>
        
        <p className="z-10 font-bold text-white/40 uppercase tracking-widest text-sm">Click Me</p>
      </motion.div>

      <div className="h-32 mt-12 flex items-center justify-center max-w-lg text-center px-4">
        <AnimatePresence mode="wait">
          {currentMemory && (
            <motion.div
              key={currentMemory}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="glass p-6 rounded-2xl border-white/20 shadow-[0_0_30px_rgba(255,214,231,0.2)]"
            >
              <p className="font-handwriting text-3xl text-white">{currentMemory}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
