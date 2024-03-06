import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    backGround : "#FFF0F5",
    colorActive :'#F08080',
    colorText :'#000', 
}

 const themeColorSlice = createSlice({
    name: 'themeColor',
    initialState,
    reducers: {
        backGround: (state, action) => {
            state.backGround = action.payload
        },
        colorActive : (state , action) => {
            state.colorActive = action.payload
        },
        colorText : (state , action) => {
            state.colorText = action.payload
        }
    }
})
export const {backGround  , colorActive ,colorText } = themeColorSlice.actions
export default themeColorSlice.reducer