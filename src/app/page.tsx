'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Terminal, Server, Database, Code, Cpu, Globe, Shield, Zap, Github, Linkedin } from 'lucide-react'

import ProjectCard from '../components/ProjectCard'
import ExperienceCard from '../components/ExperienceCard'
import InfrastructureScene from '../components/InfrastructureScene'
import TerminalContact from '../components/TerminalContact'
import SkillsRadar from '../components/SkillsRadar'
import StatsCounter from '../components/StatsCounter'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import LoadingAnimation from '../components/LoadingAnimation'
import CustomCursor from '../components/CustomCursor'
import { experiences, projects, additionalProjects } from '../lib/data'

// --- Main Component ---

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [projectFilter, setProjectFilter] = useState<string>('All')

  // Scroll to top on page load and set hash to #home
  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo(0, 0)
    
    // Set the hash to #home if not already set or if it's empty
    if (!window.location.hash || window.location.hash === '#') {
      window.history.replaceState(null, '', '#home')
    }
    
    // Scroll to top after loading animation completes (3 seconds)
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      
      // Also scroll to the home section element if it exists
      const homeSection = document.getElementById('home')
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'instant', block: 'start' })
      }
    }, 3100) // 2.5s loading + 0.5s exit animation + 100ms buffer
    
    return () => clearTimeout(scrollTimer)
  }, [])

  // Get unique technologies for filtering
  const allTechnologies = Array.from(
    new Set(projects.flatMap(p => p.technologies.map(t => t.name)))
  )
  const projectCategories = ['All', ...allTechnologies.slice(0, 8)]

  // Filter projects based on selected technology
  const filteredProjects = projectFilter === 'All'
    ? projects
    : projects.filter(p => p.technologies.some(t => t.name === projectFilter))

  return (
    <div className="bg-transparent text-white overflow-x-hidden min-h-screen font-mono selection:bg-green-500/30 selection:text-green-200">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Animation */}
      <LoadingAnimation />

      {/* Scanline Effect */}
      <div className="scanline" />

      {/* Fixed 3D Infrastructure Background */}
      <InfrastructureScene />

      {/* Fixed Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none z-5" />

      {/* Scrollable Content */}
      <div className="relative z-10">
        
        {/* Header / Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-black/80 backdrop-blur-md border-b border-gray-800">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-xl font-bold tracking-wider flex items-center gap-2 text-green-500">
              <Terminal size={20} />
              <span>~/PORTFOLIO</span>
              <span className="animate-pulse">_</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8 text-sm tracking-wide">
              {['HOME', 'EXPERIENCE', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="hover:text-green-400 transition-colors relative group"
                >
                  <span className="text-gray-500 mr-1 group-hover:text-green-600">./</span>
                  {item}
                </a>
              ))}
              
              <div className="flex items-center gap-4 pl-4 border-l border-gray-800">
                <a 
                  href="https://github.com/DhruvArvindSingh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/dhruv-singh-94340b28a" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                className="text-white hover:text-green-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Code size={24} />
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800 bg-black">
              <div className="flex flex-col space-y-4 pt-4 px-4">
                {['HOME', 'EXPERIENCE', 'SKILLS', 'PROJECTS', 'CONTACT'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-green-400 transition-colors text-sm tracking-wide font-mono"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {`> ${item}`}
                  </a>
                ))}
                
                <div className="flex items-center gap-6 pt-4 border-t border-gray-800 mt-2">
                  <a 
                    href="https://github.com/DhruvArvindSingh" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <Github size={20} />
                    <span className="text-sm">GitHub</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/dhruv-singh-94340b28a" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                  >
                    <Linkedin size={20} />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/20 border border-green-500/30 text-green-400 text-xs mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  SYSTEM ONLINE
                </div>
                
                <h1 className="text-5xl sm:text-7xl font-bold leading-none mb-6 glitch-hover">
                  DHRUV
                  <br />
                  <span className="flex items-center gap-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                      SINGH
                    </span>
                    <a 
                      href="https://github.com/DhruvArvindSingh" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <Github size={48} className="sm:w-16 sm:h-16" />
                    </a>
                  </span>
                </h1>
                
                <div className="text-gray-400 text-lg leading-relaxed max-w-xl border-l-2 border-green-500/50 pl-6">
                  <p className="mb-4">
                    <span className="text-green-500 font-bold">{'>'}</span> Initiating protocol: <span className="text-white">Full Stack & Blockchain Development</span>
                  </p>
                  <p>
                    Architecting decentralized infrastructure and scalable systems. 
                    Obsessed with <span className="text-orange-400">Rust</span>, <span className="text-blue-400">DevOps</span>, and <span className="text-purple-400">Web3</span>.
                  </p>
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="group relative px-8 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-sm transition-all overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                  <span className="relative flex items-center gap-2">
                    <Server size={18} />
                    DEPLOY_VIEW
                  </span>
                </a>
                <a href="https://drive.google.com/file/d/1zTdcamlwRLz3tHJ2A_F6rItFxOTCCSiX/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-green-500/50 text-green-400 hover:bg-green-500/10 transition-all rounded-sm flex items-center gap-2">
                  <Code size={18} />
                  DOWNLOAD_CV
                </a>
              </div>
            </div>

            {/* Hero Visual / Stats */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 blur-3xl rounded-full"></div>
              <div className="relative bg-black/40 backdrop-blur-sm border border-gray-800 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
                  <span className="text-xs text-gray-500">SYSTEM_STATUS</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                
                <div className="space-y-4 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">UPTIME</span>
                    <span className="text-green-400">99.99%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">NODES</span>
                    <span className="text-blue-400">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">BLOCK_HEIGHT</span>
                    <span className="text-purple-400">#8,942,103</span>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-800">
                    <div className="text-xs text-gray-500 mb-2">LATEST_COMMIT</div>
                    <div className="bg-black p-3 rounded border border-gray-800 text-xs text-gray-300">
                      <span className="text-yellow-500">feat:</span> implemented zero-knowledge proof verification layer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-4 mb-16">
              <div className="h-px flex-1 bg-gray-800"></div>
              <h2 className="text-3xl font-bold text-center flex items-center gap-3">
                <Database className="text-purple-500" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  SYSTEM_LOGS
                </span>
              </h2>
              <div className="h-px flex-1 bg-gray-800"></div>
            </div>

            <div className="relative border-l border-gray-800 ml-4 md:ml-0 md:border-none">
              {experiences.map((experience, index) => (
                <ExperienceCard
                  key={index}
                  {...experience}
                  isLeft={index % 2 === 0}
                  revealDelayMs={index * 100}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-black/50 border-y border-gray-900">
          <div className="max-w-7xl mx-auto px-4">
            <StatsCounter />
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Cpu className="text-orange-500" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                  TECH_STACK
                </span>
              </h2>
            </div>
            <SkillsRadar />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-3">
                <Globe className="text-blue-500" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  DEPLOYED_CONTRACTS
                </span>
              </h2>
              
              {/* Filter */}
              <div className="flex flex-wrap justify-center gap-2">
                {projectCategories.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setProjectFilter(tech)}
                    className={`px-4 py-1 text-xs font-mono border transition-all ${
                      projectFilter === tech
                        ? 'bg-green-500 text-black border-green-500 font-bold'
                        : 'bg-black text-gray-400 border-gray-800 hover:border-green-500/50'
                    }`}
                  >
                    [{tech.toUpperCase()}]
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={index}
                  index={index}
                  {...project}
                  isLeft={index % 2 === 0}
                  revealDelayMs={index * 100}
                />
              ))}

              {showAllProjects && additionalProjects.map((project, index) => (
                <ProjectCard
                  key={index + projects.length}
                  index={index + projects.length}
                  {...project}
                  isLeft={(index + projects.length) % 2 === 0}
                  revealDelayMs={(index + projects.length) * 100}
                />
              ))}
            </div>

            <div className="text-center mt-16">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="px-6 py-2 border border-gray-700 text-gray-300 hover:border-green-500 hover:text-green-400 transition-colors text-sm font-mono"
              >
                {showAllProjects ? '< COLLAPSE_ARCHIVE />' : '< LOAD_MORE_DATA />'}
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 bg-black/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                <Shield className="text-pink-500" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                  PEER_REVIEWS
                </span>
              </h2>
            </div>
            <Testimonials />
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <Newsletter />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                <Zap className="text-yellow-500" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  ESTABLISH_UPLINK
                </span>
              </h2>
              <p className="text-gray-400 font-mono">
                Secure channel ready. Awaiting transmission...
              </p>
            </div>

            <TerminalContact />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-gray-900 bg-black text-center text-gray-600 text-xs font-mono">
          <p>
            Running on Next.js v15.3.3 | Node v20.x | <span className="text-green-500">System Stable</span>
          </p>
          <p className="mt-2">
            © 2025 Dhruv Singh. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}
