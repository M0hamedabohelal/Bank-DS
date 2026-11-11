import React, { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ChevronRight, ChevronLeft, Award, RotateCcw, Check } from 'lucide-react';

interface QuizControlsProps {
  onShowResults: () => void;
}

export const QuizControls: React.FC<QuizControlsProps> = ({ onShowResults }) => {
  const {
    currentIndex,
    questions,
    nextQuestion,
    prevQuestion,
    resetQuiz,
    submitExam,
    isExamSubmitted,
    score,
  } = useQuiz();

  const [justReset, setJustReset] = useState(false);

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === questions.length - 1;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);
  const allAnswered = score.answered === questions.length;

  const handleSubmit = () => {
    submitExam();
    onShowResults();
  };

  const handleReset = () => {
    resetQuiz();
    setJustReset(true);
    setTimeout(() => {
      setJustReset(false);
    }, 2000);
  };

  return (
    <div className="w-full mt-6 space-y-4">
      {/* Progress Bar */}
      <div className="w-full theme-muted-box border h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 theme-card p-3 sm:p-4 rounded-2xl border shadow-sm">
        {/* Previous Button */}
        <button
          onClick={prevQuestion}
          disabled={isFirst}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
            isFirst
              ? 'opacity-30 cursor-not-allowed theme-muted-box border-transparent'
              : 'theme-muted-box border hover:opacity-100 opacity-80'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
          <span>السابق</span>
        </button>

        {/* Middle Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Question Indicator */}
          <div className="px-3 py-2 rounded-xl theme-muted-box border text-xs font-semibold theme-text-secondary">
            سؤال <span className="font-english font-bold text-sky-500">{currentIndex + 1}</span> من{' '}
            <span className="font-english font-bold">{questions.length}</span>
          </div>

          {/* Dedicated Reset Quiz Button with full zeroing */}
          <button
            onClick={handleReset}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              justReset
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                : 'theme-muted-box border hover:bg-rose-500/15 hover:text-rose-500 hover:border-rose-500/30'
            }`}
            title="تصفير كافة الإجابات والبدء من السؤال الأول"
          >
            {justReset ? (
              <>
                <Check className="w-4 h-4" />
                <span>تم تصفير الإجابات!</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 text-rose-500" />
                <span>إعادة الكويز (تصفير)</span>
              </>
            )}
          </button>

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
        </div>

        {/* Next Button */}
        <button
          onClick={nextQuestion}
          disabled={isLast}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
            isLast
              ? 'opacity-30 cursor-not-allowed theme-muted-box border-transparent'
              : 'bg-sky-500 hover:bg-sky-600 text-white border-sky-600 shadow-sm font-bold'
          }`}
        >
          <span>التالي</span>
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
