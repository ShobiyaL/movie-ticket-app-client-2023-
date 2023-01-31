import React,{useEffect} from 'react'
import './CinemaCard.scss';
import { useNavigate,Link, useLocation, useParams } from 'react-router-dom';
import ShowTimeList from '../ShowTimeList/ShowTimeList';
import { getShowTime,fetchAsyncShowTime } from '../../features/showTime/showTimeSlice';
import { useSelector,useDispatch } from 'react-redux';

const CinemaCard = ({data}) => {
   const {movieid} =useParams();
     console.log("cinema details" + data.movieId);

     const showTime = useSelector(getShowTime);
     console.log(showTime.showTime);
     
     let renderShowTimes="";
   renderShowTimes = showTime.type==="success" && showTime.showTime.length !==0 ? (
    showTime.showTime.map((item,index)=>{
       return <ShowTimeList key={index} data={item}/>
  })
   ): (<div className='movie-error'><h6>Sorry.. No shows on this day</h6></div>);
  return (
    <>
    
    <div className="container" >
    
                <div className="show-detail">
                <div className="theater-detail">
                {/* <h1></h1> */}
                <Link to={`/selectedCinema/movie/${data.movieId}`} id="theater-name" ><div>{data.name}</div></Link>
                    <div className="show-time pills">
                    {renderShowTimes}
                    </div>
                    
                </div> 
                    
                    
                </div>
    </div>
    </>
  )
}

export default CinemaCard