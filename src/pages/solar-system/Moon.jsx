import { useMemo } from 'react'
import { Html } from '@react-three/drei'
import { getOrbitalPosition, getMoonScaledValues } from './orbitalData.js'

export default function Moon({ moonData, parentRadius, scaleMode, simTime, showLabel }) {
  const { orbitalRadius, radius } = useMemo(
    () => getMoonScaledValues(moonData, parentRadius, scaleMode),
    [moonData, parentRadius, scaleMode]
  )

  const [x, y, z] = useMemo(
    () => getOrbitalPosition(orbitalRadius, moonData.orbitalPeriodDays, simTime),
    [orbitalRadius, moonData.orbitalPeriodDays, simTime]
  )

  return (
    <group position={[x, y, z]}>
      <mesh>
        <sphereGeometry args={[radius, 16, 16]} />
        <meshStandardMaterial color={moonData.color} roughness={0.8} />
      </mesh>
      {showLabel && (
        <Html position={[0, radius + 0.3, 0]} center style={{ pointerEvents: 'none' }}>
          <div style={{
            color: '#aaa',
            fontSize: '10px',
            textShadow: '0 0 3px rgba(0,0,0,0.9)',
            whiteSpace: 'nowrap',
          }}>
            {moonData.name}
          </div>
        </Html>
      )}
    </group>
  )
}
