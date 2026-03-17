import { useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import Sun from './Sun.jsx'
import Planet from './Planet.jsx'
import CameraController from './CameraController.jsx'
import { PLANETS, getSunScaledRadius, getScaledValues, getOrbitalPosition } from './orbitalData.js'
import { getTopicById } from './topics.js'

function SimulationLoop({ tick }) {
  useFrame((_, delta) => {
    // Clamp delta to avoid huge jumps when tab is backgrounded
    tick(Math.min(delta, 0.1))
  })
  return null
}

function SolarSystemScene({ simTime, scaleMode, activeTopic, tick }) {
  const topic = activeTopic ? getTopicById(activeTopic) : null
  const sunRadius = getSunScaledRadius(scaleMode)

  const showAllLabels = !topic || topic.id === 'whole-orrery'
  const showObserver = topic && ['sunrise-sunset', 'solar-day'].includes(topic.id)

  return (
    <>
      <SimulationLoop tick={tick} />
      <Stars radius={500} depth={100} count={3000} factor={4} fade speed={0.5} />

      <Sun radius={sunRadius} showLabel={showAllLabels} />

      {PLANETS.map((planet) => {
        const isFocus = topic?.focusPlanet === planet.name
        const showLabel = showAllLabels || isFocus
        const showMoonLabels = isFocus && scaleMode === 'notToScale'

        return (
          <Planet
            key={planet.name}
            planet={planet}
            scaleMode={scaleMode}
            simTime={simTime}
            showLabel={showLabel}
            showMoonLabels={showMoonLabels}
            showObserver={showObserver && planet.name === 'Earth'}
            activeTopic={activeTopic}
          />
        )
      })}

      {/* Sun-Earth line for solar day topic */}
      {topic?.id === 'solar-day' && (
        <SunEarthLine simTime={simTime} scaleMode={scaleMode} />
      )}
    </>
  )
}

function SunEarthLine({ simTime, scaleMode }) {
  const earth = PLANETS.find((p) => p.name === 'Earth')

  const positions = useMemo(() => {
    const { orbitalRadius } = getScaledValues(earth, scaleMode)
    const [ex, ey, ez] = getOrbitalPosition(orbitalRadius, earth.orbitalPeriodDays, simTime)
    return new Float32Array([0, 0, 0, ex, ey, ez])
  }, [earth, scaleMode, simTime])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={2}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#FDB813" transparent opacity={0.3} />
    </line>
  )
}

export default function Scene({ simTime, scaleMode, activeTopic, tick }) {
  const topic = activeTopic ? getTopicById(activeTopic) : null

  // Compute follow target for Earth-focused topics
  const followTarget = useMemo(() => {
    if (!topic?.followPlanet) return null
    const planet = PLANETS.find((p) => p.name === topic.followPlanet)
    if (!planet) return null
    const { orbitalRadius } = getScaledValues(planet, scaleMode)
    const position = getOrbitalPosition(orbitalRadius, planet.orbitalPeriodDays, simTime)
    return {
      position,
      offset: topic.camera.offset,
    }
  }, [topic, scaleMode, simTime])

  // Fixed camera for non-following topics
  const fixedPosition = (!topic?.followPlanet && topic?.camera?.position) || null
  const fixedTarget = (!topic?.followPlanet && topic?.camera?.target) || null

  return (
    <Canvas
      camera={{ position: [0, 200, 300], fov: 50, near: 0.01, far: 10000 }}
      style={{ background: '#000010', touchAction: 'none' }}
    >
      <CameraController
        targetPosition={topic && !topic.followPlanet ? fixedPosition : null}
        targetLookAt={topic && !topic.followPlanet ? fixedTarget : null}
        followTarget={followTarget}
      />
      <SolarSystemScene
        simTime={simTime}
        scaleMode={scaleMode}
        activeTopic={activeTopic}
        tick={tick}
      />
    </Canvas>
  )
}
