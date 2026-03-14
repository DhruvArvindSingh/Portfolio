'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

// --- Constants (reduced for performance) ---
const SERVER_COUNT = 12
const DATA_PACKET_COUNT = 25

const LED_COLOR_GREEN = '#00FF41'
const LED_COLOR_BLUE = '#2496ED'
const LED_COLOR_PURPLE = '#627EEA'

// --- Components ---

// Static server unit - no per-frame updates
function ServerUnit({ position, rotation }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation ? new THREE.Euler(...rotation) : undefined}>
      <mesh>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Static LEDs - no useFrame */}
      <group position={[0, 0, 0.52]}>
        <mesh position={[-0.4, 0, 0]}>
          <circleGeometry args={[0.03, 6]} />
          <meshBasicMaterial color={LED_COLOR_GREEN} toneMapped={false} />
        </mesh>
        <mesh position={[-0.3, 0, 0]}>
          <circleGeometry args={[0.03, 6]} />
          <meshBasicMaterial color={LED_COLOR_BLUE} toneMapped={false} />
        </mesh>
      </group>
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
      temp.push({
        t: Math.random() * 100,
        factor: 20 + Math.random() * 100,
        speed: 0.005 + Math.random() / 400, // Slower = fewer updates needed
        xFactor: -50 + Math.random() * 100,
        yFactor: -50 + Math.random() * 100,
        zFactor: -50 + Math.random() * 100,
      })
    }
    return temp
  }, [count])

  useFrame(() => {
    if (!meshRef.current) return

    particles.forEach((particle, i) => {
      const { factor, xFactor, yFactor, zFactor } = particle
      const t = (particle.t += particle.speed)
      const a = Math.cos(t) + Math.sin(t) * 0.1
      const b = Math.sin(t) + Math.cos(t * 2) * 0.1
      const s = Math.cos(t)

      dummy.position.set(
        a * 2 + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t) * factor) / 10,
        b * 2 + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        b * 2 + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
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

function CentralServerRack() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
    }
  })

  const servers = useMemo(() => {
    const items = []
    for (let i = 0; i < SERVER_COUNT; i++) {
      items.push(
        <ServerUnit
          key={i}
          position={[0, (i - SERVER_COUNT / 2) * 0.25, 0]}
          rotation={[0, i * 0.1, 0]}
        />
      )
    }
    return items
  }, [])

  return (
    <group ref={groupRef}>
      {servers}
      <pointLight position={[0, 0, 0]} intensity={2} color={LED_COLOR_PURPLE} distance={5} />
    </group>
  )
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#050505', 10, 30]} />

      {/* Simplified lighting - 3 lights instead of 8+ */}
      <ambientLight intensity={1.2} />
      <pointLight position={[10, 10, 10]} intensity={2} color={LED_COLOR_BLUE} distance={50} />
      <pointLight position={[-10, -10, -10]} intensity={2} color={LED_COLOR_GREEN} distance={50} />

      <CentralServerRack />
      <DataPackets />

      {/* Reduced star count from 5000 to 1200 */}
      <Stars radius={100} depth={50} count={1200} factor={4} saturation={0} fade speed={0.5} />

      {/* Single grid instead of two */}
      <gridHelper args={[100, 50, '#1a1a1a', '#0a0a0a']} position={[0, -10, 0]} />
    </>
  )
}

export default function InfrastructureScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          powerPreference: 'high-performance',
          antialias: false,
          stencil: false,
          depth: true,
        }}
        performance={{ min: 0.5 }}
      >
        <SceneContent />
      </Canvas>
    </div>
  )
}
