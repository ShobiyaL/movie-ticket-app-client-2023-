import React,{useEffect} from 'react';
import './MovieDetail.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAsyncMovieDetail,fetchAsyncMovies,getSelectedMovie,removeSelectedMovie} from '../../features/movies/movieSlice';
import { fetchAsyncShowTime } from '../../features/showTime/showTimeSlice';
import { reservationAsync } from '../../features/reservation/reservationSlice';


const MovieDetail = () => {
  const { movieid }= useParams();
  //  console.log(movieid);
  const dispatch = useDispatch();
const movieData = useSelector(getSelectedMovie)
//  console.log(movieData);
// console.log(movieData.movie['title']);
const navigate = useNavigate();
  useEffect(() => {
    //to dispatch the action creator
     dispatch(fetchAsyncMovieDetail(movieid));
    
    return () => {
      dispatch(removeSelectedMovie());
    };
    
  }, [dispatch,movieid]) //movieid added in the dependency to fetch the new id from the server(on clicking another movie)
  

  return (
    <>
    {Object.keys(movieData).length ===0 ? (<div className="movie-section">...Loading</div>) :
    ( <>
      <div className='movie-section'>
       <div className='section-right'>
        <img src={movieData.image} alt={movieData.title} className='rounded-left'/>
       </div>
       <div className='section-left'>
           <div className='movie-title'>{movieData.title}</div>
           <div className='movie-info'>
           <div>
              <span>Duration </span>
              <span>{movieData.duration}</span>
            </div>
            
            <div>
              <span>Director </span>
              <span>{movieData.director}</span>
            </div>
            <div>
              <span>Cast </span>
              <span>{movieData.cast}</span>
            </div>
            <div>
              <span>Genre </span>
              <span>{movieData.genre}</span>
            </div>
            <div>
              <span>Language </span>
              <span>{movieData.language}</span>
            </div>
           
            <div >
            <button onClick={()=>{
              // console.log(movieData.title);
              
                    navigate(`/cinema/${movieData._id}`,{state:movieData});
            }} className='btn'>Book Tickets</button>
            </div>
           </div>
       </div>
      </div>
    <div className='about'>
    <h4>About the Movie</h4>
    <div>{movieData.description}</div>
    </div>
    </>
    )
    }
    </>
  )
}

export default MovieDetail