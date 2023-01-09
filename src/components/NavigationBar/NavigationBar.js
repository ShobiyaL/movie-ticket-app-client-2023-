import React, { useState } from "react";
import "./NavigationBar.scss";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTicket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getAllCities } from "../services/CommonService";
import {
  fetchAsyncMovies,
  fetchAsyncSearchMovie,
  getSearchedMovie,
} from "../../features/movies/movieSlice";
import { useDispatch } from "react-redux";

function NavigationBar(props) {
  // const [searchParams,setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState("");
  const [cities, setCities] = useState(["allCities"]);
  if (cities.length == 1) {
    getAllCities(setCities);
  }

  const dispatch = useDispatch();
  let submitHandler = (event) => {
    event.preventDefault();
    console.log(searchValue);
    dispatch(fetchAsyncMovies(searchValue));
    setSearchValue("");
  };

  function filterLocation(event) {
    let selectElement = document.querySelector("#cityForm-1");
    let output = selectElement.value;
    console.log(output);
    props.setLocation(output);
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
          <label for="language" style={{color:"whitesmoke"}}>Select Location:</label>
          <select name="language" id="cityForm-1" onchange="PostName.submit()" style={{padding:"1px 20px"}}>
            {cities.map((answer, i) => {
              if (answer != "") return <option value={answer}>{answer}</option>;
            })}
          </select>
        </form>
      </div>
      <div>
        <Link to="/login">
          {" "}
          <Button variant="secondary">Log In</Button>{" "}
        </Link>
        <Link to="/signup">
          {" "}
          <Button variant="secondary">Sign Up</Button>{" "}
        </Link>
      </div>
    </div>
  );
}

export default NavigationBar;
