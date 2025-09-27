import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Candidate } from '../../types/candidate';

interface CandidateState {
  info: Candidate;
  error: string | null;
}

const initialState: CandidateState = {
  info: {
    name: null,
    email: null,
    phone: null,
  },
  error: null,
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
  },
});

export const {
  setCandidateInfo,
  setParsingError,
  setCandidateName,
  setCandidateEmail,
  setCandidatePhone,
} = candidateSlice.actions;
export default candidateSlice.reducer;