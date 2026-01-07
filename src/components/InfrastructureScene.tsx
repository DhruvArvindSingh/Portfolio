'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, Text, Instances, Instance } from '@react-three/drei'
import * as THREE from 'three'

// --- Constants ---
const SERVER_COUNT = 40
const DATA_PACKET_COUNT = 100
const RACK_COLOR = '#2a2a2a' // Lighter gray for better visibility
const LED_COLOR_GREEN = '#00FF41'
const LED_COLOR_BLUE = '#2496ED'
const LED_COLOR_PURPLE = '#627EEA'
const LED_COLOR_RED = '#FF0055'
const LED_COLOR_ORANGE = '#FF9900'

// --- Components ---

function ServerUnit({ position, rotation, scale, color = RACK_COLOR }: { position: [number, number, number], rotation?: [number, number, number], scale?: [number, number, number], color?: string }) {
  return (
    <group position={position} rotation={rotation ? new THREE.Euler(...rotation) : undefined} scale={scale ? new THREE.Vector3(...scale) : undefined}>
      {/* Server Chassis - Brighter and more metallic */}
      <mesh>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.3} 
          metalness={0.7} 
          emissive="#111111"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Front Panel LEDs Background */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[0.95, 0.18]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
      {/* Blinking Lights */}
      <ServerLights />
    </group>
  )
}

function ServerLights() {
  const lightsRef = useRef<THREE.Group>(null)
  
  useFrame(() => {
    if (lightsRef.current) {
      lightsRef.current.children.forEach((light) => {
        if (light instanceof THREE.Mesh && light.material instanceof THREE.Material) {
           if (Math.random() > 0.95) {
             light.material.opacity = Math.random() > 0.5 ? 1 : 0.3
           }
        }
      })
    }
  })

  // More lights with varied colors
  return (
    <group ref={lightsRef} position={[0, 0, 0.52]}>
      {/* Status Indicators */}
      <mesh position={[-0.4, 0, 0]}>
        <circleGeometry args={[0.03, 8]} />
        <meshBasicMaterial color={LED_COLOR_GREEN} transparent toneMapped={false} />
      </mesh>
      <mesh position={[-0.3, 0, 0]}>
        <circleGeometry args={[0.03, 8]} />
        <meshBasicMaterial color={LED_COLOR_BLUE} transparent toneMapped={false} />
      </mesh>
      
      {/* Activity Lights */}
      <mesh position={[0.1, 0, 0]}>
        <planeGeometry args={[0.08, 0.04]} />
        <meshBasicMaterial color={LED_COLOR_PURPLE} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0.25, 0, 0]}>
        <planeGeometry args={[0.08, 0.04]} />
        <meshBasicMaterial color={LED_COLOR_ORANGE} transparent toneMapped={false} />
      </mesh>
      <mesh position={[0.4, 0, 0]}>
        <planeGeometry args={[0.08, 0.04]} />
        <meshBasicMaterial color={LED_COLOR_RED} transparent toneMapped={false} />
      </mesh>
    </group>
  )
}

function DataPackets() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const count = DATA_PACKET_COUNT
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame(() => {
    if (!meshRef.current) return
    
    particles.forEach((particle, i) => {
      // eslint-disable-next-line prefer-const
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)
      
      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshBasicMaterial color={LED_COLOR_GREEN} wireframe />
    </instancedMesh>
  )
}

function CentralServerRack({ scrollY }: { scrollY: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Rotate based on scroll
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1 + scrollY * 0.002
      
      // Morph/Expand based on scroll
      const expansion = Math.min(1 + scrollY * 0.001, 2)
      groupRef.current.scale.set(expansion, expansion, expansion)
    }
  })

  // Generate a tower of servers
  const servers = useMemo(() => {
    const items = []
    for (let i = 0; i < SERVER_COUNT; i++) {
      items.push(
        <ServerUnit 
          key={i} 
          position={[0, (i - SERVER_COUNT / 2) * 0.25, 0]} 
          rotation={[0, i * 0.1, 0]} // Spiral effect
        />
      )
    }
    return items
  }, [])

  return (
    <group ref={groupRef}>
      {servers}
      {/* Central Core Glow */}
      <pointLight position={[0, 0, 0]} intensity={2} color={LED_COLOR_PURPLE} distance={5} />
    </group>
  )
}

function MovingLights({ count = 10 }) {
  const lights = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15 - 5
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.05
      )
    }))
  }, [count])

  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const light = lights[i]
        child.position.add(light.velocity)
        
        // Bounce off boundaries
        if (Math.abs(child.position.x) > 20) light.velocity.x *= -1
        if (Math.abs(child.position.y) > 20) light.velocity.y *= -1
        if (Math.abs(child.position.z) > 15) light.velocity.z *= -1
      })
    }
  })

  return (
    <group ref={groupRef}>
      {lights.map((_, i) => (
        <pointLight 
          key={i} 
          position={lights[i].position} 
          intensity={1.5} 
          color={LED_COLOR_GREEN} 
          distance={15} 
          decay={2}
        />
      ))}
    </group>
  )
}

function SceneContent() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 10, 30]} />
      
      {/* Lighting */}
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2.5} color={LED_COLOR_BLUE} distance={50} />
      <pointLight position={[-10, -10, -10]} intensity={2.5} color={LED_COLOR_GREEN} distance={50} />
      <pointLight position={[0, 5, 5]} intensity={3} color="#ffffff" distance={30} />
      
      <spotLight position={[0, 10, 0]} intensity={2} angle={0.5} penumbra={1} color={LED_COLOR_PURPLE} />

      {/* Dynamic Scroll Light */}
      <pointLight 
        position={[0, 0, 2]} 
        intensity={2 + scrollY * 0.005} 
        color={LED_COLOR_GREEN} 
        distance={20} 
        decay={2}
      />
      
      {/* Backlight */}
      <spotLight
        position={[0, 5 - scrollY * 0.01, -5]}
        intensity={5}
        angle={0.6}
        penumbra={0.5}
        color={LED_COLOR_BLUE}
      />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <CentralServerRack scrollY={scrollY} />
      </Float>

      <DataPackets />
      
      {/* Background Elements */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Floating Grid / Cyberpunk Background */}
      <gridHelper args={[100, 100, '#1a1a1a', '#0a0a0a']} position={[0, -10, 0]} rotation={[0, 0, 0]} />
      <gridHelper args={[100, 100, '#1a1a1a', '#0a0a0a']} position={[0, 10, 0]} rotation={[0, 0, 0]} />
      
      {/* Floating Particles/Debris */}
      <Instances range={100}>
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color="#333" transparent opacity={0.4} />
        {Array.from({ length: 100 }).map((_, i) => (
          <Instance
            key={i}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10 - 5
            ] as [number, number, number]}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number]}
          />
        ))}
      </Instances>

      {/* Moving Green Lights */}
      <MovingLights count={10} />

      {/* Floating Text Elements representing "Nodes" & "Hashes" */}
      <group position={[3, 2, -2]}>
        <Text fontSize={0.2} color={LED_COLOR_GREEN}>
          NODE_01 [ACTIVE]
        </Text>
      </group>
      <group position={[-3, -1, 2]}>
        <Text fontSize={0.2} color={LED_COLOR_BLUE}>
          HASH: 0x4f...a2
        </Text>
      </group>
      <group position={[4, -4, -5]}>
        <Text fontSize={0.3} color={LED_COLOR_PURPLE}>
          ENCRYPTED_DATA
        </Text>
      </group>
      <group position={[-5, 5, -8]}>
        <Text fontSize={0.4} color={LED_COLOR_ORANGE}>
          CONTAINER_REGISTRY
        </Text>
      </group>
    </>
  )
}

export default function InfrastructureScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <SceneContent />
      </Canvas>
    </div>
  )
}
