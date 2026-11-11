import React, { useEffect } from 'react';
import { useQuiz } from '../../context/QuizContext';
import type { ChoiceKey } from '../../types/quiz';
import { ExplanationCard } from './ExplanationCard';
import { Bookmark, Copy, Check, CheckCircle2, XCircle, Terminal } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const QuestionCard: React.FC = () => {
  const {
    currentQuestion,
    currentIndex,
    questions,
    answers,
    selectAnswer,
    bookmarks,
    toggleBookmark,
    instantFeedback,
    isExamSubmitted,
    nextQuestion,
    prevQuestion,
  } = useQuiz();

  const { fontSize } = useTheme();
  const [copied, setCopied] = React.useState(false);

  const isBookmarked = bookmarks.has(currentQuestion.id);
  const userAnswer = answers[currentQuestion.id];
  const isAnswered = userAnswer !== undefined;
  const showExplanation = (instantFeedback && isAnswered) || isExamSubmitted;

  // Keyboard navigation & shortcuts (A, B, C, D, Arrows)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        selectAnswer(currentQuestion.id, key as ChoiceKey);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextQuestion();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion.id, nextQuestion, prevQuestion, selectAnswer]);

  const handleCopy = () => {
    const text = `Question ${currentQuestion.id} (Chapter ${currentQuestion.chapter}):\n${currentQuestion.questionText}\n\nA) ${currentQuestion.options.A}\nB) ${currentQuestion.options.B}\nC) ${currentQuestion.options.C}\nD) ${currentQuestion.options.D}\n\nCorrect Answer: ${currentQuestion.correctAnswer}\nWhy: ${currentQuestion.why}\nالشرح: ${currentQuestion.explanationAr}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const questionSizeClass =
    fontSize === 'huge'
      ? 'text-base sm:text-xl md:text-2xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-sm sm:text-lg md:text-xl leading-relaxed'
      : 'text-sm sm:text-base md:text-lg leading-relaxed';

  const optionSizeClass =
    fontSize === 'huge'
      ? 'text-sm sm:text-base md:text-lg leading-snug'
      : fontSize === 'large'
      ? 'text-xs sm:text-sm md:text-base leading-snug'
      : 'text-xs sm:text-sm leading-snug';

  const optionKeys: ChoiceKey[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full theme-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-sm border transition-all">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between gap-2 pb-3.5 border-b theme-border">
        {/* Chapter Title Badge */}
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="px-2.5 py-1 rounded-xl bg-sky-500/15 text-sky-700 dark:text-sky-300 font-bold text-[11px] sm:text-xs border border-sky-500/30 truncate">
            الفصل {currentQuestion.chapter}: {currentQuestion.chapterTitle}
          </span>
          <span className="text-[11px] font-english theme-text-muted hidden sm:inline">
            (#{currentQuestion.id})
          </span>
        </div>

        {/* Counter & Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="px-2 py-1 rounded-xl theme-muted-box font-bold text-[11px] font-english border">
            {currentIndex + 1} / {questions.length}
          </span>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(currentQuestion.id)}
            className={`p-1.5 rounded-xl transition-all border ${
              isBookmarked
                ? 'bg-amber-500/20 text-amber-500 border-amber-500/40 font-bold'
                : 'theme-muted-box border hover:opacity-100 opacity-70'
            }`}
            title={isBookmarked ? 'إزالة من المميزة' : 'إضافة للأسئلة المميزة للمراجعة'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Copy Question */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-xl theme-muted-box border hover:opacity-100 opacity-70 transition-all"
            title="نسخ السؤال مع الخيارات والشرح"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Chapter Context Note (e.g. NumPy / Pandas setup in Ch 2) */}
      {currentQuestion.contextNote && (
        <div className="mt-3 p-3 rounded-xl theme-muted-box border text-[11px] sm:text-xs font-code flex items-start gap-2">
          <Terminal className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-sky-600 dark:text-sky-400">Context: </span>
            {currentQuestion.contextNote}
          </div>
        </div>
      )}

      {/* Question Text */}
      <div className="my-4 sm:my-6" dir="ltr">
        <h2 className={`font-english font-semibold theme-text-primary ${questionSizeClass}`}>
          <span className="text-sky-600 dark:text-sky-400 font-bold mr-1">
            Question {currentQuestion.questionNumber}:{' '}
          </span>
          {currentQuestion.questionText}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-2.5 sm:space-y-3" dir="ltr">
        {optionKeys.map((key) => {
          const optionText = currentQuestion.options[key];
          const isSelected = userAnswer === key;
          const isCorrectAnswer = currentQuestion.correctAnswer === key;

          let optionStyle = 'theme-option border';
          let badgeStyle = 'theme-muted-box border';
          let statusIcon = null;

          if (isAnswered && (instantFeedback || isExamSubmitted)) {
            if (isCorrectAnswer) {
              optionStyle =
                'bg-emerald-500/20 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-semibold shadow-xs ring-1 ring-emerald-500/50';
              badgeStyle = 'bg-emerald-500 text-white font-bold border-emerald-600';
              statusIcon = <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0" />;
            } else if (isSelected && !isCorrectAnswer) {
              optionStyle =
                'bg-rose-500/20 border-rose-500 text-rose-950 dark:text-rose-100 font-medium shadow-xs ring-1 ring-rose-500/50';
              badgeStyle = 'bg-rose-500 text-white font-bold border-rose-600';
              statusIcon = <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 shrink-0" />;
            } else {
              optionStyle = 'opacity-40 theme-option border';
            }
          } else if (isSelected) {
            optionStyle =
              'bg-sky-500/20 border-sky-500 font-semibold ring-1 ring-sky-500 shadow-xs';
            badgeStyle = 'bg-sky-500 text-white font-bold border-sky-600';
          }

          return (
            <button
              key={key}
              onClick={() => selectAnswer(currentQuestion.id, key)}
              className={`w-full text-left p-3.5 sm:p-4 rounded-xl sm:rounded-2xl transition-all flex items-center justify-between gap-3 active:scale-[0.99] cursor-pointer ${optionStyle}`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                <span
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs font-english shrink-0 transition-transform ${badgeStyle}`}
                >
                  {key}
                </span>
                <span className={`font-english break-words ${optionSizeClass}`}>
                  {optionText}
                </span>
              </div>
              {statusIcon}
            </button>
          );
        })}
      </div>

      {/* Explanation Box (when enabled/revealed) */}
      {showExplanation && <ExplanationCard question={currentQuestion} />}
    </div>
  );
};
