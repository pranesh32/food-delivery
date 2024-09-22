'use client'
import { useState } from "react";
import CustomerHeader from "../_components/customerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { DELIVERY_CHARGES, TAX } from "../lib/constant"
import { useRouter } from "next/navigation"
import '../explore/[name]/style.css'
const Page = () => {

    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')))
    const [total]=useState(()=>cartStorage.length==1?cartStorage[0].price:cartStorage.reduce((a,b)=>{
return a.price+b.price
    }))
    const router = useRouter()
    console.log(total);

    const orderNow=()=>{
        if(JSON.parse(localStorage.getItem('user'))){
            router.push('/order')
        }else{
            router.push('/user-auth?order=true')
        }
       
    }
    return (
        <div>
            <CustomerHeader />
            <div className="list">
                {
                    cartStorage.length > 0 ? cartStorage.map((item) => (
                        <div className="food-item">
                            <div className="block1"><img style={{ width: 100 }} src={item.img_path} /></div>
                            <div className="list">
                                <div>{item.name}</div>

                                <div className="description">{item.description}</div>
                                {

                                    <button className=" button-d" onClick={() => removeFromCart(item._id)} >Remove From Cart</button>

                                }

                            </div>
                            <div className="block3">Price: {item.price}</div>

                        </div>
                    ))
                        : <h1>No Food Items for this Restaurant</h1>
                }
            </div>
            <div className="total">
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
                    <span>Total Price : </span>
                    <span>{total+DELIVERY_CHARGES + (total* TAX/100)}</span>
                </div>
                <div className="block4">
                    <button className="order"  onClick={orderNow}>Order Now</button>
                </div>
            </div>
            <RestaurantFooter />
            </div>
    )
}

export default Page