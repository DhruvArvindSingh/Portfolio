# README.md for Dhruv's Interactive 3D Portfolio

## 🚀 Overview
A cutting-edge, interactive 3D portfolio built with Next.js 15, TypeScript, and Three.js. Features a dynamic 3D brain visualization with lightning effects, showcasing advanced web development skills and immersive user experiences.

## ✨ Features
- **Interactive 3D Brain**: Real-time 3D model with mouse-responsive lightning effects
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile
- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS v4
- **Performance Optimized**: Turbopack dev server, optimized 3D rendering
- **Dark Theme**: Professional dark UI with vibrant accent colors
- **Smooth Animations**: CSS transforms and 3D animations throughout

## 🛠 Tech Stack
- **Frontend**: Next.js 15.3.3, React 19, TypeScript
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Styling**: Tailwind CSS v4
- **Deployment**: PM2 for production
- **Linting**: ESLint 9 with Next.js config

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup
```bash
# Clone the repository
git clone [repository-url]
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🚀 Development Commands
```bash
pnpm dev          # Start dev server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm restart      # Restart PM2 processes
```

## 🎨 Color System
The project uses a centralized color mapping system in `src/lib/colorMap.ts`:
- **Purple**: Primary accent for projects
- **Pink**: Secondary accent for experiences
- **Cyan**: Tertiary accent for highlights
- **Gray**: Neutral tones and backgrounds

## 📁 Project Structure
```
portfolio/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Reusable React components
│   └── lib/             # Utilities and configurations
├── public/              # Static assets (3D models, images)
└── [config files]
```

## 🎯 Key Components
- **Brain3D.tsx**: Interactive 3D brain with lightning effects
- **ProjectCard.tsx**: Project showcase cards with hover effects
- **ExperienceCard.tsx**: Professional experience timeline
- **colorMap.ts**: Centralized color system

## 🔧 Configuration
### Environment Variables
Create `.env.local` for production:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3D Model
The 3D brain model is located at `public/brain_3D_model.glb`. To replace:
1. Export your model as `.glb`
2. Place in `public/` directory
3. Update references in `Brain3D.tsx`

## 📱 Responsive Design
- **Mobile**: Single column layout with touch-friendly cards
- **Tablet**: Optimized spacing and font sizes
- **Desktop**: Multi-column layouts with hover effects

## 🚀 Deployment
### Vercel (Recommended)
```bash
vercel --prod
```

### Self-hosted with PM2
```bash
pnpm build
pm2 start ecosystem.config.js
```

## 🤝 Contributing
1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License
This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact
- **Portfolio**: [Live Demo](https://yourdomain.com)
- **Email**: dhruv@example.com
- **LinkedIn**: [Connect](https://linkedin.com/in/dhruv)

---

Built with ❤️ using Next.js and Three.js