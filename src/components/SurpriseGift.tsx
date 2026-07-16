import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SurpriseGift() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setClickCount] = useState(0);

  const handleOpen = () => {
    if (!isOpen) {
      setClickCount(prev => {
        const newCount = prev + 1;
        if (newCount === 5) {
          triggerTinyStars();
          return 0; // reset
        }
        return newCount;
      });

      setIsOpen(true);
      
      const duration = 4000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 8,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#FFD6E7', '#DCC6FF', '#CFE8FF', '#FFF8F2']
        });
        confetti({
          particleCount: 8,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#FFD6E7', '#DCC6FF', '#CFE8FF', '#FFF8F2']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  };

  const triggerTinyStars = () => {
    confetti({
      particleCount: 40,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FFE259', '#FFA751', '#FFFFFF'],
      shapes: ['star'],
      ticks: 200,
      gravity: 0.5,
      scalar: 0.5
    });
  };

  return (
    <section className="py-40 bg-transparent flex flex-col items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-soft-pink/5 via-transparent to-transparent pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24 z-10"
      >
        <span className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4 block">The Finale</span>
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">A Special Surprise</h2>
      </motion.div>

      <div className="relative w-[300px] h-[300px] flex items-center justify-center perspective-1000">
        <AnimatePresence>
          {!isOpen ? (
            <motion.div
              key="gift"
              onClick={handleOpen}
              className="cursor-pointer group relative z-10 w-full h-full flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              exit={{ scale: 0, opacity: 0, rotate: 180, filter: "blur(20px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              data-cursor-text="OPEN"
            >
              {/* Glow Behind Gift */}
              <div className="absolute w-full h-full bg-soft-pink/20 rounded-full blur-[80px] group-hover:bg-soft-pink/40 transition-colors duration-700" />
              
              <div className="relative w-48 h-48 glass-premium rounded-[3rem] flex items-center justify-center transition-all duration-700 bg-gradient-to-br from-white/10 to-transparent border border-white/20">
                <Gift size={80} strokeWidth={1} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="message"
              initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)", y: 50 }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ type: "spring", bounce: 0.4, duration: 1.5, delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center z-20 w-[200%] left-[-50%]"
            >
              <div className="glass-premium px-12 py-16 rounded-[3rem] text-center w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                <h3 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">
                  I'll always be <br/>
                  <span className="text-gradient-gold font-bold italic">there for you.</span>
                </h3>
                <p className="text-white/60 text-lg font-light tracking-wide max-w-sm mx-auto">
                  No matter what happens, you have a friend in me forever and always.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
