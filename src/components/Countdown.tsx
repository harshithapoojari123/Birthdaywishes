import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Countdown() {
  // Setting exactly 3 years and 9 months ago from today (July 2026)
  // This will continuously count upwards from 3 years, 9 months.
  const startDate = new Date("2022-10-16T00:00:00");
  
  const [time, setTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      
      let years = now.getFullYear() - startDate.getFullYear();
      let months = now.getMonth() - startDate.getMonth();
      let days = now.getDate() - startDate.getDate();
      
      if (days < 0) {
        months -= 1;
        // Approximation for days in previous month
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      }
      
      if (months < 0) {
        years -= 1;
        months += 12;
      }
      
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTime({ years, months, days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Years", value: time.years },
    { label: "Months", value: time.months },
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Mins", value: time.minutes },
    { label: "Secs", value: time.seconds }
  ];

  return (
    <section className="py-24 bg-transparent relative">
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-white/80 mb-12">
          Time Since Our Story Began
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {timeBlocks.map((block, index) => (
            <motion.div
              key={block.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-24 md:w-28 md:h-32 glass rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden group border-white/20">
                <div className="absolute inset-0 bg-gradient-to-b from-soft-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-3xl md:text-5xl font-bold font-serif text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10">
                  {block.value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="text-sm tracking-widest uppercase text-white/50">{block.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
