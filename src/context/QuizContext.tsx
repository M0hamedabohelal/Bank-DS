import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import type { Question, ChoiceKey, QuizMode } from '../types/quiz';
import { allQuestions, getQuestionsByChapter } from '../data/questions';
import { sound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface QuizContextType {
  mode: QuizMode;
  selectedChapter: number | null;
  questions: Question[];
  currentIndex: number;
  currentQuestion: Question;
  answers: Record<number, ChoiceKey>;
  bookmarks: Set<number>;
  instantFeedback: boolean;
  autoNext: boolean;
  isExamSubmitted: boolean;
  soundEnabled: boolean;
  score: {
    answered: number;
    correct: number;
    incorrect: number;
    percentage: number;
  };
  setMode: (mode: QuizMode, chapterId?: number) => void;
  selectAnswer: (questionId: number, answer: ChoiceKey) => void;
  toggleBookmark: (questionId: number) => void;
  setInstantFeedback: (enabled: boolean) => void;
  setAutoNext: (enabled: boolean) => void;
  setSoundEnabled: (enabled: boolean) => void;
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  resetQuiz: () => void;
  submitExam: () => void;
  shuffleQuestions: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<QuizMode>('chapter');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(1);
  const [questions, setQuestions] = useState<Question[]>(() => getQuestionsByChapter(1));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, ChoiceKey>>({});
  const [bookmarks, setBookmarks] = useState<Set<number>>(() => {
    try {
      const saved = localStorage.getItem('cs314_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set<number>();
    } catch {
      return new Set<number>();
    }
  });
  const [instantFeedback, setInstantFeedbackState] = useState<boolean>(() => {
    const saved = localStorage.getItem('cs314_instant_feedback');
    return saved !== null ? saved === 'true' : true;
  });
  const [autoNext, setAutoNextState] = useState<boolean>(() => {
    const saved = localStorage.getItem('cs314_auto_next');
    return saved !== null ? saved === 'true' : true; // Default to true as user requested
  });
  const [isExamSubmitted, setIsExamSubmitted] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabledState] = useState<boolean>(sound.isEnabled());

  const autoNextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Save bookmarks
  useEffect(() => {
    localStorage.setItem('cs314_bookmarks', JSON.stringify(Array.from(bookmarks)));
  }, [bookmarks]);

  // Handle mode / chapter changes
  const setMode = (newMode: QuizMode, chapterId?: number) => {
    if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    setModeState(newMode);
    setCurrentIndex(0);
    setAnswers({});
    setIsExamSubmitted(false);

    if (newMode === 'chapter') {
      const ch = chapterId || selectedChapter || 1;
      setSelectedChapter(ch);
      setQuestions(getQuestionsByChapter(ch));
    } else if (newMode === 'all') {
      setSelectedChapter(null);
      setQuestions([...allQuestions]);
    } else if (newMode === 'study') {
      if (chapterId) {
        setSelectedChapter(chapterId);
        setQuestions(getQuestionsByChapter(chapterId));
      } else {
        setSelectedChapter(null);
        setQuestions([...allQuestions]);
      }
    } else if (newMode === 'bookmarks') {
      setSelectedChapter(null);
      const bookmarkedList = allQuestions.filter((q) => bookmarks.has(q.id));
      setQuestions(bookmarkedList.length > 0 ? bookmarkedList : getQuestionsByChapter(1));
    }
  };

  const shuffleQuestions = () => {
    if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    setQuestions((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setAnswers({});
    setIsExamSubmitted(false);
  };

  const selectAnswer = (questionId: number, answer: ChoiceKey) => {
    const question = allQuestions.find((q) => q.id === questionId);
    if (!question) return;

    const isFirstTimeAnswered = !(questionId in answers);

    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

    if (instantFeedback && isFirstTimeAnswered) {
      if (answer === question.correctAnswer) {
        sound.playCorrect();
      } else {
        sound.playIncorrect();
      }
    }

    // Auto next on CORRECT answer
    if (autoNext && answer === question.correctAnswer) {
      if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => {
          if (prev < questions.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 750);
    }
  };

  const toggleBookmark = (questionId: number) => {
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const setInstantFeedback = (enabled: boolean) => {
    setInstantFeedbackState(enabled);
    localStorage.setItem('cs314_instant_feedback', String(enabled));
  };

  const setAutoNext = (enabled: boolean) => {
    setAutoNextState(enabled);
    localStorage.setItem('cs314_auto_next', String(enabled));
  };

  const setSoundEnabled = (enabled: boolean) => {
    setSoundEnabledState(enabled);
    sound.setEnabled(enabled);
  };

  const goToQuestion = (index: number) => {
    if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  };

  const nextQuestion = () => {
    if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    setAnswers({});
    setCurrentIndex(0);
    setIsExamSubmitted(false);
  };

  const submitExam = () => {
    if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    setIsExamSubmitted(true);
    sound.playFinish();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  // Calculate live score
  const score = useMemo(() => {
    let answered = 0;
    let correct = 0;

    questions.forEach((q) => {
      const userChoice = answers[q.id];
      if (userChoice) {
        answered++;
        if (userChoice === q.correctAnswer) {
          correct++;
        }
      }
    });

    const incorrect = answered - correct;
    const percentage = answered > 0 ? Math.round((correct / answered) * 100) : 0;

    return { answered, correct, incorrect, percentage };
  }, [questions, answers]);

  const currentQuestion = questions[currentIndex] || questions[0] || allQuestions[0];

  return (
    <QuizContext.Provider
      value={{
        mode,
        selectedChapter,
        questions,
        currentIndex,
        currentQuestion,
        answers,
        bookmarks,
        instantFeedback,
        autoNext,
        isExamSubmitted,
        soundEnabled,
        score,
        setMode,
        selectAnswer,
        toggleBookmark,
        setInstantFeedback,
        setAutoNext,
        setSoundEnabled,
        goToQuestion,
        nextQuestion,
        prevQuestion,
        resetQuiz,
        submitExam,
        shuffleQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
