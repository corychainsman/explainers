export default function EarthMarker({ radius }) {
  // Small red dot on Earth's equator to show rotation / sunrise-sunset
  return (
    <mesh position={[radius * 1.01, 0, 0]}>
      <sphereGeometry args={[radius * 0.12, 8, 8]} />
      <meshBasicMaterial color="#ff3333" />
    </mesh>
  )
}
