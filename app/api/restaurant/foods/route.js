import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try{
        const payload = await request.json();
        let success = false;
        await mongoose.connect(connectionStr, { useNewUrlParser: true })
        const food = new foodSchema(payload);
        const result = await food.save();
        if(result)
            {
                success = true
            }
            return NextResponse.json({ result, success})
        }catch(e){
            console.log("[/POST/FOODS]: ", e)
            return NextResponse.json({status:500})
        }
}

  
    
       
      
       