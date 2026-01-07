import { motion } from 'framer-motion'
import { ColorKey } from '../lib/colorMap'
import { Terminal, Calendar, Building, ExternalLink, User } from 'lucide-react'

interface ExperienceCardProps {
    title: string
    company: string
    companyUrl?: string
    description?: string
    mentor?: string
    scope?: string
    highlights?: string[]
    period: string
    technologies: { name: string; color: ColorKey }[]
    links: { label: string; url: string }[]
    color: ColorKey
    isLeft?: boolean
    revealDelayMs?: number
}

const ExperienceCard = ({ title, company, companyUrl, description, mentor, scope, highlights, period, technologies, links, isLeft = false, revealDelayMs = 0 }: ExperienceCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: revealDelayMs / 1000 }}
            className="relative w-full max-w-4xl mx-auto mb-12"
        >
            {/* Log Entry Container */}
            <div className="bg-black/90 border-l-2 border-purple-500 p-6 font-mono relative overflow-hidden group hover:bg-gray-900/50 transition-colors">
                {/* Timestamp / Header */}
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4 border-b border-gray-800 pb-2">
                    <span className="text-purple-400 flex items-center gap-1">
                        <Terminal size={12} />
                        SYS_LOG_ENTRY
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {period}
                    </span>
                    <span className="flex items-center gap-1 text-gray-400">
                        <Building size={12} />
                        {companyUrl ? (
                            <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors underline decoration-dotted">
                                {company}
                            </a>
                        ) : (
                            company
                        )}
                    </span>
                    {mentor && (
                        <span className="flex items-center gap-1 text-gray-400">
                            <User size={12} />
                            Mentor: {mentor}
                        </span>
                    )}
                </div>

                {/* Main Content */}
                <div className="pl-4 border-l border-gray-800 group-hover:border-purple-500/30 transition-colors">
                    <h3 className="text-xl font-bold text-white mb-2">
                        <span className="text-purple-500 mr-2">{'>'}</span>
                        {title}
                    </h3>
                    
                    {scope && (
                        <p className="text-gray-400 text-sm italic mb-3 pl-4">
                            <span className="text-purple-400 font-semibold">Scope:</span> {scope}
                        </p>
                    )}
                    
                    {highlights && highlights.length > 0 ? (
                        <div className="mb-4">
                            <p className="text-purple-400 text-sm font-semibold mb-2">Highlights:</p>
                            <ul className="space-y-2 pl-4">
                                {highlights.map((highlight, i) => (
                                    <li key={i} className="text-gray-300 text-sm leading-relaxed flex">
                                        <span className="text-purple-500 mr-2 flex-shrink-0">•</span>
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : description ? (
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                            {description}
                        </p>
                    ) : null}

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {technologies.map((tech, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-purple-900/20 text-purple-300 rounded border border-purple-500/20">
                                {tech.name}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    {links.length > 0 && (
                        <div className="flex gap-4 text-xs">
                            {links.map((link, i) => (
                                <a 
                                    key={i} 
                                    href={link.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                                >
                                    <ExternalLink size={12} />
                                    [{link.label}]
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Background Glitch Effect (Optional) */}
                <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
                    <div className="text-[10px] leading-none text-purple-500">
                        01010101<br/>
                        10101010<br/>
                        00110011
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ExperienceCard
