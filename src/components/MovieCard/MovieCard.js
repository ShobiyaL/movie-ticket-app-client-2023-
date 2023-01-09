import React from 'react'
import { Link } from 'react-router-dom';
import './MovieCard.scss';

const MovieCard = (props) => {
  const {data} = props;
  // console.log(data._id);
  return (
    <div className='card-item'>
    <Link to={`/movie/${data._id}`} style={{textDecoration:"none"}}>
    <div className='card-inner'>
      <div className='card-top'>
        <img src={data.image} alt={data.title}/>
      </div>
      <div className='card-bottom'>
      <div className='card-info'>
      <h6 className='card-movie-title' style={{color:"black"}}>{data.title}</h6>
      <p className='card-description' style={{color:"gray"}}>{data.genre}</p>
      </div> 
      </div> 
    </div>
    </Link>
    </div>
  )
}

export default MovieCard;