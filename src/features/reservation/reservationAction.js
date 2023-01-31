import { createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../common/apis/Api";
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

export const reservationAsync = createAsyncThunk(
  "reservation/reservationAsync",
  async (
    {
      movieId,
      movie,
      image,
      date,
      email,
      username,
      cinemaId,
      selectedCinema,
      ticketPrice,
      selectedSeats,
      totalPrice,
      showTimeId,
      startAt,
      paymentStatus,
      totalSeats
    },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const stripe = await stripePromise;
      // Create a Stripe session on server and reserve seats
      const response = await Api.post(
        `public/reser/create-reservation`,
        {
          movieId,
          movie,
          image,
          date,
          email,
          username,
          cinemaId,
          selectedCinema,
          ticketPrice,
          selectedSeats,
          totalPrice,
          showTimeId,
          startAt,
          paymentStatus,
          totalSeats
        },
        config
      );
      console.log(response);
      const { reservationId, sessionId } = response.data;

      console.log(reservationId);
         
      // Redirect to stripe hosted checkout page
      await stripe.redirectToCheckout({
        sessionId
      });
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
