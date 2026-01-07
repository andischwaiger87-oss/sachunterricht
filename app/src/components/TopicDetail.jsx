import { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import content from '../data/content.json'
import { ArrowLeft, BookOpen, BrainCircuit, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import InfoCard from './InfoCard'
import Quiz from './Quiz'

const TopicDetail = () => {
    const { id } = useParams()
    const topic = content.find(t => t.id === id)
    const [activeTab, setActiveTab] = useState('learn') // 'learn' or 'quiz'

    // Zoom controls ref
    const transformComponentRef = useRef(null);

    if (!topic) return <div className="container">Thema nicht gefunden!</div>

    return (
        <div className="container">
            <Link to="/" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: 'var(--color-text-light)',
                textDecoration: 'none',
                fontWeight: '600',
                marginBottom: '20px'
            }}>
                <ArrowLeft size={20} /> Zurück zur Übersicht
            </Link>

            <h1 style={{ marginBottom: '20px', color: 'var(--color-primary-dark)', lineHeight: '1.2' }}>{topic.title}</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '30px',
                background: 'white',
                padding: '5px',
                borderRadius: '50px',
                boxShadow: 'var(--shadow-sm)'
            }}>
                <button
                    onClick={() => setActiveTab('learn')}
                    style={{
                        padding: '12px',
                        borderRadius: '40px',
                        background: activeTab === 'learn' ? 'var(--color-primary)' : 'transparent',
                        color: activeTab === 'learn' ? 'white' : 'var(--color-text-light)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    <BookOpen size={20} /> Lernen
                </button>
                <button
                    onClick={() => setActiveTab('quiz')}
                    style={{
                        padding: '12px',
                        borderRadius: '40px',
                        background: activeTab === 'quiz' ? 'var(--color-secondary)' : 'transparent',
                        color: activeTab === 'quiz' ? 'white' : 'var(--color-text-light)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        border: 'none',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}
                >
                    <BrainCircuit size={20} /> Quiz
                </button>
            </div>

            <div className="fade-in">
                {activeTab === 'learn' ? (
                    <div>
                        <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
                            <TransformWrapper
                                ref={transformComponentRef}
                                initialScale={1}
                                minScale={1}
                                maxScale={4}
                            >
                                {({ zoomIn, zoomOut, resetTransform }) => (
                                    <>
                                        <div style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            zIndex: 10,
                                            display: 'flex',
                                            gap: '5px'
                                        }}>
                                            <button onClick={() => zoomIn()} className="zoom-btn" style={zoomButtonStyle}>
                                                <ZoomIn size={18} />
                                            </button>
                                            <button onClick={() => zoomOut()} className="zoom-btn" style={zoomButtonStyle}>
                                                <ZoomOut size={18} />
                                            </button>
                                            <button onClick={() => resetTransform()} className="zoom-btn" style={zoomButtonStyle}>
                                                <RefreshCw size={18} />
                                            </button>
                                        </div>

                                        <TransformComponent wrapperStyle={{ width: '100%' }} contentStyle={{ width: '100%' }}>
                                            <img
                                                src={`/images/${topic.image}`}
                                                alt={topic.title}
                                                style={{
                                                    width: '100%',
                                                    display: 'block',
                                                    transform: topic.rotate ? `rotate(${topic.rotate}deg)` : 'none',
                                                    transformOrigin: 'center center',
                                                    // Adjust margins if rotated to avoid clipping issues in some layouts, 
                                                    // but for 90deg rotation in square/flexible containers, simple rotate might suffice initially.
                                                    // If it's 90deg, the width becomes height. 
                                                }}
                                            />
                                        </TransformComponent>
                                    </>
                                )}
                            </TransformWrapper>

                            <div style={{
                                padding: '10px',
                                background: '#f8f9fa',
                                fontSize: '0.85rem',
                                color: '#666',
                                textAlign: 'center',
                                borderTop: '1px solid #eee'
                            }}>
                                Tippe und ziehe zum Zoomen 🔍
                            </div>
                        </div>

                        <h3 style={{ margin: '30px 0 15px', color: 'var(--color-secondary)' }}>Das ist Wichtig!</h3>
                        <div style={{ display: 'grid', gap: '15px' }}>
                            {topic.importantText.map((text, idx) => (
                                <InfoCard key={idx} text={text} index={idx} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <Quiz questions={topic.quiz} />
                )}
            </div>
        </div>
    )
}

const zoomButtonStyle = {
    background: 'white',
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#333',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}

export default TopicDetail
