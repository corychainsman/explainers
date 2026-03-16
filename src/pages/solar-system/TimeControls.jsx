const SPEED_PRESETS = [1, 10, 100, 500, 1000, 3000, 5000, 10000]

const styles = {
  bar: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 16px',
    background: 'rgba(0,0,16,0.85)',
    backdropFilter: 'blur(8px)',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    flexWrap: 'wrap',
  },
  group: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  btn: {
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '4px',
    color: '#c0c8e0',
    cursor: 'pointer',
    padding: '6px 10px',
    fontSize: '13px',
    fontWeight: 600,
    transition: 'background 0.15s',
  },
  btnActive: {
    background: 'rgba(74,144,217,0.4)',
    color: '#ffffff',
  },
  label: {
    fontSize: '11px',
    color: '#8890a8',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    userSelect: 'none',
  },
  scrubber: {
    flex: 1,
    minWidth: '100px',
    height: '4px',
    WebkitAppearance: 'none',
    appearance: 'none',
    background: 'rgba(255,255,255,0.15)',
    borderRadius: '2px',
    outline: 'none',
    cursor: 'pointer',
  },
  timeDisplay: {
    fontSize: '12px',
    color: '#8890a8',
    fontVariantNumeric: 'tabular-nums',
    minWidth: '80px',
    textAlign: 'right',
  },
  scaleBtn: {
    marginLeft: 'auto',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '4px',
    color: '#c0c8e0',
    cursor: 'pointer',
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: 600,
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
}) {
  const days = Math.abs(simTime)
  const years = (days / 365.25).toFixed(2)
  const displayDays = days.toFixed(1)

  return (
    <div style={styles.bar}>
      {/* Play/Pause */}
      <button style={styles.btn} onClick={onTogglePlay} title={isPlaying ? 'Pause' : 'Play'}>
        {isPlaying ? '\u23F8' : '\u25B6'}
      </button>

      {/* Speed selector */}
      <div style={styles.group}>
        <span style={styles.label}>Speed</span>
        <select
          value={speed}
          onChange={(e) => onSetSpeed(Number(e.target.value))}
          style={{
            ...styles.btn,
            padding: '4px 8px',
            fontSize: '12px',
          }}
        >
          {SPEED_PRESETS.map((s) => (
            <option key={s} value={s}>
              {s >= 1000 ? `${(s / 1000).toFixed(0)}k` : s}x
            </option>
          ))}
        </select>
      </div>

      {/* Timeline scrubber */}
      <input
        type="range"
        min={0}
        max={365.25 * 2} // 2 years
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
