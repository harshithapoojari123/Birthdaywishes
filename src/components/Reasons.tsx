import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Star, Smile, Globe, Ear, Gift } from 'lucide-react';
import React, { useRef } from 'react';

const reasons = [
  { icon: Heart, title: "Kind Heart", text: "You always care about everyone around you." },
  { icon: Star, title: "Always Supports Me", text: "Through every up and down, you're there." },
  { icon: Smile, title: "Makes Me Laugh", text: "The only person who truly gets my humor." },
  { icon: Globe, title: "Beautiful Soul", text: "You make the world a better place." },
  { icon: Ear, title: "Best Listener", text: "I can talk to you for hours about nothing." },
  { icon: Gift, title: "Crazy Memories", text: "The best times of my life were with you." }
];

const TiltCard = ({ reason, index }: { reason: typeof reasons[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 150 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 150 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Glare effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "-100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "-100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-72 rounded-[2rem] group"
    >
      <div 
        className="absolute inset-0 glass-premium rounded-[2rem] p-8 flex flex-col items-center justify-center text-center gap-6 overflow-hidden"
        style={{ transform: "translateZ(50px)" }}
      >
        {/* Dynamic Glare */}
        <motion.div 
          className="absolute inset-0 z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 60%)",
            x: glareX,
            y: glareY
          }}
        />

        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500 shadow-xl">
          <reason.icon size={28} strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="text-2xl font-serif text-white mb-2">{reason.title}</h3>
          <p className="text-white/50 text-sm font-light leading-relaxed">{reason.text}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function Reasons() {
  return (
    <section className="py-40 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4 block">The Little Things</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">Why You're Amazing</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" style={{ perspective: 1200 }}>
          {reasons.map((reason, index) => (
            <TiltCard key={index} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
