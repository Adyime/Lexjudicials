"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Float, OrbitControls } from "@react-three/drei"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface DecorativeElementProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center-left" | "center-right"
  type?: "scales" | "gavel" | "book" | "pillar" | "ring"
  size?: "small" | "medium" | "large"
  opacity?: number
  className?: string
}

export default function DecorativeElement({
  position = "top-right",
  type = "scales",
  size = "medium",
  opacity = 0.3,
  className = "",
}: DecorativeElementProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle SSR
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === "dark"

  // Determine size dimensions
  const dimensions = {
    small: "w-16 h-16 md:w-20 md:h-20",
    medium: "w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40",
    large: "w-32 h-32 md:w-40 md:h-40 lg:w-60 lg:h-60",
  }

  // Determine position classes
  const positionClasses = {
    "top-left": "top-10 left-4 md:left-10",
    "top-right": "top-10 right-4 md:right-10",
    "bottom-left": "bottom-10 left-4 md:left-10",
    "bottom-right": "bottom-10 right-4 md:right-10",
    "center-left": "top-1/2 -translate-y-1/2 left-4 md:left-10",
    "center-right": "top-1/2 -translate-y-1/2 right-4 md:right-10",
  }

  return (
    <div className={`absolute ${dimensions[size]} ${positionClasses[position]} ${className}`} style={{ opacity }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          {type === "scales" && (
            <group>
              <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <boxGeometry args={[2, 0.1, 0.1]} />
                <meshStandardMaterial color={isDark ? "#d4af37" : "#c4a030"} metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh castShadow receiveShadow position={[-0.7, -0.2, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
                <meshStandardMaterial color={isDark ? "#d4af37" : "#c4a030"} metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh castShadow receiveShadow position={[0.7, -0.2, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.05, 32]} />
                <meshStandardMaterial color={isDark ? "#d4af37" : "#c4a030"} metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          )}

          {type === "gavel" && (
            <group>
              <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
                <meshStandardMaterial color={isDark ? "#d4af37" : "#c4a030"} metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh castShadow receiveShadow position={[0, 1.2, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.6, 32]} />
                <meshStandardMaterial color={isDark ? "#0c2d6b" : "#193769"} metalness={0.7} roughness={0.3} />
              </mesh>
            </group>
          )}

          {type === "book" && (
            <mesh castShadow receiveShadow rotation={[0.2, 0.5, 0.1]}>
              <boxGeometry args={[1.5, 0.2, 2]} />
              <meshStandardMaterial color={isDark ? "#0c2d6b" : "#193769"} metalness={0.3} roughness={0.7} />
            </mesh>
          )}

          {type === "pillar" && (
            <group>
              <mesh castShadow receiveShadow position={[0, -1, 0]}>
                <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
                <meshStandardMaterial color={isDark ? "#d4af37" : "#c4a030"} metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
                <meshStandardMaterial color={isDark ? "#0c2d6b" : "#193769"} metalness={0.5} roughness={0.5} />
              </mesh>
              <mesh castShadow receiveShadow position={[0, 1, 0]}>
                <cylinderGeometry args={[0.7, 0.7, 0.2, 32]} />
                <meshStandardMaterial color={isDark ? "#d4af37" : "#c4a030"} metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          )}

          {type === "ring" && (
            <mesh castShadow receiveShadow>
              <torusGeometry args={[1, 0.3, 16, 32]} />
              <meshStandardMaterial color={isDark ? "#d4af37" : "#c4a030"} metalness={0.8} roughness={0.2} />
            </mesh>
          )}
        </Float>

        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  )
}

