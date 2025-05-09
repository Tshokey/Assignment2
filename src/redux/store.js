import { configureStore } from "@reduxjs/toolkit";
import learningReducer from './learningSlice';

export default configureStore({
    reducer: {
        learning: learningReducer,
    },
});