import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current: [],      
  finished: [],     
  scores: {},       
  recordings: {},
  totalScore: 0,   
};

export const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    // Add a drug to the Current Learning list
    addToLearning: (state, action) => {
      const drug = action.payload;
      if (!state.current.find(d => d.id === drug.id)) {
        state.current.push(drug);
      }
    },

    // Move drug from Current → Finished
    finishDrug: (state, action) => {
      const drugId = action.payload;
      const drug = state.current.find(d => d.id === drugId);
      if (drug) {
        state.current = state.current.filter(d => d.id !== drugId);
        state.finished.push(drug);
      }
    },

    // Remove drug from Current or Finished list
    removeDrug: (state, action) => {
      const { id, from } = action.payload; // `from` can be 'current' or 'finished'
      if (from === 'current') {
        state.current = state.current.filter(d => d.id !== id);
      } else {
        state.finished = state.finished.filter(d => d.id !== id);
      }
    },

    // Save a recording and its evaluation score
    addRecording: (state, action) => {
      const { drugId, uri, score } = action.payload;
      if (!state.recordings[drugId]) {
        state.recordings[drugId] = [];
      }
      state.recordings[drugId].push({
        uri,
        date: new Date().toISOString(),
        score,
      });
    },

    updateTotalScore: (state, action) => {
      const { drugId, score } = action.payload;

      if (!state.scores[drugId] || score > state.scores[drugId]) {
        const prevScore = state.scores[drugId] || 0;
        state.scores[drugId] = score;
        state.totalScore = state.totalScore - prevScore + score;
      }
    },

    // Delete a recording
    deleteRecording: (state, action) => {
      const { drugId, index } = action.payload;
      state.recordings[drugId].splice(index, 1);
    },
  },
});


// Selectors (for easy access in components)
export const selectCurrentCount = (state) => state.learning.current.length;
export const selectFinishedCount = (state) => state.learning.finished.length;
export const selectTotalScore = (state) => state.learning.totalScore;

// Action creators
export const { addToLearning,finishDrug,removeDrug,addRecording,updateTotalScore,deleteRecording} = learningSlice.actions;
export default learningSlice.reducer;

