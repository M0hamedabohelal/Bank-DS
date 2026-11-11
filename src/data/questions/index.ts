import { Question } from '../../types/quiz';
import { chapter1Questions } from './chapter1';
import { chapter2Questions } from './chapter2';
import { chapter3Questions } from './chapter3';
import { chapter4Questions } from './chapter4';
import { chapter5Questions } from './chapter5';

export const allQuestions: Question[] = [
  ...chapter1Questions,
  ...chapter2Questions,
  ...chapter3Questions,
  ...chapter4Questions,
  ...chapter5Questions,
];

export {
  chapter1Questions,
  chapter2Questions,
  chapter3Questions,
  chapter4Questions,
  chapter5Questions,
};

export const getQuestionsByChapter = (chapterId: number): Question[] => {
  switch (chapterId) {
    case 1:
      return chapter1Questions;
    case 2:
      return chapter2Questions;
    case 3:
      return chapter3Questions;
    case 4:
      return chapter4Questions;
    case 5:
      return chapter5Questions;
    default:
      return allQuestions;
  }
};

export const getQuestionById = (id: number): Question | undefined => {
  return allQuestions.find((q) => q.id === id);
};
