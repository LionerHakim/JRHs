import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { ChevronDown, Headphones, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, X } from 'lucide-react';

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
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<PlayerState>('idle');
  const [shouldPlay, setShouldPlay] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
    audio.src = playlist[index].src;
    audio.load();
    setProgress(0);
    setDuration(0);
    if (!shouldPlay) {
      audio.pause();
      setState('idle');
      return;
    }
    setState('loading');
    void audio.play().then(() => setState('playing')).catch(() => setState('error'));
  }, [index, shouldPlay]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : volume;
  }, [muted, volume]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const timer = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('button')?.focus(), 0);
    return () => { document.removeEventListener('keydown', onKey); window.clearTimeout(timer); };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio || state === 'loading') return;
    if (state === 'playing') {
      audio.pause();
      setShouldPlay(false);
      setState('paused');
      return;
    }
    setShouldPlay(true);
  };

  const changeTrack = (step: number) => {
    setIndex((current) => (current + step + playlist.length) % playlist.length);
    setShouldPlay(true);
  };

  const selectTrack = (songIndex: number) => {
    setOpen(false);
    setIndex(songIndex);
    setShouldPlay(true);
    triggerRef.current?.focus();
  };

  const seek = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const next = Number(event.target.value);
    audio.currentTime = (next / 100) * duration;
    setProgress(next);
  };

  const formatTime = (value: number) => {
    if (!Number.isFinite(value)) return '0:00';
    return `${Math.floor(value / 60)}:${Math.floor(value % 60).toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative shrink-0">
      <audio
        ref={audioRef}
        preload="metadata"
        src={playlist[index].src}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onPlay={() => setState('playing')}
        onPause={() => { if (state !== 'error' && shouldPlay) setState('paused'); }}
        onEnded={() => changeTrack(1)}
        onError={() => setState('error')}
        onTimeUpdate={(event) => { const audio = event.currentTarget; setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0); }}
      />

      <div className="music-player-pill">
        <button ref={triggerRef} type="button" onClick={togglePlayback} className="music-player-button" aria-label={state === 'playing' ? 'Jeda musik' : 'Putar musik'} disabled={state === 'loading'}>
          {state === 'playing' ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
        </button>
        <button type="button" onClick={() => setOpen((value) => !value)} className="music-player-track-button" aria-label="Buka pemutar musik" aria-expanded={open} aria-controls="music-player-panel">
          <Headphones size={13} className="shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
          <span className="music-player-title">{state === 'error' ? 'Audio bermasalah' : playlist[index].title}</span>
          <ChevronDown size={12} className={`shrink-0 text-[var(--color-muted)] ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => changeTrack(1)} className="music-player-next" aria-label="Lagu berikutnya"><SkipForward size={13} aria-hidden="true" /></button>
      </div>

      <div className="music-player-progress" aria-hidden="true"><div style={{ width: `${progress}%` }} /></div>

      {open && <div id="music-player-panel" ref={panelRef} className="music-player-panel" role="dialog" aria-label="Pemutar musik">
        <div className="flex items-start justify-between gap-3 border-b border-[var(--color-line)] px-2 pb-3">
          <div className="min-w-0"><p className="eyebrow">Pemutar musik</p><p className="mt-1 truncate text-sm font-semibold text-[var(--color-ink)]">{state === 'error' ? 'Audio tidak tersedia' : playlist[index].title}</p></div>
          <button type="button" onClick={() => { setOpen(false); triggerRef.current?.focus(); }} className="music-player-close" aria-label="Tutup pemutar musik"><X size={15} aria-hidden="true" /></button>
        </div>
        <div className="mt-4"><label className="sr-only" htmlFor="music-progress">Posisi lagu</label><input id="music-progress" type="range" min="0" max="100" step="0.1" value={progress} onChange={seek} disabled={!duration} className="music-range" /><div className="mt-1 flex justify-between text-[11px] text-[var(--color-muted)]"><span>{formatTime((progress / 100) * duration)}</span><span>{formatTime(duration)}</span></div></div>
        <div className="mt-3 flex items-center justify-center gap-1"><button type="button" onClick={() => changeTrack(-1)} className="music-player-action" aria-label="Lagu sebelumnya"><SkipBack size={16} /></button><button type="button" onClick={togglePlayback} className="music-player-main-action" aria-label={state === 'playing' ? 'Jeda musik' : 'Putar musik'} disabled={state === 'loading'}>{state === 'playing' ? <Pause size={16} /> : <Play size={16} />}</button><button type="button" onClick={() => changeTrack(1)} className="music-player-action" aria-label="Lagu berikutnya"><SkipForward size={16} /></button></div>
        <div className="mt-4 flex items-center gap-3 border-t border-[var(--color-line)] pt-4">{muted ? <VolumeX size={14} className="text-[var(--color-muted)]" aria-hidden="true" /> : <Volume2 size={14} className="text-[var(--color-muted)]" aria-hidden="true" />}<label className="sr-only" htmlFor="music-volume">Volume</label><input id="music-volume" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => { setMuted(false); setVolume(Number(event.target.value)); }} className="music-range flex-1" /><button type="button" onClick={() => setMuted((value) => !value)} className="music-player-action" aria-label={muted ? 'Nyalakan suara' : 'Bisukan musik'}>{muted ? <VolumeX size={14} /> : <Volume2 size={14} />}</button></div>
        <div className="mt-4 space-y-1" role="list" aria-label="Daftar lagu">{playlist.map((song, songIndex) => <button key={song.src} type="button" onClick={() => selectTrack(songIndex)} className={`music-playlist-item ${songIndex === index ? 'is-active' : ''}`} role="listitem"><span className="w-5 text-[11px] text-[var(--color-muted)]">0{songIndex + 1}</span><span className="truncate">{song.title}</span>{songIndex === index && <span className="ml-auto text-[10px] font-semibold text-[var(--color-accent)]">Diputar</span>}</button>)}</div>
      </div>}
    </div>
  );
}
