import { configureStore } from '@reduxjs/toolkit'
import ColorReducer from './ColorReducer';
import CartReducer from './CartReducer';

const store = configureStore({
    reducer : {
        themeColor : ColorReducer ,
        cartReducer : CartReducer
    }
})

export default store;