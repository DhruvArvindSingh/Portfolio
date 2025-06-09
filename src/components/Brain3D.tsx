'use client'

import { Suspense, useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

interface BrainModelProps {
    mouseX: number
    mouseY: number
}

// Lightning bolt component
function Lightning({ position, visible }: { position: [number, number, number], visible: boolean }) {
    const lightningRef = useRef<THREE.Group>(null)

    // Calculate the direction vector from origin (brain center) to position
    const direction = new THREE.Vector3(position[0], position[1], position[2]).normalize()

    useFrame((state) => {
        if (lightningRef.current && visible) {
            // Make lightning more visible - less flickering
            lightningRef.current.visible = Math.random() > 0.2
            // Faster rotation while maintaining outward direction
            lightningRef.current.rotation.z += (Math.random() - 0.5) * 0.3
            lightningRef.current.rotation.x += (Math.random() - 0.5) * 0.2
            lightningRef.current.rotation.y += (Math.random() - 0.5) * 0.2
            // More dramatic scale changes
            lightningRef.current.scale.setScalar(1.0 + Math.random() * 2.0)
        } else if (lightningRef.current) {
            lightningRef.current.visible = false
        }
    })

    // Calculate rotation to point away from brain center
    const angle = Math.atan2(direction.y, direction.x)

    return (
        <group ref={lightningRef} position={position} rotation={[0, 0, angle]}>
            {/* Main lightning bolt extending outward from brain - much longer */}
            <mesh position={[0.6, 0, 0]}>
                <boxGeometry args={[1.2, 0.025, 0.025]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={3.0} />
            </mesh>

            {/* Branch extending further out - longer */}
            <mesh position={[1.1, 0.15, 0]} rotation={[0, 0, Math.PI * 0.1]}>
                <boxGeometry args={[0.8, 0.02, 0.02]} />
                <meshStandardMaterial color="#88ffff" emissive="#88ffff" emissiveIntensity={2.5} />
            </mesh>

            {/* Another branch - longer */}
            <mesh position={[0.9, -0.12, 0]} rotation={[0, 0, -Math.PI * 0.15]}>
                <boxGeometry args={[0.6, 0.02, 0.02]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.2} />
            </mesh>

            {/* Extended end branch - much longer */}
            <mesh position={[1.4, 0.08, 0]} rotation={[0, 0, Math.PI * 0.2]}>
                <boxGeometry args={[0.5, 0.015, 0.015]} />
                <meshStandardMaterial color="#aaffff" emissive="#aaffff" emissiveIntensity={2.0} />
            </mesh>

            {/* Additional long branch for more spread */}
            <mesh position={[1.2, -0.2, 0]} rotation={[0, 0, -Math.PI * 0.25]}>
                <boxGeometry args={[0.7, 0.018, 0.018]} />
                <meshStandardMaterial color="#ccffff" emissive="#ccffff" emissiveIntensity={1.8} />
            </mesh>

            {/* Origin glow at brain surface */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.06, 8, 6]} />
                <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={4.0} />
            </mesh>
        </group>
    )
}

function BrainModel({ mouseX, mouseY }: BrainModelProps) {
    const brainRef = useRef<THREE.Group>(null)
    const { scene } = useGLTF('/brain_3D_model.glb')
    const [isBlack, setIsBlack] = useState(false)
    const [transitionProgress, setTransitionProgress] = useState(0)
    const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 })

    // Clone the scene to avoid reusing the same geometry
    const clonedScene = scene.clone()

    // Create 7 lightning positions spreading in all directions from brain surface
    const lightningPositions: [number, number, number][] = [
        [0.25, 0.35, 0.2],   // Top-right-front
        [-0.25, 0.35, -0.2], // Top-left-back
        [0.35, -0.25, 0.15], // Bottom-right-front
        [-0.35, -0.25, -0.15], // Bottom-left-back
        [0.0, 0.15, 0.4],    // Top-back
        [0.4, 0.0, -0.15],   // Right-back
        [-0.4, 0.0, 0.15]    // Left-front
    ]

    useEffect(() => {
        // Color transition every 3 seconds (faster cycle)
        const interval = setInterval(() => {
            setIsBlack(prev => !prev)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        // Track screen size for responsive brain scaling
        const updateScreenSize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        updateScreenSize()
        window.addEventListener('resize', updateScreenSize)
        return () => window.removeEventListener('resize', updateScreenSize)
    }, [])

    useEffect(() => {
        // Animate transition progress
        let animationId: number
        const startTime = Date.now()
        const duration = 1000 // 1 second transition

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Smooth easing function
            const easedProgress = 1 - Math.pow(1 - progress, 3)
            setTransitionProgress(easedProgress)

            if (progress < 1) {
                animationId = requestAnimationFrame(animate)
            }
        }

        animate()
        return () => cancelAnimationFrame(animationId)
    }, [isBlack])

    useFrame((state, delta) => {
        if (brainRef.current) {
            // Smooth rotation based on mouse position - horizontal only
            const targetRotationY = (mouseX - 0.5) * 12.57 // 2π * 2 for 360° rotation from edge to center

            // Add smooth interpolation for natural movement - horizontal only
            brainRef.current.rotation.y = THREE.MathUtils.lerp(
                brainRef.current.rotation.y,
                targetRotationY,
                0.03
            )
            // Keep X rotation fixed (no vertical rotation)
            brainRef.current.rotation.x = 0

            // Add a subtle floating animation
            brainRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15

            // Responsive scaling based on screen size
            const getResponsiveScale = () => {
                if (screenSize.width < 640) { // Mobile
                    return 0.6
                } else if (screenSize.width < 1024) { // Tablet
                    return 0.8
                } else if (screenSize.width < 1440) { // Small desktop
                    return 1.0
                } else { // Large desktop
                    return 1.2
                }
            }

            // Add subtle scaling pulse with responsive base scale
            const baseScale = getResponsiveScale()
            const scale = baseScale + Math.sin(state.clock.elapsedTime * 0.5) * 0.03
            brainRef.current.scale.set(scale, scale, scale)

            // Apply color transition to all materials
            brainRef.current.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material) {
                    const material = child.material as THREE.MeshStandardMaterial

                    if (isBlack) {
                        // Transition to dark purple (not black)
                        const targetColor = new THREE.Color(0x1a0033) // Dark purple
                        const currentColor = material.color
                        currentColor.lerp(targetColor, 0.05) // Smoother transition
                        material.emissive = new THREE.Color(0x002255).multiplyScalar(0.6)
                    } else {
                        // Transition to vibrant purple
                        const targetColor = new THREE.Color(0x8b00ff) // Bright vibrant purple
                        const currentColor = material.color
                        currentColor.lerp(targetColor, 0.05) // Smoother transition
                        material.emissive = new THREE.Color(0x4b0082).multiplyScalar(0.3)
                    }

                    material.needsUpdate = true
                }
            })
        }
    })

    return (
        <group ref={brainRef}>
            <primitive
                object={clonedScene}
                scale={[1.2, 1.2, 1.2]}
                position={[0, 0, 0]}
            />

            {/* Lightning bolts when brain is in dark purple phase */}
            {lightningPositions.map((pos, index) => (
                <Lightning
                    key={index}
                    position={pos}
                    visible={isBlack}
                />
            ))}
        </group>
    )
}

// Floating decorative element
function FloatingShape({ position, shape, color, size, speed }: {
    position: [number, number, number],
    shape: 'sphere' | 'box' | 'octahedron' | 'torus',
    color: string,
    size: number,
    speed: number
}) {
    const meshRef = useRef<THREE.Mesh>(null)
    const basePosition = useRef(position)

    useFrame((state) => {
        if (meshRef.current) {
            // Constant rotation independent of cursor
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4
            meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.2

            // Gentle floating motion around base position
            meshRef.current.position.x = basePosition.current[0] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3
            meshRef.current.position.y = basePosition.current[1] + Math.cos(state.clock.elapsedTime * speed * 0.3) * 0.2
            meshRef.current.position.z = basePosition.current[2] + Math.sin(state.clock.elapsedTime * speed * 0.4) * 0.25
        }
    })

    const renderShape = () => {
        switch (shape) {
            case 'sphere':
                return <sphereGeometry args={[size, 16, 12]} />
            case 'box':
                return <boxGeometry args={[size, size, size]} />
            case 'octahedron':
                return <octahedronGeometry args={[size]} />
            case 'torus':
                return <torusGeometry args={[size, size * 0.3, 8, 16]} />
        }
    }

    return (
        <mesh ref={meshRef} position={position}>
            {renderShape()}
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.2}
                transparent
                opacity={0.7}
            />
        </mesh>
    )
}

// Rotating Torus Knot Element
function TorusKnotElement() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.6
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.4
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.3
        }
    })

    return (
        <mesh ref={meshRef} position={[-8, 2, -5]}>
            <torusKnotGeometry args={[0.4, 0.1, 64, 8]} />
            <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.3} />
        </mesh>
    )
}

// Rotating Dodecahedron Element
function DodecahedronElement() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.7
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.2
        }
    })

    return (
        <mesh ref={meshRef} position={[8, -1, 4]}>
            <dodecahedronGeometry args={[0.35]} />
            <meshStandardMaterial color="#4ecdc4" emissive="#4ecdc4" emissiveIntensity={0.4} />
        </mesh>
    )
}

// Rotating floating particle system 
function FloatingParticles() {
    const particlesRef = useRef<THREE.Group>(null)

    // Use deterministic positions to avoid hydration mismatch
    const particles = Array.from({ length: 20 }, (_, i) => {
        // Create pseudo-random but deterministic values based on index
        const seedX = (i * 7.13) % 1
        const seedY = (i * 3.47) % 1
        const seedZ = (i * 5.89) % 1
        const seedSize = (i * 2.31) % 1

        return {
            position: [
                (seedX - 0.5) * 15,
                (seedY - 0.5) * 10,
                (seedZ - 0.5) * 10
            ] as [number, number, number],
            size: 0.02 + seedSize * 0.03,
        }
    })

    useFrame((state) => {
        if (particlesRef.current) {
            // Slow orbital rotation around the scene center
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1
            particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05
            particlesRef.current.rotation.z = state.clock.elapsedTime * 0.03
        }
    })

    return (
        <group ref={particlesRef}>
            {particles.map((particle, i) => (
                <mesh key={i} position={particle.position}>
                    <sphereGeometry args={[particle.size, 8, 6]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        emissive="#88ffff"
                        emissiveIntensity={1.0}
                        transparent
                        opacity={0.8}
                    />
                </mesh>
            ))}
        </group>
    )
}

// Animated Fire Particle for Rocket
function RocketFireParticle({ position, delay }: { position: [number, number, number], delay: number }) {
    const meshRef = useRef<THREE.Mesh>(null)
    const [initialY] = useState(position[1])

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.elapsedTime + delay

            // Upward movement with randomness
            meshRef.current.position.y = initialY + Math.sin(time * 3) * 0.2 + time * 0.8
            meshRef.current.position.x = position[0] + Math.sin(time * 4) * 0.08
            meshRef.current.position.z = position[2] + Math.cos(time * 3.5) * 0.08

            // Scale animation (shrinks as it goes up)
            const scale = Math.max(0.05, 0.8 - (time * 0.4) % 1)
            meshRef.current.scale.setScalar(scale)

            // Reset position when particle gets too high
            if (meshRef.current.position.y > initialY + 1.5) {
                meshRef.current.position.y = initialY
            }

            // Opacity animation
            const material = meshRef.current.material as THREE.MeshStandardMaterial
            material.opacity = scale * 1.2
        }
    })

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.03, 6, 4]} />
            <meshStandardMaterial
                color="#ff4500"
                emissive="#ff6600"
                emissiveIntensity={3.0}
                transparent
                opacity={0.9}
            />
        </mesh>
    )
}

// Beautiful Rocket Component
function BeautifulRocket() {
    const rocketRef = useRef<THREE.Group>(null)
    const [colorPhase, setColorPhase] = useState(0)
    const [screenSize, setScreenSize] = useState({ width: 1920, height: 1080 })

    // Fire particles with deterministic positions to avoid hydration issues
    const fireParticles = Array.from({ length: 12 }, (_, i) => ({
        position: [
            ((i * 7.13) % 1 - 0.5) * 0.15,
            -0.4 + ((i * 3.47) % 1) * 0.1,
            ((i * 5.89) % 1 - 0.5) * 0.15
        ] as [number, number, number],
        delay: (i * 2.31) % 2
    }))

    useEffect(() => {
        // Track screen size for responsive positioning
        const updateScreenSize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        updateScreenSize()
        window.addEventListener('resize', updateScreenSize)
        return () => window.removeEventListener('resize', updateScreenSize)
    }, [])

    useFrame((state) => {
        if (rocketRef.current) {
            // Responsive positioning based on screen size
            const getResponsivePosition = () => {
                if (screenSize.width < 640) { // Mobile
                    return { x: -2.5, scale: 1.0 }
                } else if (screenSize.width < 1024) { // Tablet
                    return { x: -3.5, scale: 1.5 }
                } else { // Desktop
                    return { x: -4.5, scale: 2.0 }
                }
            }

            const { x: leftPosition, scale: rocketScale } = getResponsivePosition()
            const time = state.clock.elapsedTime * 0.2 // Slower movement

            rocketRef.current.position.x = leftPosition // Responsive left position
            rocketRef.current.position.y = Math.sin(time) * 0.5 // Slow vertical movement
            rocketRef.current.position.z = 0 // Fixed depth

            // Responsive rocket scale
            rocketRef.current.scale.set(rocketScale, rocketScale, rocketScale)

            // No rotation - keep rocket upright
            rocketRef.current.rotation.x = 0
            rocketRef.current.rotation.y = 0
            rocketRef.current.rotation.z = 0

            // Color phase cycling
            setColorPhase(Math.floor(time * 1.5) % 3)
        }
    })

    // Dynamic colors based on phase
    const getColors = () => {
        switch (colorPhase) {
            case 0: return { body: '#e0e0e0', nose: '#ff4444', accent: '#ff0000' }
            case 1: return { body: '#f0f0f0', nose: '#4444ff', accent: '#0000ff' }
            case 2: return { body: '#efefef', nose: '#44ff44', accent: '#00ff00' }
            default: return { body: '#e0e0e0', nose: '#ff4444', accent: '#ff0000' }
        }
    }

    const colors = getColors()

    return (
        <group ref={rocketRef}>
            {/* Rocket Body with enhanced details */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.06, 0.08, 0.4, 12]} />
                <meshStandardMaterial
                    color={colors.body}
                    metalness={0.9}
                    roughness={0.1}
                    emissive="#ffffff"
                    emissiveIntensity={0.1}
                />
            </mesh>

            {/* Rocket Nose Cone with gradient effect */}
            <mesh position={[0, 0.25, 0]}>
                <coneGeometry args={[0.06, 0.15, 12]} />
                <meshStandardMaterial
                    color={colors.nose}
                    metalness={0.7}
                    roughness={0.2}
                    emissive={colors.accent}
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* Enhanced Rocket Fins with metallic finish */}
            <group position={[0, -0.15, 0]}>
                {[0, 90, 180, 270].map((angle, i) => (
                    <mesh
                        key={i}
                        position={[
                            Math.cos((angle * Math.PI) / 180) * 0.08,
                            0,
                            Math.sin((angle * Math.PI) / 180) * 0.08
                        ]}
                        rotation={[0, (angle * Math.PI) / 180, 0]}
                    >
                        <boxGeometry args={[0.015, 0.1, 0.06]} />
                        <meshStandardMaterial
                            color="#666666"
                            metalness={0.8}
                            roughness={0.2}
                            emissive="#333333"
                            emissiveIntensity={0.1}
                        />
                    </mesh>
                ))}
            </group>

            {/* Detailed Engine Nozzle */}
            <mesh position={[0, -0.25, 0]}>
                <cylinderGeometry args={[0.04, 0.06, 0.08, 12]} />
                <meshStandardMaterial
                    color="#222222"
                    metalness={0.95}
                    roughness={0.05}
                    emissive="#ff3300"
                    emissiveIntensity={0.4}
                />
            </mesh>

            {/* Engine Inner Core */}
            <mesh position={[0, -0.28, 0]}>
                <cylinderGeometry args={[0.025, 0.035, 0.04, 8]} />
                <meshStandardMaterial
                    color="#ff4400"
                    emissive="#ff6600"
                    emissiveIntensity={1.0}
                />
            </mesh>

            {/* Enhanced Fire Effect */}
            <group position={[0, -0.3, 0]}>
                {fireParticles.map((particle, i) => (
                    <RocketFireParticle
                        key={i}
                        position={particle.position}
                        delay={particle.delay}
                    />
                ))}
            </group>

            {/* Dynamic Lighting */}
            <pointLight
                position={[0, -0.3, 0]}
                color="#ff4500"
                intensity={2.5}
                distance={5}
            />

            {/* Accent lighting */}
            <pointLight
                position={[0, 0.2, 0]}
                color={colors.accent}
                intensity={0.8}
                distance={4}
            />

            {/* Additional visibility light */}
            <pointLight
                position={[0, 0, 0]}
                color="#ffffff"
                intensity={0.5}
                distance={3}
            />
        </group>
    )
}

// Background elements scene (not affected by cursor)
function BackgroundScene() {
    const { camera } = useThree()

    useEffect(() => {
        camera.position.set(0, 0, 5)
    }, [camera])

    // Define floating shapes positions and properties
    const floatingShapes = [
        { position: [-6, 3, -2] as [number, number, number], shape: 'octahedron' as const, color: '#9333ea', size: 0.3, speed: 1.2 },
        { position: [6, -2, -3] as [number, number, number], shape: 'torus' as const, color: '#ec4899', size: 0.25, speed: 0.8 },
        { position: [-5, -3, 2] as [number, number, number], shape: 'box' as const, color: '#06b6d4', size: 0.2, speed: 1.5 },
        { position: [5, 3, 1] as [number, number, number], shape: 'sphere' as const, color: '#10b981', size: 0.35, speed: 1.0 },
        { position: [-7, 0, -4] as [number, number, number], shape: 'octahedron' as const, color: '#f59e0b', size: 0.28, speed: 1.3 },
        { position: [7, 1, 3] as [number, number, number], shape: 'torus' as const, color: '#8b5cf6', size: 0.22, speed: 0.9 },
        { position: [-4, 4, 3] as [number, number, number], shape: 'sphere' as const, color: '#ef4444', size: 0.32, speed: 1.1 },
        { position: [4, -4, -1] as [number, number, number], shape: 'box' as const, color: '#06b6d4', size: 0.25, speed: 1.4 },
        { position: [0, 6, -3] as [number, number, number], shape: 'octahedron' as const, color: '#84cc16', size: 0.3, speed: 0.7 },
        { position: [0, -6, 2] as [number, number, number], shape: 'torus' as const, color: '#f97316', size: 0.27, speed: 1.6 },
    ]

    return (
        <>
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={0.15} color="#ffffff" />

            {/* Floating decorative shapes */}
            {floatingShapes.map((shape, index) => (
                <FloatingShape
                    key={index}
                    position={shape.position}
                    shape={shape.shape}
                    color={shape.color}
                    size={shape.size}
                    speed={shape.speed}
                />
            ))}

            {/* Floating particles */}
            <FloatingParticles />

            {/* Additional ambient elements with independent rotation */}
            <TorusKnotElement />
            <DodecahedronElement />

            {/* Beautiful Rocket */}
            <BeautifulRocket />
        </>
    )
}

// Brain scene (affected by cursor)
function BrainScene({ mouseX, mouseY }: BrainModelProps) {
    const { camera } = useThree()

    useEffect(() => {
        camera.position.set(0, 0, 5)
    }, [camera])

    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
            <directionalLight position={[-10, -5, 2]} intensity={0.3} color="#4f46e5" />
            <pointLight position={[0, 0, 10]} intensity={0.2} color="#ec4899" />
            <pointLight position={[5, 5, 5]} intensity={0.25} color="#00ffff" />
            {/* Additional lighting for lightning visibility */}
            <pointLight position={[2, 2, 2]} intensity={0.3} color="#00ffff" />
            <pointLight position={[-2, -2, 2]} intensity={0.3} color="#00ffff" />

            {/* Main brain model */}
            <BrainModel mouseX={mouseX} mouseY={mouseY} />
        </>
    )
}

export default function Brain3D() {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

    useEffect(() => {
        const handleGlobalMouseMove = (event: MouseEvent) => {
            // Global mouse movement for the entire viewport
            setMousePosition({
                x: event.clientX / window.innerWidth,
                y: event.clientY / window.innerHeight
            })
        }

        // Listen to global mouse movement for full-page interaction
        document.addEventListener('mousemove', handleGlobalMouseMove)

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove)
        }
    }, [])

    return (
        <div
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }}
        >
            {/* Background Canvas - Stars and decorative elements */}
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: 'transparent', position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                gl={{ alpha: true, antialias: true }}
            >
                <Suspense fallback={null}>
                    <BackgroundScene />
                </Suspense>
            </Canvas>

            {/* Foreground Canvas - Brain with cursor interaction */}
            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                style={{ background: 'transparent', position: 'absolute', top: 0, left: 0, zIndex: 2 }}
                gl={{ alpha: true, antialias: true }}
            >
                <Suspense fallback={null}>
                    <BrainScene
                        mouseX={mousePosition.x}
                        mouseY={mousePosition.y}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}

// Preload the GLB model
useGLTF.preload('/brain_3D_model.glb') 