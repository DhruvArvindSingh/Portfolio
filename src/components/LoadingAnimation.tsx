'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const bootSequence = [
    { text: 'BIOS v3.14.159 — POST OK', delay: 100 },
    { text: 'Detecting hardware...', delay: 200 },
    { text: '  CPU: x86_64 — OK', delay: 150 },
    { text: '  RAM: 7168 MB — OK', delay: 150 },
    { text: '  GPU: Integrated — OK', delay: 100 },
    { text: 'Loading kernel modules...', delay: 200 },
    { text: '  [  OK  ] docker.service', delay: 120 },
    { text: '  [  OK  ] containerd.service', delay: 100 },
    { text: '  [  OK  ] nginx.service', delay: 100 },
    { text: '  [  OK  ] minio.service', delay: 80 },
    { text: 'Mounting filesystems... done', delay: 150 },
    { text: 'Initializing network interfaces...', delay: 200 },
    { text: '  eth0: 192.168.1.x — UP', delay: 120 },
    { text: 'Starting blockchain node sync...', delay: 200 },
    { text: '  Block height: #8,942,103 — SYNCED', delay: 150 },
    { text: 'Establishing P2P connections...', delay: 150 },
    { text: '  Connected peers: 12', delay: 100 },
    { text: '', delay: 50 },
    { text: 'All systems operational.', delay: 200 },
    { text: 'Welcome, Dhruv.', delay: 300 },
]

export default function LoadingAnimation() {
    const [isVisible, setIsVisible] = useState(true)
    const [lines, setLines] = useState<string[]>([])
    const [progress, setProgress] = useState(0)
    const [showCursor, setShowCursor] = useState(true)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let totalDelay = 0

        const timers: NodeJS.Timeout[] = []

        bootSequence.forEach((item, i) => {
            totalDelay += item.delay
            const timer = setTimeout(() => {
                setLines(prev => [...prev, item.text])
                setProgress(((i + 1) / bootSequence.length) * 100)
            }, totalDelay)
            timers.push(timer)
        })

        // Hide after boot sequence completes
        const hideTimer = setTimeout(() => {
            setIsVisible(false)
        }, totalDelay + 600)
        timers.push(hideTimer)

        // Cursor blink
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev)
        }, 530)

        return () => {
            timers.forEach(clearTimeout)
            clearInterval(cursorInterval)
        }
    }, [])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [lines])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col items-center justify-center p-6"
                >
                    <div className="w-full max-w-2xl">
                        {/* Terminal Window Chrome */}
                        <div className="bg-gray-900/80 border border-gray-700 rounded-t-lg px-4 py-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-gray-500 text-xs font-mono">dhruv@homelab — boot</span>
                        </div>

                        {/* Terminal Body */}
                        <div className="bg-black/95 border border-t-0 border-gray-700 rounded-b-lg p-4 h-[350px] overflow-y-auto font-mono text-sm">
                            {/* ASCII Art Header */}
                            <div className="text-green-500 text-[10px] sm:text-xs mb-4 leading-tight whitespace-pre">
{`  ____  _                     ____  _             _     
 |  _ \\| |__  _ __ _   ___   __ / ___|(_)_ __   __ _| |__  
 | | | | '_ \\| '__| | | \\ \\ / / \\___ \\| | '_ \\ / _\` | '_ \\ 
 | |_| | | | | |  | |_| |\\ V /   ___) | | | | | (_| | | | |
 |____/|_| |_|_|   \\__,_| \\_/   |____/|_|_| |_|\\__, |_| |_|
                                                 |___/       `}
                            </div>

                            {/* Boot Lines */}
                            {lines.map((line, i) => (
                                <div key={i} className="mb-0.5">
                                    {line.includes('[  OK  ]') ? (
                                        <span>
                                            <span className="text-green-400">[  OK  ]</span>
                                            <span className="text-gray-300">{line.replace('[  OK  ]', '')}</span>
                                        </span>
                                    ) : line.includes('Welcome') ? (
                                        <span className="text-green-400 font-bold">{line}</span>
                                    ) : line.includes('SYNCED') || line.includes('UP') || line.includes('OK') ? (
                                        <span className="text-cyan-400">{line}</span>
                                    ) : line === '' ? (
                                        <br />
                                    ) : (
                                        <span className="text-gray-400">{line}</span>
                                    )}
                                </div>
                            ))}

                            {/* Blinking Cursor */}
                            {isVisible && (
                                <span className={`text-green-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▊</span>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4">
                            <div className="flex justify-between text-xs font-mono text-gray-500 mb-1">
                                <span>BOOT_PROGRESS</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-green-500 via-cyan-400 to-green-500 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
