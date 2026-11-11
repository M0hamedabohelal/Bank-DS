import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ThemeSelector } from '../common/ThemeSelector';
import { Volume2, VolumeX, Lightbulb, Grid, RotateCcw, BookOpen, CheckCircle2, Bookmark } from 'lucide-react';

interface HeaderProps {
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleDrawer, isDrawerOpen }) => {
  const {
    questions,
    answers,
    instantFeedback,
    setInstantFeedback,
    soundEnabled,
    setSoundEnabled,
    resetQuiz,
    score,
    mode,
    bookmarks,
  } = useQuiz();

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 dark:border-white/10 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 font-bold text-lg">
            DS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                CS314 Data Science
              </h1>
              <span className="hidden xs:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                100 سؤال
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              بنك الأسئلة والشروحات العربية التفاعلية
            </p>
          </div>
        </div>

        {/* Live Quiz Stats */}
        {mode !== 'study' && (
          <div className="hidden md:flex items-center gap-4 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-black/5 dark:border-white/5 text-xs font-medium">
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              <span>المجاب:</span>
              <span className="font-bold font-english text-slate-900 dark:text-white">
                {score.answered} / {questions.length}
              </span>
            </div>
            <div className="w-px h-4 bg-slate-300 dark:bg-slate-700"></div>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>صحيح:</span>
              <span className="font-bold font-english">{score.correct}</span>
            </div>
            {score.answered > 0 && (
              <>
                <div className="w-px h-4 bg-slate-300 dark:bg-slate-700"></div>
                <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
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

          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block"></div>

          {/* Quick Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl transition-all border ${
              soundEnabled
                ? 'bg-sky-50 text-sky-600 border-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:border-sky-800'
                : 'bg-slate-100 text-slate-400 border-transparent dark:bg-slate-800 dark:text-slate-500'
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
                  ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                  : 'bg-slate-100 text-slate-500 border-transparent dark:bg-slate-800 dark:text-slate-400'
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
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-black/5 dark:border-white/5 hover:bg-slate-200 dark:hover:bg-slate-700'
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
