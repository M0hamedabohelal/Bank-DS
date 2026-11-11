import React, { useState, useMemo } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { allQuestions } from '../../data/questions';
import { CHAPTERS } from '../../data/chapters';
import { Search, Bookmark, CheckCircle2, BookOpen, Sparkles, Terminal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import type { ChoiceKey } from '../../types/quiz';

export const StudyBrowseView: React.FC = () => {
  const { bookmarks, toggleBookmark, toggleStudyMode } = useQuiz();
  const { fontSize } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeChapterFilter, setActiveChapterFilter] = useState<number | 'all'>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      if (activeChapterFilter !== 'all' && q.chapter !== activeChapterFilter) {
        return false;
      }
      if (onlyBookmarked && !bookmarks.has(q.id)) {
        return false;
      }
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

  const optionKeys: ChoiceKey[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full space-y-6">
      {/* Return to Quiz Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/25">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold theme-text-primary">
              وضع المراجعة والشرح المستقل (جميع الأسئلة والحلول مع الشرح)
            </h3>
            <p className="text-[11px] theme-text-muted">
              يمكنك قراءة الأسئلة وحلولها والشروحات كاملة أو تصفية الفصول بحرية
            </p>
          </div>
        </div>
        <button
          onClick={toggleStudyMode}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all shrink-0 cursor-pointer"
          title="العودة لوضع الكويز والتفاعل"
        >
          <span>العودة إلى وضع الكويز ↩</span>
        </button>
      </div>

      {/* Search & Filter Header */}
      <div className="theme-card p-4 sm:p-5 rounded-3xl border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="ابحث في نصوص الأسئلة، الخيارات، أو الشروحات بالعربي..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-10 pl-4 py-2.5 rounded-2xl theme-muted-box border text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 theme-text-primary placeholder:opacity-50"
            />
          </div>

          {/* Bookmarks toggle */}
          <button
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all shrink-0 ${
              onlyBookmarked
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                : 'theme-muted-box border hover:opacity-100 opacity-80'
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
            className={`px-3 py-1.5 rounded-xl font-medium transition-all border ${
              activeChapterFilter === 'all'
                ? 'bg-sky-500 text-white font-bold border-sky-600 shadow-sm'
                : 'theme-muted-box border hover:opacity-100 opacity-70'
            }`}
          >
            كل الفصول (100)
          </button>
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChapterFilter(ch.number)}
              className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-all border ${
                activeChapterFilter === ch.number
                  ? 'bg-sky-500 text-white font-bold border-sky-600 shadow-sm'
                  : 'theme-muted-box border hover:opacity-100 opacity-70'
              }`}
            >
              الفصل {ch.number} ({ch.questionCount})
            </button>
          ))}
        </div>

        <div className="text-xs theme-text-muted flex items-center justify-between">
          <span>
            عرض <strong className="text-sky-500 font-english">{filteredQuestions.length}</strong> من أصل 100 سؤال
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sky-500 hover:underline"
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
              className="theme-card rounded-3xl p-5 sm:p-7 border shadow-xs transition-all hover:border-sky-500/40"
            >
              {/* Question Header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b theme-border">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-500/15 text-sky-500 flex items-center justify-center font-bold text-xs font-english border border-sky-500/20">
                    {q.id}
                  </span>
                  <span className="text-xs font-semibold theme-text-secondary">
                    الفصل {q.chapter} • سؤال {q.questionNumber}
                  </span>
                </div>
                <button
                  onClick={() => toggleBookmark(q.id)}
                  className={`p-1.5 rounded-lg transition-all ${
                    isBookmarked
                      ? 'text-amber-500 bg-amber-500/15'
                      : 'theme-text-muted hover:theme-text-primary'
                  }`}
                  title={isBookmarked ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Context Note (if any) */}
              {q.contextNote && (
                <div className="mt-3 p-3 rounded-xl theme-muted-box border text-xs font-code flex items-start gap-2">
                  <Terminal className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{q.contextNote}</span>
                </div>
              )}

              {/* Question Text */}
              <div className="my-4" dir="ltr">
                <p className={`font-english font-semibold theme-text-primary ${questionSizeClass}`}>
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
                          ? 'bg-emerald-500/15 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-semibold'
                          : 'theme-option border'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs ${
                            isCorrect
                              ? 'bg-emerald-500 text-white'
                              : 'theme-muted-box border'
                          }`}
                        >
                          {key}
                        </span>
                        <span>{q.options[key]}</span>
                      </div>
                      {isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanations */}
              <div className="mt-4 pt-4 border-t theme-border space-y-2">
                {q.why && (
                  <div className="flex items-start gap-2 text-xs font-english p-2.5 rounded-xl theme-muted-box border">
                    <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-sky-500">Why: </strong>
                      <span className="theme-text-secondary">{q.why}</span>
                    </div>
                  </div>
                )}
                {q.explanationAr && (
                  <div className="flex items-start gap-2 text-xs sm:text-sm p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/25">
                    <BookOpen className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-600 dark:text-emerald-400 block mb-0.5">
                        الشرح بالعربي:
                      </strong>
                      <span className="leading-relaxed theme-text-primary">{q.explanationAr}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="p-12 text-center rounded-3xl theme-card border">
            <p className="text-sm font-semibold theme-text-muted">
              لم يتم العثور على أي سؤال مطابق لخيارات البحث المحددة.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
