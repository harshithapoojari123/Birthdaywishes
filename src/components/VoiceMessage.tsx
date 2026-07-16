import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Play, Square } from 'lucide-react';

export default function VoiceMessage() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would trigger HTML5 Audio element play/pause
  };

  return (
    <section className="py-40 relative flex flex-col items-center justify-center">
      <div className="text-center mb-16 z-10">
        <span className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4 block">Listen closely</span>
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">A Voice Message</h2>
      </div>

      <div className="glass-premium p-8 rounded-full flex items-center gap-6 group cursor-pointer" onClick={togglePlay}>
        <div className="w-16 h-16 rounded-full bg-soft-pink text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,214,231,0.5)] group-hover:scale-110 transition-transform">
          {isPlaying ? <Square fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} className="ml-1" />}
        </div>
        
        <div className="flex gap-1 h-8 items-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div 
              key={i}
              animate={isPlaying ? { height: [10, Math.random() * 30 + 10, 10] } : { height: 10 }}
              transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
              className="w-1.5 bg-white/50 rounded-full"
            />
          ))}
        </div>
        
        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50">
          <Mic size={20} />
        </div>
      </div>
      <p className="mt-8 text-white/40 font-light">[Placeholder for voice recording]</p>
    </section>
  );
}
