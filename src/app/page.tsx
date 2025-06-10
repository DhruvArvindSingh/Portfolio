'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

// Client-side only Brain3D import
const Brain3DClientOnly = () => {
  const [Brain3D, setBrain3D] = useState<React.ComponentType | null>(null)

  useEffect(() => {
    // Dynamic import only on client side`
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
              EDITABLE PORTFOLIO
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
              <button
                className="text-white hover:text-purple-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-600/30">
              <div className="flex flex-col space-y-4 pt-4">
                <a
                  href="#hero"
                  className="text-white hover:text-purple-400 transition-colors text-sm tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  HOME
                </a>
                <a
                  href="#experience"
                  className="text-white hover:text-purple-400 transition-colors text-sm tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  EXPERIENCE
                </a>
                <a
                  href="#projects"
                  className="text-white hover:text-purple-400 transition-colors text-sm tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  PROJECTS
                </a>
                <a
                  href="#contact"
                  className="text-white hover:text-purple-400 transition-colors text-sm tracking-wide"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  CONTACT
                </a>
              </div>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24">
          <div className="max-w-7xl w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text Content */}
              <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                <div>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none mb-4">
                    DHRUV
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                      SINGH
                    </span>
                  </h1>
                  <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 break-words">
                    I&apos;m genuinely excited about <span className="text-purple-400 font-medium">emerging technologies and blockchain</span>. With a solid foundation in <span className="text-cyan-400 font-medium">full-stack development and DevOps</span>, I love experimenting with the latest tools to build impactful projects. I&apos;m currently diving deep into <span className="text-orange-400 font-medium">Rust</span> and actively contributing to <span className="text-green-400 font-medium">open source</span>&mdash;I believe open collaboration drives real innovation.
                  </p>
                </div>

                {/* Buttons - Centered for mobile/tablet, left-aligned for desktop */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#projects" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-center">
                    View My Work
                  </a>
                  <a href="#contact" className="border border-gray-600 hover:border-purple-400 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-purple-400/10 text-center">
                    <a href="https://drive.google.com/file/d/1Mml4Iad8reH6lA8h8ZMdkYo7_PLzvfAB/view?usp=sharing"><span className="lg:hidden">Get CV</span></a>
                    <a href="https://drive.google.com/file/d/1Mml4Iad8reH6lA8h8ZMdkYo7_PLzvfAB/view?usp=sharing"><span className="hidden lg:inline">Get CV</span></a>
                  </a>
                </div>
              </div>

              {/* Interactive Area */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="text-center space-y-8">
                  {/* Extra Large circular profile image */}
                  <div className="relative w-80 h-80 mx-auto group">
                    <div className="w-full h-full overflow-hidden rounded-full border-4 border-purple-400 shadow-2xl shadow-purple-500/40 transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-purple-500/60">
                      <Image
                        src="/image.png"
                        alt="Profile"
                        width={320}
                        height={320}
                        className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    {/* Animated border glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 opacity-20 blur-xl animate-pulse"></div>
                  </div>

                  {/* Enhanced Custom Bio */}
                  <div className="max-w-md mx-auto bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-xl">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                      Full Stack and Blockchain Developer
                    </h3>


                    {/* Enhanced Technology Tags */}
                    <div className="flex justify-center flex-wrap gap-3 mb-4">
                      <span className="bg-gradient-to-r from-purple-500/30 to-purple-600/30 border border-purple-400/40 text-purple-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-purple-500/20 transform transition-all duration-200 hover:scale-105 hover:shadow-purple-500/40 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <circle cx="12" cy="13.26" r="2.72"></circle>
                          <path d="M12 2l3.09 6.26L22 9l-5.47 5.47L17.82 21 12 17.77 6.18 21l1.29-6.53L2 9l6.91-.74L12 2z"></path>
                        </svg>
                        React
                      </span>
                      <span className="bg-gradient-to-r from-orange-500/30 to-orange-600/30 border border-orange-400/40 text-orange-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-orange-500/20 transform transition-all duration-200 hover:scale-105 hover:shadow-orange-500/40 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
                        </svg>
                        Three.js
                      </span>
                      <span className="bg-gradient-to-r from-blue-500/30 to-blue-600/30 border border-blue-400/40 text-blue-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-blue-500/20 transform transition-all duration-200 hover:scale-105 hover:shadow-blue-500/40 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-.1200-1.955-1.712a3.902 3.902 0 0 1-.643-.104 10.997 10.997 0 0 1-5.849-4.670c-.395-.621-.637-1.28-.637-1.941 0-.844.311-1.629.863-2.181.552-.552 1.337-.863 2.181-.863.844 0 1.629.311 2.181.863.552.552.863 1.337.863 2.181 0 .661-.242 1.32-.637 1.941a10.997 10.997 0 0 1-5.849 4.670c-.245.066-.434.096-.643.104-1.055.612-1.935 1.699-1.955 1.712-.028.024.012.052.219.158 1.346.687 2.712 1.086 4.323 1.264.364.04 1.936.04 2.299 0 .934-.103 1.755-.275 2.534-.525 4.349-1.403 7.557-5.189 8.209-9.695.096-.659.108-.854.108-1.748s-.012-1.088-.108-1.747C21.75 4.185 18.557.346 15.15.041 14.793.01 14.53.007 14.18.007 13.84.007 13.59.01 13.23.041 12.62.07 12.137.01 11.572 0z"></path>
                        </svg>
                        Next.js
                      </span>
                      <span className="bg-gradient-to-r from-teal-500/30 to-teal-600/30 border border-teal-400/40 text-teal-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-teal-500/20 transform transition-all duration-200 hover:scale-105 hover:shadow-teal-500/40 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
                        </svg>
                        Tailwind
                      </span>
                      <span className="bg-gradient-to-r from-yellow-500/30 to-yellow-600/30 border border-yellow-400/40 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-yellow-500/20 transform transition-all duration-200 hover:scale-105 hover:shadow-yellow-500/40 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M13.527 2.657l-7.867 3.314a2.252 2.252 0 0 0-1.313 2.039v8.09c0 .846.49 1.621 1.266 2.005l7.983 3.95c.776.384 1.694.384 2.47 0l7.983-3.95a2.252 2.252 0 0 0 1.266-2.005V8.01c0-.846-.49-1.621-1.266-2.005L15.066 2.055a2.252 2.252 0 0 0-1.539-.602 2.252 2.252 0 0 0-.539 1.204zm-.594 13.038v.005a.896.896 0 0 1-.896.896h-3.584a.896.896 0 0 1-.896-.896v-7.074a.896.896 0 0 1 .896-.896h3.584a.896.896 0 0 1 .896.896v7.069z"></path>
                        </svg>
                        AWS
                      </span>
                      <span className="bg-gradient-to-r from-blue-500/30 to-blue-600/30 border border-blue-400/40 text-blue-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-blue-500/20 transform transition-all duration-200 hover:scale-105 hover:shadow-blue-500/40 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M12 2l3.09 6.26L22 9l-5.47 5.47L17.82 21 12 17.77 6.18 21l1.29-6.53L2 9l6.91-.74L12 2z"></path>
                        </svg>
                        Digital Ocean
                      </span>
                      <span className="bg-gradient-to-r from-green-500/30 to-green-600/30 border border-green-400/40 text-green-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-green-500/20 transform transition-all duration-200 hover:scale-105 hover:shadow-green-500/40 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M24 18.588a1.529 1.529 0 0 1-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 0 1-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 0 1 1.9-.666L18.204 10.3l3.842-5.197c.546-.739 1.63-.872 2.222-.211a1.588 1.588 0 0 1-.211 2.247L19.329 12l4.728 6.146a1.587 1.587 0 0 1-.057 2.042z"></path>
                        </svg>
                        Express
                      </span>
                      <span className="bg-gradient-to-r from-indigo-500/30 to-indigo-600/30 border border-indigo-400/40 text-indigo-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-indigo-500/20 transform transition-all duration-200 hover:scale-105 hover:shadow-indigo-500/40 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M1.5 6.5A.5.5 0 0 1 2 6h5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-9zM7.5 6h9a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-9A.5.5 0 0 1 7.5 6zm10.5.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-9z"></path>
                        </svg>
                        Socket
                      </span>
                      <span className="bg-gradient-to-r from-red-500/30 to-red-600/30 border border-red-400/40 text-red-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-red-500/20 transform transition-all duration-200 hover:scale-105 hover:shadow-red-500/40 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M5.8 21l.4-2h9.6l.4 2h-10.4zm-.2-3l1.9-9h9l1.9 9H5.6zM12 2l3 3h4l-5 5-2-2-2 2L5 5h4l3-3z"></path>
                        </svg>
                        NoSQL
                      </span>
                      <span className="bg-gradient-to-r from-emerald-500/30 to-emerald-600/30 border border-emerald-400/40 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium shadow-lg shadow-emerald-500/20 transform transition-all duration-200 hover:scale-105 hover:shadow-emerald-500/40 flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                          <path d="M16.5 12c0-4.142-3.358-7.5-7.5-7.5s-7.5 3.358-7.5 7.5c0 4.142 3.358 7.5 7.5 7.5s7.5-3.358 7.5-7.5zm5.5 0c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12z"></path>
                        </svg>
                        SQL
                      </span>
                    </div>

                    {/* Additional Skills */}
                    <div className="flex justify-center flex-wrap gap-2">
                      <span className="bg-black/30 backdrop-blur-xs border border-gray-600/30 text-gray-400 px-3 py-1 rounded-full text-xs">TypeScript</span>
                      <span className="bg-black/30 backdrop-blur-xs border border-gray-600/30 text-gray-400 px-3 py-1 rounded-full text-xs">Solidity</span>
                      <span className="bg-black/30 backdrop-blur-xs border border-gray-600/30 text-gray-400 px-3 py-1 rounded-full text-xs">C</span>
                      <span className="bg-black/30 backdrop-blur-xs border border-gray-600/30 text-gray-400 px-3 py-1 rounded-full text-xs">C++</span>
                      <span className="bg-black/30 backdrop-blur-xs border border-gray-600/30 text-gray-400 px-3 py-1 rounded-full text-xs">Rust</span>
                      <span className="bg-black/30 backdrop-blur-xs border border-gray-600/30 text-gray-400 px-3 py-1 rounded-full text-xs">Node.js</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-black/20 backdrop-blur-none">
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
                            <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-1">Blockchain Developer Intern</h3>
                            <a href="https://github.com/seetadev/Eth-Maintenance/" className="text-gray-300 hover:text-purple-400 transition-colors mb-2 block flex items-center">
                              NSUT: Web3 Maintainer Suite
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </div>
                          <div className="ml-4 flex-shrink-0 text-center justify-center items-center flex">
                            <div className="bg-purple-500/20 rounded-full px-3 py-1 text-xs text-purple-400 break-words text-center whitespace-normal">
                              2025 June - <br />  August (Ongoing)
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 break-words">Selected for a 3-month open-source internship under C4GT 2025 to build cross-chain Web3 developer tools for predictive and reactive industrial maintenance using Filecoin, Chainlink, Scroll, and Polygon zkEVM.</p>
                        <div className="flex gap-2 text-xs mb-4 flex-wrap">
                          <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded">Solidity</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Filecoin</span>
                          <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded">Chainlink</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Scroll</span>
                          <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded">Polygon</span>
                        </div>
                        <a href="https://github.com/seetadev/Eth-Maintenance/issues/5" className="text-purple-400 hover:text-purple-300 text-sm underline break-all">View Details →</a>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold text-purple-400 mb-2">Blockchain Developer Intern</h3>
                        <a href="https://github.com/seetadev/Eth-Maintenance/" className="text-gray-300 hover:text-purple-400 transition-colors mb-2 block flex items-center justify-end">
                          NSUT: Web3 Maintainer Suite
                          <svg className="w-4 h-4 ml-1 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        <p className="text-sm text-gray-400 mb-4 break-words">Selected for a 3-month open-source internship under C4GT 2025 to build cross-chain Web3 developer tools for predictive and reactive industrial maintenance using Filecoin, Chainlink, Scroll, and Polygon zkEVM.</p>
                        <div className="flex gap-2 text-xs mb-4 justify-end">
                          <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded">Solidity</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Filecoin</span>
                          <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded">Chainlink</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Scroll</span>
                          <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded">Polygon</span>
                        </div>
                        <a href="https://github.com/seetadev/Eth-Maintenance/issues/5" className="text-purple-400 hover:text-purple-300 text-sm underline break-all">View Details →</a>
                      </div>

                    </div>

                    <div className="relative z-10 w-6 h-6 bg-purple-500 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 pl-8">
                      <div className="text-sm text-gray-400">
                        <div className="bg-purple-500/20 rounded-full px-4 py-2 inline-block">
                          2025 June - August (Ongoing)
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
                            <h3 className="text-lg sm:text-xl font-bold text-pink-400 mb-1">Open Source Contributor</h3>
                            <p className="text-gray-300 mb-2">Stdlib</p>
                          </div>
                          <div className="ml-4 flex-shrink-0 text-center justify-center items-center flex">
                            <div className="bg-pink-500/20 rounded-full px-3 py-1 text-xs text-pink-400">
                              2024 - December - <br /> Still Contributing
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 break-words">Contributed to the development of a comprehensive library of mathematical functions and algorithms in JavaScript, Julia, Fortran and C. Added 25,000+ lines of code within 40+ merged and 70 overall PR's</p>
                        <div className="flex gap-2 text-xs mb-4 justify-end">
                          <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded">JavaScript</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Julia</span>
                          <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded">Fortran</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">C</span>
                        </div>
                        <a href="#" className="text-pink-400 hover:text-pink-300 text-sm underline">View Details →</a>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <div className="text-sm text-gray-400">
                        <div className="bg-pink-500/20 rounded-full px-4 py-2 inline-block">
                          2024 - December - Still Contributing
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 w-6 h-6 bg-pink-500 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 pl-8">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold text-pink-400 mb-2">Open Source Contributor</h3>
                        <a href="https://github.com/stdlib-js/stdlib" className="text-gray-300 hover:text-pink-400 transition-colors mb-2 block flex items-center">
                          Stdlib
                          <svg className="w-4 h-4 ml-1 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        <p className="text-sm text-gray-400 mb-4 break-words">Contributed to the development of a comprehensive library of mathematical functions and algorithms in JavaScript, Julia, Fortran and C. Added 25,000+ lines of code within 40+ merged and 70 overall PR&apos;s</p>
                        <div className="flex gap-2 text-xs mb-4 justify-start">
                          <span className="bg-gray-500/20 text-gray-400 px-2 py-1 rounded">JavaScript</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Julia</span>
                          <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded">Fortran</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">C</span>
                        </div>
                        <a href="https://github.com/search?q=DhruvArvindSingh&type=code&p=3" className="text-pink-400 hover:text-pink-300 text-sm underline">View Details →</a>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-black/20 backdrop-blur-none">
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
                            <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-1">Animath.in</h3>
                            <p className="text-gray-300 mb-2">Code based Video Creation</p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="bg-cyan-500/20 rounded-full px-3 py-1 text-xs text-cyan-400">
                              2024
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 break-words">Animath transforms your mathematical ideas into stunning visual animations. Simply describe what you want to see, and our AI will generate Python code using Manim to create your animation.Completely scalable with the use of AWS services and Kafka with postgreSQL database.</p>
                        <div className="flex gap-2 text-xs mb-4 flex-wrap">
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Next.js</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Tailwind CSS</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">EC2</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">ECS</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">ECR</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">S3</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">CloudFront</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Express</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Socket.io</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Kafka</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">PostgreSQL</span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Docker</span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Manim</span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Python</span>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                          <a href="https://drive.google.com/file/d/1oEDFMWCF3z5S3BOMf_SqIo9yXR6RxDX1/view?usp=sharing" className="text-cyan-400 hover:text-cyan-300 text-sm underline">System Design →</a>
                          <a href="http://animath.in" className="text-cyan-400 hover:text-cyan-300 text-sm underline">Web Link →</a>
                          <a href="https://github.com/DhruvArvindSingh/Manim" className="text-cyan-400 hover:text-cyan-300 text-sm underline">GitHub →</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                        <h3 className="text-xl font-bold text-cyan-400 mb-2">Animath.in</h3>
                        <p className="text-gray-300 mb-2">Code based Video Creation</p>
                        <p className="text-sm text-gray-400 mb-4 break-words">Animath transforms your mathematical ideas into stunning visual animations. Simply describe what you want to see, and our AI will generate Python code using Manim to create your animation.Completely scalable with the use of AWS services and Kafka with postgreSQL database.</p>
                        <div className="flex flex-wrap gap-2 text-xs mb-4 justify-end">
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Next.js</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Tailwind CSS</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">EC2</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">ECS</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">ECR</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">S3</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">CloudFront</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Express</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Socket.io</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Kafka</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">PostgreSQL</span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Docker</span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Manim</span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Python</span>
                        </div>
                        <div className="flex gap-4 justify-end">
                          <a href="https://drive.google.com/file/d/1oEDFMWCF3z5S3BOMf_SqIo9yXR6RxDX1/view?usp=sharing" className="text-cyan-400 hover:text-cyan-300 text-sm underline">System Design →</a>
                          <a href="http://animath.in" className="text-cyan-400 hover:text-cyan-300 text-sm underline">Web Link →</a>
                          <a href="https://github.com/DhruvArvindSingh/Manim" className="text-cyan-400 hover:text-cyan-300 text-sm underline">GitHub →</a>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 w-6 h-6 bg-cyan-500 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 pl-8">
                      <div className="text-sm text-gray-400">
                        <div className="bg-cyan-500/20 rounded-full px-4 py-2 inline-block">
                          2025
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
                            <h3 className="text-lg sm:text-xl font-bold text-emerald-400 mb-1">DeployNet</h3>
                            <p className="text-gray-300 mb-2">Cloud Based Deployment Platform</p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="bg-emerald-500/20 rounded-full px-3 py-1 text-xs text-emerald-400">
                              2025
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 break-words">DeployNet is a modern deployment platform that allows you to deploy both anything from static and dynamic web applications or even a simple script of any language directly cloned from github with zero configuration using AWS services.</p>
                        <div className="flex gap-2 text-xs mb-4 flex-wrap">
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Next.js</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Tailwind CSS</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">EC2</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">ECS</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">ECR</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">S3</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Express</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Socket.io</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Redis</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">PostgreSQL</span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Docker</span>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                          <a href="https://drive.google.com/file/d/1oEDFMWCF3z5S3BOMf_SqIo9yXR6RxDX1/view?usp=sharing" className="text-emerald-400 hover:text-emerald-300 text-sm underline">System Design →</a>
                          <a href="http://deploynet.in" className="text-emerald-400 hover:text-emerald-300 text-sm underline">Web Link →</a>
                          <a href="https://github.com/DhruvArvindSingh/Instant-Deployer" className="text-emerald-400 hover:text-emerald-300 text-sm underline">GitHub →</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <div className="text-sm text-gray-400">
                        <div className="bg-emerald-500/20 rounded-full px-4 py-2 inline-block">
                          2025
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 w-6 h-6 bg-emerald-500 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 pl-8">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
                        <h3 className="text-xl font-bold text-emerald-400 mb-2">DeployNet.in</h3>
                        <p className="text-gray-300 mb-2">Cloud Based Deployment Platform</p>
                        <p className="text-sm text-gray-400 mb-4 break-words">DeployNet is a modern deployment platform that allows you to deploy both anything from static and dynamic web applications or even a simple script of any language directly cloned from github with zero configuration using AWS services.</p>
                        <div className="flex flex-wrap gap-2 text-xs mb-4">
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Next.js</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Tailwind CSS</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">EC2</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">ECS</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">ECR</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">S3</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Express</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Socket.io</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Redis</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">PostgreSQL</span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Docker</span>
                        </div>
                        <div className="flex gap-4">
                          <a href="https://drive.google.com/file/d/1oEDFMWCF3z5S3BOMf_SqIo9yXR6RxDX1/view?usp=sharing" className="text-emerald-400 hover:text-emerald-300 text-sm underline">System Design →</a>
                          <a href="http://deploynet.in" className="text-emerald-400 hover:text-emerald-300 text-sm underline">Web Link →</a>
                          <a href="https://github.com/DhruvArvindSingh/Instant-Deployer" className="text-emerald-400 hover:text-emerald-300 text-sm underline">GitHub →</a>
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
                            <h3 className="text-lg sm:text-xl font-bold text-orange-400 mb-1">Collab-Draw</h3>
                            <p className="text-gray-300 mb-2">Collaborative Drawing App</p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            <div className="bg-orange-500/20 rounded-full px-3 py-1 text-xs text-orange-400">
                              2024
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-4 break-words">Collab-Draw is a collaborative drawing app that allows you to draw with your friends in real-time. It is built with Next.js, Tailwind CSS, and Socket.io.</p>
                        <div className="flex gap-2 text-xs mb-4 flex-wrap">
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Next.js</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">Tailwind CSS</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Socket.io</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Express</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">PostgreSQL</span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Docker</span>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                          <a href="https://drive.google.com/file/d/1oEDFMWCF3z5S3BOMf_SqIo9yXR6RxDX1/view?usp=sharing" className="text-orange-400 hover:text-orange-300 text-sm underline">System Design →</a>
                          <a href="http://collab-draw.in" className="text-orange-400 hover:text-orange-300 text-sm underline">Web Link →</a>
                          <a href="https://github.com/DhruvArvindSingh/Collab-draw" className="text-orange-400 hover:text-orange-300 text-sm underline">GitHub →</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between w-full">
                    <div className="w-5/12 text-right pr-8">
                      <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300">
                        <h3 className="text-xl font-bold text-orange-400 mb-2">Collab-Draw</h3>
                        <p className="text-gray-300 mb-2">Collaborative Drawing App</p>
                        <p className="text-sm text-gray-400 mb-4 break-words">Collab-Draw is a collaborative drawing app that allows you to draw with your friends in real-time. It is built with Next.js, Tailwind CSS, and Socket.io.</p>
                        <div className="flex gap-2 text-xs mb-4 justify-end">
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Next.js</span>
                          <span className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Tailwind CSS</span>
                          <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded">EC2</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Express</span>
                          <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded">Socket.io</span>
                          <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">PostgreSQL</span>
                          <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded">Docker</span>
                        </div>
                        <div className="flex gap-4 justify-end">
                          <a href="https://drive.google.com/file/d/1oEDFMWCF3z5S3BOMf_SqIo9yXR6RxDX1/view?usp=sharing" className="text-orange-400 hover:text-orange-300 text-sm underline">System Design →</a>
                          <a href="http://collab-draw.in" className="text-orange-400 hover:text-orange-300 text-sm underline">Web Link →</a>
                          <a href="https://github.com/DhruvArvindSingh/Collab-draw" className="text-orange-400 hover:text-orange-300 text-sm underline">GitHub →</a>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10 w-6 h-6 bg-orange-500 rounded-full border-4 border-black"></div>
                    <div className="w-5/12 pl-8">
                      <div className="text-sm text-gray-400">
                        <div className="bg-orange-500/20 rounded-full px-4 py-2 inline-block">
                          2024
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
        <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-black/20 backdrop-blur-none">
          <div className="max-w-5xl w-full mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                GET IN TOUCH
              </span>
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Ready to bring your ideas to life? Let&apos;s collaborate and create something amazing together.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <div className="text-purple-400 text-2xl mb-4">✉</div>
                <h3 className="text-base sm:text-lg font-bold mb-2">Email</h3>
                <a href="mailto:contact@example.com" className="text-gray-300 hover:text-purple-400 transition-colors text-sm sm:text-base break-all">
                  contact@example.com
                </a>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300">
                <div className="text-pink-400 text-2xl mb-4">in</div>
                <h3 className="text-base sm:text-lg font-bold mb-2">LinkedIn</h3>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-sm sm:text-base">
                  /in/yourprofile
                </a>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
                <div className="text-cyan-400 text-2xl mb-4">🐙</div>
                <h3 className="text-base sm:text-lg font-bold mb-2">GitHub</h3>
                <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors text-sm sm:text-base">
                  /yourusername
                </a>
              </div>

              <div className="bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
                <div className="text-blue-400 text-2xl mb-4 font-bold">𝕏</div>
                <h3 className="text-base sm:text-lg font-bold mb-2">X (Twitter)</h3>
                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm sm:text-base">
                  @yourusername
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
