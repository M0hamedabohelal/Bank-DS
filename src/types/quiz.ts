export type ChoiceKey = 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: number; // 1 to 100
  chapter: number; // 1 to 5
  chapterTitle: string;
  questionNumber: number; // 1 to 20 inside chapter
  questionText: string;
  contextNote?: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: ChoiceKey;
  why: string;
  explanationAr: string;
}

export interface ChapterInfo {
  id: number;
  number: number;
  title: string;
  titleAr: string;
  description: string;
  questionCount: number;
  iconName: string;
  gradient: string;
}

export type QuizMode = 'chapter' | 'all' | 'sprint' | 'study' | 'bookmarks';
export type ThemeMode = 'light' | 'dark' | 'sepia' | 'nordic';

export interface QuizFilter {
  chapterId?: number;
  mode: QuizMode;
  onlyIncorrect?: boolean;
  shuffle?: boolean;
}

export interface UserStats {
  totalAnswered: number;
  totalCorrect: number;
  chapterProgress: Record<number, { answered: number; correct: number }>;
  bookmarks: number[]; // question IDs
  history: Record<number, { selected: ChoiceKey; isCorrect: boolean; timestamp: number }>;
}
