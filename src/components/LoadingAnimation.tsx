'use client'

import { useEffect, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingAnimation() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        // Force completion after 2.5 seconds regardless of loading state
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, 2500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
                >
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
                                <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

