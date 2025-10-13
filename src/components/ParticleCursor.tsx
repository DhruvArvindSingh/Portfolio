'use client'

import { useEffect, useState } from 'react'

interface Particle {
    x: number
    y: number
    size: number
    speedX: number
    speedY: number
    life: number
    color: string
}

export default function ParticleCursor() {
    const [particles, setParticles] = useState<Particle[]>([])
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setCursorPos({ x: e.clientX, y: e.clientY })

            // Create new particles
            const colors = ['#a855f7', '#ec4899', '#06b6d4', '#10b981', '#f59e0b']
            const newParticles: Particle[] = Array.from({ length: 3 }, () => ({
                x: e.clientX,
                y: e.clientY,
                size: Math.random() * 5 + 2,
                speedX: (Math.random() - 0.5) * 4,
                speedY: (Math.random() - 0.5) * 4,
                life: 1,
                color: colors[Math.floor(Math.random() * colors.length)]
            }))

            setParticles(prev => [...prev, ...newParticles].slice(-50)) // Keep max 50 particles
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev =>
                prev
                    .map(p => ({
                        ...p,
                        x: p.x + p.speedX,
                        y: p.y + p.speedY,
                        life: p.life - 0.02,
                        size: p.size * 0.98
                    }))
                    .filter(p => p.life > 0)
            )
        }, 16) // ~60fps

        return () => clearInterval(interval)
    }, [])

    return (
        <>
            {/* Custom cursor */}
            <div
                className="fixed pointer-events-none z-[100] mix-blend-difference"
                style={{
                    left: cursorPos.x,
                    top: cursorPos.y,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                <div className="w-6 h-6 border-2 border-white rounded-full animate-ping opacity-75"></div>
                <div className="absolute inset-0 w-6 h-6 border-2 border-white rounded-full"></div>
            </div>

            {/* Particles */}
            {particles.map((particle, i) => (
                <div
                    key={i}
                    className="fixed pointer-events-none z-50 rounded-full"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        width: particle.size,
                        height: particle.size,
                        backgroundColor: particle.color,
                        opacity: particle.life,
                        transform: 'translate(-50%, -50%)',
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
                    }}
                />
            ))}
        </>
    )
}

