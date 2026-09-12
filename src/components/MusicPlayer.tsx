import { useEffect, useState } from 'react';
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';

const playlist = [
  { title: 'Budi Doremi', src: '/data/musik/Budi-Doremi.mp3' },
  { title: 'Rahasia Hati', src: '/data/musik/Rahasia-Hati.mp3' },
  { title: 'Tak Ada Ujungnya', src: '/data/musik/Tak-AdaUjungnya.mp3' },
  { title: 'Tourner Dans Le Vide', src: '/data/musik/Tourner-DansLeVide.mp3' },
  { title: 'Who Knows', src: '/data/musik/Who-Knows.mp3' },
];

export default function MusicPlayer() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const audio = document.querySelector<HTMLAudioElement>('#jrhs-audio');
    if (!audio) return;
    audio.volume = 0.65;
    if (playing) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [index, playing]);

  const changeTrack = (next: number) => {
    setIndex((current) => (current + next + playlist.length) % playlist.length);
    setProgress(0);
    setPlaying(true);
  };

  const togglePlay = () => setPlaying((value) => !value);

  return (
    <div className="relative">
      <audio id="jrhs-audio" src={playlist[index].src} onEnded={() => changeTrack(1)} onTimeUpdate={(event) => {
        const audio = event.currentTarget;
        setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
      }} />
      <div className="flex items-center gap-1.5 rounded-full border border-[#1D1D1D] bg-[#101010] px-1.5 py-1.5 shadow-[0_8px_28px_rgba(0,0,0,0.25)]">
        <button type="button" onClick={togglePlay} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-white transition hover:bg-white/5" aria-label={playing ? 'Pause music' : 'Play music'}>
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
        <button type="button" onClick={() => setOpen((value) => !value)} className="hidden min-h-11 max-w-28 items-center gap-2 px-1 text-left sm:flex" aria-label="Open music playlist" aria-expanded={open}>
          <Music size={13} className="shrink-0 text-[#007AFF]" />
          <span className="truncate text-[11px] font-medium text-[#A0A0A0]">{playlist[index].title}</span>
        </button>
        <button type="button" onClick={() => changeTrack(-1)} className="hidden min-h-11 min-w-10 items-center justify-center text-[#666] transition hover:text-white md:flex" aria-label="Previous track"><SkipBack size={14} /></button>
        <button type="button" onClick={() => changeTrack(1)} className="inline-flex min-h-11 min-w-10 items-center justify-center text-[#666] transition hover:text-white" aria-label="Next track"><SkipForward size={14} /></button>
        <button type="button" onClick={() => { setMuted((value) => !value); const audio = document.querySelector<HTMLAudioElement>('#jrhs-audio'); if (audio) audio.muted = !audio.muted; }} className="hidden min-h-11 min-w-10 items-center justify-center text-[#666] transition hover:text-white lg:flex" aria-label={muted ? 'Unmute music' : 'Mute music'}>{muted ? <VolumeX size={14} /> : <Volume2 size={14} />}</button>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-14 right-14 h-px overflow-hidden rounded-full bg-white/5 sm:left-16 sm:right-28"><div className="h-full bg-[#007AFF] transition-[width] duration-100" style={{ width: `${progress}%` }} /></div>
      {open && <div className="absolute right-0 top-[calc(100%+10px)] z-[70] w-60 rounded-2xl border border-[#1D1D1D] bg-[#101010] p-2 shadow-2xl" role="menu">{playlist.map((song, songIndex) => <button type="button" key={song.src} onClick={() => { setIndex(songIndex); setPlaying(true); setOpen(false); }} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-xs transition ${songIndex === index ? 'bg-white/5 text-white' : 'text-[#A0A0A0] hover:bg-white/[0.03] hover:text-white'}`} role="menuitem"><Music size={13} className={songIndex === index ? 'text-[#007AFF]' : 'text-[#666]'} /><span className="truncate">{song.title}</span></button>)}</div>}
    </div>
  );
}
