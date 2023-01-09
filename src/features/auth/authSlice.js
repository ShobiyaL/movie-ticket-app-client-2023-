import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../../common/apis/Api';

export const signUp = createAsyncThunk('auth/signup',async({ username, email, password }, { rejectWithValue })=>{
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    await Api.post(
      `/public/sign-up`,
      { username, email, password },
      config
    )
  } catch (error) {
  // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
}
);

export const logIn = createAsyncThunk('auth/login',async({  email, password }, { rejectWithValue })=>{
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await Api.post(
      `public/sign-in`,
      { email, password },
      config
    )
     // store user's token in local storage
     localStorage.setItem('userToken', data.usertoken)
    //  console.log(data);
     return data
  } catch (error) {
  // return custom error message from backend if present
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message)
    } else {
      return rejectWithValue(error.message)
    }
  }
}
);

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // register user
    [signUp.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [signUp.fulfilled]: (state, { payload }) => {
      console.log("Registration Succesful")
      state.loading = false
      state.success = true // registration successful
    },
    [signUp.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // login user
    [logIn.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [logIn.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
    },
    [logIn.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export default authSlice.reducer