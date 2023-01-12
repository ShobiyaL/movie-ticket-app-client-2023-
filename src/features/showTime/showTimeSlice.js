import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../../common/apis/Api';

export const fetchAsyncShowTime = createAsyncThunk('showTime/fetchAsyncShowTime',async(movieid,selectedDate)=>{
    console.log(selectedDate)
  console.log(movieid)
    const response = await Api.get(`/public/showTime/${movieid}?selectedDate=${selectedDate}`)
 console.log(response.data)
}
);



const initialState = {
  showTime:{}
}

const showTimeSlice = createSlice({
  name: 'showTime',
  initialState,
  reducers: {},
  extraReducers: {
   //life cycle of the async req
   [fetchAsyncShowTime.pending]:()=>{
    console.log("Pending")
},
[fetchAsyncShowTime.fulfilled]:(state,{payload})=>{
    //  console.log("all movies"+payload);
    console.log("Fetched successfully")
    return {...state, showTime:payload}
},
[fetchAsyncShowTime.rejected]:()=>{
    console.log("Rejected")
},
    
  },
})

export default showTimeSlice.reducer;