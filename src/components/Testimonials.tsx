'use client'

import { useState } from 'react'
import Reveal from './Reveal'
import Image from 'next/image'

interface Testimonial {
    name: string
    role: string
    company: string
    image: string
    content: string
    rating: number
}

const testimonials: Testimonial[] = [
    {
        name: 'Manu Sheel Gupta',
        role: 'Cofounder of SeetaLabs',
        company: 'SeetaLabs',
        image: '/manu-sheel-gupta.jpg',
        content: 'Dhruv Arvind Singh made impactful contributions to the Web3 Maintainer Suite project under C4GT. He integrated diverse database solutions to enable robust billing and invoicing for industrial maintenance scenarios. Dhruv further scaled the system for interoperability across multiple cloud platforms, including AWS and GCP, while seamlessly integrating decentralized storage. His work showcases strong technical depth and a clear focus on practical, scalable innovation.',
        rating: 5
    }
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const currentTestimonial = testimonials[currentIndex]

    return (
        <div className="max-w-5xl mx-auto">
            <Reveal direction="up">
                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-purple-500/20 overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        {/* Quote icon */}
                        <div className="text-6xl text-purple-400/30 mb-6">&ldquo;</div>

                        {/* Testimonial content */}
                        <div className="mb-8">
                            <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed italic mb-6">
                                {currentTestimonial.content}
                            </p>

                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                                    <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Author info */}
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-400">
                                    <Image
                                        src={currentTestimonial.image}
                                        alt={currentTestimonial.name}
                                        width={64}
                                        height={64}
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-white">{currentTestimonial.name}</h4>
                                    <p className="text-purple-400">{currentTestimonial.role}</p>
                                    <p className="text-gray-400 text-sm">{currentTestimonial.company}</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentIndex(i)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex
                                                ? 'bg-purple-400 w-8'
                                                : 'bg-gray-600 hover:bg-gray-500'
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={prevTestimonial}
                                    className="p-3 rounded-full bg-gray-800/50 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-110"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="p-3 rounded-full bg-gray-800/50 border border-gray-600/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-110"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    )
}

