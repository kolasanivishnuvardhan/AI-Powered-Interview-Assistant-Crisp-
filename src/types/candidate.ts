import { Question, Answer } from './interview';

export interface Candidate {
  id: string | null; // Will be set at the start of a session
  name: string | null;
  email: string | null;
  phone: string | null;
}

export interface CompletedCandidate {
  id: string;
  profile: Candidate;
  questions: Question[];
  answers: Answer[];
  finalScore: number;
  summary: string;
  completedAt: number; // Timestamp for when the interview was completed
}