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
const STORAGE_KEY = 'jrh-music-player-v2';
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
  const playRequestRef = useRef(false);
  const stored = useRef(readStoredPlayer());
  const [index, setIndex] = useState(() => Number.isInteger(stored.current.index) && (stored.current.index as number) >= 0 && (stored.current.index as number) < playlist.length ? (stored.current.index as number) : 0);
  const [state, setState] = useState<PlayerState>('idle');
  const [muted, setMuted] = useState(() => Boolean(stored.current.muted));
  const [volume, setVolume] = useState(() => typeof stored.current.volume === 'number' && stored.current.volume >= 0 && stored.current.volume <= 1 ? stored.current.volume : 0.65);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => { indexRef.current = index; }, [index]);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ index, volume, muted })); } catch { /* Storage may be unavailable. */ }
  }, [index, volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.preload = 'auto';
    audio.playsInline = true;
    audio.setAttribute('playsinline', '');
    audio.setAttribute('webkit-playsinline', '');
    audio.volume = muted ? 0 : volume;
    audio.src = playlist[index].src;
    audio.load();
    setProgress(0);
    setDuration(0);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : volume;
  }, [muted, volume]);

  useEffect(() => {
    const mediaSession = typeof navigator !== 'undefined' ? navigator.mediaSession : undefined;
    if (!mediaSession) return;

    mediaSession.metadata = new MediaMetadata({
      title: playlist[index].title,
      artist: 'Personal playlist',
    });

    const run = (action: MediaSessionAction, handler: () => void) => {
      try { mediaSession.setActionHandler(action, handler); } catch { /* Browser may not support this action. */ }
    };
    run('play', () => play());
    run('pause', () => pause());
    run('previoustrack', () => changeTrack(-1));
    run('nexttrack', () => changeTrack(1));
    run('seekbackward', () => seekBy(-10));
    run('seekforward', () => seekBy(10));

    return () => {
      ['play', 'pause', 'previoustrack', 'nexttrack', 'seekbackward', 'seekforward'].forEach((action) => {
        try { mediaSession.setActionHandler(action as MediaSessionAction, null); } catch { /* Ignore unsupported actions. */ }
      });
    };
  }, [index, state]);

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
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
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
      playRequestRef.current = false;
      setState('playing');
      if (navigator.mediaSession) navigator.mediaSession.playbackState = 'playing';
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
    if (navigator.mediaSession) navigator.mediaSession.playbackState = 'paused';
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
    playRequestRef.current = false;
    audio.pause();
    audio.src = playlist[safeIndex].src;
    audio.load();
    if (!autoplay) {
      setState('idle');
      return;
    }
    playRequestRef.current = true;
    setState('loading');
    void audio.play().then(() => {
      playRequestRef.current = false;
      setState('playing');
      if (navigator.mediaSession) navigator.mediaSession.playbackState = 'playing';
    }).catch(() => {
      playRequestRef.current = false;
      setState('error');
    });
  };

  const changeTrack = (step: number) => switchTrack(indexRef.current + step, true);

  const seekBy = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;
    audio.currentTime = Math.min(audio.duration, Math.max(0, audio.currentTime + seconds));
  };

  const selectTrack = (songIndex: number) => {
    setOpen(false);
    switchTrack(songIndex, true);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  };

  const retry = () => {
    const audio = audioRef.current;
    if (!audio) return;
    playRequestRef.current = false;
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

  const formatTime = (value: number) => Number.isFinite(value)
    ? `${Math.floor(value / 60)}:${Math.floor(value % 60).toString().padStart(2, '0')}`
    : '0:00';
  const statusLabel = state === 'error' ? 'Audio tidak tersedia' : state === 'loading' ? 'Memuat musik' : state === 'playing' ? 'Sedang diputar' : state === 'paused' ? 'Dijeda' : 'Siap diputar';

  return (
    <div className="music-player" aria-label="Pemutar musik">
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
        onLoadedMetadata={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onDurationChange={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
        onPlay={() => {
          playRequestRef.current = false;
          setState('playing');
          if (navigator.mediaSession) navigator.mediaSession.playbackState = 'playing';
        }}
        onPause={() => {
          if (!playRequestRef.current && state !== 'error') setState('paused');
          if (navigator.mediaSession) navigator.mediaSession.playbackState = 'paused';
        }}
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
        <button type="button" onClick={() => setOpen((value) => !value)} className="music-player-track-button" aria-label={`Pilih musik, ${playlist[index].title}`} aria-expanded={open} aria-controls="music-player-panel">
          <Headphones size={13} aria-hidden="true" />
          <span className="music-player-track-label">Music</span>
          <span className="music-player-title">{state === 'error' ? 'Audio bermasalah' : playlist[index].title}</span>
          <ChevronDown size={13} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => changeTrack(1)} className="music-player-next" aria-label="Lagu berikutnya"><SkipForward size={13} aria-hidden="true" /></button>
      </div>
      <div className="music-player-progress" aria-hidden="true"><div style={{ width: `${progress}%` }} /></div>

      {open && <>
        <div className="music-player-panel-backdrop" aria-hidden="true" />
        <div id="music-player-panel" ref={panelRef} className="music-player-panel" role="dialog" aria-modal="false" aria-label="Pemutar musik">
          <div className="music-player-panel-head">
            <div className="min-w-0"><p className="eyebrow">Music</p><p className="music-player-current">{state === 'error' ? 'Audio tidak tersedia' : playlist[index].title}</p></div>
            <button type="button" onClick={() => { setOpen(false); triggerRef.current?.focus(); }} className="music-player-close" aria-label="Tutup pemutar musik"><X size={15} aria-hidden="true" /></button>
          </div>

          {state === 'error' && <div className="music-player-error" role="status" aria-live="polite">
            <p>Tidak bisa memutar file ini di browser saat ini.</p>
            <button type="button" onClick={retry} className="music-player-retry"><RefreshCw size={14} aria-hidden="true" /> Coba lagi</button>
          </div>}

          <div className="music-player-timeline"><label className="sr-only" htmlFor="music-progress">Posisi lagu</label><input id="music-progress" type="range" min="0" max="100" step="0.1" value={progress} onChange={seek} disabled={!duration || state === 'error'} className="music-range" /><div><span>{formatTime((progress / 100) * duration)}</span><span>{formatTime(duration)}</span></div></div>
          <div className="music-player-main-controls"><button type="button" onClick={() => changeTrack(-1)} className="music-player-action" aria-label="Lagu sebelumnya"><SkipBack size={17} aria-hidden="true" /></button><button type="button" onClick={togglePlayback} className="music-player-main-action" aria-label={state === 'playing' ? 'Jeda musik' : 'Putar musik'} disabled={state === 'loading'}>{state === 'playing' ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}</button><button type="button" onClick={() => changeTrack(1)} className="music-player-action" aria-label="Lagu berikutnya"><SkipForward size={17} aria-hidden="true" /></button></div>

          <div className="music-player-volume"><div className="music-player-volume-icon">{muted ? <VolumeX size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}</div><label className="sr-only" htmlFor="music-volume">Volume</label><input id="music-volume" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => { setMuted(false); setVolume(Number(event.target.value)); }} className="music-range" /><button type="button" onClick={() => setMuted((value) => !value)} className="music-player-action" aria-label={muted ? 'Nyalakan suara' : 'Bisukan musik'}>{muted ? <VolumeX size={14} aria-hidden="true" /> : <Volume2 size={14} aria-hidden="true" />}</button></div>

          <div className="music-player-playlist" role="list" aria-label="Daftar lagu">
            <p className="music-player-playlist-label">Pilih lagu</p>
            {playlist.map((song, songIndex) => (
              <button key={song.src} type="button" onClick={() => selectTrack(songIndex)} className={`music-playlist-item ${songIndex === index ? 'is-active' : ''}`} role="listitem">
                <span className="music-playlist-number">{String(songIndex + 1).padStart(2, '0')}</span>
                <span className="music-playlist-name">{song.title}</span>
                {songIndex === index && <span className="music-playlist-now">Now playing</span>}
              </button>
            ))}
          </div>
        </div>
      </>}
    </div>
  );
}
