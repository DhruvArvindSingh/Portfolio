# Kimi K2 Generated Code

**Task**: create a README.md

**Generated on**: Fri Aug  1 18:57:06 UTC 2025

## Generated Content

```
# README.md for Dhruv's Portfolio

## FILES_TO_CREATE
- README.md

## FILES_TO_MODIFY
- None (creating new README.md file)

## CODE_CHANGES

```markdown
# Dhruv's Portfolio 🧠⚡

An interactive 3D portfolio showcasing cutting-edge web development with Three.js, Next.js, and React Three Fiber. This portfolio features a dynamic brain visualization with lightning effects, smooth animations, and a modern dark theme.

![Portfolio Preview](https://via.placeholder.com/800x400/0a0a0a/ffffff?text=3D+Brain+Portfolio)

## 🚀 Features

- **Interactive 3D Brain Model** - Real-time 3D brain visualization with dynamic lightning effects
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern Tech Stack** - Built with Next.js 15, React 19, TypeScript, and Tailwind CSS v4
- **Smooth Animations** - Framer-motion-like transitions and hover effects
- **Dark Theme** - Sleek dark interface with accent colors
- **Performance Optimized** - Efficient 3D rendering with React Three Fiber
- **SEO Ready** - Built-in Next.js SEO optimization

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 15.3.3** - React framework for production
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework

### 3D & Animation
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **GLTF Models** - 3D brain model integration

### Development Tools
- **ESLint** - Code linting
- **PM2** - Process manager for production
- **Turbopack** - Fast development server

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm/pnpm package manager

### Quick Start

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Start development server**
```bash
npm run dev
# or
pnpm dev
```

4. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build & Deploy

### Development
```bash
npm run dev
# Runs on http://localhost:3000 with Turbopack
```

### Production Build
```bash
npm run build
npm start
# Runs optimized production build
```

### PM2 Deployment
```bash
npm run build
npm run restart
# Restarts PM2 processes
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── Brain3D.tsx     # 3D brain visualization
│   │   ├── ExperienceCard.tsx
│   │   └── ProjectCard.tsx
│   └── lib/
│       └── colorMap.ts     # Color system
├── public/                 # Static assets
│   ├── brain_3D_model.glb
│   └── *.svg
├── next.config.ts         # Next.js configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json
```

## 🎨 Color System

The portfolio uses a consistent color system defined in `src/lib/colorMap.ts`:

- **Purple** - Primary accent color
- **Pink** - Secondary accent color  
- **Cyan** - Tertiary accent color
- **Gray** - Neutral tones

Each color includes variants for backgrounds, borders, text, shadows, and hover states.

## 🧠 3D Brain Features

The 3D brain visualization includes:

- **Interactive Rotation** - Mouse-controlled rotation
- **Lightning Effects** - Dynamic lightning bolts with flickering
- **Responsive Scaling** - Adapts to screen size
- **Performance Optimized** - Efficient rendering with LOD
- **Dark/Light Mode** - Adapts to system preferences

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile** < 768px
- **Tablet** 768px - 1024px
- **Desktop** > 1024px

Components adapt their layout, spacing, and interactions based on screen size.

## 🔧 Customization

### Adding New Projects/Experiences

Edit the data arrays in `src/app/page.tsx`:

```typescript
const projects = [
  {
    title: "Your Project",
    subtitle: "Brief description",
    description: "Detailed description",
    year: "2024",
    technologies: [{ name: "Tech", color: "purple" }],
    links: [{ label: "GitHub", url: "https://github.com" }],
    color: "purple" as ColorKey
  }
]
```

### Changing Colors

Modify the color system in `src/lib/colorMap.ts`:

```typescript
export const colorMap = {
  yourColor: {
    bg: 'bg-yourcolor-500',
    border: 'border-yourcolor-500',
    // ... other variants
  }
}
```

### Updating 3D Model

Replace `public/brain_3D_model.glb` with your GLTF model and update the path in `Brain3D.tsx`.

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Docker
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

### Self-hosted with PM2
```bash
npm run build
pm2 start npm --name "portfolio" -- start
```

## 📝 Environment Variables

Create `.env.local` for environment-specific configurations:

```bash
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# Optional: API endpoints
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: dhruv@example.com
- **LinkedIn**: [linkedin.com/in/dhruv](https://linkedin.com/in/dhruv)
- **GitHub**: [github.com/dhruv](https://github.com/dhruv)

---

Built with ❤️ using Next.js, Three.js, and React Three Fiber
```

## INSTRUCTIONS

1. **Create the README.md file** in the root directory of the portfolio project
2. **Update placeholder URLs** in the README.md with actual links:
   - Repository URL
   - Personal email
   - LinkedIn profile URL
   - GitHub profile URL
3. **Add actual screenshot** under "Portfolio Preview" section once deployed
4. **Customize content** in the "Adding New Projects/Experiences" section based on actual data
5. **Review and adjust** any technical details based on the final deployment setup

The README provides comprehensive documentation covering installation, usage, customization, and deployment of the 3D portfolio.
```
