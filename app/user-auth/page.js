'use client'
import { useState } from "react"
import CustomerHeader from "../_components/customerHeader";

import RestaurantFooter from "../_components/RestaurantFooter";
import UserLogin from "../_components/UserLogin"
import UserSignUp from "../_components/UserSignUp"

const UserAuth=(props)=>{
    const [login,setLogin]=useState(true)
    console.log("order flag",props);
    return(
        <div>
            <CustomerHeader />
            <div className="container">
            <h1>{login?'User Login':'User Signup'}</h1>
            {
                login?<UserLogin redirect={props.searchParams} />:<UserSignUp redirect={props.searchParams} />
            }
            <button className="button-link" onClick={()=>setLogin(!login)}>
                {login?'Do not have account? Signup':'Already have account ? login'}
            </button>
    
            </div>
            
            <RestaurantFooter />
        </div>
    )
}

export default UserAuth