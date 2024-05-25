// "use server";

import { FieldValues } from "react-hook-form";

export const changePasswordServerAction = async(token:string,payload:FieldValues)=>{
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/password`,{
        // cache:"no-store",  // always clean cache for data insert
        credentials: "include",
        method:"PATCH",
        headers:{
            'Content-Type':"application/json",
            "Authorization": token
        }, 
        body: JSON.stringify(payload)  
    })
    
    const result = await response.json();
    console.log(result);
    

    return result;
}

export const changeUserInfoServerAction = async(token:string,payload:FieldValues)=>{
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/update-user`,{
        // cache:"no-store",  // always clean cache for data insert
        credentials: "include",
        method:"PATCH",
        headers:{
            'Content-Type':"application/json",
            "Authorization": token
        }, 
        body: JSON.stringify(payload)  
    })
    
    const result = await response.json();
    console.log(result);
    

    return result;
}