import { useEffect, useRef, useState } from 'react'
import { musicTracks } from '../config/ui'

type UseMusicPlayerOptions = {
  musicOpen: boolean
  repeat?: boolean
  shuffle?: boolean
}

export function useMusicPlayer({ musicOpen, repeat = false, shuffle = false }: UseMusicPlayerOptions) {
    const musicAudioRef = useRef<HTMLAudioElement>(null)
    const musicIndexRef = useRef(0)
    const musicRequestRef = useRef(0)
    const [musicIndex, setMusicIndex] = useState(0)
    const [musicPlaying, setMusicPlaying] = useState(false)
    const [musicProgress, setMusicProgress] = useState(0)
    const lastProgressUpdateRef = useRef(0)
    const [musicDuration, setMusicDuration] = useState(0)
    const [musicStatus, setMusicStatus] = useState('READY')
    const repeatRef = useRef(repeat)
    const shuffleRef = useRef(shuffle)

    const loadAndPlayMusic = (index: number) => {
      const audio = musicAudioRef.current
      if (!audio) return
  
      const safeIndex = (index + musicTracks.length) % musicTracks.length
      const nextTrack = musicTracks[safeIndex]
      const requestId = ++musicRequestRef.current
      musicIndexRef.current = safeIndex
      setMusicIndex(safeIndex)
      setMusicProgress(0)
      lastProgressUpdateRef.current = 0
      setMusicDuration(0)
      setMusicStatus('LOADING')
      setMusicPlaying(false)
  
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      audio.src = nextTrack.src
      audio.load()
  
      void audio.play().catch(() => {
        if (musicRequestRef.current !== requestId) return
        setMusicPlaying(false)
        setMusicStatus('READY')
      })
  
    }
  
    const toggleMusicPlayback = () => {
      const audio = musicAudioRef.current
      if (!audio) return
  
      if (musicPlaying) {
        audio.pause()
        return
      }
  
      if (!audio.src || audio.currentSrc === '') {
        loadAndPlayMusic(musicIndexRef.current)
        return
      }
  
      void audio.play().catch(() => {
        setMusicPlaying(false)
        setMusicStatus('READY')
      })
    }
  
    const changeMusicTrack = (direction: number) => {
      const nextIndex = (musicIndexRef.current + direction + musicTracks.length) % musicTracks.length
      loadAndPlayMusic(nextIndex)
    }
  
    useEffect(() => {
      repeatRef.current = repeat
      shuffleRef.current = shuffle
    }, [repeat, shuffle])

    useEffect(() => {
      const audio = musicAudioRef.current
      if (!audio) return
  
      // Load only lightweight metadata when the panel opens. Full audio
      // buffering starts when the user actually presses play or changes track.
      // Closing the panel must NOT stop playback: the audio element lives independently of the UI panel.
      if (musicOpen) {
        audio.preload = 'metadata'
        if (!audio.src) {
          audio.src = musicTracks[musicIndexRef.current].src
          audio.load()
        }
      } else if (!audio.src) {
        audio.preload = 'none'
      }
    }, [musicOpen])
  
    useEffect(() => {
      const audio = musicAudioRef.current
      if (!audio) return
  
      const handleTimeUpdate = () => {
        const currentTime = audio.currentTime || 0
      const now = performance.now()
      if (now - lastProgressUpdateRef.current < 500 && currentTime > 0) return
      lastProgressUpdateRef.current = now
      setMusicProgress(currentTime)
      }
  
      const handleLoadedMetadata = () => {
        setMusicDuration(Number.isFinite(audio.duration) ? audio.duration : 0)
      }
  
      const handlePlay = () => {
        setMusicPlaying(true)
        setMusicStatus('PLAYING')
      }
  
      const handlePause = () => {
        setMusicPlaying(false)
        setMusicStatus(audio.ended ? 'ENDED' : 'PAUSED')
      }
  
      const handleEnded = () => {
        if (repeatRef.current) {
          audio.currentTime = 0
          void audio.play().catch(() => {
            setMusicPlaying(false)
            setMusicStatus('READY')
          })
          return
        }

        if (shuffleRef.current && musicTracks.length > 1) {
          let nextIndex = musicIndexRef.current
          while (nextIndex === musicIndexRef.current) {
            nextIndex = Math.floor(Math.random() * musicTracks.length)
          }
          loadAndPlayMusic(nextIndex)
          return
        }

        const nextIndex = (musicIndexRef.current + 1) % musicTracks.length
        loadAndPlayMusic(nextIndex)
      }
  
      const handleError = () => {
        setMusicPlaying(false)
        setMusicStatus('ERROR')
      }
  
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('error', handleError)
  
      return () => {
        musicRequestRef.current += 1
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('error', handleError)
        audio.pause()
        audio.removeAttribute('src')
        audio.load()
      }
    }, [])
  return {
    musicAudioRef,
    musicIndex,
    musicPlaying,
    musicProgress,
    musicDuration,
    musicStatus,
    musicIndexRef,
    loadAndPlayMusic,
    toggleMusicPlayback,
    changeMusicTrack,
  }
}
