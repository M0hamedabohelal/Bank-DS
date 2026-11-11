import React from 'react';
import { useQuiz } from '../../context/QuizContext';
import { X, Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

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

  const handleTriggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold">
            <Award className="w-5 h-5" />
            <span>تقرير الأداء والنتيجة</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Big Score Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-500/10 via-indigo-500/10 to-transparent border border-sky-500/20 text-center space-y-3">
            <div className="inline-flex p-3 rounded-2xl bg-sky-500/20 text-sky-600 dark:text-sky-300">
              <Award className="w-8 h-8" />
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold font-english text-slate-900 dark:text-white">
              {score.percentage}%
            </div>
            <p className={`font-bold text-sm ${gradeInfo.color}`}>
              {gradeInfo.grade} — {gradeInfo.text}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-black/5 dark:border-white/5 text-center">
              <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-black/5 dark:border-white/5">
                <div className="text-xs text-slate-500 dark:text-slate-400">إجمالي المجاب</div>
                <div className="text-lg font-bold font-english text-slate-900 dark:text-white">
                  {score.answered} / {questions.length}
                </div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                <div className="text-xs">إجابات صحيحة</div>
                <div className="text-lg font-bold font-english">{score.correct}</div>
              </div>
              <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
                <div className="text-xs">إجابات خاطئة</div>
                <div className="text-lg font-bold font-english">{score.incorrect}</div>
              </div>
            </div>
          </div>

          {/* List of Incorrect Questions for instant review */}
          {wrongQuestions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>الأسئلة التي تحتاج مراجعة ({wrongQuestions.length}):</span>
                <span className="text-xs font-normal text-slate-500">اضغط للمعاينة الفورية</span>
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
                    className="w-full text-left p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-black/5 dark:border-white/5 flex items-center justify-between gap-3 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold flex items-center justify-center font-english">
                        ✕
                      </span>
                      <span className="font-english font-medium text-slate-800 dark:text-slate-200 truncate max-w-xs">
                        Q{q.id}: {q.questionText}
                      </span>
                    </div>
                    <span className="text-[11px] font-english font-semibold text-sky-600 dark:text-sky-400">
                      الصحيح: {q.correctAnswer}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-black/10 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleRetake}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-black/10 dark:border-white/10 transition-all cursor-pointer"
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
