import { getTopicById } from './topics.js'

const styles = {
  container: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
  },
  title: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#ffffff',
    marginBottom: '10px',
    lineHeight: 1.3,
  },
  description: {
    fontSize: '13px',
    lineHeight: 1.65,
    color: '#b0b8d0',
    whiteSpace: 'pre-line',
  },
  empty: {
    fontSize: '13px',
    color: '#6a7090',
    fontStyle: 'italic',
  },
}

export default function TopicPanel({ activeTopic }) {
  const topic = activeTopic ? getTopicById(activeTopic) : null

  if (!topic) {
    return (
      <div style={styles.container}>
        <p style={styles.empty}>
          Select a topic above to learn about the solar system, or freely explore by rotating and zooming the view.
        </p>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{topic.title}</h3>
      <p style={styles.description}>{topic.description}</p>
    </div>
  )
}
