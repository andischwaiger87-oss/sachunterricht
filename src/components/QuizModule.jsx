import React, { useState, useEffect } from 'react';
import ImagePanel from './ImagePanel';

const Confetti = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const p = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -20,
      rotation: Math.random() * 360,
      speed: 1 + Math.random() * 3,
      delay: Math.random() * 2
    }));
    setParticles(p);
  }, []);

  return (
    <div className="confetti" style={{position:'fixed', top:0, left:0, width:'100%', height:'100%', zIndex:999, pointerEvents:'none'}}>
      {particles.map(p => (
        <div 
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            fontSize: '30px',
            animation: `fall ${p.speed}s linear ${p.delay}s forwards`,
          }}
        >
          {['⭐', '🌟', '🎉', '🏆', '💯'][Math.floor(Math.random() * 5)]}
        </div>
      ))}
      <style>{`@keyframes fall { to { transform: translateY(120vh) rotate(720deg); } }`}</style>
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
      <div className="split-view-container">
        <ImagePanel images={topic.images} />
        <div className="module-container">
          <div className="top-controls"><button className="back-btn" onClick={onBack}>← Zurück</button></div>
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h2>Keine Fragen gefunden 😅</h2>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = topic.questions[currentIdx];

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    if (option === currentQ.correct) {
      setScore(s => s + 1);
    }
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
      <div className="module-container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        {isPerfect && <Confetti />}
        <h2 style={{ fontSize: '40px', color: topic.color }}>Quiz beendet! 🏁</h2>
        <div style={{ fontSize: '100px', margin: '30px 0', animation: 'popIn 0.5s' }}>
          {isPerfect ? '🏆' : (percent >= 50 ? '👏' : '💪')}
        </div>
        <p style={{ fontSize: '28px', fontWeight: 'bold' }}>
          Du hast {score} von {topic.questions.length} Fragen richtig! ({percent}%)
        </p>
        <button 
          className="btn-primary" 
          onClick={onBack}
          style={{ backgroundColor: topic.color, marginTop: '40px', fontSize: '22px' }}
        >
          Zurück zur Übersicht
        </button>
      </div>
    );
  }

  return (
    <div className="split-view-container">
      {/* Left Panel: The original worksheet Image */}
      <ImagePanel images={topic.images} />

      {/* Right Panel: The interactive question */}
      <div className="module-container">
        <div className="top-controls" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <button className="back-btn" onClick={onBack}>← Quiz abbrechen</button>
          <div style={{ fontWeight: 'bold', color: topic.color, background: '#f7fafc', padding: '10px 15px', borderRadius:'12px' }}>
            Frage {currentIdx + 1} / {topic.questions.length}
          </div>
        </div>

        <div className="quiz-question">
          {currentQ.question}
        </div>

        <div className="options-grid">
          {currentQ.options.map((opt, i) => {
            let btnClass = "option-btn";
            if (selectedOption !== null) {
              if (opt === currentQ.correct) btnClass += " correct";
              else if (opt === selectedOption) btnClass += " wrong";
            }

            return (
              <button 
                key={i}
                className={btnClass}
                onClick={() => handleOptionClick(opt)}
                disabled={selectedOption !== null}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {selectedOption !== null && (
          <div className="quiz-feedback">
            <p style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px' }}>
              {selectedOption === currentQ.correct ? 'Richtig! 🎉 Klasse gemacht.' : `Leider falsch! 😕 Richtig wäre: ${currentQ.correct}`}
            </p>
            <button 
              className="btn-primary" 
              onClick={handleNext}
              style={{ backgroundColor: topic.color, width: '100%' }}
            >
              {currentIdx < topic.questions.length - 1 ? 'Nächste Frage ➡' : 'Ergebnis ansehen 🏁'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizModule;
