import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    listStore: []
}

const listSlice = createSlice({
    name: 'listStore',
    initialState,
    reducers: {
        listStore: (state, action) => {
            state.listStore = action.payload
        },
    }
})
export const { listStore } = listSlice.actions
export default listSlice.reducer