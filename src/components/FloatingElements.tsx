"use client"

import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'

interface Element {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  type: 'heart' | 'petal'
}

export const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([])

  useEffect(() => {
    const newElements: Element[] = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      type: Math.random() > 0.5 ? 'heart' : 'petal',
    }))
    setElements(newElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {elements.map((el) => (
        <div
          key={el.id}
          className="absolute"
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animation: `float-down ${el.duration}s linear infinite`,
            animationDelay: `${el.delay}s`,
            opacity: 0.6,
          }}
        >
          {el.type === 'heart' ? (
            <Heart size={el.size} className="text-primary fill-primary/20" />
          ) : (
            <div
              style={{
                width: el.size,
                height: el.size * 0.7,
                backgroundColor: '#EF94A7',
                borderRadius: '50% 0 50% 0',
                transform: 'rotate(45deg)',
              }}
            />
          )}
        </div>
      ))}
      <style jsx>{`
        @keyframes float-down {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.6; }
          90% { opacity: 0.6; }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
