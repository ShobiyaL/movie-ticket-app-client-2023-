import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getAllMovies } from '../../features/movies/movieSlice';
import './CinemaCard.scss'
import { useNavigate } from 'react-router-dom';

const CinemaCard = (props) => {
    const navigate = useNavigate();

    let {data} = props;
    // console.log(data);

    function Divert() {
        console.log('hhh');
        navigate('/bookl');
    }
  return (
    <div >
   
    {/* <div className="card-title">
    <h1>{`Cinema/Theater Name: ${data.name}`}</h1>
   
    </div> */}
    
                <div className="show-detail">
                <div className="theater-detail">
                    {data.name}
                </div> 
                    <div className="show-time pills">
                    <NavLink exact to={{ pathname: "/book" }}> 
                    <div className='time-card' onClick={Divert}>
                            1:00am
                        </div>
              </NavLink>
                       
                    </div>
                    <div className="show-time pills">
                    <NavLink exact to={{ pathname: "/book" }}> 
                    <div className='time-card' onClick={Divert}>
                            4:00am
                        </div>
              </NavLink>
                    </div>
                    <div className="show-time pills">
                    <NavLink exact to={{ pathname: "/book" }}> 
                    <div className='time-card' onClick={Divert}>
                            11:00am
                        </div>
              </NavLink>
                    </div>
                    <div className="show-time pills">
                    <NavLink exact to={{ pathname: "/book" }}> 
                    <div className='time-card' onClick={Divert}>
                            2:00pm
                        </div>
              </NavLink>
                    </div>
                    <div className="show-time pills">
                    <NavLink exact to={{ pathname: "/book" }}> 
                    <div className='time-card' onClick={Divert}>
                            6:00pm
                        </div>
              </NavLink>
                    </div>
                    
                
                </div>
    </div>
  )
}

export default CinemaCard