import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { Header } from './components/layout/Header';
import { ChapterTabs } from './components/layout/ChapterTabs';
import { QuestionCard } from './components/quiz/QuestionCard';
import { QuizControls } from './components/quiz/QuizControls';
import { QuestionDrawer } from './components/layout/QuestionDrawer';
import { ResultsModal } from './components/quiz/ResultsModal';
import { StudyBrowseView } from './components/study/StudyBrowseView';
import { Footer } from './components/layout/Footer';

const QuizMainContent: React.FC = () => {
  const { mode } = useQuiz();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors duration-300">
      <div>
        {/* Navigation & Controls Header */}
        <Header
          onToggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)}
          isDrawerOpen={isDrawerOpen}
        />

        {/* Chapter & Mode Tabs */}
        <ChapterTabs />

        {/* Main Quiz Area */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 w-full">
          {mode === 'study' ? (
            <StudyBrowseView />
          ) : (
            <div className="space-y-6">
              <QuestionCard />
              <QuizControls onShowResults={() => setIsResultsOpen(true)} />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <QuestionDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <ResultsModal
        isOpen={isResultsOpen}
        onClose={() => setIsResultsOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <QuizProvider>
        <QuizMainContent />
      </QuizProvider>
    </ThemeProvider>
  );
}

export default App;
