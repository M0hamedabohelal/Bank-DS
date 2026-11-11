import React, { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ChevronRight, ChevronLeft, Award, RotateCcw, Check, Zap } from 'lucide-react';

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
    autoNext,
    setAutoNext,
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
    <div className="w-full mt-4 sm:mt-6 space-y-3 sm:space-y-4">
      {/* Progress Bar */}
      <div className="w-full theme-muted-box border h-2 sm:h-2.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-500 to-indigo-600 h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Buttons Bar */}
      <div className="w-full theme-card p-3 sm:p-4 rounded-2xl sm:rounded-3xl border shadow-sm flex flex-col gap-3">
        {/* Top Mini Actions Row */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b theme-border pb-2.5">
          {/* Question Indicator */}
          <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl theme-muted-box border text-xs font-semibold theme-text-secondary flex items-center gap-1">
            <span>سؤال</span>
            <span className="font-english font-bold text-sky-500">{currentIndex + 1}</span>
            <span>من</span>
            <span className="font-english font-bold">{questions.length}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Auto Next Toggle */}
            <button
              onClick={() => setAutoNext(!autoNext)}
              className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                autoNext
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : 'theme-muted-box border opacity-60 hover:opacity-100'
              }`}
              title="عند تفعيله: الانتقال التلقائي للسؤال التالي فور اختيار الإجابة الصحيحة"
            >
              <Zap className={`w-3.5 h-3.5 ${autoNext ? 'fill-current' : ''}`} />
              <span className="text-[11px] sm:text-xs">
                نقل تلقائي {autoNext ? '⚡' : ''}
              </span>
            </button>

            {/* Dedicated Reset Quiz Button with full zeroing */}
            <button
              onClick={handleReset}
              className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-xs font-bold transition-all border ${
                justReset
                  ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                  : 'theme-muted-box border hover:bg-rose-500/15 hover:text-rose-500 hover:border-rose-500/30'
              }`}
              title="تصفير كافة الإجابات والبدء من السؤال الأول"
            >
              {justReset ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="text-[11px] sm:text-xs">تم التصفير!</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-3.5 h-3.5 text-rose-500" />
                  <span className="text-[11px] sm:text-xs">تصفير الإجابات</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Bottom Row */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Previous Button */}
          <button
            onClick={prevQuestion}
            disabled={isFirst}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              isFirst
                ? 'opacity-30 cursor-not-allowed theme-muted-box border-transparent'
                : 'theme-muted-box border hover:opacity-100 opacity-80'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>السابق</span>
          </button>

          {/* Submit / Results Button (if applicable) */}
          {(allAnswered || score.answered >= 5 || isLast) && (
            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm hover:from-emerald-600 hover:to-teal-700 transition-all cursor-pointer shrink-0"
            >
              <Award className="w-4 h-4" />
              <span className="hidden xs:inline">
                {isExamSubmitted ? 'عرض النتيجة' : 'إنهاء وحساب النتيجة'}
              </span>
              <span className="xs:hidden">النتيجة</span>
            </button>
          )}

          {/* Next Button */}
          <button
            onClick={nextQuestion}
            disabled={isLast}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
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
    </div>
  );
};
