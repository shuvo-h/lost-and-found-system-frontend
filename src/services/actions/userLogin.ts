// "use server";

import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";

export const userLoginServerAction = async(payload:FieldValues)=>{
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/login`,{
        // cache:"no-store",  // always clean cache for data insert
        credentials: "include",
        method:"POST",
        headers:{'Content-Type':"application/json"}, 
        body: JSON.stringify(payload)  
    })
    
    const result = await response.json();
    console.log(result);
    
    if (result.data?.accessToken) {
        setAccessToken(result.data.accessToken, {
           redirect: '/dashboard2',
        });
     }

    return result;
}