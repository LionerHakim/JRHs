import { useEffect, useId, useRef, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Music, X } from 'lucide-react';

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
  const panelId = useId();
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
    } else if (state !== 'loading') audio.pause();
  }, [index]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : volume;
  }, [muted, volume]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setOpen(false); triggerRef.current?.focus(); }
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('pointerdown', onPointer); document.removeEventListener('keydown', onKey); };
  }, [open]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (state === 'playing') { audio.pause(); setState('paused'); return; }
    setState('loading');
    audio.play().then(() => setState('playing')).catch(() => setState('error'));
  };
  const changeTrack = (delta: number) => {
    setIndex((current) => (current + delta + playlist.length) % playlist.length);
    setProgress(0);
    setState('playing');
  };
  const selectTrack = (songIndex: number) => {
    setIndex(songIndex); setProgress(0); setState('playing'); setOpen(false); triggerRef.current?.focus();
  };
  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio?.duration) return;
    audio.currentTime = (value / 100) * audio.duration;
    setProgress(value);
  };

  return (
    <div className="relative">
      <audio ref={audioRef} preload="metadata" src={playlist[index].src} onPlay={() => setState('playing')} onPause={() => setState((current) => current === 'error' ? current : 'paused')} onEnded={() => changeTrack(1)} onError={() => setState('error')} onTimeUpdate={(event) => { const audio = event.currentTarget; setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0); }} />
      <div className="flex items-center gap-1 rounded-full border border-[#E5E5E5] bg-white px-1.5 py-1.5 shadow-[0_0_0_3px_rgba(247,247,247,.8)]">
        <button type="button" onClick={togglePlayback} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-black transition active:scale-[.97] hover:bg-[#F7F7F7] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]" aria-label={state === 'playing' ? 'Jeda musik' : state === 'loading' ? 'Memuat musik' : state === 'error' ? 'Coba putar lagi' : 'Putar musik'} disabled={state === 'loading'}>{state === 'playing' ? <Pause size={15} /> : <Play size={15} />}</button>
        <button ref={triggerRef} type="button" onClick={() => setOpen((value) => !value)} className="hidden min-h-11 max-w-36 items-center gap-2 px-1 text-left sm:flex" aria-label="Buka pemutar musik" aria-expanded={open} aria-controls={panelId}><Music size={13} className={state === 'error' ? 'shrink-0 text-[#636363]' : 'shrink-0 text-[#007AFF]'} /><span className="truncate text-xs font-medium text-[#3E3E3E]">{state === 'error' ? 'Audio tidak tersedia' : playlist[index].title}</span></button>
        <button type="button" onClick={() => changeTrack(-1)} className="hidden min-h-11 min-w-10 items-center justify-center rounded-full text-[#636363] transition active:scale-[.97] hover:text-black md:flex" aria-label="Lagu sebelumnya"><SkipBack size={14} /></button>
        <button type="button" onClick={() => changeTrack(1)} className="inline-flex min-h-11 min-w-10 items-center justify-center rounded-full text-[#636363] transition active:scale-[.97] hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]" aria-label="Lagu berikutnya"><SkipForward size={14} /></button>
        <button type="button" onClick={() => setMuted((value) => !value)} className="hidden min-h-11 min-w-10 items-center justify-center rounded-full text-[#636363] transition active:scale-[.97] hover:text-black lg:flex" aria-label={muted ? 'Nyalakan suara' : 'Matikan suara'}>{muted ? <VolumeX size={14} /> : <Volume2 size={14} />}</button>
      </div>
      <div className="absolute bottom-0 left-14 right-14 h-px overflow-hidden rounded-full bg-[#E5E5E5] sm:left-16 sm:right-28" aria-hidden="true"><div className="h-full bg-[#007AFF]" style={{ width: `${progress}%` }} /></div>
      {open && (
        <div ref={panelRef} id={panelId} className="absolute right-0 top-[calc(100%+10px)] z-[70] w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-[#E5E5E5] bg-white p-3 shadow-[0_18px_50px_rgba(0,0,0,.12)]" role="dialog" aria-label="Pemutar musik VVIP+">
          <div className="flex items-center justify-between gap-3 border-b border-[#E5E5E5] px-2 pb-3"><div className="min-w-0"><p className="text-[11px] font-semibold uppercase tracking-[.14em] text-[#636363]">Sedang diputar</p><p className="mt-1 truncate font-serif text-xl leading-none text-black">{playlist[index].title}</p></div><button type="button" onClick={() => { setOpen(false); triggerRef.current?.focus(); }} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-[#F7F7F7] text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]" aria-label="Tutup pemutar musik"><X size={16} /></button></div>
          <div className="mt-3 rounded-xl border border-[#E5E5E5] bg-[#F7F7F7] p-3">
            <div className="flex items-center gap-3"><div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-[#007AFF] shadow-[0_0_0_1px_#E5E5E5]"><Music size={20} /></div><div className="min-w-0"><p className="truncate text-sm font-medium text-black">JRHs Music</p><p className="truncate text-xs text-[#636363]">{playlist[index].title}</p></div></div>
            <label className="mt-4 block"><span className="sr-only">Posisi lagu</span><input type="range" min="0" max="100" step="0.1" value={progress} onChange={(event) => seek(Number(event.target.value))} className="h-1.5 w-full accent-[#007AFF]" aria-label="Posisi lagu" /></label>
            <div className="mt-3 flex items-center justify-between"><button type="button" onClick={() => changeTrack(-1)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[#3E3E3E] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]" aria-label="Lagu sebelumnya"><SkipBack size={16} /></button><button type="button" onClick={togglePlayback} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-black text-white active:scale-[.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]" aria-label={state === 'playing' ? 'Jeda musik' : 'Putar musik'}>{state === 'playing' ? <Pause size={16} /> : <Play size={16} />}</button><button type="button" onClick={() => changeTrack(1)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-[#3E3E3E] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]" aria-label="Lagu berikutnya"><SkipForward size={16} /></button></div>
            <div className="mt-3 flex items-center gap-2 border-t border-[#E5E5E5] pt-3"><button type="button" onClick={() => setMuted((value) => !value)} className="inline-flex min-h-11 min-w-11 items-center justify-center text-[#3E3E3E] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#007AFF]" aria-label={muted ? 'Nyalakan suara' : 'Matikan suara'}>{muted ? <VolumeX size={15} /> : <Volume2 size={15} />}</button><label className="flex flex-1 items-center"><span className="sr-only">Volume</span><input type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume} onChange={(event) => { setVolume(Number(event.target.value)); setMuted(false); }} className="h-1.5 w-full accent-[#007AFF]" aria-label="Volume" /></label></div>
          </div>
          <div className="mt-3"><p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[.14em] text-[#636363]">Daftar putar</p>{playlist.map((song, songIndex) => <button type="button" key={song.src} onClick={() => selectTrack(songIndex)} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm transition active:scale-[.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#007AFF] ${songIndex === index ? 'bg-[#F7F7F7] text-black' : 'text-[#636363] hover:bg-[#F7F7F7] hover:text-black'}`}><span className="w-4 text-xs text-[#636363]">{songIndex + 1}</span><Music size={13} className={songIndex === index ? 'text-[#007AFF]' : 'text-[#636363]'} /><span className="truncate">{song.title}</span></button>)}</div>
        </div>
      )}
    </div>
  );
}
