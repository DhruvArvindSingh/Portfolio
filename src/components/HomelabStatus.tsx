'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { Server, HardDrive, Wifi, Activity, Database, Globe, Shield, Container } from 'lucide-react'
import { homelabNodes, homelabServices } from '../lib/data'
import Reveal from './Reveal'

function PulsingDot({ color = 'green' }: { color?: string }) {
    return (
        <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-${color}-400 opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 bg-${color}-500`}></span>
        </span>
    )
}

// Memoized node card - only re-renders when props change
const NodeCard = memo(function NodeCard({ node, index }: { node: typeof homelabNodes[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="bg-black/80 backdrop-blur-md border border-green-500/20 rounded-sm p-6 hover:border-green-500/50 transition-all duration-300 group"
        >
            {/* Node Header */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 border border-green-500/30 rounded">
                        {index === 0 ? <HardDrive size={18} className="text-green-400" /> : <Server size={18} className="text-green-400" />}
                    </div>
                    <div>
                        <h4 className="text-white font-mono font-bold text-sm">{node.name}</h4>
                        <p className="text-gray-500 text-xs font-mono">{node.type}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <PulsingDot />
                    <span className="text-green-400 text-xs font-mono uppercase">Online</span>
                </div>
            </div>

            {/* Node Stats */}
            <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">HOSTNAME</span>
                    <span className="text-cyan-400">{node.hostname}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">RAM</span>
                    <span className="text-yellow-400">{node.ram}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">OS</span>
                    <span className="text-blue-400">{node.os}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">NETWORK</span>
                    <span className="text-gray-400">{node.ip}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500">UPTIME</span>
                    <span className="text-green-400">{node.uptime}</span>
                </div>

                {/* Services */}
                <div className="mt-4 pt-3 border-t border-gray-800">
                    <div className="text-gray-500 mb-2">RUNNING_SERVICES</div>
                    <div className="flex flex-wrap gap-1.5">
                        {node.services.map((service, i) => (
                            <span key={i} className="px-2 py-0.5 bg-green-900/20 border border-green-500/20 text-green-400 rounded text-[10px]">
                                {service}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    )
})

const serviceIconMap: Record<string, React.ReactNode> = {
    bucket: <Database size={14} />,
    cloud: <Activity size={14} />,
    globe: <Globe size={14} />,
    shield: <Shield size={14} />,
    container: <Container size={14} />,
    chart: <Activity size={14} />,
}

export default function HomelabStatus() {
    return (
        <div className="w-full">
            {/* Network Topology Visualization */}
            <Reveal direction="up">
                <div className="bg-black/60 border border-green-500/20 rounded-sm p-6 mb-8">
                    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-800">
                        <Wifi size={16} className="text-green-400" />
                        <span className="text-green-400 font-mono text-sm">NETWORK_TOPOLOGY</span>
                        <span className="text-gray-600 text-xs font-mono ml-auto">LAN: 192.168.1.0/24</span>
                    </div>

                    {/* ASCII-style network diagram */}
                    <div className="font-mono text-xs text-center space-y-2 text-gray-400 overflow-x-auto">
                        <div className="text-green-400">┌─────────────────────────────┐</div>
                        <div className="text-green-400">│   <span className="text-white">INTERNET</span> <span className="text-cyan-400">(ISP Gateway)</span>    │</div>
                        <div className="text-green-400">└──────────────┬──────────────┘</div>
                        <div className="text-green-500">               │</div>
                        <div className="text-green-500">         <span className="text-yellow-400">[ Router ]</span></div>
                        <div className="text-green-500">          ┌────┴────┐</div>
                        <div className="text-green-500">          │         │</div>
                        <div className="flex justify-center gap-8 sm:gap-16">
                            <div className="text-center">
                                <div className="text-cyan-400">┌──────────┐</div>
                                <div className="text-cyan-400">│ <span className="text-white">node-01</span>  │</div>
                                <div className="text-cyan-400">│ <span className="text-gray-500">Dell 3GB</span> │</div>
                                <div className="text-cyan-400">│ <span className="text-green-400">● Online</span> │</div>
                                <div className="text-cyan-400">└──────────┘</div>
                            </div>
                            <div className="text-center">
                                <div className="text-purple-400">┌──────────┐</div>
                                <div className="text-purple-400">│ <span className="text-white">node-02</span>  │</div>
                                <div className="text-purple-400">│ <span className="text-gray-500">CPU  4GB</span> │</div>
                                <div className="text-purple-400">│ <span className="text-green-400">● Online</span> │</div>
                                <div className="text-purple-400">└──────────┘</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

            {/* Node Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {homelabNodes.map((node, index) => (
                    <NodeCard key={node.name} node={node} index={index} />
                ))}
            </div>

            {/* Services Grid */}
            <Reveal direction="up" delayMs={200}>
                <div className="bg-black/60 border border-green-500/20 rounded-sm p-6">
                    <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-800">
                        <Activity size={16} className="text-green-400" />
                        <span className="text-green-400 font-mono text-sm">ACTIVE_SERVICES</span>
                        <span className="text-green-400 text-xs font-mono ml-auto">{homelabServices.length} running</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {homelabServices.map((service, i) => (
                            <motion.div
                                key={service.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 bg-black/40 border border-gray-800 rounded px-3 py-2.5 hover:border-green-500/30 transition-colors group"
                            >
                                <div className="text-green-400 group-hover:text-green-300 transition-colors">
                                    {serviceIconMap[service.icon] || <Server size={14} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-white text-xs font-mono truncate">{service.name}</div>
                                    <div className="text-gray-500 text-[10px] font-mono">{service.node}</div>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    <span className="text-green-400 text-[10px] font-mono uppercase">{service.status}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Reveal>
        </div>
    )
}
