import { motion } from 'framer-motion'
import { ColorKey } from '../lib/colorMap'
import { Hash, Box, ExternalLink, Github } from 'lucide-react'

interface ProjectCardProps {
    title: string
    subtitle: string
    description: string
    year: string
    technologies: { name: string; color: ColorKey }[]
    links: { label: string; url: string }[]
    color: ColorKey
    isLeft?: boolean
    revealDelayMs?: number
    index: number
}

const ProjectCard = ({ title, subtitle, description, year, technologies, links, isLeft = false, revealDelayMs = 0, index }: ProjectCardProps) => {
    // Generate a pseudo-hash based on the title
    const pseudoHash = `0x${title.split('').reduce((acc, char) => acc + char.charCodeAt(0).toString(16), '').substring(0, 12)}...`
    const prevHash = `0x${(index * 123456).toString(16).padStart(12, '0')}...`

    return (
        <div className="relative w-full max-w-4xl mx-auto mb-16">
            {/* Connecting Chain Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 -z-10 transform md:-translate-x-1/2">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-green-500/50 to-transparent animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: revealDelayMs / 1000 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${isLeft ? 'md:flex-row-reverse' : ''}`}
            >
                {/* Block Visual */}
                <div className="w-full md:w-1/2">
                    <div className="bg-black/80 backdrop-blur-md border border-green-500/30 p-6 rounded-sm relative overflow-hidden group hover:border-green-500/60 transition-colors duration-300">
                        {/* Header: Block Info */}
                        <div className="flex justify-between items-center border-b border-gray-800 pb-4 mb-4 font-mono text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                                <Box size={14} className="text-green-500" />
                                <span>BLOCK #{1000 + index}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-600">PREV:</span>
                                <span className="text-gray-400">{prevHash}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-white font-mono group-hover:text-green-400 transition-colors">
                                        {title}
                                    </h3>
                                    <p className="text-sm text-gray-400 font-mono mt-1">{subtitle}</p>
                                </div>
                                <span className="px-2 py-1 bg-green-900/20 border border-green-500/30 text-green-400 text-xs font-mono rounded">
                                    {year}
                                </span>
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed font-mono border-l-2 border-gray-700 pl-4">
                                {description}
                            </p>

                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {technologies.map((tech, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-900 border border-gray-700 text-gray-300 text-xs font-mono hover:border-green-500/50 hover:text-green-400 transition-colors cursor-default">
                                        {tech.name}
                                    </span>
                                ))}
                            </div>

                            {/* Footer: Hash & Links */}
                            <div className="pt-4 mt-4 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div className="flex items-center gap-2 text-xs font-mono text-gray-500 bg-black/50 px-2 py-1 rounded">
                                    <Hash size={12} />
                                    <span className="truncate max-w-[150px]">{pseudoHash}</span>
                                </div>

                                <div className="flex gap-3">
                                    {links.map((link, i) => (
                                        <a
                                            key={i}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-xs font-mono text-green-400 hover:text-green-300 transition-colors uppercase tracking-wider"
                                        >
                                            {link.label.toLowerCase().includes('github') ? <Github size={14} /> : <ExternalLink size={14} />}
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Decorative Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-500" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-green-500" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-500" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-500" />
                    </div>
                </div>

                {/* Connector Node (Center) */}
                <div className="hidden md:flex items-center justify-center w-8 h-8 bg-black border-2 border-green-500 rounded-full z-10 shadow-[0_0_10px_rgba(0,255,65,0.5)]">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>

                {/* Empty Space for Layout Balance */}
                <div className="hidden md:block w-1/2" />
            </motion.div>
        </div>
    )
}

export default ProjectCard
