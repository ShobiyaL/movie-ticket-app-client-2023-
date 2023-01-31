import React, { useState ,useEffect} from "react";
import "./NavigationBar.scss";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTicket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
 import { getAllCities } from "../services/CommonService";
import {fetchAsyncMovies,fetchAsyncSearchMovie, getSearchedMovie, } from "../../features/movies/movieSlice";
import { useDispatch } from "react-redux";
import { useGetDetailsQuery } from '../services/AuthService'
import { logout, setCredentials } from '../../features/auth/authSlice'


function NavigationBar(props) {
  const navigate = useNavigate();
  const { userInfo,userToken } = useSelector((state) => state.auth);
  // console.log(userInfo);
  const [searchValue, setSearchValue] = useState("");
  const [cities, setCities] = useState(["allCities"]);
  if (cities.length == 1) {
    getAllCities(setCities);
  }

  const dispatch = useDispatch();
 
  // automatically authenticate user if token is found
  const { data, isFetching } = useGetDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  })
// console.log(data);

  useEffect(() => {
    if (data) dispatch(setCredentials(data))
  }, [data, dispatch])

  let submitHandler = (event) => {
    event.preventDefault();
    console.log(searchValue);
    dispatch(fetchAsyncMovies(searchValue));
    setSearchValue("");
  };
  

  function filterLocation(event) {
    // let selectElement = document.querySelector("#cityForm-1");
    let output = event.target.value;
    console.log(output);
     props.setLocation(output);
     dispatch(fetchAsyncMovies(output))
    navigate('/')
  }
  return (
    <div className="container-fluid bg-dark nav">
      <Link to="/">
        <div className="logo">
          Movie App
          <FontAwesomeIcon
            icon={faTicket}
            style={{ transform: "rotate(-21deg)", paddingLeft: "5px" }}
          />
        </div>
      </Link>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            className="form"
            placeholder="Search Movies...."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
      
      <div>
        <form name="PostName" onChange={filterLocation}>
          <label htmlFor="language" style={{color:"whitesmoke"}}>Select Location:</label>
          <select name="language" id="cityForm-1" onchange="PostName.submit()" style={{padding:"1px 20px"}}>
            {cities.map((answer, i) => {
              if (answer != "") return <option key={i} value={answer}>{answer}</option>;
            })}
          </select>
        </form>
      </div>
      <div>
      
        {userInfo? (
          
          <Button variant="secondary" onClick={() => dispatch(logout())}>Log Out</Button>

          
            ) : (
              <Link to="/login">
              
              <Button variant="secondary">Log In</Button>
            </Link>
            )}
        <Link to="/signup">
          {" "}
          <Button variant="secondary">Sign Up</Button>{" "}
        </Link>
        <Link to={`/user/profile`}>Profile</Link>
      </div>
    </div>
  );
}

export default NavigationBar;
