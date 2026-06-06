"use client"

import React, { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { FloatingElements } from '@/components/FloatingElements'
import { Fireworks } from '@/components/Fireworks'
import { MemorySlideshow } from '@/components/MemorySlideshow'

import { AudioPlayer } from '@/components/AudioPlayer'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [isExperienceActive, setIsExperienceActive] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [showSlideshow, setShowSlideshow] = useState(false)

  const startExperience = () => {
    setIsExperienceActive(true)
    setShowFireworks(true)
    
    // Delayed transitions for cinematic effect
    setTimeout(() => {
      setShowSlideshow(true)
    }, 2000)

    // Stop fireworks after a few bursts to keep focus on slideshow
    setTimeout(() => {
      setShowFireworks(false)
    }, 8000)
  }

  const closeExperience = () => {
    setIsExperienceActive(false)
    setShowSlideshow(false)
    setShowFireworks(false)
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#FCF6F7] to-[#fce4ec]">
      <FloatingElements />
      <AudioPlayer isPlaying={isExperienceActive} />

      {showFireworks && <Fireworks />}

      {!showSlideshow && (
        <div className="relative z-20 flex flex-col items-center text-center px-6 animate-in fade-in zoom-in-95 duration-1000">
          <h1 className="font-headline text-4xl sm:text-6xl text-primary/80 mb-4 drop-shadow-sm italic">
            For My Favorite Person
          </h1>
          <p className="font-body text-lg sm:text-xl text-muted-foreground mb-12">
            A little diary made just for you ♡
          </p>

          <div className="relative">
            <Button
              onClick={startExperience}
              className="group relative h-24 w-24 sm:h-32 sm:w-32 rounded-full glass border-white/50 bg-white/40 hover:bg-white/60 shadow-lg hover:shadow-primary/20 transition-all duration-500 animate-float"
            >
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110 group-hover:scale-125 transition-transform duration-500" />
              <div className="absolute inset-0 rounded-full animate-pulse-glow" />
              <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-primary group-hover:scale-110 transition-transform" />
            </Button>
            <div className="mt-6 font-body text-sm tracking-widest text-primary uppercase animate-pulse">
              Tap to Celebrate ✨
            </div>
          </div>
        </div>
      )}

      {showSlideshow && (
        <MemorySlideshow onClose={closeExperience} />
      )}

      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 z-10 text-muted-foreground/40 font-body text-sm pointer-events-none">
        Made with Love ♡
      </footer>
    </main>
  )
}
