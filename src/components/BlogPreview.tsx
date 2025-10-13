'use client'

import Reveal from './Reveal'

interface BlogPost {
    title: string
    excerpt: string
    date: string
    readTime: string
    category: string
    image: string
    link: string
}

const blogPosts: BlogPost[] = [
    {
        title: 'Building Scalable Microservices with AWS ECS',
        excerpt: 'Learn how to architect and deploy containerized microservices using AWS ECS, ECR, and Application Load Balancers for maximum scalability.',
        date: 'March 15, 2025',
        readTime: '8 min read',
        category: 'DevOps',
        image: '🚀',
        link: '#'
    },
    {
        title: 'Deep Dive into Web3: Smart Contract Security',
        excerpt: 'Explore common vulnerabilities in Solidity smart contracts and learn best practices for writing secure blockchain applications.',
        date: 'March 10, 2025',
        readTime: '12 min read',
        category: 'Blockchain',
        image: '🔐',
        link: '#'
    },
    {
        title: 'Next.js 15: Performance Optimization Techniques',
        excerpt: 'Discover advanced optimization strategies for Next.js applications including ISR, SSG, and edge computing.',
        date: 'March 5, 2025',
        readTime: '10 min read',
        category: 'Frontend',
        image: '⚡',
        link: '#'
    }
]

export default function BlogPreview() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
                <Reveal key={index} direction="up" delayMs={index * 100}>
                    <a
                        href={post.link}
                        className="group block bg-gray-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20"
                    >
                        {/* Image/Icon */}
                        <div className="relative h-48 bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center text-7xl overflow-hidden">
                            <div className="transform group-hover:scale-125 transition-transform duration-500">
                                {post.image}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Category badge */}
                            <div className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-semibold rounded-full mb-3">
                                {post.category}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                                {post.title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                {post.excerpt}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center justify-between text-xs text-gray-500">
                                <span>{post.date}</span>
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        {/* Read more indicator */}
                        <div className="px-6 pb-6">
                            <div className="flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:gap-3 transition-all">
                                Read More
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </a>
                </Reveal>
            ))}
        </div>
    )
}

