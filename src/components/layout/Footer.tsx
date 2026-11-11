import React from 'react';
import { Keyboard } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t theme-border py-8 px-4 text-center text-xs theme-text-muted theme-surface">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Keyboard shortcuts reminder */}
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-2xl theme-muted-box border text-[11px]">
          <div className="flex items-center gap-1.5 theme-text-primary font-medium">
            <Keyboard className="w-3.5 h-3.5 text-sky-500" />
            <span>اختصارات الكيبورد:</span>
          </div>
          <span className="px-2 py-0.5 rounded theme-card border font-mono font-bold shadow-xs">
            A B C D
          </span>
          <span>لاختيار الإجابة</span>
          <span className="opacity-30">•</span>
          <span className="px-2 py-0.5 rounded theme-card border font-mono font-bold shadow-xs">
            ← →
          </span>
          <span>للتنقل بين الأسئلة</span>
        </div>

        <p className="font-medium theme-text-secondary">
          CS314 Data Science — بنك الأسئلة والمراجعة الشاملة (100 سؤال • الفصول 1–5)
        </p>
        <p className="text-[11px] opacity-75">
          مصمم بواجهة مريحة للعين، تدعم الثيمات المتعددة والشرح باللغتين الإنجليزية والعربية.
        </p>
      </div>
    </footer>
  );
};
