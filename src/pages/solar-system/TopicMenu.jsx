import { TOPICS } from './topics.js'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  heading: {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: '#8890a8',
    marginBottom: '4px',
  },
  button: {
    display: 'block',
    width: '100%',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: 500,
    transition: 'background 0.15s, color 0.15s',
  },
  buttonDefault: {
    background: 'rgba(255,255,255,0.05)',
    color: '#c0c8e0',
  },
  buttonActive: {
    background: 'rgba(74,144,217,0.3)',
    color: '#ffffff',
  },
}

export default function TopicMenu({ activeTopic, onSelectTopic, onClear }) {
  return (
    <div style={styles.container}>
      <div style={styles.heading}>Topics</div>
      <button
        style={{
          ...styles.button,
          ...(activeTopic === null ? styles.buttonActive : styles.buttonDefault),
        }}
        onClick={onClear}
      >
        Free Explore
      </button>
      {TOPICS.map((topic) => (
        <button
          key={topic.id}
          style={{
            ...styles.button,
            ...(activeTopic === topic.id ? styles.buttonActive : styles.buttonDefault),
          }}
          onClick={() => onSelectTopic(topic.id)}
        >
          {topic.menuLabel}
        </button>
      ))}
    </div>
  )
}
