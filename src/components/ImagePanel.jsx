import React, { useState } from 'react';

function ImagePanel({ images }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  if (!images || images.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((i) => (i + 1) % images.length);
    setRotation(0); // Reset rotation for new image
  };
  const handlePrev = () => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
    setRotation(0);
  };
  const handleRotate = () => {
    setRotation(r => r + 90);
  };

  const imgContent = (
    <div className="image-panel-content">
      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
        {images.map((src, i) => (
          <img 
            key={src} 
            src={src} 
            alt={`Arbeitsblatt ${i+1}`}
            className={`worksheet-image ${i === currentIndex ? 'active' : ''}`}
            loading="lazy"
            style={i === currentIndex ? { 
              transform: `rotate(${rotation}deg)`, 
              transition: 'transform 0.3s ease-out',
              maxWidth: '100%',
              // Scale down slightly if rotated 90 or 270 degrees to avoid cropping if aspect ratio is tall
              maxHeight: (rotation % 180 !== 0) ? '60vh' : 'none'
            } : {}}
          />
        ))}
      </div>
      
      <div className="image-controls">
        {images.length > 1 && <button onClick={handlePrev}>◀</button>}
        {images.length > 1 && <span>{currentIndex + 1} / {images.length}</span>}
        {images.length > 1 && <button onClick={handleNext}>▶</button>}
        
        <button onClick={handleRotate} style={{ marginLeft: '10px', background: '#ed8936' }}>
          ↻ Drehen
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="image-panel-container desktop-only">
        <div className="image-panel-header">
          <span>📸 Original-Arbeitsblatt</span>
          <div>
            <button className="expand-btn" onClick={() => setFullscreen(true)}>⛶</button>
          </div>
        </div>
        <div className="image-panel-body">
          {imgContent}
        </div>
      </div>

      <button className="mobile-only show-image-modal-btn" onClick={() => setFullscreen(true)}>
        📸 Arbeitsblatt ansehen & drehen
      </button>

      {fullscreen && (
        <div className="image-modal-overlay" onClick={() => setFullscreen(false)}>
          <div className="image-modal-content" onClick={e => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={() => setFullscreen(false)}>✖</button>
            {imgContent}
          </div>
        </div>
      )}
    </>
  );
}

export default ImagePanel;
