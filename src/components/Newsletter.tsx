'use client'

import { useState } from 'react'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        // Simulate newsletter subscription
        try {
            // Here you would typically send to your newsletter service
            await new Promise(resolve => setTimeout(resolve, 1000))
            setStatus('success')
            setEmail('')

            setTimeout(() => {
                setStatus('idle')
            }, 3000)
        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-3xl p-8 border border-purple-500/20">
            <div className="max-w-2xl mx-auto text-center">
                <div className="text-5xl mb-4">📬</div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Stay Updated
                </h3>
                <p className="text-gray-300 mb-6">
                    Subscribe to get the latest updates on new projects, blog posts, and tech insights delivered to your inbox.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="flex-1 px-6 py-4 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all"
                    />
                    <button
                        type="submit"
                        className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
                    >
                        Subscribe
                    </button>
                </form>

                {status === 'success' && (
                    <div className="mt-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 text-sm">
                        ✓ Successfully subscribed! Check your inbox for confirmation.
                    </div>
                )}

                {status === 'error' && (
                    <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                        Something went wrong. Please try again.
                    </div>
                )}
            </div>
        </div>
    )
}

