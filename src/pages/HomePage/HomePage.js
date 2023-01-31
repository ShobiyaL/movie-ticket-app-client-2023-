import React, { useEffect } from 'react';
import './HomePage.scss'
import MovieListing from '../../components/MovieListing/MovieListing';

import { useDispatch } from 'react-redux';
import { addMovies, fetchAsyncMovies,fetchAsyncCities } from '../../features/movies/movieSlice';
import Header from '../../components/Header/Header';


import { Outlet } from 'react-router-dom';



const HomePage = (props) => {
  console.log(props);
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(fetchAsyncMovies(props.location));
  },[dispatch,props.location]);

//   const fetchMovie = async ()=>{
//     try{
//        const response = await movieApi.get(`/public/movie/get-allMovies`);
//        dispatch(addMovies(response.data))//here all movies will be send to the store
//       //  console.log("All Movies here",response.data);
//     }catch(error){
//       console.log(error);
//     }
// };

  return (
    <div> 
     
    <Header/>    
    <Outlet/>  
      <div className='banner-img'></div>
        <MovieListing />
        {/* <Footer/> */}
    </div>
    
  )
}

export default HomePage;