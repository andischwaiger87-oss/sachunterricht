import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import content from '../data/content.json'
import { ArrowLeft, BookOpen, BrainCircuit } from 'lucide-react'
import InfoCard from './InfoCard'
import Quiz from './Quiz'

const TopicDetail = () => {
    const { id } = useParams()
    const topic = content.find(t => t.id === id)
    const [activeTab, setActiveTab] = useState('learn') // 'learn' or 'quiz'

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

            <h1 style={{ marginBottom: '20px', color: 'var(--color-primary-dark)' }}>{topic.title}</h1>

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
                        gap: '8px'
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
                        gap: '8px'
                    }}
                >
                    <BrainCircuit size={20} /> Quiz
                </button>
            </div>

            <div className="fade-in">
                {activeTab === 'learn' ? (
                    <div>
                        <div className="card" style={{ overflow: 'hidden', padding: 0 }}>
                            <img
                                src={`/images/${topic.image}`}
                                alt={topic.title}
                                style={{ width: '100%', display: 'block' }}
                            />
                            <div style={{ padding: '15px', background: '#f8f9fa', fontSize: '0.9rem', color: '#666', textAlign: 'center' }}>
                                Tippe auf das Bild zum Vergrößern (Zoom kommt noch)
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

export default TopicDetail
