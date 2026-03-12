import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronDown, Music, Disc3 } from 'lucide-react';

const playlist = [
  { title: 'Budi Doremi', src: '/data/musik/Budi-Doremi.mp3' },
  { title: 'Rahasia Hati', src: '/data/musik/Rahasia-Hati.mp3' },
  { title: 'Tak Ada Ujungnya', src: '/data/musik/Tak-AdaUjungnya.mp3' },
  { title: 'Tourner Dans Le Vide', src: '/data/musik/Tourner-DansLeVide.mp3' },
  { title: 'Who Knows', src: '/data/musik/Who-Knows.mp3' }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // set volume saja (tanpa autoplay)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.65;
    }
  }, []);

  // klik luar player untuk tutup playlist
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(event.target as Node)) {
        setShowPlaylist(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.log('Play blocked', err));
      }
    }
  };

  const nextSong = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevSong = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;

      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const percentage = x / bounds.width;

      audioRef.current.currentTime = percentage * audioRef.current.duration;
      setProgress(percentage * 100);
    }
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentSongIndex, isPlaying]);

  const currentSong = playlist[currentSongIndex];

  return (
    <div className="relative flex items-center z-50" ref={playerRef}>
      <audio
        ref={audioRef}
        src={currentSong.src}
        onEnded={nextSong}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="flex items-center gap-2 md:gap-4 bg-white/[0.03] border border-white/10 rounded-full px-2 md:px-4 py-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 group/player">

        <button
          onClick={togglePlay}
          className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full"
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        <div
          className="flex flex-col justify-center w-[80px] sm:w-[100px] md:w-[140px] cursor-pointer"
          onClick={() => setShowPlaylist(!showPlaylist)}
        >
          <div className="text-[11px] md:text-sm font-semibold text-gray-200 truncate">
            {currentSong.title}
          </div>

          <div
            className="h-1 w-full bg-white/10 rounded-full mt-1.5 overflow-hidden"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-gradient-to-r from-accent-blue to-accent-purple"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 border-l border-white/10 pl-2 md:pl-4">
          <button onClick={prevSong} className="hidden sm:block">
            <SkipBack size={16} />
          </button>

          <button onClick={nextSong}>
            <SkipForward size={16} />
          </button>

          <button onClick={toggleMute} className="hidden lg:block ml-1">
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full mt-4 right-0 w-[260px] md:w-[320px] glass-panel rounded-3xl overflow-hidden border border-white/10 z-50"
          >
            <div className="p-3 flex flex-col gap-1">
              {playlist.map((song, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentSongIndex(idx);
                    setIsPlaying(true);
                    setShowPlaylist(false);
                  }}
                  className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer ${
                    currentSongIndex === idx
                      ? 'bg-white/[0.08]'
                      : 'hover:bg-white/[0.04]'
                  }`}
                >
                  <Music size={16} />
                  <div className="text-sm font-semibold truncate">
                    {song.title}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
