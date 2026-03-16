import { useNavigate } from 'react-router-dom'
import useOrrery from './solar-system/useOrrery.js'
import Scene from './solar-system/Scene.jsx'
import TopicMenu from './solar-system/TopicMenu.jsx'
import TopicPanel from './solar-system/TopicPanel.jsx'
import TimeControls from './solar-system/TimeControls.jsx'

const styles = {
  page: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: '#000010',
    color: '#ffffff',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    background: 'rgba(0,0,16,0.9)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    zIndex: 10,
    gap: '12px',
    minHeight: '44px',
  },
  backBtn: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '4px',
    color: '#c0c8e0',
    cursor: 'pointer',
    padding: '4px 10px',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  title: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: '-0.2px',
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  sidebar: {
    width: '300px',
    minWidth: '300px',
    background: 'rgba(10,10,30,0.95)',
    borderRight: '1px solid rgba(255,255,255,0.08)',
    padding: '16px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 5,
  },
  sidebarCollapsed: {
    width: '0px',
    minWidth: '0px',
    padding: '0px',
    overflow: 'hidden',
  },
  toggleSidebar: {
    position: 'absolute',
    left: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(10,10,30,0.9)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderLeft: 'none',
    borderRadius: '0 6px 6px 0',
    color: '#c0c8e0',
    cursor: 'pointer',
    padding: '12px 4px',
    fontSize: '14px',
    zIndex: 6,
  },
  canvasArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  canvasWrapper: {
    flex: 1,
    position: 'relative',
  },
}

function SolarSystem() {
  const navigate = useNavigate()
  const orrery = useOrrery()

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate('/')}>
          ← Back
        </button>
        <span style={styles.title}>Solar System Orrery</span>
      </div>

      {/* Body: sidebar + canvas */}
      <div style={styles.body}>
        {/* Sidebar */}
        <div style={orrery.panelOpen ? styles.sidebar : { ...styles.sidebar, ...styles.sidebarCollapsed }}>
          <TopicMenu
            activeTopic={orrery.activeTopic}
            onSelectTopic={orrery.selectTopic}
            onClear={orrery.clearTopic}
          />
          <TopicPanel activeTopic={orrery.activeTopic} />
        </div>

        {/* Canvas area */}
        <div style={styles.canvasArea}>
          {/* Toggle sidebar button when collapsed */}
          {!orrery.panelOpen && (
            <button
              style={styles.toggleSidebar}
              onClick={() => orrery.setPanelOpen(true)}
              title="Show panel"
            >
              ▶
            </button>
          )}

          <div style={styles.canvasWrapper}>
            <Scene
              simTime={orrery.simTime}
              scaleMode={orrery.scaleMode}
              activeTopic={orrery.activeTopic}
              tick={orrery.tick}
            />
          </div>

          {/* Time controls */}
          <TimeControls
            isPlaying={orrery.isPlaying}
            onTogglePlay={orrery.togglePlay}
            speed={orrery.speed}
            onSetSpeed={orrery.setSpeed}
            simTime={orrery.simTime}
            onScrub={orrery.scrubTo}
            scaleMode={orrery.scaleMode}
            onToggleScale={orrery.toggleScale}
          />
        </div>
      </div>
    </div>
  )
}

export default SolarSystem
