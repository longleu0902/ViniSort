import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    Render: []
}

const RenderSlice = createSlice({
    name: 'Render',
    initialState,
    reducers: {
        Render: (state, action) => {
            state.Render = action.payload
        },
    }
})
export const { Render } = RenderSlice.actions
export default RenderSlice.reducer