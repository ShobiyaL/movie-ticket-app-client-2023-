
import { createAsyncThunk } from '@reduxjs/toolkit'
import Api from '../../common/apis/Api'


export const logIn = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    
    try {
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await Api.post(
        `/public/sign-in`,
        { email, password },
        config
      )
console.log(data)
      // store user's token in local storage
      localStorage.setItem('userToken', data.userToken);
      localStorage.setItem('role',data.role);

      return data
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const signUp = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
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
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)