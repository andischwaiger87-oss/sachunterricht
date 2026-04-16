import React from 'react';

function Dashboard({ topics, onSelectTopic, mode }) {
  const iconBgs = [
    { bg: '#9ffe9b', color: '#006b1c' },   // tertiary-container / tertiary
    { bg: '#73f0f1', color: '#006668' },     // primary-container / primary
    { bg: '#fdd34d', color: '#5c4900' },     // secondary-container / on-secondary-container
    { bg: '#fce4ec', color: '#880e4f' },     // pinkish
    { bg: '#73f0f1', color: '#006668' },
    { bg: '#fdd34d', color: '#5c4900' },
    { bg: '#9ffe9b', color: '#006b1c' },
    { bg: '#a3effa', color: '#006668' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <h1>
          {mode === 'lernen' ? 'Entdecke deine Themenwelten!' : 'Bereit für das Quiz?'}
        </h1>
        <p>
          {mode === 'lernen'
            ? 'Wähle ein Thema und starte deine Lernreise durch die Wunder des Sachunterrichts.'
            : 'Teste dein Wissen und beantworte spannende Fragen zu jedem Thema!'}
        </p>
        <div className="hero-bg-icon">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>
            {mode === 'lernen' ? 'explore' : 'auto_awesome'}
          </span>
        </div>
      </section>

      {/* Topic Grid */}
      <div className="topics-grid">
        {topics.map((topic, index) => {
          const palette = iconBgs[index % iconBgs.length];
          const totalItems = mode === 'lernen' ? topic.facts.length : topic.questions.length;

          return (
            <div
              key={topic.id}
              className="topic-card"
              onClick={() => onSelectTopic(topic)}
            >
              <div
                className="topic-card-icon"
                style={{ background: palette.bg, color: palette.color }}
              >
                {topic.icon}
              </div>
              <div>
                <div className="topic-card-title">{topic.title}</div>
                <div className="topic-card-subtitle">
                  {mode === 'lernen'
                    ? `${totalItems} Fakten zum Entdecken`
                    : `${totalItems} Fragen warten auf dich`}
                </div>
              </div>
              <div className="topic-card-progress">
                <div className="progress-labels">
                  <span style={{color: 'var(--on-surface-variant)'}}>
                    {mode === 'lernen' ? `${totalItems} Fakten` : `${totalItems} Fragen`}
                  </span>
                </div>
                <div className="progress-bar-track">
                  <div
                    className="progress-bar-fill"
                    style={{ width: '0%', background: palette.color }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Dashboard;
