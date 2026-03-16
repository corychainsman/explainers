import { useState, useCallback, useRef } from 'react'
import { getTopicById } from './topics.js'

export default function useOrrery() {
  const [simTime, setSimTime] = useState(0) // in days
  const [speed, setSpeed] = useState(1000)
  const [isPlaying, setIsPlaying] = useState(true)
  const [scaleMode, setScaleMode] = useState('notToScale') // 'toScale' | 'notToScale'
  const [activeTopic, setActiveTopic] = useState(null) // topic id string or null
  const [panelOpen, setPanelOpen] = useState(true)

  const prevTimeRef = useRef(null)

  // Called from useFrame — advances sim time
  const tick = useCallback((delta) => {
    if (!isPlaying) return
    // delta is in seconds, speed is multiplier, 1x = 1 day per real day
    // At 1x, 1 real second = 1/86400 of a day
    // So simTime advances by: delta * speed / 86400 * 86400 = delta * speed
    // Actually: 1 real second at 1x speed = 1/86400 day. At 1000x = 1000/86400 days per second
    // Simpler: delta (seconds) * speed / 86400 * 86400 => nah.
    // Let's just say: at speed=1, 1 real second = 1 second of sim time = 1/86400 days
    // At speed=1000, 1 real second = 1000/86400 days ≈ 0.0116 days
    // That's too slow. Let's define speed differently:
    // speed = how many sim-days pass per real second
    // At speed=1: 1 day per second (fast enough to see daily rotation)
    // At speed=365: 1 year per second
    setSimTime((prev) => prev + delta * speed)
  }, [isPlaying, speed])

  const selectTopic = useCallback((topicId) => {
    const topic = getTopicById(topicId)
    if (!topic) {
      setActiveTopic(null)
      return
    }
    setActiveTopic(topicId)
    setScaleMode(topic.scaleMode)
    setSpeed(topic.speed)
    if (topic.speed === 0) {
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
    }
    setPanelOpen(true)
  }, [])

  const clearTopic = useCallback(() => {
    setActiveTopic(null)
  }, [])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const toggleScale = useCallback(() => {
    setScaleMode((prev) => (prev === 'toScale' ? 'notToScale' : 'toScale'))
  }, [])

  const scrubTo = useCallback((days) => {
    setSimTime(days)
  }, [])

  return {
    simTime,
    speed,
    setSpeed,
    isPlaying,
    togglePlay,
    scaleMode,
    toggleScale,
    setScaleMode,
    activeTopic,
    selectTopic,
    clearTopic,
    panelOpen,
    setPanelOpen,
    tick,
    scrubTo,
  }
}
