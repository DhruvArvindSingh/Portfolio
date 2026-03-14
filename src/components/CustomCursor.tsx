'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const CHARS = '0123456789ABCDEF'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState('')
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  const solverIntervalRef = useRef<NodeJS.Timeout | number | null>(null)

  // Detect touch devices - don't render custom cursor
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouch)
  }, [])

  const startSolverEffect = useCallback((targetWord: string) => {
    if (solverIntervalRef.current) clearInterval(solverIntervalRef.current)

    let iteration = 0
    solverIntervalRef.current = setInterval(() => {
      setHoverText(
        targetWord
          .split('')
          .map((letter, index) => {
            if (index < iteration) return targetWord[index]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iteration >= targetWord.length) {
        if (solverIntervalRef.current) clearInterval(solverIntervalRef.current)
      }
      iteration += 1 / 3
    }, 30)
  }, [])

  const stopSolverEffect = useCallback(() => {
    if (solverIntervalRef.current) clearInterval(solverIntervalRef.current)
    setHoverText('')
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

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

    window.addEventListener('mousemove', moveCursor, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY, isTouchDevice, startSolverEffect, stopSolverEffect])

  // Don't render on touch devices
  if (isTouchDevice) return null

  return (
    <motion.div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
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
  )
}
