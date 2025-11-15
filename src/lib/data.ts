import { ColorKey } from './colorMap';

export const experiences: Array<{
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
            title: "Animath",
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
                { label: "System Design", url: "https://drive.google.com/file/d/1oEDFMWCF3z5S3BOMf_SqIo9yXR6RxDX1/view?usp=sharing" },
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
