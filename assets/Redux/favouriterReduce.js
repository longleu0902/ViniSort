import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favouriterFood: []
}

const favouriterSlice = createSlice({
    name: 'favouriter',
    initialState,
    reducers: {
        favouriterFood: (state, action) => {
            state.favouriterFood = action.payload || []
        },
    }
})
export const { favouriterFood } = favouriterSlice.actions
export default favouriterSlice.reducer