import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* 
        Placeholder for custom MP3.
        You can replace the src with your actual audio file path (e.g., "/song.mp3") 
        placed in the public folder.
      */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-14 h-14 rounded-full glass-dark flex items-center justify-center hover:scale-110 transition-transform duration-300 relative group overflow-hidden border border-white/20 hover:border-soft-pink/50 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-soft-pink/20 to-sky-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {isPlaying ? (
          <Pause size={24} className="text-white relative z-10" />
        ) : (
          <Play size={24} className="text-white relative z-10 ml-1" />
        )}

        {/* Music notes animation when playing */}
        {isPlaying && (
          <div className="absolute -top-2 -right-2 text-soft-pink animate-bounce">
            <Music size={12} />
          </div>
        )}
      </button>
    </div>
  );
}
