import { createPortal } from 'react-dom';
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

const STORAGE_KEY = 'jrh-music-player-v4';
type Stored = { index?: number; volume?: number; muted?: boolean };
type State = 'idle' | 'playing' | 'paused' | 'loading' | 'error';

function readStored(): Stored { try { return typeof window === 'undefined' ? {} : JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') as Stored; } catch { return {}; } }
function clampVolume(value: unknown): number { return typeof value === 'number' && Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0.65; }
function clampIndex(value: unknown): number { return Number.isInteger(value) && Number(value) >= 0 && Number(value) < playlist.length ? Number(value) : 0; }

export default function MusicPlayer() {
  const stored = useRef(readStored());
  const audioRef = useRef<HTMLAudioElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const initializedRef = useRef(false);
  const [index, setIndex] = useState(() => clampIndex(stored.current.index));
  const [state, setState] = useState<State>('idle');
  const [volume, setVolume] = useState(() => clampVolume(stored.current.volume));
  const [muted, setMuted] = useState(() => Boolean(stored.current.muted));
  const [open, setOpen] = useState(false);

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ index, volume, muted })); } catch {} }, [index, volume, muted]);
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;
    audio.preload = 'metadata'; audio.src = playlist[index].src; audio.volume = muted ? 0 : volume; audio.load();
  }, [index, muted, volume]);
  useEffect(() => { const audio = audioRef.current; if (audio) audio.volume = muted ? 0 : volume; }, [muted, volume]);

  useEffect(() => {
    const mediaSession = typeof navigator !== 'undefined' ? navigator.mediaSession : undefined;
    if (!mediaSession || typeof MediaMetadata === 'undefined') return;
    mediaSession.metadata = new MediaMetadata({ title: playlist[index].title, artist: 'JRH' });
    const safe = (action: MediaSessionAction, handler: () => void) => { try { mediaSession.setActionHandler(action, handler); } catch {} };
    safe('play', play); safe('pause', pause); safe('nexttrack', () => changeTrack(1)); safe('previoustrack', () => changeTrack(-1));
    return () => { (['play','pause','nexttrack','previoustrack'] as MediaSessionAction[]).forEach((action) => { try { mediaSession.setActionHandler(action, null); } catch {} }); };
  }, [index]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { event.preventDefault(); closePanel(); } };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      const panel = document.getElementById('music-player-panel');
      const trigger = triggerRef.current?.parentElement;
      if (panel && !panel.contains(target) && trigger && !trigger.contains(target)) closePanel();
    };
    document.addEventListener('keydown', onKey); document.addEventListener('pointerdown', onPointerDown);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointerDown); };
  }, [open]);

  function setSource(next: number) {
    const audio = audioRef.current; if (!audio) return false;
    audio.pause(); audio.src = playlist[next].src; audio.preload = 'metadata'; audio.currentTime = 0; audio.volume = muted ? 0 : volume; audio.load(); return true;
  }
  function startPlayback(next?: number) {
    const target = typeof next === 'number' ? next : index; const audio = audioRef.current; if (!audio) return;
    setState('loading'); audio.volume = muted ? 0 : volume;
    if (!audio.src || !audio.src.endsWith(playlist[target].src)) setSource(target);
    void audio.play().then(() => setState('playing')).catch(() => setState('error'));
  }
  function play() { startPlayback(); }
  function pause() { const audio = audioRef.current; if (!audio) return; audio.pause(); setState('paused'); }
  function togglePlayback() { if (state === 'playing') pause(); else startPlayback(); }
  function changeTrack(step: number) { const next = (index + step + playlist.length) % playlist.length; setIndex(next); setOpen(false); if (setSource(next)) startPlayback(next); }
  function selectTrack(next: number) { setIndex(next); setOpen(false); if (setSource(next)) startPlayback(next); }
  function handleEnded() { const next = (index + 1) % playlist.length; setIndex(next); if (setSource(next)) startPlayback(next); }
  function closePanel() { setOpen(false); window.setTimeout(() => triggerRef.current?.focus({ preventScroll: true }), 0); }

  const panel = open ? (
    <div id="music-player-panel" className="music-player-panel" role="dialog" aria-modal="false" aria-label="Pilih musik">
      <div className="music-player-panel-head"><div><span className="music-panel-label">Music</span><strong>{playlist[index].title}</strong></div><button type="button" onClick={closePanel} className="music-player-close" aria-label="Tutup"><X size={15} /></button></div>
      <div className="music-player-playlist" role="list">
        {playlist.map((song, songIndex) => <button key={song.title} type="button" className={`music-player-song${songIndex === index ? ' is-current' : ''}`} onClick={() => selectTrack(songIndex)} role="listitem" aria-current={songIndex === index ? 'true' : undefined}><span className="music-song-index">{String(songIndex + 1).padStart(2, '0')}</span><span>{song.title}</span>{songIndex === index && <span className="music-song-state" aria-hidden="true">●</span>}</button>)}
      </div>
      <div className="music-player-mini-volume"><label htmlFor="music-volume">Volume</label><input id="music-volume" type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => { setMuted(false); setVolume(Number(event.target.value)); }} /></div>
      {state === 'error' && <div className="music-player-error-inline" role="status">Musik gagal dimuat. Tekan play untuk mencoba lagi.</div>}
    </div>
  ) : null;

  return <div className="music-player" aria-label="Pemutar musik">
    <audio ref={audioRef} preload="metadata" playsInline onPlay={() => setState('playing')} onPause={() => { const audio = audioRef.current; if (audio && !audio.ended) setState('paused'); }} onEnded={handleEnded} onError={() => setState('error')} />
    <div className="music-player-pill">
      <button ref={triggerRef} type="button" className="music-player-button" onClick={togglePlayback} aria-label={state === 'playing' ? 'Jeda musik' : 'Putar musik'} aria-busy={state === 'loading'}>{state === 'playing' ? <Pause size={14} /> : <Play size={14} />}</button>
      <button type="button" className="music-player-track-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="music-player-panel"><Headphones size={13} aria-hidden="true" /><span className="music-player-title">{playlist[index].title}</span><ChevronDown size={13} aria-hidden="true" /></button>
      <button type="button" className="music-player-next" onClick={() => changeTrack(1)} aria-label="Lagu berikutnya"><span aria-hidden="true">›</span></button>
    </div>
    {typeof document !== 'undefined' && createPortal(panel, document.body)}
  </div>;
}
