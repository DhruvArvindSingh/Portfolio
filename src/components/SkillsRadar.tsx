'use client'

import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

interface Skill {
    name: string
    level: number // 0-100
    category: string
    color: string
}

const skills: Skill[] = [
    // Frontend
    { name: 'React/Next.js', level: 95, category: 'Frontend', color: '#61dafb' },
    { name: 'TypeScript', level: 90, category: 'Frontend', color: '#3178c6' },
    { name: 'Tailwind CSS', level: 92, category: 'Frontend', color: '#06b6d4' },
    { name: 'Three.js', level: 85, category: 'Frontend', color: '#000000' },

    // Backend
    { name: 'Node.js', level: 88, category: 'Backend', color: '#68a063' },
    { name: 'Express', level: 87, category: 'Backend', color: '#000000' },
    { name: 'PostgreSQL', level: 82, category: 'Backend', color: '#336791' },
    { name: 'Redis', level: 80, category: 'Backend', color: '#dc382d' },

    // DevOps & Cloud
    { name: 'AWS', level: 85, category: 'DevOps', color: '#ff9900' },
    { name: 'Docker', level: 88, category: 'DevOps', color: '#2496ed' },
    { name: 'Kafka', level: 75, category: 'DevOps', color: '#231f20' },

    // Blockchain
    { name: 'Solidity', level: 78, category: 'Blockchain', color: '#363636' },
    { name: 'Web3.js', level: 80, category: 'Blockchain', color: '#f16822' },

    // Languages
    { name: 'Rust', level: 70, category: 'Languages', color: '#ce422b' },
    { name: 'C/C++', level: 85, category: 'Languages', color: '#659bd3' },
    { name: 'Python', level: 83, category: 'Languages', color: '#3776ab' },
]

export default function SkillsRadar() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string>('All')

    const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))]

    const filteredSkills = selectedCategory === 'All'
        ? skills
        : skills.filter(s => s.category === selectedCategory)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const maxRadius = Math.min(centerX, centerY) - 40

        let animationFrame: number
        let rotation = 0

        const drawRadar = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Draw concentric circles
            const levels = 5
            for (let i = 1; i <= levels; i++) {
                const radius = (maxRadius / levels) * i
                ctx.beginPath()
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
                ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 + i * 0.05})`
                ctx.lineWidth = 1
                ctx.stroke()

                // Add level labels
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
                ctx.font = '10px sans-serif'
                ctx.fillText(`${i * 20}%`, centerX + 5, centerY - radius + 5)
            }

            // Draw axes
            const numAxes = filteredSkills.length
            for (let i = 0; i < numAxes; i++) {
                const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2 + rotation * 0.001
                const x = centerX + Math.cos(angle) * maxRadius
                const y = centerY + Math.sin(angle) * maxRadius

                ctx.beginPath()
                ctx.moveTo(centerX, centerY)
                ctx.lineTo(x, y)
                ctx.strokeStyle = 'rgba(168, 85, 247, 0.2)'
                ctx.lineWidth = 1
                ctx.stroke()
            }

            // Draw skill points and connect them
            ctx.beginPath()
            filteredSkills.forEach((skill, i) => {
                const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2 + rotation * 0.001
                const radius = (skill.level / 100) * maxRadius
                const x = centerX + Math.cos(angle) * radius
                const y = centerY + Math.sin(angle) * radius

                if (i === 0) {
                    ctx.moveTo(x, y)
                } else {
                    ctx.lineTo(x, y)
                }

                // Draw skill points
                ctx.save()
                ctx.beginPath()
                ctx.arc(x, y, hoveredSkill?.name === skill.name ? 8 : 5, 0, Math.PI * 2)
                ctx.fillStyle = skill.color
                ctx.fill()
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'
                ctx.lineWidth = 2
                ctx.stroke()
                ctx.restore()
            })

            // Complete the polygon
            if (filteredSkills.length > 0) {
                ctx.closePath()
                ctx.fillStyle = 'rgba(168, 85, 247, 0.1)'
                ctx.fill()
                ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)'
                ctx.lineWidth = 2
                ctx.stroke()
            }

            // Draw skill labels
            filteredSkills.forEach((skill, i) => {
                const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2 + rotation * 0.001
                const labelRadius = maxRadius + 25
                const x = centerX + Math.cos(angle) * labelRadius
                const y = centerY + Math.sin(angle) * labelRadius

                ctx.fillStyle = hoveredSkill?.name === skill.name ? skill.color : 'rgba(255, 255, 255, 0.7)'
                ctx.font = hoveredSkill?.name === skill.name ? 'bold 12px sans-serif' : '11px sans-serif'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(skill.name, x, y)
            })

            rotation += 0.5
            animationFrame = requestAnimationFrame(drawRadar)
        }

        drawRadar()

        return () => {
            cancelAnimationFrame(animationFrame)
        }
    }, [filteredSkills, hoveredSkill])

    return (
        <div className="w-full">
            <Reveal direction="up">
                <div className="bg-gray-900/80 backdrop-blur-md rounded-3xl p-8 border border-purple-500/20">
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-3 justify-center mb-8">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                                        : 'bg-gray-800/50 text-gray-300 border border-gray-600/30 hover:border-purple-400/50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Radar Chart */}
                    <div className="flex justify-center mb-6">
                        <canvas
                            ref={canvasRef}
                            width={600}
                            height={600}
                            className="max-w-full h-auto"
                            onMouseMove={(e) => {
                                const rect = canvasRef.current?.getBoundingClientRect()
                                if (!rect) return

                                const x = e.clientX - rect.left
                                const y = e.clientY - rect.top
                                const centerX = rect.width / 2
                                const centerY = rect.height / 2

                                let found = false
                                filteredSkills.forEach((skill, i) => {
                                    const angle = (Math.PI * 2 * i) / filteredSkills.length - Math.PI / 2
                                    const maxRadius = Math.min(centerX, centerY) - 40
                                    const radius = (skill.level / 100) * maxRadius
                                    const skillX = centerX + Math.cos(angle) * radius
                                    const skillY = centerY + Math.sin(angle) * radius

                                    const distance = Math.sqrt(Math.pow(x - skillX, 2) + Math.pow(y - skillY, 2))
                                    if (distance < 15) {
                                        setHoveredSkill(skill)
                                        found = true
                                    }
                                })

                                if (!found) setHoveredSkill(null)
                            }}
                            onMouseLeave={() => setHoveredSkill(null)}
                        />
                    </div>

                    {/* Skill Details on Hover */}
                    {hoveredSkill && (
                        <div className="text-center">
                            <div className="inline-block bg-gray-800/90 backdrop-blur-sm px-6 py-4 rounded-2xl border border-purple-500/30">
                                <h4 className="text-xl font-bold mb-2" style={{ color: hoveredSkill.color }}>
                                    {hoveredSkill.name}
                                </h4>
                                <div className="flex items-center gap-3 justify-center">
                                    <div className="text-gray-400">{hoveredSkill.category}</div>
                                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                                    <div className="text-purple-400 font-bold">{hoveredSkill.level}%</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Reveal>
        </div>
    )
}

