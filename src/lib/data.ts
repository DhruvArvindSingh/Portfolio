import { ColorKey } from './colorMap';

export const experiences: Array<{
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
}> = [
        {
            title: "Open Source Contributor — CNCF / kgateway",
            company: "Cloud Native Computing Foundation",
            companyUrl: "https://github.com/kgateway-dev/kgateway",
            description: "Contributing to kgateway, a CNCF project — a Kubernetes-native API gateway built on Envoy Proxy. Working on gateway configuration, routing enhancements, and cloud-native networking features for the Kubernetes ecosystem.",
            period: "2025 - Present",
            technologies: [
                { name: "Go", color: "cyan" },
                { name: "Kubernetes", color: "blue" },
                { name: "Envoy Proxy", color: "purple" },
                { name: "gRPC", color: "green" },
                { name: "Helm", color: "blue" },
                { name: "CNCF", color: "cyan" }
            ],
            links: [
                { label: "kgateway Repo", url: "https://github.com/kgateway-dev/kgateway" },
                { label: "My PRs", url: "https://github.com/kgateway-dev/kgateway/pulls?q=author%3ADhruvArvindSingh" }
            ],
            color: "cyan"
        },
        {
            title: "C4GT DMP Intern — Web3 Maintainers Suite",
            company: "Blockchain & Full-Stack Development",
            companyUrl: "https://github.com/seetadev/Eth-Maintenance/",
            mentor: "Sir Manu Sheel Gupta",
            scope: "End-to-end development, deployment, and scaling across cloud, mobile, and backend systems.",
            highlights: [
                "Built and deployed the EthMaintainers website on GCP and AWS with production-grade infra (SSL, containers, CI/CD) for high availability and reliability.",
                "Shipped cross-platform mobile apps (Android & iOS) using Ionic/Capacitor, delivering a consistent, performant UX.",
                "Architected a modular Node.js (Express) backend with pluggable adapters across 8 databases/storage backends: PostgreSQL, MongoDB, Neo4j, Firebase, Amazon S3, OrbitDB, Lighthouse, and Filecoin.",
                "Implemented core product features: barcode-based invoice sharing, on-chain invoice issuance, brand customization (add/remove logo), Gmail API email delivery, and password-protected exports.",
                "Set up Dockerized CI/CD pipelines for automated testing and multi-cloud deployments; explored Kubernetes for future scaling.",
                "Wrote documentation, added security hardening, and created contribution workflows to support open-source collaboration.",
                "Continuously evolving: shipping new features regularly based on community feedback; open to issues and PRs."
            ],
            period: "June 2025 - August 2025",
            technologies: [
                { name: "Node.js", color: "green" },
                { name: "Express", color: "gray" },
                { name: "Ionic", color: "blue" },
                { name: "Capacitor", color: "blue" },
                { name: "PostgreSQL", color: "blue" },
                { name: "MongoDB", color: "green" },
                { name: "Neo4j", color: "cyan" },
                { name: "Firebase", color: "orange" },
                { name: "Amazon S3", color: "orange" },
                { name: "OrbitDB", color: "purple" },
                { name: "Lighthouse", color: "purple" },
                { name: "Filecoin", color: "blue" },
                { name: "GCP", color: "blue" },
                { name: "AWS", color: "orange" },
                { name: "Docker", color: "cyan" },
                { name: "CI/CD", color: "green" },
                { name: "Gmail API", color: "red" }
            ],
            links: [
                { label: "Live Site", url: "https://ethmaintainers.sbs" },
                { label: "Backend MVP", url: "https://mvp-be.dsingh.fun" },
                { label: "GitHub", url: "https://github.com/seetadev/Eth-Maintenance/issues/5" }
            ],
            color: "purple"
        },
        {
            title: "Open Source Contributor",
            company: "Stdlib",
            companyUrl: "https://github.com/stdlib-js/stdlib",
            description: "Contributed to the development of a comprehensive library of mathematical functions and algorithms in JavaScript, Julia, Fortran and C. Added 25,000+ lines of code within 40+ merged and 70 overall PR's.",
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

export const projects: Array<{
    title: string
    subtitle: string
    description: string
    year: string
    technologies: { name: string; color: ColorKey }[]
    links: { label: string; url: string }[]
    color: ColorKey
}> = [
        {
            title: "Solanalance",
            subtitle: "Onchain Freelance Platform",
            description: "Solanalance is an onchain freelance platform for recruiters to post freelance jobs where users can apply. Payment is done via Solana in stages with escrow smart contracts ensuring freelancers are protected from scams as clients pay upfront when freelancers are selected, with funds securely stored in escrow.",
            year: "2025",
            technologies: [
                { name: "Next.js", color: "cyan" },
                { name: "Tailwind CSS", color: "cyan" },
                { name: "Express", color: "red" },
                { name: "Socket.io", color: "red" },
                { name: "PostgreSQL", color: "blue" },
                { name: "S3", color: "orange" },
                { name: "GCP Compute Engine", color: "orange" },
                { name: "Nginx", color: "green" },
                { name: "Solana", color: "purple" },
                { name: "Smart Contract", color: "purple" },
                { name: "Escrow", color: "purple" }
            ],
            links: [
                { label: "System Design", url: "https://drive.google.com/file/d/1MB-e24od38Vm-QqfAQrgBYmzCYvzqudJ/view?usp=sharing" },
                { label: "GitHub", url: "https://github.com/DhruvArvindSingh/SolanaLance" },
                { label: "Web Link", url: "https://solanalance.com/" }
            ],
            color: "purple"
        },
        {
            title: "Animath",
            subtitle: "Code based Video Creation",
            description: "Animath transforms your mathematical ideas into stunning visual animations. Simply describe what you want to see, and our AI will generate Python code using Manim to create your animation. Completely scalable with the use of AWS services and Kafka with PostgreSQL database.",
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
                { label: "System Design", url: "https://drive.google.com/file/d/1ANM5375CXZCHMnyAIqO-YZXXMQXH-jp4/view?usp=sharing" },
                { label: "Web Link", url: "https://animath.dsingh.fun" },
                { label: "GitHub", url: "https://github.com/DhruvArvindSingh/Manim" }
            ],
            color: "cyan"
        },
        {
            title: "Deployer",
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
                { label: "System Design", url: "https://drive.google.com/file/d/1em_PDI4jYOZH-7eH4UZKxsKWFAsnUMwR/view?usp=sharing" },
                { label: "Web Link", url: "http://deployer.dsingh.fun" },
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
                { label: "Web Link", url: "http://collabdraw.dsingh.fun" },
                { label: "GitHub", url: "https://github.com/DhruvArvindSingh/Collab-draw" }
            ],
            color: "orange"
        },
        {
            title: "Crypto Wallet App",
            subtitle: "Cross Platform Crypto Wallet",
            description: "A cross platform crypto wallet app that allows you to manage your crypto assets and transactions. It is built with React Native, TypeScript, and Web3.js. It is a simple and easy to use wallet app that allows you to send, receive and track prices of crypto assets.",
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
                { label: "Web Link", url: "https://portfolio.dsingh.fun" }
            ],
            color: "teal"
        }
    ]

export const additionalProjects: Array<{
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
            description: "A multiplayer ludo game that allows you to play with your friends. It is built with vanilla javascript, ejs, socket.io, node.js and express. It is a simple and easy to use ludo game that allows you to play with your friends. It has both random room and custom room options.",
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
            description: "A library management system that allows you to manage your library through console. It is built with C++ using classes with .csv file for storing books and users info with realtime storage update and over 20+ features.",
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

// Homelab infrastructure data
export const homelabNodes = [
    {
        name: "node-01",
        type: "Dell Laptop",
        hostname: "dell-node",
        ram: "3 GB",
        status: "online" as const,
        services: ["MinIO S3", "Nginx Proxy", "Monitoring"],
        ip: "192.168.1.x",
        os: "Linux",
        uptime: "99.2%"
    },
    {
        name: "node-02",
        type: "Desktop CPU",
        hostname: "desktop-node",
        ram: "4 GB",
        status: "online" as const,
        services: ["Web Hosting", "Cloud Storage", "Docker Runtime"],
        ip: "192.168.1.x",
        os: "Linux",
        uptime: "98.7%"
    }
]

export const homelabServices = [
    { name: "S3 Object Storage", node: "node-01", status: "running", icon: "bucket" },
    { name: "Cloud Dashboard", node: "node-02", status: "running", icon: "cloud" },
    { name: "Website Hosting", node: "node-02", status: "running", icon: "globe" },
    { name: "Reverse Proxy", node: "node-01", status: "running", icon: "shield" },
    { name: "Docker Engine", node: "node-02", status: "running", icon: "container" },
    { name: "Monitoring Stack", node: "node-01", status: "running", icon: "chart" },
]

// Open source contribution data
export const openSourceContributions = [
    {
        org: "stdlib-js",
        project: "stdlib",
        description: "Comprehensive library of mathematical functions and algorithms",
        role: "Contributor",
        stats: { prs: 70, merged: 40, linesAdded: 25000 },
        languages: ["JavaScript", "Julia", "Fortran", "C"],
        url: "https://github.com/stdlib-js/stdlib",
        color: "pink" as ColorKey,
    },
    {
        org: "CNCF",
        project: "kgateway",
        description: "Kubernetes-native API gateway built on Envoy Proxy",
        role: "Contributor",
        stats: { prs: 5, merged: 3, linesAdded: 500 },
        languages: ["Go", "Kubernetes", "Helm"],
        url: "https://github.com/kgateway-dev/kgateway",
        color: "cyan" as ColorKey,
    }
]
