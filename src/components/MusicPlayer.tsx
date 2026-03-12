import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, ChevronDown, Music, Disc3 } from 'lucide-react';

const playlist = [
  { title: 'Budi Doremi', artist: '', src: '/data/musik/Budi-Doremi.mp3' },
  { title: 'Rahasia Hati', artist: '', src: '/data/musik/Rahasia-Hati.mp3' },
  { title: 'Tak Ada Ujungnya', artist: '', src: '/data/musik/Tak-AdaUjungnya.mp3' },
  { title: 'Tourner Dans Le Vide', artist: '', src: '/data/musik/Tourner-DansLeVide.mp3' },
  { title: 'Who Knows', artist: '', src: '/data/musik/Who-Knows.mp3' }
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.65;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

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
        audioRef.current.volume = 0.65;
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(e => console.log('Autoplay prevented', e));
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
      audioRef.current.volume = 0.65;
      audioRef.current.play().catch(e => {
        console.log('Autoplay prevented', e);
        setIsPlaying(false);
      });
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
          className="relative w-8 h-8 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center rounded-full group/btn focus:outline-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue to-accent-purple rounded-full opacity-80 group-hover/btn:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(59,130,246,0.4)] group-hover/btn:shadow-[0_0_25px_rgba(59,130,246,0.6)]" />
          <div className="absolute inset-[1px] bg-black/20 rounded-full" />
          <div className="relative z-10 text-white transform group-hover/btn:scale-110 group-active/btn:scale-95 transition-transform duration-300">
            {isPlaying ? <Pause size={14} className="fill-white" /> : <Play size={14} className="fill-white ml-0.5" />}
          </div>

          {isPlaying && (
            <div className="absolute -inset-1 rounded-full border border-accent-blue/30 animate-[spin_4s_linear_infinite]" />
          )}
        </button>

        <div
          className="flex flex-col justify-center w-[80px] sm:w-[100px] md:w-[140px] cursor-pointer group/info"
          onClick={() => setShowPlaylist(!showPlaylist)}
        >
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="text-[11px] md:text-sm font-semibold text-gray-200 truncate group-hover/info:text-white transition-colors">
              {currentSong.title}
            </div>
            <ChevronDown size={14} className={`text-gray-500 group-hover/info:text-white transition-all duration-300 flex-shrink-0 ${showPlaylist ? 'rotate-180 text-accent-blue' : ''}`} />
          </div>

          <div className="flex items-center gap-2">
            {isPlaying ? (
              <div className="flex items-end gap-[2px] h-2.5 w-4 flex-shrink-0">
                <div className="w-[2px] bg-accent-blue rounded-t-sm animate-[bounce_1s_ease-in-out_infinite]" style={{ height: '100%' }}></div>
                <div className="w-[2px] bg-accent-purple rounded-t-sm animate-[bounce_1.2s_ease-in-out_infinite_0.2s]" style={{ height: '70%' }}></div>
                <div className="w-[2px] bg-accent-pink rounded-t-sm animate-[bounce_0.8s_ease-in-out_infinite_0.4s]" style={{ height: '40%' }}></div>
              </div>
            ) : (
              <Disc3 size={10} className="text-gray-500 flex-shrink-0" />
            )}
            <div className="text-[9px] md:text-[10px] text-gray-400 font-mono truncate group-hover/info:text-gray-300 transition-colors">
              {currentSong.artist}
            </div>
          </div>

          <div
            className="h-1 w-full bg-white/10 rounded-full mt-1.5 overflow-hidden group-hover/info:h-1.5 transition-all duration-300 relative"
            onClick={handleProgressClick}
          >
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 border-l border-white/10 pl-2 md:pl-4">
          <button onClick={prevSong} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all hidden sm:block">
            <SkipBack size={16} />
          </button>
          <button onClick={nextSong} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all">
            <SkipForward size={16} />
          </button>
          <button onClick={toggleMute} className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all hidden lg:block ml-1">
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
            className="absolute top-full mt-4 right-0 w-[260px] md:w-[320px] glass-panel rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-white/10 z-50 origin-top-right backdrop-blur-2xl"
          >
            <div className="p-3 flex flex-col gap-1">
              <div className="px-4 py-3 flex items-center justify-between border-b border-white/5 mb-2">
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest flex items-center gap-2">
                  <Music size={14} className="text-accent-blue" />
                  Playlist
                </span>
                <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                  {playlist.length} Tracks
                </span>
              </div>

              <div className="max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {playlist.map((song, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentSongIndex(idx);
                      setIsPlaying(true);
                      setShowPlaylist(false);
                    }}
                    className={`flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 group ${
                      currentSongIndex === idx
                        ? 'bg-white/[0.08] border border-white/10 shadow-inner'
                        : 'hover:bg-white/[0.04] border border-transparent'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      currentSongIndex === idx
                        ? 'bg-gradient-to-br from-accent-blue to-accent-purple text-white shadow-[0_0_15px_rgba(59,130,246,0.4)] scale-105'
                        : 'bg-white/5 text-gray-400 group-hover:bg-white/10 group-hover:text-white group-hover:scale-105'
                    }`}>
                      {currentSongIndex === idx && isPlaying ? (
                        <div className="flex items-end gap-[2px] h-3 w-3">
                          <div className="w-[2px] bg-white rounded-t-sm animate-[bounce_1s_ease-in-out_infinite]" style={{ height: '100%' }}></div>
                          <div className="w-[2px] bg-white rounded-t-sm animate-[bounce_1.2s_ease-in-out_infinite_0.2s]" style={{ height: '70%' }}></div>
                          <div className="w-[2px] bg-white rounded-t-sm animate-[bounce_0.8s_ease-in-out_infinite_0.4s]" style={{ height: '40%' }}></div>
                        </div>
                      ) : (
                        <Music size={16} />
                      )}
                    </div>

                    <div className="overflow-hidden flex-1">
                      <div className={`text-sm font-semibold truncate transition-colors duration-300 ${
                        currentSongIndex === idx ? 'text-white' : 'text-gray-300 group-hover:text-white'
                      }`}>
                        {song.title}
                      </div>
                      <div className="text-[11px] text-gray-500 truncate mt-0.5 group-hover:text-gray-400 transition-colors">
                        {song.artist}
                      </div>
                    </div>

                    {currentSongIndex === idx && (
                      <div className="w-1.5 h-1.5 rounded-full bg-accent-blue shadow-[0_0_8px_rgba(59,130,246,0.8)] mr-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
