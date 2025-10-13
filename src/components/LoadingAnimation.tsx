'use client'

import { useEffect, useState } from 'react'

export default function LoadingAnimation() {
    const [progress, setProgress] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => setIsVisible(false), 500)
                    return 100
                }
                return prev + 2
            })
        }, 20)

        return () => clearInterval(interval)
    }, [])

    if (!isVisible) return null

    return (
        <div className={`fixed inset-0 z-[200] bg-black flex items-center justify-center transition-opacity duration-500 ${progress === 100 ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-center">
                {/* Animated logo */}
                <div className="mb-8">
                    <div className="w-32 h-32 mx-auto relative">
                        <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full"></div>
                        <div
                            className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"
                            style={{ animationDuration: '1s' }}
                        ></div>
                        <div
                            className="absolute inset-2 border-4 border-transparent border-t-pink-500 rounded-full animate-spin"
                            style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            DS
                        </div>
                    </div>
                </div>

                {/* Loading text */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Loading Portfolio</h2>
                    <p className="text-gray-400">Preparing something awesome...</p>
                </div>

                {/* Progress bar */}
                <div className="w-64 mx-auto">
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">{progress}%</div>
                </div>
            </div>
        </div>
    )
}

