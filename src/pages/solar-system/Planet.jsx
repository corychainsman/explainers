import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { getScaledValues, getOrbitalPosition } from './orbitalData.js'
import OrbitLine from './OrbitLine.jsx'
import Moon from './Moon.jsx'
import EarthMarker from './EarthMarker.jsx'

export default function Planet({ planet, scaleMode, simTime, showLabel, showMoonLabels, showObserver, activeTopic }) {
  const meshRef = useRef()

  const { orbitalRadius, radius } = useMemo(
    () => getScaledValues(planet, scaleMode),
    [planet, scaleMode]
  )

  const [px, py, pz] = useMemo(
    () => getOrbitalPosition(orbitalRadius, planet.orbitalPeriodDays, simTime),
    [orbitalRadius, planet.orbitalPeriodDays, simTime]
  )

  // Rotation
  useFrame((_, delta) => {
    if (meshRef.current && planet.rotationPeriodHours !== 0) {
      // rotation per frame: delta seconds * (360 / rotationPeriod_in_seconds)
      // But we're in sim time, not real time. The rotation is tied to simTime.
      // We'll handle rotation via simTime directly in the render.
    }
  })

  const rotationAngle = useMemo(() => {
    if (planet.rotationPeriodHours === 0) return 0
    const rotationPeriodDays = Math.abs(planet.rotationPeriodHours) / 24
    const direction = planet.rotationPeriodHours < 0 ? -1 : 1
    return ((2 * Math.PI * simTime) / rotationPeriodDays) * direction
  }, [planet.rotationPeriodHours, simTime])

  const axialTiltRad = (planet.axialTiltDeg * Math.PI) / 180

  return (
    <group>
      {/* Orbit path */}
      <OrbitLine radius={orbitalRadius} color={planet.color} opacity={0.2} />

      {/* Planet group at orbital position */}
      <group position={[px, py, pz]}>
        {/* Axial tilt */}
        <group rotation={[0, 0, axialTiltRad]}>
          {/* Rotating body */}
          <mesh ref={meshRef} rotation={[0, rotationAngle, 0]}>
            <sphereGeometry args={[radius, 32, 32]} />
            <meshStandardMaterial color={planet.color} roughness={0.7} />

            {/* Earth observer marker */}
            {showObserver && planet.name === 'Earth' && (
              <EarthMarker radius={radius} />
            )}
          </mesh>

          {/* Saturn's rings */}
          {planet.hasRings && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[radius * 1.4, radius * 2.3, 64]} />
              <meshStandardMaterial
                color="#c8b070"
                transparent
                opacity={0.5}
                side={2} // DoubleSide
                roughness={0.8}
              />
            </mesh>
          )}
        </group>

        {/* Moons orbit in the planet's orbital plane (not tilted with planet body) */}
        {planet.moons.map((moon) => (
          <Moon
            key={moon.name}
            moonData={moon}
            parentRadius={radius}
            scaleMode={scaleMode}
            simTime={simTime}
            showLabel={showMoonLabels}
          />
        ))}

        {/* Planet label */}
        {showLabel && (
          <Html position={[0, radius + 0.8, 0]} center style={{ pointerEvents: 'none' }}>
            <div style={{
              color: planet.color,
              fontSize: '11px',
              fontWeight: 'bold',
              textShadow: '0 0 4px rgba(0,0,0,0.9)',
              whiteSpace: 'nowrap',
            }}>
              {planet.name}
            </div>
          </Html>
        )}
      </group>
    </group>
  )
}
