import React, { useState, useRef } from 'react';
import { appData } from './data/content';
import './index.css';

import Dashboard from './components/Dashboard';
import LearningModule from './components/LearningModule';
import QuizModule from './components/QuizModule';

function App() {
  const [activeTab, setActiveTab] = useState('lernen');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const restartAudio = () => {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const renderContent = () => {
    if (!selectedTopic) {
      return (
        <Dashboard
          topics={appData.topics}
          onSelectTopic={setSelectedTopic}
          mode={activeTab}
        />
      );
    }
    if (activeTab === 'lernen') {
      return <LearningModule topic={selectedTopic} onBack={() => setSelectedTopic(null)} />;
    }
    return <QuizModule topic={selectedTopic} onBack={() => setSelectedTopic(null)} />;
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src="/audio/Bohnen__Babys__Ritter_und_Salzburger_Berge.mp3"
        onEnded={() => setIsPlaying(false)}
      />

      <main>
        {renderContent()}
      </main>

      {/* === Bottom Navigation Dock === */}
      <nav className="bottom-nav-dock">
        {/* Lernen */}
        <button
          className={`dock-btn ${activeTab === 'lernen' ? 'active' : ''}`}
          onClick={() => { setActiveTab('lernen'); setSelectedTopic(null); }}
        >
          <span className="material-symbols-outlined" style={activeTab === 'lernen' ? {fontVariationSettings: "'FILL' 1"} : {}}>
            menu_book
          </span>
          <span className="dock-label">Lernen</span>
        </button>

        {/* Audio Player (center) */}
        <div className="dock-audio-center">
          <button className="dock-audio-btn" onClick={restartAudio} title="Neustart">
            <span className="material-symbols-outlined">replay</span>
          </button>
          <button className={`dock-audio-play ${isPlaying ? 'playing' : ''}`} onClick={toggleAudio} title={isPlaying ? 'Pause' : 'Abspielen'}>
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1", fontSize: '32px'}}>
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <span className="dock-audio-label">Audio</span>
        </div>

        {/* Quiz */}
        <button
          className={`dock-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => { setActiveTab('quiz'); setSelectedTopic(null); }}
        >
          <span className="material-symbols-outlined" style={activeTab === 'quiz' ? {fontVariationSettings: "'FILL' 1"} : {}}>
            quiz
          </span>
          <span className="dock-label">Quiz</span>
        </button>
      </nav>
    </>
  );
}

export default App;
