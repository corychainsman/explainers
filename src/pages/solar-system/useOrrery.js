import { useState, useCallback, useRef } from 'react'
import { getTopicById } from './topics.js'

export default function useOrrery() {
  const [simTime, setSimTime] = useState(0) // in days
  const [speed, setSpeed] = useState(1000)
  const [isPlaying, setIsPlaying] = useState(true)
  const [scaleMode, setScaleMode] = useState('notToScale') // 'toScale' | 'notToScale'
  const [activeTopic, setActiveTopic] = useState(null) // topic id string or null
  const [panelOpen, setPanelOpen] = useState(true)

  const topicStartTime = useRef(0)

  // Called from useFrame — advances sim time
  const tick = useCallback((delta) => {
    if (!isPlaying) return

    setSimTime((prev) => {
      const next = prev + delta * speed

      // Loop if active topic has loopDays
      if (activeTopic) {
        const topic = getTopicById(activeTopic)
        if (topic?.loopDays) {
          const elapsed = next - topicStartTime.current
          if (elapsed >= topic.loopDays) {
            return topicStartTime.current
          }
        }
      }

      return next
    })
  }, [isPlaying, speed, activeTopic])

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
    // Record start time for looping
    setSimTime((prev) => {
      topicStartTime.current = prev
      return prev
    })
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
