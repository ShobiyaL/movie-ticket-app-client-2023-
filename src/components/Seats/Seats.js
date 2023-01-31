import React,{useState} from 'react'
import "./Seats.scss";

const Seats = ({data,handleClick,selectSeats}) => {
  // console.log(data);
//   const [selectSeats,setSelectSeats] = useState([]);

//  let onSeatSelect = (item)=>{
//     // console.log(item)
//   const seatSelected = selectSeats.find((seat)=>seat === item);
//   if(seatSelected){
//       setSelectSeats(selectSeats.filter((seat)=>seat !== item));
//   }else{
//       setSelectSeats([...selectSeats,item])
//   }
//  }
//  console.log(selectSeats,"selected seats")

    
    let d = data.map((item,index)=>{
        return <div key={index} className="seats" onClick={()=>handleClick(item)}>
       {/* {item} */}
       {
        selectSeats.includes(item) ? (<div style={{backgroundColor:"#ffc40c", padding:"5px 7px"}}>{item}</div>) : (<div style={{ padding:"5px 7px"}}>{item}</div>)
       }
       
        </div>
    })
    // console.log(d);
  return (
    <div >
    <div className="arrangement">
    {d}
    </div>
    
    </div>
  )
}

export default Seats