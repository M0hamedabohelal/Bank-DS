import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { X, Award, RotateCcw, ArrowRight } from 'lucide-react';

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({ isOpen, onClose }) => {
  const { questions, answers, score, resetQuiz, goToQuestion } = useQuiz();

  if (!isOpen) return null;

  const getGradeInfo = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', text: 'ممتاز جداً! إتقان رائع للمنهج 🎉', color: 'text-emerald-500' };
    if (percentage >= 80) return { grade: 'A', text: 'ممتاز! فهم عميق للمفاهيم 👏', color: 'text-sky-500' };
    if (percentage >= 70) return { grade: 'B', text: 'جيد جداً! راجع الأسئلة الخاطئة للوصول للدرجة الكاملة 👍', color: 'text-indigo-500' };
    if (percentage >= 60) return { grade: 'C', text: 'مقبول، تحتاج لمزيد من المراجعة والتركيز 📚', color: 'text-amber-500' };
    return { grade: 'F', text: 'ينصح بقراءة شروحات الأسئلة في وضع المراجعة وإعادة المحاولة 💡', color: 'text-rose-500' };
  };

  const gradeInfo = getGradeInfo(score.percentage);

  // Find incorrect questions
  const wrongQuestions = questions.filter(
    (q) => q.id in answers && answers[q.id] !== q.correctAnswer
  );

  const handleRetake = () => {
    resetQuiz();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl theme-card rounded-3xl shadow-2xl border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b theme-border flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-500 font-bold">
            <Award className="w-5 h-5" />
            <span>تقرير الأداء والنتيجة</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl theme-muted-box border hover:opacity-100 opacity-60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Big Score Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-transparent border border-sky-500/20 text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-sky-500/20 text-sky-500">
              <Award className="w-8 h-8" />
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-english theme-text-primary">
              {score.percentage}%
            </div>
            <p className={`font-bold text-sm ${gradeInfo.color}`}>
              {gradeInfo.grade} — {gradeInfo.text}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t theme-border text-center">
              <div className="p-2 rounded-xl theme-muted-box border">
                <div className="text-xs theme-text-muted">إجمالي المجاب</div>
                <div className="text-lg font-bold font-english theme-text-primary">
                  {score.answered} / {questions.length}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300">
                <div className="text-xs font-semibold">إجابات صحيحة</div>
                <div className="text-lg font-bold font-english">{score.correct}</div>
              </div>
              <div className="p-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-600 dark:text-rose-300">
                <div className="text-xs font-semibold">إجابات خاطئة</div>
                <div className="text-lg font-bold font-english">{score.incorrect}</div>
              </div>
            </div>
          </div>

          {/* List of Incorrect Questions for instant review */}
          {wrongQuestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold theme-text-primary flex items-center justify-between">
                <span>الأسئلة التي تحتاج مراجعة ({wrongQuestions.length}):</span>
                <span className="text-xs font-normal theme-text-muted">اضغط للمعاينة الفورية</span>
              </h3>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {wrongQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      const idx = questions.findIndex((item) => item.id === q.id);
                      if (idx !== -1) goToQuestion(idx);
                      onClose();
                    }}
                    className="w-full text-left p-3 rounded-xl theme-muted-box hover:opacity-100 opacity-90 border flex items-center justify-between gap-3 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center font-english">
                        ✕
                      </span>
                      <span className="font-english font-medium theme-text-primary truncate max-w-xs">
                        Q{q.id}: {q.questionText}
                      </span>
                    </div>
                    <span className="text-[11px] font-english font-semibold text-sky-500">
                      الصحيح: {q.correctAnswer}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t theme-border theme-surface flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleRetake}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold theme-muted-box border hover:opacity-100 opacity-80 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة الاختبار من البداية</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white shadow-sm transition-all cursor-pointer"
          >
            <span>متابعة المراجعة</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
