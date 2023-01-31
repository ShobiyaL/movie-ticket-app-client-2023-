import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../../common/apis/Api';
// import axios from 'axios';

export const fetchAsyncShowTime = createAsyncThunk('showTime/fetchAsyncShowTime',async({movieid,dateResult})=>{
  let today = new Date().toLocaleDateString();
    if(dateResult===undefined){
      dateResult = today
    }  
      const response = await Api.get(`/public/showTime/${movieid}?selectedDate=${dateResult}`)
 console.log(response.data.showTime);
 return response.data;
}
);



const initialState = {
  showTime:{},
  //  selectcinema:{}
  
}

const showTimeSlice = createSlice({
  name: 'showTime',
  initialState,
  reducers: {
    
  },
  extraReducers: {
   //life cycle of the async req
   [fetchAsyncShowTime.pending]:()=>{
    console.log("Pending")
},
[fetchAsyncShowTime.fulfilled]:(state,{payload})=>{
      
    console.log("Fetched show time successfully");
    // console.log(payload);
    return {...state, showTime:payload}
},
[fetchAsyncShowTime.rejected]:()=>{
    console.log("Rejected")
},
    
  },
})

export const getShowTime = (state)=>{
  
  return state.showTime.showTime;
};
export default showTimeSlice.reducer;