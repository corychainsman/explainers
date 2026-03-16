import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useOrrery from './solar-system/useOrrery.js'
import Scene from './solar-system/Scene.jsx'
import TopicMenu from './solar-system/TopicMenu.jsx'
import TopicPanel from './solar-system/TopicPanel.jsx'
import TimeControls from './solar-system/TimeControls.jsx'

function useMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return isMobile
}

const base = {
  page: {
    width: '100vw',
    height: '100dvh',
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
    paddingTop: 'max(8px, env(safe-area-inset-top))',
    background: 'rgba(0,0,16,0.95)',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    zIndex: 20,
    gap: '10px',
    minHeight: '44px',
    flexShrink: 0,
  },
  backBtn: {
    background: 'none',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '6px',
    color: '#c0c8e0',
    cursor: 'pointer',
    padding: '6px 12px',
    fontSize: '14px',
    minHeight: '36px',
    minWidth: '60px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    flexShrink: 0,
  },
  title: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: '-0.2px',
    flex: 1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  topicsBtn: {
    background: 'rgba(74,144,217,0.25)',
    border: '1px solid rgba(74,144,217,0.5)',
    borderRadius: '6px',
    color: '#7eb8f5',
    cursor: 'pointer',
    padding: '6px 12px',
    fontSize: '13px',
    fontWeight: 600,
    minHeight: '36px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  // Desktop sidebar
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
    flexShrink: 0,
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
    overflow: 'hidden',
  },
  canvasWrapper: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
}

// Mobile bottom sheet overlay
const sheetStyles = {
  overlay: {
    position: 'absolute',
    inset: 0,
    zIndex: 15,
    pointerEvents: 'none',
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(0,0,0,0.5)',
    pointerEvents: 'auto',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(8,8,26,0.98)',
    borderTop: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '16px 16px 0 0',
    maxHeight: '65vh',
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'auto',
    paddingBottom: 'env(safe-area-inset-bottom)',
  },
  sheetHandle: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px',
    cursor: 'pointer',
    flexShrink: 0,
  },
  sheetHandleBar: {
    width: '40px',
    height: '4px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '2px',
  },
  sheetContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 16px 16px',
    WebkitOverflowScrolling: 'touch',
  },
}

function MobileSheet({ open, onClose, activeTopic, onSelectTopic, onClear }) {
  if (!open) return null
  return (
    <div style={sheetStyles.overlay}>
      <div style={sheetStyles.backdrop} onClick={onClose} />
      <div style={sheetStyles.sheet}>
        <div style={sheetStyles.sheetHandle} onClick={onClose}>
          <div style={sheetStyles.sheetHandleBar} />
        </div>
        <div style={sheetStyles.sheetContent}>
          <TopicMenu
            activeTopic={activeTopic}
            onSelectTopic={(id) => { onSelectTopic(id); onClose() }}
            onClear={() => { onClear(); onClose() }}
          />
          <TopicPanel activeTopic={activeTopic} />
        </div>
      </div>
    </div>
  )
}

function SolarSystem() {
  const navigate = useNavigate()
  const orrery = useOrrery()
  const isMobile = useMobile()
  const [sheetOpen, setSheetOpen] = useState(false)

  return (
    <div style={base.page}>
      {/* Header */}
      <div style={base.header}>
        <button style={base.backBtn} onClick={() => navigate('/')}>
          ← Back
        </button>
        <span style={base.title}>Solar System Orrery</span>
        {isMobile ? (
          <button style={base.topicsBtn} onClick={() => setSheetOpen(true)}>
            ☰ Topics
          </button>
        ) : (
          <button
            style={{ ...base.backBtn, marginLeft: 'auto' }}
            onClick={() => orrery.setPanelOpen(!orrery.panelOpen)}
            title={orrery.panelOpen ? 'Hide panel' : 'Show panel'}
          >
            {orrery.panelOpen ? '◀ Hide' : '▶ Show'}
          </button>
        )}
      </div>

      {/* Body */}
      <div style={base.body}>
        {/* Desktop sidebar */}
        {!isMobile && (
          <div style={orrery.panelOpen ? base.sidebar : { ...base.sidebar, ...base.sidebarCollapsed }}>
            <TopicMenu
              activeTopic={orrery.activeTopic}
              onSelectTopic={orrery.selectTopic}
              onClear={orrery.clearTopic}
            />
            <TopicPanel activeTopic={orrery.activeTopic} />
          </div>
        )}

        {/* Canvas area */}
        <div style={base.canvasArea}>
          <div style={base.canvasWrapper}>
            <Scene
              simTime={orrery.simTime}
              scaleMode={orrery.scaleMode}
              activeTopic={orrery.activeTopic}
              tick={orrery.tick}
            />
          </div>

          {/* Mobile bottom sheet */}
          {isMobile && (
            <MobileSheet
              open={sheetOpen}
              onClose={() => setSheetOpen(false)}
              activeTopic={orrery.activeTopic}
              onSelectTopic={orrery.selectTopic}
              onClear={orrery.clearTopic}
            />
          )}

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
            isMobile={isMobile}
          />
        </div>
      </div>
    </div>
  )
}

export default SolarSystem
