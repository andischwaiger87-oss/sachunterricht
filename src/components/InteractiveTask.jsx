import React, { useState } from 'react';

function InteractiveTask({ task }) {
  if (task.type === 'checkbox') {
    return <CheckboxTask task={task} />;
  }
  if (task.type === 'categorize') {
    return <CategorizeTask task={task} />;
  }
  return null;
}

function CheckboxTask({ task }) {
  const [selected, setSelected] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const toggleOption = (index) => {
    if (showResult) return;
    setSelected(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const checkAnswers = () => {
    setShowResult(true);
  };

  const reset = () => {
    setSelected([]);
    setShowResult(false);
  };

  return (
    <div className="interactive-task checkbox-task">
      <div className="task-header">
        <span className="material-symbols-outlined task-icon">fact_check</span>
        <h3 className="task-question">{task.question}</h3>
      </div>
      <div className="checkbox-grid">
        {task.options.map((opt, i) => {
          const isSelected = selected.includes(i);
          let statusClass = '';
          if (showResult) {
            if (isSelected && opt.isCorrect) statusClass = 'correct';
            else if (isSelected && !opt.isCorrect) statusClass = 'incorrect';
            else if (!isSelected && opt.isCorrect) statusClass = 'missed';
          }

          return (
            <button 
              key={i}
              className={`checkbox-item ${isSelected ? 'selected' : ''} ${statusClass}`}
              onClick={() => toggleOption(i)}
            >
              <span className="material-symbols-outlined check-icon">
                {isSelected ? 'check_box' : 'check_box_outline_blank'}
              </span>
              {opt.text}
            </button>
          );
        })}
      </div>
      <div className="task-actions">
        {!showResult ? (
          <button className="btn-secondary" onClick={checkAnswers} disabled={selected.length === 0}>
            Überprüfen
          </button>
        ) : (
          <button className="btn-secondary" onClick={reset}>
            <span className="material-symbols-outlined">refresh</span>
            Nochmal versuchen
          </button>
        )}
      </div>
    </div>
  );
}

function CategorizeTask({ task }) {
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});

  const handleSelect = (itemIndex, category) => {
    if (answers[itemIndex] === task.items[itemIndex].category) return;
    
    if (category === task.items[itemIndex].category) {
      setAnswers(prev => ({ ...prev, [itemIndex]: category }));
      setErrors(prev => ({ ...prev, [itemIndex]: false }));
    } else {
      setErrors(prev => ({ ...prev, [itemIndex]: true }));
      setTimeout(() => {
        setErrors(prev => ({ ...prev, [itemIndex]: false }));
      }, 600);
    }
  };

  const isAllCorrect = Object.keys(answers).length === task.items.length;

  return (
    <div className="interactive-task categorize-task">
      <div className="task-header">
        <span className="material-symbols-outlined task-icon">category</span>
        <h3 className="task-question">{task.question}</h3>
      </div>
      <div className="categorize-list">
        {task.items.map((item, i) => {
          const isCorrect = answers[i] === item.category;
          const hasError = errors[i];

          return (
            <div key={i} className={`categorize-item ${isCorrect ? 'correct' : ''} ${hasError ? 'error-shake' : ''}`}>
              <div className="cat-item-text">
                {isCorrect && <span className="material-symbols-outlined correct-icon">check_circle</span>}
                {item.text}
              </div>
              <div className="cat-buttons">
                {task.categories.map(cat => (
                  <button 
                    key={cat}
                    disabled={isCorrect}
                    className={`cat-btn ${answers[i] === cat ? 'active' : ''}`}
                    onClick={() => handleSelect(i, cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {isAllCorrect && (
        <div className="task-success-msg slide-up">
          <span className="material-symbols-outlined">celebration</span>
          Klasse! Du hast alle richtig zugeordnet!
        </div>
      )}
    </div>
  );
}

export default InteractiveTask;
