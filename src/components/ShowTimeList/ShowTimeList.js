import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ShowTimeList = ({data}) => {
  console.log(data);
  const navigate = useNavigate();

   let handleClick = (data) => {
    let date = data.date.split('T');
     console.log(data.startAt,date[0], data.movieId,data.cinema_details[0].name);
    navigate('/booking',{state:data})
   }

  return (
    <>
     {/* <CinemaCard/> */}
     {/* {showTime.showTime.length === 0 ? (
        <div>Sorry..No shows on this day</div>
      ) : (
        showTime.showTime.map((shT, index) => {
          return (
            <button className="btn btn-dark" key={index} 
            onClick=
            {()=>handleClick(shT.cinema_details[0].name)}>
              {shT.startAt}
            </button>
          );
        })
      )} */}
      <button className="btn btn-dark" onClick={()=>handleClick(data)}>{data.startAt}</button>
    </>
  );
};

export default ShowTimeList;

