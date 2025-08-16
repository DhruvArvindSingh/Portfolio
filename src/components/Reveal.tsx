'use client'

import React, { useEffect, useRef, useState } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right'

interface RevealProps {
    children: React.ReactNode
    /** Direction the element should slide from before revealing */
    direction?: Direction
    /** Optional delay in ms before playing the reveal once intersected */
    delayMs?: number
    /** Additional className applied to the wrapper */
    className?: string
}

export default function Reveal({ children, direction = 'up', delayMs = 0, className = '' }: RevealProps) {
    const ref = useRef<HTMLDivElement | null>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const element = ref.current
        if (!element) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Delay the reveal to allow staggering
                        const id = window.setTimeout(() => {
                            setVisible(true)
                        }, delayMs)

                        // Cleanup timeout if unmounted early
                        return () => window.clearTimeout(id)
                    }
                })
            },
            { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
        )

        observer.observe(element)
        return () => observer.unobserve(element)
    }, [delayMs])

    // Map direction to class suffix used by CSS
    const directionClass = `reveal-${direction}`

    return (
        <div
            ref={ref}
            className={`reveal ${directionClass} ${visible ? 'reveal-visible' : ''} ${className}`}
        >
            {children}
        </div>
    )
}


