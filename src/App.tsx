import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Layout from './components/Layout';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import Reasons from './components/Reasons';
import Gallery from './components/Gallery';
import BirthdayLetter from './components/BirthdayLetter';
import BirthdayWishes from './components/BirthdayWishes';
import InteractiveSky from './components/InteractiveSky';
import MusicPlayer from './components/MusicPlayer';
import Countdown from './components/Countdown';
import Footer from './components/Footer';

// New Magical Sections
import BirthdayCake from './components/BirthdayCake';
import MemoryJar from './components/MemoryJar';
import WishBalloon from './components/WishBalloon';
import MemoryScrapbook from './components/MemoryScrapbook';
import FinalGoodbye from './components/FinalGoodbye';

export default function App() {
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [showIdlePopup, setShowIdlePopup] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);

  // 30 Second Idle Easter Egg
  useEffect(() => {
    let idleTimer: ReturnType<typeof setTimeout>;

    const resetIdleTimer = () => {
      clearTimeout(idleTimer);
      setShowIdlePopup(false);
      idleTimer = setTimeout(() => {
        setShowIdlePopup(true);
      }, 30000); // 30 seconds
    };

    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keydown', resetIdleTimer);
    window.addEventListener('scroll', resetIdleTimer);

    resetIdleTimer();

    return () => {
      clearTimeout(idleTimer);
      window.removeEventListener('mousemove', resetIdleTimer);
      window.removeEventListener('keydown', resetIdleTimer);
      window.removeEventListener('scroll', resetIdleTimer);
    };
  }, []);

  // Konami Code & "bestie" Easter Eggs
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    const bestieCode = ['b', 'e', 's', 't', 'i', 'e'];
    let bestieIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Konami Check
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          triggerFireworks();
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }

      // Bestie Check
      if (e.key.toLowerCase() === bestieCode[bestieIndex]) {
        bestieIndex++;
        if (bestieIndex === bestieCode.length) {
          triggerFloatingHearts();
          bestieIndex = 0;
        }
      } else {
        bestieIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 100% Scroll Secret
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollPosition >= documentHeight - 10) {
        if (!showSecretModal) {
          setTimeout(() => setShowSecretModal(true), 2000);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showSecretModal]);

  const triggerFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const triggerFloatingHearts = () => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth
    }));
    
    setFloatingHearts(prev => [...prev, ...newHearts]);
    
    setTimeout(() => {
      setFloatingHearts([]);
    }, 4000);
  };

  return (
    <div className="bg-[#05010D] text-white overflow-x-hidden min-h-screen">
      <CustomCursor />
      
      {/* 30 Second Idle Easter Egg Popup */}
      <AnimatePresence>
        {showIdlePopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-10 left-10 z-[150] glass-premium p-6 rounded-2xl flex items-center gap-4"
          >
            <Heart className="text-soft-pink animate-pulse" />
            <p className="font-handwriting text-2xl text-white">Still here? I hope you're smiling ❤️</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts from "bestie" typing */}
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        <AnimatePresence>
          {floatingHearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ y: window.innerHeight, x: heart.x, opacity: 1, scale: 0.5 }}
              animate={{ y: -100, opacity: 0, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="absolute text-soft-pink"
            >
              <Heart fill="currentColor" size={32} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <MusicPlayer />

      <Layout>
        <Hero />
        <Timeline />
        <MemoryScrapbook />
        <Reasons />
        <Gallery />
        <BirthdayLetter />
        <BirthdayCake />
        <BirthdayWishes />
        <MemoryJar />
        <Countdown />
        <WishBalloon />
        <InteractiveSky />
        <FinalGoodbye />
        <Footer />
      </Layout>

      {/* Secret Thank You Modal (100% Scroll) */}
      <AnimatePresence>
        {showSecretModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass max-w-lg p-10 rounded-3xl text-center"
            >
              <h3 className="text-3xl font-serif text-soft-pink mb-4">You found the secret!</h3>
              <p className="text-white/80 mb-8">
                Thank you for scrolling all the way to the end. I hope this website made you smile as much as you make me smile every day.
              </p>
              <button 
                onClick={() => setShowSecretModal(false)}
                className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-soft-pink hover:text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
