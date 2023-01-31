import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchAsyncMovies, getAllMovies } from '../../features/movies/movieSlice';
import { getShowTime } from '../../features/showTime/showTimeSlice'
import CinemaCard from '../CinemaCard/CinemaCard';
import ShowTimeList from '../ShowTimeList/ShowTimeList';

const CinemaListing = () => {
    const {movieid} = useParams();
   

    const movies = useSelector(getAllMovies);
    console.log(movies);

   

    let renderCinemas ="";
  renderCinemas= movies.type==="success" ? (
    movies.cinemaData.filter((cinema,index)=>{
        return cinema.movieId === movieid
    }
    ).map((c,i)=>{
        return <CinemaCard key={i} data={c}/>
    })
  ) : (<div className='movie-error'><h3>{movies.error}</h3></div>);

  

  return (
    <div>
    {renderCinemas}
    
    </div>
  )
}

export default CinemaListing