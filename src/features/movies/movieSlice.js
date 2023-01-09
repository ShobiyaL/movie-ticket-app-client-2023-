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
    // let moviesArray = response.data.movieData;
    // console.log(moviesArray);
  return response.data;
//   let movData = [];
//   let selectTheaters = {};
//   for (let i = 0; i < moviesArray.length && moviesArray[i]['movieId'] != undefined; i++) {
//     console.log(moviesArray[i]['movieId']);
//     movData.push(moviesArray[i]['movieId']);
//   }
//   for (let i = 0; i < val.length ; i++) {
//     console.log(val[i]['_id']);
//     console.log(val[i]['title']);
//     let tId = val[i]['_id'];
//     let tname = val[i]['title'];
//     selectTheaters[tId] = tname;
//     selectTheaters.push({ tId: tname});
//     console.log(selectTheaters);
//   }
//   console.log({ 'movies': movData });
//   let currentStatus = movData.length > 0 ? 'success' : 'failure';

//   return { status: currentStatus, 'movies': movData, 'selectedTheaters': selectTheaters };
    
});
export const  fetchAsyncSearchMovie = createAsyncThunk('movies/fetchAsyncSearchMovie',async(searchValue)=>{
    console.log(searchValue)
    const response = await Api.get(`http://localhost/api/public/movie?search=${searchValue}`);
    return response.data; //async action creator
  
});

export const  fetchAsyncMovieDetail = createAsyncThunk( 'movies/fetchAsyncMovieDetail',
   async(id)=>{
    console.log(id);
      const response = await Api.get(`/public/movie/${id}`);
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
             console.log("all movies"+payload);
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
        [fetchAsyncSearchMovie.fulfilled]: (state, { payload }) => {
            // console.log(state);
            // console.log("this"+payload);
            console.log("Fetched Successfully individual movie detail!");
            return { ...state, searchMovie: payload };
          },
    }
})

//exporting the actions
// export const {addMovies}=movieSlice.actions;
   export const { removeSelectedMovie } = movieSlice.actions;
export const getAllMovies = (state)=>{
    return state.movies.movies;
};
export const getSearchedMovie = (state)=>{
    return state.movies.searchMovie;
};
export const getSelectedMovie = (state) => state.movies.selectMovie;
export default movieSlice.reducer;