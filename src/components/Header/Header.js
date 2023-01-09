import React from "react";
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';


const Header = () => {
  return (
    <div className="header">
        
      <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1670250889873_wdfgfd.jpg"
          alt="..."
          
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1671700840413_nye.jpg"
          alt="..."
          
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://assets-in.bmscdn.com/promotions/cms/creatives/1672285551727_qed.jpg"
          alt="..."
          
        />
      </Carousel.Item>
      
      
    </Carousel>
      
    </div>
  );
};

export default Header;