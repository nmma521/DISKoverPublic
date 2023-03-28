import React from "react";
import "./Recommendation.css"
import { GetByTopArtist } from "./query/getByTopArtist";
import { GenreDropdown } from "./query/genreDropdown";
const  Recommendation = () => {


  
    return (
      <div className="container">
      <>
      <GetByTopArtist/>
      <br></br>
      <GenreDropdown/>
      </>
      </div>
    );
  };

export default Recommendation;
