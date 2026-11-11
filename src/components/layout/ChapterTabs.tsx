import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { CHAPTERS } from '../../data/chapters';
import { BookOpen, Bookmark, Layers, Shuffle } from 'lucide-react';

export const ChapterTabs: React.FC = () => {
  const { mode, selectedChapter, setMode, bookmarks, shuffleQuestions } = useQuiz();

  const handleChapterClick = (chId: number) => {
    if (mode === 'study') {
      setMode('study', chId);
    } else {
      setMode('chapter', chId);
    }
  };

  return (
    <div className="w-full theme-surface border-b theme-border py-2.5 px-4 sm:px-6 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
        {/* Chapters 1 to 5 */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl theme-muted-box border">
          {CHAPTERS.map((ch) => {
            const isActive =
              (mode === 'chapter' || mode === 'study') && selectedChapter === ch.number;
            return (
              <button
                key={ch.id}
                onClick={() => handleChapterClick(ch.number)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-sm font-bold scale-102'
                    : 'theme-text-secondary hover:theme-text-primary hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-english ${
                    isActive ? 'bg-white/20 text-white' : 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                  }`}
                >
                  {ch.number}
                </span>
                <span className="font-medium whitespace-nowrap">الفصل {ch.number}</span>
                <span className="text-[11px] opacity-75 font-english">(20)</span>
              </button>
            );
          })}
        </div>

        <div className="h-6 w-px theme-border bg-current opacity-20 mx-1"></div>

        {/* Global Modes: Full 100 Questions */}
        <button
          onClick={() => setMode('all')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
            mode === 'all'
              ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
              : 'theme-muted-box border hover:opacity-100 opacity-80'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>الشامل (100 سؤال)</span>
        </button>

        {/* Study & Browse Mode */}
        <button
          onClick={() => setMode('study', selectedChapter || 1)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
            mode === 'study'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
              : 'theme-muted-box border hover:opacity-100 opacity-80'
          }`}
          title="تصفح جميع الأسئلة والشروحات بدون ضغط الكويز"
        >
          <BookOpen className="w-4 h-4" />
          <span>وضع المراجعة والشرح</span>
        </button>

        {/* Bookmarks */}
        {bookmarks.size > 0 && (
          <button
            onClick={() => setMode('bookmarks')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
              mode === 'bookmarks'
                ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                : 'theme-muted-box border hover:opacity-100 opacity-80'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
            <span>المميزة ({bookmarks.size})</span>
          </button>
        )}

        {/* Shuffle current set */}
        <button
          onClick={shuffleQuestions}
          className="p-2 rounded-2xl theme-muted-box border hover:opacity-100 opacity-80 transition-all"
          title="ترتيب عشوائي للأسئلة الحالية"
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
