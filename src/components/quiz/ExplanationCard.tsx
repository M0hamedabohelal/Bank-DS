import React from 'react';
import { Question } from '../../types/quiz';
import { CheckCircle2, HelpCircle, BookOpen, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ExplanationCardProps {
  question: Question;
}

export const ExplanationCard: React.FC<ExplanationCardProps> = ({ question }) => {
  const { fontSize } = useTheme();

  const titleSizeClass =
    fontSize === 'huge'
      ? 'text-lg sm:text-xl'
      : fontSize === 'large'
      ? 'text-base sm:text-lg'
      : 'text-sm sm:text-base';

  const bodySizeClass =
    fontSize === 'huge'
      ? 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'large'
      ? 'text-sm sm:text-base leading-relaxed'
      : 'text-xs sm:text-sm leading-relaxed';

  return (
    <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-sky-500/5 to-transparent border border-emerald-500/20 dark:border-emerald-500/30 p-5 sm:p-6 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Header Banner */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-emerald-500/15 dark:border-emerald-500/20">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
          <CheckCircle2 className="w-5 h-5" />
          <span className={titleSizeClass}>
            الإجابة الصحيحة: {question.correctAnswer} — {question.options[question.correctAnswer]}
          </span>
        </div>
      </div>

      {/* English Reason / Why */}
      {question.why && (
        <div className="mt-4 flex items-start gap-3 p-3.5 rounded-xl bg-white/60 dark:bg-slate-800/60 border border-black/5 dark:border-white/5">
          <div className="p-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-english mb-1">
              Why / Textbook Reference:
            </div>
            <p className={`font-english text-slate-700 dark:text-slate-300 ${bodySizeClass}`}>
              {question.why}
            </p>
          </div>
        </div>
      )}

      {/* Arabic Explanation */}
      {question.explanationAr && (
        <div className="mt-3.5 flex items-start gap-3 p-3.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/20 border border-emerald-500/20">
          <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 mt-0.5">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">
              الشرح والتوضيح بالعربي:
            </div>
            <p className={`text-slate-800 dark:text-emerald-100 font-medium ${bodySizeClass}`}>
              {question.explanationAr}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
