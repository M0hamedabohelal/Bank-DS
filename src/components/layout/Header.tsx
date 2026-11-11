import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ThemeSelector } from '../common/ThemeSelector';
import { Volume2, VolumeX, Lightbulb, Grid, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleDrawer, isDrawerOpen }) => {
  const {
    questions,
    instantFeedback,
    setInstantFeedback,
    soundEnabled,
    setSoundEnabled,
    score,
    mode,
  } = useQuiz();

  return (
    <header className="sticky top-0 z-30 border-b theme-border backdrop-blur-md theme-surface transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 font-bold text-lg">
            DS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight theme-text-primary">
                CS314 Data Science
              </h1>
              <span className="hidden xs:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                100 سؤال
              </span>
            </div>
            <p className="text-xs theme-text-muted">
              بنك الأسئلة والشروحات العربية التفاعلية
            </p>
          </div>
        </div>

        {/* Live Quiz Stats */}
        {mode !== 'study' && (
          <div className="hidden md:flex items-center gap-4 px-3 py-1.5 rounded-2xl theme-muted-box border text-xs font-medium">
            <div className="flex items-center gap-1.5 theme-text-secondary">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              <span>المجاب:</span>
              <span className="font-bold font-english theme-text-primary">
                {score.answered} / {questions.length}
              </span>
            </div>
            <div className="w-px h-4 theme-border bg-current opacity-20"></div>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>صحيح:</span>
              <span className="font-bold font-english">{score.correct}</span>
            </div>
            {score.answered > 0 && (
              <>
                <div className="w-px h-4 theme-border bg-current opacity-20"></div>
                <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                  <span>النسبة:</span>
                  <span className="font-bold font-english">{score.percentage}%</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Action Controls & Theme */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme & Font Size Selector */}
          <ThemeSelector />

          <div className="h-6 w-px theme-border bg-current opacity-20 mx-1 hidden sm:block"></div>

          {/* Quick Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl transition-all border ${
              soundEnabled
                ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30'
                : 'theme-muted-box border opacity-60 hover:opacity-100'
            }`}
            title={soundEnabled ? 'كتم الصوت التفاعلي' : 'تفعيل المؤثرات الصوتية'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Instant Explanation Toggle */}
          {mode !== 'study' && (
            <button
              onClick={() => setInstantFeedback(!instantFeedback)}
              className={`p-2 rounded-xl transition-all border flex items-center gap-1 text-xs font-semibold ${
                instantFeedback
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                  : 'theme-muted-box border opacity-60 hover:opacity-100'
              }`}
              title={instantFeedback ? 'الشرح الفوري مفعل' : 'تفعيل الشرح الفوري عند الإجابة'}
            >
              <Lightbulb className="w-4 h-4" />
              <span className="hidden lg:inline">
                {instantFeedback ? 'شرح فوري: مفعل' : 'شرح فوري: معطل'}
              </span>
            </button>
          )}

          {/* Questions Grid Drawer Button */}
          <button
            onClick={onToggleDrawer}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isDrawerOpen
                ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
                : 'theme-muted-box border hover:opacity-100 opacity-80'
            }`}
            title="فهرس الأسئلة والتنقل السريع"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">فهرس الأسئلة</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-black/10 dark:bg-white/10">
              {questions.length}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
