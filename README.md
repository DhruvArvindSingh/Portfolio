This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment Options

This portfolio can be deployed in multiple ways. Choose the method that best fits your needs:

### 🐳 Docker Deployment

#### Using Pre-built Image from Docker Hub
```bash
# Pull and run the latest image
docker pull dhruvarvindsingh01/portfolio:latest
docker run -p 3000:3000 dhruvarvindsingh01/portfolio:latest

# Or run a specific version
docker run -p 3000:3000 dhruvarvindsingh01/portfolio:v1.0.0
```

#### Building Locally
```bash
# Build the Docker image
docker build -t portfolio .

# Run the container
docker run -p 3000:3000 portfolio
```

#### Using Docker Compose
Create a `docker-compose.yml` file:
```yaml
version: '3.8'
services:
  portfolio:
    image: dhruvarvindsingh01/portfolio:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

Then run:
```bash
docker-compose up -d
```

### ☁️ Cloud Platform Deployments

#### Vercel (Recommended for Next.js)
1. Push your code to GitHub
2. Visit [Vercel](https://vercel.com/new)
3. Import your GitHub repository
4. Deploy with one click

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

#### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to [Netlify](https://netlify.com)
3. Or connect your GitHub repo for automatic deployments

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### DigitalOcean App Platform
1. Create a new app on [DigitalOcean](https://cloud.digitalocean.com/apps)
2. Connect your GitHub repository
3. Configure build settings:
   - Build Command: `npm run build`
   - Run Command: `npm start`

### 🚀 VPS/Server Deployment

#### Using PM2 (Process Manager)
```bash
# Install PM2 globally
npm install -g pm2

# Build the project
npm run build

# Start with PM2
pm2 start npm --name "portfolio" -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

#### Using Docker on VPS
```bash
# On your server
docker pull dhruvarvindsingh01/portfolio:latest
docker run -d -p 3000:3000 --name portfolio dhruvarvindsingh01/portfolio:latest

# With reverse proxy (nginx)
# Map port 3000 to your domain
```

#### Traditional Server Deployment
```bash
# Build the project
npm run build

# Start the production server
npm start
```

### 🔧 Environment Configuration

Create a `.env.local` file for environment variables:
```env
# Add any environment variables here
NEXT_PUBLIC_API_URL=your_api_url
```

### 📊 Production Considerations

- **Performance**: The app includes 3D models - ensure your hosting platform can handle the asset loading
- **Memory**: React Three Fiber applications may require more memory allocation
- **CDN**: Consider using a CDN for the 3D model files in `/public` folder
- **SSL**: Always use HTTPS in production for security

### 🔍 Health Check

After deployment, verify your application:
```bash
# Check if the app is running
curl http://your-domain.com

# Or for Docker
curl http://localhost:3000
```

### 📝 Notes

- The Docker image is optimized for production with multi-stage builds
- All 3D assets and models are included in the container
- The app uses Next.js standalone output for optimal Docker performance
- Port 3000 is exposed by default (configurable via PORT environment variable)
