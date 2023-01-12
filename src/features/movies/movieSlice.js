import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from '../../common/apis/Api'

 export const  fetchAsyncMovies = createAsyncThunk('movies/fetchAsyncMovies',async(location)=>{
    console.log(location);
    if (location == '') {
        location = 'Namakkal';
      }
      const response = await Api.get(`/public/cinema/${location}`);
      console.log(response.data);
    //   return response.data; //async action creator
  return response.data;

});
// export const  fetchAsyncSearchMovie = createAsyncThunk('movies/fetchAsyncSearchMovie',async(searchValue)=>{
//     console.log(searchValue)
//     const response = await Api.get(`public/movie?q=${searchValue}`);
//     return response.data; //async action creator
  
// });

export const  fetchAsyncMovieDetail = createAsyncThunk( 'movies/fetchAsyncMovieDetail',
   async(id,searchValue)=>{
    console.log(id);
      const response = await Api.get(`/public/movie/${id}?q=${searchValue}`);
      console.log(response.data.movie)
      return response.data.movie; //async action creator
    
});


const initialState = {
    movies:{},
    selectMovie:{},
    searchMovie:{},
}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers:{
        // addMovies:(state,{payload})=>{
        //     state.movies=payload;
        // },
        removeSelectedMovie: (state) => {
            state.selectMovie = {};
          }
    },
    extraReducers:{
        //life cycle of the async req
        [fetchAsyncMovies.pending]:()=>{
            console.log("Pending")
        },
        [fetchAsyncMovies.fulfilled]:(state,{payload})=>{
            //  console.log("all movies"+payload);
            console.log("Fetched successfully")
            return {...state, movies:payload}
        },
        [fetchAsyncMovies.rejected]:()=>{
            console.log("Rejected")
        },
        [fetchAsyncMovies.pending]:()=>{
            console.log("Pending")
        },
        [fetchAsyncMovieDetail.fulfilled]: (state, { payload }) => {
            // console.log(state);
            // console.log("this"+payload);
            console.log("Fetched Successfully individual movie detail!");
            return { ...state, selectMovie: payload };
          },
          [fetchAsyncMovieDetail.rejected]:()=>{
            console.log("Rejected")
        },
        // [fetchAsyncSearchMovie.fulfilled]: (state, { payload }) => {
        //     // console.log(state);
        //     // console.log("this"+payload);
        //     console.log("Searched Successfully ");
        //     return { ...state, searchMovie: payload };
        //   },
    }
})

//exporting the actions
// export const {addMovies}=movieSlice.actions;
   export const { removeSelectedMovie } = movieSlice.actions;
export const getAllMovies = (state)=>{
    return state.movies.movies;
};
// export const getSearchedMovie = (state)=>{
//     return state.movies.searchMovie;
// };
export const getSelectedMovie = (state) => state.movies.selectMovie;
export default movieSlice.reducer;