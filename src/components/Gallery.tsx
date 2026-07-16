import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const photos = [
  "/images/chulbul_1.png",
  "/images/chulbul_2.png",
  "/images/chulbul_3.png",
  "/images/chulbul_4.png",
];

const captions = [
  "Looking beautiful in traditional",
  "Laughing at the college fest",
  "Late night study & hot cocoa",
  "Always laughing together",
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for different columns
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={containerRef} className="py-40 bg-transparent relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-soft-pink/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex justify-between items-end mb-24 border-b border-white/10 pb-8"
        >
          <div>
            <span className="text-sm tracking-[0.3em] uppercase text-white/40 block mb-4">Captured</span>
            <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">Memories</h2>
          </div>
          <div className="hidden md:block text-right text-white/50 font-light max-w-sm">
            A collection of moments frozen in time, reminding us of the beautiful journey we share.
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          <motion.div style={{ y: y1 }} className="space-y-12 md:space-y-24 md:mt-24">
            {[0, 2].map((i) => (
              <div key={i} className="group cursor-pointer" data-cursor-text="DRAG">
                <div className="overflow-hidden rounded-3xl aspect-[3/4] mb-6">
                  <img 
                    src={photos[i]} 
                    alt={`Memory ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <p className="text-xl font-serif text-white group-hover:text-soft-pink transition-colors">{captions[i]}</p>
              </div>
            ))}
          </motion.div>
          
          <motion.div style={{ y: y2 }} className="space-y-12 md:space-y-24">
            {[1, 3].map((i) => (
              <div key={i} className="group cursor-pointer" data-cursor-text="DRAG">
                <div className="overflow-hidden rounded-3xl aspect-square mb-6">
                  <img 
                    src={photos[i]} 
                    alt={`Memory ${i + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <p className="text-xl font-serif text-white group-hover:text-soft-pink transition-colors">{captions[i]}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
