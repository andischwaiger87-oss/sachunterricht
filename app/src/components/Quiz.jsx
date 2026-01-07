import { useState } from 'react'
import { Check, X, RotateCcw, Trophy, ArrowRight } from 'lucide-react'

const Quiz = ({ questions }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [selectedAnswer, setSelectedAnswer] = useState(null) // For MC & Classify
    const [selectedIndices, setSelectedIndices] = useState([]) // For Checklist
    const [textInput, setTextInput] = useState('') // For Fill-in
    const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong'

    const question = questions[currentIndex]
    const isLastQuestion = currentIndex === questions.length - 1

    const handleNext = () => {
        // Reset state for next question
        setSelectedAnswer(null)
        setSelectedIndices([])
        setTextInput('')
        setFeedback(null)

        if (isLastQuestion) {
            setShowResult(true)
        } else {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const checkAnswer = () => {
        let isCorrect = false

        if (question.type === 'fill_in') {
            // Normalize text for comparison
            if (textInput.trim().toUpperCase() === question.answer.toUpperCase()) {
                isCorrect = true
            }
        } else if (question.type === 'checklist') {
            // Check if all correct indices are selected and no extra ones
            const sortedSelected = [...selectedIndices].sort()
            const sortedCorrect = [...question.correctIndices].sort()
            if (JSON.stringify(sortedSelected) === JSON.stringify(sortedCorrect)) {
                isCorrect = true
            }
        } else if (question.type === 'table_classify') {
            // This type works differently, it's a mini-game itself usually.
            // For simplicity allow "checking" one item at a time or just simulating a "Quiz" format.
            // My JSON structure has "items" list. I should probably iterate through them?
            // Let's implement a sub-loop for table_classify or treating the whole table as one question?
            // Better: Treat each item in the table as a sub-question.
            // BUT current structure treats the whole table as ONE question object in the array.
            // I will implement a specialized view for this.
            // Let's assume for this turn, we just check if the user classified everything correctly.
            // I'll need local state for the classification results.
            // Let's skip complex implementation for V1 and assume "selectedAnswer" is the user's filled table.
            // Actually, let's simplify: render each item with two buttons. User must click all correct buttons.
            // Wait, 'checkAnswer' implies a submit button.

            // Let's change the strategy for 'table_classify':
            // It's a list of items. User clicks "Leiter" or "Nichtleiter" for each.
            // Only when all are done, we check.
            // I need state for "classifications": { [itemName]: 'Leiter' | 'Nichtleiter' }
        } else {
            // Multiple Choice (Default)
            if (selectedAnswer === question.correct) {
                isCorrect = true
            }
        }

        // Special handling for table_classify inside render...
        // Let's just strictly handle the logic here.
        if (question.type === 'table_classify') {
            // See internal logic in render
            // For now, assume it's always correct to skip complexity or handling it in sub-component?
            // No, I need to implement it.
            // Let's assume `selectedAnswer` holds the count of correct items?
            // I'll fix this in the render part.
            isCorrect = true // Placeholder
        }

        if (isCorrect) {
            setScore(prev => prev + 1)
            setFeedback('correct')
        } else {
            setFeedback('wrong')
        }
    }

    const restart = () => {
        setCurrentIndex(0)
        setScore(0)
        setShowResult(false)
        setFeedback(null)
        setSelectedAnswer(null)
        setSelectedIndices([])
        setTextInput('')
    }

    if (showResult) {
        return (
            <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ color: 'var(--color-primary)', marginBottom: '20px' }}>
                    <Trophy size={64} />
                </div>
                <h2>Super gemacht!</h2>
                <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
                    Du hast {score} von {questions.length} Fragen richtig beantwortet.
                </p>
                <button className="btn-primary" onClick={restart}>
                    <RotateCcw size={18} style={{ marginRight: '8px' }} />
                    Noch einmal spielen
                </button>
            </div>
        )
    }

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: 'var(--color-text-light)' }}>
                <span>Frage {currentIndex + 1} / {questions.length}</span>
                <span>Punkte: {score}</span>
            </div>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>
                {question.question}
            </h3>

            {/* RENDER QUESTION BODY */}
            <div style={{ marginBottom: '30px' }}>
                {question.type === 'fill_in' ? (
                    <input
                        type="text"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Antwort eingeben..."
                        disabled={feedback !== null}
                        style={{
                            width: '100%',
                            padding: '15px',
                            fontSize: '1.2rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '2px solid var(--color-primary)',
                            outline: 'none'
                        }}
                    />
                ) : question.type === 'checklist' ? (
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {question.options.map((opt, idx) => {
                            const isSelected = selectedIndices.includes(idx)
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (feedback) return
                                        if (isSelected) setSelectedIndices(prev => prev.filter(i => i !== idx))
                                        else setSelectedIndices(prev => [...prev, idx])
                                    }}
                                    style={{
                                        textAlign: 'left',
                                        padding: '15px',
                                        borderRadius: 'var(--radius-md)',
                                        border: `2px solid ${isSelected ? 'var(--color-primary)' : '#eee'}`,
                                        background: isSelected ? 'rgba(61, 204, 199, 0.1)' : 'white',
                                        color: isSelected ? 'var(--color-primary-dark)' : 'var(--color-text)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    {opt}
                                    {isSelected && <Check size={20} />}
                                </button>
                            )
                        })}
                    </div>
                ) : question.type === 'table_classify' ? (
                    <TableClassify question={question} onComplete={(isCorrect) => {
                        // Determine immediate feedback for this sub-component
                        if (isCorrect) {
                            setScore(prev => prev + 1)
                            setFeedback('correct')
                        } else {
                            setFeedback('wrong')
                        }
                    }} isFinished={feedback !== null} />
                ) : (
                    // Standard Multiple Choice
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {question.options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => !feedback && setSelectedAnswer(idx)}
                                style={{
                                    textAlign: 'left',
                                    padding: '15px',
                                    borderRadius: 'var(--radius-md)',
                                    border: `2px solid ${selectedAnswer === idx ? 'var(--color-primary)' : '#eee'}`,
                                    background: selectedAnswer === idx ? 'rgba(61, 204, 199, 0.1)' : 'white',
                                    fontWeight: selectedAnswer === idx ? '600' : '400'
                                }}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {feedback && (
                <div style={{
                    padding: '15px',
                    borderRadius: 'var(--radius-md)',
                    background: feedback === 'correct' ? 'rgba(107, 207, 99, 0.2)' : 'rgba(255, 118, 117, 0.2)',
                    color: feedback === 'correct' ? 'green' : 'red',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontWeight: 'bold'
                }}>
                    {feedback === 'correct' ? <Check /> : <X />}
                    {feedback === 'correct' ? 'Richtig!' : 'Leider falsch!'}
                </div>
            )}

            {/* FOOTER ACTIONS */}
            {/* If table_classify is active, IT handles the check logic internally and calls onComplete. 
          So we hide the main "Überprüfen" button for it. */}
            {question.type !== 'table_classify' && (
                <button
                    className="btn-primary"
                    onClick={feedback ? handleNext : checkAnswer}
                    disabled={!textInput && selectedAnswer === null && selectedIndices.length === 0 && !feedback}
                    style={{ opacity: (!textInput && selectedAnswer === null && selectedIndices.length === 0 && !feedback) ? 0.5 : 1 }}
                >
                    {feedback ? (isLastQuestion ? 'Ergebnis anzeigen' : 'Nächste Frage') : 'Überprüfen'}
                </button>
            )}

            {/* For table_classify, we need a "Next" button only after feedback is received */}
            {question.type === 'table_classify' && feedback && (
                <button className="btn-primary" onClick={handleNext}>
                    {isLastQuestion ? 'Ergebnis anzeigen' : 'Nächste Frage'}
                </button>
            )}

        </div>
    )
}

// Sub-component for classification table
const TableClassify = ({ question, onComplete, isFinished }) => {
    // items: [{name: "X", category: "Leiter"}]
    // State: { "Radiergummi": "Nichtleiter" }
    const [answers, setAnswers] = useState({})

    const handleSelect = (itemName, category) => {
        if (isFinished) return
        setAnswers(prev => ({ ...prev, [itemName]: category }))
    }

    const check = () => {
        let allCorrect = true
        question.items.forEach(item => {
            if (answers[item.name] !== item.category) allCorrect = false
        })
        onComplete(allCorrect)
    }

    const isAllAnswered = question.items.every(item => answers[item.name])

    return (
        <div>
            <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
                {question.items.map((item, idx) => {
                    const currentAns = answers[item.name]
                    const correctAns = item.category
                    // Visual feedback
                    let borderColor = '#eee'
                    if (isFinished) {
                        borderColor = currentAns === correctAns ? 'green' : 'red'
                    }

                    return (
                        <div key={idx} style={{
                            padding: '10px',
                            border: `2px solid ${borderColor}`,
                            borderRadius: 'var(--radius-md)',
                            background: '#fcfcfc'
                        }}>
                            <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>{item.name}</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                <button
                                    onClick={() => handleSelect(item.name, 'Leiter')}
                                    style={{
                                        padding: '8px',
                                        borderRadius: '20px',
                                        background: currentAns === 'Leiter' ? 'var(--color-primary)' : '#e0e0e0',
                                        color: currentAns === 'Leiter' ? 'white' : '#555',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Leiter
                                </button>
                                <button
                                    onClick={() => handleSelect(item.name, 'Nichtleiter')}
                                    style={{
                                        padding: '8px',
                                        borderRadius: '20px',
                                        background: currentAns === 'Nichtleiter' ? 'var(--color-secondary)' : '#e0e0e0',
                                        color: currentAns === 'Nichtleiter' ? 'white' : '#555',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Nichtleiter
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {!isFinished && (
                <button
                    className="btn-primary"
                    onClick={check}
                    disabled={!isAllAnswered}
                    style={{ opacity: !isAllAnswered ? 0.5 : 1 }}
                >
                    Überprüfen
                </button>
            )}
        </div>
    )
}

export default Quiz
