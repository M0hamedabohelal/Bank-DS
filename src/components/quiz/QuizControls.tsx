import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ChevronRight, ChevronLeft, Award, RotateCcw } from 'lucide-react';

interface QuizControlsProps {
  onShowResults: () => void;
}

export const QuizControls: React.FC<QuizControlsProps> = ({ onShowResults }) => {
  const {
    currentIndex,
    questions,
    nextQuestion,
    prevQuestion,
    answers,
    resetQuiz,
    submitExam,
    isExamSubmitted,
    score,
  } = useQuiz();

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const allAnswered = score.answered === questions.length;

  const handleSubmit = () => {
    submitExam();
    onShowResults();
  };

  return (
    <div className="w-full mt-6 space-y-4">
      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-2xl border border-black/8 dark:border-white/8 shadow-sm">
        {/* Previous Button (in RTL, previous goes to right or left: Previous in Arabic is السابق -> with right arrow in RTL) */}
        <button
          onClick={prevQuestion}
          disabled={isFirst}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
            isFirst
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent'
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border-black/5 dark:border-white/5'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          <span>السابق</span>
        </button>

        {/* Middle Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Question Indicator */}
          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
            سؤال <span className="font-english font-bold text-sky-600 dark:text-sky-400">{currentIndex + 1}</span> من{' '}
            <span className="font-english font-bold">{questions.length}</span>
          </div>

          {/* Submit / Results Button */}
          {(allAnswered || score.answered >= 5 || isLast) && (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm hover:from-emerald-600 hover:to-teal-700 transition-all cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>{isExamSubmitted ? 'عرض بطاقة النتيجة' : 'إنهاء وحساب النتيجة'}</span>
            </button>
          )}

          {/* Reset Quiz */}
          <button
            onClick={resetQuiz}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            title="إعادة تعيين الإجابات والبدء من جديد"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Next Button */}
        <button
          onClick={nextQuestion}
          disabled={isLast}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
            isLast
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-transparent'
              : 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600 shadow-sm'
          }`}
        >
          <span>التالي</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
