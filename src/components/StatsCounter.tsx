'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Stat {
    value: number
    label: string
    suffix: string
    icon: string
    color: string
}

const stats: Stat[] = [
    {
        value: 25000,
        label: 'Lines Contributed to OSS',
        suffix: '+',
        icon: '⌨',
        color: 'text-green-400',
    },
    {
        value: 70,
        label: 'Pull Requests',
        suffix: '+',
        icon: '⑂',
        color: 'text-purple-400',
    },
    {
        value: 15,
        label: 'Projects Deployed',
        suffix: '+',
        icon: '▶',
        color: 'text-cyan-400',
    },
    {
        value: 2,
        label: 'Homelab Nodes',
        suffix: '',
        icon: '⊞',
        color: 'text-yellow-400',
    },
    {
        value: 6,
        label: 'Services Running',
        suffix: '+',
        icon: '◉',
        color: 'text-orange-400',
    },
    {
        value: 5,
        label: 'Years Coding',
        suffix: '+',
        icon: '⏱',
        color: 'text-pink-400',
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

        const currentRef = ref.current
        if (currentRef) observer.observe(currentRef)

        return () => {
            if (currentRef) observer.unobserve(currentRef)
        }
    }, [])

    useEffect(() => {
        if (!isVisible) return

        const duration = 2000
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
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
        return num.toString()
    }

    return (
        <div ref={ref} className="text-4xl sm:text-5xl font-bold font-mono tabular-nums">
            {formatNumber(count)}{suffix}
        </div>
    )
}

export default function StatsCounter() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="group relative bg-black/60 border border-gray-800 hover:border-green-500/30 p-5 rounded-sm transition-all duration-300 text-center overflow-hidden"
                >
                    {/* Glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10">
                        {/* Icon */}
                        <div className={`text-2xl mb-3 ${stat.color} font-mono`}>
                            {stat.icon}
                        </div>

                        {/* Counter */}
                        <div className={`${stat.color} mb-2`}>
                            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                        </div>

                        {/* Label */}
                        <div className="text-gray-500 text-[10px] font-mono uppercase tracking-wider leading-tight">
                            {stat.label}
                        </div>
                    </div>

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-gray-700 group-hover:border-green-500/50 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-gray-700 group-hover:border-green-500/50 transition-colors" />
                </motion.div>
            ))}
        </div>
    )
}
