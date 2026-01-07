'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CHARS = '0123456789ABCDEF'
const BINARY = '01'

interface Particle {
  x: number
  y: number
  char: string
  opacity: number
  life: number
  velocity: { x: number; y: number }
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState('')
  
  // Motion values for smooth cursor movement
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  // Solver Effect State
  const solverIntervalRef = useRef<NodeJS.Timeout | number | null>(null)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const clickable = target.closest('a, button, [role="button"]')
      
      if (clickable) {
        setIsHovering(true)
        startSolverEffect('VIEW')
      } else {
        setIsHovering(false)
        stopSolverEffect()
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  // Solver Effect Logic
  const startSolverEffect = (targetWord: string) => {
    if (solverIntervalRef.current) clearInterval(solverIntervalRef.current)
    
    let iteration = 0
    solverIntervalRef.current = setInterval(() => {
      setHoverText(
        targetWord
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return targetWord[index]
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iteration >= targetWord.length) {
        if (solverIntervalRef.current) clearInterval(solverIntervalRef.current)
      }

      iteration += 1 / 3
    }, 30)
  }

  const stopSolverEffect = () => {
    if (solverIntervalRef.current) clearInterval(solverIntervalRef.current)
    setHoverText('')
  }

  // Canvas Particle System
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const particles: Particle[] = []
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()

    const createParticle = (x: number, y: number) => {
      if (isHovering) return // Stop creating particles when hovering
      
      const isBinary = Math.random() > 0.5
      particles.push({
        x,
        y,
        char: isBinary 
          ? BINARY[Math.floor(Math.random() * BINARY.length)]
          : CHARS[Math.floor(Math.random() * CHARS.length)],
        opacity: 1,
        life: 1.0,
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        }
      })
    }

    // Track mouse position for particle generation
    let lastX = 0
    let lastY = 0
    
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Generate particles based on movement
      const currentX = mouseX.get()
      const currentY = mouseY.get()
      
      const dist = Math.hypot(currentX - lastX, currentY - lastY)
      if (dist > 2) {
        createParticle(currentX, currentY)
        lastX = currentX
        lastY = currentY
      }

      // Update and draw particles
      particles.forEach((p, index) => {
        p.life -= 0.02
        p.x += p.velocity.x
        p.y += p.velocity.y
        p.opacity = p.life

        if (p.life <= 0) {
          particles.splice(index, 1)
          return
        }

        ctx.font = '10px "JetBrains Mono", monospace'
        ctx.fillStyle = `rgba(0, 255, 65, ${p.opacity})`
        ctx.fillText(p.char, p.x, p.y)
      })

      animationFrameId = requestAnimationFrame(loop)
    }

    loop()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isHovering, mouseX, mouseY])

  return (
    <>
      {/* Canvas for Trail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9998] mix-blend-difference"
      />

      {/* Main Cursor Head */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%'
        }}
      >
        <motion.div
          className="bg-[#00FF41]"
          animate={{
            width: isHovering ? 60 : 12,
            height: isHovering ? 24 : 12,
            borderRadius: isHovering ? 4 : 0,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isHovering && (
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-black font-mono">
              {hoverText}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}
