
import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import QuantumGatesView from './components/QuantumGatesView';

const App: React.FC = () => {
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);

  const handleSelectTopic = (topicId: string) => {
    setCurrentTopic(topicId);
  };

  const handleBackToJourney = () => {
    setCurrentTopic(null);
  };

  return (
    <div className="w-full h-full">
      {currentTopic === null ? (
        <LandingPage onSelectTopic={handleSelectTopic} />
      ) : currentTopic === 'quantum-gates' ? (
        <QuantumGatesView onBack={handleBackToJourney} />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-[#020617] text-slate-200">
          <h2 className="text-2xl font-bold mb-4">Module Under Construction</h2>
          <p className="text-slate-400 mb-8">This part of the journey is still being documented.</p>
          <button 
            onClick={handleBackToJourney}
            className="px-6 py-2 bg-sky-500 hover:bg-sky-600 rounded-full text-white font-bold transition-colors"
          >
            Back to Journey
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
