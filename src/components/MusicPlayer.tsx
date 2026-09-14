import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Headphones, Pause, Play, X } from 'lucide-react';

const base = import.meta.env.BASE_URL;
const playlist = [
  { title: 'Budi Doremi', src: `${base}data/musik/Budi-Doremi.mp3` },
  { title: 'Rahasia Hati', src: `${base}data/musik/Rahasia-Hati.mp3` },
  { title: 'Tak Ada Ujungnya', src: `${base}data/musik/Tak-AdaUjungnya.mp3` },
  { title: 'Tourner Dans Le Vide', src: `${base}data/musik/Tourner-DansLeVide.mp3` },
  { title: 'Who Knows', src: `${base}data/musik/Who-Knows.mp3` },
] as const;

const STORAGE_KEY = 'jrh-music-player-v3';

type Stored = { index?: number; volume?: number; muted?: boolean };
type State = 'idle' | 'playing' | 'paused' | 'loading' | 'error';

function readStored(): Stored {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Stored; } catch { return {}; }
}

export default function MusicPlayer() {
  const stored = useRef(readStored());
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(() => Number.isInteger(stored.current.index) && Number(stored.current.index) >= 0 && Number(stored.current.index) < playlist.length ? Number(stored.current.index) : 0);
  const [state, setState] = useState<State>('idle');
  const [volume, setVolume] = useState(() => typeof stored.current.volume === 'number' ? Math.min(1, Math.max(0, stored.current.volume)) : 0.65);
  const [muted, setMuted] = useState(() => Boolean(stored.current.muted));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ index, volume, muted })); } catch { /* ignore storage errors */ }
  }, [index, volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = playlist[index].src;
    audio.preload = 'metadata';
    audio.setAttribute('playsinline', '');
    audio.volume = muted ? 0 : volume;
    audio.load();
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [muted, volume]);

  useEffect(() => {
    const mediaSession = typeof navigator !== 'undefined' ? navigator.mediaSession : undefined;
    if (!mediaSession || typeof MediaMetadata === 'undefined') return;
    mediaSession.metadata = new MediaMetadata({ title: playlist[index].title, artist: 'JRH' });
    const safe = (action: MediaSessionAction, handler: () => void) => { try { mediaSession.setActionHandler(action, handler); } catch { /* unsupported */ } };
    safe('play', play);
    safe('pause', pause);
    safe('nexttrack', () => changeTrack(1));
    safe('previoustrack', () => changeTrack(-1));
    return () => ['play', 'pause', 'nexttrack', 'previoustrack'].forEach((action) => { try { mediaSession.setActionHandler(action as MediaSessionAction, null); } catch { /* ignore */ } });
  }, [index, state]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); closePanel(); }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!playerRef.current?.contains(target)) closePanel();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointerDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointerDown); };
  }, [open]);

  function play() {
    const audio = audioRef.current;
    if (!audio) return;
    setState('loading');
    void audio.play().then(() => setState('playing')).catch(() => setState('error'));
  }

  function pause() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setState('paused');
  }

  function togglePlayback() {
    if (state === 'playing') pause(); else if (state !== 'loading') play();
  }

  function changeTrack(step: number) {
    const next = (index + step + playlist.length) % playlist.length;
    const audio = audioRef.current;
    setIndex(next);
    if (!audio) return;
    audio.pause();
    audio.src = playlist[next].src;
    audio.currentTime = 0;
    audio.volume = muted ? 0 : volume;
    setOpen(false);
    void audio.play().then(() => setState('playing')).catch(() => setState('error'));
  }

  function selectTrack(next: number) {
    const audio = audioRef.current;
    setIndex(next);
    setOpen(false);
    if (!audio) return;
    audio.pause();
    audio.src = playlist[next].src;
    audio.currentTime = 0;
    audio.volume = muted ? 0 : volume;
    void audio.play().then(() => setState('playing')).catch(() => setState('error'));
  }

  function closePanel() {
    setOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }

  return (
    <div ref={playerRef} className="music-player" aria-label="Pemutar musik">
      <audio ref={audioRef} onPlay={() => setState('playing')} onPause={() => { if (state !== 'error') setState('paused'); }} onEnded={() => changeTrack(1)} onError={() => setState('error')} />
      <div className="music-player-pill">
        <button ref={triggerRef} type="button" className="music-player-button" onClick={togglePlayback} aria-label={state === 'playing' ? 'Jeda musik' : 'Putar musik'}>{state === 'playing' ? <Pause size={14} /> : <Play size={14} />}</button>
        <button type="button" className="music-player-track-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="music-player-panel">
          <Headphones size={13} aria-hidden="true" /><span className="music-player-title">{playlist[index].title}</span><ChevronDown size={13} aria-hidden="true" />
        </button>
        <button type="button" className="music-player-next" onClick={() => changeTrack(1)} aria-label="Lagu berikutnya"><span aria-hidden="true">›</span></button>
      </div>
      {open && (
        <div ref={undefined} id="music-player-panel" className="music-player-panel" role="dialog" aria-label="Pilih musik">
          <div className="music-player-panel-head"><div><span className="music-panel-label">Music</span><strong>{playlist[index].title}</strong></div><button type="button" onClick={closePanel} className="music-player-close" aria-label="Tutup"><X size={15} /></button></div>
          <div className="music-player-playlist" role="list">
            {playlist.map((song, songIndex) => (
              <button key={song.title} type="button" className={`music-player-song${songIndex === index ? ' is-current' : ''}`} onClick={() => selectTrack(songIndex)} role="listitem"><span className="music-song-index">{String(songIndex + 1).padStart(2, '0')}</span><span>{song.title}</span>{songIndex === index && <span className="music-song-state">●</span>}</button>
            ))}
          </div>
          <div className="music-player-mini-volume"><label htmlFor="music-volume">Volume</label><input id="music-volume" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => { setMuted(false); setVolume(Number(event.target.value)); }} /></div>
        </div>
      )}
    </div>
  );
}
