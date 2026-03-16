import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

export default function Sun({ radius, showLabel }) {
  const meshRef = useRef()

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group>
      {/* Point light from center */}
      <pointLight position={[0, 0, 0]} intensity={2} distance={0} decay={0} />
      <ambientLight intensity={0.15} />

      {/* Sun sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[radius, 32, 32]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>

      {/* Glow effect - slightly larger transparent sphere */}
      <mesh>
        <sphereGeometry args={[radius * 1.2, 32, 32]} />
        <meshBasicMaterial color="#FDB813" transparent opacity={0.15} />
      </mesh>

      {showLabel && (
        <Html position={[0, radius + 1.5, 0]} center style={{ pointerEvents: 'none' }}>
          <div style={{
            color: '#FDB813',
            fontSize: '12px',
            fontWeight: 'bold',
            textShadow: '0 0 4px rgba(0,0,0,0.8)',
            whiteSpace: 'nowrap',
          }}>
            Sun
          </div>
        </Html>
      )}
    </group>
  )
}
