import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { Candidate } from '../../types/candidate';

interface CandidateState {
  info: Candidate;
  error: string | null;
  finalScore: number | null;
  summary: string | null;
}

// Function to create a fresh state with a new UUID for a new session
const createInitialState = (): CandidateState => ({
  info: {
    id: uuidv4(),
    name: null,
    email: null,
    phone: null,
  },
  error: null,
  finalScore: null,
  summary: null,
});

const candidateSlice = createSlice({
  name: 'candidate',
  initialState: createInitialState(),
  reducers: {
    resetCandidate: () => createInitialState(),
    setCandidateInfo(state, action: PayloadAction<Candidate>) {
      // Ensure the ID from the new session is preserved when parsing resume
      state.info = { ...action.payload, id: state.info.id };
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
  resetCandidate,
  setCandidateInfo,
  setParsingError,
  setCandidateName,
  setCandidateEmail,
  setCandidatePhone,
  setInterviewResult,
} = candidateSlice.actions;
export default candidateSlice.reducer;