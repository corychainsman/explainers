import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export default function CameraController({ targetPosition, targetLookAt, followTarget, activeTopic }) {
  const controlsRef = useRef()
  const { camera } = useThree()
  const isAnimating = useRef(false)
  const animProgress = useRef(1)
  const startPos = useRef(new THREE.Vector3())
  const startTarget = useRef(new THREE.Vector3())
  const endPos = useRef(new THREE.Vector3())
  const endTarget = useRef(new THREE.Vector3())

  const isFollowing = useRef(false)
  const followOffset = useRef(null)
  const prevFollowPos = useRef(new THREE.Vector3())

  // Only trigger animation when the topic changes, not every frame
  useEffect(() => {
    if (followTarget) {
      const planetPos = new THREE.Vector3(...followTarget.position)
      const offset = new THREE.Vector3(...followTarget.offset)
      followOffset.current = offset.clone()
      isFollowing.current = true
      prevFollowPos.current.copy(planetPos)

      // Animate to the initial follow position
      startPos.current.copy(camera.position)
      if (controlsRef.current) {
        startTarget.current.copy(controlsRef.current.target)
      }
      endPos.current.copy(planetPos).add(offset)
      endTarget.current.copy(planetPos)
      animProgress.current = 0
      isAnimating.current = true
    } else if (targetPosition && targetLookAt) {
      isFollowing.current = false
      followOffset.current = null

      startPos.current.copy(camera.position)
      if (controlsRef.current) {
        startTarget.current.copy(controlsRef.current.target)
      }
      endPos.current.set(...targetPosition)
      endTarget.current.set(...targetLookAt)
      animProgress.current = 0
      isAnimating.current = true
    } else {
      isFollowing.current = false
      followOffset.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopic]) // Only re-run when the topic changes

  useFrame((_, delta) => {
    // Handle animation (initial transition)
    if (isAnimating.current && animProgress.current < 1) {
      animProgress.current = Math.min(1, animProgress.current + delta * 4) // fast ~0.25s
      const t = easeInOutCubic(animProgress.current)

      camera.position.lerpVectors(startPos.current, endPos.current, t)

      if (controlsRef.current) {
        controlsRef.current.target.lerpVectors(startTarget.current, endTarget.current, t)
        controlsRef.current.update()
      }

      if (animProgress.current >= 1) {
        isAnimating.current = false
      }
      return
    }

    // Handle following a planet (after animation completes)
    if (isFollowing.current && followTarget && followOffset.current) {
      const planetPos = new THREE.Vector3(...followTarget.position)
      const movement = planetPos.clone().sub(prevFollowPos.current)
      prevFollowPos.current.copy(planetPos)

      camera.position.add(movement)
      if (controlsRef.current) {
        controlsRef.current.target.add(movement)
        controlsRef.current.update()
      }
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
