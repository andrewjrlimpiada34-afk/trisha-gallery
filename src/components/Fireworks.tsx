"use client"

import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  color: string
}

export const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#EF94A7', '#D584C8', '#FFFFFF', '#FFD700']

    const createFirework = () => {
      const x = Math.random() * canvas.width
      const y = canvas.height
      const targetY = Math.random() * (canvas.height / 2)
      const color = colors[Math.floor(Math.random() * colors.length)]

      // Explosion particles
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 4 + 2
        particles.current.push({
          x,
          y: targetY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
        })
      }
    }

    let interval = setInterval(createFirework, 800)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.current.forEach((p, index) => {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.05 // gravity
        p.alpha -= 0.01

        if (p.alpha <= 0) {
          particles.current.splice(index, 1)
        } else {
          ctx.globalAlpha = p.alpha
          ctx.fillStyle = p.color
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 bg-black/20"
    />
  )
}
