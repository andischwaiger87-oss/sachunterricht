import { Info } from 'lucide-react'

const InfoCard = ({ text, index }) => {
    return (
        <div className="card" style={{
            borderLeft: '5px solid var(--color-secondary)',
            display: 'flex',
            gap: '15px',
            alignItems: 'flex-start',
            marginBottom: '10px'
        }}>
            <div style={{
                background: 'rgba(255, 107, 107, 0.1)',
                padding: '8px',
                borderRadius: '50%',
                color: 'var(--color-secondary)',
                flexShrink: 0
            }}>
                <Info size={24} />
            </div>
            <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>{text}</p>
        </div>
    )
}

export default InfoCard
