'use client'

import { useState, useEffect, useRef } from 'react'
import { Terminal } from 'lucide-react'

export default function TerminalContact() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([
    'Welcome to the contact terminal v2.0.5',
    'Type "help" for available commands.',
    ' '
  ])
  const [formStep, setFormStep] = useState<'idle' | 'name' | 'email' | 'message' | 'sending'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleCommand = async (cmd: string) => {
    const cleanCmd = cmd.trim()
    const newHistory = [...history, `> ${cmd}`]

    if (formStep !== 'idle') {
      handleFormInput(cleanCmd, newHistory)
      return
    }

    switch (cleanCmd.toLowerCase()) {
      case 'help':
        setHistory([
          ...newHistory,
          'Available commands:',
          '  contact  - Start the contact form sequence',
          '  clear    - Clear the terminal screen',
          '  whoami   - Display current user info',
          '  socials  - List social media links',
          ' '
        ])
        break
      case 'clear':
        setHistory([])
        break
      case 'whoami':
        setHistory([...newHistory, 'User: Guest', 'Role: Visitor', 'Access: Read-Only', ' '])
        break
      case 'socials':
        setHistory([
          ...newHistory,
          'GitHub: https://github.com/DhruvArvindSingh',
          'LinkedIn: https://linkedin.com/in/dhruv-singh-94340b28a',
          'Twitter: https://x.com/dhruvsingh17991',
          ' '
        ])
        break
      case 'contact':
        setFormStep('name')
        setHistory([...newHistory, 'Initiating secure transmission protocol...', 'Please enter your NAME:', ' '])
        break
      default:
        if (cleanCmd) {
          setHistory([...newHistory, `Command not found: ${cleanCmd}`, 'Type "help" for assistance.', ' '])
        } else {
          setHistory(newHistory)
        }
    }
    setInput('')
  }

  const handleFormInput = async (value: string, currentHistory: string[]) => {
    if (!value) return

    switch (formStep) {
      case 'name':
        setFormData(prev => ({ ...prev, name: value }))
        setFormStep('email')
        setHistory([...currentHistory, `> ${value}`, ' ', 'Please enter your EMAIL:', ' '])
        break
      case 'email':
        setFormData(prev => ({ ...prev, email: value }))
        setFormStep('message')
        setHistory([...currentHistory, `> ${value}`, ' ', 'Please enter your MESSAGE:', ' '])
        break
      case 'message':
        setFormData(prev => ({ ...prev, message: value }))
        setFormStep('sending')
        setHistory([...currentHistory, `> ${value}`, ' ', 'Encrypting and sending data...', ' '])
        
        // Simulate sending
        setTimeout(() => {
          const subject = encodeURIComponent('Portfolio Contact Form')
          const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${value}`
          )
          window.location.href = `mailto:dhruvsinghxd@gmail.com?subject=${subject}&body=${body}`
          
          setHistory(prev => [
            ...prev, 
            'Transmission successful! Opening default mail client...', 
            'Session terminated.', 
            ' '
          ])
          setFormStep('idle')
          setFormData({ name: '', email: '', message: '' })
        }, 1500)
        break
    }
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 font-mono text-sm md:text-base">
      <div className="bg-black/90 border border-gray-700 rounded-lg shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="text-gray-500 text-xs flex items-center gap-2">
            <Terminal size={14} />
            bash -- user@portfolio:~/contact
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          className="p-6 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="mb-1 text-gray-300 break-words">
              {line.startsWith('>') ? (
                <span className="text-green-400">{line}</span>
              ) : line.includes('http') ? (
                <span dangerouslySetInnerHTML={{ 
                  __html: line.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="text-blue-400 hover:underline">$1</a>') 
                }} />
              ) : (
                line
              )}
            </div>
          ))}
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-green-500 font-bold">
              {formStep === 'idle' ? 'user@portfolio:~$' : '>'}
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white flex-1 caret-green-500"
              autoComplete="off"
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
      
      <div className="mt-4 text-center text-gray-500 text-xs">
        <p>Tip: Type <span className="text-green-400">contact</span> to send a message directly.</p>
      </div>
    </div>
  )
}
