import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import PuzzleReducer from './puzzleSlice'

const makeStore = () =>
    configureStore({
        reducer: {
            puzzle: PuzzleReducer
        },
        devTools: true,
    });

export const wrapper = createWrapper(makeStore);