import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const memories = [
  {
    year: "Memory 1",
    title: "Our Last Fest in College",
    description: "A beautiful traditional and professional look from our last fest together.",
    image: "/images/1.jpeg"
  },
  {
    year: "Memory 2",
    title: "Traditional Moment",
    description: "A cute little moment captured perfectly.",
    image: "/images/2.jpeg"
  },
  {
    year: "Memory 3",
    title: "Expressing Love",
    description: "Because sometimes words aren't enough to show how much you mean to me.",
    image: "/images/3.jpeg"
  },
  {
    year: "Memory 4",
    title: "The Fest",
    description: "Having the absolute best time together.",
    image: "/images/4.jpeg"
  },
  {
    year: "Memory 5",
    title: "Bootcamp Night",
    description: "Talking about Horlicks and making the best memories during bootcamp night.",
    image: "/images/5.jpeg"
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 0.5,
          }
        });
      }

      gsap.utils.toArray('.timeline-item').forEach((item: any, i) => {
        const isLeft = i % 2 === 0;
        gsap.fromTo(item,
          { opacity: 0, x: isLeft ? -100 : 100, filter: "blur(10px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-40 bg-transparent relative overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <span className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4 block">Chapter One</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">Our Journey</h2>
        </motion.div>
        
        <div className="relative">
          {/* Glowing SVG River Line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 hidden md:block w-[100px] pointer-events-none">
             <svg width="100" height="100%" preserveAspectRatio="none">
               <path 
                 ref={lineRef}
                 d="M 50 0 C 50 200, 10 300, 50 500 C 90 700, 50 800, 50 1000 C 50 1200, 10 1300, 50 1500 C 90 1700, 50 1800, 50 2000"
                 fill="none" 
                 stroke="url(#gradient)" 
                 strokeWidth="3"
                 style={{ filter: 'drop-shadow(0 0 10px rgba(255,214,231,0.5))' }}
               />
               <defs>
                 <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" stopColor="#FFD6E7" />
                   <stop offset="50%" stopColor="#DCC6FF" />
                   <stop offset="100%" stopColor="#CFE8FF" />
                 </linearGradient>
               </defs>
             </svg>
          </div>

          <div className="space-y-32">
            {memories.map((memory, index) => (
              <div 
                key={index}
                className={`timeline-item flex flex-col md:flex-row items-center justify-between w-full gap-12 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="w-full md:w-5/12" />
                
                {/* Center Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#fff] z-10" />

                {/* Card Content */}
                <div className="w-full md:w-5/12">
                  <div className="glass-premium p-1 rounded-[2.5rem] group hover:scale-[1.02] transition-transform duration-700 ease-[0.16,1,0.3,1]">
                    <div className="bg-transparent/50 rounded-[2.25rem] p-8 h-full flex flex-col justify-between overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      <div className="relative z-10">
                        <span className="inline-block text-white/50 text-xs font-bold tracking-[0.2em] uppercase mb-6">
                          {memory.year}
                        </span>
                        <h3 className="text-3xl font-serif text-white mb-4 leading-tight">{memory.title}</h3>
                        <p className="text-white/60 mb-8 font-light leading-relaxed">{memory.description}</p>
                      </div>

                      <div className="rounded-2xl overflow-hidden relative z-10 flex justify-center bg-black/20" data-cursor-text="VIEW">
                        <img 
                          src={memory.image} 
                          alt={memory.title}
                          className="w-full h-auto max-h-[600px] object-contain transition-transform duration-1000 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
