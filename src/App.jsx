import React, { useState } from 'react';
import { appData } from './data/content';
import './index.css';

import Dashboard from './components/Dashboard';
import LearningModule from './components/LearningModule';
import QuizModule from './components/QuizModule';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [activeTab, setActiveTab] = useState('lernen');
  const [selectedTopic, setSelectedTopic] = useState(null);

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

  const getActiveIcon = (tab) => {
    if (tab === activeTab && !selectedTopic) return 'active';
    return '';
  };

  return (
    <>
      {/* === Top App Bar (Glassmorphism) === */}
      <header className="top-app-bar">
        <div className="logo" onClick={() => setSelectedTopic(null)}>
          <div className="logo-icon">🦊</div>
          <span className="logo-text">Sach-Schlau!</span>
        </div>
      </header>

      <main>
        {renderContent()}
      </main>

      {/* === Bottom Navigation Dock === */}
      <nav className="bottom-nav-dock">
        <button
          className={`dock-btn ${getActiveIcon('lernen')}`}
          onClick={() => { setActiveTab('lernen'); setSelectedTopic(null); }}
          title="Entdecken"
        >
          <span className="material-symbols-outlined" style={activeTab === 'lernen' && !selectedTopic ? {fontVariationSettings: "'FILL' 1"} : {}}>
            explore
          </span>
        </button>
        <button
          className={`dock-btn ${activeTab === 'lernen' && selectedTopic ? 'active' : ''}`}
          onClick={() => { if (selectedTopic) { setActiveTab('lernen'); } }}
          title="Lernkarten"
        >
          <span className="material-symbols-outlined" style={activeTab === 'lernen' && selectedTopic ? {fontVariationSettings: "'FILL' 1"} : {}}>
            menu_book
          </span>
        </button>
        <button
          className={`dock-btn ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => { setActiveTab('quiz'); if (!selectedTopic) { /* stay on dashboard */ } }}
          title="Quiz"
        >
          <span className="material-symbols-outlined" style={activeTab === 'quiz' ? {fontVariationSettings: "'FILL' 1"} : {}}>
            auto_awesome
          </span>
        </button>
      </nav>

      {/* === Audio Player Floating === */}
      <AudioPlayer />
    </>
  );
}

export default App;
