import React, { useState } from 'react';

function ImagePanel({ images, desktopOnly, mobileOnly }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  if (!images || images.length === 0) return null;

  const handleNext = () => { setCurrentIndex((i) => (i + 1) % images.length); setRotation(0); };
  const handlePrev = () => { setCurrentIndex((i) => (i - 1 + images.length) % images.length); setRotation(0); };
  const handleRotate = () => setRotation(r => r + 90);

  const imageContent = (
    <div>
      <div className="image-panel-body">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Arbeitsblatt ${i + 1}`}
            className={`worksheet-img ${i === currentIndex ? 'visible' : ''}`}
            loading="lazy"
            style={i === currentIndex ? {
              transform: `rotate(${rotation}deg)`,
              maxHeight: rotation % 180 !== 0 ? '55vh' : 'none'
            } : {}}
          />
        ))}
      </div>
      <div className="image-controls-bar">
        {images.length > 1 && (
          <>
            <button className="img-ctrl-btn" onClick={handlePrev}>◀</button>
            <span className="img-counter">{currentIndex + 1} / {images.length}</span>
            <button className="img-ctrl-btn" onClick={handleNext}>▶</button>
          </>
        )}
        <button className="img-ctrl-btn rotate" onClick={handleRotate}>↻ Drehen</button>
        {!fullscreen && !desktopOnly && (
          <button className="img-ctrl-btn" onClick={() => setFullscreen(true)}>⛶ Groß</button>
        )}
      </div>
    </div>
  );

  // Mobile-only: just the trigger button + overlay
  if (mobileOnly) {
    return (
      <>
        <button className="mobile-image-btn" onClick={() => setFullscreen(true)}>
          📸 Arbeitsblatt ansehen & drehen
        </button>
        {fullscreen && (
          <div className="image-overlay" onClick={() => setFullscreen(false)}>
            <div className="image-overlay-inner" onClick={e => e.stopPropagation()}>
              <button className="close-overlay-btn" onClick={() => setFullscreen(false)}>✖</button>
              {imageContent}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop-only: side panel
  if (desktopOnly) {
    return (
      <div className="desktop-panel">
        <div className="image-panel-card">
          <div className="image-panel-header">
            <span>📸 Original-Arbeitsblatt</span>
            <button className="img-ctrl-btn" onClick={() => setFullscreen(true)} style={{padding: '4px 10px', fontSize: '0.8rem'}}>⛶</button>
          </div>
          {imageContent}
        </div>
        {fullscreen && (
          <div className="image-overlay" onClick={() => setFullscreen(false)}>
            <div className="image-overlay-inner" onClick={e => e.stopPropagation()}>
              <button className="close-overlay-btn" onClick={() => setFullscreen(false)}>✖</button>
              {imageContent}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default ImagePanel;
