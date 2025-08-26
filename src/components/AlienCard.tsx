'use client'

import React, { useEffect, useRef, useState } from 'react'

type Side = 'left' | 'right'

interface AlienCardProps {
    children: React.ReactNode
    /** Triggered placement direction for subtle lateral entry offset */
    side?: Side
    /** Delay before the card plays its drop-in sequence */
    delayMs?: number
    /** Visual theme variant */
    variant?: 'project' | 'experience'
    /** Tailwind color classes (text/border/shadow) from colorMap to theme the card */
    accentClasses?: {
        text: string
        borderLight: string
        borderHover: string
        shadow: string
    }
    /** Optional badge rendered at the top-right of the card (e.g., year/period) */
    badge?: React.ReactNode
}

/**
 * @description A card component with a UFO animation that displays content.
 * @param {AlienCardProps} props The props for the component.
 * @returns {JSX.Element} The alien card component.
 */
export default function AlienCard({
    children,
    side = 'left',
    delayMs = 0,
    variant = 'project',
    accentClasses,
    badge
}: AlienCardProps) {
    const ref = useRef<HTMLDivElement | null>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = window.setTimeout(() => setVisible(true), delayMs)
                        return () => window.clearTimeout(id)
                    }
                })
            },
            { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [delayMs])

    const lateralOffset = side === 'left' ? '-translate-x-1' : 'translate-x-1'

    // Variant palette
    const ufoPrimary = variant === 'experience' ? '#22c55e' : '#a855f7'
    const ufoSecondary = variant === 'experience' ? '#84cc16' : '#ec4899'
    const beamColor = variant === 'experience' ? 'rgba(16,185,129,0.5)' : 'rgba(168,85,247,0.5)'
    const beamColorSoft = variant === 'experience' ? 'rgba(16,185,129,0.2)' : 'rgba(168,85,247,0.2)'

    return (
        <div ref={ref} className={`relative`}>
            {/* UFO + Tractor Beam */}
            <div className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center h-10 w-24 ${visible ? 'alien-visible' : ''}`}>
                {/* Simple SVG UFO */}
                <svg width="64" height="24" viewBox="0 0 64 24" className={`transform scale-150 drop-shadow-[0_0_16px_rgba(168,85,247,0.8)] ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                    <ellipse cx="32" cy="12" rx="18" ry="6" fill={ufoPrimary} opacity="0.9" />
                    <ellipse cx="32" cy="10" rx="10" ry="3" fill={ufoSecondary} opacity="0.9" />
                    <circle cx="24" cy="12" r="1.6" fill="#06b6d4" />
                    <circle cx="32" cy="12" r="1.6" fill="#06b6d4" />
                    <circle cx="40" cy="12" r="1.6" fill="#06b6d4" />
                </svg>
                {/* Beam (cone via clip-path) */}
                <div
                    className={`ufo-beam ${visible ? 'ufo-beam-on' : ''}`}
                    style={{ ['--beam-color' as unknown as string]: beamColor, ['--beam-color-soft' as unknown as string]: beamColorSoft } as React.CSSProperties}
                />
            </div>

            {/* Card Container */}
            <div
                className={`alien-card-wrapper ${visible ? 'alien-card-visible' : ''} ${lateralOffset}`}
            >
                <div
                    className={`interactive-card relative overflow-hidden bg-black/65 bg-blend-overlay ${variant === 'experience' ? 'bg-[radial-gradient(120%_120%_at_0%_0%,rgba(34,197,94,0.15),rgba(0,0,0,0)_40%),radial-gradient(120%_120%_at_100%_0%,rgba(132,204,22,0.15),rgba(0,0,0,0)_40%),radial-gradient(120%_120%_at_50%_120%,rgba(6,182,212,0.10),rgba(0,0,0,0)_40%)]' : 'bg-[radial-gradient(120%_120%_at_0%_0%,rgba(168,85,247,0.12),rgba(0,0,0,0)_40%),radial-gradient(120%_120%_at_100%_0%,rgba(236,72,153,0.12),rgba(0,0,0,0)_40%),radial-gradient(120%_120%_at_50%_120%,rgba(6,182,212,0.12),rgba(0,0,0,0)_40%)]'} border ${accentClasses?.borderLight ?? 'border-purple-500/20'} hover:${accentClasses?.borderHover ?? 'border-purple-500/40'} rounded-2xl shadow-2xl ${accentClasses?.shadow ?? 'shadow-purple-500/20'} backdrop-blur-xl ring-1 ring-white/10`}
                >
                    {/* Variant accent left bar for experience */}
                    {variant === 'experience' && (
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-emerald-400 to-lime-400 shadow-[0_0_16px_rgba(34,197,94,0.5)]" />
                    )}
                    {/* Hologram scan lines overlay */}
                    <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(transparent_12px,rgba(255,255,255,0.5)_12px,rgba(255,255,255,0.5)_13px,transparent_13px)] bg-[length:100%_13px]" />
                    {/* Moving nebula sheen */
          /* eslint-disable-next-line react/no-unknown-property */}
                    <div className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute -inset-1 blur-2xl bg-[conic-gradient(from_180deg_at_50%_50%,rgba(168,85,247,0.18)_0deg,rgba(236,72,153,0.18)_120deg,rgba(6,182,212,0.18)_240deg,rgba(168,85,247,0.18)_360deg)] animate-[spin_8s_linear_infinite]" />
                    </div>

                    {/* Actual content */}
                    <div className="relative z-10 p-8 sm:p-10">
                        {badge && (
                            <div className="mb-3 flex justify-end">
                                <div className={`px-3 py-1 text-xs font-semibold rounded-full ${accentClasses?.text ?? 'text-purple-400'} bg-black/60 border ${accentClasses?.borderLight ?? 'border-purple-500/20'}`}>
                                    {badge}
                                </div>
                            </div>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}


