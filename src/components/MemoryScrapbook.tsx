import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const pages = [
  {
    image: "/images/1.jpeg",
    note: "Our favorite look!",
    sticker: "✨"
  },
  {
    image: "/images/2.jpeg",
    note: "Such a cute moment",
    sticker: "❤️"
  },
  {
    image: "/images/3.jpeg",
    note: "Love you always",
    sticker: "🦋"
  }
];

export default function MemoryScrapbook() {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pages.length);
  };

  return (
    <section className="py-40 relative flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-16 z-10">
        <span className="text-sm tracking-[0.3em] uppercase text-white/40 mb-4 block">Flipping through time</span>
        <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter">Our Scrapbook</h2>
      </div>

      <div className="relative w-full max-w-2xl aspect-[4/3] perspective-1200 cursor-pointer" onClick={nextPage} data-cursor-text="FLIP">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ rotateY: 90, opacity: 0, transformOrigin: 'left center' }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#f4e4d4] rounded-r-3xl shadow-[20px_20px_60px_rgba(0,0,0,0.5)] border-l-[16px] border-[#8b5a2b] p-8 flex flex-col items-center justify-center"
          >
            {/* Scrapbook page texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
            
            <div className="relative z-10 bg-white p-4 pb-12 shadow-xl rotate-[-2deg]">
              <div className="w-64 h-64 overflow-hidden border border-gray-200">
                <img src={pages[currentPage].image} alt="Memory" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
              <div className="absolute bottom-2 left-0 w-full text-center">
                <p className="font-handwriting text-2xl text-slate-800">{pages[currentPage].note}</p>
              </div>
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/50 rotate-[-5deg] shadow-sm backdrop-blur-sm border border-white/20" />
              
              {/* Sticker */}
              <div className="absolute -bottom-6 -right-6 text-6xl rotate-12 drop-shadow-md">
                {pages[currentPage].sticker}
              </div>
            </div>
            
            <p className="absolute bottom-4 right-6 text-slate-400 font-handwriting text-xl">Page {currentPage + 1}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
