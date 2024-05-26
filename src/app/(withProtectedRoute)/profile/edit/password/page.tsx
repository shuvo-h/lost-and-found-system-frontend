"use client"
import LFFileUploader from "@/components/Forms/LFFileUploader";
import LFForm from "@/components/Forms/LFForm";
import LFInput from "@/components/Forms/LFInput";
import LFSelectDropdown from "@/components/Forms/LFSelectDropdown";
import LFModal from "@/components/LFModal/LFModal";
import { useGetCategoryQuery } from "@/redux/api/categoryApi";
import {  useGetFoundItemsQuery } from "@/redux/api/foundItemApi";
import { uploadImageToImgBB } from "@/utils/uploadImgToIMGBB";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldValues, useFormState,  } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CircularProgress from '@mui/material/CircularProgress';
import LFDatePicker from "@/components/Forms/LFDatePicker";
import dayjs from "dayjs";
import { useCreateClaimItemMutation } from "@/redux/api/claimApi";
import { changePasswordServerAction } from "@/services/actions/changePassword";
import { getFromLocalStorage } from "@/utils/localStorage";
import { AUTH_KEY } from "@/constant/authKey";

const passwordValidationSchema = z.object({
    old_password: z.string().min(1,"Old password is required"),
    new_password: z.string().min(1,"New password is required"),
    confirm_new_password: z.string().min(1,"Confirm new password is required"),
});



const PasswordPage = () => {
  const [isLoading,setIsLoading] = useState(false)
 
  
  
  const handleFormSubmit = async (values: FieldValues,) => {
    console.log(values);
    if (values.new_password !== values.confirm_new_password) {
        toast.success("confirm password didn't match!!");
        return
    }
    
    try {
      setIsLoading(true)
      const accessToken = getFromLocalStorage(AUTH_KEY)
        const res = await changePasswordServerAction(accessToken as string,values);
      
        toast.success(res?.message ||"Changed password successful!!");
        
      } catch (err: any) {
      toast.success(err?.message ||"Failed to change password!!");
      console.error(err.message);
    }finally{
      setIsLoading(false)
    }
    
  };

  
  const defaultValues = {
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  };

  return (
    <Container sx={{marginTop:5}}>
        <Paper sx={{maxWidth:400 , margin:"auto", padding:"12px", borderRadius:"12px"}} >
        <LFForm
            onSubmit={handleFormSubmit}
            resolver={zodResolver(passwordValidationSchema)}
            defaultValues={defaultValues}
            
        >
            <Grid container spacing={2}>
            <Grid item md={12}>
                <Grid item md={12}>
                <LFInput
                    name="old_password"
                    label="Old password"
                    fullWidth={true}
                    sx={{ mb: 2 }}
                    type="password"
                />
                </Grid>
                <Grid item md={12}>
                <LFInput
                    name="confirm_new_password"
                    label="Confirm new password"
                    fullWidth={true}
                    sx={{ mb: 2 }}
                    type="password"
                />
                </Grid>
                
                
                <Grid item md={12}>
                <LFInput
                    name="new_password"
                    label="New password"
                    fullWidth={true}
                    sx={{ mb: 2 }}
                    type="password"
                />
                
                </Grid>
            </Grid>
            </Grid>
            {
            // isLoading || isImgUploading ? <CircularProgress /> : <Button sx={{ mt: 1 }} type="submit">Add</Button>
            }
            
            <Button 
            sx={{ mt: 1 }} 
            type="submit"
            startIcon={isLoading  ? <CircularProgress size={24} /> : <></>}
            disabled={isLoading}
            >Change</Button>
            
        </LFForm>
        </Paper>
    </Container>
  );
};

export default PasswordPage;
