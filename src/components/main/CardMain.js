import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  return(
    <div className="card bg-dark text-white text-center">
    <div className="card-header">
      <h4 className="card-title">{props.title}</h4>
    </div>
    <div className="card-body">
      <img src = {props.img} style ={{width: 64 + 'px', height: 64 + 'px'}} alt = {props.altl}/>
      <p>{props.text}</p>
      <Link to = {props.refe}><button className = "btn btn-primary btn-block">{props.textButton}</button></Link>
    </div>
  </div>
  );
  
}

export default Card;
