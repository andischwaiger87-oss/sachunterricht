import React from 'react';
import ImagePanel from './ImagePanel';
import InteractiveTask from './InteractiveTask';

function LearningModule({ topic, onBack }) {
  return (
    <div className="module-page">
      {/* Header */}
      <div className="module-header-section">
        <span className="module-tag">{topic.title}</span>
        <h2 className="module-title">
          Lernkarten: <span className="accent">{topic.title}</span>
        </h2>
      </div>

      {/* Mobile Image Button */}
      <ImagePanel images={topic.images} mobileOnly />

      {/* Split Layout */}
      <div className="split-layout">
        {/* Left: Image Panel (Desktop) */}
        <ImagePanel images={topic.images} desktopOnly />

        {/* Right: Knowledge Panel */}
        <div>
          <button className="back-button" onClick={onBack}>
            <span className="material-symbols-outlined" style={{fontSize: '18px'}}>arrow_back</span>
            Zurück zur Übersicht
          </button>

          <div className="knowledge-panel" style={{ marginTop: '16px' }}>
            <div className="knowledge-panel-title">
              <span className="material-symbols-outlined">menu_book</span>
              Wissenskarten
            </div>

            {topic.facts.map((fact, index) => (
              <div key={index} className="fact-item">
                <span className="fact-icon">
                  <span className="material-symbols-outlined">verified</span>
                </span>
                <span>{fact}</span>
              </div>
            ))}
          </div>

          {topic.interactiveTasks && topic.interactiveTasks.length > 0 && (
            <div className="interactive-tasks-container">
              {topic.interactiveTasks.map(task => (
                <InteractiveTask key={task.id} task={task} />
              ))}
            </div>
          )}

          <div style={{ marginTop: '32px' }}>
            <button className="btn-primary full-width" onClick={onBack}>
              Alles verstanden!
              <span className="material-symbols-outlined">check_circle</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningModule;
