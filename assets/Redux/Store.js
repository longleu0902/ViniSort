import { configureStore } from '@reduxjs/toolkit'
import ColorReducer from './ColorReducer';
import CartReducer from './CartReducer';
import LoginReducer from './LoginReducer';
import productReducer from './productReducer';

const store = configureStore({
    reducer : {
        themeColor : ColorReducer ,
        cartReducer : CartReducer , 
        LoginReducer : LoginReducer,
        productReducer : productReducer,
    }
})

export default store;