"use client";
import Title from "@/components/shared/Title";
import { useGetClaimItemsQuery } from "@/redux/api/claimApi";
import { useGetMYProfileQuery } from "@/redux/api/myProfile";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddFoundModal from "./components/AddFoundModal";
import { useDeleteFoundItemByIdMutation, useGetFoundItemsQuery } from "@/redux/api/foundItemApi";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EditFoundModal from "./components/EditFoundModal";
import { TfoundItemPartial } from "./components/fouondTypes";
import { toast } from "sonner";
import Link from "next/link";
import { useGetLostItemByIdQuery } from "@/redux/api/lostItemApi";

const FoundItemPage = () => {
  const { data, isLoading } = useGetMYProfileQuery(undefined);
  const { data: founds, isLoading: isFoundLoading } = useGetFoundItemsQuery(
    { userId: data?.userId },
    { skip: isLoading }
  );
  const [deleteFoundItem,{isLoading:isDeleteLoading}] = useDeleteFoundItemByIdMutation();

  const {data:abData} = useGetLostItemByIdQuery({id:"2c7f754a-ac8b-482f-9051-ae3e9d807d00"})
  console.log({abData});
  

  const [openModal,setOpenModal] = useState(false);
  // const [openEditModal,setOpenEditModal] = useState(false);
  const [editItem,setEditItem] = useState<TfoundItemPartial>(null as unknown as TfoundItemPartial);

  const deleteItemHandler = async(item_id:string) =>{
    try {
        const res = await deleteFoundItem(item_id).unwrap();
      // console.log(res);
        if (res?.id) {
          toast.success("Found item deleted successfully!!");
        }else{
          toast.success("Failed to deleted item!!");
        }
    } catch (err: any) {
      console.error(err.message);
    }
  }

  return (
    <Box>
        <Stack direction={"row"} justifyContent={"space-between"} spacing={2} my={2}>
            <Title title="My found items" />
            <Button onClick={()=>setOpenModal(true)}>Add Found Item</Button>
        </Stack>
      <Grid container spacing={2}>
        {!isFoundLoading &&
          founds?.map((found:any) => (
            <Grid item xs={12} md={6} lg={4} key={found.id}>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction={"row"} justifyContent={"space-between"} textAlign={"right"}>
                    <Chip
                      label={found?.status}
                      color={found?.status === 'PENDING' ? 'primary' : found?.status === 'APPROVED' ? 'success' : 'error'}
                    />
                    <Box>
                      <IconButton disabled={isDeleteLoading}>
                        {
                          isDeleteLoading ? <CircularProgress size={24} />: <DeleteIcon 
                            sx={{cursor:"pointer"}}
                            onClick={()=>deleteItemHandler(found.id)}
                          />
                        }
                      </IconButton>
                      <IconButton>
                        <EditNoteIcon 
                          onClick={()=>{setEditItem(found);}} 
                          sx={{cursor:"pointer"}}
                        />
                      </IconButton>
                    </Box>
                  </Stack>
                  <Title title={found?.foundItemName} size="small" />
                  <Typography
                    sx={{ fontSize: 14, }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {found?.description?.slice(0,200)}
                  </Typography>
                  <Typography variant="body2">
                     {found?.claim_process}
                  </Typography>
                  <Typography variant="body2">
                    Found By, <span style={{fontStyle:"italic"}}>{found?.user?.name} Email:{found?.user?.email}</span>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/profile/founds/${found.id}`}>
                    <Button size="small" >Details</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      <AddFoundModal open={openModal} setOpen={setOpenModal} />
      <EditFoundModal 
        open={editItem as unknown as boolean} 
        setOpen={()=>setEditItem(null as unknown as TfoundItemPartial)} 
        foundItem={editItem} 
      />
    </Box>
  );
};

export default FoundItemPage;
