import React from 'react';
import "./MovieListing.scss";
import { useSelector } from 'react-redux'
import { getAllMovies } from '../../features/movies/movieSlice'
import MovieCard from "../MovieCard/MovieCard";
import Slider from 'react-slick';
import { Settings } from '../../common/settings';
const MovieListing = () => {
  
  const movies=useSelector(getAllMovies);
  // console.log(movies.movieData);
  let renderMovies ="";
  renderMovies = movies.type==="success" ? (
    movies.movieData.map((movie,index)=>{
     return <MovieCard key={index} data={movie}/>
    }
    )
  ) : (<div className='movie-error'><h3>{movies.Error}</h3></div>);


  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h4>Movies</h4>
        <div className="movie-container">
        {/* {
          movies.movieData.length < 5 ? (<div style={{display: "grid",
  gridTemplateColumns:" repeat(auto-fill, minmax(220px, 1fr))",
  gridGap: "15px"}}>{renderMovies} </div>) :
          <Slider {...Settings}>{renderMovies}</Slider>
        } */}
        {renderMovies}
        
        </div>
      </div>
    </div>
  )
}

export default MovieListing