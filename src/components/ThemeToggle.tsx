'use client'

import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'auto'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>('dark')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const savedTheme = localStorage.getItem('theme') as Theme || 'dark'
        setTheme(savedTheme)
        applyTheme(savedTheme)
    }, [])

    const applyTheme = (newTheme: Theme) => {
        const root = document.documentElement

        if (newTheme === 'auto') {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            root.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
        } else {
            root.setAttribute('data-theme', newTheme)
        }
    }

    const handleThemeChange = (newTheme: Theme) => {
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        applyTheme(newTheme)
    }

    if (!mounted) return null

    return (
        <div className="fixed top-24 right-6 z-50 bg-gray-900/80 backdrop-blur-md rounded-2xl p-2 border border-purple-500/20 shadow-xl">
            <div className="flex gap-1">
                <button
                    onClick={() => handleThemeChange('dark')}
                    className={`p-3 rounded-xl transition-all duration-300 ${theme === 'dark'
                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                    title="Dark Mode"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </button>

                <button
                    onClick={() => handleThemeChange('light')}
                    className={`p-3 rounded-xl transition-all duration-300 ${theme === 'light'
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg shadow-yellow-500/50'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                    title="Light Mode"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </button>

                <button
                    onClick={() => handleThemeChange('auto')}
                    className={`p-3 rounded-xl transition-all duration-300 ${theme === 'auto'
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                    title="Auto Mode"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

