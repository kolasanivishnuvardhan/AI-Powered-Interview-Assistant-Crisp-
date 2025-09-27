import { Question, QuestionLevel } from '../types/interview';

const questionsBank: Record<QuestionLevel, { text: string; timeLimit: number }[]> = {
  Easy: [
    { text: 'Tell me about yourself.', timeLimit: 20 },
    { text: 'What are your biggest strengths?', timeLimit: 20 },
  ],
  Medium: [
    { text: 'Describe a challenging situation you faced at work and how you handled it.', timeLimit: 60 },
    { text: 'Where do you see yourself in 5 years?', timeLimit: 60 },
  ],
  Hard: [
    { text: 'Explain a complex project you worked on. What was your role, and what was the outcome?', timeLimit: 120 },
    { text: 'How do you handle disagreements with a team member or manager?', timeLimit: 120 },
  ],
};

/**
 * Generates a mock list of 6 interview questions (2 of each difficulty).
 * @returns An array of Question objects.
 */
export const generateInterviewQuestions = (): Question[] => {
  const interviewQuestions: Question[] = [];
  let idCounter = 0;

  (Object.keys(questionsBank) as QuestionLevel[]).forEach(level => {
    questionsBank[level].forEach(q => {
      interviewQuestions.push({
        id: `q-${idCounter++}`,
        level,
        ...q,
      });
    });
  });

  return interviewQuestions;
};

/**
 * Mock function to generate a single question.
 * Note: The main flow uses `generateInterviewQuestions` to get the full list at once.
 * This function is included to match the requirement if needed for other purposes.
 * @param level The difficulty level of the question.
 * @returns A single Question object.
 */
export const generateQuestion = (level: QuestionLevel): Question => {
  const questionPool = questionsBank[level];
  const question = questionPool[Math.floor(Math.random() * questionPool.length)];
  return {
    id: `q-${Date.now()}`,
    level,
    ...question,
  };
};