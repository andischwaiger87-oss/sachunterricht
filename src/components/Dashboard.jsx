import React from 'react';

function Dashboard({ topics, onSelectTopic, mode }) {
  return (
    <div className="dashboard-grid">
      {topics.map(topic => (
        <div 
          key={topic.id} 
          className="topic-card"
          onClick={() => onSelectTopic(topic)}
          style={{ borderBottomColor: topic.color }}
        >
          <div className="topic-icon">{topic.icon}</div>
          <div className="topic-title">{topic.title}</div>
          <div style={{ color: '#888', fontSize: '14px', marginTop: 'auto' }}>
            {mode === 'lernen' ? `${topic.facts.length} Fakten` : `${topic.questions.length} Fragen`}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
