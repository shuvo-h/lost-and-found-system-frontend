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
// import AddFoundModal from "./components/AddFoundModal";
import { useDeleteFoundItemByIdMutation, useGetFoundItemsQuery } from "@/redux/api/foundItemApi";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
// import EditFoundModal from "./components/EditFoundModal";
// import { TfoundItemPartial } from "./components/fouondTypes";
import { toast } from "sonner";
import Link from "next/link";
import { useDeleteLostItemByIdMutation, useGetLostItemsQuery } from "@/redux/api/lostItemApi";
import { TLostItemPartial } from "./components/lostTypes";
import AddLostItemModal from "./components/AddLostModal";
import EditLostModal from "./components/EditLostModal";

const LostItemPage = () => {
  const { data, isLoading } = useGetMYProfileQuery(undefined);
  const { data: losts, isLoading: isLostLoading } = useGetLostItemsQuery(
    { userId: data?.userId },
    { skip: isLoading }
  );
  const [deleteLostItem,{isLoading:isDeleteLoading}] = useDeleteLostItemByIdMutation();

  const [openModal,setOpenModal] = useState(false);
  // const [openEditModal,setOpenEditModal] = useState(false);
  const [editItem,setEditItem] = useState<TLostItemPartial>(null as unknown as TLostItemPartial);

  const deleteItemHandler = async(item_id:string) =>{
    try {
        const res = await deleteLostItem(item_id).unwrap();
      // console.log(res);
        if (res?.id) {
          toast.success("Lost item deleted successfully!!");
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
            <Title title="My lost items" />
            <Button onClick={()=>setOpenModal(true)}>Add Lost Item</Button>
        </Stack>
      <Grid container spacing={2}>
        {!isLostLoading &&
          losts?.map((lost:any) => (
            <Grid item xs={12} md={6} lg={4} key={lost.id}>
              <Card variant="outlined">
                <CardContent>
                  <Stack direction={"row"} justifyContent={"space-between"} textAlign={"right"}>
                    <Chip
                      label={lost?.status}
                      color={lost?.status === 'PENDING' ? 'primary' : lost?.status === 'APPROVED' ? 'success' : 'error'}
                    />
                    <Box>
                      <IconButton disabled={isDeleteLoading}>
                        {
                          isDeleteLoading ? <CircularProgress size={24} />: <DeleteIcon 
                            sx={{cursor:"pointer"}}
                            onClick={()=>deleteItemHandler(lost.id)}
                          />
                        }
                      </IconButton>
                      <IconButton>
                        <EditNoteIcon 
                          onClick={()=>{setEditItem(lost);}} 
                          sx={{cursor:"pointer"}}
                        />
                      </IconButton>
                    </Box>
                  </Stack>
                  <Title title={lost?.lostItemName} size="small" />
                  <Typography
                    sx={{ fontSize: 14, }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {lost?.description?.slice(0,200)}
                  </Typography>
                  {/* <Typography variant="body2">
                     {lost?.claim_process}
                  </Typography> */}
                  <Typography variant="body2">
                    Found By, <span style={{fontStyle:"italic"}}>{lost?.user?.name}, Email: {lost?.user?.email}</span>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link href={`/profile/losts/${lost.id}`}>
                    <Button size="small" >Details</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      <AddLostItemModal open={openModal} setOpen={setOpenModal} />
      <EditLostModal 
        open={editItem as unknown as boolean} 
        setOpen={()=>setEditItem(null as unknown as TLostItemPartial)} 
        lostItem={editItem} 
      />
    </Box>
  );
};

export default LostItemPage;
