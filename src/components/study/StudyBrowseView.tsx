import React, { useState, useMemo } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { allQuestions } from '../../data/questions';
import { CHAPTERS } from '../../data/chapters';
import { Search, Bookmark, CheckCircle2, BookOpen, Sparkles, Filter, Terminal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ChoiceKey } from '../../types/quiz';

export const StudyBrowseView: React.FC = () => {
  const { bookmarks, toggleBookmark, selectedChapter } = useQuiz();
  const { fontSize } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeChapterFilter, setActiveChapterFilter] = useState<number | 'all'>(
    selectedChapter || 'all'
  );
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      // Chapter filter
      if (activeChapterFilter !== 'all' && q.chapter !== activeChapterFilter) {
        return false;
      }
      // Bookmarked filter
      if (onlyBookmarked && !bookmarks.has(q.id)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inQuestion = q.questionText.toLowerCase().includes(query);
        const inArabic = q.explanationAr.toLowerCase().includes(query);
        const inWhy = q.why.toLowerCase().includes(query);
        const inOptions = Object.values(q.options).some((opt) =>
          opt.toLowerCase().includes(query)
        );
        return inQuestion || inArabic || inWhy || inOptions;
      }
      return true;
    });
  }, [activeChapterFilter, onlyBookmarked, searchQuery, bookmarks]);

  const questionSizeClass =
    fontSize === 'huge'
      ? 'text-lg sm:text-xl'
      : fontSize === 'large'
      ? 'text-base sm:text-lg'
      : 'text-sm sm:text-base';

  const bodySizeClass =
    fontSize === 'huge'
      ? 'text-base leading-relaxed'
      : fontSize === 'large'
      ? 'text-sm leading-relaxed'
      : 'text-xs sm:text-sm leading-relaxed';

  const optionKeys: ChoiceKey[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-black/8 dark:border-white/8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث في نصوص الأسئلة، الخيارات، أو الشروحات بالعربي..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-black/8 dark:border-white/8 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-800 dark:text-slate-100 placeholder-slate-400"
            />
          </div>

          {/* Bookmarks toggle */}
          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all shrink-0 ${
              onlyBookmarked
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-black/8 dark:border-white/8 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${onlyBookmarked ? 'fill-current' : ''}`} />
            <span>المميزة فقط ({bookmarks.size})</span>
          </button>
        </div>

        {/* Chapter filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
          <button
            onClick={() => setActiveChapterFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
              activeChapterFilter === 'all'
                ? 'bg-sky-500 text-white font-bold shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            كل الفصول (100)
          </button>
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapterFilter(ch.number)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                activeChapterFilter === ch.number
                  ? 'bg-sky-500 text-white font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              الفصل {ch.number} ({ch.questionCount})
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
          <span>
            عرض <strong className="text-sky-600 dark:text-sky-400 font-english">{filteredQuestions.length}</strong> من أصل 100 سؤال
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sky-600 dark:text-sky-400 hover:underline"
            >
              مسح البحث
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q) => {
          const isBookmarked = bookmarks.has(q.id);

          return (
            <div
              key={q.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-black/8 dark:border-white/8 shadow-xs transition-all hover:border-sky-500/30"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-black/5 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs font-english">
                    {q.id}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    الفصل {q.chapter} • سؤال {q.questionNumber}
                  </span>
                </div>
                <button
                  onClick={() => toggleBookmark(q.id)}
                  className={`p-1.5 rounded-lg transition-all ${
                    isBookmarked
                      ? 'text-amber-500 bg-amber-500/10'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                  title={isBookmarked ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Context Note (if any) */}
              {q.contextNote && (
                <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-black/5 dark:border-white/5 text-xs font-code text-slate-600 dark:text-slate-300 flex items-start gap-2">
                  <Terminal className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{q.contextNote}</span>
                </div>
              )}

              {/* Question Text */}
              <div className="my-4" dir="ltr">
                <p className={`font-english font-semibold text-slate-900 dark:text-white ${questionSizeClass}`}>
                  {q.questionText}
                </p>
              </div>

              {/* Options with marked correct answer */}
              <div className="space-y-2" dir="ltr">
                {optionKeys.map((key) => {
                  const isCorrect = q.correctAnswer === key;
                  return (
                    <div
                      key={key}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-english ${
                        isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-950 dark:text-emerald-200 font-semibold'
                          : 'bg-slate-50/70 dark:bg-slate-800/40 border-black/5 dark:border-white/5 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs ${
                            isCorrect
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {key}
                        </span>
                        <span>{q.options[key]}</span>
                      </div>
                      {isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanations */}
              <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 space-y-2">
                {q.why && (
                  <div className="flex items-start gap-2 text-xs font-english text-slate-600 dark:text-slate-300 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sky-600 dark:text-sky-400">Why: </strong>
                      {q.why}
                    </div>
                  </div>
                )}
                {q.explanationAr && (
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/15">
                    <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">
                        الشرح بالعربي:
                      </strong>
                      <span className="leading-relaxed">{q.explanationAr}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-black/8 dark:border-white/8">
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              لم يتم العثور على أي سؤال مطابق لخيارات البحث المحددة.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
