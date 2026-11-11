import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeMode } from '../../types/quiz';
import { Sun, Moon, Eye, Compass, Type } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  const themes: { id: ThemeMode; label: string; icon: React.ReactNode; bg: string }[] = [
    {
      id: 'light',
      label: 'ناصع نهاري',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      bg: 'bg-white border-slate-200 text-slate-800',
    },
    {
      id: 'dark',
      label: 'ليلي مريح',
      icon: <Moon className="w-4 h-4 text-indigo-400" />,
      bg: 'bg-slate-900 border-slate-700 text-slate-100',
    },
    {
      id: 'sepia',
      label: 'حماية العين',
      icon: <Eye className="w-4 h-4 text-amber-700" />,
      bg: 'bg-[#fbf7ee] border-[#dfd2be] text-[#3d3023]',
    },
    {
      id: 'nordic',
      label: 'أزرق هادئ',
      icon: <Compass className="w-4 h-4 text-teal-400" />,
      bg: 'bg-[#0c1524] border-[#223c61] text-[#e6f1ff]',
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Theme Options */}
      <div className="inline-flex p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-sm">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              theme === t.id
                ? 'bg-white dark:bg-slate-800 shadow-sm font-semibold scale-102 text-current'
                : 'opacity-70 hover:opacity-100 text-current'
            }`}
            title={t.label}
          >
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Font Size Selector */}
      <div className="inline-flex p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
        <button
          onClick={() => setFontSize('normal')}
          className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
            fontSize === 'normal'
              ? 'bg-white dark:bg-slate-800 shadow-sm font-bold text-current'
              : 'opacity-60 hover:opacity-100 text-current'
          }`}
          title="حجم خط عادي"
        >
          A
        </button>
        <button
          onClick={() => setFontSize('large')}
          className={`px-2 py-1 rounded-lg text-sm font-bold transition-all ${
            fontSize === 'large'
              ? 'bg-white dark:bg-slate-800 shadow-sm font-extrabold text-current'
              : 'opacity-60 hover:opacity-100 text-current'
          }`}
          title="حجم خط كبير"
        >
          A+
        </button>
        <button
          onClick={() => setFontSize('huge')}
          className={`px-2 py-1 rounded-lg text-base font-extrabold transition-all ${
            fontSize === 'huge'
              ? 'bg-white dark:bg-slate-800 shadow-sm font-black text-current'
              : 'opacity-60 hover:opacity-100 text-current'
          }`}
          title="حجم خط ضخم مريح جداً"
        >
          A++
        </button>
      </div>
    </div>
  );
};
