import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompletedCandidate } from '../../types/candidate';

interface CandidatesState {
  history: CompletedCandidate[];
}

const initialState: CandidatesState = {
  history: [],
};

const candidatesSlice = createSlice({
  name: 'candidates',
  initialState,
  reducers: {
    addCompletedCandidate: (state, action: PayloadAction<CompletedCandidate>) => {
      // Add the new candidate to the beginning of the array
      state.history.unshift(action.payload);
    },
  },
});

export const { addCompletedCandidate } = candidatesSlice.actions;
export default candidatesSlice.reducer;