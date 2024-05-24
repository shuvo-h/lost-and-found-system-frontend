import LFFileUploader from "@/components/Forms/LFFileUploader";
import LFForm from "@/components/Forms/LFForm";
import LFInput from "@/components/Forms/LFInput";
import LFSelectDropdown from "@/components/Forms/LFSelectDropdown";
import LFModal from "@/components/LFModal/LFModal";
import { useGetCategoryQuery } from "@/redux/api/categoryApi";
import {  useGetFoundItemsQuery } from "@/redux/api/foundItemApi";
import { uploadImageToImgBB } from "@/utils/uploadImgToIMGBB";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { FieldValues, useFormState,  } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CircularProgress from '@mui/material/CircularProgress';
import LFDatePicker from "@/components/Forms/LFDatePicker";
import dayjs from "dayjs";
import { useCreateClaimItemMutation } from "@/redux/api/claimApi";

const addClaimItemValidationSchema = z.object({
  foundItemId: z.string().min(1,"Category is required"),
  distinguishingFeatures: z.string().min(1,"Feature is required"),
  lostDate: z.any().optional(),
});

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddClaimModal = ({ open, setOpen }: TProps) => {
  const { data, error } = useGetFoundItemsQuery({}); // get list of all found Item
  const [createClaimItem,{isLoading}] = useCreateClaimItemMutation();
  console.log(error);
  
  
  const handleFormSubmit = async (values: FieldValues) => {
    console.log(values);
    try {
      if (values.lostDate) {
        values.lostDate = new Date(values.lostDate).toISOString()
      }
      
      
        const res = await createClaimItem(values).unwrap();
      console.log(res);
        if (res?.id) {
          toast.success("Claim for item created successfully!!");
          setOpen(false);
        }else{
          toast.success(res?.message ||"Failed to create claim!!");
        }
      } catch (err: any) {
      toast.success(err?.message ||"Failed to create claim!!");
      console.error(err.message);
    }
  };

  const formatOptions = ()=>{
    if (Array.isArray(data)) {
      return data.map(({id,foundItemName})=>({id,name:foundItemName}))
    }else{
      return []
    }
  }
  const defaultValues = {
    foundItemId: "",
    distinguishingFeatures: "",
    lostDate: dayjs(new Date()),
  };

  return (
    <LFModal open={open} setOpen={setOpen} title="Claim a found item">
      <LFForm
        onSubmit={handleFormSubmit}
        resolver={zodResolver(addClaimItemValidationSchema)}
        defaultValues={defaultValues}
      >
        <Grid container spacing={2}>
          <Grid item md={12}>
            <LFSelectDropdown
              items={formatOptions() || []}
              name="foundItemId"
              label="Claim item"
              sx={{ mb: 2 }}
            />
            
            <Grid item md={12}>
              <LFInput
                name="distinguishingFeatures"
                label="Distinguish features"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            
            
            <Grid item md={12}>
              <LFDatePicker
                name="lostDate"
                label="Lost Date"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
        </Grid>
        {
          // isLoading || isImgUploading ? <CircularProgress /> : <Button sx={{ mt: 1 }} type="submit">Add</Button>
        }
        <Typography>{error?.message} test error</Typography>
        <Button 
          sx={{ mt: 1 }} 
          type="submit"
          startIcon={isLoading  ? <CircularProgress size={24} /> : <></>}
          disabled={isLoading}
        >Add</Button>
        
      </LFForm>
    </LFModal>
  );
};

export default AddClaimModal;
