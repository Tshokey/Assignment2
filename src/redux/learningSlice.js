import { createSlice, current } from "@reduxjs/toolkit";

export const learningSlice = createSlice({
    name: "Learning",
    initialState: {
        current : [],
        finished: [],
    },
    reducers: {
        addToLearning: (state, action) =>{
            const drug = action.payload;
            if(!state.current.find(d => d.id === drug.id)) {
                state.current.push(drug);
            }
        },
        finishDrug: (state, action) => {
            const drugId = action.payload;
            const drug = state.current.find(d => d.id === drugId);
            if (drug) {
                state.current = state.current.filter(d => d.id !== drugId);
                state.finished.push(drug);
            }
        },
        removeDrug: (state, action) => {
            const id = action.payload;
            state.current = state.current.filter(d => d.id !== id);
        },
    },
});

export const {addToLearning, finishDrug, removeDrug} = learningSlice.actions;
export default learningSlice.reducer;