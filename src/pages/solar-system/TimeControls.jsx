const SPEED_PRESETS = [1, 10, 100, 500, 1000, 3000, 5000, 10000]

const styles = {
  bar: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
    background: 'rgba(0,0,16,0.92)',
    backdropFilter: 'blur(8px)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    flexShrink: 0,
    flexWrap: 'nowrap',
  },
  barMobile: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    padding: '10px 14px',
    paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
    background: 'rgba(0,0,16,0.92)',
    backdropFilter: 'blur(8px)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    flexShrink: 0,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
  },
  btn: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '6px',
    color: '#c0c8e0',
    cursor: 'pointer',
    padding: '6px 10px',
    fontSize: '16px',
    fontWeight: 600,
    minHeight: '36px',
    minWidth: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  btnMobile: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    color: '#c0c8e0',
    cursor: 'pointer',
    padding: '8px 12px',
    fontSize: '18px',
    fontWeight: 600,
    minHeight: '44px',
    minWidth: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  select: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '6px',
    color: '#c0c8e0',
    cursor: 'pointer',
    padding: '4px 8px',
    fontSize: '13px',
    fontWeight: 600,
    minHeight: '36px',
    flexShrink: 0,
  },
  selectMobile: {
    background: 'rgba(255,255,255,0.12)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px',
    color: '#c0c8e0',
    cursor: 'pointer',
    padding: '8px 10px',
    fontSize: '14px',
    fontWeight: 600,
    minHeight: '44px',
    flexShrink: 0,
  },
  label: {
    fontSize: '11px',
    color: '#8890a8',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    userSelect: 'none',
    flexShrink: 0,
  },
  scrubber: {
    flex: 1,
    height: '4px',
    WebkitAppearance: 'none',
    appearance: 'none',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
    minWidth: 0,
  },
  scrubberMobile: {
    flex: 1,
    height: '20px',
    WebkitAppearance: 'none',
    appearance: 'none',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '10px',
    outline: 'none',
    cursor: 'pointer',
    minWidth: 0,
  },
  timeDisplay: {
    fontSize: '12px',
    color: '#8890a8',
    fontVariantNumeric: 'tabular-nums',
    minWidth: '72px',
    textAlign: 'right',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  scaleBtn: {
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '6px',
    color: '#c0c8e0',
    cursor: 'pointer',
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: 600,
    minHeight: '36px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  scaleBtnMobile: {
    flex: 1,
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    color: '#c0c8e0',
    cursor: 'pointer',
    padding: '8px 12px',
    fontSize: '13px',
    fontWeight: 600,
    minHeight: '44px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  },
}

export default function TimeControls({
  isPlaying,
  onTogglePlay,
  speed,
  onSetSpeed,
  simTime,
  onScrub,
  scaleMode,
  onToggleScale,
  isMobile,
}) {
  const days = Math.abs(simTime)
  const years = (days / 365.25).toFixed(2)
  const displayDays = days.toFixed(1)

  if (isMobile) {
    return (
      <div style={styles.barMobile}>
        {/* Row 1: play + speed + time */}
        <div style={styles.row}>
          <button style={styles.btnMobile} onClick={onTogglePlay} title={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <select
            value={speed}
            onChange={(e) => onSetSpeed(Number(e.target.value))}
            style={styles.selectMobile}
          >
            {SPEED_PRESETS.map((s) => (
              <option key={s} value={s}>
                {s >= 1000 ? `${(s / 1000).toFixed(0)}k` : s}x
              </option>
            ))}
          </select>
          <span style={{ ...styles.timeDisplay, fontSize: '13px' }}>
            {displayDays}d / {years}y
          </span>
          <button style={styles.scaleBtnMobile} onClick={onToggleScale}>
            {scaleMode === 'toScale' ? '⚖ To Scale' : '✦ Artistic'}
          </button>
        </div>
        {/* Row 2: scrubber */}
        <div style={styles.row}>
          <span style={styles.label}>Timeline</span>
          <input
            type="range"
            min={0}
            max={365.25 * 2}
            step={0.1}
            value={simTime % (365.25 * 2)}
            onChange={(e) => onScrub(Number(e.target.value))}
            style={styles.scrubberMobile}
            title="Scrub timeline"
          />
        </div>
      </div>
    )
  }

  return (
    <div style={styles.bar}>
      {/* Play/Pause */}
      <button style={styles.btn} onClick={onTogglePlay} title={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? '⏸' : '▶'}
      </button>

      {/* Speed selector */}
      <span style={styles.label}>Speed</span>
      <select
        value={speed}
        onChange={(e) => onSetSpeed(Number(e.target.value))}
        style={styles.select}
      >
        {SPEED_PRESETS.map((s) => (
          <option key={s} value={s}>
            {s >= 1000 ? `${(s / 1000).toFixed(0)}k` : s}x
          </option>
        ))}
      </select>

      {/* Timeline scrubber */}
      <input
        type="range"
        min={0}
        max={365.25 * 2}
        step={0.1}
        value={simTime % (365.25 * 2)}
        onChange={(e) => onScrub(Number(e.target.value))}
        style={styles.scrubber}
        title="Scrub timeline"
      />

      {/* Time display */}
      <span style={styles.timeDisplay}>
        {displayDays}d / {years}y
      </span>

      {/* Scale toggle */}
      <button style={styles.scaleBtn} onClick={onToggleScale}>
        {scaleMode === 'toScale' ? 'To Scale' : 'Not to Scale'}
      </button>
    </div>
  )
}
