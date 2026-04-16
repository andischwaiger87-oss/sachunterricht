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
    <div className="audio-float">
      <audio
        ref={audioRef}
        src="/audio/Bohnen__Babys__Ritter_und_Salzburger_Berge.mp3"
        onEnded={() => setIsPlaying(false)}
      />
      <span style={{ fontSize: '22px' }}>{isPlaying ? '🔊' : '🔈'}</span>
      <div className="audio-label">
        <strong>Lern-Audio</strong>
        <span>Vorlesen lassen</span>
      </div>
      <button className="audio-play-btn" onClick={togglePlay}>
        {isPlaying ? '⏸ Pause' : '▶ Play'}
      </button>
    </div>
  );
}

export default AudioPlayer;
