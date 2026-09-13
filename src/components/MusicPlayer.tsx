import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { ChevronDown, Headphones, Pause, Play, RefreshCw, SkipBack, SkipForward, Volume2, VolumeX, X } from 'lucide-react';

const base = import.meta.env.BASE_URL;
const playlist = [
  { title: 'Budi Doremi', src: `${base}data/musik/Budi-Doremi.mp3` },
  { title: 'Rahasia Hati', src: `${base}data/musik/Rahasia-Hati.mp3` },
  { title: 'Tak Ada Ujungnya', src: `${base}data/musik/Tak-AdaUjungnya.mp3` },
  { title: 'Tourner Dans Le Vide', src: `${base}data/musik/Tourner-DansLeVide.mp3` },
  { title: 'Who Knows', src: `${base}data/musik/Who-Knows.mp3` },
];

type PlayerState = 'idle' | 'playing' | 'paused' | 'loading' | 'error';
const STORAGE_KEY = 'jrh-music-player-v1';
type StoredPlayer = { index?: number; volume?: number; muted?: boolean };

function readStoredPlayer(): StoredPlayer {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as StoredPlayer : {};
  } catch {
    return {};
  }
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const resumeAfterHideRef = useRef(false);
  const playRequestRef = useRef(false);
  const [index, setIndex] = useState(() => {
    const stored = readStoredPlayer();
    return Number.isInteger(stored.index) && (stored.index as number) >= 0 && (stored.index as number) < playlist.length ? (stored.index as number) : 0;
  });
  const [state, setState] = useState<PlayerState>('idle');
  const [muted, setMuted] = useState(() => Boolean(readStoredPlayer().muted));
  const [volume, setVolume] = useState(() => {
    const value = readStoredPlayer().volume;
    return typeof value === 'number' && value >= 0 && value <= 1 ? value : 0.65;
  });
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => { indexRef.current = index; }, [index]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ index, volume, muted })); }
    catch { /* Storage may be unavailable in private/restricted browser contexts. */ }
  }, [index, volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.preload = 'metadata';
    audio.volume = muted ? 0 : volume;
    audio.src = playlist[index].src;
    audio.load();
    setProgress(0);
    setDuration(0);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume;
  }, [muted, volume]);

  useEffect(() => {
    const onVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.visibilityState === 'hidden') {
        if (!audio.paused) {
          resumeAfterHideRef.current = true;
          audio.pause();
        }
      } else if (document.visibilityState === 'visible' && resumeAfterHideRef.current) {
        resumeAfterHideRef.current = false;
        setState('paused');
      }
    };
    const onPageHide = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (!audio.paused) {
        resumeAfterHideRef.current = true;
        audio.pause();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('pagehide', onPageHide);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, []);

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
    const timer = window.setTimeout(() => panelRef.current?.querySelector<HTMLElement>('button:not([disabled])')?.focus(), 0);
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

  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;
    playRequestRef.current = true;
    setState('loading');
    void audio.play().then(() => {
      setState('playing');
      playRequestRef.current = false;
    }).catch(() => {
      playRequestRef.current = false;
      setState('error');
    });
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    playRequestRef.current = false;
    audio.pause();
    setState('paused');
  };

  const togglePlayback = () => {
    if (state === 'loading') return;
    if (state === 'playing') pause();
    else play();
  };

  const switchTrack = (nextIndex: number, autoplay = true) => {
    const audio = audioRef.current;
    if (!audio) return;
    const safeIndex = (nextIndex + playlist.length) % playlist.length;
    indexRef.current = safeIndex;
    setIndex(safeIndex);
    setProgress(0);
    setDuration(0);
    setState(autoplay ? 'loading' : 'idle');
    playRequestRef.current = autoplay;
    audio.pause();
    audio.src = playlist[safeIndex].src;
    audio.load();
    if (autoplay) {
      void audio.play().then(() => {
        playRequestRef.current = false;
        setState('playing');
      }).catch(() => {
        playRequestRef.current = false;
        setState('error');
      });
    }
  };

  const changeTrack = (step: number) => switchTrack(indexRef.current + step, true);

  const selectTrack = (songIndex: number) => {
    setOpen(false);
    switchTrack(songIndex, true);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };

  const retry = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.load();
    play();
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

  const statusLabel = state === 'error' ? 'Audio tidak tersedia' : state === 'loading' ? 'Memuat musik' : state === 'playing' ? 'Sedang diputar' : state === 'paused' ? 'Dijeda' : 'Siap diputar';

  return (
    <div className="relative shrink-0" aria-label="Pemutar musik">
      <audio
        ref={audioRef}
        preload="metadata"
        playsInline
        onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onDurationChange={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onPlay={() => setState('playing')}
        onPause={() => { if (!resumeAfterHideRef.current && state !== 'error' && !playRequestRef.current) setState('paused'); }}
        onWaiting={() => { if (!audioRef.current?.paused) setState('loading'); }}
        onPlaying={() => setState('playing')}
        onStalled={() => { if (!audioRef.current?.paused) setState('loading'); }}
        onEnded={() => changeTrack(1)}
        onError={() => { playRequestRef.current = false; setState('error'); }}
        onTimeUpdate={(event) => {
          const audio = event.currentTarget;
          setProgress(audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0);
        }}
      />

      <div className="music-player-pill" title={`${playlist[index].title} — ${statusLabel}`}>
        <button ref={triggerRef} type="button" onClick={togglePlayback} className="music-player-button" aria-label={state === 'playing' ? 'Jeda musik' : 'Putar musik'} disabled={state === 'loading'}>
          {state === 'playing' ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
        </button>
        <button type="button" onClick={() => setOpen((value) => !value)} className="music-player-track-button" aria-label={`Buka pemutar musik, ${playlist[index].title}`} aria-expanded={open} aria-controls="music-player-panel">
          <Headphones size={13} className="shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
          <span className="music-player-title">{state === 'error' ? 'Audio bermasalah' : playlist[index].title}</span>
          <ChevronDown size={12} className={`shrink-0 text-[var(--color-muted)] ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => changeTrack(1)} className="music-player-next" aria-label="Lagu berikutnya"><SkipForward size={13} aria-hidden="true" /></button>
      </div>

      <div className="music-player-progress" aria-hidden="true"><div style={{ width: `${progress}%` }} /></div>

      {open && <>
        <div className="music-player-panel-backdrop" aria-hidden="true" />
        <div id="music-player-panel" ref={panelRef} className="music-player-panel" role="dialog" aria-modal="false" aria-label="Pemutar musik">
          <div className="flex items-start justify-between gap-3 border-b border-[var(--color-line)] px-2 pb-3">
            <div className="min-w-0"><p className="eyebrow">Pemutar musik</p><p className="mt-1 truncate text-sm font-semibold text-[var(--color-ink)]">{state === 'error' ? 'Audio tidak tersedia' : playlist[index].title}</p></div>
            <button type="button" onClick={() => { setOpen(false); triggerRef.current?.focus(); }} className="music-player-close" aria-label="Tutup pemutar musik"><X size={15} aria-hidden="true" /></button>
          </div>

          {state === 'error' && <div className="music-player-error" role="status" aria-live="polite">
            <p>Tidak bisa memutar file ini di browser saat ini.</p>
            <button type="button" onClick={retry} className="music-player-retry"><RefreshCw size={14} aria-hidden="true" /> Coba lagi</button>
          </div>}

          <div className="mt-4"><label className="sr-only" htmlFor="music-progress">Posisi lagu</label><input id="music-progress" type="range" min="0" max="100" step="0.1" value={progress} onChange={seek} disabled={!duration || state === 'error'} className="music-range" /><div className="mt-1 flex justify-between text-[11px] text-[var(--color-muted)]"><span>{formatTime((progress / 100) * duration)}</span><span>{formatTime(duration)}</span></div></div>
          <div className="mt-3 flex items-center justify-center gap-1"><button type="button" onClick={() => changeTrack(-1)} className="music-player-action" aria-label="Lagu sebelumnya"><SkipBack size={16} aria-hidden="true" /></button><button type="button" onClick={togglePlayback} className="music-player-main-action" aria-label={state === 'playing' ? 'Jeda musik' : 'Putar musik'} disabled={state === 'loading'}>{state === 'playing' ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}</button><button type="button" onClick={() => changeTrack(1)} className="music-player-action" aria-label="Lagu berikutnya"><SkipForward size={16} aria-hidden="true" /></button></div>
          <div className="mt-4 flex items-center gap-3 border-t border-[var(--color-line)] pt-4">{muted ? <VolumeX size={14} className="text-[var(--color-muted)]" aria-hidden="true" /> : <Volume2 size={14} className="text-[var(--color-muted)]" aria-hidden="true" />}<label className="sr-only" htmlFor="music-volume">Volume</label><input id="music-volume" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => { setMuted(false); setVolume(Number(event.target.value)); }} className="music-range flex-1" /><button type="button" onClick={() => setMuted((value) => !value)} className="music-player-action" aria-label={muted ? 'Nyalakan suara' : 'Bisukan musik'}>{muted ? <VolumeX size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}</button></div>
          <div className="mt-4 space-y-1" role="list" aria-label="Daftar lagu">{playlist.map((song, songIndex) => <button key={song.src} type="button" onClick={() => selectTrack(songIndex)} className={`music-playlist-item ${songIndex === index ? 'is-active' : ''}`} role="listitem"><span className="w-5 text-[11px] text-[var(--color-muted)]">0{songIndex + 1}</span><span className="truncate">{song.title}</span>{songIndex === index && <span className="ml-auto text-[10px] font-semibold text-[var(--color-accent)]">Saat ini</span>}</button>)}</div>
        </div>
      </>}
    </div>
  );
}
