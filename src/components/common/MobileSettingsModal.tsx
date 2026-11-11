import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useQuiz } from '../../context/QuizContext';
import type { ThemeMode } from '../../types/quiz';
import { X, Sun, Moon, Eye, Compass, Volume2, VolumeX, Zap, Lightbulb, RotateCcw, Check } from 'lucide-react';

interface MobileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileSettingsModal: React.FC<MobileSettingsModalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();
  const {
    soundEnabled,
    setSoundEnabled,
    instantFeedback,
    setInstantFeedback,
    autoNext,
    setAutoNext,
    resetQuiz,
  } = useQuiz();

  const [resetDone, setResetDone] = React.useState(false);

  if (!isOpen) return null;

  const themes: {
    id: ThemeMode;
    label: string;
    subtext: string;
    icon: React.ReactNode;
    color: string;
    previewBg: string;
    previewBorder: string;
  }[] = [
    {
      id: 'light',
      label: 'ناصع نهاري',
      subtext: 'أبيض كلاسيكي متباين',
      icon: <Sun className="w-5 h-5 text-amber-500" />,
      color: 'border-amber-400 bg-amber-500/10',
      previewBg: 'bg-white',
      previewBorder: 'border-slate-200',
    },
    {
      id: 'dark',
      label: 'ليلي مريح',
      subtext: 'رمادي داكن لمنع الإجهاد',
      icon: <Moon className="w-5 h-5 text-indigo-400" />,
      color: 'border-indigo-500 bg-indigo-500/10',
      previewBg: 'bg-slate-900',
      previewBorder: 'border-slate-700',
    },
    {
      id: 'sepia',
      label: 'حماية العين',
      subtext: 'ورقي دافئ بدون ضوء أزرق',
      icon: <Eye className="w-5 h-5 text-amber-700 dark:text-amber-300" />,
      color: 'border-amber-600 bg-amber-600/10',
      previewBg: 'bg-[#fbf7ee]',
      previewBorder: 'border-[#dfd2be]',
    },
    {
      id: 'nordic',
      label: 'أزرق هادئ',
      subtext: 'كحلي إسكندنافي وتيل',
      icon: <Compass className="w-5 h-5 text-teal-400" />,
      color: 'border-teal-400 bg-teal-400/10',
      previewBg: 'bg-[#0c1524]',
      previewBorder: 'border-[#223c61]',
    },
  ];

  const handleReset = () => {
    resetQuiz();
    setResetDone(true);
    setTimeout(() => {
      setResetDone(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200 p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Sheet Content */}
      <div className="relative w-full max-w-lg theme-card rounded-t-3xl sm:rounded-3xl shadow-2xl border-t sm:border theme-border z-10 flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-250">
        {/* Handle bar on mobile */}
        <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700 mx-auto mt-3 sm:hidden" />

        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b theme-border">
          <h2 className="text-base font-bold theme-text-primary">إعدادات العرض وتخصيص الكويز</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl theme-muted-box border hover:opacity-100 opacity-60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Theme Grid */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold theme-text-secondary block">
              اختر مظهر وثيم الشاشة:
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {themes.map((t) => {
                const isSelected = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`p-3 rounded-2xl border text-right transition-all flex flex-col gap-1.5 ${
                      isSelected
                        ? 'ring-2 ring-sky-500 border-sky-500 theme-card shadow-sm font-bold'
                        : 'theme-muted-box border hover:opacity-100 opacity-70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {t.icon}
                        <span className="text-xs font-bold">{t.label}</span>
                      </div>
                      <span className={`w-3.5 h-3.5 rounded-full border ${t.previewBg} ${t.previewBorder}`} />
                    </div>
                    <span className="text-[10px] theme-text-muted leading-tight">
                      {t.subtext}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Font Size Adjuster */}
          <div className="space-y-2">
            <label className="text-xs font-bold theme-text-secondary block">
              حجم الخط المناسب للقراءة:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFontSize('normal')}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                  fontSize === 'normal'
                    ? 'bg-sky-500 text-white border-sky-600 font-bold shadow-xs'
                    : 'theme-muted-box border opacity-70'
                }`}
              >
                عادي (A)
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`py-2 rounded-xl text-sm font-bold border transition-all ${
                  fontSize === 'large'
                    ? 'bg-sky-500 text-white border-sky-600 font-extrabold shadow-xs'
                    : 'theme-muted-box border opacity-70'
                }`}
              >
                كبير (A+)
              </button>
              <button
                onClick={() => setFontSize('huge')}
                className={`py-2 rounded-xl text-base font-black border transition-all ${
                  fontSize === 'huge'
                    ? 'bg-sky-500 text-white border-sky-600 font-black shadow-xs'
                    : 'theme-muted-box border opacity-70'
                }`}
              >
                ضخم (A++)
              </button>
            </div>
          </div>

          {/* Toggles List */}
          <div className="space-y-2 pt-2 border-t theme-border">
            {/* Auto Next */}
            <button
              onClick={() => setAutoNext(!autoNext)}
              className="w-full flex items-center justify-between p-3 rounded-2xl theme-muted-box border transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-xl ${autoNext ? 'bg-emerald-500/20 text-emerald-500' : 'theme-card text-slate-400'}`}>
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold theme-text-primary">الانتقال التلقائي عند الصح</div>
                  <div className="text-[10px] theme-text-muted">ينتقل للسؤال التالي فور اختيار الإجابة الصحيحة</div>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${autoNext ? 'bg-emerald-500 text-white' : 'theme-card border opacity-60'}`}>
                {autoNext ? 'مفعل ⚡' : 'معطل'}
              </span>
            </button>

            {/* Instant Feedback */}
            <button
              onClick={() => setInstantFeedback(!instantFeedback)}
              className="w-full flex items-center justify-between p-3 rounded-2xl theme-muted-box border transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-xl ${instantFeedback ? 'bg-amber-500/20 text-amber-500' : 'theme-card text-slate-400'}`}>
                  <Lightbulb className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold theme-text-primary">الشرح والسبب الفوري</div>
                  <div className="text-[10px] theme-text-muted">عرض الإجابة الصحيحة والشرح فور النقر</div>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${instantFeedback ? 'bg-amber-500 text-white' : 'theme-card border opacity-60'}`}>
                {instantFeedback ? 'مفعل' : 'معطل'}
              </span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="w-full flex items-center justify-between p-3 rounded-2xl theme-muted-box border transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-xl ${soundEnabled ? 'bg-sky-500/20 text-sky-500' : 'theme-card text-slate-400'}`}>
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold theme-text-primary">المؤثرات الصوتية التفاعلية</div>
                  <div className="text-[10px] theme-text-muted">أصوات هادئة مريحة عند الإجابة الصحيحة أو الخطأ</div>
                </div>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${soundEnabled ? 'bg-sky-500 text-white' : 'theme-card border opacity-60'}`}>
                {soundEnabled ? 'صوت مفعل' : 'مكتوم'}
              </span>
            </button>
          </div>

          {/* Reset Quiz Section */}
          <div className="pt-2 border-t theme-border">
            <button
              onClick={handleReset}
              className={`w-full py-2.5 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all border ${
                resetDone
                  ? 'bg-emerald-500 text-white border-emerald-600'
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
              }`}
            >
              {resetDone ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تم تصفير جميع الإجابات بنجاح!</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4" />
                  <span>تصفير وإعادة الكويز من البداية</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
