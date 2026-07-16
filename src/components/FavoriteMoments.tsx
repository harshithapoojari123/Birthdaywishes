import { motion } from 'framer-motion';
import { useState } from 'react';

const moments = [
  {
    front: "That time we got lost...",
    back: "[Placeholder: We ended up finding the best coffee shop ever and talking for hours.]"
  },
  {
    front: "Our 2AM talks...",
    back: "[Placeholder: When we couldn't sleep and just talked about our dreams.]"
  },
  {
    front: "The biggest surprise...",
    back: "[Placeholder: When you threw me that amazing party.]"
  }
];

const FlipCard = ({ front, back, index }: { front: string, back: string, index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative w-full h-80 cursor-pointer [perspective:1000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full glass-premium rounded-3xl p-8 flex flex-col items-center justify-center text-center [backface-visibility:hidden]">
          <h3 className="text-3xl font-serif text-white">{front}</h3>
          <p className="absolute bottom-8 text-white/30 text-xs font-bold tracking-[0.2em] uppercase">Hover to reveal</p>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full bg-white text-[#0a0a1a] rounded-3xl p-8 flex items-center justify-center text-center [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="text-lg font-medium">{back}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function FavoriteMoments() {
  return (
    <section className="py-32 bg-transparent">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4 block">Our Story</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter mb-6">Favorite Moments</h2>
          <p className="text-white/50 text-lg font-light max-w-2xl mx-auto">
            The most precious chapters of our beautiful journey together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {moments.map((moment, index) => (
            <FlipCard key={index} front={moment.front} back={moment.back} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
