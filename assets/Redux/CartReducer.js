import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    CartStore: []
}

const CartSlice = createSlice({
    name: 'CartStore',
    initialState,
    reducers: {
        CartStore: (state, action) => {
            state.CartStore.push(action.payload)
        },
    }
})
export const { CartStore } = CartSlice.actions
export default CartSlice.reducer