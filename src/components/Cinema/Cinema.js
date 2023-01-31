import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams,useLocation } from 'react-router-dom'
import { fetchAsyncMovies } from '../../features/movies/movieSlice';
import { fetchAsyncShowTime, getShowTime } from '../../features/showTime/showTimeSlice';
import Calendar from '../Calendar/Calendar';
import CinemaListing from '../CinemaListing/CinemaListing';

const Cinema = (props) => {
    const {movieid} = useParams();
    console.log(movieid)
    
    const location = useLocation();
    console.log(location.state)

    const dispatch = useDispatch();
    useEffect(()=>{
        console.log(movieid)
         dispatch(fetchAsyncMovies(props.location))
        dispatch(fetchAsyncShowTime({movieid}))
        
    },[dispatch,movieid,props.location])

   

    
  return (
    <div>
    <h4 style={{margin:"20px 0px 0px 20px"}}>{`Movie: ${location.state.title}`}</h4>
    <Calendar/>
       <CinemaListing/>
       
    </div>
  )
}

export default Cinema