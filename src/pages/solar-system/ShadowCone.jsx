import { useMemo } from 'react'
import * as THREE from 'three'

// Visual shadow cone for eclipse demonstrations
export default function ShadowCone({ from, to, radius, color = '#000000', opacity = 0.2 }) {
  const { position, rotation, length } = useMemo(() => {
    const start = new THREE.Vector3(...from)
    const end = new THREE.Vector3(...to)
    const direction = new THREE.Vector3().subVectors(end, start)
    const len = direction.length()
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)

    // Compute rotation to align cone along direction
    const up = new THREE.Vector3(0, 1, 0)
    const quaternion = new THREE.Quaternion()
    quaternion.setFromUnitVectors(up, direction.normalize())
    const euler = new THREE.Euler().setFromQuaternion(quaternion)

    return {
      position: [midpoint.x, midpoint.y, midpoint.z],
      rotation: [euler.x, euler.y, euler.z],
      length: len,
    }
  }, [from, to])

  return (
    <mesh position={position} rotation={rotation}>
      <coneGeometry args={[radius, length, 16, 1, true]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} side={2} />
    </mesh>
  )
}
