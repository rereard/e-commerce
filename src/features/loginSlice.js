import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    isLogin: localStorage.getItem("token") ? true : false,
    isLoginAdmin: localStorage.getItem("tokenAdmin") ? true : false
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsLogin: (state) => {
            state.isLogin = localStorage.getItem("token") ? true : false
        },
        setIsLoginAdmin: (state) => {
            state.isLoginAdmin = localStorage.getItem("tokenAdmin") ? true : false
        }
    }
})

export const { setIsLogin, setIsLoginAdmin } = loginSlice.actions
export default loginSlice.reducer