"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import type { Group } from "three"
import { gsap } from "gsap"

export default function JusticeScales(props: any) {
  const group = useRef<Group>(null)

  // This is a placeholder for the actual 3D model
  // In a real implementation, you would use a proper GLTF model
  useEffect(() => {
    if (group.current) {
      gsap.to(group.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none",
      })
    }
  }, [])

  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1

      // Add subtle rotation to make it more dynamic
      group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Base */}
      <mesh position={[0, -0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.7, 0.2, 32]} />
        <meshStandardMaterial color="#0c2d6b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Pillar */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.5, 16]} />
        <meshStandardMaterial color="#0c2d6b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Top bar */}
      <mesh position={[0, 1, 0]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.1, 0.1]} />
        <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Left scale */}
      <group position={[-0.7, 0.8, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Add decorative elements */}
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.2, 0.02, 16, 32]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            roughness={0.1}
            emissive="#d4af37"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Right scale */}
      <group position={[0.7, 0.8, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Add decorative elements */}
        <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
          <torusGeometry args={[0.2, 0.02, 16, 32]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.9}
            roughness={0.1}
            emissive="#d4af37"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* Add decorative elements to the base */}
      <mesh position={[0, -0.4, 0]} castShadow receiveShadow>
        <torusGeometry args={[0.6, 0.03, 16, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.1}
          emissive="#d4af37"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}

