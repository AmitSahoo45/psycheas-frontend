import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    puzzle: {
        whodunit: {},
        Solved: {}
    },
    status: 'idle',
    error: null
}

const API = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL })

API.interceptors.request.use((req) => {
    const authData = JSON.parse(localStorage.getItem('psycheas'))
    if (authData)
        req.headers.authorization = `Bearer ${authData.jwtToken}`;
    return req;
});

export const getPuzzle = createAsyncThunk('puzzle/random', async () => {
    const { data } = await API.get('/storyline/puzzle/random')
    console.log(data)
    return data
})

export const nextQuestion = createAsyncThunk('puzzle/next', async () => {
    const { data } = await API.get('/storyline/puzzle/next')
    return data
})

export const puzzleSlice = createSlice({
    name: 'puzzle',
    initialState,
    reducers: {
        resetPuzzle: (state) => {
            state.puzzle = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPuzzle.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getPuzzle.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.puzzle.whodunit = action.payload.whodunit
                state.puzzle.Solved = action.payload.solveddocx
            })
            .addCase(getPuzzle.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(nextQuestion.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(nextQuestion.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.puzzle.whodunit = action.payload.whodunit
                state.puzzle.Solved = action.payload.solveddocx
            })
            .addCase(nextQuestion.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const selectWhodunit = state => state.puzzle.puzzle.whodunit
export const selectSolved = state => state.puzzle.puzzle.Solved
export const selectLoading = state => state.puzzle.status

export default puzzleSlice.reducer