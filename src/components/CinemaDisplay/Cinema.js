import { daysInWeek } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllMovies } from "../../features/movies/movieSlice";
import { fetchAsyncShowTime} from "../../features/showTime/showTimeSlice";
import CinemaCard from "../CinemaCard/CinemaCard";
import "./Cinema.scss";

const Cinema = () => {
  const dispatch = useDispatch();
  const { movieid } = useParams();
  // console.log(movieid);
  const cinema = useSelector(getAllMovies);
  // console.log(cinema.cinemaData);

  let selectedCinema = cinema.cinemaData.filter((cinema, index) => {
    // console.log(cinema.movieId === movieid);
    if (cinema.movieId === movieid) {
      //  console.log(cinema)
      return cinema;
    }
  });
  //  console.log(selectedCinema);

  let renderCinema = selectedCinema.map((cEl, index) => {
    return <CinemaCard key={index} data={cEl} />;
  });

  var weekday = ["Sunday ","Monday ","Tuesday ","Wednesday ","Thursday ","Friday ","Saturday "];
  var today = new Date();
  // console.log(today);
  const [selectedDate, setSelectedDate] = useState("");
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth()+1).padStart(2, "0");
  // console.log(mm);
  var dayNum = today.getDay()
  var day = weekday[dayNum]
  // console.log(day);
 
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var selectedMonthName = months[mm-1];

  let dates = [
    dd,
    Number(dd) + 1,
    Number(dd) + 2,
    Number(dd) + 3,
    Number(dd) + 4,
    Number(dd) + 5,
    Number(dd) + 6,
  ];

  let dateSelection = (result) => {
    console.log(result);
    setSelectedDate(result);
    // .toISOString().split('T');
    //.toLocaleDateString()
    let dateResult = new Date(`2023/${selectedMonthName}/${result}`).toLocaleDateString();
     console.log(dateResult);
    dispatch(fetchAsyncShowTime({movieid,dateResult}));
    setSelectedDate("");
  };


  function DateButton({ date, handleClick }) {
    // console.log(props)
    return (
      <>
        <button className="time-display" onClick={handleClick}>
          {date}
        </button>
      </>
    );
  }
  return (
    <div>
      <div className="time-sheet">
        <div className="month">{selectedMonthName}</div>
        <div className="date">
          {dates.map((answer, i) => {
            {
              /* console.log(answer); */
            }
            if (answer != "")
              return (
                <DateButton
                key={i}
                  date={answer}
                  handleClick={() => dateSelection(answer)}
                />
              );
          })}
        </div>
      </div>
      {renderCinema}
    </div>
  );
};
export default Cinema;
