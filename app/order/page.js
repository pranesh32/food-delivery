'use client'
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/customerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

import '../explore/[name]/style.css'
import { DELIVERY_CHARGES, TAX } from "../lib/constant";
import { useRouter } from "next/navigation";
const Page=()=>{
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('user')));
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const router = useRouter()
    const [total] = useState(() => cartStorage?.length == 1 ? cartStorage[0].price : cartStorage?.reduce((a, b) => {
        return a.price + b.price
    }))

    console.log(total)
    const[removeCartData , setRemoveCartData] = useState(false)
    
    useEffect(()=>{

        if(!total)
        {
            router.push('/')
        }
    },[total])
    const orderNow = async()=>{
        let user_id = JSON.parse(localStorage.getItem('user'))._id;
        let city = JSON.parse(localStorage.getItem('user')).city;
        let cart = JSON.parse(localStorage.getItem('cart'))
        let foodItemIds = cart.map((item)=>item._id).toString(); 
        let deliveryBoyResponse= await fetch('http://localhost:3000/api/deliverypartners/'+city)
        deliveryBoyResponse = await deliveryBoyResponse.json()
       let  deliveryBoyIds = deliveryBoyResponse.result.map((item)=>item._id);
        let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random()*deliveryBoyIds.length)]
        if(!deliveryBoy_id)
        {
            alert("delivery partner not available")
            return false
        }
        let resto_id=cart[0] .resto_id
        let collection = {
            user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status:'confirm',



        }
        let response= await fetch('http://localhost:3000/api/order',{
            method:'POST',
            body: JSON.stringify(collection)
        });
        response = await response.json()
        if(response.success)
        {
            alert("order confirmed")
            setRemoveCartData(true)
            router.push('/myprofile')
        }else{
            alert("order failed")
        }
        console.log("this " , collection)
    }
    
    return (
        <div>
            <CustomerHeader removeCartData={removeCartData}/>
            <div className="total">
            <div className="block1">
                <h2>User Details</h2>
                {
                    userStorage?   // check for user data is avail  or not 
                    <>
                    </>
                    :null
                }
                
</div>
                <div className="row">
                    <span>Name</span>
                    <span> { userStorage.name} </span>
                </div>
                <div className="row">
               
               <span>Address: </span>
               <span>{userStorage.address}</span>
           </div>
           <div className="row">
               
               <span>Mobile: </span>
               <span>{userStorage.mobile}</span>
           </div>
           
           
                
            <h2>Amount Details</h2>
          
                <div className="row">
             
                    <span>Food Price : </span>
                    <span>{total}</span>
                </div>
                <div className="row">
                    <span>Tax Price : </span>
                    <span>{total *TAX/100}</span>
                    </div>
                <div className="row">
                    <span>Delivery Price : </span>
                    <span>{DELIVERY_CHARGES}</span>
                </div>

                <div className="row">
                    <span>Total Price: </span>
                    <span>{total+DELIVERY_CHARGES + (total* TAX/100)}</span>
                </div>
                <h2>Payment Method</h2>
                <div className="row">
               
               <span>Cash on Delivery: </span>
               <span>{userStorage.total}</span>
           </div>
                <div className="block4">
                    <button onClick = {orderNow} className="order">Place your Order Now</button>
                </div>
            </div>
            <RestaurantFooter />
        </div>
    )
    // decodeURI is used two words res name can be printed without % in between
}

export default Page;