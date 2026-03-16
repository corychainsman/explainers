import { useMemo } from 'react'
import * as THREE from 'three'

export default function OrbitLine({ radius, color = '#ffffff', opacity = 0.15 }) {
  const points = useMemo(() => {
    const pts = []
    const segments = 128
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(radius * Math.cos(angle), 0, radius * Math.sin(angle)))
    }
    return pts
  }, [radius])

  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </line>
  )
}
