import {configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import productReducer from './features/ProductSlice'
import cartReducer from './features/cartSlice'
import loginReducer from './features/loginSlice'
export const store = configureStore({
    reducer: {
        products: productReducer,
        cart: cartReducer,
        login: loginReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})