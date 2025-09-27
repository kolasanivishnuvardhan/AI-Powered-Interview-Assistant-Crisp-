import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question, Answer } from '../../types/interview';

interface AnswersState {
  questions: Question[];
  answers: Answer[];
  currentQuestionIndex: number;
  interviewStatus: 'not_started' | 'in_progress' | 'completed';
}

const initialState: AnswersState = {
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
  interviewStatus: 'not_started',
};

const answersSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {
    startInterview: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.answers = [];
      state.currentQuestionIndex = 0;
      state.interviewStatus = 'in_progress';
    },
    submitAnswer: (state, action: PayloadAction<Answer>) => {
      state.answers.push(action.payload);
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.interviewStatus = 'completed';
      }
    },
    resetAnswers: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { startInterview, submitAnswer, resetAnswers } = answersSlice.actions;
export default answersSlice.reducer;