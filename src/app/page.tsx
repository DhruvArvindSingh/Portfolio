'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import ProjectCard from '../components/ProjectCard'
import ExperienceCard from '../components/ExperienceCard'
import Brain3D from '../components/Brain3D'
import { ColorKey } from '../lib/colorMap'

// Data arrays for experiences and projects
const experiences: Array<{
  title: string
  company: string
  companyUrl?: string
  description: string
  period: string
  technologies: { name: string; color: ColorKey }[]
  links: { label: string; url: string }[]
  color: ColorKey
}> = [
    {
      title: "Blockchain Developer Intern",
      company: "NSUT: Web3 Maintainer Suite",
      companyUrl: "https://github.com/seetadev/Eth-Maintenance/",
      description: "Selected for a 3-month open-source internship under C4GT 2025 to build cross-chain Web3 developer tools for predictive and reactive industrial maintenance using Filecoin, Chainlink, Scroll, and Polygon zkEVM.",
      period: "2025 June - August (Ongoing)",
      technologies: [
        { name: "Solidity", color: "gray" },
        { name: "Filecoin", color: "blue" },
        { name: "Chainlink", color: "blue" },
        { name: "Scroll", color: "orange" },
        { name: "Polygon", color: "purple" }
      ],
      links: [
        { label: "View Details", url: "https://github.com/seetadev/Eth-Maintenance/issues/5" }
      ],
      color: "purple"
    },
    {
      title: "Open Source Contributor",
      company: "Stdlib",
      companyUrl: "https://github.com/stdlib-js/stdlib",
      description: "Contributed to the development of a comprehensive library of mathematical functions and algorithms in JavaScript, Julia, Fortran and C. Added 25,000+ lines of code within 40+ merged and 70 overall PR's",
      period: "2024 - December - Still Contributing",
      technologies: [
        { name: "JavaScript", color: "gray" },
        { name: "Julia", color: "blue" },
        { name: "Fortran", color: "blue" },
        { name: "C", color: "orange" }
      ],
      links: [
        { label: "View Details", url: "https://github.com/search?q=DhruvArvindSingh&type=code&p=3" }
      ],
      color: "pink"
    }
  ]

const projects: Array<{
  title: string
  subtitle: string
  description: string
  year: string
  technologies: { name: string; color: ColorKey }[]
  links: { label: string; url: string }[]
  color: ColorKey
}> = [
    {
      title: "Animath.in",
      subtitle: "Code based Video Creation",
      description: "Animath transforms your mathematical ideas into stunning visual animations. Simply describe what you want to see, and our AI will generate Python code using Manim to create your animation.Completely scalable with the use of AWS services and Kafka with postgreSQL database.",
      year: "2025",
      technologies: [
        { name: "Next.js", color: "cyan" },
        { name: "Tailwind CSS", color: "cyan" },
        { name: "EC2", color: "orange" },
        { name: "ECS", color: "orange" },
        { name: "ECR", color: "orange" },
        { name: "S3", color: "orange" },
        { name: "CloudFront", color: "orange" },
        { name: "Express", color: "red" },
        { name: "Socket.io", color: "red" },
        { name: "Kafka", color: "red" },
        { name: "PostgreSQL", color: "blue" },
        { name: "Docker", color: "green" },
        { name: "Manim", color: "green" },
        { name: "Python", color: "green" }
      ],
      links: [
        { label: "System Design", url: "https://drive.google.com/file/d/1oEDFMWCF3z5S3BOMf_SqIo9yXR6RxDX1/view?usp=sharing" },
        { label: "Web Link", url: "http://animath.in" },
        { label: "GitHub", url: "https://github.com/DhruvArvindSingh/Manim" }
      ],
      color: "cyan"
    },
    {
      title: "DeployNet.in",
      subtitle: "Cloud Based Deployment Platform",
      description: "DeployNet is a modern deployment platform that allows you to deploy both anything from static and dynamic web applications or even a simple script of any language directly cloned from github with zero configuration using AWS services.",
      year: "2025",
      technologies: [
        { name: "Next.js", color: "cyan" },
        { name: "Tailwind CSS", color: "cyan" },
        { name: "EC2", color: "orange" },
        { name: "ECS", color: "orange" },
        { name: "ECR", color: "orange" },
        { name: "S3", color: "orange" },
        { name: "Express", color: "red" },
        { name: "Socket.io", color: "red" },
        { name: "Redis", color: "red" },
        { name: "PostgreSQL", color: "blue" },
        { name: "Docker", color: "green" }
      ],
      links: [
        { label: "System Design", url: "https://drive.google.com/file/d/1oEDFMWCF3z5S3BOMf_SqIo9yXR6RxDX1/view?usp=sharing" },
        { label: "Web Link", url: "http://deploynet.in" },
        { label: "GitHub", url: "https://github.com/DhruvArvindSingh/Instant-Deployer" }
      ],
      color: "emerald"
    },
    {
      title: "Collab-Draw",
      subtitle: "Collaborative Drawing App",
      description: "Collab-Draw is a real-time collaborative drawing app that lets you sketch and create with friends on a shared canvas. Built using Next.js, Tailwind CSS, and Socket.io, it delivers fast, interactive, and seamless drawing sessions.",
      year: "2024",
      technologies: [
        { name: "Next.js", color: "cyan" },
        { name: "Tailwind CSS", color: "cyan" },
        { name: "EC2", color: "orange" },
        { name: "Express", color: "red" },
        { name: "Socket.io", color: "red" },
        { name: "PostgreSQL", color: "blue" },
        { name: "Docker", color: "green" }
      ],
      links: [
        { label: "System Design", url: "https://drive.google.com/file/d/1oEDFMWCF3z5S3BOMf_SqIo9yXR6RxDX1/view?usp=sharing" },
        { label: "Web Link", url: "http://collab-draw.in" },
        { label: "GitHub", url: "https://github.com/DhruvArvindSingh/Collab-draw" }
      ],
      color: "orange"
    },
    {
      title: "Crypto Wallet App",
      subtitle: "Cross Platform Crypto Wallet",
      description: "A cross platform crypto wallet app that allows you to manage your crypto assets and transactions. It is built with React Native, TypeScript, and Web3.js. It is a simple and easy to use wallet app that allows you to send ,receive and track prices of crypto assets.",
      year: "2024",
      technologies: [
        { name: "React Native", color: "violet" },
        { name: "TypeScript", color: "violet" },
        { name: "Web3.js", color: "yellow" },
        { name: "Expo", color: "blue" },
        { name: "Express", color: "red" },
        { name: "CoinGecko API", color: "green" },
        { name: "Moralis API", color: "purple" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/DhruvArvindSingh/Crypto_Wallet" },
        { label: "Documentation", url: "https://github.com/DhruvArvindSingh/Crypto_Wallet" }
      ],
      color: "violet"
    },
    {
      title: "Portfolio",
      subtitle: "Portfolio Website",
      description: "This is my portfolio website that I built with Next.js, Tailwind CSS, Three.js, and TypeScript. It is a simple and easy to use portfolio website that allows you to showcase your projects and skills.",
      year: "2025",
      technologies: [
        { name: "Next.js", color: "cyan" },
        { name: "Tailwind CSS", color: "cyan" },
        { name: "TypeScript", color: "violet" },
        { name: "Three.js", color: "emerald" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/DhruvArvindSingh/Portfolio" },
        { label: "Web Link", url: "https://github.com/DhruvArvindSingh/Portfolio" }
      ],
      color: "teal"
    }
  ]

const additionalProjects: Array<{
  title: string
  subtitle: string
  description: string
  year: string
  technologies: { name: string; color: ColorKey }[]
  links: { label: string; url: string }[]
  color: ColorKey
}> = [
    {
      title: "GovIDBot",
      subtitle: "AI-powered Government Document Automation",
      description: "GovIDBot is a smart AI chatbot that collects user details through conversation or ID image uploads and automates applications for services like Aadhaar, PAN, and more. It streamlines KYC, form submissions, and document verification using OCR and NLP technologies. Stores encrypted data in the database for security.",
      year: "2025",
      technologies: [
        { name: "Express", color: "indigo" },
        { name: "PostgreSQL", color: "indigo" },
        { name: "Gemini API", color: "green" },
        { name: "Open AI API", color: "blue" },
        { name: "sha256", color: "yellow" },
        { name: "aes256", color: "purple" }
      ],
      links: [
        { label: "GitHub", url: "https://github.com/DhruvArvindSingh/Pulse" },
        { label: "API Docs", url: "https://github.com/DhruvArvindSingh/Pulse" }
      ],
      color: "indigo"
    },
    {
      title: "Ludo Game",
      subtitle: "Multiplayer Ludo Game",
      description: "A multiplayer ludo game that allows you to play with your friends. It is built with vanilla javascript, ejs, socket.io, node.js and express. It is a simple and easy to use ludo game that allows you to play with your friends.It has both random room and custom room options.",
      year: "2024",
      technologies: [
        { name: "JavaScript", color: "orange" },
        { name: "EJS", color: "emerald" },
        { name: "Socket.io", color: "purple" },
        { name: "Node.js", color: "emerald" },
        { name: "Express", color: "cyan" }
      ],
      links: [
        { label: "Website Link", url: "https://multiplayer-ludo-game.onrender.com/" },
        { label: "GitHub", url: "https://github.com/DhruvArvindSingh/Multiplayer-Ludo-Game" }
      ],
      color: "rose"
    },
    {
      title: "Library Management System",
      subtitle: "Library Management System using C++",
      description: "A library management system that allows you to manage your library through console. It is built with C++ using classs with .csv file for storing books and users info wiith realtime storage update and over 20+ features.",
      year: "2023",
      technologies: [
        { name: "C++", color: "blue" },
        { name: "CSV", color: "emerald" },
        { name: "OOP", color: "purple" },
      ],
      links: [
        { label: "GitHub", url: "https://github.com/DhruvArvindSingh/Library-Management-System-in-C-/" }
      ],
      color: "amber"
    }
  ]

// Client-side only Brain3D import
const Brain3DClientOnly = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <Brain3D />
}

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    try {
      // Create mailto URL with form data
      const subject = encodeURIComponent(formData.subject || 'Portfolio Contact Form')
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      const mailtoUrl = `mailto:dhruvsinghxd@gmail.com?subject=${subject}&body=${body}`

      // Open default email client
      window.location.href = mailtoUrl

      setSubmitStatus('Email client opened! Please send the email from your default email application.')

      // Reset form after a delay
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' })
        setSubmitStatus('')
      }, 5000)

    } catch (error) {
      console.error('Error sending email:', error)
      setSubmitStatus('Error opening email client. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

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
                  <a href="https://drive.google.com/file/d/1Mml4Iad8reH6lA8h8ZMdkYo7_PLzvfAB/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="border border-gray-600 hover:border-purple-400 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:bg-purple-400/10 text-center">
                    Get CV
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
                {experiences.map((experience, index) => (
                  <ExperienceCard key={index} {...experience} isLeft={index % 2 === 0} />
                ))}
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
                {projects.map((project, index) => (
                  <ProjectCard key={index} {...project} isLeft={index % 2 === 0} />
                ))}

                {/* Additional Projects - Hidden by default */}
                {showAllProjects && (
                  <>
                    {additionalProjects.map((project, index) => (
                      <ProjectCard key={index + projects.length} {...project} isLeft={(index + projects.length) % 2 === 0} />
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Show All Projects Button - Below the timeline */}
            <div className="flex justify-center mt-16">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="group relative z-10 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-500 transform hover:scale-110 flex items-center gap-3 shadow-2xl hover:shadow-purple-500/25 border border-white/10 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                <div className="relative z-10 flex items-center gap-3">
                  {showAllProjects ? (
                    <>
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Show Less Projects
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Show All Projects
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-black/20 backdrop-blur-none relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Floating Particles */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping"></div>
            <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-pink-400/20 rounded-full animate-bounce"></div>
            <div className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-emerald-400/30 rounded-full animate-pulse"></div>

            {/* Gradient Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/5 to-purple-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>
          </div>

          <div className="max-w-7xl w-full mx-auto relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block relative">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient-x">
                    LET&apos;S CONNECT
                  </span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-xl rounded-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                </h2>
              </div>
              <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
                Ready to bring your <span className="text-purple-400 font-semibold">ideas to life</span>? Let&apos;s collaborate and create something <span className="text-cyan-400 font-semibold">extraordinary</span> together.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <div className="space-y-8">
                <div className="bg-gray-900/90 backdrop-blur-md p-8 rounded-2xl border border-purple-500/20 shadow-2xl relative overflow-hidden group">
                  {/* Form Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6 text-center">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Send Me a Message
                      </span>
                    </h3>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {/* Name Input */}
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-purple-400 transition-colors">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 group-hover:border-gray-500"
                            placeholder="John Doe"
                            required
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>

                      {/* Email Input */}
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-cyan-400 transition-colors">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:outline-none transition-all duration-300 group-hover:border-gray-500"
                            placeholder="john@example.com"
                            required
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>

                      {/* Subject Input */}
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-pink-400 transition-colors">
                          Subject
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 focus:outline-none transition-all duration-300 group-hover:border-gray-500"
                            placeholder="Project Collaboration"
                          />
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>

                      {/* Message Textarea */}
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-2 group-focus-within:text-emerald-400 transition-colors">
                          Message
                        </label>
                        <div className="relative">
                          <textarea
                            rows={5}
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-black/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-300 resize-none group-hover:border-gray-500"
                            placeholder="Tell me about your project or just say hello..."
                            required
                          ></textarea>
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="group relative w-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:from-purple-600 hover:via-pink-600 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                          <span className="relative z-10 flex items-center justify-center gap-2">
                            {isSubmitting ? (
                              <>
                                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Sending...
                              </>
                            ) : (
                              <>
                                Send Message
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                              </>
                            )}
                          </span>
                        </button>
                      </div>

                      {/* Status Message */}
                      {submitStatus && (
                        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                          <p className="text-green-400 text-sm font-medium text-center">
                            {submitStatus}
                          </p>
                        </div>
                      )}
                    </form>
                  </div>
                </div>

                {/* Quick Contact Info */}
                <div className="bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl border border-cyan-500/20 shadow-xl">
                  <h4 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Quick Contact
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <a href="mailto:dhruvsinghxd@gmail.com" className="font-medium">dhruvsinghxd@gmail.com</a>
                      </div>
                    </div>



                    <div className="flex items-center gap-3 text-gray-300 hover:text-emerald-400 transition-colors">
                      <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="font-medium">Navi Mumbai, India</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links & Interactive Cards */}
              <div className="space-y-8">
                {/* Social Media Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {/* LinkedIn Card */}
                  <a href="https://www.linkedin.com/in/dhruv-singh-94340b28a/" target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-br from-blue-900/50 to-blue-800/30 p-6 rounded-2xl border border-blue-500/30 hover:border-blue-400/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">LinkedIn</h3>
                      <p className="text-blue-300 text-sm">Professional Network</p>
                    </div>
                  </a>

                  {/* GitHub Card */}
                  <a href="https://github.com/DhruvArvindSingh" target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 p-6 rounded-2xl border border-gray-500/30 hover:border-gray-400/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/25 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-gray-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">GitHub</h3>
                      <p className="text-gray-300 text-sm">Code Repository</p>
                    </div>
                  </a>

                  {/* Twitter/X Card */}
                  <a href="https://x.com/dhruvsingh17991" target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-br from-sky-900/50 to-sky-800/30 p-6 rounded-2xl border border-sky-500/30 hover:border-sky-400/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/25 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">X (Twitter)</h3>
                      <p className="text-sky-300 text-sm">Latest Updates</p>
                    </div>
                  </a>

                  {/* Discord Card */}
                  <a href="https://discord.com/users/756584429249626120" className="group relative bg-gradient-to-br from-indigo-900/50 to-indigo-800/30 p-6 rounded-2xl border border-indigo-500/30 hover:border-indigo-400/60 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/25 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">Discord</h3>
                      <p className="text-indigo-300 text-sm">Chat & Collaborate</p>
                    </div>
                  </a>
                </div>

                {/* Availability Status */}
                <div className="bg-gradient-to-r from-emerald-900/50 to-green-800/30 p-6 rounded-2xl border border-emerald-500/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="relative">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
                      </div>
                      <h3 className="text-lg font-semibold text-emerald-400">Currently Available</h3>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">
                      I&apos;m actively looking for new opportunities and interesting projects to work on. Let&apos;s discuss how we can collaborate!
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">Freelance</span>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">Full-time</span>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs rounded-full border border-emerald-500/30">Consulting</span>
                    </div>
                  </div>
                </div>

                {/* Fun Fact Card */}
                <div className="bg-gradient-to-r from-amber-900/50 to-orange-800/30 p-6 rounded-2xl border border-amber-500/30 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-amber-400 text-lg">💡</span>
                      </div>
                      <h3 className="text-lg font-semibold text-amber-400">Fun Fact</h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                      I&apos;ve written over <span className="text-amber-400 font-semibold">100,000 lines</span> of code this year and I&apos;m still counting! When I&apos;m not coding, you can find me exploring new technologies or contributing to open source projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16">
              <div className="inline-block bg-gray-900/90 backdrop-blur-md px-8 py-4 rounded-2xl border border-gray-600/30">
                <p className="text-gray-400 text-sm">
                  © 2024 Dhruv Singh. Built with <span className="text-red-400">❤️</span> using Next.js & Three.js
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
