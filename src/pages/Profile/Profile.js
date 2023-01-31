import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import "./Profile.scss";
import { reservationAsync } from '../../features/reservation/reservationSlice';

const Profile = () => {
    const { userInfo } = useSelector((state) => state.auth)
     console.log(userInfo);
    
  return (
    <div>
      <figure>{userInfo?.userFound.username.charAt(0).toUpperCase()}</figure>
      <span>
        Welcome <strong>{userInfo?.userFound.username}!</strong> 
      </span>
    </div>
  )
}

export default Profile