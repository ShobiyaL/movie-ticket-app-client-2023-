import React,{useState,useEffect} from 'react'
import './Booking.scss';
import {useLocation} from 'react-router-dom';
import Seats from '../Seats/Seats';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import {Elements} from '@stripe/react-stripe-js';

import { reservationAsync } from '../../features/reservation/reservationAction';
import { useDispatch ,useSelector} from 'react-redux';
import { fetchAsyncMovieDetail, getSelectedMovie } from '../../features/movies/movieSlice';

const Booking = () => {
  const dispatch = useDispatch();
    const location = useLocation();
    //  console.log(location.state)
    const {userInfo} = useSelector((state)=>state.auth);
    // console.log(userInfo);

    const movieDetails = useSelector(getSelectedMovie);
    // console.log(movieDetails.title);
    const [selectSeats,setSelectSeats] = useState([]);
    
 let onSeatSelect = (item)=>{
    // console.log(item)
  const seatSelected = selectSeats.find((seat)=>seat === item);
  if(seatSelected){
      setSelectSeats(selectSeats.filter((seat)=>seat !== item));
  }else{
      setSelectSeats([...selectSeats,item])
  }
 }
//  console.log(selectSeats,"selected seats");
// console.log(selectSeats.length(),"length");

 const noOfSeats = selectSeats.length;
  
  const total = noOfSeats * location.state.cinema_details[0].ticketPrice;
  

 const showSeats =()=>{
 
   return (
    selectSeats.map((seat,index)=>{
      return <div style={{margin:"0px 7px"}}>{seat}</div>
    })
     // const charge = 10;

   )
    
  }
 
    let renderSeats=''
    renderSeats= location.state.cinema_details[0].seats;
    let seatsArray = Object.values(renderSeats)
    // console.log(seatsArray);

    let seatsPresent ='';
    seatsPresent = seatsArray.filter((elements,index)=>{
       return elements.length>0
    })
    //  console.log(seatsPresent);
let rows = seatsPresent.map((elements,index)=>{
    return <Seats key={index} data={elements} handleClick={onSeatSelect} selectSeats={selectSeats}/>
})
// console.log(rows);
useEffect(()=>{
  dispatch(fetchAsyncMovieDetail(location.state.movieId));
},[dispatch,location.state.movieId]);

let handlePay =(data)=>{
  if(!userInfo){
    alert("Please login before continuing..")
  }
  
    dispatch(reservationAsync({
      email:userInfo.email,
      username:userInfo.username,
      selectedSeats:selectSeats,
      totalPrice:total,
      movieId:data.movieId,
      movie:movieDetails.title,
      image:movieDetails.image,
     date:data.date.split('T')[0],
cinemaId:data.cinemaId,
selectedCinema:data.cinema_details[0].name,
startAt:data.startAt,
ticketPrice:data.cinema_details[0].ticketPrice,
totalSeats:selectSeats.length,
showTimeId:data._id,
paymentStatus: 'Incomplete'
    }))
     
}

  return (
    <div className="container ">
    <h4 className="cinema-title">{location.state.cinema_details[0].name}</h4>
    <div className="details">
    <div style={{fontWeight:"bold",marginBottom:"20px"}}>{`ShowTime: ${location.state.startAt}`}</div>
    <div>{`TicketPrice: ${location.state.cinema_details[0].ticketPrice}`}</div>
    
    </div>
    
    <div className="rows"> 
    <h6>Select Seats</h6>
        {rows }
    </div>
    
    <div className="booking-footer">
    <div>
    
    <FontAwesomeIcon icon={ faSquare} style={{color:"#ffc40c"}}/>
    <span style={{marginLeft:"7px"}}>Selected</span>
    </div>
    <div>
    
    <FontAwesomeIcon icon={ faSquare} style={{color:"white"}} />
    <span style={{marginLeft:"7px"}}>Available</span>
    </div>
    <div>
    
    <FontAwesomeIcon icon={ faSquare} style={{color:"#989898"}}/>
    <span style={{marginLeft:"7px"}}>Occupied</span>
    </div>
    </div>
    <div style={{marginTop:"20px"}}></div>
    {
      selectSeats.length > 0 ? (<h6 className="seats-display">The selected seats: {showSeats()}</h6>)
      :
      ( <h6> No seats selected</h6>)
    }
    <div className="checkOut">
    <button  className='pay' onClick={()=>handlePay(location.state)}>
    {
      selectSeats.length >0 ? (<div>{selectSeats.length} seat(s) selected</div>) 
      :
      (<div></div>)
    }
        <div > PAY {total}</div> 
       
    </button>
    <div className="cancel">
    <button >Cancel</button>
    </div>
    </div>
   
    
    </div>
    
  )
}

export default Booking