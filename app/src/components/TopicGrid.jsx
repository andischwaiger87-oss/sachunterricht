import { Link } from 'react-router-dom'
import content from '../data/content.json'
import { BookOpen } from 'lucide-react'

const TopicGrid = () => {
    return (
        <div className="container">
            <header style={{ textAlign: 'center', margin: '40px 0' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--color-primary-dark)', marginBottom: '10px' }}>
                    Sachunterricht
                </h1>
                <p style={{ color: 'var(--color-text-light)', fontSize: '1.2rem' }}>
                    Bereite dich auf deinen Test vor!
                </p>
            </header>

            <div style={{ display: 'grid', gap: '20px' }}>
                {content.map((topic) => (
                    <Link to={`/topic/${topic.id}`} key={topic.id} style={{ textDecoration: 'none' }}>
                        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <img
                                src={`/images/${topic.image}`}
                                alt={topic.title}
                                style={{
                                    width: '80px',
                                    height: '80px',
                                    objectFit: 'cover',
                                    borderRadius: 'var(--radius-md)',
                                    border: '2px solid var(--color-bg)'
                                }}
                            />
                            <div>
                                <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{topic.title}</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--color-primary)', fontWeight: '600' }}>
                                    <BookOpen size={18} />
                                    <span>Lernen & Üben</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TopicGrid
