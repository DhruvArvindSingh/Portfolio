'use client'

import { useEffect, useState } from 'react'

// Client-side only Brain3D import
const Brain3DClientOnly = () => {
  const [Brain3D, setBrain3D] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Dynamic import only on client side
    import('../components/Brain3D').then((module) => {
      setBrain3D(() => module.default)
    })
  }, [])

  if (!Brain3D) {
    return <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900" />
  }

  return <Brain3D />
}

export default function Home() {
  return (
    <div className="bg-black text-white overflow-x-hidden min-h-screen" suppressHydrationWarning>
      {/* Fixed 3D Brain Background */}
      <div className="fixed inset-0 z-0">
        <Brain3DClientOnly />
      </div>

      {/* Fixed Gradient Overlay for better text readability */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/50 via-transparent to-black/30 pointer-events-none z-5" />

      {/* Scrollable Content */}
      <div className="relative z-10">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 lg:p-8 bg-black/20 backdrop-blur-sm">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="text-lg sm:text-xl font-bold tracking-wider">
              PORTFOLIO
            </div>
            <div className="hidden md:flex space-x-4 lg:space-x-8 text-sm tracking-wide">
              <a href="#hero" className="hover:text-purple-400 transition-colors">
                HOME
              </a>
              <a href="#experience" className="hover:text-purple-400 transition-colors">
                EXPERIENCE
              </a>
              <a href="#projects" className="hover:text-purple-400 transition-colors">
                PROJECTS
              </a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">
                CONTACT
              </a>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
          <div className="max-w-7xl w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                <div>
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none mb-4">
                    CREATIVE
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      DEVELOPER
                    </span>
                  </h1>
                  <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                    Crafting immersive digital experiences with cutting-edge technology.
                    Passionate about interactive design, 3D graphics, and pushing the boundaries
                    of web development.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#projects" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-center">
                    View My Work
                  </a>
                  <a href="#contact" className="border border-gray-600 hover:border-purple-400 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-purple-400/10 text-center">
                    Get In Touch
                  </a>
                </div>
              </div>

              {/* Interactive Area */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-sm text-gray-400 tracking-wider">
                    MOVE YOUR CURSOR
                  </div>
                  <div className="text-xs text-gray-500 max-w-xs">
                    Watch the brain respond to your movement.
                    Built with Three.js and React Three Fiber.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl w-full mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  EXPERIENCE
                </span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
                My journey through the world of technology and innovation
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line - Center on desktop, left on mobile */}
              <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500"></div>

              {/* Experience Items */}
              <div className="space-y-8 md:space-y-16">
                {/* Experience 1 */}
                <div className="flex items-start md:items-center md:justify-between">
                  {/* Mobile/Tablet Layout */}
                  <div className="md:hidden flex items-start w-full">
                    <div className="relative z-10 w-6 h-6 bg-purple-500 rounded-full border-4 border-black mt-2 mr-6 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-1">Senior Full Stack Developer</h3>
                            <p className="text-gray-300 mb-2">TechCorp Solutions</p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="bg-purple-500/20 rounded-full px-3 py-1 text-xs text-purple-400">
                              2023 - Present
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Led development of scalable web applications using React, Node.js, and cloud technologies.</p>
                        <a href="#" className="text-purple-400 hover:text-purple-300 text-sm underline">View Details →</a>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-2">Senior Full Stack Developer</h3>
                        <p className="text-gray-300 mb-2">TechCorp Solutions</p>
                        <p className="text-sm text-gray-400 mb-4">Led development of scalable web applications using React, Node.js, and cloud technologies.</p>
                        <a href="#" className="text-purple-400 hover:text-purple-300 text-sm underline">View Details →</a>
                      </div>
                    </div>
                    <div className="relative z-10 w-6 h-6 bg-purple-500 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 pl-8">
                      <div className="text-sm text-gray-400">
                        <div className="bg-purple-500/20 rounded-full px-4 py-2 inline-block">
                          2023 - Present
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience 2 */}
                <div className="flex items-start md:items-center md:justify-between">
                  {/* Mobile/Tablet Layout */}
                  <div className="md:hidden flex items-start w-full">
                    <div className="relative z-10 w-6 h-6 bg-pink-500 rounded-full border-4 border-black mt-2 mr-6 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-pink-400 mb-1">Frontend Developer</h3>
                            <p className="text-gray-300 mb-2">Digital Innovations Inc.</p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="bg-pink-500/20 rounded-full px-3 py-1 text-xs text-pink-400">
                              2021 - 2023
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Specialized in creating interactive user interfaces and 3D web experiences using Three.js and WebGL.</p>
                        <a href="#" className="text-pink-400 hover:text-pink-300 text-sm underline">View Details →</a>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <div className="text-sm text-gray-400">
                        <div className="bg-pink-500/20 rounded-full px-4 py-2 inline-block">
                          2021 - 2023
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 w-6 h-6 bg-pink-500 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 pl-8">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold text-pink-400 mb-2">Frontend Developer</h3>
                        <p className="text-gray-300 mb-2">Digital Innovations Inc.</p>
                        <p className="text-sm text-gray-400 mb-4">Specialized in creating interactive user interfaces and 3D web experiences using Three.js and WebGL.</p>
                        <a href="#" className="text-pink-400 hover:text-pink-300 text-sm underline">View Details →</a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Experience 3 */}
                <div className="flex items-start md:items-center md:justify-between">
                  {/* Mobile/Tablet Layout */}
                  <div className="md:hidden flex items-start w-full">
                    <div className="relative z-10 w-6 h-6 bg-blue-500 rounded-full border-4 border-black mt-2 mr-6 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-1">Junior Developer</h3>
                            <p className="text-gray-300 mb-2">StartupTech</p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="bg-blue-500/20 rounded-full px-3 py-1 text-xs text-blue-400">
                              2019 - 2021
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Built responsive web applications and gained expertise in modern JavaScript frameworks.</p>
                        <a href="#" className="text-blue-400 hover:text-blue-300 text-sm underline">View Details →</a>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold text-blue-400 mb-2">Junior Developer</h3>
                        <p className="text-gray-300 mb-2">StartupTech</p>
                        <p className="text-sm text-gray-400 mb-4">Built responsive web applications and gained expertise in modern JavaScript frameworks.</p>
                        <a href="#" className="text-blue-400 hover:text-blue-300 text-sm underline">View Details →</a>
                      </div>
                    </div>
                    <div className="relative z-10 w-6 h-6 bg-blue-500 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 pl-8">
                      <div className="text-sm text-gray-400">
                        <div className="bg-blue-500/20 rounded-full px-4 py-2 inline-block">
                          2019 - 2021
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-black/40 backdrop-blur-sm">
          <div className="max-w-7xl w-full mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  PROJECTS
                </span>
              </h2>
              <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
                Showcasing innovative solutions and creative implementations
              </p>
            </div>

            {/* Projects Timeline */}
            <div className="relative">
              {/* Timeline Line - Center on desktop, left on mobile */}
              <div className="absolute left-6 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 to-purple-500"></div>

              {/* Project Items */}
              <div className="space-y-8 md:space-y-16">
                {/* Project 1 */}
                <div className="flex items-start md:items-center md:justify-between">
                  {/* Mobile/Tablet Layout */}
                  <div className="md:hidden flex items-start w-full">
                    <div className="relative z-10 w-6 h-6 bg-cyan-500 rounded-full border-4 border-black mt-2 mr-6 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-1">3D Interactive Portfolio</h3>
                            <p className="text-gray-300 mb-2">Personal Project</p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="bg-cyan-500/20 rounded-full px-3 py-1 text-xs text-cyan-400">
                              2024
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Built with Three.js, React Three Fiber, and Next.js. Features interactive 3D brain model with dynamic animations.</p>
                        <div className="flex gap-2 text-xs mb-4 flex-wrap">
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Three.js</span>
                          <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">React</span>
                          <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded">Next.js</span>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                          <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm underline">Live Demo →</a>
                          <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm underline">GitHub →</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                        <h3 className="text-xl font-bold text-cyan-400 mb-2">3D Interactive Portfolio</h3>
                        <p className="text-gray-300 mb-2">Personal Project</p>
                        <p className="text-sm text-gray-400 mb-4">Built with Three.js, React Three Fiber, and Next.js. Features interactive 3D brain model with dynamic animations.</p>
                        <div className="flex gap-2 text-xs mb-4 justify-end">
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Three.js</span>
                          <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">React</span>
                          <span className="bg-pink-500/20 text-pink-400 px-2 py-1 rounded">Next.js</span>
                        </div>
                        <div className="flex gap-4 justify-end">
                          <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm underline">Live Demo →</a>
                          <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm underline">GitHub →</a>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 w-6 h-6 bg-cyan-500 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 pl-8">
                      <div className="text-sm text-gray-400">
                        <div className="bg-cyan-500/20 rounded-full px-4 py-2 inline-block">
                          2024
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="flex items-start md:items-center md:justify-between">
                  {/* Mobile/Tablet Layout */}
                  <div className="md:hidden flex items-start w-full">
                    <div className="relative z-10 w-6 h-6 bg-emerald-500 rounded-full border-4 border-black mt-2 mr-6 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-emerald-400 mb-1">E-Commerce Platform</h3>
                            <p className="text-gray-300 mb-2">Client Project</p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="bg-emerald-500/20 rounded-full px-3 py-1 text-xs text-emerald-400">
                              2023
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Full-stack e-commerce solution with advanced analytics, payment integration, and real-time inventory management.</p>
                        <div className="flex gap-2 text-xs mb-4 flex-wrap">
                          <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">React</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Node.js</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">MongoDB</span>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                          <a href="#" className="text-emerald-400 hover:text-emerald-300 text-sm underline">Live Demo →</a>
                          <a href="#" className="text-emerald-400 hover:text-emerald-300 text-sm underline">Case Study →</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <div className="text-sm text-gray-400">
                        <div className="bg-emerald-500/20 rounded-full px-4 py-2 inline-block">
                          2023
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 w-6 h-6 bg-emerald-500 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 pl-8">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                        <h3 className="text-xl font-bold text-emerald-400 mb-2">E-Commerce Platform</h3>
                        <p className="text-gray-300 mb-2">Client Project</p>
                        <p className="text-sm text-gray-400 mb-4">Full-stack e-commerce solution with advanced analytics, payment integration, and real-time inventory management.</p>
                        <div className="flex gap-2 text-xs mb-4">
                          <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded">React</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Node.js</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">MongoDB</span>
                        </div>
                        <div className="flex gap-4">
                          <a href="#" className="text-emerald-400 hover:text-emerald-300 text-sm underline">Live Demo →</a>
                          <a href="#" className="text-emerald-400 hover:text-emerald-300 text-sm underline">Case Study →</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project 3 */}
                <div className="flex items-start md:items-center md:justify-between">
                  {/* Mobile/Tablet Layout */}
                  <div className="md:hidden flex items-start w-full">
                    <div className="relative z-10 w-6 h-6 bg-orange-500 rounded-full border-4 border-black mt-2 mr-6 flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-orange-400 mb-1">AR Visualization App</h3>
                            <p className="text-gray-300 mb-2">Innovation Lab</p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="bg-orange-500/20 rounded-full px-3 py-1 text-xs text-orange-400">
                              2022
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4">Augmented reality application for product visualization using WebXR and machine learning for object recognition.</p>
                        <div className="flex gap-2 text-xs mb-4 flex-wrap">
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">WebXR</span>
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">TensorFlow.js</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">WebGL</span>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                          <a href="#" className="text-orange-400 hover:text-orange-300 text-sm underline">Live Demo →</a>
                          <a href="#" className="text-orange-400 hover:text-orange-300 text-sm underline">GitHub →</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                        <h3 className="text-xl font-bold text-orange-400 mb-2">AR Visualization App</h3>
                        <p className="text-gray-300 mb-2">Innovation Lab</p>
                        <p className="text-sm text-gray-400 mb-4">Augmented reality application for product visualization using WebXR and machine learning for object recognition.</p>
                        <div className="flex gap-2 text-xs mb-4 justify-end">
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">WebXR</span>
                          <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">TensorFlow.js</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">WebGL</span>
                        </div>
                        <div className="flex gap-4 justify-end">
                          <a href="#" className="text-orange-400 hover:text-orange-300 text-sm underline">Live Demo →</a>
                          <a href="#" className="text-orange-400 hover:text-orange-300 text-sm underline">GitHub →</a>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 w-6 h-6 bg-orange-500 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 pl-8">
                      <div className="text-sm text-gray-400">
                        <div className="bg-orange-500/20 rounded-full px-4 py-2 inline-block">
                          2022
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-black/40 backdrop-blur-sm">
          <div className="max-w-5xl w-full mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                GET IN TOUCH
              </span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Ready to bring your ideas to life? Let's collaborate and create something amazing together.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="text-purple-400 text-2xl mb-4">📧</div>
                <h3 className="text-base sm:text-lg font-bold mb-2">Email</h3>
                <a href="mailto:contact@example.com" className="text-gray-300 hover:text-purple-400 transition-colors text-sm sm:text-base break-all">
                  contact@example.com
                </a>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                <div className="text-pink-400 text-2xl mb-4">💼</div>
                <h3 className="text-base sm:text-lg font-bold mb-2">LinkedIn</h3>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  /in/yourprofile
                </a>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 sm:col-span-2 md:col-span-1">
                <div className="text-cyan-400 text-2xl mb-4">🐱</div>
                <h3 className="text-base sm:text-lg font-bold mb-2">GitHub</h3>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm sm:text-base">
                  /yourusername
                </a>
              </div>
            </div>

            <div className="text-sm text-gray-400">
              © 2024 Portfolio. All rights reserved.
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
