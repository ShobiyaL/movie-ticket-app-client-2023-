import React ,{useEffect} from 'react';
import './Calendar.scss';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { fetchAsyncShowTime,getAllShowTime} from "../../features/showTime/showTimeSlice";

const Calendar = () => {
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
  let newDateArr = [];
  
  function date (a){
    for(let i=0;i<a.length;i++){
      var date = new Date();
    date.setDate(date.getDate() + a[i]);
  var result = date.getDate();
  var month = months[date.getMonth()];
  console.log(month,"month")
  console.log(result);
  newDateArr.push(result);
  
  // console.log(result);
 
    }
  };
  let arrayDate = [0,1,2,3,4,5,6]
  date(arrayDate);
   console.log(newDateArr);

  

    var today = new Date();
     console.log(today);
    // const [selectedDate, setSelectedDate] = useState("");
var dd = String(today.getDate()).padStart(2, "0");

    var mm = String(today.getMonth()+1).padStart(2, "0");
    // console.log(mm);s
   
   
  
    var selectedMonthName = months[mm-1];
    console.log(selectedMonthName)
    
    const { movieid } = useParams();
    console.log(movieid);
    const dispatch = useDispatch();
    
    function DateButton({ date }) {
        // console.log(props)
        
        let handleClick =(date)=>{
            console.log(date)
           let dateResult = new Date(`2023/${selectedMonthName}/${date}`).toLocaleDateString();
    //  console.log(dateResult);
    //  console.log(movieid)
     dispatch(fetchAsyncShowTime({movieid,dateResult}));
    
        };

        
        return (
          <>
            <button className="time-display" onClick={()=>handleClick(date)}>
              {date}
            </button>
            
          </>
        );
      }
  return (
    <div>
     <div className="time-sheet">
        <div className="month">{selectedMonthName}</div>
        <div style={{padding:"20px 20px 0px 20px"}}>"Select date to check the available show timings"</div>
        <div className="date">
        
          {newDateArr.map((answer, i) => {
            console.log(answer)
              return (
                <DateButton
                key={i}
                  date={answer }  
                />
              );
          })}
          
        </div>
        </div>
    </div>
  )
}

export default Calendar