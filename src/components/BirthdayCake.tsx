import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function BirthdayCake() {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    setCandlesBlown(true);
    
    // Confetti explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD6E7', '#DCC6FF', '#CFE8FF']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD6E7', '#DCC6FF', '#CFE8FF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
    
    // Play Birthday Song (Using a placeholder HTML5 Audio)
    try {
      const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/10/25/audio_5b3fa394a1.mp3?filename=happy-birthday-music-box-123497.mp3');
      audio.volume = 0.5;
      audio.play();
    } catch (e) {
      console.log('Audio playback failed', e);
    }
  };

  return (
    <section className="py-40 bg-transparent relative flex flex-col items-center justify-center min-h-[80vh] overflow-hidden">
      <div className="text-center mb-8 z-10">
        <span className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4 block">Make a Wish</span>
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">Blow the Candles</h2>
      </div>

      {/* The container MUST have explicit size so absolute children don't overflow onto text */}
      <div className="relative cursor-pointer group w-72 h-80 mt-10" onClick={handleBlowCandles} data-cursor-text={candlesBlown ? "YAY!" : "BLOW"}>
        {/* Cake Base */}
        <div className="w-64 h-32 bg-gradient-to-b from-pink-300 to-pink-500 rounded-[50%] absolute bottom-0 left-1/2 -translate-x-1/2 shadow-2xl z-10" />
        <div className="w-64 h-32 bg-pink-300 rounded-[50%] absolute bottom-10 left-1/2 -translate-x-1/2 z-20 border-b-4 border-pink-400" />
        
        {/* Frosting Details */}
        <div className="absolute bottom-32 left-16 w-8 h-12 bg-white/50 rounded-full blur-sm z-30" />
        <div className="absolute bottom-28 right-16 w-6 h-10 bg-white/50 rounded-full blur-sm z-30" />

        {/* Candles */}
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 flex gap-6 z-40">
          {[0, 1, 2].map((i) => (
            <motion.div key={i} className="relative w-4 h-20 bg-gradient-to-b from-white to-gray-200 rounded-sm">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-black" />
              <AnimatePresence>
                {!candlesBlown && (
                  <motion.div
                    exit={{ opacity: 0, scale: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 w-6 h-10 bg-orange-400 rounded-[50%] shadow-[0_0_20px_#f97316] animate-pulse-slow"
                  />
                )}
              </AnimatePresence>
              {candlesBlown && (
                <motion.div
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: -50 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full blur-md"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {candlesBlown && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 font-handwriting text-4xl text-soft-pink text-center z-10"
          >
            May all your wishes come true! ✨
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
