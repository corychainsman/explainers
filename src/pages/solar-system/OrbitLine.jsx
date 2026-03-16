import { useMemo } from 'react'

export default function OrbitLine({ radius, color = '#ffffff', opacity = 0.15 }) {
  const positions = useMemo(() => {
    const segments = 128
    const arr = new Float32Array((segments + 1) * 3)
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      arr[i * 3]     = radius * Math.cos(angle)
      arr[i * 3 + 1] = 0
      arr[i * 3 + 2] = radius * Math.sin(angle)
    }
    return arr
  }, [radius])

  return (
    <lineLoop>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} />
    </lineLoop>
  )
}
