import React, { useState, useEffect } from 'react';
import ImagePanel from './ImagePanel';

const Confetti = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    const p = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      speed: 1.5 + Math.random() * 3,
      delay: Math.random() * 2,
      emoji: ['⭐', '🌟', '🎉', '🏆', '💯'][Math.floor(Math.random() * 5)]
    }));
    setParticles(p);
  }, []);

  return (
    <div className="confetti-overlay">
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: '-5%',
          fontSize: '28px',
          animation: `confettiFall ${p.speed}s linear ${p.delay}s forwards`
        }}>
          {p.emoji}
        </div>
      ))}
    </div>
  );
};

function QuizModule({ topic, onBack }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!topic.questions || topic.questions.length === 0) {
    return (
      <div className="module-page">
        <div className="quiz-result-container">
          <button className="back-button" onClick={onBack} style={{marginBottom: '20px'}}>
            <span className="material-symbols-outlined" style={{fontSize:'18px'}}>arrow_back</span>
            Zurück
          </button>
          <h2 className="module-title">Keine Fragen vorhanden 😅</h2>
        </div>
      </div>
    );
  }

  const currentQ = topic.questions[currentIdx];

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    if (option === currentQ.correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIdx < topic.questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const percent = Math.round((score / topic.questions.length) * 100);
    const isPerfect = percent === 100;
    return (
      <div className="module-page">
        {isPerfect && <Confetti />}
        <div className="quiz-result-container">
          <h2 className="module-title" style={{marginBottom: '8px'}}>Quiz beendet! 🏁</h2>
          <div className="quiz-result-emoji">{isPerfect ? '🏆' : (percent >= 50 ? '👏' : '💪')}</div>
          <p className="quiz-result-score">
            {score} von {topic.questions.length} richtig ({percent}%)
          </p>
          <div style={{marginTop: '32px'}}>
            <button className="btn-primary" onClick={onBack}>
              Zurück zur Übersicht
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-page">
      {/* Header */}
      <div className="module-header-section">
        <span className="module-tag">{topic.title}</span>
        <h2 className="module-title">
          Quiz: <span className="accent">{topic.title}</span>
        </h2>
      </div>

      {/* Mobile Image Button */}
      <ImagePanel images={topic.images} mobileOnly />

      {/* Split Layout */}
      <div className="split-layout">
        {/* Left: Image Panel (Desktop) */}
        <ImagePanel images={topic.images} desktopOnly />

        {/* Right: Quiz Panel */}
        <div>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px'}}>
            <button className="back-button" onClick={onBack}>
              <span className="material-symbols-outlined" style={{fontSize:'18px'}}>arrow_back</span>
              Abbrechen
            </button>
            <span className="quiz-counter">
              Frage {currentIdx + 1} / {topic.questions.length}
            </span>
          </div>

          <div className="knowledge-panel">
            <p className="quiz-question-text">{currentQ.question}</p>

            <div className="options-list">
              {currentQ.options.map((opt, i) => {
                let className = "option-button";
                if (selectedOption !== null) {
                  if (opt === currentQ.correct) className += " correct";
                  else if (opt === selectedOption) className += " wrong";
                }
                return (
                  <button
                    key={i}
                    className={className}
                    onClick={() => handleOptionClick(opt)}
                    disabled={selectedOption !== null}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {selectedOption !== null && (
              <div className="quiz-feedback-area">
                <p className="quiz-feedback-text" style={{color: selectedOption === currentQ.correct ? 'var(--tertiary)' : 'var(--error)'}}>
                  {selectedOption === currentQ.correct
                    ? 'Richtig! 🎉 Super gemacht.'
                    : `Leider falsch! 😕 Richtig wäre: ${currentQ.correct}`}
                </p>
                <button className="btn-primary full-width" onClick={handleNext}>
                  {currentIdx < topic.questions.length - 1 ? 'Nächste Frage' : 'Ergebnis ansehen'}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizModule;
