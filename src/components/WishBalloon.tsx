import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WishBalloon() {
  const [isReleased, setIsReleased] = useState(false);

  return (
    <section className="py-40 relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="text-center mb-32 z-10">
        <span className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4 block">Make a wish</span>
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">Release the Balloon</h2>
      </div>

      <AnimatePresence>
        {!isReleased ? (
          <motion.div 
            exit={{ y: -1000, opacity: 0, scale: 0.5 }}
            transition={{ duration: 3, ease: "easeIn" }}
            className="cursor-pointer flex flex-col items-center group relative z-20"
            onClick={() => setIsReleased(true)}
            data-cursor-text="RELEASE"
          >
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-32 h-40 bg-gradient-to-br from-red-400 to-pink-500 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)] group-hover:scale-105 transition-transform"
            />
            {/* Balloon Knot */}
            <div className="w-4 h-4 bg-pink-500 clip-triangle -mt-2" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            {/* String */}
            <svg width="20" height="150" className="mt-1 opacity-70">
              <path d="M10 0 Q 20 25 10 50 T 10 100 T 10 150" fill="transparent" stroke="white" strokeWidth="2" />
            </svg>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 2 }}
            className="absolute inset-0 z-0 pointer-events-none"
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1], scale: 1 }}
                transition={{ 
                  delay: 2 + Math.random() * 2, 
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
                className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`
                }}
              />
            ))}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
              <p className="font-serif text-3xl md:text-5xl text-white opacity-80">
                Your wish is out there among the stars.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
