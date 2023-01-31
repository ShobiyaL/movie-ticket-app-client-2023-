import React from 'react';
import "./SelectedCinema.scss";
import { useSelector } from 'react-redux'
import {getShowTime} from "../../features/showTime/showTimeSlice";
import ShowTimeList from '../ShowTimeList/ShowTimeList';
// import Cinema from '../empty/CinemaDisplay/Cinema';
import { useParams } from 'react-router-dom';
 import Calendar from '../Calendar/Calendar';

const SelectedCinema = () => {
  const params = useParams();
  console.log(params);
  
    const showTime =useSelector(getShowTime)
    console.log(showTime);
    let renderShowTimes="";
   renderShowTimes = showTime.type==="success" && showTime.showTime.length !==0 ? (
    showTime.showTime.map((item,index)=>{
       return <ShowTimeList key={index} data={item}/>
  })
   ): (<div className='movie-error'><h6>Sorry.. No shows on this day</h6></div>);
    
  return (
    
    <div className="container" >
    <Calendar />
                <div className="show-detail">
                <div className="theater-detail">
                <div id="cinema-name">{showTime.showTime[0].cinema_details[0].name}</div>

                {renderShowTimes}
                {/* <div >{showTime.showTime[0].cinema_details[0].name}</div> */}
               
                </div> 
                    
                    
                </div>
    </div>
    
  )
}

export default SelectedCinema