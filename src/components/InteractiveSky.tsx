import { useEffect, useRef, useState } from 'react';

export default function InteractiveSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: { x: number, y: number, radius: number, alpha: number, targetAlpha: number }[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw constellations
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 214, 231, 0.15)'; // Soft pink
      ctx.lineWidth = 1;
      
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) {
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
          }
        }
      }
      ctx.stroke();

      // Draw stars
      stars.forEach(star => {
        // Simple alpha tweening
        star.alpha += (star.targetAlpha - star.alpha) * 0.05;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FFF8F2';
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      stars.push({
        x,
        y,
        radius: Math.random() * 2 + 1.5,
        alpha: 0,
        targetAlpha: Math.random() * 0.5 + 0.5
      });

      if (stars.length > 50) {
        stars.shift(); // Keep max stars
      }

      // Achievement logic
      if (stars.length === 20) {
        const achievementEvent = new CustomEvent('star-achievement');
        window.dispatchEvent(achievementEvent);
      }
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const [showAchievement, setShowAchievement] = useState(false);

  useEffect(() => {
    const handleAchievement = () => {
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 5000);
    };
    window.addEventListener('star-achievement', handleAchievement);
    return () => window.removeEventListener('star-achievement', handleAchievement);
  }, []);

  return (
    <section className="h-screen bg-[#020205] relative overflow-hidden flex flex-col items-center justify-center">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 cursor-crosshair z-0"
      />
      
      <div className="z-10 text-center pointer-events-none px-4">
        <h2 className="text-3xl md:text-5xl font-serif text-white/80 mb-4 tracking-widest uppercase">
          Your Universe
        </h2>
        <p className="text-white/40 text-sm md:text-base">
          Click anywhere in the dark sky to create constellations
        </p>
      </div>

      {showAchievement && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-yellow-500/20 border border-yellow-500/50 px-6 py-3 rounded-full backdrop-blur-md z-50 animate-bounce">
          <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm shadow-xl">🏆 Achievement Unlocked: Star Creator</p>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#05010D] to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05010D] to-transparent pointer-events-none" />
    </section>
  );
}
