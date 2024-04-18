import React from 'react';
import {CircularProgressbar,buildStyles} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import "./style.css";

const RatingCircle = ({rating,className}) => {
  return (
    <div className={`ratingCircle ${className}  rounded-[50%] p-[2px]`}>
      <CircularProgressbar value={rating} 
      maxValue={10} text={rating} 
      styles={buildStyles({
        pathColor:rating<5?"red":rating<7?"orange":"green"
        })} />
    </div>
  )
}

export default RatingCircle;
