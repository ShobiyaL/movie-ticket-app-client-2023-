import { createSlice } from '@reduxjs/toolkit'
import { signUp, logIn } from './authAction'

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

  const role = localStorage.getItem('role')
  ? localStorage.getItem('role')
  : null

const initialState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  role,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.userToken = null
      state.error = null
      state.role=null
    },
    setCredentials: (state, { payload }) => {
      console.log(payload)
       state.userInfo = payload
     
    },
  },
  extraReducers: {
    // login user
    [logIn.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [logIn.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.userInfo = payload
      state.userToken = payload.userToken
      state.success = true
    },
    [logIn.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
    // register user
    [signUp.pending]: (state) => {
      state.loading = true
      state.error = null
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.success = true // registration successful
    },
    [signUp.rejected]: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer