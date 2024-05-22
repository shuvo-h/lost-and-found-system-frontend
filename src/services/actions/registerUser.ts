"use server";

import { TRegister } from "@/types/auth";


export const registerUserServerAction = async(payload:TRegister)=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/register`,{
        cache:"no-store",  // always clean cache for data insert
        method:"POST",
        headers:{'Content-Type':"application/json"}, // for formData, we no need application/json. It is multipart Fromdata
        body: JSON.stringify(payload)  
    })
    
    const result = await response.json();
    // console.log(result);
    

    return result;
}