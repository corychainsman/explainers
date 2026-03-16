import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export default function CameraController({ targetPosition, targetLookAt }) {
  const controlsRef = useRef()
  const { camera } = useThree()
  const isAnimating = useRef(false)
  const animProgress = useRef(1)
  const startPos = useRef(new THREE.Vector3())
  const startTarget = useRef(new THREE.Vector3())
  const endPos = useRef(new THREE.Vector3())
  const endTarget = useRef(new THREE.Vector3())

  useEffect(() => {
    if (!targetPosition || !targetLookAt) return

    startPos.current.copy(camera.position)
    if (controlsRef.current) {
      startTarget.current.copy(controlsRef.current.target)
    }
    endPos.current.set(...targetPosition)
    endTarget.current.set(...targetLookAt)
    animProgress.current = 0
    isAnimating.current = true
  }, [targetPosition, targetLookAt, camera])

  useFrame((_, delta) => {
    if (!isAnimating.current || animProgress.current >= 1) return

    animProgress.current = Math.min(1, animProgress.current + delta * 2) // ~0.5s transition
    const t = easeInOutCubic(animProgress.current)

    camera.position.lerpVectors(startPos.current, endPos.current, t)

    if (controlsRef.current) {
      controlsRef.current.target.lerpVectors(startTarget.current, endTarget.current, t)
      controlsRef.current.update()
    }

    if (animProgress.current >= 1) {
      isAnimating.current = false
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.1}
      minDistance={1}
      maxDistance={2000}
    />
  )
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
