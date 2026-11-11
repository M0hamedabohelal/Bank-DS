import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { X, Check, Bookmark, AlertCircle, HelpCircle } from 'lucide-react';

interface QuestionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuestionDrawer: React.FC<QuestionDrawerProps> = ({ isOpen, onClose }) => {
  const {
    questions,
    currentIndex,
    goToQuestion,
    answers,
    bookmarks,
    instantFeedback,
    isExamSubmitted,
  } = useQuiz();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer content */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-r border-black/10 dark:border-white/10 z-10 animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              فهرس الأسئلة والتنقل السريع
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              إجمالي {questions.length} سؤال متاح
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 border-b border-black/5 dark:border-white/5 text-[11px]">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span>صحيحة</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span>خاطئة</span>
          </div>
          <div className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 font-medium">
            <span className="w-3 h-3 rounded-full bg-sky-500"></span>
            <span>أجيب عنها</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
            <span>مميزة ⭐</span>
          </div>
        </div>

        {/* Question Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-5 gap-2.5">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const hasAnswered = q.id in answers;
              const isCorrect = answers[q.id] === q.correctAnswer;
              const isBookmarked = bookmarks.has(q.id);

              let buttonStyle = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-black/5 dark:border-white/5 hover:border-sky-400';

              if (hasAnswered) {
                if (instantFeedback || isExamSubmitted) {
                  buttonStyle = isCorrect
                    ? 'bg-emerald-500 text-white font-bold border-emerald-600 shadow-sm'
                    : 'bg-rose-500 text-white font-bold border-rose-600 shadow-sm';
                } else {
                  buttonStyle = 'bg-sky-500 text-white font-bold border-sky-600 shadow-sm';
                }
              }

              if (isCurrent) {
                buttonStyle += ' ring-2 ring-sky-500 ring-offset-2 dark:ring-offset-slate-900';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    goToQuestion(idx);
                    onClose();
                  }}
                  className={`relative flex flex-col items-center justify-center h-12 rounded-xl text-sm transition-all border ${buttonStyle}`}
                >
                  <span className="font-english font-semibold">{q.id}</span>
                  {isBookmarked && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center text-[8px] font-bold">
                      ★
                    </span>
                  )}
                  {hasAnswered && (instantFeedback || isExamSubmitted) && (
                    <span className="text-[10px] opacity-90">
                      {isCorrect ? '✓' : '✕'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>يمكنك الضغط على أي رقم للانتقال له مباشرة</span>
        </div>
      </div>
    </div>
  );
};
