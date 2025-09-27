import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Candidate } from '../../types/candidate';

interface CandidateState {
  info: Candidate;
  error: string | null;
  finalScore: number | null;
  summary: string | null;
}

const initialState: CandidateState = {
  info: {
    name: null,
    email: null,
    phone: null,
  },
  error: null,
  finalScore: null,
  summary: null,
};

const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {
    setCandidateInfo(state, action: PayloadAction<Candidate>) {
      state.info = action.payload;
      state.error = null;
    },
    setParsingError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setCandidateName(state, action: PayloadAction<string | null>) {
      state.info.name = action.payload;
    },
    setCandidateEmail(state, action: PayloadAction<string | null>) {
      state.info.email = action.payload;
    },
    setCandidatePhone(state, action: PayloadAction<string | null>) {
      state.info.phone = action.payload;
    },
    setInterviewResult(state, action: PayloadAction<{ finalScore: number; summary: string }>) {
      state.finalScore = action.payload.finalScore;
      state.summary = action.payload.summary;
    },
  },
});

export const {
  setCandidateInfo,
  setParsingError,
  setCandidateName,
  setCandidateEmail,
  setCandidatePhone,
  setInterviewResult,
} = candidateSlice.actions;
export default candidateSlice.reducer;