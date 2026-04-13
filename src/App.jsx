import React, { useState } from 'react';
import { appData } from './data/content';
import './index.css';

// Components
import Dashboard from './components/Dashboard';
import LearningModule from './components/LearningModule';
import QuizModule from './components/QuizModule';
import AudioPlayer from './components/AudioPlayer';

function App() {
  const [activeTab, setActiveTab] = useState('lernen'); // 'lernen' or 'quiz'
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
      return (
        <LearningModule 
          topic={selectedTopic} 
          onBack={() => setSelectedTopic(null)} 
        />
      );
    }

    if (activeTab === 'quiz') {
      return (
        <QuizModule 
          topic={selectedTopic} 
          onBack={() => setSelectedTopic(null)} 
        />
      );
    }
  };

  return (
    <>
      <header>
        <div className="logo" onClick={() => setSelectedTopic(null)}>
          🦊 Sach-Schlau!
        </div>
        
        {!selectedTopic && (
          <div className="nav-pills">
            <button 
              className={`nav-pill ${activeTab === 'lernen' ? 'active' : ''}`}
              onClick={() => setActiveTab('lernen')}
            >
              📚 Lernen
            </button>
            <button 
              className={`nav-pill ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              🎮 Quiz
            </button>
          </div>
        )}
      </header>

      <main>
        {renderContent()}
      </main>

      <AudioPlayer />
    </>
  );
}

export default App;
