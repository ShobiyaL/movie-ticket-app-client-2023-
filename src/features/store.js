import {configureStore} from '@reduxjs/toolkit';
import moviesReducer from './movies/movieSlice'
import authReducer from './auth/authSlice'
import showTimeReducer from "./showTime/showTimeSlice"

//store configuration which will be used in the components
export const store =configureStore({
    reducer:{
        movies:moviesReducer,
        showTime:showTimeReducer,
        auth: authReducer,
    } ,
})