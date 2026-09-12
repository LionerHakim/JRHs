import { useEffect, useRef, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';

const base = import.meta.env.BASE_URL;
const playlist = [
  { title: 'Budi Doremi', src: `${base}data/musik/Budi-Doremi.mp3` },
  { title: 'Rahasia Hati', src: `${base}data/musik/Rahasia-Hati.mp3` },
  { title: 'Tak Ada Ujungnya', src: `${base}data/musik/Tak-AdaUjungnya.mp3` },
  { title: 'Tourner Dans Le Vide', src: `${base}data/musik/Tourner-DansLeVide.mp3` },
  { title: 'Who Knows', src: `${base}data/musik/Who-Knows.mp3` },
];

type PlayerState = 'idle' | 'playing' | 'paused' | 'loading' | 'error';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<PlayerState>('idle');
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
    if (state === 'playing') {
      setState('loading');
      audio.play().then(() => setState('playing')).catch(() => setState('error'));
    } else if (state !== 'loading') {
      audio.pause();
    }
  }, [index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : volume;
  }, [muted, volume]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (state === 'playing') {
      audio.pause();
      setState('paused');
      return;
    }
    setState('loading');
    audio.play().then(() => setState('playing')).catch(() => setState('error'));
  };

  const changeTrack = (next: number) => {
    setIndex((current) => (current + next + playlist.length) % playlist.length);
    setProgress(0);
    setState('playing');
  };

  const selectTrack = (songIndex: number) => {
    setIndex(songIndex);
    setProgress(0);
    setState('playing');
    setOpen(false);
  };

  return (
    <div className="relative">
      <audio
        ref={audioRef}
        preload="metadata"
        src={playlist[index].src}
        onCanPlay={() => { if (state === 'loading') setState('playing'); }}
        onPlay={() => setState('playing')}
        onPause={() => setState((current) => current === 'error' ? current : 'paused')}
        onEnded={() => changeTrack(1)}
        onError={() => setState('error')}
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
        }}
      />
      <div className="flex items-center gap-1 rounded-full border border-[#1D1D1D] bg-[#101010] px-1.5 py-1.5 shadow-[0_8px_28px_rgba(0,0,0,.24)]">
        <button type="button" onClick={togglePlayback} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[#F5F5F5] transition active:scale-[.97] hover:bg-[#141414] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]" aria-label={state === 'playing' ? 'Pause music' : state === 'loading' ? 'Loading music' : state === 'error' ? 'Retry music' : 'Play music'} disabled={state === 'loading'}>
          {state === 'playing' ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button type="button" onClick={() => setOpen((value) => !value)} className="hidden min-h-11 max-w-32 items-center gap-2 px-1 text-left sm:flex" aria-label="Open music playlist" aria-expanded={open}>
          <Music size={13} className={state === 'error' ? 'shrink-0 text-[#666]' : 'shrink-0 text-[#007AFF]'} />
          <span className="truncate text-xs font-medium text-[#A0A0A0]">{state === 'error' ? 'Audio unavailable' : playlist[index].title}</span>
        </button>
        <button type="button" onClick={() => changeTrack(-1)} className="hidden min-h-11 min-w-10 items-center justify-center rounded-full text-[#666] transition active:scale-[.97] hover:text-[#F5F5F5] md:flex" aria-label="Previous track"><SkipBack size={14} /></button>
        <button type="button" onClick={() => changeTrack(1)} className="inline-flex min-h-11 min-w-10 items-center justify-center rounded-full text-[#666] transition active:scale-[.97] hover:text-[#F5F5F5] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]" aria-label="Next track"><SkipForward size={14} /></button>
        <button type="button" onClick={() => setMuted((value) => !value)} className="hidden min-h-11 min-w-10 items-center justify-center rounded-full text-[#666] transition active:scale-[.97] hover:text-[#F5F5F5] lg:flex" aria-label={muted ? 'Unmute music' : 'Mute music'}>{muted ? <VolumeX size={14} /> : <Volume2 size={14} />}</button>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-14 right-14 h-px overflow-hidden rounded-full bg-white/[.06] sm:left-16 sm:right-28"><div className="h-full bg-[#007AFF]" style={{ width: `${progress}%` }} /></div>
      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-[70] w-64 rounded-2xl border border-[#1D1D1D] bg-[#0A0A0A] p-2 shadow-[0_18px_50px_rgba(0,0,0,.4)]" role="menu" aria-label="Playlist">
          {playlist.map((song, songIndex) => (
            <button type="button" key={song.src} onClick={() => selectTrack(songIndex)} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition active:scale-[.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#007AFF] ${songIndex === index ? 'bg-[#141414] text-[#F5F5F5]' : 'text-[#A0A0A0] hover:bg-[#101010] hover:text-[#F5F5F5]'}`} role="menuitem">
              <Music size={13} className={songIndex === index ? 'text-[#007AFF]' : 'text-[#666]'} />
              <span className="truncate">{song.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
