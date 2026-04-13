import React, { useState, useRef } from 'react';

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="audio-player-widget">
      <audio 
        ref={audioRef} 
        src="/audio/Bohnen__Babys__Ritter_und_Salzburger_Berge.mp3" 
        onEnded={() => setIsPlaying(false)}
      />
      <div className="audio-player-content">
        <div className="audio-icon">{isPlaying ? '🔊' : '🔈'}</div>
        <div className="audio-info">
          <strong>Lern-Audio</strong>
          <span className="mobile-hidden">Vorlesen lassen</span>
        </div>
        <button className="play-btn" onClick={togglePlay}>
          {isPlaying ? '⏸ Pause' : '▶ Play'}
        </button>
      </div>
    </div>
  );
}

export default AudioPlayer;
