'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Skill {
    name: string
    level: number // 0-100
    category: string
    color: string
}

const skills: Skill[] = [
    // Frontend
    { name: 'React/Next.js', level: 95, category: 'Frontend', color: '#00FF41' },
    { name: 'TypeScript', level: 90, category: 'Frontend', color: '#2496ED' },
    { name: 'Tailwind CSS', level: 92, category: 'Frontend', color: '#00F0FF' },
    { name: 'Three.js', level: 85, category: 'Frontend', color: '#FFFFFF' },

    // Backend
    { name: 'Node.js', level: 88, category: 'Backend', color: '#00FF41' },
    { name: 'Express', level: 87, category: 'Backend', color: '#627EEA' },
    { name: 'PostgreSQL', level: 82, category: 'Backend', color: '#2496ED' },
    { name: 'Redis', level: 80, category: 'Backend', color: '#FF00FF' },

    // DevOps & Cloud
    { name: 'Docker', level: 90, category: 'DevOps', color: '#2496ED' },
    { name: 'Kubernetes', level: 78, category: 'DevOps', color: '#326CE5' },
    { name: 'AWS', level: 85, category: 'DevOps', color: '#FF9900' },
    { name: 'Nginx', level: 82, category: 'DevOps', color: '#009639' },
    { name: 'Kafka', level: 75, category: 'DevOps', color: '#FFFFFF' },
    { name: 'CI/CD', level: 83, category: 'DevOps', color: '#00F0FF' },

    // Blockchain
    { name: 'Solidity', level: 78, category: 'Blockchain', color: '#627EEA' },
    { name: 'Web3.js', level: 80, category: 'Blockchain', color: '#FF9900' },
    { name: 'Solana', level: 75, category: 'Blockchain', color: '#9945FF' },

    // Languages
    { name: 'Go', level: 72, category: 'Languages', color: '#00ADD8' },
    { name: 'Rust', level: 70, category: 'Languages', color: '#FF00FF' },
    { name: 'C/C++', level: 85, category: 'Languages', color: '#2496ED' },
    { name: 'Python', level: 83, category: 'Languages', color: '#00F0FF' },
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

        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()
        
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        
        ctx.scale(dpr, dpr)
        
        const width = rect.width
        const height = rect.height
        const centerX = width / 2
        const centerY = height / 2
        const maxRadius = Math.min(centerX, centerY) - 60

        const drawRadar = () => {
            ctx.clearRect(0, 0, width, height)

            // Draw concentric circles (Grid)
            const levels = 4
            for (let i = 1; i <= levels; i++) {
                const radius = (maxRadius / levels) * i
                ctx.beginPath()
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
                ctx.strokeStyle = `rgba(0, 255, 65, ${0.1 + i * 0.05})` // Green grid
                ctx.lineWidth = 1
                ctx.setLineDash([5, 5])
                ctx.stroke()
                ctx.setLineDash([])

                // Add level labels
                ctx.fillStyle = 'rgba(0, 255, 65, 0.5)'
                ctx.font = '10px "JetBrains Mono", monospace'
                ctx.fillText(`${i * 25}%`, centerX + 5, centerY - radius + 5)
            }

            // Draw axes
            const numAxes = filteredSkills.length
            for (let i = 0; i < numAxes; i++) {
                const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2
                const x = centerX + Math.cos(angle) * maxRadius
                const y = centerY + Math.sin(angle) * maxRadius

                ctx.beginPath()
                ctx.moveTo(centerX, centerY)
                ctx.lineTo(x, y)
                ctx.strokeStyle = 'rgba(0, 255, 65, 0.2)'
                ctx.lineWidth = 1
                ctx.stroke()
            }

            // Draw skill polygon
            if (filteredSkills.length > 0) {
                ctx.beginPath()
                filteredSkills.forEach((skill, i) => {
                    const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2
                    const radius = (skill.level / 100) * maxRadius
                    const x = centerX + Math.cos(angle) * radius
                    const y = centerY + Math.sin(angle) * radius

                    if (i === 0) {
                        ctx.moveTo(x, y)
                    } else {
                        ctx.lineTo(x, y)
                    }
                })
                ctx.closePath()
                ctx.fillStyle = 'rgba(0, 255, 65, 0.1)'
                ctx.fill()
                ctx.strokeStyle = '#00FF41'
                ctx.lineWidth = 2
                ctx.stroke()
            }

            // Draw skill points
            filteredSkills.forEach((skill, i) => {
                const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2
                const radius = (skill.level / 100) * maxRadius
                const x = centerX + Math.cos(angle) * radius
                const y = centerY + Math.sin(angle) * radius

                // Draw point
                ctx.beginPath()
                ctx.arc(x, y, hoveredSkill?.name === skill.name ? 6 : 4, 0, Math.PI * 2)
                ctx.fillStyle = skill.color
                ctx.fill()
                
                // Glow effect
                if (hoveredSkill?.name === skill.name) {
                    ctx.shadowColor = skill.color
                    ctx.shadowBlur = 15
                    ctx.stroke()
                    ctx.shadowBlur = 0
                }
            })

            // Draw labels
            filteredSkills.forEach((skill, i) => {
                const angle = (Math.PI * 2 * i) / numAxes - Math.PI / 2
                const labelRadius = maxRadius + 30
                const x = centerX + Math.cos(angle) * labelRadius
                const y = centerY + Math.sin(angle) * labelRadius

                ctx.fillStyle = hoveredSkill?.name === skill.name ? '#00FF41' : 'rgba(255, 255, 255, 0.6)'
                ctx.font = hoveredSkill?.name === skill.name ? 'bold 12px "JetBrains Mono", monospace' : '11px "JetBrains Mono", monospace'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(skill.name, x, y)
            })
        }

        drawRadar()
        
        // Redraw on resize
        window.addEventListener('resize', drawRadar)

        return () => {
            window.removeEventListener('resize', drawRadar)
        }
    }, [filteredSkills, hoveredSkill])

    return (
        <div className="w-full">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-black/80 backdrop-blur-md rounded-sm p-8 border border-green-500/30 relative overflow-hidden"
            >
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500"></div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-1 text-xs font-mono border transition-all ${
                                selectedCategory === category
                                    ? 'bg-green-500 text-black border-green-500 font-bold'
                                    : 'bg-black text-gray-400 border-gray-800 hover:border-green-500/50'
                            }`}
                        >
                            [{category.toUpperCase()}]
                        </button>
                    ))}
                </div>

                {/* Radar Chart */}
                <div className="flex justify-center mb-6 relative z-10">
                    <canvas
                        ref={canvasRef}
                        style={{ width: '100%', maxWidth: '600px', height: 'auto', aspectRatio: '1/1' }}
                        onMouseMove={(e) => {
                            const canvas = canvasRef.current
                            if (!canvas) return
                            const rect = canvas.getBoundingClientRect()
                            
                            // Scale coordinates to match canvas internal resolution
                            const scaleX = canvas.width / rect.width
                            const scaleY = canvas.height / rect.height

                            const x = (e.clientX - rect.left) * scaleX
                            const y = (e.clientY - rect.top) * scaleY
                            
                            const centerX = canvas.width / 2
                            const centerY = canvas.height / 2

                            let found = false
                            filteredSkills.forEach((skill, i) => {
                                const angle = (Math.PI * 2 * i) / filteredSkills.length - Math.PI / 2
                                const maxRadius = Math.min(centerX, centerY) - 60 * scaleX // Adjust for scale
                                const radius = (skill.level / 100) * maxRadius
                                const skillX = centerX + Math.cos(angle) * radius
                                const skillY = centerY + Math.sin(angle) * radius

                                const distance = Math.sqrt(Math.pow(x - skillX, 2) + Math.pow(y - skillY, 2))
                                if (distance < 20 * scaleX) { // Larger hit area
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
                    <div className="text-center absolute bottom-8 left-0 right-0 pointer-events-none">
                        <div className="inline-block bg-black/90 px-6 py-2 border border-green-500/50 text-green-400 font-mono text-sm">
                            {hoveredSkill.name}: {hoveredSkill.level}%
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
