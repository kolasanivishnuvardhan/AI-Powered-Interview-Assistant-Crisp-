export type QuestionLevel = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  text: string;
  level: QuestionLevel;
  timeLimit: number; // in seconds
}

export interface Answer {
  questionId: string;
  text: string;
}