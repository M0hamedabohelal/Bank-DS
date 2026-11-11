import React, { useEffect } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ChoiceKey } from '../../types/quiz';
import { ExplanationCard } from './ExplanationCard';
import { Bookmark, Copy, Check, CheckCircle2, XCircle, Terminal, HelpCircle } from 'lucide-react';
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
      // Ignore if user is in an input or textarea
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
      ? 'text-xl sm:text-2xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl leading-relaxed'
      : 'text-base sm:text-lg leading-relaxed';

  const optionSizeClass =
    fontSize === 'huge'
      ? 'text-base sm:text-lg'
      : fontSize === 'large'
      ? 'text-sm sm:text-base'
      : 'text-xs sm:text-sm';

  const optionKeys: ChoiceKey[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-8 shadow-sm border border-black/8 dark:border-white/8 transition-all">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/5 dark:border-white/5">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-300 font-bold text-xs border border-sky-500/20">
            الفصل {currentQuestion.chapter}: {currentQuestion.chapterTitle}
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-xs font-english">
            Q {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-xs text-slate-400 font-english hidden sm:inline">
            (Question #{currentQuestion.id})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(currentQuestion.id)}
            className={`p-2 rounded-xl transition-all border ${
              isBookmarked
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/30 font-bold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-200'
            }`}
            title={isBookmarked ? 'إزالة من المميزة' : 'إضافة للأسئلة المميزة للمراجعة'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>

          {/* Copy Question */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white border border-transparent transition-all"
            title="نسخ السؤال مع الخيارات والشرح"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Chapter Context Note (if present, e.g. NumPy / Pandas setup in Ch 2) */}
      {currentQuestion.contextNote && (
        <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs font-code text-slate-600 dark:text-slate-300 flex items-start gap-2.5">
          <Terminal className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold text-sky-600 dark:text-sky-400">Context: </span>
            {currentQuestion.contextNote}
          </div>
        </div>
      )}

      {/* Question Text */}
      <div className="my-6" dir="ltr">
        <h2 className={`font-english font-semibold text-slate-900 dark:text-white ${questionSizeClass}`}>
          <span className="text-sky-600 dark:text-sky-400 font-bold ml-1">
            Question {currentQuestion.questionNumber}:{' '}
          </span>
          {currentQuestion.questionText}
        </h2>
      </div>

      {/* Options List */}
      <div className="space-y-3" dir="ltr">
        {optionKeys.map((key) => {
          const optionText = currentQuestion.options[key];
          const isSelected = userAnswer === key;
          const isCorrectAnswer = currentQuestion.correctAnswer === key;

          let optionStyle =
            'bg-slate-50 dark:bg-slate-800/60 border-black/8 dark:border-white/8 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-sky-400/50';
          let badgeStyle = 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
          let statusIcon = null;

          if (isAnswered && (instantFeedback || isExamSubmitted)) {
            if (isCorrectAnswer) {
              optionStyle =
                'bg-emerald-500/15 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-medium shadow-sm';
              badgeStyle = 'bg-emerald-500 text-white font-bold';
              statusIcon = <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />;
            } else if (isSelected && !isCorrectAnswer) {
              optionStyle =
                'bg-rose-500/15 border-rose-500 text-rose-950 dark:text-rose-100 shadow-sm';
              badgeStyle = 'bg-rose-500 text-white font-bold';
              statusIcon = <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />;
            } else {
              optionStyle = 'opacity-60 bg-slate-50/50 dark:bg-slate-900/50 border-black/5 dark:border-white/5';
            }
          } else if (isSelected) {
            optionStyle = 'bg-sky-500/15 border-sky-500 text-sky-950 dark:text-sky-100 font-medium ring-1 ring-sky-500';
            badgeStyle = 'bg-sky-500 text-white font-bold';
          }

          return (
            <button
              key={key}
              onClick={() => selectAnswer(currentQuestion.id, key)}
              className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer ${optionStyle}`}
            >
              <div className="flex items-center gap-3.5 flex-1">
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs font-english shrink-0 transition-transform ${badgeStyle}`}
                >
                  {key}
                </span>
                <span className={`font-english ${optionSizeClass}`}>
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
