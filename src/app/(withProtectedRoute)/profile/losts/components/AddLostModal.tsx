import LFFileUploader from "@/components/Forms/LFFileUploader";
import LFForm from "@/components/Forms/LFForm";
import LFInput from "@/components/Forms/LFInput";
import LFSelectDropdown from "@/components/Forms/LFSelectDropdown";
import LFModal from "@/components/LFModal/LFModal";
import { useGetCategoryQuery } from "@/redux/api/categoryApi";
import { useCreateFoundItemMutation } from "@/redux/api/foundItemApi";
import { uploadImageToImgBB } from "@/utils/uploadImgToIMGBB";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { FieldValues, useFormState,  } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import CircularProgress from '@mui/material/CircularProgress';
import LFDatePicker from "@/components/Forms/LFDatePicker";
import dayjs from "dayjs";
import { useCreateLostItemMutation } from "@/redux/api/lostItemApi";

const addLostItemValidationSchema = z.object({
  categoryId: z.string().min(1,"Category is required"),
  lostItemName: z.string().min(1,"Item name is required"),
  description: z.string().min(1,"Description is required"),
  location: z.string().min(1,"Location is required"),
  lostDate: z.any().optional(),
    // claim_process: z.string().min(1,"Claim proof is required"),
    phone: z.string().optional().or(z.literal('')),
    email: z.string().email().optional().or(z.literal('')),
    // img: z.string({required_error:"Found date is required"}).optional(),
    file: z.any().optional(),
});

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddLostItemModal = ({ open, setOpen }: TProps) => {
  const { data,  } = useGetCategoryQuery({});
  const [createLostItem,{isLoading}] = useCreateLostItemMutation();
  const [isImgUploading,setImgUpload] = useState(false)
  
  const handleFormSubmit = async (values: FieldValues) => {
    console.log(values);
    
    try {
      setImgUpload(true)
      // upload image
      let img = "";
      if (values.file) {
        img = await uploadImageToImgBB(values.file)  
      }
      if (values.lostDate) {
        values.lostDate = new Date(values.lostDate).toISOString()
      }
      const {file,...payload} = values;
      payload.img = img || "";
      console.log(payload);
        const res = await createLostItem(payload).unwrap();
      // console.log(res);
        if (res?.id) {
          toast.success("Lost item created successfully!!");
          setOpen(false);
        }else{
          toast.success("Failed to create item!!");
        }
    } catch (err: any) {
      console.error(err.message);
    }finally{
      setImgUpload(false)
    }
  };

  const defaultValues = {
    categoryId: "",
    lostItemName: "",
    description: "",
    location: "",
    lostDate: dayjs(new Date()),
    phone: "",
    email: "",
    img: "",
    file: "",
  };

  return (
    <LFModal open={open} setOpen={setOpen} title="Add a lost item">
      <LFForm
        onSubmit={handleFormSubmit}
        resolver={zodResolver(addLostItemValidationSchema)}
        defaultValues={defaultValues}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <LFInput
              name="lostItemName"
              label="Lost item name"
              fullWidth={true}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <LFSelectDropdown
              items={data || []}
              name="categoryId"
              label="Category"
              sx={{ mb: 2 }}
            />
            
            <Grid item xs={12} md={12}>
              <LFInput
                name="description"
                label="Description"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            
            <Grid item xs={12} md={12}>
              <LFInput
                name="location"
                label="Location"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <LFInput
                name="email"
                label="Email"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <LFDatePicker
                name="lostDate"
                label="Lost Date"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <LFInput
                name="phone"
                label="Phone"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={12}>
                <LFFileUploader name="file" label="Upload File" />
            </Grid>
          </Grid>
        </Grid>
        {
          // isLoading || isImgUploading ? <CircularProgress /> : <Button sx={{ mt: 1 }} type="submit">Add</Button>
        }
        <Button 
          sx={{ mt: 1 }} 
          type="submit"
          startIcon={isLoading || isImgUploading ? <CircularProgress size={24} /> : <></>}
          disabled={isLoading || isImgUploading}
        >Add</Button>
        
      </LFForm>
    </LFModal>
  );
};

export default AddLostItemModal;
