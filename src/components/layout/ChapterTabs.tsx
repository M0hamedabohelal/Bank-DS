import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { CHAPTERS } from '../../data/chapters';
import { QuizMode } from '../../types/quiz';
import { BookOpen, Zap, Bookmark, Layers, Shuffle } from 'lucide-react';

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
    <div className="w-full bg-white/60 dark:bg-slate-900/60 border-b border-black/5 dark:border-white/5 py-2.5 px-4 sm:px-6 overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
        {/* Chapters 1 to 5 */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-black/5 dark:border-white/5">
          {CHAPTERS.map((ch) => {
            const isActive =
              (mode === 'chapter' || mode === 'study') && selectedChapter === ch.number;
            return (
              <button
                key={ch.id}
                onClick={() => handleChapterClick(ch.number)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-sm scale-102'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-sky-500/10 text-sky-600 dark:text-sky-400 font-english">
                  {ch.number}
                </span>
                <span className="font-medium whitespace-nowrap">الفصل {ch.number}</span>
                <span className="text-[11px] opacity-60 font-english">(20)</span>
              </button>
            );
          })}
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

        {/* Global Modes: Full 100 Questions */}
        <button
          onClick={() => setMode('all')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
            mode === 'all'
              ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
              : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-black/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>الشامل (100 سؤال)</span>
        </button>

        {/* Sprint Mode: 20 Random */}
        <button
          onClick={() => setMode('sprint')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
            mode === 'sprint'
              ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
              : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-black/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
          title="20 سؤال عشوائي من كل الفصول لاختبار سريع"
        >
          <Zap className="w-4 h-4" />
          <span>سبرنت سريع (20)</span>
        </button>

        {/* Study & Browse Mode */}
        <button
          onClick={() => setMode('study', selectedChapter || 1)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all border ${
            mode === 'study'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
              : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-black/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-700'
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
                : 'bg-white/70 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-black/5 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Bookmark className="w-4 h-4 fill-current" />
            <span>المميزة ({bookmarks.size})</span>
          </button>
        )}

        {/* Shuffle current set */}
        <button
          onClick={shuffleQuestions}
          className="p-2 rounded-2xl bg-white/70 dark:bg-slate-800/70 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-black/5 dark:border-white/5 transition-all"
          title="ترتيب عشوائي للأسئلة الحالية"
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
