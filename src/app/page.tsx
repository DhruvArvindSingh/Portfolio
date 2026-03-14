'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Server, Database, Code, Cpu, Globe, Shield, Zap, Github, Linkedin, ChevronDown, GitBranch, Container, Layers, ArrowUpRight, Heart } from 'lucide-react'

import ProjectCard from '../components/ProjectCard'
import ExperienceCard from '../components/ExperienceCard'
import StatsCounter from '../components/StatsCounter'
import Testimonials from '../components/Testimonials'
import LoadingAnimation from '../components/LoadingAnimation'
import CustomCursor from '../components/CustomCursor'
import { experiences, projects, additionalProjects } from '../lib/data'

// Dynamic imports for heavy components - reduces initial bundle by ~200KB
const InfrastructureScene = dynamic(() => import('../components/InfrastructureScene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-[#050505]" />,
})
const SkillsRadar = dynamic(() => import('../components/SkillsRadar'), {
  ssr: false,
  loading: () => <div className="h-96 bg-black/60 border border-gray-800 rounded-sm animate-pulse" />,
})
const HomelabStatus = dynamic(() => import('../components/HomelabStatus'), {
  ssr: false,
  loading: () => <div className="h-64 bg-black/60 border border-gray-800 rounded-sm animate-pulse" />,
})
const OpenSourceSection = dynamic(() => import('../components/OpenSourceSection'), {
  ssr: false,
  loading: () => <div className="h-64 bg-black/60 border border-gray-800 rounded-sm animate-pulse" />,
})
const TerminalContact = dynamic(() => import('../components/TerminalContact'), {
  ssr: false,
  loading: () => <div className="h-96 bg-black/60 border border-gray-800 rounded-sm animate-pulse" />,
})

// Typing effect hook
function useTypingEffect(texts: string[], typingSpeed = 80, deletingSpeed = 40, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullText = texts[textIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentFullText.length) {
          setDisplayText(currentFullText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentFullText.slice(0, displayText.length - 1))
        } else {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration])

  return displayText
}

// Active section tracking hook — single observer for all sections
function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    // Single observer for all sections (more efficient than one per section)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}

// Section Heading Component
function SectionHeading({ icon, title, color }: { icon: React.ReactNode; title: string; color: string }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-800"></div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center flex items-center gap-3 font-mono">
        {icon}
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${color}`}>
          {title}
        </span>
      </h2>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-800"></div>
    </div>
  )
}

const NAV_ITEMS = ['HOME', 'EXPERIENCE', 'OPENSOURCE', 'SKILLS', 'PROJECTS', 'HOMELAB', 'CONTACT']
const sectionIds = ['home', 'experience', 'opensource', 'skills', 'projects', 'homelab', 'contact']

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [projectFilter, setProjectFilter] = useState<string>('All')
  const [isScrolled, setIsScrolled] = useState(false)
  const activeSection = useActiveSection(sectionIds)

  const typingText = useTypingEffect([
    'DevOps Engineer',
    'Blockchain Developer',
    'Open Source Contributor',
    'Infrastructure Architect',
    'Cloud Native Enthusiast',
  ], 90, 50, 1800)

  // Optimized scroll handler — only tracks a boolean (scrolled past threshold)
  // instead of storing exact scrollY which caused re-renders on every pixel
  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0)
    if (!window.location.hash || window.location.hash === '#') {
      window.history.replaceState(null, '', '#home')
    }
    const scrollTimer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
      const homeSection = document.getElementById('home')
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: 'instant', block: 'start' })
      }
    }, 4200)
    return () => clearTimeout(scrollTimer)
  }, [])

  // Memoize computed project data to avoid recalculating on every render
  const projectCategories = useMemo(() => {
    const allTechnologies = Array.from(
      new Set(projects.flatMap(p => p.technologies.map(t => t.name)))
    )
    return ['All', ...allTechnologies.slice(0, 8)]
  }, [])

  const filteredProjects = useMemo(
    () => projectFilter === 'All'
      ? projects
      : projects.filter(p => p.technologies.some(t => t.name === projectFilter)),
    [projectFilter]
  )

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), [])

  return (
    <div className="bg-transparent text-white overflow-x-hidden min-h-screen font-mono selection:bg-green-500/30 selection:text-green-200">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Loading Animation (Boot Sequence) */}
      <LoadingAnimation />

      {/* Scanline Effect */}
      <div className="scanline" />

      {/* Fixed 3D Infrastructure Background */}
      <InfrastructureScene />

      {/* Fixed Gradient Overlay — no backdrop-blur for performance */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none z-[1]" />

      {/* Grid Background Pattern — reduced opacity */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-[2] opacity-30" />

      {/* Scrollable Content */}
      <div className="relative z-10">

        {/* ====== HEADER / NAVIGATION ====== */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/90 backdrop-blur-lg border-b border-green-500/10' : 'bg-black/60 backdrop-blur-md border-b border-gray-800/50'}`}>
          <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
            <a href="#home" className="text-lg font-bold tracking-wider flex items-center gap-2 text-green-500 hover:text-green-400 transition-colors group">
              <Terminal size={18} className="group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">~/Dhruv</span>
              <span className="sm:hidden">~/ds</span>
              <span className="animate-pulse text-green-400">_</span>
            </a>

            <div className="hidden lg:flex items-center space-x-1 text-xs tracking-wide">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative px-3 py-1.5 transition-all duration-200 rounded-sm ${
                    activeSection === item.toLowerCase()
                      ? 'text-green-400 bg-green-500/10'
                      : 'text-gray-400 hover:text-green-400 hover:bg-green-500/5'
                  }`}
                >
                  {activeSection === item.toLowerCase() && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-green-500/10 border border-green-500/20 rounded-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1">
                    <span className="text-gray-600 text-[10px]">./</span>
                    {item}
                  </span>
                </a>
              ))}

              <div className="flex items-center gap-3 pl-3 ml-2 border-l border-gray-800">
                <a
                  href="https://github.com/DhruvArvindSingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors p-1"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://linkedin.com/in/dhruv-singh-94340b28a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-400 transition-colors p-1"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden text-white hover:text-green-400 transition-colors p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`block h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-current transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden overflow-hidden border-t border-gray-800 bg-black/95 backdrop-blur-lg"
              >
                <div className="flex flex-col space-y-1 p-4">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`px-4 py-2.5 rounded text-sm tracking-wide font-mono transition-colors ${
                        activeSection === item.toLowerCase()
                          ? 'text-green-400 bg-green-500/10'
                          : 'text-gray-400 hover:text-green-400 hover:bg-green-500/5'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      <span className="text-gray-600 mr-2">&gt;</span>
                      {item}
                    </a>
                  ))}

                  <div className="flex items-center gap-6 pt-3 mt-2 border-t border-gray-800 px-4">
                    <a
                      href="https://github.com/DhruvArvindSingh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <Github size={18} />
                      <span className="text-xs">GitHub</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/dhruv-singh-94340b28a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2"
                    >
                      <Linkedin size={18} />
                      <span className="text-xs">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* ====== HERO SECTION ====== */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20 relative">
          <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left: Hero Text */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Status Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-900/20 border border-green-500/30 text-green-400 text-xs mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  ALL SYSTEMS OPERATIONAL
                </div>

                {/* Name */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] mb-6 tracking-tighter">
                  <span className="text-white glitch-text">DHRUV</span>
                  <br />
                  <span className="flex items-center gap-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-500">
                      SINGH
                    </span>
                    <a
                      href="https://github.com/DhruvArvindSingh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-white transition-colors"
                    >
                      <Github size={36} className="sm:w-12 sm:h-12" />
                    </a>
                  </span>
                </h1>

                {/* Typing Effect Role */}
                <div className="flex items-center gap-2 text-lg sm:text-xl text-green-400 mb-6 font-mono">
                  <span className="text-gray-600">&gt;</span>
                  <span>{typingText}</span>
                  <span className="typing-cursor">&nbsp;</span>
                </div>

                {/* Description */}
                <div className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl border-l-2 border-green-500/40 pl-5 space-y-3">
                  <p>
                    Architecting <span className="text-blue-400">cloud-native infrastructure</span> and <span className="text-purple-400">decentralized systems</span>.
                  </p>
                  <p>
                    Open source contributor to <span className="text-cyan-400">CNCF</span> &amp; <span className="text-pink-400">stdlib</span>.
                    Running a <span className="text-green-400">2-node homelab</span> with self-hosted services.
                  </p>
                  <p>
                    Obsessed with <span className="text-orange-400">Rust</span>, <span className="text-blue-400">Kubernetes</span>, <span className="text-purple-400">Solidity</span>, and <span className="text-green-400">Go</span>.
                  </p>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                <a href="#projects" className="group relative px-6 py-3 bg-green-600 hover:bg-green-500 text-black font-bold rounded-sm transition-all overflow-hidden text-sm">
                  <div className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
                  <span className="relative flex items-center gap-2">
                    <Layers size={16} />
                    VIEW_PROJECTS
                  </span>
                </a>
                <a href="#homelab" className="px-6 py-3 border border-green-500/40 text-green-400 hover:bg-green-500/10 transition-all rounded-sm flex items-center gap-2 text-sm">
                  <Server size={16} />
                  HOMELAB
                </a>
                <a href="https://drive.google.com/file/d/1zTdcamlwRLz3tHJ2A_F6rItFxOTCCSiX/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="px-6 py-3 border border-gray-700 text-gray-400 hover:border-green-500/40 hover:text-green-400 transition-all rounded-sm flex items-center gap-2 text-sm">
                  <ArrowUpRight size={16} />
                  RESUME
                </a>
              </motion.div>

              {/* Quick Links Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap items-center gap-3 text-[10px] text-gray-500 font-mono pt-4"
              >
                <span className="flex items-center gap-1">
                  <GitBranch size={10} />
                  CNCF/kgateway
                </span>
                <span className="text-gray-700">|</span>
                <span className="flex items-center gap-1">
                  <Code size={10} />
                  stdlib-js/stdlib
                </span>
                <span className="text-gray-700">|</span>
                <span className="flex items-center gap-1">
                  <Container size={10} />
                  2-node homelab
                </span>
              </motion.div>
            </div>

            {/* Right: System Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-cyan-500/5 blur-3xl rounded-full"></div>
              <div className="relative bg-black/70 backdrop-blur-md border border-green-500/20 p-5 rounded-sm font-mono text-sm">
                {/* Terminal Header */}
                <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-[10px] text-gray-600">dhruv@homelab — system_status</span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Cluster Status */}
                  <div className="bg-black/50 border border-gray-800 rounded p-3">
                    <div className="text-gray-500 text-[10px] mb-2 uppercase">Cluster Status</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-gray-400">node-01</span>
                        <span className="text-green-400 ml-auto">3GB</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-gray-400">node-02</span>
                        <span className="text-green-400 ml-auto">4GB</span>
                      </div>
                    </div>
                  </div>

                  {/* Running Services */}
                  <div className="bg-black/50 border border-gray-800 rounded p-3">
                    <div className="text-gray-500 text-[10px] mb-2 uppercase">Active Services</div>
                    <div className="space-y-1">
                      {['minio-s3', 'nginx-proxy', 'web-hosting', 'docker-engine', 'monitoring'].map((svc) => (
                        <div key={svc} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-green-500"></span>
                            <span className="text-gray-300">{svc}</span>
                          </div>
                          <span className="text-green-400/60">running</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-black/50 border border-gray-800 rounded p-3">
                    <div className="text-gray-500 text-[10px] mb-2 uppercase">Latest Commit</div>
                    <div className="text-gray-400">
                      <span className="text-yellow-500">feat:</span> contribute to kgateway CNCF project
                    </div>
                    <div className="text-gray-600 text-[10px] mt-1">
                      kgateway-dev/kgateway — main
                    </div>
                  </div>

                  {/* Network */}
                  <div className="flex justify-between items-center text-[10px] pt-2 border-t border-gray-800 text-gray-500">
                    <span>UPTIME: <span className="text-green-400">99.9%</span></span>
                    <span>CONTAINERS: <span className="text-cyan-400">8</span></span>
                    <span>PEERS: <span className="text-purple-400">12</span></span>
                  </div>
                </div>

                {/* Decorative Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-green-500/50" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-green-500/50" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-green-500/50" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-green-500/50" />
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest">scroll</span>
            <ChevronDown size={16} className="animate-bounce" />
          </motion.div>
        </section>

        {/* Section Divider */}
        <div className="section-divider" />

        {/* ====== EXPERIENCE SECTION ====== */}
        <section id="experience" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              icon={<Database className="text-purple-500" size={24} />}
              title="SYSTEM_LOGS"
              color="from-purple-400 to-pink-400"
            />

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

        <div className="section-divider" />

        {/* ====== OPEN SOURCE SECTION ====== */}
        <section id="opensource" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              icon={<GitBranch className="text-green-500" size={24} />}
              title="OPEN_SOURCE"
              color="from-green-400 to-cyan-400"
            />
            <OpenSourceSection />
          </div>
        </section>

        <div className="section-divider" />

        {/* ====== STATS SECTION ====== */}
        <section className="py-20 bg-black/40">
          <div className="max-w-7xl mx-auto px-4">
            <StatsCounter />
          </div>
        </section>

        <div className="section-divider" />

        {/* ====== SKILLS SECTION ====== */}
        <section id="skills" className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              icon={<Cpu className="text-orange-500" size={24} />}
              title="TECH_STACK"
              color="from-orange-400 to-red-400"
            />
            <SkillsRadar />
          </div>
        </section>

        <div className="section-divider" />

        {/* ====== PROJECTS SECTION ====== */}
        <section id="projects" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              icon={<Globe className="text-blue-500" size={24} />}
              title="DEPLOYED_CONTRACTS"
              color="from-cyan-400 to-blue-500"
            />

            {/* Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12 -mt-8">
              {projectCategories.map((tech) => (
                <button
                  key={tech}
                  onClick={() => setProjectFilter(tech)}
                  className={`px-3 py-1 text-xs font-mono border transition-all rounded-sm ${
                    projectFilter === tech
                      ? 'bg-green-500 text-black border-green-500 font-bold'
                      : 'bg-black/60 text-gray-400 border-gray-800 hover:border-green-500/50 hover:text-green-400'
                  }`}
                >
                  [{tech.toUpperCase()}]
                </button>
              ))}
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
                className="px-6 py-2.5 border border-gray-700 text-gray-300 hover:border-green-500 hover:text-green-400 transition-all text-xs font-mono rounded-sm hover:bg-green-500/5"
              >
                {showAllProjects ? '< COLLAPSE_ARCHIVE />' : '< LOAD_MORE_DATA />'}
              </button>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ====== HOMELAB SECTION ====== */}
        <section id="homelab" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              icon={<Server className="text-green-500" size={24} />}
              title="HOMELAB_INFRA"
              color="from-green-400 to-emerald-400"
            />

            <p className="text-center text-gray-400 text-sm max-w-2xl mx-auto mb-12 -mt-8 font-mono">
              Self-hosted infrastructure running on a 2-node cluster — a repurposed Dell laptop (3GB) and a desktop CPU (4GB) — hosting S3 storage, websites, cloud services, and more.
            </p>

            <HomelabStatus />
          </div>
        </section>

        <div className="section-divider" />

        {/* ====== TESTIMONIALS ====== */}
        <section id="testimonials" className="py-24">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              icon={<Shield className="text-pink-500" size={24} />}
              title="PEER_REVIEWS"
              color="from-pink-400 to-rose-400"
            />
            <Testimonials />
          </div>
        </section>

        <div className="section-divider" />

        {/* ====== CONTACT SECTION ====== */}
        <section id="contact" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeading
              icon={<Zap className="text-yellow-500" size={24} />}
              title="ESTABLISH_UPLINK"
              color="from-yellow-400 to-orange-500"
            />
            <p className="text-center text-gray-400 text-sm max-w-xl mx-auto mb-12 -mt-8 font-mono">
              Secure channel ready. Type <span className="text-green-400">contact</span> to initiate transmission.
            </p>
            <TerminalContact />
          </div>
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="border-t border-gray-900 bg-black/95">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Top Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-800/50">
              {/* Branding */}
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-green-500" />
                <span className="text-green-500 font-bold text-sm font-mono">~/dhruv-singh</span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Homelab Online
                </span>
                <span>|</span>
                <span>2 Nodes Active</span>
                <span>|</span>
                <span>6 Services Running</span>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-end gap-4">
                <a href="https://github.com/DhruvArvindSingh" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                  <Github size={16} />
                </a>
                <a href="https://linkedin.com/in/dhruv-singh-94340b28a" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="https://x.com/dhruvsingh17991" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors text-xs font-bold">
                  𝕏
                </a>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-gray-600">
              <p>
                Built with Next.js 15 &middot; Three.js &middot; Tailwind CSS &middot; Self-hosted on homelab
              </p>
              <p className="flex items-center gap-1">
                &copy; {new Date().getFullYear()} Dhruv Singh &middot; Made with <Heart size={10} className="text-red-500" /> and lots of <span className="text-green-500">caffeine</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
