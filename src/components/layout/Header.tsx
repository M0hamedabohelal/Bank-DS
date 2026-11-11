import React, { useState } from 'react';
import { useQuiz } from '../../context/QuizContext';
import { ThemeSelector } from '../common/ThemeSelector';
import { MobileSettingsModal } from '../common/MobileSettingsModal';
import {
  Volume2,
  VolumeX,
  Lightbulb,
  Grid,
  CheckCircle2,
  RotateCcw,
  Check,
  Zap,
  SlidersHorizontal,
} from 'lucide-react';

interface HeaderProps {
  onToggleDrawer: () => void;
  isDrawerOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleDrawer, isDrawerOpen }) => {
  const {
    questions,
    currentIndex,
    instantFeedback,
    setInstantFeedback,
    autoNext,
    setAutoNext,
    soundEnabled,
    setSoundEnabled,
    score,
    mode,
    resetQuiz,
  } = useQuiz();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [resetHeaderToast, setResetHeaderToast] = useState(false);

  const handleHeaderReset = () => {
    resetQuiz();
    setResetHeaderToast(true);
    setTimeout(() => setResetHeaderToast(false), 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-30 border-b theme-border backdrop-blur-md theme-surface transition-colors">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Right side: Brand / Logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/20 font-bold text-sm sm:text-base shrink-0">
              DS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-xs sm:text-base font-bold tracking-tight theme-text-primary whitespace-nowrap">
                  CS314 Data Science
                </h1>
                <span className="hidden sm:inline-flex text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                  100 سؤال
                </span>
              </div>
              <p className="text-[10px] theme-text-muted hidden md:block">
                بنك الأسئلة والشروحات العربية التفاعلية
              </p>
            </div>
          </div>

          {/* Center on Mobile: Sleek Question Counter */}
          <div className="flex sm:hidden items-center gap-1 px-2.5 py-1 rounded-xl theme-muted-box border text-[11px] font-bold font-english text-sky-500">
            <span>Q</span>
            <span>{currentIndex + 1}</span>
            <span className="opacity-40">/</span>
            <span>{questions.length}</span>
          </div>

          {/* Desktop Live Quiz Stats */}
          {mode !== 'study' && (
            <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 rounded-2xl theme-muted-box border text-xs font-medium">
              <div className="flex items-center gap-1.5 theme-text-secondary">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span>المجاب:</span>
                <span className="font-bold font-english theme-text-primary">
                  {score.answered} / {questions.length}
                </span>
              </div>
              <div className="w-px h-4 theme-border bg-current opacity-20"></div>
              <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>صحيح:</span>
                <span className="font-bold font-english">{score.correct}</span>
              </div>
              {score.answered > 0 && (
                <>
                  <div className="w-px h-4 theme-border bg-current opacity-20"></div>
                  <div className="flex items-center gap-1 text-sky-600 dark:text-sky-400">
                    <span>النسبة:</span>
                    <span className="font-bold font-english">{score.percentage}%</span>
                  </div>
                  <div className="w-px h-4 theme-border bg-current opacity-20"></div>
                  <button
                    onClick={handleHeaderReset}
                    className="flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-600 hover:underline transition-all"
                    title="تصفير الإجابات"
                  >
                    {resetHeaderToast ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-500 font-bold">تم التصفير</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>تصفير</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          {/* Left Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Desktop Theme & Font Size Selector (Hidden on Mobile) */}
            <div className="hidden lg:block">
              <ThemeSelector />
            </div>

            {/* Mobile / Tablet Settings Button (Opens Bottom Sheet) */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold theme-muted-box border hover:opacity-100 opacity-90 transition-all"
              title="تخصيص الثيم وحجم الخط والإعدادات"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-[11px] font-medium hidden xs:inline">الإعدادات</span>
            </button>

            {/* Desktop Quick Toggles (AutoNext, Sound, Instant Feedback) */}
            <div className="hidden md:flex items-center gap-1.5">
              {mode !== 'study' && (
                <button
                  onClick={() => setAutoNext(!autoNext)}
                  className={`p-1.5 sm:p-2 rounded-xl transition-all border flex items-center gap-1 text-xs font-semibold ${
                    autoNext
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/40'
                      : 'theme-muted-box border opacity-60 hover:opacity-100'
                  }`}
                  title={autoNext ? 'النقل التلقائي مفعل' : 'تفعيل النقل التلقائي'}
                >
                  <Zap className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${autoNext ? 'fill-current' : ''}`} />
                </button>
              )}

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-1.5 sm:p-2 rounded-xl transition-all border ${
                  soundEnabled
                    ? 'bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30'
                    : 'theme-muted-box border opacity-60 hover:opacity-100'
                }`}
                title={soundEnabled ? 'كتم الصوت' : 'تشغيل الصوت'}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>

              {mode !== 'study' && (
                <button
                  onClick={() => setInstantFeedback(!instantFeedback)}
                  className={`p-1.5 sm:p-2 rounded-xl transition-all border flex items-center gap-1 text-xs font-semibold ${
                    instantFeedback
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                      : 'theme-muted-box border opacity-60 hover:opacity-100'
                  }`}
                  title={instantFeedback ? 'الشرح الفوري مفعل' : 'تفعيل الشرح الفوري'}
                >
                  <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              )}
            </div>

            {/* Questions Grid Drawer Button */}
            <button
              onClick={onToggleDrawer}
              className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-semibold border transition-all ${
                isDrawerOpen
                  ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
                  : 'theme-muted-box border hover:opacity-100 opacity-80'
              }`}
              title="فهرس الأسئلة والتنقل السريع"
            >
              <Grid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline text-[11px] sm:text-xs">فهرس</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-black/10 dark:bg-white/10 font-english">
                {questions.length}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Settings Bottom Sheet */}
      <MobileSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};
