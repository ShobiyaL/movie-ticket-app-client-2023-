import {configureStore} from '@reduxjs/toolkit';
import moviesReducer from './movies/movieSlice'
import authReducer from './auth/authSlice'
import showTimeReducer from "./showTime/showTimeSlice"
import reservationReducer from './reservation/reservationSlice'
import { authApi } from '../components/services/AuthService';

//store configuration which will be used in the components
export const store =configureStore({
    reducer:{
        movies:moviesReducer,
        showTime:showTimeReducer,
        auth: authReducer,
       reservation:reservationReducer,
       [authApi.reducerPath]: authApi.reducer,
    } ,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
 
})