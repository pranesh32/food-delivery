'use client'

import { useEffect, useState } from "react";
import CustomerHeader from "../_components/customerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

const Page = () =>{

    const[myOrders , setMyOrders]=useState([])
        useEffect(()=>{
            getMyOrders
        },[])
    const getMyOrders = async()=>
        {
            const userStorage = JSON.parse(localStorage.getItem('user'))
            let response=await fetch('http://localhost:3000/api/order?id='+userStorage)
            response =await response.json()
            if(response.success)
            {
                setMyOrders(response.result)
            }
        }
      
        return(
            <div>
                <CustomerHeader/>
             {
                myOrders.map((item)=>(
                    <div>
                        <h1>MY PROFILE</h1>
                        <h4>Name{item.data.name}</h4>
                        <h4>Amount: {item.amount}</h4>
                        <h4>Address: {item.data.address}</h4>
                        <h4>Status: {item.status}</h4>
                        </div>
                ))
             }
                <RestaurantFooter/>
            </div>
    )
}
export default Page;