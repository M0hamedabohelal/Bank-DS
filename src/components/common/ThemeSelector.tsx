import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import type { ThemeMode } from '../../types/quiz';
import { Sun, Moon, Eye, Compass } from 'lucide-react';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme, fontSize, setFontSize } = useTheme();

  const themes: {
    id: ThemeMode;
    label: string;
    icon: React.ReactNode;
    activeStyle: string;
    dotColor: string;
  }[] = [
    {
      id: 'light',
      label: 'ناصع نهاري',
      icon: <Sun className="w-3.5 h-3.5 text-amber-500" />,
      activeStyle: 'bg-white text-slate-900 border-amber-300 shadow-sm ring-1 ring-amber-400/40',
      dotColor: 'bg-amber-400',
    },
    {
      id: 'dark',
      label: 'ليلي مريح',
      icon: <Moon className="w-3.5 h-3.5 text-indigo-400" />,
      activeStyle: 'bg-slate-800 text-white border-indigo-500 shadow-sm ring-1 ring-indigo-400/40',
      dotColor: 'bg-indigo-400',
    },
    {
      id: 'sepia',
      label: 'حماية العين',
      icon: <Eye className="w-3.5 h-3.5 text-amber-700 dark:text-amber-300" />,
      activeStyle: 'bg-[#fefbf6] text-[#3d2b1a] border-[#b45309] shadow-sm ring-1 ring-[#b45309]/30 font-bold',
      dotColor: 'bg-amber-600',
    },
    {
      id: 'nordic',
      label: 'أزرق هادئ',
      icon: <Compass className="w-3.5 h-3.5 text-teal-400" />,
      activeStyle: 'bg-[#152442] text-teal-200 border-teal-500 shadow-sm ring-1 ring-teal-400/40 font-bold',
      dotColor: 'bg-teal-400',
    },
  ];

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {/* Themes Buttons - Compact & Elegant */}
      <div className="inline-flex items-center gap-0.5 p-0.5 sm:p-1 rounded-2xl theme-muted-box border">
        {themes.map((t) => {
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded-xl text-xs transition-all border ${
                isActive
                  ? `${t.activeStyle} font-bold shadow-xs scale-102`
                  : 'border-transparent theme-text-secondary hover:theme-text-primary hover:bg-black/5 dark:hover:bg-white/5 opacity-70 hover:opacity-100'
              }`}
              title={t.label}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${t.dotColor}`}></span>
              {t.icon}
              {isActive && (
                <span className="text-[11px] font-bold whitespace-nowrap hidden sm:inline">
                  {t.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Font Size Selector */}
      <div className="inline-flex items-center gap-0.5 p-0.5 sm:p-1 rounded-2xl theme-muted-box border">
        <button
          onClick={() => setFontSize('normal')}
          className={`px-2 py-1 rounded-lg text-xs transition-all border ${
            fontSize === 'normal'
              ? 'bg-sky-500 text-white font-bold border-sky-600 shadow-xs'
              : 'border-transparent theme-text-secondary hover:theme-text-primary hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          title="حجم خط عادي"
        >
          A
        </button>
        <button
          onClick={() => setFontSize('large')}
          className={`px-2 py-1 rounded-lg text-xs transition-all border ${
            fontSize === 'large'
              ? 'bg-sky-500 text-white font-extrabold border-sky-600 shadow-xs'
              : 'border-transparent theme-text-secondary hover:theme-text-primary hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          title="حجم خط كبير"
        >
          A+
        </button>
        <button
          onClick={() => setFontSize('huge')}
          className={`px-2 py-1 rounded-lg text-xs transition-all border ${
            fontSize === 'huge'
              ? 'bg-sky-500 text-white font-black border-sky-600 shadow-xs'
              : 'border-transparent theme-text-secondary hover:theme-text-primary hover:bg-black/5 dark:hover:bg-white/5'
          }`}
          title="حجم خط ضخم مريح جداً"
        >
          A++
        </button>
      </div>
    </div>
  );
};
