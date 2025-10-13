'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

interface Stat {
    value: number
    label: string
    suffix: string
    icon: string
    color: string
    gradient: string
}

const stats: Stat[] = [
    {
        value: 100000,
        label: 'Lines of Code',
        suffix: '+',
        icon: '💻',
        color: 'from-purple-400 to-pink-400',
        gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
        value: 70,
        label: 'Pull Requests Merged',
        suffix: '+',
        icon: '🚀',
        color: 'from-cyan-400 to-blue-400',
        gradient: 'from-cyan-500/20 to-blue-500/20'
    },
    {
        value: 15,
        label: 'Projects Completed',
        suffix: '+',
        icon: '⚡',
        color: 'from-orange-400 to-red-400',
        gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
        value: 5,
        label: 'Years Experience',
        suffix: '+',
        icon: '🏆',
        color: 'from-emerald-400 to-teal-400',
        gradient: 'from-emerald-500/20 to-teal-500/20'
    }
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.3 }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [])

    useEffect(() => {
        if (!isVisible) return

        const duration = 2000 // 2 seconds
        const steps = 60
        const increment = value / steps
        let current = 0

        const timer = setInterval(() => {
            current += increment
            if (current >= value) {
                setCount(value)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)

        return () => clearInterval(timer)
    }, [isVisible, value])

    const formatNumber = (num: number) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M'
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K'
        }
        return num.toString()
    }

    return (
        <div ref={ref} className="text-5xl sm:text-6xl font-bold">
            {formatNumber(count)}{suffix}
        </div>
    )
}

export default function StatsCounter() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
                <Reveal key={index} direction="up" delayMs={index * 100}>
                    <div className={`group relative bg-gradient-to-br ${stat.gradient} p-8 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 overflow-hidden`}>
                        {/* Background glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                        {/* Floating icon */}
                        <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                            {stat.icon}
                        </div>

                        {/* Counter */}
                        <div className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </div>

                        {/* Label */}
                        <div className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                            {stat.label}
                        </div>

                        {/* Decorative corner */}
                        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-full`}></div>
                    </div>
                </Reveal>
            ))}
        </div>
    )
}

