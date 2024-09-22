'use client'

import RestaurantSignup from "../_components/restaurantsignup";
import RestaurantLogin from "../_components/restaurantlogin";
import { useState } from "react";
import RestaurantHeader from "../_components/RestaurantHeader";
import './style.css'
import RestaurantFooter from "../_components/RestaurantFooter";
const Restaurant = () => {
    const [login , setlogin] = useState(true)
  return (
    <>
    <div className="container">
        <RestaurantHeader/>
      <h1>Restaurant Login/Signup Page</h1>
      {
          login? <RestaurantLogin/>:<RestaurantSignup/>
        }
     
       <div>

      <button className="button-link" onClick={()=>setlogin(!login)}>
        {login?"Do not have an account ? Signup " : "Already have Account ? Login"}</button>
       </div>
        </div>
        <RestaurantFooter/>
    </>
  );
}

export default Restaurant;
