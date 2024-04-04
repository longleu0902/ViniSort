import { configureStore } from '@reduxjs/toolkit'
import ColorReducer from './ColorReducer';
import CartReducer from './CartReducer';
import LoginReducer from './LoginReducer';
import productReducer from './productReducer';
import RenderReducer from './RenderReducer';
import favouriterReduce from './favouriterReduce';
const store = configureStore({
    reducer : {
        themeColor : ColorReducer ,
        cartReducer : CartReducer , 
        LoginReducer : LoginReducer,
        productReducer : productReducer,
        RenderReducer : RenderReducer,
        favouriterReduce : favouriterReduce
    }
})

export default store;