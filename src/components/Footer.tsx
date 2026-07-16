import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export default function Footer() {
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD6E7', '#DCC6FF', '#CFE8FF']
    });
  };

  return (
    <footer className="py-32 bg-transparent text-center relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-soft-pink/10 via-[#050510] to-transparent pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="z-10 px-4"
      >
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
          You deserve every happiness in this world.
        </h2>
        
        <Heart 
          size={64} 
          className="mx-auto text-soft-pink mb-12 drop-shadow-[0_0_30px_rgba(255,214,231,0.6)] animate-pulse" 
          fill="currentColor"
        />
        
        <button
          onClick={triggerConfetti}
          className="group relative px-10 py-5 bg-gradient-to-r from-soft-pink to-lavender text-[#0a0a1a] rounded-full font-bold text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,214,231,0.4)] hover:shadow-[0_0_80px_rgba(255,214,231,0.8)]"
        >
          <span className="flex items-center gap-3">
            One More Hug ❤️
          </span>
        </button>
      </motion.div>
      
      <p className="absolute bottom-8 text-white/30 text-sm font-light">
        Made with love for the best friend ever.
      </p>
    </footer>
  );
}
