'use client'

import { useMemo, memo } from 'react'
import { motion } from 'framer-motion'
import { GitPullRequest, GitMerge, Code, ExternalLink, Star } from 'lucide-react'
import { openSourceContributions } from '../lib/data'
import Reveal from './Reveal'

// Memoized contribution graph - only generates grid once
const ContributionGraph = memo(function ContributionGraph() {
    const weeks = 20
    const days = 7

    // Memoize the grid so it doesn't regenerate on every render
    const grid = useMemo(() => {
        const result = []
        for (let w = 0; w < weeks; w++) {
            const week = []
            for (let d = 0; d < days; d++) {
                const recencyBoost = w / weeks
                const random = Math.random()
                let level = 0
                if (random < 0.15 + recencyBoost * 0.3) level = 4
                else if (random < 0.3 + recencyBoost * 0.2) level = 3
                else if (random < 0.5 + recencyBoost * 0.1) level = 2
                else if (random < 0.7) level = 1
                week.push(level)
            }
            result.push(week)
        }
        return result
    }, [])

    const levelColors: Record<number, string> = {
        0: 'bg-gray-900 border-gray-800',
        1: 'bg-green-900/60 border-green-800/40',
        2: 'bg-green-700/60 border-green-600/40',
        3: 'bg-green-500/70 border-green-400/40',
        4: 'bg-green-400 border-green-300/40',
    }

    return (
        <div className="overflow-x-auto pb-2">
            <div className="flex gap-[3px] min-w-fit justify-center">
                {grid.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                        {week.map((level, di) => (
                            <div
                                key={`${wi}-${di}`}
                                className={`w-3 h-3 rounded-[2px] border ${levelColors[level]}`}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
})

// Memoized org card
const OrgCard = memo(function OrgCard({ contribution, index }: { contribution: typeof openSourceContributions[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="bg-black/80 border border-gray-800 rounded-sm p-6 hover:border-green-500/40 transition-all duration-300 group relative overflow-hidden"
        >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Star size={14} className="text-yellow-400" />
                            <span className="text-gray-500 text-xs font-mono uppercase">{contribution.org}</span>
                        </div>
                        <h4 className="text-xl font-bold text-white font-mono group-hover:text-green-400 transition-colors">
                            {contribution.project}
                        </h4>
                    </div>
                    <a
                        href={contribution.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-green-400 transition-colors"
                    >
                        <ExternalLink size={16} />
                    </a>
                </div>

                <p className="text-gray-400 text-sm mb-4 font-mono leading-relaxed">
                    {contribution.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-black/60 border border-gray-800 rounded px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-purple-400 mb-1">
                            <GitPullRequest size={12} />
                        </div>
                        <div className="text-white font-bold text-lg font-mono">{contribution.stats.prs}</div>
                        <div className="text-gray-500 text-[10px] font-mono">PRs</div>
                    </div>
                    <div className="bg-black/60 border border-gray-800 rounded px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                            <GitMerge size={12} />
                        </div>
                        <div className="text-white font-bold text-lg font-mono">{contribution.stats.merged}</div>
                        <div className="text-gray-500 text-[10px] font-mono">Merged</div>
                    </div>
                    <div className="bg-black/60 border border-gray-800 rounded px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1 text-cyan-400 mb-1">
                            <Code size={12} />
                        </div>
                        <div className="text-white font-bold text-lg font-mono">{(contribution.stats.linesAdded / 1000).toFixed(1)}K</div>
                        <div className="text-gray-500 text-[10px] font-mono">Lines</div>
                    </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-1.5">
                    {contribution.languages.map((lang, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-900 border border-gray-700 text-gray-300 text-[10px] font-mono rounded hover:border-green-500/40 hover:text-green-400 transition-colors">
                            {lang}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    )
})

export default function OpenSourceSection() {
    return (
        <div className="w-full">
            {/* Contribution Activity Graph */}
            <Reveal direction="up">
                <div className="bg-black/60 border border-green-500/20 rounded-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <Code size={16} className="text-green-400" />
                            <span className="text-green-400 font-mono text-sm">CONTRIBUTION_ACTIVITY</span>
                        </div>
                        <span className="text-gray-500 text-xs font-mono">Last 20 weeks</span>
                    </div>
                    <ContributionGraph />
                    <div className="flex items-center justify-end gap-2 mt-3 text-[10px] font-mono text-gray-500">
                        <span>Less</span>
                        {[0, 1, 2, 3, 4].map((level) => (
                            <div
                                key={level}
                                className={`w-3 h-3 rounded-[2px] ${level === 0 ? 'bg-gray-900' : level === 1 ? 'bg-green-900/60' : level === 2 ? 'bg-green-700/60' : level === 3 ? 'bg-green-500/70' : 'bg-green-400'}`}
                            />
                        ))}
                        <span>More</span>
                    </div>
                </div>
            </Reveal>

            {/* Organization Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {openSourceContributions.map((contribution, index) => (
                    <OrgCard key={contribution.project} contribution={contribution} index={index} />
                ))}
            </div>
        </div>
    )
}
