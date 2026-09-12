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
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
    if (state === 'playing') {
      setState('loading');
      audio.play().then(() => setState('playing')).catch(() => setState('error'));
    } else {
      audio.pause();
    }
  }, [index]);

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
      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('button, input, a[href], [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const focusTimer = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('button')?.focus(), 0);
    return () => { document.removeEventListener('keydown', onKey); window.clearTimeout(focusTimer); };
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
    if (state === 'playing') { audio.pause(); setState('paused'); return; }
    setState('loading');
    audio.play().then(() => setState('playing')).catch(() => setState('error'));
  };

  const changeTrack = (step: number) => {
    setIndex((current) => (current + step + playlist.length) % playlist.length);
    setProgress(0);
    setDuration(0);
    setState('playing');
  };

  const selectTrack = (songIndex: number) => {
    const audio = audioRef.current;
    setProgress(0);
    setDuration(0);
    setOpen(false);
    triggerRef.current?.focus();
    if (songIndex === index && audio) {
      setState('loading');
      audio.currentTime = 0;
      audio.play().then(() => setState('playing')).catch(() => setState('error'));
      return;
    }
    setIndex(songIndex);
    setState('playing');
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
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="relative">
      <audio ref={audioRef} preload="metadata" src={playlist[index].src}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
        onPlay={() => setState('playing')}
        onPause={() => setState((current) => current === 'error' ? current : 'paused')}
        onEnded={() => changeTrack(1)}
        onError={() => setState('error')}
        onTimeUpdate={(event) => { const audio = event.currentTarget; setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0); }} />

      <div className="flex items-center gap-1 rounded-full border border-[#E5E5E5] bg-[var(--color-paper-white)] px-1.5 py-1.5 shadow-[0_0_0_3px_rgba(247,247,247,.8)]">
        <button ref={triggerRef} type="button" onClick={togglePlayback} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[var(--color-ink-black)] transition active:scale-[.97] hover:bg-[var(--color-ash-mist)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)]" aria-label={state === 'playing' ? 'Jeda musik' : state === 'loading' ? 'Memuat musik' : state === 'error' ? 'Coba putar musik lagi' : 'Putar musik'} disabled={state === 'loading'}>
          {state === 'playing' ? <Pause size={15} aria-hidden="true" /> : <Play size={15} aria-hidden="true" />}
        </button>
        <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex min-h-11 max-w-[8rem] items-center gap-2 rounded-full px-1 text-left sm:max-w-36" aria-label="Buka pemutar musik" aria-expanded={open} aria-controls="music-player-panel">
          <Headphones size={13} className="shrink-0 text-[var(--color-signal-blue)]" aria-hidden="true" />
          <span className="hidden truncate text-xs font-medium text-[var(--color-graphite)] sm:inline">{state === 'error' ? 'Audio tidak tersedia' : playlist[index].title}</span>
          <span className="sr-only sm:hidden">{state === 'error' ? 'Audio tidak tersedia' : playlist[index].title}</span>
          <ChevronDown size={13} className={`shrink-0 text-[var(--color-smoke)] transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => changeTrack(-1)} className="hidden min-h-11 min-w-10 items-center justify-center rounded-full text-[var(--color-smoke)] transition active:scale-[.97] hover:text-[var(--color-ink-black)] md:flex" aria-label="Lagu sebelumnya"><SkipBack size={14} aria-hidden="true" /></button>
        <button type="button" onClick={() => changeTrack(1)} className="inline-flex min-h-11 min-w-10 items-center justify-center rounded-full text-[var(--color-smoke)] transition active:scale-[.97] hover:text-[var(--color-ink-black)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)]" aria-label="Lagu berikutnya"><SkipForward size={14} aria-hidden="true" /></button>
        <button type="button" onClick={() => setMuted((value) => !value)} className="hidden min-h-11 min-w-10 items-center justify-center rounded-full text-[var(--color-smoke)] transition active:scale-[.97] hover:text-[var(--color-ink-black)] lg:flex" aria-label={muted ? 'Nyalakan suara' : 'Bisukan musik'}>{muted ? <VolumeX size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}</button>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-14 right-14 h-px overflow-hidden rounded-full bg-[#E5E5E5] sm:left-16 sm:right-28"><div className="h-full bg-[var(--color-signal-blue)] transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>

      {open && <div id="music-player-panel" ref={panelRef} className="absolute right-0 top-[calc(100%+10px)] z-[70] w-[min(21rem,calc(100vw-2rem))] rounded-2xl border border-[#E5E5E5] bg-[var(--color-paper-white)] p-3 shadow-[0_18px_50px_rgba(0,0,0,.12)]" role="dialog" aria-label="Pemutar musik VVIP+">
        <div className="flex items-start justify-between gap-3 border-b border-[#E5E5E5] px-2 pb-3"><div><p className="eyebrow">Pemutar musik</p><p className="mt-1 text-sm font-semibold text-[var(--color-ink-black)]">{state === 'error' ? 'Audio tidak tersedia' : playlist[index].title}</p></div><button type="button" onClick={() => { setOpen(false); triggerRef.current?.focus(); }} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#E5E5E5] bg-[var(--color-ash-mist)] text-[var(--color-ink-black)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)]" aria-label="Tutup pemutar musik"><X size={16} aria-hidden="true" /></button></div>
        <div className="mt-4"><label className="sr-only" htmlFor="music-progress">Posisi lagu</label><input id="music-progress" type="range" min="0" max="100" step="0.1" value={progress} onChange={seek} disabled={!duration} className="h-1.5 w-full accent-[var(--color-signal-blue)]" /><div className="mt-1 flex justify-between text-[11px] text-[var(--color-smoke)]"><span>{formatTime((progress / 100) * duration)}</span><span>{formatTime(duration)}</span></div></div>
        <div className="mt-3 flex items-center justify-center gap-1"><button type="button" onClick={() => changeTrack(-1)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[var(--color-graphite)] hover:bg-[var(--color-ash-mist)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)]" aria-label="Lagu sebelumnya"><SkipBack size={17} /></button><button type="button" onClick={togglePlayback} className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-[var(--color-ink-black)] text-[var(--color-paper-white)] active:scale-[.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)]" aria-label={state === 'playing' ? 'Jeda musik' : 'Putar musik'} disabled={state === 'loading'}>{state === 'playing' ? <Pause size={17} /> : <Play size={17} />}</button><button type="button" onClick={() => changeTrack(1)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[var(--color-graphite)] hover:bg-[var(--color-ash-mist)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-signal-blue)]" aria-label="Lagu berikutnya"><SkipForward size={17} /></button></div>
        <div className="mt-4 flex items-center gap-3 border-t border-[#E5E5E5] pt-4">{muted ? <VolumeX size={15} className="text-[var(--color-smoke)]" aria-hidden="true" /> : <Volume2 size={15} className="text-[var(--color-smoke)]" aria-hidden="true" />}<label className="sr-only" htmlFor="music-volume">Volume</label><input id="music-volume" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => { setMuted(false); setVolume(Number(event.target.value)); }} className="h-1.5 flex-1 accent-[var(--color-signal-blue)]" /></div>
        <div className="mt-4 space-y-1" role="list" aria-label="Daftar lagu">{playlist.map((song, songIndex) => <div key={song.src} role="listitem"><button type="button" onClick={() => selectTrack(songIndex)} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition active:scale-[.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-signal-blue)] ${songIndex === index ? 'bg-[var(--color-ash-mist)] text-[var(--color-ink-black)]' : 'text-[var(--color-smoke)] hover:bg-[var(--color-ash-mist)] hover:text-[var(--color-ink-black)]'}`}><span className="w-5 text-[11px] text-[var(--color-smoke)]">0{songIndex + 1}</span><span className="truncate">{song.title}</span>{songIndex === index && <span className="ml-auto text-[11px] font-semibold text-[var(--color-signal-blue)]">Diputar</span>}</button></div>)}</div>
      </div>}
    </div>
  );
}
