import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';

export default function BirthdayLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-32 bg-transparent relative flex items-center justify-center min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-t from-[#05010D] to-transparent pointer-events-none" />
      
      <div className="z-10 w-full max-w-3xl px-4 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              <div className="glass-premium p-12 rounded-3xl border-white/20 transition-all duration-700 flex flex-col items-center gap-6" data-cursor-text="OPEN">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 shadow-xl">
                  <Mail size={40} />
                </div>
                <h3 className="text-3xl font-serif text-white group-hover:text-soft-pink transition-colors">A Special Letter For You</h3>
                <p className="text-white/50 text-sm tracking-widest uppercase">Click to open</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="w-full relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-soft-pink via-lavender to-sky-blue rounded-[32px] blur opacity-30 animate-pulse-slow" />
              <div className="relative bg-[#05010D] rounded-[32px] p-8 md:p-16 shadow-2xl text-slate-800">
                <div className="absolute top-8 right-8 text-soft-pink opacity-50">
                  <Mail size={24} />
                </div>
                <h2 className="font-handwriting text-4xl md:text-6xl text-[#0a0a1a] mb-8">Dear Bestie,</h2>
                <div className="font-handwriting text-2xl md:text-3xl leading-relaxed space-y-6 text-slate-700">
                  <p>
                    Thank you for coming into my life. Every moment spent with you has been an absolute treasure. 
                    You bring so much light, laughter, and joy into my world.
                  </p>
                  <p>
                    From our beautiful traditional days to the crazy fun we had at our college fests, 
                    every single memory with you is something I hold close to my heart. You've been my constant support, 
                    my partner in crime, and the person who understands me without me even having to say a word.
                  </p>
                  <p>
                    I promise to be there for you always, just like you've been there for me. I hope this birthday brings you 
                    as much happiness as you bring to everyone around you. Here's to a lifetime of more memories and an unbreakable bond!
                  </p>
                  <p className="pt-8 text-4xl text-[#0a0a1a] font-bold">
                    Love always, <br />
                    <span className="text-pink-500">Chulbul ❤️</span>
                  </p>
                </div>
              </div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={() => setIsOpen(false)}
                className="mt-8 mx-auto flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                Close letter
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
