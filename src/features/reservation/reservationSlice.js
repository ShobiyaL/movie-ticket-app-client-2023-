import { createSlice } from "@reduxjs/toolkit";
import {reservationAsync} from "./reservationAction";
import { getLocalStorage } from "../../utils/localStorage";

const initialState = {
    reservationId: '',
    movieId: '',
    movie: '',
    image: '',
    date: '',
    startAt: '',
    ticketPrice: 0,
    totalPrice: 0,
    totalSeats: 0,
    email: '',
    username: '',
    selectedSeats: [],
    seatLayout: {},
    shows: [],
    selectedCinema: '',
    cinemaId: '',
    showTimeId: '',
    paymentStatus: 'Incomplete'
  };
  
      
     // Initialize the app with local storage reservation , otherwise use initialState
     const localReservation = getLocalStorage('reservation', initialState);


const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers:{
        
    },
    extraReducers:{
        //life cycle of the async req
        [reservationAsync.pending]:()=>{
            console.log("Pending")
        },
        [reservationAsync.fulfilled]:(state,{payload})=>{
            //  console.log("all movies"+payload);
            console.log("Fetched successfully")
            return {...state, reservation:payload}
        },
        [reservationAsync.rejected]:()=>{
            console.log("Rejected")
        },
       
    }
})


export default reservationSlice.reducer;