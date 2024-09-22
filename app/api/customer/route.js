import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){ 
        let queryaParams =  request.nextUrl.searchParams
        console.log(queryaParams.get('restaurant'))
        await mongoose.connect(connectionStr , {useNewUrlParser:true});
       let filter={}
        if(queryaParams.get("location")) // seacrh by location
        {
            let city=queryaParams.get("location")
        filter ={city:{$regex:new RegExp(city,'i')}}  //  i is used for case insenitive 
        }
        else if(queryaParams.get("restaurant")) // search by name 
        {
            let name = queryaParams.get("restaurant")
            filter ={name:{$regex:new RegExp(name,'i')}}  //  i is used for case insenitive 
        }
        
            let result = await restaurantSchema.find(filter)   
    return NextResponse.json({success:true , result })
    }