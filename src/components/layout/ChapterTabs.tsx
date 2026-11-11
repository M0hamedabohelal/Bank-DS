import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { CHAPTERS } from '../../data/chapters';
import { BookOpen, Bookmark, Layers, Shuffle } from 'lucide-react';

export const ChapterTabs: React.FC = () => {
  const { mode, selectedChapter, setMode, toggleStudyMode, bookmarks, shuffleQuestions } = useQuiz();

  const handleChapterClick = (chId: number) => {
    // Clicking any chapter always returns to/starts that chapter's quiz
    setMode('chapter', chId);
  };

  return (
    <div className="w-full theme-surface border-b theme-border py-2 px-3 sm:px-6 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2 min-w-max">
        {/* Chapters 1 to 5 - independent from study mode */}
        <div className="flex items-center gap-1 p-0.5 sm:p-1 rounded-2xl theme-muted-box border">
          {CHAPTERS.map((ch) => {
            const isActive = mode === 'chapter' && selectedChapter === ch.number;
            return (
              <button
                key={ch.id}
                onClick={() => handleChapterClick(ch.number)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-xs font-bold scale-102'
                    : 'theme-text-secondary hover:theme-text-primary hover:bg-black/5 dark:hover:bg-white/5'
                }`}
                title={`بدء كويز الفصل ${ch.number}`}
              >
                <span
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold font-english ${
                    isActive ? 'bg-white/20 text-white' : 'bg-sky-500/15 text-sky-600 dark:text-sky-400'
                  }`}
                >
                  {ch.number}
                </span>
                <span className="font-medium whitespace-nowrap text-[11px] sm:text-xs">
                  الفصل {ch.number}
                </span>
              </button>
            );
          })}
        </div>

        <div className="h-5 sm:h-6 w-px theme-border bg-current opacity-20 mx-0.5 sm:mx-1"></div>

        {/* Global Modes: Full 100 Questions */}
        <button
          onClick={() => setMode('all')}
          className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-semibold transition-all border ${
            mode === 'all'
              ? 'bg-sky-500 text-white border-sky-600 shadow-xs font-bold'
              : 'theme-muted-box border hover:opacity-100 opacity-80'
          }`}
          title="كويز شامل لكافة الأسئلة (100 سؤال)"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>الشامل (100)</span>
        </button>

        {/* Study & Review Mode - Completely independent toggle */}
        <button
          onClick={toggleStudyMode}
          className={`flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-semibold transition-all border ${
            mode === 'study'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs font-bold ring-2 ring-emerald-500/30'
              : 'theme-muted-box border hover:opacity-100 opacity-80'
          }`}
          title={
            mode === 'study'
              ? 'اضغط مرة أخرى للعودة لوضع الكويز الطبيعي'
              : 'تصفح بنك الأسئلة مع الحلول والشروحات كاملة'
          }
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            {mode === 'study' ? 'وضع المراجعة والشرح (مفعّل ✓)' : 'وضع المراجعة والشرح'}
          </span>
        </button>

        {/* Bookmarks */}
        {bookmarks.size > 0 && (
          <button
            onClick={() => setMode('bookmarks')}
            className={`flex items-center gap-1 sm:gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-semibold transition-all border ${
              mode === 'bookmarks'
                ? 'bg-rose-500 text-white border-rose-600 shadow-xs font-bold'
                : 'theme-muted-box border hover:opacity-100 opacity-80'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
            <span>المميزة ({bookmarks.size})</span>
          </button>
        )}

        {/* Shuffle current set (only active in quiz modes) */}
        {mode !== 'study' && (
          <button
            onClick={shuffleQuestions}
            className="p-1.5 sm:p-2 rounded-xl sm:rounded-2xl theme-muted-box border hover:opacity-100 opacity-80 transition-all"
            title="ترتيب عشوائي للأسئلة الحالية"
          >
            <Shuffle className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
