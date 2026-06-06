"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AudioPlayerProps {
  isPlaying: boolean
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.volume = 0
      audio.play().catch(() => {})
      
      let vol = 0
      const fadeIn = setInterval(() => {
        vol += 0.05
        if (vol >= 0.5) {
          audio.volume = 0.5
          clearInterval(fadeIn)
        } else {
          audio.volume = vol
        }
      }, 100)
    } else {
      let vol = audio.volume
      const fadeOut = setInterval(() => {
        vol -= 0.05
        if (vol <= 0) {
          audio.volume = 0
          audio.pause()
          clearInterval(fadeOut)
        } else {
          audio.volume = vol
        }
      }, 100)
    }
  }, [isPlaying])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <audio
        ref={audioRef}
        src={"public/musics/Taylor Swift - Lover (Instrumental).mp3"}
        loop
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-full glass hover:bg-white/50 border-white/40 shadow-sm"
        onClick={() => {
          if (audioRef.current) {
            audioRef.current.muted = !muted
            setMuted(!muted)
          }
        }}
      >
        {muted ? <VolumeX className="text-primary h-5 w-5" /> : <Volume2 className="text-primary h-5 w-5" />}
      </Button>
    </div>
  )
}
