"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PlaceHolderImages } from '@/lib/placeholder-images'
import { refineRomanticCaption } from '@/ai/flows/refine-romantic-caption'
import { cn } from '@/lib/utils'

interface MemorySlideshowProps {
  onClose: () => void
}

export const MemorySlideshow: React.FC<MemorySlideshowProps> = ({ onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRefining, setIsRefining] = useState(false)
  const [captions, setCaptions] = useState<Record<string, string>>({
    "1": "The day everything started.",
    "2": "I still smile whenever I remember this.",
    "3": "You probably don't know how much this meant to me.",
    "4": "Every moment with you is a gift."
  })

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PlaceHolderImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PlaceHolderImages.length) % PlaceHolderImages.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleRefine = async () => {
    const currentImg = PlaceHolderImages[currentIndex]
    setIsRefining(true)
    try {
      const result = await refineRomanticCaption({
        caption: captions[currentImg.id],
        context: currentImg.description
      })
      setCaptions(prev => ({
        ...prev,
        [currentImg.id]: result.refinedCaption
      }))
    } catch (error) {
      console.error(error)
    } finally {
      setIsRefining(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" onClick={onClose} />
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 z-50 rounded-full glass hover:bg-white/50 text-white border-white/20"
        onClick={onClose}
      >
        <X className="h-6 w-6" />
      </Button>

      <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center gap-8">
        <div className="relative w-full flex items-center justify-center perspective-1000">
          {PlaceHolderImages.map((image, index) => {
            const isCurrent = index === currentIndex
            const isPrev = index === (currentIndex - 1 + PlaceHolderImages.length) % PlaceHolderImages.length
            const isNext = index === (currentIndex + 1) % PlaceHolderImages.length

            if (!isCurrent && !isPrev && !isNext) return null

            return (
              <div
                key={image.id}
                className={cn(
                  "absolute transition-all duration-700 ease-in-out transform shadow-2xl bg-white p-4 pb-12 sm:p-6 sm:pb-20",
                  isCurrent ? "z-30 scale-100 opacity-100 translate-x-0" : 
                  isPrev ? "z-10 scale-90 opacity-40 -translate-x-1/2 -rotate-6" :
                  "z-10 scale-90 opacity-40 translate-x-1/2 rotate-6"
                )}
                style={{
                  width: 'min(90vw, 450px)',
                  aspectRatio: '3/4',
                }}
              >
                <div className="relative w-full h-full overflow-hidden bg-muted">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    className="object-cover transition-transform duration-[4000ms] ease-out"
                    style={{ transform: isCurrent ? 'scale(1.1)' : 'scale(1)' }}
                    data-ai-hint={image.imageHint}
                  />
                </div>
                {isCurrent && (
                  <div className="absolute bottom-4 left-0 right-0 px-4 text-center">
                    <h3 className="font-headline text-xl sm:text-2xl text-foreground/80 mb-1">
                      {image.description}
                    </h3>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="z-40 text-center max-w-xl px-4 animate-in slide-in-from-bottom-4 duration-500 delay-300">
          <div className="glass p-6 rounded-2xl border-white/30 text-foreground/90 shadow-xl relative group">
            <p className="font-body text-lg italic leading-relaxed min-h-[3rem]">
              {captions[PlaceHolderImages[currentIndex].id]}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="absolute -top-3 -right-3 rounded-full bg-secondary text-white hover:bg-secondary/80 h-8 w-8 p-0"
              onClick={handleRefine}
              disabled={isRefining}
            >
              <Sparkles className={cn("h-4 w-4", isRefining && "animate-spin")} />
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={prevSlide}>
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <div className="flex gap-2">
              {PlaceHolderImages.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    i === currentIndex ? "bg-primary w-6" : "bg-white/30"
                  )}
                />
              ))}
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10" onClick={nextSlide}>
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
