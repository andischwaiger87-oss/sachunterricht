import React from 'react';
import ImagePanel from './ImagePanel';

function LearningModule({ topic, onBack }) {
  return (
    <div className="split-view-container">
      {/* Left Panel: The Worksheet Image */}
      <ImagePanel images={topic.images} />

      {/* Right Panel: The Facts */}
      <div className="module-container">
        <div className="top-controls">
          <button className="back-btn" onClick={onBack}>
            ← Zurück zur Übersicht
          </button>
        </div>
        
        <div className="module-header">
          <div style={{ fontSize: '48px' }}>{topic.icon}</div>
          <h2 style={{ color: topic.color, fontSize: '32px' }}>{topic.title}</h2>
        </div>

        <ul className="fact-list">
          {topic.facts.map((fact, index) => (
            <li 
              key={index} 
              className="fact-item"
              style={{ borderLeftColor: topic.color, animationDelay: `${index * 0.1}s` }}
            >
              {fact}
            </li>
          ))}
        </ul>
        
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <button 
            className="btn-primary" 
            onClick={onBack}
            style={{ backgroundColor: topic.color }}
          >
            Ich habe alles verstanden! 👍
          </button>
        </div>
      </div>
    </div>
  );
}

export default LearningModule;
